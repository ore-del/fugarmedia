import type { Metadata } from "next";
import ServiceSections from "@/components/ServiceSections";

export const metadata: Metadata = {
  title: "Fugar Media | Documenting the Human Experience",
  description:
    "Toronto-based media production company. Music videos, reels, live DJ sessions, and editorial content.",
};

export default function Home() {
  return <ServiceSections />;
}
