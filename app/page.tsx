import Link from "next/link";
import { ArrowRight, Play, Camera, Film, Music, ImageIcon, ChevronDown } from "lucide-react";

const services = [
  {
    icon: Film,
    title: "Music Videos",
    price: "Starting at $1,500",
    description:
      "Full production management, camera operation, BTS content, and complete edit. Targeted at artists and labels seeking premium, standout visuals.",
    highlight: true,
    note: "PRIMARY OFFERING",
  },
  {
    icon: Camera,
    title: "Reels & Content",
    price: "$800",
    description:
      "2 reels, 2 looks, 2 settings, and bonus photos. Built for independent artists and creator brands ready to level up their content.",
    highlight: false,
    note: null,
  },
  {
    icon: Music,
    title: "Live DJ Sessions",
    price: "$500 – $600",
    description:
      "2-camera setup, professional lighting, and full edit. Ideal for live mixes, YouTube content, and recorded session archives.",
    highlight: false,
    note: null,
  },
  {
    icon: ImageIcon,
    title: "Editorials & Photo Shoots",
    price: "Rate by scope",
    description:
      "High-volume photo deliverables with full gallery delivery. Professional direction and photographer expertise on set.",
    highlight: false,
    note: null,
  },
];

const faqs = [
  {
    q: "How do I book Fugar Media?",
    a: "Start by booking a strategy call through our booking page. We'll discuss your project scope, vision, timeline, and pricing before any commitment is made.",
  },
  {
    q: "Can I see your work?",
    a: "Yes — our Portfolio page showcases our best work across music videos, reels, DJ sessions, and editorial shoots. We recommend reviewing it before your call.",
  },
  {
    q: "How much is the deposit?",
    a: "A deposit is required before any production begins. The exact amount is discussed and confirmed during your strategy call based on project scope.",
  },
  {
    q: "What is your turnaround time?",
    a: "Turnaround time depends on the project type and scope. This is discussed in detail during the strategy call so expectations are clear from day one.",
  },
  {
    q: "Do you work with artists outside Toronto?",
    a: "We are based in Toronto with an active presence in Nigeria. We work with artists across markets and are open to discussing travel and remote production.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#080808]">
        {/* Background texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#080808] to-[#0a0a0a]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)",
          }}
        />

        {/* Orange accent glow */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-[#FF6200]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 -left-20 w-72 h-72 rounded-full bg-[#FF6200]/6 blur-[100px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-32">
          <div className="max-w-4xl">
            <p className="animate-fade-up text-[#FF6200] text-xs font-semibold tracking-[0.3em] uppercase mb-6">
              Toronto &bull; Nigeria &bull; World
            </p>

            <h1 className="animate-fade-up animate-delay-1 font-[family-name:var(--font-bebas)] text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-wide text-white mb-8">
              Documenting
              <br />
              the Human
              <br />
              <span className="text-[#FF6200]">Experience.</span>
            </h1>

            <p className="animate-fade-up animate-delay-2 text-white/55 text-base sm:text-lg font-light leading-relaxed max-w-xl mb-10">
              In the most beautiful way possible. Full-service media production based in Toronto — music videos, reels, live sessions, and editorial content.
            </p>

            <div className="animate-fade-up animate-delay-3 flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 bg-[#FF6200] hover:bg-[#FF8340] text-white text-sm font-semibold tracking-wider uppercase px-8 py-4 transition-colors duration-200 group"
              >
                View Portfolio
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white/80 hover:text-white text-sm font-semibold tracking-wider uppercase px-8 py-4 transition-all duration-200"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 flex justify-center pb-8">
          <ChevronDown size={18} className="text-white/20 animate-bounce" />
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="bg-[#111111] border-y border-[#2a2a2a] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-0.5 bg-[#FF6200] mb-6" />
              <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl tracking-wide text-white mb-6 leading-tight">
                Built on Resilience.<br />
                <span className="text-[#FF6200]">Driven by Vision.</span>
              </h2>
              <p className="text-white/55 leading-relaxed mb-4">
                Fugar Media is a Toronto-based media production company led by David Danesi Momoh — Director, Editor in Chief, Cinematographer, and Producer. We operate where creativity meets professionalism.
              </p>
              <p className="text-white/55 leading-relaxed">
                With an active presence in Toronto and a growing operation in Nigeria, we bring a rare international perspective to every project — from independent artist reels to full-scale music video productions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Music Videos", value: "Starting at $1,500" },
                { label: "Markets", value: "Toronto & Nigeria" },
                { label: "Team", value: "Lean & Skilled" },
                { label: "Focus", value: "Music & Entertainment" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#1c1c1c] border border-[#2a2a2a] p-6">
                  <p className="text-[#FF6200] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                    {stat.label}
                  </p>
                  <p className="text-white font-semibold text-sm leading-snug">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-14">
            <p className="text-[#FF6200] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              What We Do
            </p>
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl tracking-wide text-white">
              Services & Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className={`relative flex flex-col p-7 border transition-all duration-300 group ${
                    s.highlight
                      ? "border-[#FF6200]/40 bg-[#111111] hover:border-[#FF6200]"
                      : "border-[#2a2a2a] bg-[#111111] hover:border-[#444]"
                  }`}
                >
                  {s.note && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.15em] uppercase text-[#FF6200] bg-[#FF6200]/10 px-2 py-1">
                      {s.note}
                    </span>
                  )}
                  <Icon
                    size={22}
                    className={`mb-5 ${s.highlight ? "text-[#FF6200]" : "text-white/40 group-hover:text-[#FF6200] transition-colors duration-300"}`}
                  />
                  <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wider text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-[#FF6200] text-sm font-semibold mb-4">{s.price}</p>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">{s.description}</p>

                  <Link
                    href="/booking"
                    className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white/40 group-hover:text-white transition-colors duration-200"
                  >
                    Book this <ArrowRight size={12} />
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-white/30 text-xs text-center">
            All packages are scoped during your strategy call. Locations, additional talent, and styling are not included unless negotiated.
          </p>
        </div>
      </section>

      {/* ── PORTFOLIO CTA ── */}
      <section className="py-24 bg-[#111111] border-y border-[#2a2a2a] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6200]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div>
              <div className="w-12 h-0.5 bg-[#FF6200] mb-6" />
              <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl tracking-wide text-white mb-4">
                See the Work.
              </h2>
              <p className="text-white/50 max-w-lg leading-relaxed">
                Our portfolio speaks louder than any pitch. Browse our music videos, reels, DJ sessions, and editorial work — then let&apos;s talk about yours.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="shrink-0 inline-flex items-center gap-3 bg-[#FF6200] hover:bg-[#FF8340] text-white text-sm font-bold tracking-wider uppercase px-10 py-5 transition-colors duration-200 group"
            >
              <Play size={16} fill="currentColor" />
              View Portfolio
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="text-[#FF6200] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              The Process
            </p>
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl tracking-wide text-white">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0">
            {[
              { step: "01", title: "Discover Us", desc: "Find Fugar Media through social, referral, or our website." },
              { step: "02", title: "View Portfolio", desc: "Browse our work to confirm we're the right fit for your vision." },
              { step: "03", title: "Book a Call", desc: "Schedule a strategy call to discuss scope, pricing, and process." },
              { step: "04", title: "Deposit", desc: "A deposit is collected to lock in your production date." },
              { step: "05", title: "Production", desc: "We execute, deliver, and wrap — clean and professional every time." },
            ].map((item, i) => (
              <div key={item.step} className="relative flex flex-col items-center text-center px-6 py-8 group">
                {i < 4 && (
                  <div className="hidden lg:block absolute right-0 top-1/3 w-px h-8 bg-[#2a2a2a]" />
                )}
                <span className="font-[family-name:var(--font-bebas)] text-[4rem] leading-none text-[#FF6200]/15 group-hover:text-[#FF6200]/30 transition-colors duration-300 mb-2">
                  {item.step}
                </span>
                <h3 className="text-white font-semibold text-sm tracking-wide mb-2">{item.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-[#FF6200] hover:bg-[#FF8340] text-white text-sm font-bold tracking-wider uppercase px-8 py-4 transition-colors duration-200 group"
            >
              Start the Process
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-[#111111] border-t border-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="mb-14">
            <p className="text-[#FF6200] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              Questions
            </p>
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl tracking-wide text-white">
              Frequently Asked
            </h2>
          </div>

          <div className="divide-y divide-[#2a2a2a]">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="mt-12 p-6 border border-[#2a2a2a] bg-[#1c1c1c]">
            <p className="text-white/60 text-sm mb-4">
              Have a question that&apos;s not answered here?
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:fugarmediato@gmail.com"
                className="text-[#FF6200] hover:text-[#FF8340] text-sm font-semibold transition-colors duration-200"
              >
                Email us →
              </a>
              <Link
                href="/booking"
                className="text-white/60 hover:text-white text-sm transition-colors duration-200"
              >
                Or book a call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-32 bg-[#080808] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#FF6200]/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#FF6200]/8 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <p className="text-[#FF6200] text-xs font-semibold tracking-[0.3em] uppercase mb-5">
            Ready to Create?
          </p>
          <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-wide text-white mb-8">
            Let&apos;s Make<br />
            <span className="text-[#FF6200]">Something.</span>
          </h2>
          <p className="text-white/50 mb-10 leading-relaxed">
            Book a strategy call and let&apos;s discuss your project — no pressure, no commitments until we agree on scope and terms.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-3 bg-[#FF6200] hover:bg-[#FF8340] text-white text-sm font-bold tracking-wider uppercase px-12 py-5 transition-colors duration-200 group"
          >
            Book Your Strategy Call
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
      <summary className="flex items-center justify-between gap-6 text-white font-medium text-sm leading-relaxed select-none">
        <span className="group-open:text-[#FF6200] transition-colors duration-200">{q}</span>
        <span className="shrink-0 w-6 h-6 border border-[#2a2a2a] flex items-center justify-center text-white/40 group-open:text-[#FF6200] group-open:border-[#FF6200]/30 transition-colors duration-200">
          <svg
            className="group-open:rotate-45 transition-transform duration-200"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="currentColor"
          >
            <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </summary>
      <p className="mt-4 text-white/50 text-sm leading-relaxed pr-12">{a}</p>
    </details>
  );
}
