import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, HandHeart, Plus, X } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ActionMenu from "@/components/dashboard/ActionMenu";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import FormDialog from "@/components/dashboard/FormDialog";
import GivingMethodEntry from "@/components/giving/GivingMethodEntry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ApiClientError } from "@/lib/apiClient";
import { parseFieldError } from "@/lib/fieldError";
import { givingMethodsAdminService } from "@/services/giving";
import type { GivingMethod, GivingMethodDetail, GivingMethodInput } from "@/types/cms";

const QUERY_KEY = ["giving-methods", "dashboard"];
const FORM_FIELDS = ["name", "type", "description", "instructions", "details"] as const;
const MAX_DETAILS = 12;

/**
 * Convenience starters only. They pre-fill the name, type and *empty* detail
 * labels — never any values — and an admin can always type a completely
 * custom name, type and labels instead.
 */
const PRESETS: { name: string; type: string; labels: string[] }[] = [
  { name: "Give in Person", type: "In person", labels: ["Location"] },
  { name: "Mobile Money", type: "Mobile money", labels: ["Account name", "Phone number"] },
  { name: "Bank Transfer", type: "Bank transfer", labels: ["Bank name", "Account name", "Account number"] },
  { name: "PayPal", type: "Online", labels: ["PayPal email"] },
  { name: "Cash App", type: "Online", labels: ["Cashtag"] },
  { name: "Zelle", type: "Online", labels: ["Zelle email or phone"] },
  { name: "Venmo", type: "Online", labels: ["Venmo username"] },
];
const LABEL_SUGGESTIONS = [
  "Account name",
  "Account number",
  "Bank name",
  "Phone number",
  "Payment email",
  "Payment handle",
  "Address",
  "Location",
  "Recipient",
  "Reference",
];

interface FormState {
  name: string;
  type: string;
  description: string;
  instructions: string;
  details: GivingMethodDetail[];
  isActive: boolean;
}

const emptyForm: FormState = {
  name: "",
  type: "",
  description: "",
  instructions: "",
  details: [],
  isActive: false,
};

const toFormState = (m: GivingMethod): FormState => ({
  name: m.name,
  type: m.type,
  description: m.description,
  instructions: m.instructions,
  details: m.details.map((d) => ({ label: d.label, value: d.value })),
  isActive: m.isActive,
});

const errorMessage = (error: unknown) =>
  error instanceof ApiClientError ? error.message : "Something went wrong. Please try again.";

/** Drops half-filled detail rows so the public page never shows an empty label or value. */
const cleanDetails = (details: GivingMethodDetail[]) =>
  details
    .map((d) => ({ label: d.label.trim(), value: d.value.trim() }))
    .filter((d) => d.label && d.value);

const DashboardGivingMethods = () => {
  const queryClient = useQueryClient();
  const { data: methods, isLoading, isError } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: givingMethodsAdminService.list,
  });

  const [editing, setEditing] = useState<GivingMethod | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState<GivingMethod | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    // The public page and request form share this cache key.
    queryClient.invalidateQueries({ queryKey: ["giving-methods", "public"] });
  };

  const handleError = (error: unknown) => {
    const parsed = parseFieldError(errorMessage(error), FORM_FIELDS);
    setFieldErrors(parsed.field ? { [parsed.field]: parsed.message } : {});
    toast.error(parsed.message);
  };

  const createMutation = useMutation({
    mutationFn: (input: Partial<GivingMethodInput>) => givingMethodsAdminService.create(input),
    onSuccess: () => {
      invalidate();
      toast.success("Giving method added.");
    },
    onError: handleError,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<GivingMethodInput> }) =>
      givingMethodsAdminService.update(id, input),
    onSuccess: () => {
      invalidate();
      toast.success("Giving method updated.");
    },
    onError: handleError,
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      givingMethodsAdminService.update(id, { isActive }),
    onSuccess: (_item, vars) => {
      invalidate();
      toast.success(vars.isActive ? "Method is now visible on the Giving page." : "Method hidden from the public.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const reorderMutation = useMutation({
    mutationFn: (ids: string[]) => givingMethodsAdminService.reorder(ids),
    onSuccess: invalidate,
    onError: (error) => toast.error(errorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => givingMethodsAdminService.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success("Giving method deleted.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setFieldErrors({});
    setIsDialogOpen(true);
  };

  const move = (index: number, direction: -1 | 1) => {
    if (!methods) return;
    const next = [...methods];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    reorderMutation.mutate(next.map((m) => m._id));
  };

  const handleSave = async () => {
    const payload: Partial<GivingMethodInput> = {
      name: form.name.trim(),
      type: form.type.trim(),
      description: form.description.trim(),
      instructions: form.instructions.trim(),
      details: cleanDetails(form.details),
      isActive: form.isActive,
    };
    if (editing) await updateMutation.mutateAsync({ id: editing._id, input: payload });
    else await createMutation.mutateAsync(payload);
  };

  const applyPreset = (preset: (typeof PRESETS)[number]) =>
    setForm((prev) => ({
      ...prev,
      name: preset.name,
      type: preset.type,
      details: preset.labels.map((label) => ({ label, value: "" })),
    }));

  const setDetail = (index: number, patch: Partial<GivingMethodDetail>) =>
    setForm((prev) => ({
      ...prev,
      details: prev.details.map((d, i) => (i === index ? { ...d, ...patch } : d)),
    }));

  const previewMethod = {
    name: form.name.trim() || "Method name",
    description: form.description.trim(),
    instructions: form.instructions.trim(),
    details: cleanDetails(form.details),
  };

  return (
    <div>
      <PageHeader
        title="Giving Methods"
        description="Manage the ways to give shown on the public Giving page. Only active methods are visible to visitors."
        action={
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4" />
            Add Giving Method
          </Button>
        }
      />

      {isLoading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Loading giving methods…</p>
      ) : isError ? (
        <EmptyState
          icon={HandHeart}
          title="Couldn't load giving methods"
          description="Something went wrong talking to the server. Try refreshing the page."
        />
      ) : !methods || methods.length === 0 ? (
        <EmptyState
          icon={HandHeart}
          title="No giving methods yet"
          description="Add a method with its verified details. It stays hidden from the public until you activate it."
          action={
            <Button onClick={openAdd}>
              <Plus className="h-4 w-4" />
              Add Giving Method
            </Button>
          }
        />
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border">
          {methods.map((method, index) => (
            <li key={method._id} className="flex flex-wrap items-center gap-3 p-4 sm:flex-nowrap">
              <div className="flex shrink-0 flex-col">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-8"
                  disabled={index === 0 || reorderMutation.isPending}
                  onClick={() => move(index, -1)}
                  aria-label={`Move ${method.name} up`}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-8"
                  disabled={index === methods.length - 1 || reorderMutation.isPending}
                  onClick={() => move(index, 1)}
                  aria-label={`Move ${method.name} down`}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-medium text-foreground">{method.name}</p>
                  <StatusBadge status={method.isActive ? "published" : "draft"} />
                </div>
                <p className="truncate text-sm text-muted-foreground">
                  {method.isActive ? "Visible on the Giving page" : "Hidden from the public"}
                  {method.type ? ` · ${method.type}` : ""}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={method.isActive}
                  disabled={toggleMutation.isPending}
                  onCheckedChange={(isActive) => toggleMutation.mutate({ id: method._id, isActive })}
                  aria-label={`${method.isActive ? "Deactivate" : "Activate"} ${method.name}`}
                />
                <ActionMenu
                  label={method.name}
                  onEdit={() => {
                    setEditing(method);
                    setForm(toFormState(method));
                    setFieldErrors({});
                    setIsDialogOpen(true);
                  }}
                  onDelete={() => setDeleting(method)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <FormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editing ? "Edit Giving Method" : "Add Giving Method"}
        description="Enter any method name you need — the suggestions below are optional shortcuts."
        saveLabel={editing ? "Save changes" : "Add giving method"}
        onSave={handleSave}
      >
        {!editing && (
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Quick start (optional)</p>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((preset) => (
                <Button key={preset.name} type="button" variant="outline" size="sm" onClick={() => applyPreset(preset)}>
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="gm-name">Method name</Label>
            <Input
              id="gm-name"
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Any name, e.g. a local wallet"
            />
            {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="gm-type">Type (optional)</Label>
            <Input
              id="gm-type"
              maxLength={50}
              list="gm-type-options"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              placeholder="Pick one or type your own"
            />
            <datalist id="gm-type-options">
              {["In person", "Mobile money", "Bank transfer", "Online"].map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
            {fieldErrors.type && <p className="text-xs text-destructive">{fieldErrors.type}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="gm-description">Short description (optional)</Label>
          <Textarea
            id="gm-description"
            rows={2}
            maxLength={500}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          {fieldErrors.description && <p className="text-xs text-destructive">{fieldErrors.description}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Details (optional)</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={form.details.length >= MAX_DETAILS}
              onClick={() => setForm({ ...form, details: [...form.details, { label: "", value: "" }] })}
            >
              <Plus className="h-4 w-4" />
              Add detail
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Only enter verified information. Rows missing a label or value are not shown publicly.
          </p>
          <datalist id="gm-label-options">
            {LABEL_SUGGESTIONS.map((l) => (
              <option key={l} value={l} />
            ))}
          </datalist>
          {form.details.map((detail, index) => (
            <div key={index} className="grid grid-cols-[1fr_1.4fr_auto] items-center gap-2">
              <Input
                aria-label={`Detail ${index + 1} label`}
                list="gm-label-options"
                maxLength={60}
                placeholder="Label"
                value={detail.label}
                onChange={(e) => setDetail(index, { label: e.target.value })}
              />
              <Input
                aria-label={`Detail ${index + 1} value`}
                maxLength={300}
                placeholder="Value"
                value={detail.value}
                onChange={(e) => setDetail(index, { value: e.target.value })}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove detail ${index + 1}`}
                onClick={() => setForm({ ...form, details: form.details.filter((_, i) => i !== index) })}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {fieldErrors.details && <p className="text-xs text-destructive">{fieldErrors.details}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="gm-instructions">Instructions (optional)</Label>
          <Textarea
            id="gm-instructions"
            rows={3}
            maxLength={2000}
            value={form.instructions}
            onChange={(e) => setForm({ ...form, instructions: e.target.value })}
          />
          {fieldErrors.instructions && <p className="text-xs text-destructive">{fieldErrors.instructions}</p>}
        </div>

        <div className="flex items-center justify-between rounded-md border border-border p-3">
          <div>
            <Label htmlFor="gm-active">Active</Label>
            <p className="text-xs text-muted-foreground">
              {form.isActive ? "Visible on the public Giving page." : "Hidden from the public until activated."}
            </p>
          </div>
          <Switch id="gm-active" checked={form.isActive} onCheckedChange={(isActive) => setForm({ ...form, isActive })} />
        </div>

        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Public preview</p>
          <ol className="rounded-md border border-dashed border-border px-4 [&>li:first-child]:border-t-0">
            <GivingMethodEntry method={previewMethod} index={0} />
          </ol>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete this giving method?"
        description={`"${deleting?.name}" will be removed and will no longer be selectable. Existing giving requests keep the method's name. This cannot be undone — to just hide it, deactivate it instead.`}
        onConfirm={async () => {
          if (deleting) await deleteMutation.mutateAsync(deleting._id);
        }}
      />
    </div>
  );
};

export default DashboardGivingMethods;
