import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MessageCircle,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
import heroImage from "@/assets/hero-main.jpg";
import groupImg1 from "@/assets/group1.jpeg";

const Contact = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${groupImg1})` }}
      >
        <div className="hero-overlay"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-6">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you! Reach out with questions, prayer
            requests, or to learn more about joining our Christ Life community.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-primary">
                  Send Us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="What would you like to talk about?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your question, prayer request, or how we can help..."
                    className="min-h-32"
                    required
                  />
                </div>

                <Button size="lg" className="btn-hero w-full">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  We typically respond within 24 hours. For urgent matters,
                  please call or text us directly.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-xl font-heading text-primary flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Direct Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:info@christlife.org"
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      info@christlife.org
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a
                      href="tel:+15551234567"
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="btn-hero w-full" size="lg">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Join WhatsApp Group
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Get Bible study links and community updates
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Meeting Times */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-xl font-heading text-primary flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Bible Study Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border-l-4 border-primary pl-4">
                    <p className="font-semibold text-primary">
                      Tuesday Evenings
                    </p>
                    <p className="text-muted-foreground">10:00 - 11:00 PM</p>
                    <p className="text-sm text-muted-foreground">
                      Google Meet / WhatsApp
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <p className="font-semibold text-primary">
                      Thursday Evenings
                    </p>
                    <p className="text-muted-foreground">10:00 - 11:00 PM</p>
                    <p className="text-sm text-muted-foreground">
                      Google Meet / WhatsApp
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Join our WhatsApp group to receive meeting links and
                  reminders.
                </p>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-xl font-heading text-primary">
                  Connect on Social Media
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 p-4 h-auto"
                  >
                    <Facebook className="h-6 w-6 text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium text-sm">Facebook</p>
                      <p className="text-xs text-muted-foreground">
                        @ChristLifeYouth
                      </p>
                    </div>
                  </Button>

                  {/* <Button
                    variant="outline"
                    className="flex items-center gap-2 p-4 h-auto"
                  >
                    <Instagram className="h-6 w-6 text-pink-600" />
                    <div className="text-left">
                      <p className="font-medium text-sm">Instagram</p>
                      <p className="text-xs text-muted-foreground">
                        @christlifeyouth
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2 p-4 h-auto"
                  >
                    <Twitter className="h-6 w-6 text-blue-400" />
                    <div className="text-left">
                      <p className="font-medium text-sm">Twitter</p>
                      <p className="text-xs text-muted-foreground">
                        @ChristLifeYG
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2 p-4 h-auto"
                  >
                    <Youtube className="h-6 w-6 text-red-600" />
                    <div className="text-left">
                      <p className="font-medium text-sm">YouTube</p>
                      <p className="text-xs text-muted-foreground">
                        Christ Life Youth
                      </p>
                    </div>
                  </Button> */}
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  Follow us for daily inspiration, event updates, and community
                  highlights.
                </p>
              </CardContent>
            </Card>

            {/* Leadership Contact */}
            {/* <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-xl font-heading text-primary">
                  Leadership Team
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold">Pastor Michael Johnson</p>
                    <p className="text-sm text-muted-foreground">
                      Youth Pastor & Founder
                    </p>
                    <a
                      href="mailto:pastor.mike@christlife.org"
                      className="text-xs text-primary hover:text-primary-dark"
                    >
                      pastor.mike@christlife.org
                    </a>
                  </div>

                  <div>
                    <p className="font-semibold">Sarah Williams</p>
                    <p className="text-sm text-muted-foreground">
                      Worship Leader
                    </p>
                    <a
                      href="mailto:sarah@christlife.org"
                      className="text-xs text-primary hover:text-primary-dark"
                    >
                      sarah@christlife.org
                    </a>
                  </div>

                  <div>
                    <p className="font-semibold">David Chen</p>
                    <p className="text-sm text-muted-foreground">
                      Bible Study Coordinator
                    </p>
                    <a
                      href="mailto:david@christlife.org"
                      className="text-xs text-primary hover:text-primary-dark"
                    >
                      david@christlife.org
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      {/* <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions about Christ Life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="card-gradient">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-primary mb-2">
                  How do I join a Bible study?
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Simply join our WhatsApp group to receive meeting links and
                  study materials. No prior experience needed - all are welcome!
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-primary mb-2">
                  What should I expect at events?
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Our events are welcoming, fun, and faith-centered. Come as you
                  are and expect genuine fellowship and spiritual growth.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-primary mb-2">
                  Is Christ Life only for youth?
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  While we focus on youth ministry, young adults and those young
                  at heart are always welcome to join our community.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-primary mb-2">
                  Do I need to bring anything?
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Just bring yourself and an open heart! We provide study
                  materials, and food is usually provided at social events.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Contact;
