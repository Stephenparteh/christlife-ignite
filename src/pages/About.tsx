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
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import heroImage1 from "@/assets/group1.jpeg";
import prayingPhoto1 from "@/assets/praying1.jpeg";
import prayingPhoto2 from "@/assets/praying2.jpeg";
import prayingPhoto3 from "@/assets/praying3.jpeg";

import groupPhoto1 from "@/assets/praying3.jpeg";

const About = () => {
  const leadership = [
    {
      name: "John Doe",
      role: "Founder & Director",
      image: groupPhoto1,
      description:
        "John leads Christ Life with a passion for helping young people discover and follow Christ.",
      instagram: "https://instagram.com/...",
      facebook: "https://facebook.com/...",
      linkedin: "https://linkedin.com/...",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section - Full width with organic shape */}
      <section className="relative min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage1})` }}
        />

        {/* Simple dark overlay — no gradient */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight">
              Our Story & Mission
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl">
              Founded to discover, follow, and share Christ through community,
              Bible study, and authentic fellowship.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text Side */}
            <div>
              {/* <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">
                Who We Are
              </p> */}

              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-8 leading-tight">
                Building Faith <span className="text-primary">Together</span>
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

              <Button
                className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Our Community
              </Button>
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={groupPhoto1}
                  alt="Christ Life community"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>

              {/* Small supporting detail */}
              {/* <div className="absolute -bottom-6 -left-6 md:-left-10 bg-background border border-border px-6 py-5 shadow-lg">
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">
                  Christ Life
                </p>

                <p className="text-lg font-semibold text-primary">
                  Discover · Follow · Share
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 lg:py-32 bg-primary">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Mission & Vision
            </h2>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Restoring relationships with God and with one another through
              discipleship, community building, and outreach.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 lg:p-10">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-7">
                <Target className="h-7 w-7 text-primary" />
              </div>

              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-5">
                Our Mission
              </h3>

              <p className="text-muted-foreground leading-relaxed text-lg">
                Christ-Life exists to use digital platforms and multiply
                disciples of Jesus Christ. Our mission is to help youth discover
                Christ, follow Him and share Him — both online and in person —
                through Bible studies, prayers, outreach, and creative
                engagement.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 md:mt-10">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-7">
                <Eye className="h-7 w-7 text-primary" />
              </div>

              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-5">
                Our Vision
              </h3>

              <p className="text-muted-foreground leading-relaxed text-lg">
                To leverage digital platforms to awaken faith in non-believers,
                activate lukewarm believers, and multiply Christ-followers
                everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Flowing horizontal layout */}
      {/* <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
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
      </section> */}

      {/* Our People */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4">
              Our People
            </p>

            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Meet Our Leadership
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Dedicated servants leading Christ Life with passion, purpose, and
              a heart for the community.
            </p>
          </div>

          {/* Leadership */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {leadership.map((member, index) => (
              <div key={index} className="group">
                {/* Person Image */}
                <div className="relative overflow-hidden rounded-2xl aspect-[4/4] bg-muted max-w-sm">
                  {" "}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Information */}
                  <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white/90 leading-relaxed mb-6">
                      {member.description}
                    </p>

                    {/* Social Media */}
                    <div className="flex items-center gap-3">
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on Instagram`}
                          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                      )}

                      {member.facebook && (
                        <a
                          href={member.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on Facebook`}
                          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
                        >
                          <Facebook className="h-4 w-4" />
                        </a>
                      )}

                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on LinkedIn`}
                          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Name & Position */}
                <div className="mt-5">
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    {member.name}
                  </h3>

                  <p className="text-sm text-primary font-medium mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories - Full width with large typography */}
      {/* <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
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
      </section> */}
    </div>
  );
};

export default About;
