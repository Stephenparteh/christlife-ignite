import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Play, Images } from "lucide-react";
import groupImg1 from "@/assets/group1.jpeg";
import { galleryService } from "@/services/gallery";
import PublicContentState from "@/components/PublicContentState";

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const { data: items, isLoading, isError } = useQuery({
    queryKey: ["gallery", "public"],
    queryFn: galleryService.list,
    staleTime: 60 * 1000,
  });

  const photos = items?.filter((item) => item.type === "photo") ?? [];
  const videos = items?.filter((item) => item.type === "video") ?? [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${groupImg1})` }}
      >
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight">
              Our Gallery
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore photos and videos from our community events, Bible
              studies, and fellowship gatherings throughout the year.
            </p>
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex border-b border-border">
              <button
                type="button"
                onClick={() => setActiveTab("photos")}
                className={`px-6 py-3 text-sm font-semibold transition-colors ${
                  activeTab === "photos"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Photos
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("videos")}
                className={`px-6 py-3 text-sm font-semibold transition-colors ${
                  activeTab === "videos"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Videos
              </button>
            </div>
          </div>

          {isLoading ? (
            <PublicContentState variant="loading" title="Loading the gallery…" />
          ) : isError ? (
            <PublicContentState
              variant="error"
              icon={Images}
              title="The gallery isn't available right now"
              description="Please check back in a little while."
            />
          ) : (
            <>
              {/* Photos */}
              {activeTab === "photos" && (
                photos.length === 0 ? (
                  <PublicContentState
                    variant="empty"
                    icon={Images}
                    title="No photos yet"
                    description="We'll be sharing moments from Christ Life here soon."
                  />
                ) : (
                  <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 max-w-6xl mx-auto">
                    {photos.map((photo, index) => (
                      <button
                        key={photo._id}
                        type="button"
                        onClick={() => {
                          setSelectedPhoto(index);
                          setIsPhotoViewerOpen(true);
                        }}
                        className="group relative block w-full overflow-hidden rounded-2xl break-inside-avoid"
                      >
                        <img
                          src={photo.mediaUrl}
                          alt={photo.caption || photo.title}
                          loading="lazy"
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </button>
                    ))}
                  </div>
                )
              )}

              {/* Videos */}
              {activeTab === "videos" && (
                videos.length === 0 ? (
                  <div className="text-center py-20">
                    <Play className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                      Videos coming soon
                    </h3>
                    <p className="text-muted-foreground">
                      We’ll be sharing moments from Christ Life here soon.
                    </p>
                  </div>
                ) : (
                  <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-6xl mx-auto">
                    {videos.map((video) => (
                      <div
                        key={video._id}
                        className="group mb-6 break-inside-avoid overflow-hidden rounded-2xl bg-muted"
                      >
                        <video
                          src={video.mediaUrl}
                          poster={video.thumbnailUrl || undefined}
                          aria-label={video.title}
                          controls
                          playsInline
                          preload="metadata"
                          className="block w-full h-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                )
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
