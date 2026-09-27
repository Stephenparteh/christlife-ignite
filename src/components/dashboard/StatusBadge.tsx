import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ContentStatus } from "@/data/dashboardMockData";

const STATUS_LABEL: Record<ContentStatus, string> = {
  published: "Published",
  draft: "Draft",
};

/**
 * Status is always shown as a labeled dot + text, not color alone, so it
 * still reads correctly for colorblind users or in a black & white printout.
 */
const StatusBadge = ({ status }: { status: ContentStatus }) => (
  <Badge
    variant="outline"
    className={cn(
      "gap-1.5 font-medium",
      status === "published"
        ? "border-primary/30 bg-primary/10 text-primary"
        : "border-border bg-muted text-muted-foreground",
    )}
  >
    <span
      className={cn(
        "h-1.5 w-1.5 rounded-full",
        status === "published" ? "bg-primary" : "bg-muted-foreground",
      )}
      aria-hidden="true"
    />
    {STATUS_LABEL[status]}
  </Badge>
);

export default StatusBadge;
