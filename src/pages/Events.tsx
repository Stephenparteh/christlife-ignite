import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  MessageCircle,
  Utensils,
  Gamepad2,
  Heart,
  ChevronRight,
} from "lucide-react";
import heroImage from "@/assets/hero-main.jpg";
import groupImg1 from "@/assets/group1.jpeg";

const Events = () => {
  const upcomingEvents = [
    {
      id: 7,
      title: "Door - Door Evangelism",
      date: "TBA",
      time: "Afternoon",
      location: "In-Person",
      type: "Outreach",
      category: "outreach",
      description: "Grassroots outreach, personal connection.",
      attendees: "500 Young adult",
      image: groupImg1,
      icon: Heart,
    },
    {
      id: 8,
      title: "Reconciliation Conference",
      date: "TBA",
      time: "Afternoon",
      location: "In-Person",
      type: "Outreach",
      category: "outreach",
      description:
        "Conference that bring youth together to reconciled with Christ.",
      attendees: "500 Young adult",
      image: groupImg1,
      icon: Heart,
    },
    {
      id: 9,
      title: "Anniversary",
      date: "TBA",
      time: "Afternoon",
      location: "In-Person",
      type: "Outreach",
      category: "outreach",
      description: "Celebration of growth and impact.",
      attendees: "500 - 700",
      image: groupImg1,
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${groupImg1})` }}
      >
        {/* Simple dark overlay — no gradient */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight">
              Community Events
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              From Bible studies to social gatherings and outreach there's
              always something happening in the Christ Life community.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 overflow-hidden rounded-2xl bg-muted/30">
            {/* Event Image */}
            <div className="relative min-h-[320px] lg:min-h-[460px]">
              <img
                src={groupImg1}
                alt="Christ Life Bible Study"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute top-6 left-6">
                <span className="inline-block bg-primary text-white px-4 py-2 text-sm font-semibold">
                  Featured Event
                </span>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5">
                Weekly Bible Study and Prayer
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Join us for deep Bible study, discussion, prayer, and fellowship
                as we grow together in our understanding of God's Word.
              </p>

              {/* Event Information */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">
                    Every Tuesday & Thursday
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">10:00 – 11:00 PM</span>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Google Meet</span>
                </div>
              </div>

              <div>
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <a
                    href="https://chat.whatsapp.com/IrsmtYoFqur9dkK1dSLVhu?s=cl&p=i&mlu=4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    RSVP via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="max-w-3xl mx-auto mb-14 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-5">
              Upcoming Events
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Mark your calendar and join us as we gather, learn, serve, and
              grow together.
            </p>
          </div>

          {/* Events */}
          <div className="max-w-5xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className={`group flex flex-col md:flex-row gap-8 py-10 ${
                  index !== upcomingEvents.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                {/* Event Image */}
                <div className="w-full md:w-72 lg:w-80 flex-shrink-0">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* Date & Time */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-5 max-w-2xl">
                    {event.description}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 bg-muted/30 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-primary">
              Ready to Join Our Events?
            </h2>

            <p className="text-xl text-foreground mb-8 leading-relaxed">
              Stay connected with Christ Life and never miss an event. Join our
              WhatsApp group to receive event updates, study links, and more!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
              >
                <a
                  href="https://chat.whatsapp.com/IrsmtYoFqur9dkK1dSLVhu?s=cl&p=i&mlu=4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join WhatsApp Group
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
