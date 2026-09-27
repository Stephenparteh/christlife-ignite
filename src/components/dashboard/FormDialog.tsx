import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  saveLabel?: string;
  /** Performs the real create/update call. The caller owns the form field state and builds the payload from it. Throwing keeps the dialog open; the caller's mutation is responsible for the error toast. */
  onSave: () => Promise<void>;
}

/** Shared shell for the "Add"/"Edit" dialogs across the CMS management pages. */
const FormDialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  saveLabel = "Save",
  onSave,
}: FormDialogProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
      onOpenChange(false);
    } catch {
      // The mutation's own onError shows the toast; keep the dialog open
      // so the admin can fix the input and retry.
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !isSaving && onOpenChange(next)}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="space-y-4 py-1">{children}</div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving…" : saveLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
