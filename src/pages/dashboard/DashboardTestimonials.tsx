import { useState } from "react";
import { MessageSquareQuote, Plus } from "lucide-react";
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
import { mockTestimonials, type DashboardTestimonial } from "@/data/dashboardMockData";

const DashboardTestimonials = () => {
  const [testimonials] = useState<DashboardTestimonial[]>(mockTestimonials);
  const [editingTestimonial, setEditingTestimonial] = useState<DashboardTestimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingTestimonial, setDeletingTestimonial] = useState<DashboardTestimonial | null>(null);

  const openAddDialog = () => {
    setEditingTestimonial(null);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Manage the testimonials shown on the homepage. Existing wording is official — edits here are preview-only until a database is connected."
        action={
          <Button onClick={openAddDialog}>
            <Plus className="h-4 w-4" />
            Add Testimonial
          </Button>
        }
      />

      {testimonials.length === 0 ? (
        <EmptyState
          icon={MessageSquareQuote}
          title="No testimonials yet"
          description="Add a testimonial to start sharing stories from the Christ Life community."
          action={
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4" />
              Add Testimonial
            </Button>
          }
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id} className="flex flex-col justify-between rounded-lg border border-border p-5">
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <StatusBadge status={testimonial.status} />
                  <ActionMenu
                    label={testimonial.author}
                    onEdit={() => {
                      setEditingTestimonial(testimonial);
                      setIsDialogOpen(true);
                    }}
                    onDelete={() => setDeletingTestimonial(testimonial)}
                  />
                </div>
                <blockquote className="text-sm leading-relaxed text-foreground">
                  “{testimonial.quote}”
                </blockquote>
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-primary">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <DevActionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
        description={
          editingTestimonial
            ? "Existing testimonials are official content — please keep the wording exact unless the member has asked for a change."
            : undefined
        }
        saveLabel={editingTestimonial ? "Save changes" : "Add testimonial"}
      >
        <div className="space-y-1.5">
          <Label htmlFor="testimonial-quote">Quote</Label>
          <Textarea id="testimonial-quote" defaultValue={editingTestimonial?.quote} rows={4} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="testimonial-author">Author</Label>
            <Input id="testimonial-author" defaultValue={editingTestimonial?.author} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="testimonial-role">Role</Label>
            <Input id="testimonial-role" defaultValue={editingTestimonial?.role} placeholder="e.g. Member" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="testimonial-status">Status</Label>
          <Select defaultValue={editingTestimonial?.status ?? "draft"}>
            <SelectTrigger id="testimonial-status">
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
        open={!!deletingTestimonial}
        onOpenChange={(open) => !open && setDeletingTestimonial(null)}
        title="Delete this testimonial?"
        description={`The testimonial from "${deletingTestimonial?.author}" will be removed from the homepage.`}
      />
    </div>
  );
};

export default DashboardTestimonials;
