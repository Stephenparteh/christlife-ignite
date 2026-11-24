import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { GivingMethodDetail } from "@/types/cms";

interface EntryMethod {
  name: string;
  description: string;
  instructions: string;
  details: GivingMethodDetail[];
}

const CopyButton = ({ value, label }: { value: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (insecure context, permissions). The value
      // is still plainly selectable text next to the button.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
};

/**
 * One numbered, horizontally-divided giving method. Used by the public
 * Giving page and by the admin "public preview", so what the admin sees is
 * exactly what visitors get. Everything is rendered as plain text (React
 * escapes it), and sections with no content simply don't render.
 */
const GivingMethodEntry = ({ method, index }: { method: EntryMethod; index: number }) => {
  const number = String(index + 1).padStart(2, "0");

  return (
    <li className="grid gap-4 border-t border-border py-10 sm:grid-cols-[4.5rem_1fr] sm:gap-6 md:py-12">
      <span className="font-heading text-sm font-semibold tracking-[0.2em] text-primary" aria-hidden="true">
        {number}
      </span>

      <div className="min-w-0">
        <h3 className="font-heading text-2xl font-bold leading-tight text-foreground md:text-3xl">{method.name}</h3>

        {method.description && (
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{method.description}</p>
        )}

        {method.details.length > 0 && (
          <dl className="mt-6 divide-y divide-border/70 border-y border-border/70">
            {method.details.map((detail, i) => (
              <div key={`${detail.label}-${i}`} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {detail.label}
                </dt>
                <dd className="flex min-w-0 items-start justify-between gap-3">
                  <span className="min-w-0 whitespace-pre-wrap break-words font-medium text-foreground">
                    {detail.value}
                  </span>
                  <CopyButton value={detail.value} label={detail.label} />
                </dd>
              </div>
            ))}
          </dl>
        )}

        {method.instructions && (
          <p className="mt-6 max-w-xl whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground/80">
            {method.instructions}
          </p>
        )}
      </div>
    </li>
  );
};

export default GivingMethodEntry;
