import { Link } from "react-router-dom";
import { Heart, Facebook } from "lucide-react";
import Logo from "@/assets/logo.jpeg";

const Footer = () => {
  const quickLinks = [
    { name: "About", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Bible Study", path: "/bible-study" },
    { name: "Gallery", path: "/gallery" },
    { name: "Get Involved", path: "/get-involved" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-16 lg:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
              {/* Brand */}
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={Logo}
                    alt="Christ Life Logo"
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <span className="text-xl font-heading font-bold">
                    Christ Life
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
                  Discover Christ.
                  <br />
                  Follow Christ.
                  <br />
                  Share Christ.
                </h2>

                {/* <p className="mt-6 text-white/75 max-w-md leading-relaxed">
                  A community growing together in faith, fellowship, and the
                  love of Christ.
                </p> */}
              </div>

              {/* Connect */}
              <div className="md:text-right">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60 mb-4">
                  Stay Connected
                </p>

                <div className="space-y-2">
                  <a
                    href="mailto:pjsaydyu@gmail.com"
                    className="block text-lg hover:text-white/75 transition-colors"
                  >
                    pjsaydyu@gmail.com
                  </a>

                  <a
                    href="tel:+231778282210"
                    className="block text-lg hover:text-white/75 transition-colors"
                  >
                    +231 778 282 210
                  </a>
                </div>

                <a
                  href="https://www.facebook.com/share/1DDubvaPmz/?milbextid=wwXlfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center gap-2 mt-5 text-sm text-white/75 hover:text-white transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 py-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/60">
            <p>© 2026 Christ Life. All rights reserved.</p>

            <p className="flex items-center gap-1.5">
              Made with
              <Heart className="h-4 w-4 text-white fill-current" />
              by{" "}
              <a
                href="https://stephenpartehportfolio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/75 transition-colors"
              >
                Stephen Parteh
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
