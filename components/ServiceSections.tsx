"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X, ChevronDown } from "lucide-react";

type Project = {
  title: string;
  client: string;
  year: string;
  videoUrl?: string;
};

type PricingPackage = {
  name: string;
  price: string;
  includes: string[];
  note?: string;
};

type ServiceDef = {
  id: string;
  heading: string[];
  price: string;
  description: string;
  packages: PricingPackage[];
  projects: Project[];
};

const SERVICES: ServiceDef[] = [
  {
    id: "music-videos",
    heading: ["MUSIC VIDEOS"],
    price: "Starting at $2,000",
    description: "Full-scale music video production from concept to final delivery.",
    packages: [
      {
        name: "Essential",
        price: "$2,000",
        includes: [
          "Pre-production planning",
          "Full day shoot (up to 10 hrs)",
          "Professional editing & color grade",
          "1 final deliverable",
          "2 revision rounds",
        ],
      },
      {
        name: "Premium",
        price: "$3,500+",
        includes: [
          "Everything in Essential",
          "Multiple locations",
          "Behind the scenes package",
          "Teaser / trailer cut",
          "Unlimited revisions",
        ],
        note: "Most Popular",
      },
    ],
    projects: [
      { title: "Add your project title", client: "Artist / Label", year: "2024" },
      { title: "Add your project title", client: "Artist / Label", year: "2024" },
      { title: "Add your project title", client: "Artist / Label", year: "2023" },
    ],
  },
  {
    id: "reels-content",
    heading: ["REELS &", "CONTENT"],
    price: "$800",
    description: "High-impact short-form content optimized for social platforms.",
    packages: [
      {
        name: "Content Pack",
        price: "$800",
        includes: [
          "Content strategy session",
          "4-hour shoot",
          "5 edited reels / TikToks",
          "Platform-optimized delivery",
          "Licensed music",
        ],
      },
    ],
    projects: [
      { title: "Add your project title", client: "Creator / Brand", year: "2024" },
      { title: "Add your project title", client: "Creator / Brand", year: "2024" },
    ],
  },
  {
    id: "live-dj-sessions",
    heading: ["LIVE DJ", "SESSIONS"],
    price: "$600",
    description: "Professional multi-camera capture of live DJ performances.",
    packages: [
      {
        name: "Session",
        price: "$600",
        includes: [
          "Multi-camera setup",
          "Live audio recording",
          "Professional mix & edit",
          "Full session video",
          "Highlight reel",
        ],
      },
    ],
    projects: [
      { title: "Add your project title", client: "DJ Name", year: "2024" },
      { title: "Add your project title", client: "DJ Name", year: "2024" },
    ],
  },
  {
    id: "editorials-photoshoots",
    heading: ["EDITORIALS &", "PHOTOSHOOTS"],
    price: "$600",
    description: "Editorial and artistic photography for artists and brands.",
    packages: [
      {
        name: "Shoot",
        price: "$600",
        includes: [
          "Concept & mood board planning",
          "Half-day shoot (up to 5 hrs)",
          "20+ fully edited photos",
          "Multiple looks / outfits",
          "Commercial usage rights",
        ],
      },
    ],
    projects: [
      { title: "Add your project title", client: "Brand / Artist", year: "2024" },
      { title: "Add your project title", client: "Brand / Artist", year: "2024" },
    ],
  },
];

function getYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([^&\s?#]+)/
  );
  return m ? m[1] : null;
}

function getThumb(videoUrl?: string): string | null {
  if (!videoUrl) return null;
  const id = getYouTubeId(videoUrl);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}

export default function ServiceSections() {
  const [projIdx, setProjIdx] = useState<Record<string, number>>(
    Object.fromEntries(SERVICES.map((s) => [s.id, 0]))
  );
  const [fading, setFading] = useState<Record<string, boolean>>(
    Object.fromEntries(SERVICES.map((s) => [s.id, false]))
  );
  const [videoModal, setVideoModal] = useState<string | null>(null);
  const [pricingModal, setPricingModal] = useState<ServiceDef | null>(null);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SERVICES.forEach((svc) => {
      const el = document.getElementById(`svc-${svc.id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting)
            setVisible((prev) => new Set([...prev, svc.id]));
        },
        { threshold: 0.45, root: scrollRef.current }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVideoModal(null);
        setPricingModal(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navigate = useCallback(
    (svcId: string, dir: "prev" | "next") => {
      if (fading[svcId]) return;
      const svc = SERVICES.find((s) => s.id === svcId)!;
      setFading((f) => ({ ...f, [svcId]: true }));
      setTimeout(() => {
        setProjIdx((p) => {
          const next =
            dir === "next"
              ? (p[svcId] + 1) % svc.projects.length
              : (p[svcId] - 1 + svc.projects.length) % svc.projects.length;
          return { ...p, [svcId]: next };
        });
        setFading((f) => ({ ...f, [svcId]: false }));
      }, 200);
    },
    [fading]
  );

  return (
    <>
      {/* ── Fixed navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-5 pointer-events-none">
        <div className="pointer-events-auto relative h-9 w-32">
          <Image
            src="/logo2.png"
            alt="Fugar Media"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="pointer-events-auto text-[#FF6200] text-[9px] sm:text-[10px] font-bold tracking-[0.28em] uppercase hover:opacity-60 transition-opacity duration-150"
        >
          Book a Consultation
        </a>
      </nav>

      {/* ── Scroll-snap container ── */}
      <div
        ref={scrollRef}
        className="snap-y snap-mandatory overflow-y-scroll"
        style={{ height: "100dvh" }}
      >
        {SERVICES.map((svc, svcIdx) => {
          const pi = projIdx[svc.id];
          const proj = svc.projects[pi];
          const thumb = getThumb(proj.videoUrl);
          const hasMedia = !!(proj.videoUrl || thumb);
          const isVis = visible.has(svc.id);
          const isFading = fading[svc.id];
          const isLast = svcIdx === SERVICES.length - 1;

          return (
            <section
              id={`svc-${svc.id}`}
              key={svc.id}
              className="relative snap-start snap-always bg-black flex flex-col items-center justify-center overflow-hidden"
              style={{ height: "100dvh" }}
            >
              {/* Left arrow */}
              {svc.projects.length > 1 && (
                <button
                  onClick={() => navigate(svc.id, "prev")}
                  aria-label="Previous project"
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 p-3 text-white/25 hover:text-white transition-colors duration-200"
                >
                  <ChevronLeft size={28} strokeWidth={1} />
                </button>
              )}

              {/* Right arrow */}
              {svc.projects.length > 1 && (
                <button
                  onClick={() => navigate(svc.id, "next")}
                  aria-label="Next project"
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 p-3 text-white/25 hover:text-white transition-colors duration-200"
                >
                  <ChevronRight size={28} strokeWidth={1} />
                </button>
              )}

              {/* Center content */}
              <div
                className="flex flex-col items-center text-center px-16 sm:px-24 w-full"
                style={{
                  transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)",
                  opacity: isVis ? 1 : 0,
                  transform: isVis ? "translateY(0)" : "translateY(28px)",
                }}
              >
                {/* Service title */}
                <div className="mb-2">
                  {svc.heading.map((line, i) => (
                    <h2
                      key={i}
                      className="font-[family-name:var(--font-bebas)] leading-[0.88] tracking-[0.02em] text-white"
                      style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}
                    >
                      {line}
                    </h2>
                  ))}
                </div>

                {/* Price */}
                <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-light">
                  {svc.price}
                </p>

                {/* Portfolio card — only shown when real media exists */}
                {hasMedia && (
                  <div
                    className="relative mt-8 w-full max-w-xs aspect-video overflow-hidden cursor-pointer group"
                    style={{
                      opacity: isFading ? 0 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                    onClick={() => proj.videoUrl && setVideoModal(proj.videoUrl)}
                  >
                    {thumb && (
                      <Image
                        src={thumb}
                        alt={proj.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    {proj.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-10 h-10 border border-white/50 flex items-center justify-center">
                          <Play size={14} fill="currentColor" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-white/80 text-[10px] font-medium tracking-wide truncate">
                        {proj.title}
                      </p>
                    </div>
                  </div>
                )}

                {/* Dot nav */}
                {svc.projects.length > 1 && (
                  <div className="flex items-center justify-center gap-[6px] mt-5">
                    {svc.projects.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setProjIdx((p) => ({ ...p, [svc.id]: i }))}
                        aria-label={`Project ${i + 1}`}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === pi ? "14px" : "3px",
                          height: "2px",
                          background: i === pi ? "#ffffff" : "rgba(255,255,255,0.2)",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* SEE PRICING */}
                <button
                  onClick={() => setPricingModal(svc)}
                  className="mt-10 text-[#FF6200] text-[9px] font-bold tracking-[0.3em] uppercase hover:opacity-60 transition-opacity duration-150"
                >
                  See Pricing
                </button>
              </div>

              {/* Scroll indicator */}
              {!isLast && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/15 select-none">
                  <span className="text-[8px] tracking-[0.25em] uppercase">Scroll</span>
                  <ChevronDown size={10} className="animate-bounce" />
                </div>
              )}

              {/* Section index */}
              <div className="absolute bottom-5 right-6 text-white/10 font-[family-name:var(--font-bebas)] text-sm tracking-widest select-none">
                {String(svcIdx + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
              </div>
            </section>
          );
        })}
      </div>

      {/* ── Video modal ── */}
      {videoModal && (
        <div
          className="fixed inset-0 z-[200] bg-black/96 flex items-center justify-center p-4 sm:p-10"
          onClick={() => setVideoModal(null)}
        >
          <button
            className="absolute top-5 right-6 text-white/40 hover:text-white transition-colors z-10 p-2"
            onClick={() => setVideoModal(null)}
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {getYouTubeId(videoModal) ? (
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(videoModal)}?autoplay=1&rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                title="Project video"
              />
            ) : (
              <video
                src={videoModal}
                controls
                autoPlay
                className="absolute inset-0 w-full h-full bg-black"
              />
            )}
          </div>
        </div>
      )}

      {/* ── Pricing modal ── */}
      {pricingModal && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setPricingModal(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#2a2a2a] p-8 sm:p-10 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors p-2"
              onClick={() => setPricingModal(null)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <p className="text-[#FF6200] text-[9px] font-bold tracking-[0.3em] uppercase mb-3">
              Pricing
            </p>
            <h2
              className="font-[family-name:var(--font-bebas)] text-white leading-[0.88] mb-3"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              {pricingModal.heading.join(" ")}
            </h2>
            <p className="text-white/40 text-sm mb-8 max-w-md">
              {pricingModal.description}
            </p>

            {/* Packages */}
            <div
              className={`grid gap-4 ${
                pricingModal.packages.length > 1 ? "sm:grid-cols-2" : ""
              }`}
            >
              {pricingModal.packages.map((pkg) => (
                <div key={pkg.name} className="relative border border-[#2a2a2a] p-6">
                  {pkg.note && (
                    <span className="absolute top-4 right-4 text-[8px] font-bold tracking-[0.2em] uppercase text-[#FF6200] border border-[#FF6200]/30 px-2 py-0.5">
                      {pkg.note}
                    </span>
                  )}
                  <p className="text-white/35 text-[9px] font-bold tracking-[0.25em] uppercase mb-2">
                    {pkg.name}
                  </p>
                  <p
                    className="font-[family-name:var(--font-bebas)] text-white tracking-wide mb-5"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
                  >
                    {pkg.price}
                  </p>
                  <ul className="space-y-2.5">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-white/55 text-xs">
                        <span className="mt-0.5 text-[#FF6200] shrink-0">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-[#2a2a2a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-white/25 text-xs">
                Prices vary based on scope — let&apos;s talk.
              </p>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[#FF6200] text-[9px] font-bold tracking-[0.3em] uppercase hover:opacity-60 transition-opacity duration-150 whitespace-nowrap"
              >
                Book a Consultation →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
