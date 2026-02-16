import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Cross,
  Heart,
  Users,
  BookOpen,
  Target,
  Eye,
  MessageCircle,
} from "lucide-react";
import heroImage1 from "@/assets/group1.jpeg";
import prayingPhoto1 from "@/assets/praying1.jpeg";
import prayingPhoto2 from "@/assets/praying2.jpeg";
import prayingPhoto3 from "@/assets/praying3.jpeg";

const About = () => {
  const leadership = [
    {
      name: "Phil",
      role: "CEO & Founder",
      description:
        "Leading with passion for youth ministry and biblical teaching.",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section - Full width with organic shape */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage1})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary-light/70" />

        {/* Decorative blob */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-primary-light/30 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <Badge
              variant="secondary"
              className="mb-6 text-accent bg-white/20 backdrop-blur-sm border-0"
            >
              About Christ Life
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight">
              Our Story & Mission
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Founded to discover, follow, and share Christ through community,
              Bible study, and authentic fellowship.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are - Split section */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text Side */}
            <div className="order-2 lg:order-1">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-8 leading-tight">
                Building Faith <br />
                <span className="text-primary">Together</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
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
              <Button className="btn-hero mt-8" size="lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Our Community
              </Button>
            </div>

            {/* Stats Side - Organic floating cards */}
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-8 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1">
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-4xl font-bold text-foreground mb-1">
                    200+
                  </h3>
                  <p className="text-muted-foreground">Active Members</p>
                </div>

                <div className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-8 shadow-xl shadow-primary/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 mt-8">
                  <BookOpen className="h-10 w-10 text-white mb-4" />
                  <h3 className="text-4xl font-bold text-white mb-1">2x</h3>
                  <p className="text-white/80">Weekly Studies</p>
                </div>

                <div className="bg-accent/10 rounded-3xl p-8 hover:bg-accent/20 transition-all duration-500 hover:-translate-y-1">
                  <Heart className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-4xl font-bold text-foreground mb-1">
                    5+
                  </h3>
                  <p className="text-muted-foreground">Community Events</p>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 -mt-4">
                  <Cross className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-4xl font-bold text-foreground mb-1">1</h3>
                  <p className="text-muted-foreground">Year Strong</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Full width gradient section */}
      <section className="relative py-32 overflow-hidden">
        {/* Organic background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-light/40 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge
              variant="secondary"
              className="mb-6 text-accent bg-white/20 backdrop-blur-sm border-0"
            >
              Our FISION
            </Badge>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Mission & Vision
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Restoring relationships with God and with one another through
              discipleship, community building, and outreach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Mission */}
            <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-10 lg:p-12 border border-white/20 hover:bg-white/15 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-8">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-6">
                Our Mission
              </h3>
              <p className="text-white/80 leading-relaxed text-lg">
                To foster discipleship and spiritual growth by creating a
                welcoming community where young people can discover their
                purpose in Christ, grow in biblical knowledge, and develop
                meaningful relationships that reflect God's love.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-10 lg:p-12 border border-white/20 hover:bg-white/15 transition-all duration-500 md:mt-12">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-8">
                <Eye className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-6">
                Our Vision
              </h3>
              <p className="text-white/80 leading-relaxed text-lg">
                To see a generation of young believers who are deeply rooted in
                Christ, actively serving their communities, and boldly sharing
                the Gospel. We envision a movement of transformed lives that
                impacts families, schools, and neighborhoods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Alternating sections */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">
              What We Do
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Building Faith & Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our activities are designed to build faith, foster community, and
              serve others
            </p>
          </div>

          {/* Activity 1 - Left aligned */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24">
            <div className="flex-1">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
                Weekly Bible Studies
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In-depth study of Scripture every Tuesday and Thursday, building
                biblical knowledge and spiritual maturity.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-lg shadow-primary/10">
                <img
                  src={prayingPhoto1}
                  alt="Weekly Bible Study"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Activity 2 - Right aligned */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 mb-24">
            <div className="flex-1">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mb-8 shadow-lg shadow-accent/20">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
                Community Events
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Bible picnics, game days, barbecues, and meet & greet events
                that strengthen our bonds as a faith family.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-lg shadow-primary/10">
                <img
                  src={prayingPhoto2}
                  alt="Weekly Bible Study"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Activity 3 - Left aligned */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-light to-primary flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
                Outreach Programs
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Serving our local community through various initiatives and
                sharing Christ's love through action.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-lg shadow-primary/10">
                <img
                  src={prayingPhoto3}
                  alt="Weekly Bible Study"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Flowing horizontal layout */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">
              Our Foundation
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Core Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide our community and ministry
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Value 1 - Faith */}
            <div className="flex flex-col md:flex-row items-start gap-8 mb-16 pb-16 border-b border-border/50">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-2xl shadow-primary/30">
                  <Cross className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
                  Faith
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  Deepening our relationship with Jesus Christ through prayer,
                  worship, and faithful study of God's Word. We believe faith is
                  the foundation of all spiritual growth and transformation.
                </p>
              </div>
            </div>

            {/* Value 2 - Love */}
            <div className="flex flex-col md:flex-row-reverse items-start gap-8 mb-16 pb-16 border-b border-border/50">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-2xl shadow-accent/30">
                  <Heart className="h-12 w-12 text-primary" />
                </div>
              </div>
              <div className="flex-1 md:text-right">
                <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
                  Love
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl md:ml-auto">
                  Showing Christ's love through compassion, kindness, and
                  genuine care for one another. Love motivates everything we do
                  and reflects God's heart for His people.
                </p>
              </div>
            </div>

            {/* Value 3 - Service */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center shadow-2xl shadow-primary/30">
                  <Users className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
                  Service
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  Serving our community and sharing the Gospel through actions
                  and outreach. We believe service is worship in action and a
                  way to demonstrate Christ's love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team - Organic flowing layout */}
      <section className="py-24 lg:py-32 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">
              Our People
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-muted-foreground">
              Dedicated servants leading with passion and purpose
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {leadership.map((member, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl transition-all duration-500 hover:-translate-y-1 ${
                  index % 2 === 0
                    ? "bg-gradient-to-br from-white to-muted/30 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10"
                    : "bg-gradient-to-br from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10"
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-500">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className="mb-3 text-xs border-primary/20 text-primary"
                    >
                      {member.role}
                    </Badge>
                    <p className="text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories - Full width with large typography */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">
              Making a Difference
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Our Impact
            </h2>
            <p className="text-lg text-muted-foreground">
              God's work through our community
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-8 max-w-5xl mx-auto">
            {/* Impact 1 */}
            <div className="flex-1 bg-white rounded-3xl p-10 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                100+ Lives Transformed
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Through Bible studies and discipleship programs
              </p>
            </div>

            {/* Impact 2 */}
            <div className="flex-1 bg-gradient-to-br from-primary to-primary-light rounded-3xl p-10 shadow-xl shadow-primary/30 transition-all duration-500 group lg:-mt-4 lg:mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-3">
                Weekly Bible Studies
              </h3>
              <p className="text-white/80 leading-relaxed">
                Consistent spiritual growth and community building
              </p>
            </div>

            {/* Impact 3 */}
            <div className="flex-1 bg-white rounded-3xl p-10 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                Community Outreach
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Serving our local community through various initiatives
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
