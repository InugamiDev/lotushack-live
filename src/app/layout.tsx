import type { Metadata, Viewport } from "next";
import { Cinzel, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/ui/Navbar";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "LotusHacks 2026 — Live",
    template: "%s — LotusHacks Live",
  },
  description:
    "Live schedule, resources, and perks for LotusHacks x HackHarvard Vietnam 2026. March 20-22 at VNG Campus, Ho Chi Minh City.",
  metadataBase: new URL("https://live.lotushack.org"),
  keywords: [
    "LotusHacks",
    "hackathon schedule",
    "live schedule",
    "HackHarvard Vietnam",
    "VNG Campus",
    "2026",
  ],
  authors: [{ name: "LotusHacks", url: "https://lotushack.org" }],
  creator: "LotusHacks x HackHarvard",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://live.lotushack.org" },
  openGraph: {
    title: "LotusHacks 2026 — Live",
    description:
      "Live schedule, resources, and perks for LotusHacks x HackHarvard Vietnam 2026.",
    url: "https://live.lotushack.org",
    siteName: "LotusHacks Live",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://lotushack.org/assets/img/branding/lotushacks-color-logo.png",
        width: 1080,
        height: 1080,
        alt: "LotusHacks x HackHarvard Vietnam 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LotusHacks 2026 — Live",
    description: "Live schedule, resources, and perks for LotusHacks 2026.",
    images: [
      "https://lotushack.org/assets/img/branding/lotushacks-color-logo.png",
    ],
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
  applicationName: "LotusHacks Live",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0a1f1a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${cinzel.variable} ${dmSans.variable} antialiased`}>
        {/* Fixed background — shared across all pages */}
        <div
          className="pointer-events-none fixed inset-0 z-0 bg-cover bg-[center_75%]"
          style={{ backgroundImage: "url('/assets/img/hero/bg.avif')" }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-forest-950/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-gold-400/[0.04] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-jade-600/[0.05] via-transparent to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 20%, oklch(0.78 0.16 75 / 0.05), transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 min-h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
