import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

/** The single <h1> for a dashboard page, with an optional primary action. */
const PageHeader = ({ title, description, action }: PageHeaderProps) => (
  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground md:text-base">
          {description}
        </p>
      )}
    </div>
    {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
  </div>
);

export default PageHeader;
