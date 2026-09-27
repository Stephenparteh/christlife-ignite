import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MessageSquareQuote, Plus } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiClientError } from "@/lib/apiClient";
import { testimonialsService } from "@/services/testimonials";
import type { Testimonial, TestimonialInput } from "@/types/cms";

const QUERY_KEY = ["testimonials", "dashboard"];

interface TestimonialFormState {
  author: string;
  role: string;
  quote: string;
  published: boolean;
}

const emptyForm: TestimonialFormState = { author: "", role: "", quote: "", published: true };

const toFormState = (t: Testimonial): TestimonialFormState => ({
  author: t.author,
  role: t.role,
  quote: t.quote,
  published: t.published,
});

const errorMessage = (error: unknown) =>
  error instanceof ApiClientError ? error.message : "Something went wrong. Please try again.";

const DashboardTestimonials = () => {
  const queryClient = useQueryClient();
  const { data: testimonials, isLoading, isError } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: testimonialsService.list,
  });

  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingTestimonial, setDeletingTestimonial] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<TestimonialFormState>(emptyForm);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: (input: Partial<TestimonialInput>) => testimonialsService.create(input),
    onSuccess: () => {
      invalidate();
      toast.success("Testimonial added.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<TestimonialInput> }) =>
      testimonialsService.update(id, input),
    onSuccess: () => {
      invalidate();
      toast.success("Testimonial updated.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => testimonialsService.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success("Testimonial deleted.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const openAddDialog = () => {
    setEditingTestimonial(null);
    setForm(emptyForm);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (editingTestimonial) {
      await updateMutation.mutateAsync({ id: editingTestimonial._id, input: form });
    } else {
      await createMutation.mutateAsync(form);
    }
  };

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Manage the testimonials shown on the homepage."
        action={
          <Button onClick={openAddDialog}>
            <Plus className="h-4 w-4" />
            Add Testimonial
          </Button>
        }
      />

      {isLoading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Loading testimonials…</p>
      ) : isError ? (
        <EmptyState
          icon={MessageSquareQuote}
          title="Couldn't load testimonials"
          description="Something went wrong talking to the server. Try refreshing the page."
        />
      ) : !testimonials || testimonials.length === 0 ? (
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
            <li key={testimonial._id} className="flex flex-col justify-between rounded-lg border border-border p-5">
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <StatusBadge status={testimonial.published ? "published" : "draft"} />
                  <ActionMenu
                    label={testimonial.author}
                    onEdit={() => {
                      setEditingTestimonial(testimonial);
                      setForm(toFormState(testimonial));
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

      <FormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
        description={
          editingTestimonial
            ? "Existing testimonials are official content — please keep the wording exact unless the member has asked for a change."
            : undefined
        }
        saveLabel={editingTestimonial ? "Save changes" : "Add testimonial"}
        onSave={handleSave}
      >
        <div className="space-y-1.5">
          <Label htmlFor="testimonial-quote">Quote</Label>
          <Textarea
            id="testimonial-quote"
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            rows={4}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="testimonial-author">Author</Label>
            <Input
              id="testimonial-author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="testimonial-role">Role</Label>
            <Input
              id="testimonial-role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="e.g. Member"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="testimonial-status">Status</Label>
          <Select
            value={form.published ? "published" : "draft"}
            onValueChange={(value) => setForm({ ...form, published: value === "published" })}
          >
            <SelectTrigger id="testimonial-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={!!deletingTestimonial}
        onOpenChange={(open) => !open && setDeletingTestimonial(null)}
        title="Delete this testimonial?"
        description={`The testimonial from "${deletingTestimonial?.author}" will be permanently removed from the homepage. This cannot be undone.`}
        onConfirm={async () => {
          if (deletingTestimonial) await deleteMutation.mutateAsync(deletingTestimonial._id);
        }}
      />
    </div>
  );
};

export default DashboardTestimonials;
