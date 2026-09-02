import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  Users,
  MessageCircle,
  Calendar,
  Heart,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import groupImg1 from "@/assets/group1.jpeg";

const BibleStudy = () => {
  const studyFeatures = [
    {
      icon: BookOpen,
      title: "Study Scripture",
      description:
        "We explore God's Word together and seek to understand how Scripture applies to our lives.",
    },
    {
      icon: Users,
      title: "Discuss Together",
      description:
        "Everyone is encouraged to share questions, thoughts, and insights during our sessions.",
    },
    {
      icon: Heart,
      title: "Pray Together",
      description:
        "We make time to pray for one another and grow together in our relationship with Christ.",
    },
    {
      icon: Lightbulb,
      title: "Live It Out",
      description:
        "Our goal is not only to learn God's Word, but to put what we learn into practice.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative min-h-[65vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${groupImg1})` }}
      >
        {/* Simple solid overlay - no gradient */}
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Grow in God's Word
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
              Join us twice a week for Bible study, discussion, prayer, and
              fellowship as we grow together in Christ.
            </p>

            {/* <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Join Study Group
            </Button> */}
          </div>
        </div>
      </section>

      {/* Weekly Study Schedule */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-primary font-semibold tracking-[0.15em] uppercase text-sm mb-3">
              Weekly Schedule
            </p>

            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-5">
              Join Us Twice a Week
            </h2>

            <p className="text-lg text-muted-foreground">
              Set aside an hour to study God's Word, ask questions, pray, and
              connect with the Christ Life community.
            </p>
          </div>

          <div className="max-w-4xl mx-auto border-y border-border">
            {/* Monday */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 border-b border-border">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Monday Female Bible Study
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      10:00 - 11:00 PM
                    </span>

                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      Google Meet / WhatsApp
                    </span>
                  </div>
                </div>
              </div>

              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto"
              >
                <a
                  href="https://meet.google.com/see-egjy-ruo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Monday Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Tuesday Schedule */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 border-b border-border">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Tuesday Bible Study
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      10:00 - 11:00 PM
                    </span>

                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      Google Meet / WhatsApp
                    </span>
                  </div>
                </div>
              </div>

              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto"
              >
                <a
                  href="https://meet.google.com/see-egjy-ruo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Tuesday Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Thursday */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-8">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Thursday Prayer
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      10:00 - 11:00 PM
                    </span>

                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      Google Meet / WhatsApp
                    </span>
                  </div>
                </div>
              </div>

              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto"
              >
                <a
                  href="https://meet.google.com/see-egjy-ruo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Thursday Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-primary font-semibold tracking-[0.15em] uppercase text-sm mb-3">
                Getting Started
              </p>

              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-5">
                How to Join
              </h2>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Joining our Bible studies is simple. Connect with us through
                WhatsApp and we'll help you get started.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-5 text-lg font-bold">
                  1
                </div>

                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Join WhatsApp
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Join our WhatsApp group to receive study updates, materials,
                  and meeting links.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-5 text-lg font-bold">
                  2
                </div>

                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Check the Schedule
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Bible studies take place every Monday, Tuesday and Thursday
                  from 10:00 to 11:00 PM.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-5 text-lg font-bold">
                  3
                </div>

                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Join the Study
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Open the Google Meet link shared in the group and join us for
                  the session.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a
                  href="https://chat.whatsapp.com/IrsmtYoFqur9dkK1dSLVhu?s=cl&p=i&mlu=4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Join WhatsApp Group
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-background text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-primary">
              Come Study With Us
            </h2>

            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
              You don't have to walk your faith journey alone. Join us as we
              discover, follow, and share Christ together.
            </p>

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
                <MessageCircle className="mr-2 h-5 w-5" />
                Join WhatsApp Group
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BibleStudy;
