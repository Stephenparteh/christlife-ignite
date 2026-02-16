import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  MessageCircle,
  Utensils,
  Gamepad2,
  Heart,
  ChevronRight
} from "lucide-react";
import heroImage from "@/assets/hero-main.jpg";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Weekly Bible Study - Tuesday",
      date: "December 10, 2024",
      time: "10:00 - 11:00 PM",
      location: "Google Meet / WhatsApp",
      type: "Bible Study",
      category: "regular",
      description: "Join us for in-depth Bible study and discussion as we explore God's Word together.",
      attendees: "20-30 people",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Weekly Bible Study - Thursday", 
      date: "December 12, 2024",
      time: "10:00 - 11:00 PM",
      location: "Google Meet / WhatsApp",
      type: "Bible Study",
      category: "regular",
      description: "Continue our weekly study with fellowship and prayer.",
      attendees: "20-30 people", 
      icon: BookOpen
    },
    {
      id: 3,
      title: "Christmas Bible Picnic",
      date: "December 15, 2024",
      time: "2:00 - 6:00 PM",
      location: "Riverside Park",
      type: "Social Event",
      category: "special",
      description: "Celebrate Christmas with food, fellowship, games, and outdoor worship in God's beautiful creation.",
      attendees: "50+ expected",
      icon: Utensils
    },
    {
      id: 4,
      title: "Holiday Game Day",
      date: "December 22, 2024", 
      time: "4:00 - 8:00 PM",
      location: "Community Center",
      type: "Social Event",
      category: "social",
      description: "Board games, video games, snacks, and fellowship. Bring your favorite games to share!",
      attendees: "30-40 people",
      icon: Gamepad2
    },
    {
      id: 5,
      title: "New Year Outreach",
      date: "December 30, 2024",
      time: "10:00 AM - 2:00 PM", 
      location: "Downtown Community Center",
      type: "Outreach",
      category: "outreach",
      description: "Serve our community with a free meal program and share God's love through action.",
      attendees: "All volunteers welcome",
      icon: Heart
    }
  ];

  const pastEvents = [
    {
      title: "Thanksgiving Barbecue",
      date: "November 24, 2024",
      description: "Celebrated with food, gratitude, and community fellowship.",
      image: "/placeholder-event1.jpg"
    },
    {
      title: "Fall Meet & Greet",
      date: "October 15, 2024", 
      description: "Welcomed new members and strengthened existing friendships.",
      image: "/placeholder-event2.jpg"
    },
    {
      title: "Summer Bible Retreat",
      date: "August 20, 2024",
      description: "Three-day intensive study and fellowship retreat.",
      image: "/placeholder-event3.jpg"
    }
  ];

  const getEventBadgeVariant = (category: string) => {
    switch (category) {
      case "regular": return "default";
      case "special": return "secondary"; 
      case "social": return "outline";
      case "outreach": return "destructive";
      default: return "default";
    }
  };

  const getEventIcon = (IconComponent: any) => {
    return <IconComponent className="h-6 w-6 text-primary" />;
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
            Events & Activities
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-6">
            Join Our Community Events
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            From Bible studies to social gatherings and outreach - there's always 
            something happening in the Christ Life community.
          </p>
        </div>
      </section>

      {/* Featured Event Banner */}
      <section className="py-12 bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4">
          <Card className="bg-primary-foreground/10 border-primary-foreground/20 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="bg-accent/20 p-4 rounded-full">
                  <Utensils className="h-12 w-12 text-accent" />
                </div>
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-2 text-accent bg-accent-foreground/20">
                    Featured Event
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                    Prayer Picnic
                  </h3>
                  <p className="text-lg text-primary-foreground/90 mb-4 leading-relaxed">
                    Spritual renewal, youth fellowship and unity.
                  </p>
                  <div className="flex flex-wrap gap-4 text-primary-foreground/80 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>December 15, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>2:00 - 6:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Riverside Park</span>
                    </div>
                  </div>
                  <Button className="btn-accent">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    RSVP via WhatsApp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground">
              Mark your calendar and join us for these upcoming activities
            </p>
          </div>

          <div className="grid gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="card-gradient card-hover">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="bg-primary/10 p-4 rounded-full w-fit">
                        {getEventIcon(event.icon)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant={getEventBadgeVariant(event.category)}>
                          {event.type}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-heading font-bold text-primary mb-2">
                        {event.title}
                      </h3>
                      
                      <p className="text-foreground mb-4 leading-relaxed">
                        {event.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="group">
                        Learn More
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Event Categories
            </h2>
            <p className="text-lg text-muted-foreground">
              Different types of events for spiritual growth and community building
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-gradient card-hover text-center">
              <CardContent className="p-8">
                <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Bible Studies
                </h3>
                <p className="text-foreground leading-relaxed mb-4">
                  Weekly studies every Tuesday and Thursday evening via Google Meet 
                  and WhatsApp for in-depth scriptural exploration.
                </p>
                <p className="text-sm text-muted-foreground">
                  Regular • 10:00-11:00 PM • Online
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient card-hover text-center">
              <CardContent className="p-8">
                <Users className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Social Events
                </h3>
                <p className="text-foreground leading-relaxed mb-4">
                  Bible picnics, game days, barbecues, and meet & greet events 
                  that build fellowship and strengthen our community bonds.
                </p>
                <p className="text-sm text-muted-foreground">
                  Monthly • Various Times • In-Person
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient card-hover text-center">
              <CardContent className="p-8">
                <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Outreach
                </h3>
                <p className="text-foreground leading-relaxed mb-4">
                  Community service projects, evangelism efforts, and opportunities 
                  to share Christ's love through action and service.
                </p>
                <p className="text-sm text-muted-foreground">
                  Quarterly • Various Times • Community
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Past Events Archive */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Past Event Highlights
            </h2>
            <p className="text-lg text-muted-foreground">
              Memories from our recent community gatherings
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <Card key={index} className="card-gradient card-hover">
                <CardContent className="p-6">
                  <div className="bg-primary/10 h-40 rounded-lg mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-primary mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {event.date}
                  </p>
                  <p className="text-foreground leading-relaxed">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View Full Gallery
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Ready to Join Our Events?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Stay connected with Christ Life and never miss an event. Join our 
              WhatsApp group to receive event updates, study links, and more!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-accent text-lg px-8 py-6">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join WhatsApp Group
              </Button>
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-6 bg-primary-foreground/20 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
              >
                <Calendar className="mr-2 h-5 w-5" />
                View Calendar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;