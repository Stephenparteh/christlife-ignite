import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CalendarDays, Plus, Search } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ActionMenu from "@/components/dashboard/ActionMenu";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import FormDialog from "@/components/dashboard/FormDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiClientError } from "@/lib/apiClient";
import { eventsService } from "@/services/events";
import type { Event, EventInput } from "@/types/cms";

const QUERY_KEY = ["events", "dashboard"];

interface EventFormState {
  title: string;
  description: string;
  dateLabel: string;
  time: string;
  location: string;
  category: string;
  coverImageUrl: string;
  link: string;
  featured: boolean;
  published: boolean;
}

const emptyForm: EventFormState = {
  title: "",
  description: "",
  dateLabel: "",
  time: "",
  location: "",
  category: "",
  coverImageUrl: "",
  link: "",
  featured: false,
  published: true,
};

const toFormState = (event?: Event | null): EventFormState =>
  event
    ? {
        title: event.title,
        description: event.description,
        dateLabel: event.dateLabel,
        time: event.time,
        location: event.location,
        category: event.category,
        coverImageUrl: event.coverImageUrl,
        link: event.link,
        featured: event.featured,
        published: event.published,
      }
    : emptyForm;

const errorMessage = (error: unknown) =>
  error instanceof ApiClientError ? error.message : "Something went wrong. Please try again.";

const DashboardEvents = () => {
  const queryClient = useQueryClient();
  const { data: events, isLoading, isError } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: eventsService.list,
  });

  const [query, setQuery] = useState("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  const [form, setForm] = useState<EventFormState>(emptyForm);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: (input: Partial<EventInput>) => eventsService.create(input),
    onSuccess: () => {
      invalidate();
      toast.success("Event added.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<EventInput> }) =>
      eventsService.update(id, input),
    onSuccess: () => {
      invalidate();
      toast.success("Event updated.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => eventsService.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success("Event deleted.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const filteredEvents = useMemo(() => {
    if (!events) return [];
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter(
      (event) => event.title.toLowerCase().includes(q) || event.category.toLowerCase().includes(q),
    );
  }, [events, query]);

  const openAddDialog = () => {
    setEditingEvent(null);
    setForm(emptyForm);
    setIsDialogOpen(true);
  };

  const openEditDialog = (event: Event) => {
    setEditingEvent(event);
    setForm(toFormState(event));
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (editingEvent) {
      await updateMutation.mutateAsync({ id: editingEvent._id, input: form });
    } else {
      await createMutation.mutateAsync(form);
    }
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

      {isLoading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Loading events…</p>
      ) : isError ? (
        <EmptyState
          icon={CalendarDays}
          title="Couldn't load events"
          description="Something went wrong talking to the server. Try refreshing the page."
        />
      ) : (
        <>
          {events && events.length > 0 && (
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

          {!events || events.length === 0 ? (
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
                <li key={event._id} className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-foreground">{event.title}</p>
                      <StatusBadge status={event.published ? "published" : "draft"} />
                      {event.featured && <Badge variant="outline">Featured</Badge>}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {[event.category, event.dateLabel, event.time, event.location].filter(Boolean).join(" · ")}
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
        </>
      )}

      <FormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingEvent ? "Edit Event" : "Add Event"}
        description={
          editingEvent
            ? `Update the details for "${editingEvent.title}".`
            : "Add a new event to the public Events page."
        }
        saveLabel={editingEvent ? "Save changes" : "Add event"}
        onSave={handleSave}
      >
        <div className="space-y-1.5">
          <Label htmlFor="event-title">Title</Label>
          <Input
            id="event-title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Community Picnic"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="event-date">Date</Label>
            <Input
              id="event-date"
              value={form.dateLabel}
              onChange={(e) => setForm({ ...form, dateLabel: e.target.value })}
              placeholder="e.g. TBA"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="event-time">Time</Label>
            <Input
              id="event-time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              placeholder="e.g. Afternoon"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="event-location">Location</Label>
            <Input
              id="event-location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. In-Person"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="event-category">Category</Label>
            <Input
              id="event-category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g. Outreach"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="event-description">Description</Label>
          <Textarea
            id="event-description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="What is this event about?"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="event-cover">Cover image URL</Label>
            <Input
              id="event-cover"
              value={form.coverImageUrl}
              onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
              placeholder="/gallery/photos/group1.jpeg"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="event-link">RSVP / link</Label>
            <Input
              id="event-link"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="event-status">Status</Label>
          <Select
            value={form.published ? "published" : "draft"}
            onValueChange={(value) => setForm({ ...form, published: value === "published" })}
          >
            <SelectTrigger id="event-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-md border border-border p-4">
          <div>
            <p className="text-sm font-medium text-foreground">Featured event</p>
            <p className="text-sm text-muted-foreground">
              Shows in the "Featured Event" spot on the public Events page.
            </p>
          </div>
          <Switch
            checked={form.featured}
            onCheckedChange={(checked) => setForm({ ...form, featured: checked })}
            aria-label="Featured event"
          />
        </div>
      </FormDialog>

      <ConfirmDialog
        open={!!deletingEvent}
        onOpenChange={(open) => !open && setDeletingEvent(null)}
        title="Delete this event?"
        description={`"${deletingEvent?.title}" will be permanently removed from the events page. This cannot be undone.`}
        onConfirm={async () => {
          if (deletingEvent) await deleteMutation.mutateAsync(deletingEvent._id);
        }}
      />
    </div>
  );
};

export default DashboardEvents;
