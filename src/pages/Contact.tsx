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
} from "lucide-react";
import groupImg1 from "@/assets/group1.jpeg";

const Contact = () => {
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

              <form className="space-y-8">
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
                    className="min-h-36 resize-none rounded-none border-0 border-b border-border bg-transparent px-0 py-3 shadow-none focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/60"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 my-20"
                >
                  Send Message
                </Button>
              </form>
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
                  href="https://chat.whatsapp.com/IrsmtYoFqur9dkK1dSLVhu?s=cl&p=i&mlu=4"
                  className="group"
                  target="_blank"
                >
                  <p className="text-sm text-muted-foreground mb-2">WhatsApp</p>
                  <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    Join our community
                  </p>
                </a>

                <a href="mailto:info@pjsaydyu@gmail.com" className="group">
                  <p className="text-sm text-muted-foreground mb-2">Email</p>
                  <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    pjsaydyu@gmail.com
                  </p>
                </a>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Social</p>

                  <div className="flex gap-5">
                    <a
                      href="https://www.facebook.com/share/1DDubvaPmz/?milbextid=wwXlfr"
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
