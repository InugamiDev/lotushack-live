"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  locked?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Schedule", href: "/" },
  { label: "FAQ", href: "https://www.lotushack.org/#faq", external: true },
  { label: "Resources", href: "/resources" },
  { label: "Guide", href: "/guide" },
  { label: "Devpost", href: "https://lotushack.org", external: true },
  { label: "Perks", href: "/perks", locked: true },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-50 px-4 py-4 sm:px-8"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        {/* Logos */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-80 sm:gap-3"
        >
          <Image
            src="/assets/img/hero/logo.png"
            alt="LotusHacks logo"
            width={40}
            height={40}
            className="h-9 w-9 sm:h-10 sm:w-10"
          />
          <Image
            src="/assets/svg/branding/hackharvard-logo.svg"
            alt="HackHarvard logo"
            width={100}
            height={40}
            className="h-7 w-auto opacity-70 sm:h-8"
          />
          <Image
            src="/assets/svg/branding/genai-logo.svg"
            alt="GenAI Fund logo"
            width={100}
            height={40}
            className="h-7 w-auto opacity-70 sm:h-8"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive =
              !item.external &&
              (item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href));

            const linkClass = cn(
              "relative rounded-lg px-4 py-2.5 font-[family-name:var(--font-heading)] text-sm font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950",
              item.locked
                ? "pointer-events-none text-cream-100/20 blur-[2px]"
                : isActive
                  ? "text-gold-400"
                  : "text-cream-100/50 hover:text-cream-100/80",
            );

            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(linkClass, "inline-flex items-center gap-1.5")}
                >
                  {item.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-40"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              );
            }

            return (
              <Link key={item.label} href={item.href} className={linkClass}>
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gold-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gold-400/20 text-cream-100/60 transition-all duration-200 hover:border-gold-400/50 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto mt-3 flex max-w-5xl flex-col gap-1 rounded-xl border border-gold-400/10 bg-forest-950/80 p-3 backdrop-blur-md">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  !item.external &&
                  (item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href));

                const cls = cn(
                  "flex items-center justify-between rounded-lg px-4 py-3 font-[family-name:var(--font-heading)] text-sm font-medium tracking-wide transition-all duration-200",
                  item.locked
                    ? "pointer-events-none text-cream-100/20 blur-[2px]"
                    : isActive
                      ? "bg-gold-400/10 text-gold-400"
                      : "text-cream-100/50 hover:bg-cream-50/[0.03] hover:text-cream-100/80",
                );

                if (item.external) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cls}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-40"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cls}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                    {isActive && (
                      <div className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
