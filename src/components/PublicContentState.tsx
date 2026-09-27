import { Loader2, type LucideIcon } from "lucide-react";

interface PublicContentStateProps {
  variant: "loading" | "error" | "empty";
  icon?: LucideIcon;
  title: string;
  description?: string;
}

/**
 * Loading/error/empty placeholder for public pages that fetch CMS content
 * (Events, Gallery). Kept deliberately plain — no skeleton shimmer, no
 * retry button — just enough that a slow or unreachable API never shows a
 * blank section or a raw error.
 */
const PublicContentState = ({ variant, icon: Icon, title, description }: PublicContentStateProps) => (
  <div className="py-16 text-center">
    {variant === "loading" ? (
      <Loader2 className="mx-auto mb-4 h-6 w-6 animate-spin text-muted-foreground" aria-hidden="true" />
    ) : Icon ? (
      <Icon className="mx-auto mb-4 h-8 w-8 text-muted-foreground" aria-hidden="true" />
    ) : null}
    <p className="font-heading text-lg font-semibold text-foreground">{title}</p>
    {description && <p className="mx-auto mt-2 max-w-md text-muted-foreground">{description}</p>}
  </div>
);

export default PublicContentState;
