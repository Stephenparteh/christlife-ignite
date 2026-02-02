import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  BookOpen, 
  Calendar, 
  MessageCircle,
  Star,
  Cross,
  Lightbulb,
  ChevronRight,
  Play
} from "lucide-react";
import heroImage from "@/assets/hero-main.jpg";
import bibleStudyImage from "@/assets/bible-study-hero.jpg";
import groupPhoto1 from "@/assets/group1.jpeg";
import groupPhoto2 from "@/assets/group2.jpeg";
import groupPhoto3 from "@/assets/group3.jpeg";


const Index = () => {
  const coreValues = [
    {
      icon: Cross,
      title: "Faith",
      description: "Deepening our relationship with Jesus Christ through prayer, worship, and study."
    },
    {
      icon: Heart,
      title: "Love",
      description: "Showing Christ's love through compassion, kindness, and genuine care for one another."
    },
    {
      icon: Users,
      title: "Service",
      description: "Serving our community and sharing the Gospel through actions and outreach."
    }
  ];

  const testimonials = [
    {
      quote: "Christ Life has transformed my faith journey. The community here is like family.",
      author: "Sarah M.",
      role: "Member since 2023"
    },
    {
      quote: "Through Bible studies and fellowship, I've grown closer to God and made lifelong friends.",
      author: "David K.",
      role: "Youth Leader"
    },
    {
      quote: "The support and encouragement I receive here helps me live out my faith daily.",
      author: "Maria L.",
      role: "New Member"
    }
  ];

  const upcomingEvents = [
    {
      title: "Weekly Bible Study",
      date: "Every Tue & Thu",
      time: "10:00 - 11:00 PM",
      type: "Online",
      description: "Join us for deep Bible study and discussion"
    },
    {
      title: "Bible Picnic",
      date: "Dec 15, 2024",
      time: "2:00 - 6:00 PM",
      type: "Outdoor",
      description: "Fellowship, food, and fun in God's creation"
    },
    {
      title: "Game Day",
      date: "Dec 22, 2024", 
      time: "4:00 - 8:00 PM",
      type: "Indoor",
      description: "Board games, video games, and fellowship"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${groupPhoto1})` }}
      >
        <div className="hero-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="animate-fade-up">
            <Badge variant="secondary" className="mb-4 text-primary bg-primary-foreground/90">
              Discovering • Following • Sharing Christ
            </Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-6">
              We are <span >Christ Life</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 leading-relaxed">
              "For I know the plans I have for you,"declares the Lord, 
              "plans to prosper you and not to harm you, to give you hope and a future."
            </p>
            <p className="text-lg text-primary-foreground/80 mb-8 italic">
              - Jeremiah 29:11
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero text-lg px-8 py-6">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Bible Study
              </Button>
              
              <Button 
                size="lg" 
                variant="secondary" 
                className="btn-accent text-lg px-8 py-6"
              >
                <Link to="/events" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                See Events
                </Link>
              </Button>
              
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Highlight */}
      {/* <section className="py-16 bg-gradient-to-r from-secondary to-muted row">
        <div className="container mx-auto px-4 text-center col-md-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              Who We Are
            </h2>
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              Christ Life is a Christian youth group dedicated to discovering, following, 
              and sharing Christ. We meet weekly for Bible studies and organize events 
              to build fellowship and faith in our community.
            </p>
          </div>
          
        </div><div className="col-md-2">hi</div>
      </section> */}
            <div className="grid md:grid-cols-2 gap-8 text-primary-foreground bg-gradient-to-r from-secondary to-muted py-8 px-8">
              <div className="text-center align-middle p-6 ">
                <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4 text-primary mt-5">
                  Who We Are
                </h2>
                <p className="text-xl leading-relaxed text-black">
                  Christ Life is a Christian youth group dedicated to discovering, following, 
              and sharing Christ. We meet weekly for Bible studies and organize events 
              to build fellowship and faith in our community.
                </p> <p className="text-xl leading-relaxed text-black">
                  Christ Life is a Christian youth group dedicated to discovering, following, 
              and sharing Christ. We meet weekly for Bible studies and organize events 
              to build fellowship and faith in our community.
                </p>
              </div>
              <div className="text-left">
<img src={groupPhoto2} className="img-fluid rounded-lg shadow-lg h-86 w-full object-cover" alt="" />
              </div>
            </div>

      {/* Mission & Vision (FISION) */}
      <section 
        className="py-20 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${groupPhoto3})` }}
      >
        <div className="hero-overlay bg-primary/70"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 text-accent bg-accent-foreground/20">
              Our VISION
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-8">
              Restoring Relationships
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-primary-foreground">
              <div className="text-left">
                <h3 className="text-xl font-heading font-semibold mb-4 text-accent">
                  With God
                </h3>
                <p className="text-lg leading-relaxed">
                  Fostering discipleship and deepening our connection with Jesus Christ 
                  through prayer, worship, and biblical study.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-heading font-semibold mb-4 text-accent">
                  With One Another
                </h3>
                <p className="text-lg leading-relaxed">
                  Building authentic community through fellowship, outreach, and 
                  supporting each other in our faith journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Bible Studies */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Weekly Bible Studies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us twice weekly for deep Bible study, discussion, and fellowship through 
              Google Meet and WhatsApp.
            </p>
          </div>
          
          <Card className="card-gradient card-hover max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                Tuesdays & Thursdays
              </h3>
              <p className="text-xl text-accent font-semibold mb-4">
                10:00 - 11:00 PM
              </p>
              <p className="text-muted-foreground mb-6">
                Via Google Meet / WhatsApp Group
              </p>
              <Button className="btn-hero w-full" size="lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join WhatsApp Group for Links
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground">
              Join us for fellowship, fun, and faith-building activities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="card-gradient card-hover">
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">
                    {event.type}
                  </Badge>
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">
                    {event.title}
                  </h3>
                  <div className="space-y-1 mb-4 text-sm text-muted-foreground">
                    <p className="font-medium">{event.date}</p>
                    <p>{event.time}</p>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="group">
              <Link to="/events" className="flex items-center">
              View All Events
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The foundation of our community and faith
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="card-gradient card-hover text-center">
                <CardContent className="p-8">
                  <value.icon className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                    {value.title}
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonies Slider */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Life Transformations
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Hear from our community members
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-primary-foreground/10 border-primary-foreground/20 card-hover">
                <CardContent className="p-6">
                  <Star className="h-6 w-6 text-accent mb-4 fill-current" />
                  <blockquote className="text-primary-foreground/90 mb-4 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-primary-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-primary-foreground/70">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture of the Week */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Lightbulb className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-2xl font-heading font-bold mb-6">
              Scripture of the Week
            </h2>
            <blockquote className="text-xl md:text-2xl leading-relaxed mb-4">
              "Trust in the Lord with all your heart and lean not on your own understanding; 
              in all your ways submit to him, and he will make your paths straight."
            </blockquote>
            <p className="text-lg font-medium">
              - Proverbs 3:5-6
            </p>
          </div>
        </div>
      </section>

      {/* Call to Join */}
      <section className="py-20 bg-gradient-to-r from-secondary via-muted to-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
              Ready to Join Our Family?
            </h2>
            <p className="text-xl text-foreground mb-8 leading-relaxed">
              Take the first step in your faith journey with Christ Life. 
              Connect with us and discover the joy of Christian community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero text-lg px-8 py-6">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Bible Study
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Users className="mr-2 h-5 w-5" />
                Get Involved
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;