import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiClientError } from "@/lib/apiClient";
import { parseFieldError } from "@/lib/fieldError";
import { givingRequestsPublicService } from "@/services/giving";
import {
  GIVING_CURRENCIES,
  GIVING_PURPOSES,
  type GivingCurrency,
  type GivingPurpose,
  type PublicGivingMethod,
} from "@/types/cms";

const FIELDS = [
  "fullName",
  "phone",
  "email",
  "purpose",
  "customPurpose",
  "amount",
  "currency",
  "preferredMethodId",
  "note",
] as const;

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  purpose: GivingPurpose | "";
  customPurpose: string;
  amount: string;
  currency: GivingCurrency | "";
  preferredMethodId: string;
  note: string;
}

const initialState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  purpose: "",
  customPurpose: "",
  amount: "",
  currency: "",
  preferredMethodId: "",
  note: "",
};

const underlineInput =
  "h-11 rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/60";
const underlineTrigger =
  "h-11 w-full rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none focus:ring-0 focus:border-primary data-[placeholder]:text-muted-foreground/60";

const validate = (form: FormState): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (!form.fullName.trim()) errors.fullName = "Full name is required.";

  const digits = form.phone.replace(/\D/g, "").length;
  if (!form.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^\+?[0-9 ()\-.]+$/.test(form.phone.trim()) || digits < 6 || digits > 15)
    errors.phone = "Enter a valid phone number, including country code if outside Liberia.";

  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "Enter a valid email address.";

  if (!form.purpose) errors.purpose = "Choose a giving purpose.";
  if (form.purpose === "Other" && !form.customPurpose.trim()) errors.customPurpose = "Please describe the purpose.";

  const amount = form.amount.trim();
  if (!amount) errors.amount = "Enter the amount you intend to give.";
  else if (!/^\d+(\.\d{1,2})?$/.test(amount) || !(Number(amount) > 0) || Number(amount) > 1_000_000_000)
    errors.amount = "Enter a valid amount greater than zero (up to 2 decimals).";

  if (!form.currency) errors.currency = "Choose a currency.";
  if (!form.preferredMethodId) errors.preferredMethodId = "Choose a giving method.";
  return errors;
};

interface GivingRequestFormProps {
  methods: PublicGivingMethod[];
  methodsLoading: boolean;
  methodsError: boolean;
}

const GivingRequestForm = ({ methods, methodsLoading, methodsError }: GivingRequestFormProps) => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Synchronous guard: state updates are async, so a fast double-click
  // could otherwise slip a second submit through before the button disables.
  const inFlight = useRef(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: "" } : prev));
  };

  const noMethods = !methodsLoading && !methodsError && methods.length === 0;
  const canSubmit = methods.length > 0 && !isSubmitting;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current || methods.length === 0) return;

    const found = validate(form);
    setErrors(found);
    setFormError(null);
    const firstInvalid = FIELDS.find((f) => found[f]);
    if (firstInvalid) {
      document.getElementById(`gr-${firstInvalid}`)?.focus();
      return;
    }

    inFlight.current = true;
    setIsSubmitting(true);
    try {
      await givingRequestsPublicService.create({
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        purpose: form.purpose as GivingPurpose,
        customPurpose: form.purpose === "Other" ? form.customPurpose.trim() : "",
        amount: Number(form.amount),
        currency: form.currency as GivingCurrency,
        preferredMethodId: form.preferredMethodId,
        note: form.note.trim(),
      });
      // Reached only after the backend confirmed it saved the request.
      setIsSubmitted(true);
    } catch (err) {
      const message = err instanceof ApiClientError ? err.message : "Something went wrong. Please try again.";
      const parsed = parseFieldError(message, FIELDS);
      if (parsed.field) setErrors({ [parsed.field]: parsed.message });
      else setFormError(message);
    } finally {
      inFlight.current = false;
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setForm(initialState);
    setErrors({});
    setFormError(null);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div role="status" className="flex items-start gap-4 border-y border-primary/30 bg-primary/5 p-6 md:p-8">
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <p className="font-heading text-xl font-semibold text-foreground">Request received!</p>
          <p className="mt-1 max-w-md text-muted-foreground">
            Thank you for reaching out. Our team has received your giving request and will contact you soon.
          </p>
          <Button variant="outline" className="mt-5" onClick={reset}>
            Submit another request
          </Button>
        </div>
      </div>
    );
  }

  const fieldError = (name: string) =>
    errors[name] ? (
      <p id={`gr-${name}-error`} className="text-xs text-destructive">
        {errors[name]}
      </p>
    ) : null;
  const a11y = (name: string) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `gr-${name}-error` : undefined,
  });

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-10" aria-busy={isSubmitting}>
      <div className="flex items-start gap-3 border-l-2 border-primary bg-primary/5 px-4 py-3 text-sm text-foreground/80">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <p>Never share your PIN, password, banking credentials, OTP, or card details through this form.</p>
      </div>

      {noMethods && (
        <p className="border border-border p-4 text-sm text-muted-foreground">
          Giving methods are being set up, so requests can't be sent just yet. Please check back soon or reach out
          through our Contact page.
        </p>
      )}
      {methodsError && (
        <p role="alert" className="border border-destructive/40 p-4 text-sm text-destructive">
          We couldn't load the available giving methods. Please refresh the page and try again.
        </p>
      )}

      <fieldset className="space-y-6" disabled={isSubmitting}>
        <legend className="eyebrow mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Personal information
        </legend>
        <div className="space-y-2">
          <Label htmlFor="gr-fullName">Full name</Label>
          <Input
            id="gr-fullName"
            autoComplete="name"
            maxLength={200}
            value={form.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            className={underlineInput}
            {...a11y("fullName")}
          />
          {fieldError("fullName")}
        </div>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="space-y-2">
            <Label htmlFor="gr-phone">Phone number</Label>
            <Input
              id="gr-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+231 …"
              maxLength={40}
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={underlineInput}
              {...a11y("phone")}
            />
            {fieldError("phone")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gr-email">
              Email address <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="gr-email"
              type="email"
              autoComplete="email"
              maxLength={254}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={underlineInput}
              {...a11y("email")}
            />
            {fieldError("email")}
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-6" disabled={isSubmitting}>
        <legend className="eyebrow mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Giving information
        </legend>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="space-y-2">
            <Label htmlFor="gr-purpose">Giving purpose</Label>
            <Select value={form.purpose} onValueChange={(v) => set("purpose", v as GivingPurpose)}>
              <SelectTrigger id="gr-purpose" className={underlineTrigger} {...a11y("purpose")}>
                <SelectValue placeholder="Select a purpose" />
              </SelectTrigger>
              <SelectContent>
                {GIVING_PURPOSES.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError("purpose")}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gr-preferredMethodId">Preferred giving method</Label>
            <Select
              value={form.preferredMethodId}
              onValueChange={(v) => set("preferredMethodId", v)}
              disabled={methods.length === 0}
            >
              <SelectTrigger id="gr-preferredMethodId" className={underlineTrigger} {...a11y("preferredMethodId")}>
                <SelectValue placeholder={methodsLoading ? "Loading methods…" : "Select a method"} />
              </SelectTrigger>
              <SelectContent>
                {methods.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError("preferredMethodId")}
          </div>
        </div>

        {form.purpose === "Other" && (
          <div className="space-y-2">
            <Label htmlFor="gr-customPurpose">Describe the purpose</Label>
            <Input
              id="gr-customPurpose"
              maxLength={200}
              value={form.customPurpose}
              onChange={(e) => set("customPurpose", e.target.value)}
              className={underlineInput}
              {...a11y("customPurpose")}
            />
            {fieldError("customPurpose")}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="space-y-2">
            <Label htmlFor="gr-amount">Intended amount</Label>
            <Input
              id="gr-amount"
              inputMode="decimal"
              autoComplete="off"
              placeholder="0.00"
              maxLength={14}
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
              className={underlineInput}
              {...a11y("amount")}
            />
            {fieldError("amount")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gr-currency">Currency</Label>
            <Select value={form.currency} onValueChange={(v) => set("currency", v as GivingCurrency)}>
              <SelectTrigger id="gr-currency" className={underlineTrigger} {...a11y("currency")}>
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                {GIVING_CURRENCIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError("currency")}
          </div>
        </div>
        <p className="-mt-2 text-xs text-muted-foreground">
          This is the amount you intend to give. Nothing is charged or processed through this form.
        </p>

        <div className="space-y-2">
          <Label htmlFor="gr-note">
            Additional note <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="gr-note"
            rows={4}
            maxLength={1000}
            placeholder="Anything else you'd like our team to know?"
            value={form.note}
            onChange={(e) => set("note", e.target.value)}
            className="rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/60"
            {...a11y("note")}
          />
          {fieldError("note")}
        </div>
      </fieldset>

      {formError && (
        <p role="alert" className="border border-destructive/40 p-4 text-sm text-destructive">
          {formError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={!canSubmit} className="px-8">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Send Giving Request"
        )}
      </Button>
    </form>
  );
};

export default GivingRequestForm;
