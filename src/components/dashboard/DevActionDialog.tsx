import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DevActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  saveLabel?: string;
}

/**
 * Shared shell for the "Add"/"Edit" dialogs across the management pages.
 * The form fields are real and controlled by the caller, but Save never
 * persists anything in Milestone 1 — it says so, then closes. Milestone 3
 * swaps that Save handler for a real API call without touching this shell.
 */
const DevActionDialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  saveLabel = "Save",
}: DevActionDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>

      <div className="space-y-4 py-1">{children}</div>

      <p className="text-xs text-muted-foreground">
        Preview only — saving will be connected to the database in a later milestone.
      </p>

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            toast.info("Preview only — nothing was saved.", {
              description: "This form isn't connected to a database yet.",
            });
            onOpenChange(false);
          }}
        >
          {saveLabel}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DevActionDialog;
