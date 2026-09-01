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
  const coreValues = [
    {
      icon: Cross,
      title: "Faith",
      description:
        "Deepening our relationship with Jesus Christ through prayer, worship, and study.",
    },
    {
      icon: Heart,
      title: "Love",
      description:
        "Showing Christ's love through compassion, kindness, and genuine care for one another.",
    },
    {
      icon: Users,
      title: "Service",
      description:
        "Serving our community and sharing the Gospel through actions and outreach.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Being part of Christ's life has helped strengthen my communication and relationship with God",
      author: "Thomas surprise Dugbeh Jr.",
      role: "Member",
    },
    {
      quote:
        "Christ's life has helped strengthen my communication and relationship with God",
      author: "Dugbeh Jr.",
      role: "Member",
    },
    {
      quote: "relationship with God",
      author: "surprise",
      role: "Member",
    },
  ];

  const upcomingEvents = [
    {
      title: "Weekly Bible Study",
      date: "Every Tue & Thu",
      time: "10:00 - 11:00 PM",
      type: "Online",
      description: "Join us for deep Bible study and discussion",
    },
    {
      title: "Orphan Outreach Day",
      date: "March 28, 2026",
      // time: "1:00 - 6:00 PM",
      type: "Outdoor",
      description:
        "Showing compassion, provide support, and share Christ's love.",
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
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Join Bible Study
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary border-white hover:bg-white/90 hover:text-primary text-lg px-8 py-6"
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
                  Fostering discipleship and deepening our connection with Jesus
                  Christ through prayer, worship, and biblical study.
                </p>
              </div>

              {/* Vision */}
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
                  Our Vision
                </h3>

                <p className="text-lg leading-relaxed text-white/90">
                  Building authentic community through fellowship, outreach, and
                  supporting each other in our faith journey.
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
                    <MessageCircle className="mr-2 h-5 w-5" />
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
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Join Study
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision (FISION) */}

      {/* Upcoming Events Preview */}
      {/* <section className="py-16 bg-muted">
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
      </section> */}

      {/* Core Values */}
      {/* <section className="py-16 bg-background">
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
              <Card key={index} className="card-gradient text-center">
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
      </section> */}

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

                {/* Counter */}
                {/* <div className="text-sm text-muted-foreground">
                  <span className="text-primary font-semibold">1</span>
                  <span className="mx-2">/</span>
                  <span>{testimonials.length}</span>
                </div> */}

                {/* Next */}
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

      {/* Scripture of the Week */}
      {/* <section className="py-16 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Lightbulb className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-2xl font-heading font-bold mb-6">
              Scripture of the Month
            </h2>
            <blockquote className="text-xl md:text-2xl leading-relaxed mb-4">
              "Trust in the Lord with all your heart and lean not on your own
              understanding; in all your ways submit to him, and he will make
              your paths straight."
            </blockquote>
            <p className="text-lg font-medium">- Proverbs 3:5-6</p>
          </div>
        </div>
      </section> */}

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
                  <MessageCircle className="mr-2 h-5 w-5" />
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
