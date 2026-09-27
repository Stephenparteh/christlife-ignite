import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-16 text-center">
    <Icon className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
    <div>
      <p className="font-heading text-base font-semibold text-foreground">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
    {action}
  </div>
);

export default EmptyState;
