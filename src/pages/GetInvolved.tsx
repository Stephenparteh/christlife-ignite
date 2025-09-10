import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Users,
  Heart,
  BookOpen,
  Music,
  Camera,
  Utensils,
  HandHeart,
  DollarSign,
  MessageCircle,
  Send,
  Lightbulb,
  Globe,
  Church
} from "lucide-react";
import heroImage from "@/assets/hero-main.jpg";

const GetInvolved = () => {
  const volunteerOpportunities = [
    {
      title: "Bible Study Leader",
      icon: BookOpen,
      description: "Help facilitate small group discussions and guide Bible study sessions.",
      time: "2-3 hours/week",
      requirements: "Strong biblical knowledge, leadership experience preferred"
    },
    {
      title: "Worship Team Member",
      icon: Music,
      description: "Lead worship through music, vocals, or technical support.",
      time: "4-6 hours/week", 
      requirements: "Musical ability, heart for worship"
    },
    {
      title: "Event Coordinator",
      icon: Users,
      description: "Plan and organize community events, picnics, and social gatherings.",
      time: "3-5 hours/week",
      requirements: "Organizational skills, creativity, communication"
    },
    {
      title: "Media & Photography",
      icon: Camera,
      description: "Capture moments at events and help with social media content.",
      time: "2-4 hours/week",
      requirements: "Photography/video skills, social media experience"
    },
    {
      title: "Hospitality Team",
      icon: Utensils,
      description: "Welcome newcomers and coordinate refreshments for events.",
      time: "2-3 hours/week",
      requirements: "Welcoming personality, attention to detail"
    },
    {
      title: "Outreach Volunteer",
      icon: HandHeart,
      description: "Participate in community service projects and evangelism efforts.",
      time: "4-6 hours/month",
      requirements: "Heart for service, reliability"
    }
  ];

  const donationCategories = [
    {
      icon: BookOpen,
      title: "Study Materials",
      items: ["Bibles & Study Guides", "Notebooks & Supplies", "Technology for Online Studies"]
    },
    {
      icon: Utensils,
      title: "Event Support",
      items: ["Food & Refreshments", "Event Supplies", "Transportation Costs"]
    },
    {
      icon: Heart,
      title: "General Ministry",
      items: ["Facility Costs", "Leadership Development", "Community Outreach Programs"]
    }
  ];

  const partnershipOpportunities = [
    {
      title: "Local Churches",
      description: "Partner with us for joint events, resource sharing, and community outreach initiatives.",
      icon: Church
    },
    {
      title: "Educational Institutions",
      description: "Collaborate on youth programs, mentorship opportunities, and campus ministry.",
      icon: Lightbulb
    },
    {
      title: "Community Organizations",
      description: "Work together on service projects and community development programs.",
      icon: Globe
    }
  ];

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
            Get Involved
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-6">
            Join Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Discover meaningful ways to serve, support, and strengthen our Christ Life 
            community through volunteering, partnerships, and prayer.
          </p>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Volunteer Opportunities
            </h2>
            <p className="text-lg text-muted-foreground">
              Use your gifts and talents to serve God and build community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerOpportunities.map((opportunity, index) => (
              <Card key={index} className="card-gradient card-hover">
                <CardContent className="p-6">
                  <opportunity.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-lg font-heading font-bold text-primary mb-3">
                    {opportunity.title}
                  </h3>
                  <p className="text-foreground text-sm leading-relaxed mb-4">
                    {opportunity.description}
                  </p>
                  <div className="space-y-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {opportunity.time}
                      </Badge>
                    </div>
                    <p>{opportunity.requirements}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="card-gradient max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <Users className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Ready to Volunteer?
                </h3>
                <p className="text-foreground mb-6 leading-relaxed">
                  Fill out our volunteer interest form and we'll connect you with 
                  opportunities that match your gifts and availability.
                </p>
                <Button size="lg" className="btn-hero">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Sign Up to Volunteer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Support */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Support Our Ministry
            </h2>
            <p className="text-lg text-muted-foreground">
              Your donations help us provide resources and opportunities for spiritual growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {donationCategories.map((category, index) => (
              <Card key={index} className="card-gradient card-hover">
                <CardContent className="p-6 text-center">
                  <category.icon className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-heading font-bold text-primary mb-4">
                    {category.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center justify-center gap-2">
                        <DollarSign className="h-4 w-4 text-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <Card className="card-gradient max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                      How to Give
                    </h3>
                    <div className="space-y-4 text-foreground">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Heart className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Bank Transfer</p>
                          <p className="text-sm text-muted-foreground">
                            Christ Life Ministry Account - Contact us for details
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <MessageCircle className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Mobile Money</p>
                          <p className="text-sm text-muted-foreground">
                            Send via mobile money to +1 (555) 123-4567
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <HandHeart className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">In-Kind Donations</p>
                          <p className="text-sm text-muted-foreground">
                            Donate materials, supplies, or services directly
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-primary to-primary-light p-6 rounded-lg text-primary-foreground">
                      <DollarSign className="h-12 w-12 mx-auto mb-4" />
                      <h4 className="text-lg font-heading font-bold mb-2">
                        Every Gift Matters
                      </h4>
                      <p className="text-sm mb-4 opacity-90">
                        Whether $5 or $500, your donation makes a real difference 
                        in young lives and our community impact.
                      </p>
                      <Button variant="secondary" className="btn-accent">
                        Donate Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Prayer Requests */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Prayer Requests
            </h2>
            <p className="text-lg text-muted-foreground">
              Share your prayer needs with our community and experience God's love through prayer
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="card-gradient">
              <CardHeader>
              <CardTitle className="text-xl font-heading text-primary flex items-center">
                <HandHeart className="mr-2 h-5 w-5" />
                Submit a Prayer Request
              </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Your prayer requests will be shared confidentially with our prayer team 
                  and prayed over regularly.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prayerName">Your Name (Optional)</Label>
                  <Input 
                    id="prayerName" 
                    placeholder="Enter your name or leave anonymous"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prayerEmail">Email (Optional)</Label>
                  <Input 
                    id="prayerEmail" 
                    type="email" 
                    placeholder="If you'd like prayer updates"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prayerType">Prayer Category</Label>
                  <select 
                    id="prayerType" 
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="">Select category (optional)</option>
                    <option value="health">Health & Healing</option>
                    <option value="family">Family & Relationships</option>
                    <option value="financial">Financial Needs</option>
                    <option value="spiritual">Spiritual Growth</option>
                    <option value="guidance">Guidance & Direction</option>
                    <option value="thanksgiving">Thanksgiving & Praise</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prayerRequest">Prayer Request *</Label>
                  <Textarea 
                    id="prayerRequest"
                    placeholder="Please share your prayer request. We will handle it with care and confidentiality."
                    className="min-h-32"
                    required
                  />
                </div>

                <Button size="lg" className="btn-hero w-full">
                  <Send className="mr-2 h-5 w-5" />
                  Submit Prayer Request
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  All prayer requests are kept confidential and are only shared with 
                  our dedicated prayer team members.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-lg text-muted-foreground">
              Connect with us to expand our reach and impact in the community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnershipOpportunities.map((partnership, index) => (
              <Card key={index} className="card-gradient card-hover">
                <CardContent className="p-8 text-center">
                  <partnership.icon className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-heading font-bold text-primary mb-4">
                    {partnership.title}
                  </h3>
                  <p className="text-foreground leading-relaxed mb-6">
                    {partnership.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Explore Partnership
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="card-gradient max-w-3xl mx-auto">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Interested in Partnering?
                </h3>
                <p className="text-foreground mb-6 leading-relaxed">
                  We're always looking for like-minded organizations and churches 
                  to collaborate with. Let's discuss how we can work together 
                  to impact our community for Christ.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-hero">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact Us
                  </Button>
                  <Button size="lg" variant="outline">
                    Download Partnership Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Be Part of Something Greater
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Whether through volunteering, giving, prayer, or partnership - 
              there's a place for you in the Christ Life family. 
              Join us in discovering, following, and sharing Christ!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-accent text-lg px-8 py-6">
                <Users className="mr-2 h-5 w-5" />
                Get Involved Today
              </Button>
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-6 bg-primary-foreground/20 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask Questions
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;