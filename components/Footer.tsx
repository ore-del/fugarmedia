import Link from "next/link";
import { ExternalLink, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="font-[family-name:var(--font-bebas)] text-3xl tracking-widest">
              FUGAR<span className="text-[#FF6200]">.</span>
            </span>
            <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-xs">
              Documenting the human experience in the most beautiful way possible.
            </p>
            <p className="mt-4 text-white/30 text-xs uppercase tracking-widest">
              Toronto, Canada
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-[0.2em] mb-5">Navigate</h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/booking", label: "Book a Call" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-[0.2em] mb-5">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:fugarmediato@gmail.com"
                className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors duration-200"
              >
                <Mail size={14} className="text-[#FF6200] shrink-0" />
                fugarmediato@gmail.com
              </a>
              <a
                href="tel:6476214625"
                className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors duration-200"
              >
                <Phone size={14} className="text-[#FF6200] shrink-0" />
                647-621-4625
              </a>
              <a
                href="https://www.instagram.com/fu.gar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors duration-200"
              >
                <ExternalLink size={14} className="text-[#FF6200] shrink-0" />
                @fu.gar
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-white/25 text-xs">
            &copy; {new Date().getFullYear()} Fugar Media. All rights reserved.
          </p>
          <p className="text-white/20 text-xs uppercase tracking-widest">
            Toronto &bull; Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
