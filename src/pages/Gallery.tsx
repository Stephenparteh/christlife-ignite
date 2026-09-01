import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Play,
  Users,
  BookOpen,
  Utensils,
  Gamepad2,
  Heart,
  Download,
  ExternalLink,
  ChevronLeft,
  X,
  ChevronRight,
  Instagram,
  Facebook,
} from "lucide-react";
import heroImage from "@/assets/hero-main.jpg";
import groupImg1 from "@/assets/group1.jpeg";
import groupPhoto1 from "@/assets/group1.jpeg";
import groupPhoto2 from "@/assets/group1.jpeg";
import groupPhoto3 from "@/assets/group1.jpeg";

import img1 from "@/assets/group1.jpeg";
import img2 from "@/assets/group2.jpeg";
import img3 from "@/assets/group3.jpeg";
import img4 from "@/assets/praying1.jpeg";
import img5 from "@/assets/praying2.jpeg";
import img6 from "@/assets/praying3.jpeg";

const Gallery = () => {
  const images = [img1, img2, img3, img4, img5, img6];
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const albums = [
    {
      id: 1,
      title: "Christ Life Community Gathering",
      date: "August 2026",
      coverImage: groupImg1,
      photos: [groupImg1, groupPhoto1, groupPhoto3],
    },
    {
      id: 2,
      title: "Fellowship & Fun Day",
      date: "July 2026",
      coverImage: groupPhoto1,
      photos: [groupPhoto1, groupImg1, groupPhoto3],
    },
    {
      id: 3,
      title: "Bible Study & Fellowship",
      date: "June 2026",
      coverImage: groupPhoto3,
      photos: [groupPhoto3, groupImg1, groupPhoto1],
    },
  ];
  const photoAlbums = [
    {
      title: "Thanksgiving Barbecue 2024",
      date: "November 24, 2024",
      category: "Social Event",
      photos: 25,
      description:
        "Community gathering with food, fellowship, and gratitude sharing.",
      thumbnail: "/placeholder-album1.jpg",
      icon: Utensils,
    },
    {
      title: "Fall Meet & Greet",
      date: "October 15, 2024",
      category: "Fellowship",
      photos: 18,
      description: "Welcoming new members and strengthening community bonds.",
      thumbnail: "/placeholder-album2.jpg",
      icon: Users,
    },
    {
      title: "Summer Bible Retreat",
      date: "August 20, 2024",
      category: "Bible Study",
      photos: 42,
      description: "Three-day intensive study and spiritual growth retreat.",
      thumbnail: "/placeholder-album3.jpg",
      icon: BookOpen,
    },
    {
      title: "Game Day Highlights",
      date: "July 28, 2024",
      category: "Social Event",
      photos: 15,
      description: "Board games, video games, and friendly competition.",
      thumbnail: "/placeholder-album4.jpg",
      icon: Gamepad2,
    },
    {
      title: "Community Outreach",
      date: "June 15, 2024",
      category: "Outreach",
      photos: 20,
      description: "Serving our local community with love and action.",
      thumbnail: "/placeholder-album5.jpg",
      icon: Heart,
    },
    {
      title: "Spring Bible Picnic",
      date: "April 22, 2024",
      category: "Social Event",
      photos: 35,
      description: "Outdoor worship, food, and fellowship in God's creation.",
      thumbnail: "/placeholder-album6.jpg",
      icon: Utensils,
    },
  ];

  const videoHighlights = [
    {
      title: "Christ Life Testimony: Sarah's Story",
      duration: "3:45",
      views: "1.2K",
      description:
        "How Christ Life transformed Sarah's faith journey and relationships.",
      thumbnail: "/placeholder-video1.jpg",
    },
    {
      title: "Summer Retreat Highlights",
      duration: "5:20",
      views: "890",
      description: "Best moments from our three-day spiritual growth retreat.",
      thumbnail: "/placeholder-video2.jpg",
    },
    {
      title: "Community Outreach Impact",
      duration: "2:30",
      views: "756",
      description: "See how we're making a difference in our local community.",
      thumbnail: "/placeholder-video3.jpg",
    },
  ];

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Bible Study":
        return "default";
      case "Social Event":
        return "secondary";
      case "Fellowship":
        return "outline";
      case "Outreach":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-20 bg-cover bg-center"
        // style={{ backgroundImage: `url(${heroImage})` }}
        style={{ backgroundImage: `url(${groupImg1})` }}
      >
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-6">
            Memories & Moments
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Explore photos and videos from our community events, Bible studies,
            and fellowship gatherings throughout the year.
          </p>
        </div>
      </section>

      {/* Gallery Albums */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="max-w-3xl mx-auto text-center mb-14">
            {/* <p className="text-primary font-semibold tracking-[0.15em] uppercase text-sm mb-3">
              Our Gallery
            </p> */}

            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-5">
              Moments We’ve Shared
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore photos from our Bible studies, fellowship gatherings,
              outreach programs, and other Christ Life events.
            </p>
          </div>

          {/* Albums */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {albums.map((album) => (
              <button
                key={album.id}
                type="button"
                onClick={() => {
                  setSelectedAlbum(album.id);
                  setSelectedPhoto(0);
                }}
                className="group text-left"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-5">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                  <div className="absolute bottom-4 left-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {album.photos.length} Photos
                  </div>
                </div>

                <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {album.title}
                </h3>

                <p className="text-sm text-muted-foreground">{album.date}</p>
              </button>
            ))}
          </div>
        </div>

        {selectedAlbum !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
            {(() => {
              const album = albums.find((item) => item.id === selectedAlbum);

              if (!album) return null;

              return (
                <>
                  {/* Close */}
                  <button
                    type="button"
                    onClick={() => setSelectedAlbum(null)}
                    className="absolute top-6 right-6 z-50 text-white hover:text-white/70 transition-colors"
                    aria-label="Close gallery"
                  >
                    <X className="h-8 w-8" />
                  </button>

                  {/* Album title */}
                  <div className="absolute top-6 left-6 z-50">
                    <h3 className="text-white text-lg md:text-xl font-semibold">
                      {album.title}
                    </h3>

                    <p className="text-white/60 text-sm">
                      {selectedPhoto + 1} of {album.photos.length}
                    </p>
                  </div>

                  {/* Main image */}
                  <div className="w-full h-full flex items-center justify-center px-16 py-20">
                    <img
                      src={album.photos[selectedPhoto]}
                      alt={`${album.title} photo ${selectedPhoto + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Previous */}
                  {album.photos.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPhoto(
                          (selectedPhoto - 1 + album.photos.length) %
                            album.photos.length,
                        )
                      }
                      className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                  )}

                  {/* Next */}
                  {album.photos.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPhoto(
                          (selectedPhoto + 1) % album.photos.length,
                        )
                      }
                      className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </section>

      {/* Social Media Integration */}
      {/* <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Follow Our Journey
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Stay connected and see our latest photos and updates on social
              media. Share your own Christ Life moments with our community!
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardContent className="p-6 text-center">
                  <Instagram className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold mb-2">
                    Instagram
                  </h3>
                  <p className="text-primary-foreground/80 mb-4">
                    Follow @christlifeyouth for daily inspiration and event
                    updates
                  </p>
                  <Button variant="secondary" className="btn-accent">
                    <Instagram className="mr-2 h-4 w-4" />
                    Follow Us
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardContent className="p-6 text-center">
                  <Facebook className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold mb-2">
                    Facebook
                  </h3>
                  <p className="text-primary-foreground/80 mb-4">
                    Join our Facebook community for discussions and photo
                    sharing
                  </p>
                  <Button variant="secondary" className="btn-accent">
                    <Facebook className="mr-2 h-4 w-4" />
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="bg-primary-foreground/10 rounded-lg p-6 border border-primary-foreground/20">
              <h3 className="text-lg font-heading font-bold mb-3">
                Share Your Photos
              </h3>
              <p className="text-primary-foreground/90 mb-4">
                Tag us in your Christ Life photos using{" "}
                <span className="font-semibold text-accent">
                  #ChristLifeMoments
                </span>
                and we might feature them in our gallery!
              </p>
              <Button variant="secondary" size="sm" className="btn-accent">
                Upload Photos
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Gallery;
