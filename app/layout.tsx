import type { Metadata } from "next";
import { Montserrat, Bebas_Neue } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fugar Media | Documenting the Human Experience",
  description:
    "Toronto-based media production company specializing in music videos, reels, live DJ sessions, and editorial content. Documenting the human experience in the most beautiful way possible.",
  keywords: "Fugar Media, music video production Toronto, video production, cinematography, media company",
  openGraph: {
    title: "Fugar Media",
    description: "Documenting the human experience in the most beautiful way possible.",
    siteName: "Fugar Media",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${bebasNeue.variable}`}
    >
      <body className="font-[family-name:var(--font-montserrat)] min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
