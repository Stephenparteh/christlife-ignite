import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Cross,
  Heart,
  Users,
  BookOpen,
  Target,
  Eye,
  Star,
  MessageCircle,
} from "lucide-react";
import heroImage from "@/assets/hero-main.jpg";
import heroImage1 from "@/assets/group1.jpeg";

const About = () => {
  const leadership = [
    {
      name: "Pastor Michael Johnson",
      role: "Youth Pastor & Founder",
      description:
        "Leading with passion for youth ministry and biblical teaching.",
      image: "/placeholder-team1.jpg",
    },
    {
      name: "Sarah Williams",
      role: "Worship Leader",
      description: "Guiding our community in worship and spiritual growth.",
      image: "/placeholder-team2.jpg",
    },
    {
      name: "David Chen",
      role: "Bible Study Coordinator",
      description: "Organizing and facilitating our weekly Bible studies.",
      image: "/placeholder-team3.jpg",
    },
    {
      name: "Maria Rodriguez",
      role: "Outreach Director",
      description: "Coordinating community service and evangelism efforts.",
      image: "/placeholder-team4.jpg",
    },
  ];

  const impactStories = [
    {
      title: "100+ Lives Transformed",
      description: "Through Bible studies and discipleship programs",
      icon: Users,
    },
    {
      title: "Weekly Bible Studies",
      description: "Consistent spiritual growth and community building",
      icon: BookOpen,
    },
    {
      title: "Community Outreach",
      description: "Serving our local community through various initiatives",
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage1})` }}
      >
        <div className="hero-overlay"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge
            variant="secondary"
            className="mb-4 text-accent bg-accent-foreground/20"
          >
            About Christ Life
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-6">
            Our Story & Mission
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Founded to discover, follow, and share Christ through community,
            Bible study, and authentic fellowship.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-lg text-foreground leading-relaxed">
                <p>
                  Christ Life was founded with a simple yet profound purpose: to
                  create a space where young people can discover the love of
                  Christ, follow His teachings, and share that transformative
                  message with others.
                </p>
                <p>
                  Our activities include online and in-person Bible studies,
                  community picnics, fellowship events, and outreach programs.
                  We believe in the power of authentic community to strengthen
                  faith and create lasting relationships.
                </p>
                <p>
                  Through weekly Bible studies every Tuesday and Thursday (10-11
                  PM via Google Meet/WhatsApp), we dive deep into God's Word and
                  support each other's spiritual growth journey.
                </p>
              </div>
              <Button className="btn-hero mt-6" size="lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Our Community
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="card-gradient card-hover text-center">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-primary">200+</h3>
                  <p className="text-muted-foreground">Active Members</p>
                </CardContent>
              </Card>
              <Card className="card-gradient card-hover text-center">
                <CardContent className="p-6">
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-primary">2x</h3>
                  <p className="text-muted-foreground">Weekly Studies</p>
                </CardContent>
              </Card>
              <Card className="card-gradient card-hover text-center">
                <CardContent className="p-6">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-primary">5+</h3>
                  <p className="text-muted-foreground">Community Events</p>
                </CardContent>
              </Card>
              <Card className="card-gradient card-hover text-center">
                <CardContent className="p-6">
                  <Cross className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-primary">1</h3>
                  <p className="text-muted-foreground">Year Strong</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision (FISION) */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 text-accent bg-accent-foreground/20"
            >
              Our FISION
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Mission & Vision
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Restoring relationships with God and with one another through
              discipleship, community building, and outreach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-primary-foreground/10 border-primary-foreground/20">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-accent mb-6" />
                <h3 className="text-2xl font-heading font-bold mb-4">
                  Our Mission
                </h3>
                <p className="text-primary-foreground/90 leading-relaxed">
                  To foster discipleship and spiritual growth by creating a
                  welcoming community where young people can discover their
                  purpose in Christ, grow in biblical knowledge, and develop
                  meaningful relationships that reflect God's love.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 border-primary-foreground/20">
              <CardContent className="p-8">
                <Eye className="h-12 w-12 text-accent mb-6" />
                <h3 className="text-2xl font-heading font-bold mb-4">
                  Our Vision
                </h3>
                <p className="text-primary-foreground/90 leading-relaxed">
                  To see a generation of young believers who are deeply rooted
                  in Christ, actively serving their communities, and boldly
                  sharing the Gospel. We envision a movement of transformed
                  lives that impacts families, schools, and neighborhoods.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              What We Do
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our activities are designed to build faith, foster community, and
              serve others
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-gradient card-hover">
              <CardContent className="p-6">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-heading font-bold text-primary mb-3">
                  Weekly Bible Studies
                </h3>
                <p className="text-foreground leading-relaxed">
                  In-depth study of Scripture every Tuesday and Thursday,
                  building biblical knowledge and spiritual maturity.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient card-hover">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-heading font-bold text-primary mb-3">
                  Community Events
                </h3>
                <p className="text-foreground leading-relaxed">
                  Bible picnics, game days, barbecues, and meet & greet events
                  that strengthen our bonds as a faith family.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient card-hover">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-heading font-bold text-primary mb-3">
                  Outreach Programs
                </h3>
                <p className="text-foreground leading-relaxed">
                  Serving our local community through various initiatives and
                  sharing Christ's love through action.
                </p>
              </CardContent>
            </Card>
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
              The principles that guide our community and ministry
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-gradient card-hover text-center">
              <CardContent className="p-8">
                <Cross className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Faith
                </h3>
                <p className="text-foreground leading-relaxed">
                  Deepening our relationship with Jesus Christ through prayer,
                  worship, and faithful study of God's Word. We believe faith is
                  the foundation of all spiritual growth and transformation.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient card-hover text-center">
              <CardContent className="p-8">
                <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Love
                </h3>
                <p className="text-foreground leading-relaxed">
                  Showing Christ's love through compassion, kindness, and
                  genuine care for one another. Love motivates everything we do
                  and reflects God's heart for His people.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient card-hover text-center">
              <CardContent className="p-8">
                <Users className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Service
                </h3>
                <p className="text-foreground leading-relaxed">
                  Serving our community and sharing the Gospel through actions
                  and outreach. We believe service is worship in action and a
                  way to demonstrate Christ's love.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-muted-foreground">
              Dedicated servants leading with passion and purpose
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member, index) => (
              <Card
                key={index}
                className="card-gradient card-hover text-center"
              >
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-primary mb-1">
                    {member.name}
                  </h3>
                  <Badge variant="outline" className="mb-3 text-xs">
                    {member.role}
                  </Badge>
                  <p className="text-sm text-foreground leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-muted-foreground">
              God's work through our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {impactStories.map((story, index) => (
              <Card
                key={index}
                className="card-gradient card-hover text-center"
              >
                <CardContent className="p-8">
                  <story.icon className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-heading font-bold text-primary mb-4">
                    {story.title}
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {story.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
