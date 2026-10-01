import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MessageCircle,
  Mail,
  Facebook,
  Instagram,
  Send,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import groupImg1 from "@/assets/group1.jpeg";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { contactMessagesService } from "@/services/contactMessages";
import { ApiClientError } from "@/lib/apiClient";

const Contact = () => {
  const { settings } = useSiteSettings();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await contactMessagesService.create({
        name: `${firstName} ${lastName}`.trim(),
        email,
        subject: "",
        message,
      });
      setIsSubmitted(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${groupImg1})` }}
      >
        {/* Simple dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight">
              Let’s Talk.
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Have a question, prayer request, or simply want to connect? We’d
              love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Contact Form */}
            <div>
              <div className="max-w-2xl mb-12">
                <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">
                  Send a Message
                </p>

                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  We’re here to listen.
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you want to learn more about Christ Life, share a
                  prayer request, or simply say hello, send us a message.
                </p>
              </div>

              {isSubmitted ? (
                <div className="flex items-start gap-4 rounded-lg border border-primary/20 bg-primary/5 p-6 my-8">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-heading text-lg font-semibold text-foreground">Message sent</p>
                    <p className="mt-1 text-muted-foreground">
                      Thanks for reaching out — we'll be in touch soon.
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
                      Send another message
                    </Button>
                  </div>
                </div>
              ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-medium text-foreground"
                    >
                      First Name
                    </Label>

                    <Input
                      id="firstName"
                      placeholder="Your first name"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={isSubmitting}
                      className="h-11 rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/60"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-medium text-foreground"
                    >
                      Last Name
                    </Label>

                    <Input
                      id="lastName"
                      placeholder="Your last name"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={isSubmitting}
                      className="h-11 rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/60"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email Address
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="h-11 rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/60"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Your Message
                  </Label>

                  <Textarea
                    id="message"
                    placeholder="Write your message here..."
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                    className="min-h-36 resize-none rounded-none border-0 border-b border-border bg-transparent px-0 py-3 shadow-none focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/60"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm text-destructive">
                    {error}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 my-20"
                >
                  {isSubmitting ? "Sending…" : "Send Message"}
                </Button>
              </form>
              )}
            </div>

            {/* Connect With Us */}
            <div className="mt-24 pt-6">
              <div className="max-w-3xl">
                <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">
                  Connect With Us
                </p>

                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  Let’s stay connected.
                </h3>

                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  Follow Christ Life, join our community, and stay updated on
                  what we're doing. Whether you're joining us online or simply
                  want to keep in touch, we'd love to hear from you.
                </p>
              </div>

              {/* Contact Links */}
              <div className="mt-10 grid sm:grid-cols-3 gap-8">
                <a
                  href={settings.whatsappChannelUrl}
                  className="group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="text-sm text-muted-foreground mb-2">WhatsApp</p>
                  <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    Join our community
                  </p>
                </a>

                <a href={`mailto:${settings.email}`} className="group">
                  <p className="text-sm text-muted-foreground mb-2">Email</p>
                  <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    {settings.email}
                  </p>
                </a>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Social</p>

                  <div className="flex gap-5">
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
