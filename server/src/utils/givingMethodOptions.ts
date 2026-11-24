/**
 * Preferred-giving-method options for the public request form.
 *
 * The form asks which method a visitor would PREFER, so it offers common
 * methods even when the church hasn't configured payment details for them,
 * plus any custom methods an admin created. The public "Ways to give" list
 * is unaffected: it still shows only active, admin-configured methods.
 *
 * To offer another common method, add one line to DEFAULT_GIVING_METHODS.
 */
export const DEFAULT_GIVING_METHODS = [
  { key: "orange-money", label: "Orange Money" },
  { key: "mtn-mobile-money", label: "MTN Mobile Money" },
  { key: "lonestar-cell-mtn-mobile-money", label: "Lonestar Cell MTN Mobile Money" },
  { key: "paypal", label: "PayPal" },
  { key: "zelle", label: "Zelle" },
  { key: "cash-app", label: "Cash App" },
  { key: "venmo", label: "Venmo" },
  { key: "bank-transfer", label: "Bank Transfer" },
  { key: "in-person", label: "In Person" },
  // Always listed last, after any custom methods.
  { key: "other", label: "Other" },
] as const;

export const findDefaultMethod = (key: string) => DEFAULT_GIVING_METHODS.find((m) => m.key === key);

/**
 * Case/spacing/punctuation-insensitive comparison key: "Orange  Money",
 * "orange money" and "Orange-Money" match. Only the WHOLE normalized name is
 * compared, so "MTN Mobile Money" and "Lonestar Cell MTN Mobile Money" stay
 * distinct providers.
 */
export const normalizeMethodName = (name: string) => name.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");

export interface MethodOption {
  value: string;
  label: string;
}

interface CustomMethodLike {
  id: string;
  name: string;
}

/**
 * Defaults + custom methods, deduplicated by normalized name. When a custom
 * method has the same name as a default, the single entry uses the custom
 * method's id (so the request links to the configured method).
 */
export const buildMethodOptions = (customs: CustomMethodLike[]): MethodOption[] => {
  const byName = new Map<string, CustomMethodLike>();
  for (const c of customs) {
    const norm = normalizeMethodName(c.name);
    if (norm && !byName.has(norm)) byName.set(norm, c);
  }

  const options: MethodOption[] = [];
  const used = new Set<string>();
  const push = (value: string, label: string, norm: string) => {
    options.push({ value, label });
    used.add(norm);
  };

  const defaults = DEFAULT_GIVING_METHODS.filter((m) => m.key !== "other");
  const other = findDefaultMethod("other")!;

  for (const d of defaults) {
    const norm = normalizeMethodName(d.label);
    const match = byName.get(norm);
    push(match ? match.id : d.key, d.label, norm);
  }
  for (const c of customs) {
    const norm = normalizeMethodName(c.name);
    if (norm && !used.has(norm) && norm !== normalizeMethodName(other.label)) push(c.id, c.name, norm);
  }
  const otherMatch = byName.get(normalizeMethodName(other.label));
  options.push({ value: otherMatch ? otherMatch.id : other.key, label: other.label });
  return options;
};
