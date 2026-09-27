import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Images, Plus, Upload, Video as VideoIcon } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ActionMenu from "@/components/dashboard/ActionMenu";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import FormDialog from "@/components/dashboard/FormDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiClientError } from "@/lib/apiClient";
import { galleryService } from "@/services/gallery";
import type { GalleryItem, GalleryItemInput } from "@/types/cms";

const QUERY_KEY = ["gallery", "dashboard"];

interface GalleryFormState {
  type: "photo" | "video";
  title: string;
  caption: string;
  mediaUrl: string;
  thumbnailUrl: string;
  published: boolean;
}

const emptyForm = (type: "photo" | "video"): GalleryFormState => ({
  type,
  title: "",
  caption: "",
  mediaUrl: "",
  thumbnailUrl: "",
  published: true,
});

const toFormState = (item: GalleryItem): GalleryFormState => ({
  type: item.type,
  title: item.title,
  caption: item.caption,
  mediaUrl: item.mediaUrl,
  thumbnailUrl: item.thumbnailUrl,
  published: item.published,
});

const errorMessage = (error: unknown) =>
  error instanceof ApiClientError ? error.message : "Something went wrong. Please try again.";

const DashboardGallery = () => {
  const queryClient = useQueryClient();
  const { data: items, isLoading, isError } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: galleryService.list,
  });

  const [activeTab, setActiveTab] = useState<"photo" | "video">("photo");
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<GalleryFormState>(emptyForm("photo"));

  const invalidate = () => queryClient.invalidateQueries({ queryKey: QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: (input: Partial<GalleryItemInput>) => galleryService.create(input),
    onSuccess: () => {
      invalidate();
      toast.success("Added to the gallery.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<GalleryItemInput> }) =>
      galleryService.update(id, input),
    onSuccess: () => {
      invalidate();
      toast.success("Gallery item updated.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => galleryService.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success("Gallery item deleted.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const photos = items?.filter((item) => item.type === "photo") ?? [];
  const videos = items?.filter((item) => item.type === "video") ?? [];
  const visibleList = activeTab === "photo" ? photos : videos;

  const openAddDialog = () => {
    setEditingItem(null);
    setForm(emptyForm(activeTab));
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (editingItem) {
      await updateMutation.mutateAsync({ id: editingItem._id, input: form });
    } else {
      await createMutation.mutateAsync(form);
    }
  };

  const renderGrid = (list: GalleryItem[], emptyLabel: string) => {
    if (isLoading) {
      return <p className="py-10 text-center text-sm text-muted-foreground">Loading…</p>;
    }
    if (isError) {
      return (
        <EmptyState
          icon={activeTab === "photo" ? Images : VideoIcon}
          title="Couldn't load the gallery"
          description="Something went wrong talking to the server. Try refreshing the page."
        />
      );
    }
    if (list.length === 0) {
      return (
        <EmptyState
          icon={activeTab === "photo" ? Images : VideoIcon}
          title={`No ${emptyLabel} yet`}
          description={`Add your first ${emptyLabel.slice(0, -1)} to show it on the public gallery.`}
          action={
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4" />
              Add {activeTab === "photo" ? "Photo" : "Video"}
            </Button>
          }
        />
      );
    }

    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((item) => (
          <div key={item._id} className="group relative overflow-hidden rounded-lg border border-border">
            <div className="relative aspect-square bg-muted">
              {item.type === "photo" ? (
                <img src={item.mediaUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <video src={item.mediaUrl} className="h-full w-full object-cover" muted preload="metadata" />
              )}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                  <VideoIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              )}
              <div className="absolute right-1.5 top-1.5 rounded-full bg-background/90 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                <ActionMenu
                  label={item.title}
                  onEdit={() => {
                    setEditingItem(item);
                    setForm(toFormState(item));
                    setIsDialogOpen(true);
                  }}
                  onDelete={() => setDeletingItem(item)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 p-2.5">
              <p className="min-w-0 truncate text-sm text-foreground">{item.title}</p>
              <StatusBadge status={item.published ? "published" : "draft"} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <PageHeader
        title="Gallery"
        description="Manage the photos and videos shown on the public Gallery page."
        action={
          <Button onClick={openAddDialog}>
            <Plus className="h-4 w-4" />
            Add {activeTab === "photo" ? "Photo" : "Video"}
          </Button>
        }
      />

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "photo" | "video")}>
        <TabsList>
          <TabsTrigger value="photo">Photos ({photos.length})</TabsTrigger>
          <TabsTrigger value="video">Videos ({videos.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="photo" className="mt-6">
          {renderGrid(photos, "photos")}
        </TabsContent>
        <TabsContent value="video" className="mt-6">
          {renderGrid(videos, "videos")}
        </TabsContent>
      </Tabs>

      <FormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingItem ? "Edit Media" : `Add ${activeTab === "photo" ? "Photo" : "Video"}`}
        saveLabel={editingItem ? "Save changes" : "Add"}
        onSave={handleSave}
      >
        <div className="space-y-1.5">
          <Label htmlFor="gallery-title">Title</Label>
          <Input
            id="gallery-title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Fellowship gathering"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="gallery-caption">Caption</Label>
          <Input
            id="gallery-caption"
            value={form.caption}
            onChange={(e) => setForm({ ...form, caption: e.target.value })}
            placeholder="What does this show?"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="gallery-type">Type</Label>
          <Select
            value={form.type}
            onValueChange={(value) => setForm({ ...form, type: value as "photo" | "video" })}
          >
            <SelectTrigger id="gallery-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="photo">Photo</SelectItem>
              <SelectItem value="video">Video</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="gallery-media-url">{form.type === "photo" ? "Image" : "Video"} URL</Label>
          <Input
            id="gallery-media-url"
            value={form.mediaUrl}
            onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
            placeholder="/gallery/photos/example.jpeg or https://…"
          />
          <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
            <Upload className="h-3.5 w-3.5" aria-hidden="true" />
            File upload isn't available yet — paste a URL or site path.
          </div>
        </div>

        {form.type === "video" && (
          <div className="space-y-1.5">
            <Label htmlFor="gallery-thumbnail-url">Thumbnail URL (optional)</Label>
            <Input
              id="gallery-thumbnail-url"
              value={form.thumbnailUrl}
              onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })}
              placeholder="/gallery/photos/example.jpeg"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="gallery-status">Status</Label>
          <Select
            value={form.published ? "published" : "draft"}
            onValueChange={(value) => setForm({ ...form, published: value === "published" })}
          >
            <SelectTrigger id="gallery-status">
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
        open={!!deletingItem}
        onOpenChange={(open) => !open && setDeletingItem(null)}
        title="Delete this item?"
        description={`"${deletingItem?.title}" will be permanently removed from the gallery. This cannot be undone.`}
        onConfirm={async () => {
          if (deletingItem) await deleteMutation.mutateAsync(deletingItem._id);
        }}
      />
    </div>
  );
};

export default DashboardGallery;
