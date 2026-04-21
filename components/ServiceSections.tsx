"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, X, ChevronDown, ArrowRight } from "lucide-react";

type Project = {
  title: string;
  client: string;
  year: string;
  videoUrl?: string;
};

type ServiceDef = {
  id: string;
  heading: string[];
  price: string;
  projects: Project[];
};

const SERVICES: ServiceDef[] = [
  {
    id: "music-videos",
    heading: ["MUSIC VIDEOS"],
    price: "Starting at $2,000",
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
    projects: [
      { title: "Add your project title", client: "Creator / Brand", year: "2024" },
      { title: "Add your project title", client: "Creator / Brand", year: "2024" },
    ],
  },
  {
    id: "live-dj-sessions",
    heading: ["LIVE DJ", "SESSIONS"],
    price: "$600",
    projects: [
      { title: "Add your project title", client: "DJ Name", year: "2024" },
      { title: "Add your project title", client: "DJ Name", year: "2024" },
    ],
  },
  {
    id: "editorials-photoshoots",
    heading: ["EDITORIALS &", "PHOTOSHOOTS"],
    price: "$600",
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
  const [modal, setModal] = useState<string | null>(null);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  // Intersection observer — triggers entrance animation per section
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

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
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
        <Link
          href="/booking"
          className="pointer-events-auto text-[#FF6200] text-[9px] sm:text-[10px] font-bold tracking-[0.28em] uppercase hover:opacity-60 transition-opacity duration-150"
        >
          Book a Consultation
        </Link>
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
              {/* Entrance animation wrapper */}
              <div
                className="w-full flex flex-col items-center justify-center px-4 sm:px-8"
                style={{
                  transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)",
                  opacity: isVis ? 1 : 0,
                  transform: isVis ? "translateY(0)" : "translateY(28px)",
                }}
              >
                {/* ── Video card + chevrons ── */}
                <div className="relative w-full" style={{ maxWidth: "min(720px, 90vw)" }}>
                  {/* Left chevron */}
                  {svc.projects.length > 1 && (
                    <button
                      onClick={() => navigate(svc.id, "prev")}
                      aria-label="Previous project"
                      className="absolute -left-10 sm:-left-14 top-1/2 -translate-y-1/2 z-10 p-3 text-white/40 hover:text-white transition-colors duration-150"
                    >
                      <ChevronLeft size={26} strokeWidth={1.2} />
                    </button>
                  )}

                  {/* Right chevron */}
                  {svc.projects.length > 1 && (
                    <button
                      onClick={() => navigate(svc.id, "next")}
                      aria-label="Next project"
                      className="absolute -right-10 sm:-right-14 top-1/2 -translate-y-1/2 z-10 p-3 text-white/40 hover:text-white transition-colors duration-150"
                    >
                      <ChevronRight size={26} strokeWidth={1.2} />
                    </button>
                  )}

                  {/* 16:9 Preview */}
                  <div
                    className="relative aspect-video bg-[#111] overflow-hidden group cursor-pointer"
                    style={{
                      transition: "opacity 0.2s ease",
                      opacity: isFading ? 0 : 1,
                    }}
                    onClick={() => proj.videoUrl && setModal(proj.videoUrl)}
                  >
                    {/* Thumbnail */}
                    {thumb ? (
                      <Image
                        src={thumb}
                        alt={proj.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 skeleton" />
                    )}

                    {/* Orange line top */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-[#FF6200]/40" />

                    {/* Play button (only when video available) */}
                    {proj.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-16 h-16 border border-white/50 flex items-center justify-center group-hover:border-[#FF6200] group-hover:text-[#FF6200] transition-all duration-200 backdrop-blur-sm">
                          <Play size={22} fill="currentColor" />
                        </div>
                      </div>
                    )}

                    {/* "Coming soon" placeholder label */}
                    {!proj.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/15 text-[10px] font-bold tracking-[0.3em] uppercase">
                          Portfolio coming soon
                        </span>
                      </div>
                    )}

                    {/* Project info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                      <p
                        className="text-white/80 text-xs font-medium tracking-wide truncate"
                        style={{
                          transition: "opacity 0.2s ease",
                          opacity: isFading ? 0 : 1,
                        }}
                      >
                        {proj.title}
                        {proj.client !== "—" && (
                          <span className="text-white/35 ml-2">— {proj.client}</span>
                        )}
                      </p>
                      <p className="text-white/25 text-[10px] tracking-widest mt-0.5">
                        {proj.year}
                      </p>
                    </div>
                  </div>

                  {/* Dot nav */}
                  {svc.projects.length > 1 && (
                    <div className="flex items-center justify-center gap-[6px] mt-3">
                      {svc.projects.map((_, i) => (
                        <button
                          key={i}
                          onClick={() =>
                            setProjIdx((p) => ({ ...p, [svc.id]: i }))
                          }
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
                </div>

                {/* ── Service label row ── */}
                <div
                  className="mt-5 w-full flex items-end justify-between"
                  style={{ maxWidth: "min(720px, 90vw)" }}
                >
                  <div>
                    {svc.heading.map((line, i) => (
                      <p
                        key={i}
                        className="font-[family-name:var(--font-bebas)] leading-[0.88] tracking-[0.02em] text-white"
                        style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)" }}
                      >
                        {line}
                      </p>
                    ))}
                    <p className="mt-1.5 text-white/35 text-[10px] tracking-[0.2em] uppercase font-light">
                      {svc.price}
                    </p>
                  </div>

                  <Link
                    href="/booking"
                    className="group flex items-center gap-1.5 text-[#FF6200] text-[9px] font-bold tracking-[0.25em] uppercase hover:opacity-60 transition-opacity duration-150 pb-1"
                  >
                    See Pricing
                    <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
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

        {/* ── Footer snap section ── */}
        <footer
          className="snap-start snap-always bg-[#080808] flex flex-col items-center justify-center border-t border-[#2a2a2a]"
          style={{ height: "100dvh" }}
        >
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col items-center text-center">
            <p className="text-[#FF6200] text-[10px] font-bold tracking-[0.3em] uppercase mb-5">
              Ready to Create
            </p>
            <h2
              className="font-[family-name:var(--font-bebas)] leading-[0.88] text-white mb-8"
              style={{ fontSize: "clamp(3rem,9vw,7.5rem)" }}
            >
              Let&apos;s Make
              <br />
              <span className="text-[#FF6200]">Something.</span>
            </h2>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-[#FF6200] hover:bg-[#FF8340] text-white text-xs font-bold tracking-[0.2em] uppercase px-10 py-4 transition-colors duration-200 group mb-20"
            >
              Book a Consultation
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <div className="w-full border-t border-[#2a2a2a] pt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <span className="font-[family-name:var(--font-bebas)] text-2xl tracking-widest">
                FUGAR<span className="text-[#FF6200]">.</span>
              </span>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <a
                  href="mailto:fugarmediato@gmail.com"
                  className="text-white/30 hover:text-white text-xs transition-colors duration-150"
                >
                  fugarmediato@gmail.com
                </a>
                <a
                  href="tel:6476214625"
                  className="text-white/30 hover:text-white text-xs transition-colors duration-150"
                >
                  647-621-4625
                </a>
                <a
                  href="https://instagram.com/fu.gar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white text-xs transition-colors duration-150"
                >
                  @fu.gar
                </a>
              </div>
              <p className="text-white/15 text-xs">
                © {new Date().getFullYear()} Fugar Media
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* ── Video modal ── */}
      {modal && (
        <div
          className="fixed inset-0 z-[200] bg-black/96 flex items-center justify-center p-4 sm:p-10"
          onClick={() => setModal(null)}
        >
          <button
            className="absolute top-5 right-6 text-white/40 hover:text-white transition-colors z-10 p-2"
            onClick={() => setModal(null)}
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {getYouTubeId(modal) ? (
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(modal)}?autoplay=1&rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                title="Project video"
              />
            ) : (
              <video
                src={modal}
                controls
                autoPlay
                className="absolute inset-0 w-full h-full bg-black"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
