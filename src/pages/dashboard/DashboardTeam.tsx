import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Users } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ActionMenu from "@/components/dashboard/ActionMenu";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import FormDialog from "@/components/dashboard/FormDialog";
import MediaUploadField from "@/components/dashboard/MediaUploadField";
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
import { parseFieldError } from "@/lib/fieldError";
import { teamService } from "@/services/team";
import type { TeamMember, TeamMemberInput } from "@/types/cms";

const QUERY_KEY = ["team", "dashboard"];
const FORM_FIELDS = ["name", "role", "imageUrl", "bio"] as const;

interface TeamFormState {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  order: number;
  published: boolean;
}

const emptyForm: TeamFormState = { name: "", role: "", imageUrl: "", bio: "", order: 0, published: true };

const toFormState = (member: TeamMember): TeamFormState => ({
  name: member.name,
  role: member.role,
  imageUrl: member.imageUrl,
  bio: member.bio,
  order: member.order,
  published: member.published,
});

const errorMessage = (error: unknown) =>
  error instanceof ApiClientError ? error.message : "Something went wrong. Please try again.";

const DashboardTeam = () => {
  const queryClient = useQueryClient();
  const { data: members, isLoading, isError } = useQuery({ queryKey: QUERY_KEY, queryFn: teamService.list });

  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingMember, setDeletingMember] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<TeamFormState>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const invalidate = () => queryClient.invalidateQueries({ queryKey: QUERY_KEY });

  const handleError = (error: unknown) => {
    const message = errorMessage(error);
    const parsed = parseFieldError(message, FORM_FIELDS);
    setFieldErrors(parsed.field ? { [parsed.field]: parsed.message } : {});
    toast.error(parsed.message);
  };

  const createMutation = useMutation({
    mutationFn: (input: Partial<TeamMemberInput>) => teamService.create(input),
    onSuccess: () => {
      invalidate();
      toast.success("Team member added.");
    },
    onError: handleError,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<TeamMemberInput> }) =>
      teamService.update(id, input),
    onSuccess: () => {
      invalidate();
      toast.success("Team member updated.");
    },
    onError: handleError,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => teamService.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success("Team member deleted.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const openAddDialog = () => {
    setEditingMember(null);
    setForm({ ...emptyForm, order: (members?.length ?? 0) });
    setFieldErrors({});
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (editingMember) {
      await updateMutation.mutateAsync({ id: editingMember._id, input: form });
    } else {
      await createMutation.mutateAsync(form);
    }
  };

  return (
    <div>
      <PageHeader
        title="Team"
        description="Manage the leadership profiles shown on the About page."
        action={
          <Button onClick={openAddDialog}>
            <Plus className="h-4 w-4" />
            Add Team Member
          </Button>
        }
      />

      {isLoading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Loading team…</p>
      ) : isError ? (
        <EmptyState
          icon={Users}
          title="Couldn't load the team"
          description="Something went wrong talking to the server. Try refreshing the page."
        />
      ) : !members || members.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No team members yet"
          description="Add a leader to show them on the About page."
          action={
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4" />
              Add Team Member
            </Button>
          }
        />
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border">
          {members.map((member) => (
            <li key={member._id} className="flex items-center justify-between gap-4 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                  {member.imageUrl && (
                    <img src={member.imageUrl} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-medium text-foreground">{member.name}</p>
                    <StatusBadge status={member.published ? "published" : "draft"} />
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <ActionMenu
                label={member.name}
                onEdit={() => {
                  setEditingMember(member);
                  setForm(toFormState(member));
                  setFieldErrors({});
                  setIsDialogOpen(true);
                }}
                onDelete={() => setDeletingMember(member)}
              />
            </li>
          ))}
        </ul>
      )}

      <FormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingMember ? "Edit Team Member" : "Add Team Member"}
        saveLabel={editingMember ? "Save changes" : "Add team member"}
        onSave={handleSave}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="team-name">Name</Label>
            <Input id="team-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="team-role">Role</Label>
            <Input
              id="team-role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="e.g. Secretary"
            />
            {fieldErrors.role && <p className="text-xs text-destructive">{fieldErrors.role}</p>}
          </div>
        </div>

        <MediaUploadField
          id="team-image"
          label="Photo"
          value={form.imageUrl}
          onChange={(value) => setForm({ ...form, imageUrl: value })}
          folder="team"
          accept="image"
          allowExternalUrl
        />
        {fieldErrors.imageUrl && <p className="text-xs text-destructive">{fieldErrors.imageUrl}</p>}

        <div className="space-y-1.5">
          <Label htmlFor="team-bio">Bio (optional)</Label>
          <Textarea id="team-bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          {fieldErrors.bio && <p className="text-xs text-destructive">{fieldErrors.bio}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="team-order">Display order</Label>
            <Input
              id="team-order"
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="team-status">Status</Label>
            <Select
              value={form.published ? "published" : "draft"}
              onValueChange={(value) => setForm({ ...form, published: value === "published" })}
            >
              <SelectTrigger id="team-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={!!deletingMember}
        onOpenChange={(open) => !open && setDeletingMember(null)}
        title="Delete this team member?"
        description={`"${deletingMember?.name}" will be permanently removed from the About page. This cannot be undone.`}
        onConfirm={async () => {
          if (deletingMember) await deleteMutation.mutateAsync(deletingMember._id);
        }}
      />
    </div>
  );
};

export default DashboardTeam;
