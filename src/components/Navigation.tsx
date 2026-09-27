import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/logo.jpeg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Bible Study", path: "/bible-study" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav
      aria-label="Main navigation"
      className="bg-white sticky top-0 z-50 border-b border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <img
              src={Logo}
              alt="Christ Life Logo"
              className="w-11 h-11 rounded-full object-cover"
            />

            <span className="font-heading font-bold text-xl text-primary">
              Christ Life
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            <div className="flex items-center gap-6">
              {navItems.map((item) => {
                const active = isActivePath(item.path);

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-primary"
                        : "text-foreground/75 hover:text-primary"
                    }`}
                  >
                    {item.name}

                    {/* Active indicator */}
                    <span
                      className={`absolute left-0 right-0 -bottom-1 h-[2px] bg-primary transition-all duration-300 ${
                        active ? "opacity-100 scale-100" : "opacity-0 scale-50"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <Button
              asChild
              className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 px-5"
            >
              <a
                href="https://chat.whatsapp.com/IrsmtYoFqur9dkK1dSLVhu?s=cl&p=i&mlu=4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-5">
              <div className="flex flex-col">
                {navItems.map((item) => {
                  const active = isActivePath(item.path);

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={`py-4 text-base font-medium border-b border-border/60 transition-colors ${
                        active
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-5">
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                >
                  <a
                    href="https://chat.whatsapp.com/join"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    Join WhatsApp Group
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
