import { Button } from "@/components/ui/button";
import { Clock, MessageCircle, Calendar } from "lucide-react";
import groupImg1 from "@/assets/group1.jpeg";
import { useBibleStudy } from "@/hooks/useBibleStudy";

const BibleStudy = () => {
  const { bibleStudy, isLoading } = useBibleStudy();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${groupImg1})` }}
      >
        {/* Simple solid overlay - no gradient */}
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight">
              Grow in God's Word
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join Christ Life for Bible study and Christian fellowship in
              Liberia, with Scripture, discussion, and prayer as we grow
              together in Christ.
            </p>
          </div>
        </div>
      </section>

      {/* Weekly Study Schedule */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-5">
              Join Our Bible Study Thrice a Week
            </h2>
          </div>

          <div
            className={`max-w-4xl mx-auto border-y border-border transition-opacity ${
              isLoading ? "opacity-60" : ""
            }`}
          >
            {bibleStudy.sessions.map((session, index) => {
              // Each session can override the shared time/platform/link;
              // fall back to the singleton's shared defaults when it hasn't.
              const time = session.time || bibleStudy.time;
              const platform = session.platform || bibleStudy.platform;
              const meetUrl = session.meetUrl || bibleStudy.meetUrl;

              return (
                <div
                  key={`${session.day}-${session.title}`}
                  className={`flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 ${
                    index !== bibleStudy.sessions.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                        {session.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                        {time && (
                          <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            {time}
                          </span>
                        )}

                        {platform && (
                          <span className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-primary" />
                            {platform}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto"
                  >
                    <a href={meetUrl} target="_blank" rel="noopener noreferrer">
                      Get {session.day} Link
                    </a>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-5">
                How to Join Our Bible Study
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
                <a href={bibleStudy.whatsappUrl} target="_blank" rel="noopener noreferrer">
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
              <a href={bibleStudy.whatsappUrl} target="_blank" rel="noopener noreferrer">
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
