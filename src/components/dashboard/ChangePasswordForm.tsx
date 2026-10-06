import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/auth/AuthProvider";
import { apiFetch, ApiClientError } from "@/lib/apiClient";

// Mirrors server/src/validators/auth.ts — the server is still authoritative.
const MIN_LENGTH = 8;
const MAX_BYTES = 72;

const validate = (current: string, next: string, confirm: string) => {
  const errors: Partial<Record<"currentPassword" | "newPassword" | "confirmPassword", string>> = {};
  if (!current) errors.currentPassword = "Enter your current password.";
  if (next.length < MIN_LENGTH) errors.newPassword = `Use at least ${MIN_LENGTH} characters.`;
  else if (new TextEncoder().encode(next).length > MAX_BYTES) errors.newPassword = `Use at most ${MAX_BYTES} bytes.`;
  else if (next === current) errors.newPassword = "Choose a password different from your current one.";
  if (confirm !== next) errors.confirmPassword = "The passwords don't match.";
  return errors;
};

/**
 * Change-password form for the signed-in admin. Lives in Settings → Security.
 * On success the server clears this device's session, so we sign out locally
 * and send the admin to the login page.
 */
const ChangePasswordForm = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ReturnType<typeof validate>>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const errors = validate(currentPassword, newPassword, confirmPassword);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      await apiFetch<{ message: string }>("/auth/change-password", {
        method: "POST",
        body: { currentPassword, newPassword },
      });
      toast.success("Password changed. Please sign in with your new password.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      await logout().catch(() => undefined);
      navigate("/login", { replace: true });
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 401 && error.message === "Not authenticated.") {
        // Session already ended elsewhere — send them to sign in again.
        navigate("/login", { replace: true });
        return;
      }
      setSubmitError(
        error instanceof ApiClientError ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggle = (
    <button
      type="button"
      onClick={() => setShowPasswords((v) => !v)}
      className="text-xs font-medium text-primary hover:underline"
    >
      {showPasswords ? (
        <span className="inline-flex items-center gap-1"><EyeOff className="h-3.5 w-3.5" /> Hide passwords</span>
      ) : (
        <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> Show passwords</span>
      )}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="cp-current">Current password</Label>
        <Input
          id="cp-current"
          type={showPasswords ? "text" : "password"}
          autoComplete="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          disabled={isSubmitting}
        />
        {fieldErrors.currentPassword && <p className="text-xs text-destructive">{fieldErrors.currentPassword}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cp-new">New password</Label>
        <Input
          id="cp-new"
          type={showPasswords ? "text" : "password"}
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={isSubmitting}
          aria-describedby="cp-new-help"
        />
        <p id="cp-new-help" className="text-xs text-muted-foreground">
          At least {MIN_LENGTH} characters.
        </p>
        {fieldErrors.newPassword && <p className="text-xs text-destructive">{fieldErrors.newPassword}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cp-confirm">Confirm new password</Label>
        <Input
          id="cp-confirm"
          type={showPasswords ? "text" : "password"}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isSubmitting}
        />
        {fieldErrors.confirmPassword && <p className="text-xs text-destructive">{fieldErrors.confirmPassword}</p>}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {toggle}
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Updating password…" : "Change password"}
        </Button>
      </div>

      {submitError && (
        <p role="alert" className="text-sm text-destructive">
          {submitError}
        </p>
      )}
    </form>
  );
};

export default ChangePasswordForm;
