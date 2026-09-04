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
  ChevronLeft,
  Play,
} from "lucide-react";
import heroImage from "@/assets/hero-main.jpg";
import bibleStudyImage from "@/assets/bible-study-hero.jpg";
import groupPhoto1 from "@/assets/group1.jpeg";
import groupPhoto2 from "@/assets/group2.jpeg";
import groupPhoto3 from "@/assets/group3.jpeg";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const Index = () => {
 
  const testimonials = [
    {
      quote:
        "Joining Christ life has strengthened my faith, my prayer life, and my relationship with God. The sermons and the people here have encouraged me a lot. I'm growing, and I'm thankful for how God is using this organization in my life",
      author: "Emily Emily",
      role: "Member",
    },
    {
      quote:
        "Being part of Christ's life has helped strengthen my communication and relationship with God",
      author: "Thomas Surprise Dugbeh Jr.",
      role: "Member",
    },
  ];

  return (
    <div className="min-h-screen">
      <section
        className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${groupPhoto1})` }}
      >
        {/* Subtle overlay for text readability — no gradient */}
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              We are <span className="text-white">Christ Life</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/95 mb-4 leading-relaxed">
              "For I know the plans I have for you," declares the Lord, "plans
              to prosper you and not to harm you, to give you hope and a
              future."
            </p>

            <p className="text-lg text-white/85 mb-8 italic">
              - Jeremiah 29:11
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
              >
                <Link
                  to="https://meet.google.com/see-egjy-ruo"
                  className="flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* <MessageCircle className="mr-2 h-5 w-5" /> */}
                  Join Bible Study
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary border-white hover:bg-white/90 hover:text-primary text-lg px-8 py-6"
              >
                <Link to="/events" className="flex items-center">
                  {/* <Calendar className="mr-2 h-5 w-5" /> */}
                  See Events
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Highlight */}
      <section className="py-16 bg-gradient-to-r from-secondary to-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              Who We Are
            </h2>
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              Christ Life is a Christian youth group dedicated to digitally,
              discovering, following, and sharing Christ. We meet weekly for
              Bible studies and organize events to build fellowship and faith in
              our community.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={groupPhoto2}
              alt="Christ Life Youth Group"
              className="rounded-xl shadow-xl w-full max-w-lg md:max-w-3xl object-cover"
            />
          </div>
        </div>
      </section>
      <section
        className="py-20 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${groupPhoto3})` }}
      >
        {/* Simple overlay — no gradient */}
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase text-white/80">
              Mission & Vision
            </p>

            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-10">
              Restoring Relationships
            </h2>

            <div className="grid md:grid-cols-2 gap-10 md:gap-16 text-white text-left">
              {/* Mission */}
              <div className="md:border-r md:border-white/30 md:pr-10">
                <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
                  Our Mission
                </h3>

                <p className="text-lg leading-relaxed text-white/90">
                  Christ‑Life exists to use digital platforms and multiply
                  disciples of Jesus Christ. Our mission is to help youth
                  discover Christ, follow Him, and share Him — both online and
                  in person — through Bible studies, prayers, outreach, and
                  creative engagement.
                </p>
              </div>

              {/* Vision */}
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
                  Our Vision
                </h3>

                <p className="text-lg leading-relaxed text-white/90">
                  To leverage digital platforms to awaken faith in
                  non-believers, activate lukewarm believers, and multiply
                  Christ-followers everywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Bible Studies */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section introduction */}
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                Weekly Gathering
              </p>

              <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-5">
                Weekly Bible Studies
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Join us twice a week for Bible study, honest discussion, and
                fellowship as we grow together in Christ.
              </p>
            </div>

            {/* Study schedule */}
            <div className="border-y border-border">
              {/* Tuesday */}
              <div className="py-8 md:py-10 grid md:grid-cols-[180px_1fr_auto] gap-6 md:gap-10 items-center">
                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-1">
                    Every
                  </p>
                  <h3 className="text-3xl font-heading font-bold text-primary">
                    Tuesday
                  </h3>
                </div>

                <div>
                  <p className="text-xl font-semibold text-foreground mb-2">
                    Bible Study
                  </p>
                  <p className="text-muted-foreground">
                    10:00 - 11:00 PM · Google Meet / WhatsApp
                  </p>
                </div>

                <div className="md:text-right">
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    Join Study
                  </Button>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Thursday */}
              <div className="py-8 md:py-10 grid md:grid-cols-[180px_1fr_auto] gap-6 md:gap-10 items-center">
                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-1">
                    Every
                  </p>
                  <h3 className="text-3xl font-heading font-bold text-primary">
                    Thursday
                  </h3>
                </div>

                <div>
                  <p className="text-xl font-semibold text-foreground mb-2">
                    Prayer
                  </p>
                  <p className="text-muted-foreground">
                    10:00 - 11:00 PM · Google Meet / WhatsApp
                  </p>
                </div>

                <div className="md:text-right">
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    Join Prayer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Life Transformations */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Heading */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">
                Stories From Our Community
              </h2>
            </div>

            {/* Testimonial Carousel */}
            <div className="relative">
              <Swiper
                modules={[Autoplay, Navigation]}
                navigation={{
                  prevEl: ".testimonial-prev",
                  nextEl: ".testimonial-next",
                }}
                spaceBetween={40}
                slidesPerView={1}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                }}
                loop={testimonials.length > 1}
                className="testimonial-swiper"
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <div className="max-w-3xl mx-auto text-center px-6 md:px-12">
                      {/* Large quotation mark */}
                      <div
                        className="text-7xl md:text-8xl leading-none text-primary/20 font-serif mb-2"
                        aria-hidden="true"
                      >
                        “
                      </div>

                      {/* Testimonial */}
                      <blockquote className="text-xl md:text-2xl leading-relaxed text-foreground mb-8">
                        {testimonial.quote}
                      </blockquote>

                      {/* Person */}
                      <div>
                        <p className="font-semibold text-primary text-lg">
                          {testimonial.author}
                        </p>

                        <p className="text-sm text-muted-foreground mt-1">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Carousel Controls */}
              <div className="flex items-center justify-center gap-6 mt-10">
                {/* Previous */}
                <button
                  className="testimonial-prev h-11 w-11 rounded-full border border-primary/30 text-primary flex items-center justify-center transition-all duration-200 hover:bg-primary hover:text-white"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  className="testimonial-next h-11 w-11 rounded-full border border-primary/30 text-primary flex items-center justify-center transition-all duration-200 hover:bg-primary hover:text-white"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Join */}
      <section className="py-20 bg-background">
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
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
              >
                <Link
                  to="https://meet.google.com/see-egjy-ruo"
                  className="flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Bible Study
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
