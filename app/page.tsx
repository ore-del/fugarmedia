import type { Metadata } from "next";
import ServiceCarousel from "@/components/ServiceCarousel";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fugar Media | Documenting the Human Experience",
  description:
    "Toronto-based media production company. Music videos, reels, DJ sessions, and editorial content.",
};

export default function Home() {
  return (
    <>
      <ServiceCarousel />
      <Footer />
    </>
  );
}
