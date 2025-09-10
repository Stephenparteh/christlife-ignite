import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen,
  Clock,
  Users,
  MessageCircle,
  Calendar,
  Star,
  Download,
  Play,
  Lightbulb,
  Heart,
  ChevronRight
} from "lucide-react";
import bibleStudyImage from "@/assets/bible-study-hero.jpg";

const BibleStudy = () => {
  const recentThemes = [
    {
      title: "The Armor of God",
      reference: "Ephesians 6:10-18",
      date: "December 5, 2024",
      description: "Exploring spiritual warfare and the protective armor God provides for believers.",
      duration: "60 minutes"
    },
    {
      title: "Walking in Faith",
      reference: "Hebrews 11:1-16", 
      date: "December 3, 2024",
      description: "Understanding what it means to live by faith rather than sight.",
      duration: "60 minutes"
    },
    {
      title: "Love One Another",
      reference: "1 John 4:7-21",
      date: "November 28, 2024",
      description: "God's command to love and how it transforms our relationships.",
      duration: "60 minutes"
    },
    {
      title: "The Great Commission",
      reference: "Matthew 28:16-20",
      date: "November 26, 2024", 
      description: "Our calling to make disciples and spread the Gospel to all nations.",
      duration: "60 minutes"
    }
  ];

  const studyFeatures = [
    {
      icon: BookOpen,
      title: "Verse-by-Verse Study",
      description: "Deep dive into Scripture with careful analysis and application"
    },
    {
      icon: Users,
      title: "Interactive Discussion",
      description: "Share insights and learn from fellow believers in small groups"
    },
    {
      icon: Heart,
      title: "Prayer & Worship",
      description: "Begin and end each study with prayer and worship time"
    },
    {
      icon: Lightbulb,
      title: "Practical Application",
      description: "Learn how to apply biblical truths to daily life situations"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${bibleStudyImage})` }}
      >
        <div className="hero-overlay"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 text-accent bg-accent-foreground/20">
            Bible Study
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-6">
            Grow in God's Word
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Join us twice weekly for in-depth Bible study, fellowship, and spiritual growth 
            in a supportive community environment.
          </p>
          <Button size="lg" className="btn-accent text-lg px-8 py-6">
            <MessageCircle className="mr-2 h-5 w-5" />
            Join Study Group
          </Button>
        </div>
      </section>

      {/* Study Schedule */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Weekly Study Schedule
            </h2>
            <p className="text-lg text-muted-foreground">
              Consistent times for spiritual growth and community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="card-gradient card-hover">
              <CardContent className="p-8 text-center">
                <Calendar className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Tuesday Study
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-accent" />
                    <span className="font-semibold text-accent">10:00 - 11:00 PM</span>
                  </div>
                  <p className="text-muted-foreground">
                    Google Meet / WhatsApp Group
                  </p>
                  <p className="text-foreground">
                    Focus on Old Testament studies and historical context
                  </p>
                </div>
                <Button className="btn-hero w-full">
                  Get Tuesday Link
                </Button>
              </CardContent>
            </Card>

            <Card className="card-gradient card-hover">
              <CardContent className="p-8 text-center">
                <Calendar className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Thursday Study
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-accent" />
                    <span className="font-semibold text-accent">10:00 - 11:00 PM</span>
                  </div>
                  <p className="text-muted-foreground">
                    Google Meet / WhatsApp Group
                  </p>
                  <p className="text-foreground">
                    Focus on New Testament teachings and practical application
                  </p>
                </div>
                <Button className="btn-hero w-full">
                  Get Thursday Link
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              How to Join Our Bible Studies
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Getting started is simple! Follow these easy steps to begin your journey 
              with our Bible study community.
            </p>

            <Card className="card-gradient">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <MessageCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-primary mb-2">
                      1. Join WhatsApp Group
                    </h3>
                    <p className="text-sm text-foreground">
                      Click the link to join our WhatsApp group where we share 
                      study materials and meeting links.
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Calendar className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-primary mb-2">
                      2. Check the Schedule
                    </h3>
                    <p className="text-sm text-foreground">
                      Mark your calendar for Tuesdays and Thursdays at 10 PM. 
                      Choose one or join both sessions!
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-primary mb-2">
                      3. Join the Study
                    </h3>
                    <p className="text-sm text-foreground">
                      Click the Google Meet link shared in the group and 
                      join us for Bible study and fellowship.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Button size="lg" className="btn-hero w-full sm:w-auto">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Join WhatsApp Group for Study Links
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Study Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-muted-foreground">
              Our Bible studies are designed to be engaging, educational, and transformative
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studyFeatures.map((feature, index) => (
              <Card key={index} className="card-gradient card-hover text-center">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-bold text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Themes */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Recent Study Themes
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore the topics we've covered in our recent Bible studies
            </p>
          </div>

          <div className="grid gap-4 max-w-4xl mx-auto">
            {recentThemes.map((theme, index) => (
              <Card key={index} className="card-gradient card-hover">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant="outline">{theme.reference}</Badge>
                        <span className="text-sm text-muted-foreground">{theme.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-heading font-bold text-primary mb-2">
                        {theme.title}
                      </h3>
                      
                      <p className="text-foreground leading-relaxed mb-3">
                        {theme.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{theme.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>20-30 participants</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 md:w-auto">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Notes
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Recording
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Past Studies
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Scripture Highlight */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Lightbulb className="h-16 w-16 mx-auto mb-8 text-accent" />
            <Badge variant="secondary" className="mb-6 text-accent bg-accent-foreground/20">
              This Week's Focus Verse
            </Badge>
            <blockquote className="text-2xl md:text-4xl font-heading leading-relaxed mb-6">
              "All Scripture is God-breathed and is useful for teaching, rebuking, 
              correcting and training in righteousness, so that the servant of God 
              may be thoroughly equipped for every good work."
            </blockquote>
            <p className="text-xl font-medium text-primary-foreground/90">
              - 2 Timothy 3:16-17
            </p>
          </div>
        </div>
      </section>

      {/* Past Teachings Archive */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Study Archive
            </h2>
            <p className="text-lg text-muted-foreground">
              Access recordings, notes, and materials from our previous Bible studies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="card-gradient card-hover text-center">
              <CardContent className="p-6">
                <Download className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-heading font-bold text-primary mb-3">
                  Study Notes
                </h3>
                <p className="text-sm text-foreground mb-4">
                  Download comprehensive study notes and handouts from our sessions.
                </p>
                <Button variant="outline" size="sm">
                  Browse Notes
                </Button>
              </CardContent>
            </Card>

            <Card className="card-gradient card-hover text-center">
              <CardContent className="p-6">
                <Play className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-heading font-bold text-primary mb-3">
                  Audio Recordings
                </h3>
                <p className="text-sm text-foreground mb-4">
                  Listen to past Bible study sessions and revisit key teachings.
                </p>
                <Button variant="outline" size="sm">
                  Listen Now
                </Button>
              </CardContent>
            </Card>

            <Card className="card-gradient card-hover text-center">
              <CardContent className="p-6">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-heading font-bold text-primary mb-3">
                  Reading Plans
                </h3>
                <p className="text-sm text-foreground mb-4">
                  Follow along with our current Bible reading plans and challenges.
                </p>
                <Button variant="outline" size="sm">
                  Get Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BibleStudy;