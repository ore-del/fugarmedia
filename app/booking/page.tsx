import { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, ExternalLink, ArrowRight, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Book a Call | Fugar Media",
  description:
    "Book a strategy call with Fugar Media. Discuss your project scope, pricing, and production process before any commitment.",
};

const packages = [
  { name: "Music Videos", price: "From $1,500", tag: "Most Popular" },
  { name: "Reels & Content", price: "$800", tag: null },
  { name: "Live DJ Sessions", price: "$500 – $600", tag: null },
  { name: "Editorials & Photo", price: "By scope", tag: null },
];

export default function BookingPage() {
  return (
    <>
      <Navigation />
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6200]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <p className="text-[#FF6200] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Let&apos;s Work
          </p>
          <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(4rem,10vw,9rem)] leading-[0.9] tracking-wide text-white mb-6">
            Book a<br />
            <span className="text-[#FF6200]">Strategy Call</span>
          </h1>
          <p className="text-white/50 max-w-xl text-base leading-relaxed">
            No pressure, no commitment. The strategy call is where we align on your vision, scope, and budget before any production begins.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left: Info & Contact */}
            <div className="lg:col-span-2 space-y-10">

              {/* How the call works */}
              <div>
                <div className="w-10 h-0.5 bg-[#FF6200] mb-5" />
                <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-white mb-5">
                  What to Expect
                </h2>
                <div className="space-y-4">
                  {[
                    "We listen to your vision, goals, and references",
                    "We define the scope, deliverables, and timeline",
                    "We walk through pricing and the deposit process",
                    "No surprises — everything confirmed before production",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={15} className="text-[#FF6200] mt-0.5 shrink-0" />
                      <p className="text-white/60 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packages */}
              <div>
                <h3 className="text-white/40 text-xs uppercase tracking-[0.2em] mb-5">Packages</h3>
                <div className="space-y-2">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.name}
                      className="flex items-center justify-between p-4 border border-[#2a2a2a] hover:border-[#FF6200]/30 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-white text-sm font-medium">{pkg.name}</span>
                        {pkg.tag && (
                          <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6200] bg-[#FF6200]/10 px-2 py-0.5">
                            {pkg.tag}
                          </span>
                        )}
                      </div>
                      <span className="text-[#FF6200] text-sm font-semibold">{pkg.price}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-white/25 text-xs">
                  Final pricing confirmed during your call.
                </p>
              </div>

              {/* Direct contact */}
              <div>
                <h3 className="text-white/40 text-xs uppercase tracking-[0.2em] mb-5">
                  Reach Out Directly
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:fugarmediato@gmail.com"
                    className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors duration-200 group"
                  >
                    <Mail size={14} className="text-[#FF6200] shrink-0" />
                    fugarmediato@gmail.com
                    <ArrowRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                  <a
                    href="tel:6476214625"
                    className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors duration-200 group"
                  >
                    <Phone size={14} className="text-[#FF6200] shrink-0" />
                    647-621-4625
                    <ArrowRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                  <a
                    href="https://www.instagram.com/fu.gar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors duration-200 group"
                  >
                    <ExternalLink size={14} className="text-[#FF6200] shrink-0" />
                    @fu.gar on Instagram
                    <ArrowRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-3">
              <div className="border border-[#2a2a2a] bg-[#111111] p-8 sm:p-10">
                <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-white mb-2">
                  Send a Request
                </h2>
                <p className="text-white/40 text-sm mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours to schedule your call.
                </p>

                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ reminder */}
      <section className="py-16 bg-[#111111] border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-white/60 text-sm mb-1">Have questions before you reach out?</p>
            <p className="text-white/30 text-xs">Visit our FAQ section on the home page for quick answers.</p>
          </div>
          <Link
            href="/#faq"
            className="text-[#FF6200] hover:text-[#FF8340] text-sm font-semibold tracking-wider uppercase transition-colors duration-200 flex items-center gap-2 group"
          >
            View FAQ
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}

function BookingForm() {
  return (
    <form
      action="https://formsubmit.co/fugarmediato@gmail.com"
      method="POST"
      className="space-y-5"
    >
      {/* Honeypot */}
      <input type="text" name="_honey" className="hidden" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="New Booking Request — Fugar Media" />
      <input type="hidden" name="_template" value="table" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Name *" name="name" type="text" placeholder="Your full name" required />
        <FormField label="Email *" name="email" type="email" placeholder="your@email.com" required />
      </div>

      <FormField label="Phone" name="phone" type="tel" placeholder="(416) 000-0000" />

      <div>
        <label className="block text-white/50 text-xs font-semibold tracking-[0.15em] uppercase mb-2">
          Service *
        </label>
        <select
          name="service"
          required
          className="w-full bg-[#1c1c1c] border border-[#2a2a2a] text-white/80 text-sm px-4 py-3 outline-none focus:border-[#FF6200]/60 transition-colors duration-200 appearance-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
        >
          <option value="">Select a service</option>
          <option value="music-video">Music Video — From $1,500</option>
          <option value="reels">Reels & Content — $800</option>
          <option value="dj-session">Live DJ Session — $500–$600</option>
          <option value="editorial">Editorial / Photo Shoot</option>
          <option value="other">Other / Not Sure</option>
        </select>
      </div>

      <div>
        <label className="block text-white/50 text-xs font-semibold tracking-[0.15em] uppercase mb-2">
          Timeline
        </label>
        <select
          name="timeline"
          className="w-full bg-[#1c1c1c] border border-[#2a2a2a] text-white/80 text-sm px-4 py-3 outline-none focus:border-[#FF6200]/60 transition-colors duration-200 appearance-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
        >
          <option value="">Select a timeline</option>
          <option value="asap">As soon as possible</option>
          <option value="2-4-weeks">2–4 weeks</option>
          <option value="1-2-months">1–2 months</option>
          <option value="3-months">3+ months out</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      <div>
        <label className="block text-white/50 text-xs font-semibold tracking-[0.15em] uppercase mb-2">
          Tell Us About Your Project *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Describe your vision, goals, references, and any other details that will help us understand your project."
          className="w-full bg-[#1c1c1c] border border-[#2a2a2a] text-white/80 text-sm px-4 py-3 outline-none focus:border-[#FF6200]/60 transition-colors duration-200 resize-none placeholder:text-white/25"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-[#FF6200] hover:bg-[#FF8340] text-white text-sm font-bold tracking-[0.2em] uppercase py-4 transition-colors duration-200 flex items-center justify-center gap-2 group"
        >
          Send Request
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="mt-3 text-white/25 text-xs text-center">
          We respond within 24 hours. No spam, ever.
        </p>
      </div>
    </form>
  );
}

function FormField({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-white/50 text-xs font-semibold tracking-[0.15em] uppercase mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full bg-[#1c1c1c] border border-[#2a2a2a] text-white/80 text-sm px-4 py-3 outline-none focus:border-[#FF6200]/60 transition-colors duration-200 placeholder:text-white/25"
      />
    </div>
  );
}
