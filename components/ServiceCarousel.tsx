"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  {
    lines: ["MUSIC VIDEOS"],
    price: "Starting at $2,000",
  },
  {
    lines: ["REELS & CONTENT"],
    price: "$800",
  },
  {
    lines: ["LIVE DJ SESSIONS"],
    price: "$600",
  },
  {
    lines: ["EDITORIALS &", "PHOTOSHOOT"],
    price: "$600",
  },
];

export default function ServiceCarousel() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (dir: "prev" | "next") => {
      if (fading) return;
      setFading(true);
      setTimeout(() => {
        setIndex((i) =>
          dir === "next"
            ? (i + 1) % services.length
            : (i - 1 + services.length) % services.length
        );
        setFading(false);
      }, 220);
    },
    [fading]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go("prev");
      if (e.key === "ArrowRight") go("next");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 44) go(delta < 0 ? "next" : "prev");
    touchStartX.current = null;
  };

  const s = services[index];

  return (
    <section
      className="relative h-screen bg-black flex flex-col overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Top nav ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 sm:px-8 py-5">
        <div className="relative h-7 w-20">
          <Image
            src="/logo.png"
            alt="Fugar Media"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
        <Link
          href="/booking"
          className="text-[#FF6200] text-[9px] sm:text-[10px] font-bold tracking-[0.28em] uppercase hover:opacity-60 transition-opacity duration-150"
        >
          Book a Consultation
        </Link>
      </div>

      {/* ── Prev arrow ── */}
      <button
        onClick={() => go("prev")}
        aria-label="Previous service"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white/55 hover:text-white transition-colors duration-150"
      >
        <ChevronLeft size={26} strokeWidth={1.5} />
      </button>

      {/* ── Next arrow ── */}
      <button
        onClick={() => go("next")}
        aria-label="Next service"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white/55 hover:text-white transition-colors duration-150"
      >
        <ChevronRight size={26} strokeWidth={1.5} />
      </button>

      {/* ── Center ── */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-16 sm:px-24">
        <div
          className="transition-opacity duration-[220ms] ease-in-out"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {s.lines.map((line, i) => (
            <p
              key={i}
              className="font-[family-name:var(--font-bebas)] text-[clamp(2.6rem,9vw,7rem)] leading-[0.9] tracking-[0.02em] text-white"
            >
              {line}
            </p>
          ))}
          <p className="mt-5 text-white/70 text-sm tracking-widest font-light">
            {s.price}
          </p>
        </div>
      </div>

      {/* ── Progress dots ── */}
      <div className="absolute bottom-[4.5rem] left-0 right-0 flex items-center justify-center gap-[6px]">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === index || fading) return;
              setFading(true);
              setTimeout(() => {
                setIndex(i);
                setFading(false);
              }, 220);
            }}
            aria-label={`Go to service ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === index
                ? "w-4 h-[3px] bg-white"
                : "w-[3px] h-[3px] bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* ── See Pricing ── */}
      <div className="absolute bottom-7 left-0 right-0 flex justify-center">
        <Link
          href="/booking"
          className="text-[#FF6200] text-[9px] sm:text-[10px] font-bold tracking-[0.28em] uppercase hover:opacity-60 transition-opacity duration-150"
        >
          See Pricing
        </Link>
      </div>
    </section>
  );
}
