import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
import phil01 from "@/assets/Phil01.jpeg";
import MaLois01 from "@/assets/Ma-Lois01.jpeg";
import Blessing01 from "@/assets/Blessing01.jpeg";
import Jorii01 from "@/assets/Jorii01.jpeg";
import Gracesia01 from "@/assets/Gracesia01.jpeg";

import groupPhoto1 from "@/assets/praying3.jpeg";

const About = () => {
  const leadership = [
    {
      name: "Phil Julius Railey",
      role: " CEO/FOUNDER",
      image: phil01,
      // description:
      //   "Railey leads Christ Life with a passion for helping young people discover and follow Christ.",
      // instagram: "https://instagram.com/...",
      // facebook: "https://facebook.com/...",
      // linkedin: "https://linkedin.com/...",
    },
    {
      name: "Ma-Lois D Cheyee",
      role: "Executive Director",
      image: MaLois01,
      // description:
      //   "Railey leads Christ Life with a passion for helping young people discover and follow Christ.",
      // instagram: "https://instagram.com/...",
      // facebook: "https://facebook.com/...",
      // linkedin: "https://linkedin.com/...",
    },
    {
      name: "Min. Blessing M Jonah",
      role: "Worship & Women's Ministry Leader",
      image: Blessing01,
      // description:
      //   "Railey leads Christ Life with a passion for helping young people discover and follow Christ.",
      // instagram: "https://instagram.com/...",
      // facebook: "https://facebook.com/...",
      // linkedin: "https://linkedin.com/...",
    },
    {
      name: "Jorii S. Kullie",
      role: "Secretary",
      image: Jorii01,
      // description:
      //   "Railey leads Christ Life with a passion for helping young people discover and follow Christ.",
      // instagram: "https://instagram.com/...",
      // facebook: "https://facebook.com/...",
      // linkedin: "https://linkedin.com/...",
    },
    {
      name: "Gracesia Angel Vienn",
      role: "Chief Operating Officer",
      image: Gracesia01,
      // description:
      //   "Railey leads Christ Life with a passion for helping young people discover and follow Christ.",
      // instagram: "https://instagram.com/...",
      // facebook: "https://facebook.com/...",
      // linkedin: "https://linkedin.com/...",
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
                asChild
                className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                <a
                  href="https://chat.whatsapp.com/IrsmtYoFqur9dkK1dSLVhu?s=cl&p=i&mlu=4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Our Community
                </a>
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

      {/* Our People */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="max-w-3xl mb-16">

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
                  {/* <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white/90 leading-relaxed mb-6">
                      {member.description}
                    </p>

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
                  </div> */}
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

    </div>
  );
};

export default About;
