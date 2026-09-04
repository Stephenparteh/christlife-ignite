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
import img7 from "@/assets/officialImg01.jpeg";
import img8 from "@/assets/officialImg02.jpeg";
import img9 from "@/assets/officialImg03.jpeg";
import img10 from "@/assets/officialImg04.jpeg";
import img11 from "@/assets/officialImg05.jpeg";
import img12 from "@/assets/officialImg06.jpeg";

import videoOne from "@/assets/officialVideo01.mp4";
import videoTwo from "@/assets/officialVideo02.mp4";
import videoThree from "@/assets/officialVideo03.mp4";
import videoFour from "@/assets/officialVideo04.mp4";
import videoFive from "@/assets/officialVideo05.mp4";
import videoSix from "@/assets/officialVideo06.mp4";

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
  ];

  const videos = [
    {
      id: 1,
      video: videoOne,
    },
    {
      id: 2,
      video: videoTwo,
    },
    {
      id: 3,
      video: videoThree,
    },
    {
      id: 4,
      video: videoFour,
    },
    {
      id: 5,
      video: videoFive,
    },
    {
      id: 6,
      video: videoSix,
    },
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center bg-cover bg-center"
        // style={{ backgroundImage: `url(${heroImage})` }}
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
          {/* Heading */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            {/* <p className="text-primary font-semibold tracking-[0.15em] uppercase text-sm mb-3">
              Our Gallery
            </p> */}

            {/* <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-5">
              Moments We’ve Shared
            </h2> */}

            {/* <p className="text-lg text-muted-foreground leading-relaxed">
              A look at the people, gatherings, worship, and memories that make
              Christ Life what it is.
            </p> */}
          </div>

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

          {/* Photos */}
          {activeTab === "photos" && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 max-w-6xl mx-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setSelectedPhoto(index);
                    setIsPhotoViewerOpen(true);
                  }}
                  className="group relative block w-full overflow-hidden rounded-2xl break-inside-avoid"
                >
                  <img
                    src={img}
                    alt={`Christ Life moment ${index + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </button>
              ))}
            </div>
          )}

          {/* Videos */}
          {activeTab === "videos" && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-6xl mx-auto">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="group mb-6 break-inside-avoid overflow-hidden rounded-2xl bg-muted"
                >
                  <video
                    src={video.video}
                    controls
                    playsInline
                    preload="metadata"
                    className="block w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {activeTab === "videos" && videos.length === 0 && (
            <div className="text-center py-20">
              <Play className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                Videos coming soon
              </h3>
              <p className="text-muted-foreground">
                We’ll be sharing moments from Christ Life here soon.
              </p>
            </div>
          )}
        </div>
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
