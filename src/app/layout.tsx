import type { Metadata, Viewport } from "next";
import { Cinzel, DM_Sans } from "next/font/google";
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
  title: "LotusHacks 2026 — Live Schedule",
  description:
    "Live schedule, countdown, and event timeline for LotusHacks x HackHarvard Vietnam 2026. March 20-22 at VNG Campus, Ho Chi Minh City.",
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
    title: "LotusHacks 2026 — Live Schedule",
    description:
      "Live schedule, countdown, and event timeline for LotusHacks x HackHarvard Vietnam 2026.",
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
    title: "LotusHacks 2026 — Live Schedule",
    description: "Live schedule and countdown for LotusHacks 2026.",
    images: ["https://lotushack.org/assets/img/branding/lotushacks-color-logo.png"],
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
        {children}
      </body>
    </html>
  );
}
