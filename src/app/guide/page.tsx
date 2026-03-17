"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { LotusDecoration } from "@/components/ui/LotusDecoration";
import { guide } from "@/data/guide";
import type { GuideSection, GuideEntry } from "@/data/guide";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ReactNode> = {
  rocket: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  brain: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 014 4v1a4 4 0 01-1.38 3.02A4 4 0 0118 14v0a4 4 0 01-2.46 3.69A3 3 0 0112 22a3 3 0 01-3.54-4.31A4 4 0 016 14v0a4 4 0 013.38-3.98A4 4 0 018 7V6a4 4 0 014-4z" />
      <path d="M12 2v20" />
    </svg>
  ),
  mic: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
      <path d="M19 10v2a7 7 0 01-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  ),
  database: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  wand: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4V2" /><path d="M15 16v-2" /><path d="M8 9h2" /><path d="M20 9h2" />
      <path d="M17.8 11.8L19 13" /><path d="M15 9h0" /><path d="M17.8 6.2L19 5" />
      <path d="M3 21l9-9" /><path d="M12.2 6.2L11 5" />
    </svg>
  ),
  sparkle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </svg>
  ),
  presentation: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h20" /><path d="M21 3v11a2 2 0 01-2 2H5a2 2 0 01-2-2V3" />
      <path d="M12 16v5" /><path d="M8 21h8" />
    </svg>
  ),
  heart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
};

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative mt-3 overflow-hidden rounded-lg border border-gold-400/10 bg-forest-950/70">
      <div className="flex items-center justify-between border-b border-gold-400/10 px-4 py-2">
        {lang && (
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-cream-100/25">
            {lang}
          </span>
        )}
        <button
          onClick={handleCopy}
          className="ml-auto text-xs text-cream-100/30 transition-colors duration-200 hover:text-gold-400"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 text-[0.8rem] leading-relaxed text-cream-100/60">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function EntryCard({ entry, index }: { entry: GuideEntry; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const hasExtra = !!entry.snippet || !!entry.link;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.03 }}
      className="rounded-xl border border-gold-400/10 bg-forest-950/40 backdrop-blur-sm transition-all duration-200 hover:border-gold-400/20"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start gap-3 p-4 text-left sm:p-5"
      >
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gold-400/10 text-gold-400/60">
          <span className="text-xs font-bold">{index + 1}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-[family-name:var(--font-heading)] text-sm font-semibold tracking-wide text-cream-50 sm:text-base">
            {entry.title}
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-cream-100/40 whitespace-pre-line">
            {entry.content}
          </p>
        </div>
        {hasExtra && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "shrink-0 text-cream-100/20 transition-transform duration-200",
              expanded && "rotate-180",
            )}
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {expanded && hasExtra && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-gold-400/[0.06] px-4 pb-4 pt-2 sm:px-5 sm:pb-5">
              {entry.snippet && (
                <CodeBlock code={entry.snippet} lang={entry.lang} />
              )}
              {entry.link && (
                <a
                  href={entry.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold-400/70 transition-colors duration-200 hover:text-gold-400"
                >
                  {entry.link.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SectionBlock({
  section,
  sectionIndex,
}: {
  section: GuideSection;
  sectionIndex: number;
}) {
  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 pb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 text-gold-400">
          {ICONS[section.icon]}
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold tracking-wide text-cream-50 sm:text-xl">
            {section.title}
          </h2>
          <p className="text-sm text-cream-100/35">{section.description}</p>
        </div>
      </div>

      {/* Entries */}
      <div className="space-y-3">
        {section.entries.map((entry, i) => (
          <EntryCard key={entry.title} entry={entry} index={i} />
        ))}
      </div>
    </motion.section>
  );
}

export default function GuidePage() {
  return (
    <>
      {/* Floating lotus decorations */}
      <LotusDecoration
        size="lg"
        variant="gold"
        className="pointer-events-none fixed right-[6%] top-[15%] z-0 opacity-[0.07] animate-lotus-drift-glow drop-shadow-[0_0_10px_oklch(0.78_0.16_75/0.4)] motion-reduce:animate-none"
      />
      <LotusDecoration
        size="md"
        variant="gold"
        className="pointer-events-none fixed left-[4%] bottom-[25%] z-0 opacity-[0.05] animate-lotus-float-glow drop-shadow-[0_0_8px_oklch(0.78_0.16_75/0.3)] motion-reduce:animate-none"
        style={{ animationDelay: "3s" }}
      />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="relative z-10 px-4 pt-8 text-center sm:pt-12"
      >
        <LotusDecoration size="md" variant="gold" className="mx-auto mb-4" />
        <h1 className="section-heading text-4xl font-bold text-cream-50 sm:text-5xl md:text-6xl">
          Hacker
          <span className="text-celestial-gold"> Guide</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base text-cream-100/50 sm:text-lg">
          Everything you need to build, ship, and present at LotusHack 2026 —
          from setup to demo day.
        </p>
      </motion.div>

      {/* Gold divider */}
      <div
        className="relative mx-auto max-w-3xl px-6 py-6"
        aria-hidden="true"
      >
        <div className="flex h-10 items-center justify-center">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-400/30 to-gold-400/50" />
          <div className="mx-2 h-1.5 w-1.5 rotate-45 bg-gold-400/40" />
          <LotusDecoration
            size="sm"
            variant="gold"
            className="mx-2 shrink-0 animate-lotus-float"
          />
          <div className="mx-2 h-1.5 w-1.5 rotate-45 bg-gold-400/40" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-400/30 to-gold-400/50" />
        </div>
      </div>

      {/* Table of contents */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="relative z-10 mx-auto max-w-3xl px-4 pb-4 sm:px-6"
        aria-label="Guide sections"
      >
        <div className="flex flex-wrap justify-center gap-2">
          {guide.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gold-400/10 bg-forest-950/40 px-3 py-2 text-xs font-medium text-cream-100/40 backdrop-blur-sm transition-all duration-200 hover:border-gold-400/30 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950"
            >
              <span className="text-gold-400/50">{ICONS[section.icon]}</span>
              {section.title}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Sections */}
      <div className="relative z-10 mx-auto max-w-3xl space-y-12 px-4 pb-20 pt-6 sm:px-6">
        {guide.map((section, i) => (
          <SectionBlock key={section.id} section={section} sectionIndex={i} />
        ))}

        {/* Back to resources */}
        <div className="flex justify-center pt-4">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-heading)] text-sm tracking-wide text-cream-100/40 transition-colors duration-200 hover:text-gold-400"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Resources
          </Link>
        </div>
      </div>
    </>
  );
}
