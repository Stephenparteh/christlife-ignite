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
  ChevronRight,
  Instagram,
  Facebook
} from "lucide-react";
import heroImage from "@/assets/hero-main.jpg";

const Gallery = () => {
  const photoAlbums = [
    {
      title: "Thanksgiving Barbecue 2024",
      date: "November 24, 2024",
      category: "Social Event",
      photos: 25,
      description: "Community gathering with food, fellowship, and gratitude sharing.",
      thumbnail: "/placeholder-album1.jpg",
      icon: Utensils
    },
    {
      title: "Fall Meet & Greet", 
      date: "October 15, 2024",
      category: "Fellowship",
      photos: 18,
      description: "Welcoming new members and strengthening community bonds.",
      thumbnail: "/placeholder-album2.jpg",
      icon: Users
    },
    {
      title: "Summer Bible Retreat",
      date: "August 20, 2024",
      category: "Bible Study", 
      photos: 42,
      description: "Three-day intensive study and spiritual growth retreat.",
      thumbnail: "/placeholder-album3.jpg",
      icon: BookOpen
    },
    {
      title: "Game Day Highlights",
      date: "July 28, 2024",
      category: "Social Event",
      photos: 15,
      description: "Board games, video games, and friendly competition.",
      thumbnail: "/placeholder-album4.jpg",
      icon: Gamepad2
    },
    {
      title: "Community Outreach",
      date: "June 15, 2024",
      category: "Outreach",
      photos: 20,
      description: "Serving our local community with love and action.",
      thumbnail: "/placeholder-album5.jpg",
      icon: Heart
    },
    {
      title: "Spring Bible Picnic",
      date: "April 22, 2024",
      category: "Social Event",
      photos: 35,
      description: "Outdoor worship, food, and fellowship in God's creation.",
      thumbnail: "/placeholder-album6.jpg",
      icon: Utensils
    }
  ];

  const videoHighlights = [
    {
      title: "Christ Life Testimony: Sarah's Story",
      duration: "3:45",
      views: "1.2K",
      description: "How Christ Life transformed Sarah's faith journey and relationships.",
      thumbnail: "/placeholder-video1.jpg"
    },
    {
      title: "Summer Retreat Highlights",
      duration: "5:20", 
      views: "890",
      description: "Best moments from our three-day spiritual growth retreat.",
      thumbnail: "/placeholder-video2.jpg"
    },
    {
      title: "Community Outreach Impact",
      duration: "2:30",
      views: "756",
      description: "See how we're making a difference in our local community.",
      thumbnail: "/placeholder-video3.jpg"
    }
  ];

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Bible Study": return "default";
      case "Social Event": return "secondary";
      case "Fellowship": return "outline";
      case "Outreach": return "destructive";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 text-accent bg-accent-foreground/20">
            Gallery
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-6">
            Memories & Moments
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Explore photos and videos from our community events, Bible studies, 
            and fellowship gatherings throughout the year.
          </p>
        </div>
      </section>

      {/* Photo Albums */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Event Photo Albums
            </h2>
            <p className="text-lg text-muted-foreground">
              Browse through our collection of event photos organized by category
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoAlbums.map((album, index) => (
              <Card key={index} className="card-gradient card-hover overflow-hidden">
                <div className="aspect-video bg-primary/10 flex items-center justify-center relative">
                  <album.icon className="h-16 w-16 text-primary" />
                  <div className="absolute top-4 right-4">
                    <Badge variant={getCategoryBadge(album.category)} className="text-xs">
                      {album.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-background/90 px-2 py-1 rounded text-xs font-medium">
                    <Camera className="inline h-3 w-3 mr-1" />
                    {album.photos} photos
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-heading font-bold text-primary mb-2">
                    {album.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {album.date}
                  </p>
                  <p className="text-foreground text-sm leading-relaxed mb-4">
                    {album.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full group">
                    View Album
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Highlights */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Video Highlights
            </h2>
            <p className="text-lg text-muted-foreground">
              Watch inspiring moments and testimonies from our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {videoHighlights.map((video, index) => (
              <Card key={index} className="card-gradient card-hover overflow-hidden">
                <div className="aspect-video bg-primary/10 flex items-center justify-center relative group cursor-pointer">
                  <Play className="h-16 w-16 text-primary group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 bg-background/90 px-2 py-1 rounded text-xs font-medium">
                    {video.duration}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-background/90 px-2 py-1 rounded text-xs">
                    {video.views} views
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-heading font-bold text-primary mb-2">
                    {video.title}
                  </h3>
                  <p className="text-foreground text-sm leading-relaxed mb-4">
                    {video.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full group">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Videos
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Gallery Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Featured Moments
            </h2>
            <p className="text-lg text-muted-foreground">
              A selection of our favorite photos from recent events
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <Card key={index} className="card-hover overflow-hidden cursor-pointer group">
                <div className="aspect-square bg-primary/10 flex items-center justify-center relative">
                  <Camera className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="btn-hero">
              <Download className="mr-2 h-5 w-5" />
              Download Full Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Social Media Integration */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Follow Our Journey
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Stay connected and see our latest photos and updates on social media. 
              Share your own Christ Life moments with our community!
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardContent className="p-6 text-center">
                  <Instagram className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold mb-2">Instagram</h3>
                  <p className="text-primary-foreground/80 mb-4">
                    Follow @christlifeyouth for daily inspiration and event updates
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
                  <h3 className="text-xl font-heading font-bold mb-2">Facebook</h3>
                  <p className="text-primary-foreground/80 mb-4">
                    Join our Facebook community for discussions and photo sharing
                  </p>
                  <Button variant="secondary" className="btn-accent">
                    <Facebook className="mr-2 h-4 w-4" />
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="bg-primary-foreground/10 rounded-lg p-6 border border-primary-foreground/20">
              <h3 className="text-lg font-heading font-bold mb-3">Share Your Photos</h3>
              <p className="text-primary-foreground/90 mb-4">
                Tag us in your Christ Life photos using <span className="font-semibold text-accent">#ChristLifeMoments</span> 
                and we might feature them in our gallery!
              </p>
              <Button variant="secondary" size="sm" className="btn-accent">
                Upload Photos
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;