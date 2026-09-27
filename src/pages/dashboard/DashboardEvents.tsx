import { useMemo, useState } from "react";
import { CalendarDays, Plus, Search } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ActionMenu from "@/components/dashboard/ActionMenu";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import DevActionDialog from "@/components/dashboard/DevActionDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockEvents, type DashboardEvent } from "@/data/dashboardMockData";

const DashboardEvents = () => {
  const [events] = useState<DashboardEvent[]>(mockEvents);
  const [query, setQuery] = useState("");
  const [editingEvent, setEditingEvent] = useState<DashboardEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState<DashboardEvent | null>(null);

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(q) || event.category.toLowerCase().includes(q),
    );
  }, [events, query]);

  const openAddDialog = () => {
    setEditingEvent(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (event: DashboardEvent) => {
    setEditingEvent(event);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <PageHeader
        title="Events"
        description="Manage the events shown on the public Events page."
        action={
          <Button onClick={openAddDialog}>
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        }
      />

      {events.length > 0 && (
        <div className="relative mb-5 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events…"
            aria-label="Search events"
            className="pl-9"
          />
        </div>
      )}

      {events.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No events yet"
          description="Create your first event to start building the Christ Life events calendar."
          action={
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          }
        />
      ) : filteredEvents.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No events match "{query}".
        </p>
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border">
          {filteredEvents.map((event) => (
            <li key={event.id} className="flex items-start justify-between gap-4 p-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-foreground">{event.title}</p>
                  <StatusBadge status={event.status} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {event.category} · {event.date} · {event.time} · {event.location}
                </p>
                <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
                  {event.description}
                </p>
              </div>
              <ActionMenu
                label={event.title}
                onEdit={() => openEditDialog(event)}
                onDelete={() => setDeletingEvent(event)}
              />
            </li>
          ))}
        </ul>
      )}

      <DevActionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingEvent ? "Edit Event" : "Add Event"}
        description={
          editingEvent
            ? `Update the details for "${editingEvent.title}".`
            : "Add a new event to the public Events page."
        }
        saveLabel={editingEvent ? "Save changes" : "Add event"}
      >
        <div className="space-y-1.5">
          <Label htmlFor="event-title">Title</Label>
          <Input id="event-title" defaultValue={editingEvent?.title} placeholder="e.g. Community Picnic" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="event-date">Date</Label>
            <Input id="event-date" defaultValue={editingEvent?.date} placeholder="e.g. TBA" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="event-time">Time</Label>
            <Input id="event-time" defaultValue={editingEvent?.time} placeholder="e.g. Afternoon" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="event-location">Location</Label>
            <Input id="event-location" defaultValue={editingEvent?.location} placeholder="e.g. In-Person" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="event-category">Category</Label>
            <Input id="event-category" defaultValue={editingEvent?.category} placeholder="e.g. Outreach" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="event-description">Description</Label>
          <Textarea
            id="event-description"
            defaultValue={editingEvent?.description}
            placeholder="What is this event about?"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="event-status">Status</Label>
          <Select defaultValue={editingEvent?.status ?? "draft"}>
            <SelectTrigger id="event-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DevActionDialog>

      <ConfirmDialog
        open={!!deletingEvent}
        onOpenChange={(open) => !open && setDeletingEvent(null)}
        title="Delete this event?"
        description={`"${deletingEvent?.title}" will be removed from the events page. This action cannot be undone once connected to the database.`}
      />
    </div>
  );
};

export default DashboardEvents;
