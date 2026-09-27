import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
}

/** Flat, minimal stat tile — no gradients, no oversized icon circle. */
const StatCard = ({ label, value, icon: Icon, hint }: StatCardProps) => (
  <div className="rounded-lg border border-border bg-card p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
    </div>
    <p className="mt-2 font-heading text-2xl font-bold text-foreground">{value}</p>
    {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
  </div>
);

export default StatCard;
