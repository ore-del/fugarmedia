import { Metadata } from "next";
import Link from "next/link";
import { Play, ArrowRight, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Portfolio | Fugar Media",
  description:
    "Browse Fugar Media's portfolio — music videos, reels, live DJ sessions, and editorial shoots produced in Toronto and Nigeria.",
};

const categories = ["All", "Music Videos", "Reels & Content", "DJ Sessions", "Editorials"];

const placeholderItems = [
  { category: "Music Videos", aspect: "aspect-video", size: "col-span-2", label: "Music Video" },
  { category: "Editorials", aspect: "aspect-square", size: "col-span-1", label: "Editorial" },
  { category: "Reels & Content", aspect: "aspect-square", size: "col-span-1", label: "Reels" },
  { category: "DJ Sessions", aspect: "aspect-video", size: "col-span-1", label: "DJ Session" },
  { category: "Music Videos", aspect: "aspect-video", size: "col-span-1", label: "Music Video" },
  { category: "Editorials", aspect: "aspect-square", size: "col-span-1", label: "Editorial" },
  { category: "Reels & Content", aspect: "aspect-video", size: "col-span-2", label: "Reels" },
  { category: "DJ Sessions", aspect: "aspect-square", size: "col-span-1", label: "DJ Session" },
  { category: "Music Videos", aspect: "aspect-square", size: "col-span-1", label: "Music Video" },
];

export default function PortfolioPage() {
  return (
    <>
      <Navigation />
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[#FF6200] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Our Work
          </p>
          <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(4rem,10vw,9rem)] leading-[0.9] tracking-wide text-white mb-6">
            Portfolio
          </h1>
          <p className="text-white/50 max-w-xl text-base leading-relaxed">
            Music videos, reels, live sessions, and editorial content — produced with intention, delivered with precision.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-[#080808] border-b border-[#2a2a2a] sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-none">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`shrink-0 text-xs font-semibold tracking-[0.15em] uppercase px-4 py-2 transition-all duration-200 ${
                  i === 0
                    ? "bg-[#FF6200] text-white"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Coming soon notice */}
          <div className="mb-10 px-5 py-4 border border-[#FF6200]/20 bg-[#FF6200]/5 flex items-start gap-4">
            <div className="w-1 h-full bg-[#FF6200] shrink-0 self-stretch" />
            <div>
              <p className="text-[#FF6200] text-xs font-bold tracking-widest uppercase mb-1">Portfolio Loading</p>
              <p className="text-white/50 text-sm">
                Full portfolio videos and images are being uploaded. In the meantime, reach out directly via{" "}
                <a
                  href="https://www.instagram.com/fu.gar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#FF6200] transition-colors duration-200 underline underline-offset-2"
                >
                  @fu.gar on Instagram
                </a>{" "}
                to view our latest work.
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {placeholderItems.map((item, i) => (
              <div
                key={i}
                className={`relative group overflow-hidden bg-[#111111] border border-[#2a2a2a] hover:border-[#FF6200]/30 transition-all duration-300 cursor-pointer ${
                  item.aspect === "aspect-video" ? "aspect-video" : "aspect-square"
                }`}
              >
                {/* Skeleton shimmer */}
                <div className="absolute inset-0 skeleton" />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 border border-white/40 flex items-center justify-center group-hover:border-[#FF6200] group-hover:text-[#FF6200] transition-colors duration-300">
                    <Play size={18} fill="currentColor" />
                  </div>
                  <span className="text-white text-xs font-semibold tracking-[0.2em] uppercase">
                    {item.label}
                  </span>
                </div>

                {/* Category tag */}
                <div className="absolute bottom-3 left-3 text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 bg-black/40 px-2 py-1">
                  {item.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-20 bg-[#111111] border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="w-12 h-0.5 bg-[#FF6200] mb-5" />
              <h2 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl tracking-wide text-white mb-3">
                See More on Instagram
              </h2>
              <p className="text-white/50 text-sm max-w-md">
                Follow <span className="text-white">@fu.gar</span> and <span className="text-white">@danesii</span> for the latest behind-the-scenes, reels, and productions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a
                href="https://www.instagram.com/fu.gar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FF6200] hover:bg-[#FF8340] text-white text-sm font-bold tracking-wider uppercase px-7 py-4 transition-colors duration-200 group"
              >
                <ExternalLink size={16} />
                @fu.gar
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://www.instagram.com/danesii"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#2a2a2a] hover:border-white/30 text-white/60 hover:text-white text-sm font-bold tracking-wider uppercase px-7 py-4 transition-all duration-200"
              >
                @danesii
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#080808] text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide text-white mb-4">
            Ready to Create?
          </h2>
          <p className="text-white/50 text-sm mb-8 leading-relaxed">
            Let&apos;s build something remarkable together. Book your strategy call to discuss your project.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-[#FF6200] hover:bg-[#FF8340] text-white text-sm font-bold tracking-wider uppercase px-8 py-4 transition-colors duration-200 group"
          >
            Book a Consultation
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
