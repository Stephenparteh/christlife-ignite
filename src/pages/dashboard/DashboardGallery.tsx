import { useState } from "react";
import { Images, Plus, Upload, Video as VideoIcon } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ActionMenu from "@/components/dashboard/ActionMenu";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import DevActionDialog from "@/components/dashboard/DevActionDialog";
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
import { mockGalleryItems, type DashboardGalleryItem } from "@/data/dashboardMockData";

const DashboardGallery = () => {
  const [items] = useState<DashboardGalleryItem[]>(mockGalleryItems);
  const [activeTab, setActiveTab] = useState<"photo" | "video">("photo");
  const [editingItem, setEditingItem] = useState<DashboardGalleryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<DashboardGalleryItem | null>(null);

  const photos = items.filter((item) => item.type === "photo");
  const videos = items.filter((item) => item.type === "video");
  const visible = activeTab === "photo" ? photos : videos;

  const openAddDialog = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const renderGrid = (list: DashboardGalleryItem[], emptyLabel: string) => {
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
          <div key={item.id} className="group relative overflow-hidden rounded-lg border border-border">
            <div className="relative aspect-square bg-muted">
              <img
                src={item.thumbnail}
                alt=""
                className="h-full w-full object-cover"
              />
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
                    setIsDialogOpen(true);
                  }}
                  onDelete={() => setDeletingItem(item)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 p-2.5">
              <p className="min-w-0 truncate text-sm text-foreground">{item.title}</p>
              <StatusBadge status={item.status} />
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

      <DevActionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingItem ? "Edit Media" : `Add ${activeTab === "photo" ? "Photo" : "Video"}`}
        saveLabel={editingItem ? "Save changes" : "Add"}
      >
        <div className="space-y-1.5">
          <Label htmlFor="gallery-title">Title</Label>
          <Input
            id="gallery-title"
            defaultValue={editingItem?.title}
            placeholder="e.g. Fellowship gathering"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="gallery-type">Type</Label>
          <Select defaultValue={editingItem?.type ?? activeTab}>
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
          <Label htmlFor="gallery-status">Status</Label>
          <Select defaultValue={editingItem?.status ?? "draft"}>
            <SelectTrigger id="gallery-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!editingItem && (
          <div className="space-y-1.5">
            <Label>File</Label>
            <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-border p-6 text-center text-muted-foreground">
              <Upload className="h-5 w-5" aria-hidden="true" />
              <p className="text-sm">File upload isn't connected yet.</p>
              <input type="file" disabled aria-label="File upload (not yet available)" className="text-xs" />
            </div>
          </div>
        )}
      </DevActionDialog>

      <ConfirmDialog
        open={!!deletingItem}
        onOpenChange={(open) => !open && setDeletingItem(null)}
        title="Delete this item?"
        description={`"${deletingItem?.title}" will be removed from the gallery.`}
      />
    </div>
  );
};

export default DashboardGallery;
