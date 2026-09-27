import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  CalendarDays,
  BookOpen,
  Images,
  MessageSquareQuote,
  Clock,
  Plus,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import EmptyState from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import { eventsService } from "@/services/events";
import { galleryService } from "@/services/gallery";
import { testimonialsService } from "@/services/testimonials";
import { bibleStudyService } from "@/services/bibleStudy";

const quickActions = [
  { label: "Add Event", to: "/dashboard/events", icon: CalendarDays },
  { label: "Update Bible Study", to: "/dashboard/bible-study", icon: BookOpen },
  { label: "Add Gallery Item", to: "/dashboard/gallery", icon: Images },
  { label: "Add Testimonial", to: "/dashboard/testimonials", icon: MessageSquareQuote },
];

const DashboardOverview = () => {
  const events = useQuery({ queryKey: ["events", "dashboard"], queryFn: eventsService.list });
  const gallery = useQuery({ queryKey: ["gallery", "dashboard"], queryFn: galleryService.list });
  const testimonials = useQuery({ queryKey: ["testimonials", "dashboard"], queryFn: testimonialsService.list });
  const bibleStudy = useQuery({ queryKey: ["bible-study", "dashboard"], queryFn: bibleStudyService.get });

  const isLoading = events.isLoading || gallery.isLoading || testimonials.isLoading || bibleStudy.isLoading;

  // "Recently updated" is real data — each record's own updatedAt — not a
  // fabricated activity log (Milestone 3 explicitly doesn't add audit logs).
  const recentlyUpdated = [
    ...(events.data ?? []).map((e) => ({ label: "Event", target: e.title, updatedAt: e.updatedAt })),
    ...(gallery.data ?? []).map((g) => ({ label: "Gallery item", target: g.title, updatedAt: g.updatedAt })),
    ...(testimonials.data ?? []).map((t) => ({ label: "Testimonial", target: t.author, updatedAt: t.updatedAt })),
  ]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const publishedEvents = events.data?.filter((e) => e.published).length ?? 0;

  return (
    <div>
      <PageHeader
        title="Overview"
        description="A quick look at your Christ Life website content."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Events"
          value={isLoading ? "…" : events.data?.length ?? 0}
          icon={CalendarDays}
          hint={isLoading ? undefined : `${publishedEvents} published`}
        />
        <StatCard
          label="Bible Study"
          value={isLoading ? "…" : `${bibleStudy.data?.sessions.length ?? 0}x`}
          icon={BookOpen}
          hint="sessions per week"
        />
        <StatCard
          label="Gallery Items"
          value={isLoading ? "…" : gallery.data?.length ?? 0}
          icon={Images}
          hint={isLoading ? undefined : `${gallery.data?.filter((g) => g.type === "video").length ?? 0} videos`}
        />
        <StatCard
          label="Testimonials"
          value={isLoading ? "…" : testimonials.data?.length ?? 0}
          icon={MessageSquareQuote}
          hint="shown on homepage"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
            Recently Updated
          </h2>

          {isLoading ? (
            <p className="py-6 text-sm text-muted-foreground">Loading…</p>
          ) : recentlyUpdated.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="No content yet"
              description="Updates to events, the gallery, and testimonials will show up here."
            />
          ) : (
            <ul className="divide-y divide-border rounded-lg border border-border">
              {recentlyUpdated.map((activity, index) => (
                <li key={index} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-foreground">
                      {activity.label}
                      <span className="text-muted-foreground"> — {activity.target}</span>
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.updatedAt), { addSuffix: true })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                asChild
                variant="outline"
                className="justify-start gap-2"
              >
                <Link to={action.to}>
                  <Plus className="h-4 w-4" />
                  {action.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
