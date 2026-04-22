"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, X, ChevronDown, ArrowRight } from "lucide-react";

type Project = {
  title: string;
  description: string;
  client: string;
  year: string;
  videoUrl?: string;
  image?: string;
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
  sectionVideo?: string;
};

const SERVICES: ServiceDef[] = [
  {
    id: "music-videos",
    heading: ["MUSIC VIDEOS"],
    price: "Starting at $2,000",
    description: "Full-scale music video production from concept to final delivery.",
    sectionVideo: "https://youtu.be/KWoTyfPsqbE",
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
      { title: "Music Video 1", description: "High-energy visual featuring artist performance across multiple locations.", client: "Artist / Label", year: "2024", videoUrl: "https://youtu.be/WqTO4uk1siU" },
      { title: "Music Video 2", description: "Cinematic narrative piece with choreographed sequences and dynamic lighting.", client: "Artist / Label", year: "2024", videoUrl: "https://youtu.be/N5dOy9FGtDg" },
      { title: "Music Video 3", description: "Concept-driven production blending performance with abstract visual elements.", client: "Artist / Label", year: "2023", videoUrl: "https://youtu.be/FCUk7rIBBAE" },
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
      { title: "Reel 1", description: "Fast-paced social content optimized for Instagram Reels and TikTok.", client: "Creator / Brand", year: "2024", videoUrl: "https://www.youtube.com/shorts/UbJLWJTDEis" },
      { title: "Reel 2", description: "Behind-the-scenes brand content capturing authentic moments and highlights.", client: "Creator / Brand", year: "2024" },
      { title: "Reel 3", description: "Lifestyle reel series featuring the artist in dynamic urban environments.", client: "Creator / Brand", year: "2024" },
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
      { title: "DJ Set 1", description: "Multi-camera live session at an intimate venue with professional audio mix.", client: "DJ Name", year: "2024", videoUrl: "https://youtu.be/mzu5kHKFkqs" },
      { title: "DJ Set 2", description: "High-energy rooftop performance captured with cinematic drone and ground angles.", client: "DJ Name", year: "2024" },
      { title: "DJ Set 3", description: "Studio livestream session featuring guest appearances and exclusive transitions.", client: "DJ Name", year: "2024" },
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
      { title: "Editorial 1", description: "Fashion editorial exploring texture and contrast through bold wardrobe choices.", client: "Brand / Artist", year: "2024", image: "/editorials/editorial-1.jpg" },
      { title: "Editorial 2", description: "Artist portrait series with environmental storytelling and natural lighting.", client: "Brand / Artist", year: "2024", image: "/editorials/editorial-2.jpg" },
      { title: "Editorial 3", description: "Brand campaign shoot delivering commercial-grade imagery for digital and print.", client: "Brand / Artist", year: "2024", image: "/editorials/editorial-3.jpg" },
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

// Nav logo dimensions (kept for reference)
const NAV_LOGO_W = 128; // px (w-32)
const NAV_LOGO_H = 36;  // px (h-9)

export default function ServiceSections() {
  // ── Splash animation state ──────────────────────────────────────────────
  const [splashPhase, setSplashPhase] = useState<"visible" | "animating" | "hidden">("visible");

  useEffect(() => {
    const t1 = setTimeout(() => setSplashPhase("animating"), 2000);
    const t2 = setTimeout(() => setSplashPhase("hidden"), 3300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ── Carousel state ──────────────────────────────────────────────────────
  const [slideMap, setSlideMap] = useState<Record<string, number>>(
    Object.fromEntries(SERVICES.map((s) => [s.id, 0]))
  );
  const [titleVisible, setTitleVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(SERVICES.map((s) => [s.id, true]))
  );
  const [videoModal, setVideoModal] = useState<string | null>(null);
  const [pricingModal, setPricingModal] = useState<ServiceDef | null>(null);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const [sectionFlash, setSectionFlash] = useState(false);
  const [thanksVisible, setThanksVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const slideMapRef = useRef<Record<string, number>>(
    Object.fromEntries(SERVICES.map((s) => [s.id, 0]))
  );
  const autoAdvanceTimerRef = useRef<Record<string, ReturnType<typeof setTimeout> | null>>(
    Object.fromEntries(SERVICES.map((s) => [s.id, null]))
  );
  const titleHideTimerRef = useRef<Record<string, ReturnType<typeof setTimeout> | null>>(
    Object.fromEntries(SERVICES.map((s) => [s.id, null]))
  );
  const hasAutoAdvancedRef = useRef<Record<string, boolean>>(
    Object.fromEntries(SERVICES.map((s) => [s.id, false]))
  );
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const thanksTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollingRef = useRef(false);

  const startTitleHideTimer = useCallback((svcId: string) => {
    if (titleHideTimerRef.current[svcId]) clearTimeout(titleHideTimerRef.current[svcId]!);
    setTitleVisible((prev) => ({ ...prev, [svcId]: true }));
    titleHideTimerRef.current[svcId] = setTimeout(() => {
      setTitleVisible((prev) => ({ ...prev, [svcId]: false }));
    }, 5000);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SERVICES.forEach((svc) => {
      const el = document.getElementById(`svc-${svc.id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => new Set([...prev, svc.id]));
            if (!hasAutoAdvancedRef.current[svc.id]) {
              hasAutoAdvancedRef.current[svc.id] = true;
              autoAdvanceTimerRef.current[svc.id] = setTimeout(() => {
                slideMapRef.current = { ...slideMapRef.current, [svc.id]: 1 };
                setSlideMap((prev) => ({ ...prev, [svc.id]: 1 }));
                startTitleHideTimer(svc.id);
              }, 3000);
            }
          }
        },
        { threshold: 0.45, root: scrollRef.current }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [startTitleHideTimer]);

  useEffect(() => {
    const autoRefs = autoAdvanceTimerRef.current;
    const titleRefs = titleHideTimerRef.current;
    return () => {
      Object.values(autoRefs).forEach((t) => { if (t) clearTimeout(t); });
      Object.values(titleRefs).forEach((t) => { if (t) clearTimeout(t); });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setVideoModal(null); setPricingModal(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      if (!scrollingRef.current) {
        scrollingRef.current = true;
        setSectionFlash(true);
      }
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      flashTimerRef.current = setTimeout(() => {
        scrollingRef.current = false;
        setSectionFlash(false);
      }, 400);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let touchStartY = 0;
    const trigger = () => {
      setThanksVisible(true);
      if (thanksTimerRef.current) clearTimeout(thanksTimerRef.current);
      thanksTimerRef.current = setTimeout(() => setThanksVisible(false), 3000);
    };
    const onWheel = (e: WheelEvent) => {
      const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      if (atBottom && e.deltaY > 0) trigger();
    };
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      if (atBottom && deltaY > 20) trigger();
    };
    container.addEventListener("wheel", onWheel, { passive: true });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      if (thanksTimerRef.current) clearTimeout(thanksTimerRef.current);
    };
  }, []);

  const navigate = useCallback((svcId: string, dir: "prev" | "next") => {
    const totalSlides = SERVICES.find((s) => s.id === svcId)!.projects.length + 1;
    const current = slideMapRef.current[svcId];
    const next = dir === "next"
      ? (current + 1) % totalSlides
      : (current - 1 + totalSlides) % totalSlides;
    slideMapRef.current = { ...slideMapRef.current, [svcId]: next };
    setSlideMap((prev) => ({ ...prev, [svcId]: next }));
    if (next === 0) {
      if (titleHideTimerRef.current[svcId]) clearTimeout(titleHideTimerRef.current[svcId]!);
      setTitleVisible((prev) => ({ ...prev, [svcId]: true }));
    } else {
      startTitleHideTimer(svcId);
    }
  }, [startTitleHideTimer]);

  const goToSlide = useCallback((svcId: string, idx: number) => {
    slideMapRef.current = { ...slideMapRef.current, [svcId]: idx };
    setSlideMap((prev) => ({ ...prev, [svcId]: idx }));
    if (idx === 0) {
      if (titleHideTimerRef.current[svcId]) clearTimeout(titleHideTimerRef.current[svcId]!);
      setTitleVisible((prev) => ({ ...prev, [svcId]: true }));
    } else {
      startTitleHideTimer(svcId);
    }
  }, [startTitleHideTimer]);

  return (
    <>
      {/* ── Splash screen — high-res logo fades out ──────────────────────── */}
      {splashPhase !== "hidden" && (
        <div
          className="fixed inset-0 z-[500] bg-black flex items-center justify-center pointer-events-none"
          style={{
            opacity: splashPhase === "animating" ? 0 : 1,
            transition: splashPhase === "animating" ? "opacity 1.2s ease" : "none",
          }}
        >
          <div
            className="relative"
            style={{ width: "min(90vw, 80vh)", height: "min(90vw, 80vh)" }}
          >
            <Image
              src="/logo-hires.png"
              alt="FUGAR"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      {/* ── Fixed navigation ─────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-5 pointer-events-none"
        style={{
          opacity: splashPhase === "hidden" ? 1 : 0,
          transition: splashPhase === "hidden" ? "opacity 0.4s ease" : "none",
        }}
      >
        <Link href="/" className="pointer-events-auto relative h-9 w-32">
          <Image
            src="/logo2.png"
            alt="Fugar Media"
            fill
            className="object-contain"
            priority
          />
        </Link>
      </nav>

      {/* ── Scroll-snap container ────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="snap-y snap-mandatory overflow-y-scroll"
        style={{ height: "100dvh" }}
      >
        {/* ── Hero section ──────────────────────────────────────────────── */}
        <section
          className="relative snap-start snap-always bg-black flex flex-col items-center justify-center overflow-hidden"
          style={{ height: "100dvh" }}
        >
          {/* YouTube background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/msI9QwLgUys?autoplay=1&mute=1&loop=1&playlist=msI9QwLgUys&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: "177.78vh", height: "100vh", minWidth: "100%", minHeight: "56.25vw" }}
              allow="autoplay"
              title="Hero background video"
            />
          </div>
          <div className="absolute inset-0 bg-black/55 pointer-events-none" />

          {/* Tagline */}
          <p
            className="relative font-[family-name:var(--font-anton)] text-[#F58A2C] text-center leading-[1.05] px-6 sm:px-10 uppercase"
            style={{ fontSize: "clamp(2.4rem, 7.5vw, 6rem)", maxWidth: "900px" }}
          >
            Documenting the Human Experience in the Most Beautiful Way Possible
          </p>

          {/* Scroll indicator */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/15 select-none">
            <span className="text-[8px] tracking-[0.25em] uppercase">Scroll</span>
            <ChevronDown size={10} className="animate-bounce" />
          </div>
        </section>

        {/* ── Service sections ──────────────────────────────────────────── */}
        {SERVICES.map((svc, svcIdx) => {
          const currentSlide = slideMap[svc.id];
          const isVis = visible.has(svc.id);
          const isTitleVisible = titleVisible[svc.id];
          const totalSlides = svc.projects.length + 1;

          const slides = [
            { isIntro: true as const },
            ...svc.projects.map((p) => ({ isIntro: false as const, proj: p })),
          ];

          return (
            <section
              id={`svc-${svc.id}`}
              key={svc.id}
              className="relative snap-start snap-always bg-black flex flex-col items-center justify-center overflow-hidden"
              style={{ height: "100dvh" }}
            >
              <button
                onClick={() => navigate(svc.id, "prev")}
                aria-label="Previous"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-3 text-white/30 hover:text-white transition-colors duration-200"
              >
                <ChevronLeft size={30} strokeWidth={1} />
              </button>

              <button
                onClick={() => navigate(svc.id, "next")}
                aria-label="Next"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-3 text-white/30 hover:text-white transition-colors duration-200"
              >
                <ChevronRight size={30} strokeWidth={1} />
              </button>

              {/* Entrance wrapper */}
              <div
                className="flex flex-col items-center w-full"
                style={{
                  transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)",
                  opacity: isVis ? 1 : 0,
                  transform: isVis ? "translateY(0)" : "translateY(28px)",
                }}
              >
                {/* Slide area */}
                <div
                  className="relative overflow-hidden w-full"
                  style={{ height: "min(340px, 50vh)" }}
                >
                  {slides.map((slide, i) => {
                    const delta = i - currentSlide;
                    const bgSrc = slide.isIntro
                      ? (svc.sectionVideo ? getThumb(svc.sectionVideo) : null)
                      : (slide.proj.videoUrl ? getThumb(slide.proj.videoUrl) : slide.proj.image ?? null);
                    return (
                      <div
                        key={i}
                        className="absolute inset-0"
                        style={{
                          transform: `translateX(${delta * 110}%)`,
                          opacity: delta === 0 ? 1 : 0,
                          transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
                          pointerEvents: delta === 0 ? "auto" : "none",
                        }}
                      >
                        {/* Full-slide background */}
                        {bgSrc && (
                          <>
                            <Image src={bgSrc} alt="" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/55" />
                          </>
                        )}

                        {/* Content overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                          {slide.isIntro ? (
                            <>
                              {svc.heading.map((line, li) => (
                                <h2
                                  key={li}
                                  className="font-[family-name:var(--font-bebas)] leading-[0.88] tracking-[0.02em] text-white"
                                  style={{ fontSize: "clamp(2.5rem, 11vw, 8rem)" }}
                                >
                                  {line}
                                </h2>
                              ))}
                              <p className="text-white text-xs tracking-[0.2em] uppercase font-light mt-3">
                                {svc.price}
                              </p>
                              {svc.sectionVideo && (
                                <button
                                  onClick={() => setVideoModal(svc.sectionVideo!)}
                                  className="mt-5 w-11 h-11 border border-white/40 flex items-center justify-center hover:border-[#F58A2C] hover:text-[#F58A2C] transition-colors duration-200"
                                >
                                  <Play size={15} fill="currentColor" />
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              {/* Play button */}
                              {slide.proj.videoUrl && (
                                <button
                                  onClick={() => setVideoModal(slide.proj.videoUrl!)}
                                  className="mb-4 w-14 h-14 border border-white/40 flex items-center justify-center hover:border-[#F58A2C] hover:text-[#F58A2C] transition-colors duration-200"
                                >
                                  <Play size={20} fill="currentColor" />
                                </button>
                              )}

                              {/* Title — fades out after 5s */}
                              <h2
                                className="font-[family-name:var(--font-bebas)] leading-[0.88] tracking-[0.02em] text-white"
                                style={{
                                  fontSize: "clamp(2.5rem, 11vw, 8rem)",
                                  opacity: isTitleVisible ? 1 : 0,
                                  transition: "opacity 1s ease",
                                }}
                              >
                                {slide.proj.title}
                              </h2>

                              {/* Description — fades out after 5s */}
                              <div style={{ opacity: isTitleVisible ? 1 : 0, transition: "opacity 1s ease" }}>
                                <p className="text-white/60 text-sm mt-2 max-w-sm truncate">
                                  {slide.proj.description}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Minimized project title — fades in above dots after 5s on a project slide */}
                <p
                  className="text-white/55 text-[11px] font-semibold tracking-[0.18em] uppercase"
                  style={{
                    opacity: currentSlide > 0 && !isTitleVisible ? 1 : 0,
                    transition: "opacity 1s ease",
                    minHeight: "16px",
                    marginTop: "16px",
                  }}
                >
                  {currentSlide > 0 ? svc.projects[currentSlide - 1].title : ""}
                </p>

                {/* Dot indicators — larger for easy tapping */}
                <div className="flex items-center mt-3">
                  {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(svc.id, i)}
                      aria-label={`Slide ${i + 1}`}
                      className="p-3"
                    >
                      <div
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === currentSlide ? "22px" : "5px",
                          height: "4px",
                          background: i === currentSlide ? "#ffffff" : "rgba(255,255,255,0.25)",
                        }}
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPricingModal(svc)}
                  className="mt-8 text-[#F58A2C] text-[9px] font-bold tracking-[0.3em] uppercase hover:opacity-60 transition-opacity duration-150"
                >
                  See Pricing Info
                </button>
              </div>

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/15 select-none">
                <span className="text-[8px] tracking-[0.25em] uppercase">Scroll</span>
                <ChevronDown size={10} className="animate-bounce" />
              </div>

              <div className="absolute bottom-5 right-6 text-white/10 font-[family-name:var(--font-bebas)] text-sm tracking-widest select-none">
                {String(svcIdx + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
              </div>
            </section>
          );
        })}

        {/* ── CTA snap section ──────────────────────────────────────────── */}
        <footer
          className="snap-start snap-always bg-[#080808] flex flex-col items-center justify-center"
          style={{ height: "100dvh" }}
        >
          <div className="flex flex-col items-center text-center px-6">
            <p className="text-[#F58A2C] text-[10px] font-bold tracking-[0.3em] uppercase mb-5">
              Ready to Create
            </p>
            <h2
              className="font-[family-name:var(--font-bebas)] leading-[0.88] text-white mb-10"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
            >
              Let&apos;s Make
              <br />
              <span className="text-[#F58A2C]">Something.</span>
            </h2>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-3 bg-[#F58A2C] hover:bg-[#F58A2C]/85 text-white text-xs font-bold tracking-[0.2em] uppercase px-12 py-5 transition-colors duration-200 group"
            >
              Book a Consultation
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </footer>
      </div>

      {/* ── Video modal ──────────────────────────────────────────────────── */}
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
          <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            {getYouTubeId(videoModal) ? (
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(videoModal)}?autoplay=1&rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                title="Project video"
              />
            ) : (
              <video src={videoModal} controls autoPlay className="absolute inset-0 w-full h-full bg-black" />
            )}
          </div>
        </div>
      )}

      {/* ── Orange section-transition flash ──────────────────────────────── */}
      <div
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{
          background: "#F58A2C",
          opacity: sectionFlash ? 0.35 : 0,
          transition: sectionFlash ? "opacity 0.08s ease" : "opacity 0.35s ease",
        }}
      />

      {/* ── "Thanks for watching" toast ──────────────────────────────────── */}
      <div
        className="fixed bottom-0 left-1/2 z-[300] pointer-events-none"
        style={{
          transform: `translateX(-50%) translateY(${thanksVisible ? "0" : "100%"})`,
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p className="mb-10 text-white text-sm font-semibold tracking-[0.12em] whitespace-nowrap" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>
          Thanks for watching 🎉
        </p>
      </div>

      {/* ── Pricing modal ────────────────────────────────────────────────── */}
      {pricingModal && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setPricingModal(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#2a2a2a] p-8 sm:p-10 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors p-2"
              onClick={() => setPricingModal(null)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <p className="text-[#F58A2C] text-[9px] font-bold tracking-[0.3em] uppercase mb-3">Pricing</p>
            <h2
              className="font-[family-name:var(--font-bebas)] text-white leading-[0.88] mb-3"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              {pricingModal.heading.join(" ")}
            </h2>
            <p className="text-white/40 text-sm mb-8 max-w-md">{pricingModal.description}</p>

            <div className={`grid gap-4 ${pricingModal.packages.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {pricingModal.packages.map((pkg) => (
                <div key={pkg.name} className="relative border border-[#2a2a2a] p-6">
                  {pkg.note && (
                    <span className="absolute top-4 right-4 text-[8px] font-bold tracking-[0.2em] uppercase text-[#F58A2C] border border-[#F58A2C]/30 px-2 py-0.5">
                      {pkg.note}
                    </span>
                  )}
                  <p className="text-white/35 text-[9px] font-bold tracking-[0.25em] uppercase mb-2">{pkg.name}</p>
                  <p
                    className="font-[family-name:var(--font-bebas)] text-white tracking-wide mb-5"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
                  >
                    {pkg.price}
                  </p>
                  <ul className="space-y-2.5">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-white/55 text-xs">
                        <span className="mt-0.5 text-[#F58A2C] shrink-0">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#2a2a2a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-white/25 text-xs">Prices vary based on scope — let&apos;s talk.</p>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[#F58A2C] text-[9px] font-bold tracking-[0.3em] uppercase hover:opacity-60 transition-opacity duration-150 whitespace-nowrap"
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
