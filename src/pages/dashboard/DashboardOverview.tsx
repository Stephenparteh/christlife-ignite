import { Link } from "react-router-dom";
import {
  CalendarDays,
  BookOpen,
  Images,
  MessageSquareQuote,
  Info,
  Clock,
  Plus,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import EmptyState from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import {
  mockEvents,
  mockBibleStudySessions,
  mockGalleryItems,
  mockTestimonials,
  mockRecentActivity,
} from "@/data/dashboardMockData";

const quickActions = [
  { label: "Add Event", to: "/dashboard/events", icon: CalendarDays },
  { label: "Update Bible Study", to: "/dashboard/bible-study", icon: BookOpen },
  { label: "Add Gallery Item", to: "/dashboard/gallery", icon: Images },
  { label: "Add Testimonial", to: "/dashboard/testimonials", icon: MessageSquareQuote },
];

const DashboardOverview = () => {
  const publishedEvents = mockEvents.filter((e) => e.status === "published").length;

  return (
    <div>
      <PageHeader
        title="Overview"
        description="A quick look at your Christ Life website content."
      />

      <div className="mb-6 flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="min-w-0">
          The numbers and activity below are sample development data, not
          live figures. They will update automatically once the dashboard is
          connected to the database in a later milestone.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Events"
          value={mockEvents.length}
          icon={CalendarDays}
          hint={`${publishedEvents} published`}
        />
        <StatCard
          label="Bible Study"
          value={`${mockBibleStudySessions.length}x`}
          icon={BookOpen}
          hint="sessions per week"
        />
        <StatCard
          label="Gallery Items"
          value={mockGalleryItems.length}
          icon={Images}
          hint={`${mockGalleryItems.filter((g) => g.type === "video").length} videos`}
        />
        <StatCard
          label="Testimonials"
          value={mockTestimonials.length}
          icon={MessageSquareQuote}
          hint="shown on homepage"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
            Recent Activity
          </h2>

          {mockRecentActivity.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="No activity yet"
              description="Updates to events, the gallery, and testimonials will show up here."
            />
          ) : (
            <ul className="divide-y divide-border rounded-lg border border-border">
              {mockRecentActivity.map((activity) => (
                <li key={activity.id} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="text-sm text-foreground">
                      {activity.label}
                      <span className="text-muted-foreground"> — {activity.target}</span>
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {activity.relativeTime}
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
