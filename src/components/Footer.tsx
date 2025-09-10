import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import christLifeLogo from "@/assets/christ-life-logo.png";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Bible Study", path: "/bible-study" },
    { name: "Gallery", path: "/gallery" },
    { name: "Get Involved", path: "/get-involved" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={christLifeLogo} 
                alt="Christ Life Logo" 
                className="w-12 h-12 rounded-full"
              />
              <span className="font-heading font-bold text-xl">
                Christ Life
              </span>
            </div>
            <p className="text-primary-foreground/90 leading-relaxed">
              A Christian youth group dedicated to discovering, following, and sharing Christ 
              through Bible studies, fellowship, and community events.
            </p>
            <Button 
              asChild 
              variant="secondary" 
              className="btn-accent"
            >
              <a 
                href="https://chat.whatsapp.com/join" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Join Our WhatsApp
              </a>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bible Studies Schedule */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Bible Studies</h3>
            <div className="space-y-3 text-primary-foreground/90">
              <div>
                <p className="font-medium">Tuesdays & Thursdays</p>
                <p className="text-sm">10:00 - 11:00 PM</p>
                <p className="text-sm">Via Google Meet/WhatsApp</p>
              </div>
              <p className="text-sm">
                Join our WhatsApp group to receive meeting links and study materials.
              </p>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Stay Connected</h3>
            <div className="space-y-3 text-primary-foreground/90">
              <p>Email: info@christlife.org</p>
              <p>WhatsApp: +1 (555) 123-4567</p>
            </div>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-primary-foreground/80">
          <p className="flex items-center justify-center gap-2 text-sm">
            Made with <Heart className="h-4 w-4 text-accent fill-current" /> for Christ Life Youth Group
            © 2024 - Discovering, Following, Sharing Christ
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;