import { useRef, useState } from "react";
import { ImageOff, Link as LinkIcon, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiClientError } from "@/lib/apiClient";
import { uploadsService, type UploadFolder } from "@/services/uploads";

interface MediaUploadFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  folder: UploadFolder;
  accept: "image" | "video";
  /** Shows an Upload/External URL toggle. Off by default — the field is upload-only. */
  allowExternalUrl?: boolean;
  helperText?: string;
}

const errorMessage = (error: unknown) =>
  error instanceof ApiClientError ? error.message : "Upload failed. Please try again.";

/**
 * Shared upload control for event cover images, gallery photos/videos and
 * thumbnails, and team profile photos — one preview/upload/error/remove
 * experience reused everywhere media is attached to a CMS record. See
 * server/README.md "Media storage" for how the upload endpoint itself
 * decides between Cloudinary and the dev-only local fallback.
 */
const MediaUploadField = ({
  id,
  label,
  value,
  onChange,
  folder,
  accept,
  allowExternalUrl = false,
  helperText,
}: MediaUploadFieldProps) => {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelected = async (file: File) => {
    setError(null);
    setIsUploading(true);
    try {
      const result = await uploadsService.upload(file, folder);
      onChange(result.url);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {allowExternalUrl && (
          <div className="flex gap-1 text-xs">
            <button
              type="button"
              onClick={() => setMode("upload")}
              className={`rounded px-2 py-0.5 ${mode === "upload" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
            >
              <Upload className="mr-1 inline h-3 w-3" />
              Upload
            </button>
            <button
              type="button"
              onClick={() => setMode("url")}
              className={`rounded px-2 py-0.5 ${mode === "url" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
            >
              <LinkIcon className="mr-1 inline h-3 w-3" />
              External URL
            </button>
          </div>
        )}
      </div>

      {mode === "url" ? (
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://…"
        />
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted">
            {value ? (
              accept === "image" ? (
                <img src={value} alt="" className="h-full w-full object-cover" />
              ) : (
                <video src={value} className="h-full w-full object-cover" muted />
              )
            ) : (
              <ImageOff className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <input
              ref={inputRef}
              id={id}
              type="file"
              accept={accept === "image" ? "image/jpeg,image/png,image/webp,image/gif" : "video/mp4,video/webm,video/quicktime"}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelected(file);
                e.target.value = "";
              }}
            />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {isUploading ? "Uploading…" : value ? "Replace" : "Upload"}
              </Button>
              {value && (
                <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
                  <X className="h-4 w-4" />
                  Remove
                </Button>
              )}
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
        </div>
      )}

      {helperText && mode === "upload" && !error && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

export default MediaUploadField;
