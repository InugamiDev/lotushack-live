"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { LotusDecoration } from "@/components/ui/LotusDecoration";
import {
  resources,
  tierConfig,
  type ResourceTier,
} from "@/data/resources";
import { cn } from "@/lib/utils";

function ResourceCard({
  resource,
  index,
}: {
  resource: (typeof resources)[number];
  index: number;
}) {
  const tier = tierConfig[resource.tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.04 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gold-400/10 bg-forest-950/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-gold-400/25 hover:shadow-[0_0_30px_oklch(0.78_0.16_75/0.08)] sm:p-6"
    >
      {/* Top: logo + name */}
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/[0.07] p-1.5 sm:h-12 sm:w-12">
          <Image
            src={resource.logo}
            alt={resource.name}
            fill
            className="object-contain p-1"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold tracking-wide text-cream-50 sm:text-lg">
            {resource.name}
          </h3>
          <span
            className={cn(
              "inline-block rounded-full border px-2 py-0.5 font-[family-name:var(--font-heading)] text-[0.6rem] font-medium uppercase tracking-[0.15em]",
              tier.border,
              tier.bg,
              tier.text,
            )}
          >
            {tier.label}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-100/40">
        {resource.description}
      </p>

      {/* Action links */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {/* Docs link */}
        <a
          href={resource.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gold-400/15 px-3 py-2 text-xs font-medium text-cream-100/40 transition-all duration-200 hover:border-gold-400/40 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950"
        >
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
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          Docs
        </a>

        {/* GitHub repo link with star count */}
        <a
          href={resource.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-w-0 items-center gap-1.5 rounded-lg border border-gold-400/15 px-3 py-2 text-xs font-medium text-cream-100/40 transition-all duration-200 hover:border-gold-400/40 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="shrink-0"
            aria-hidden="true"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="truncate">{resource.repoName}</span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="shrink-0 text-gold-400/50"
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="shrink-0 text-cream-100/25">{resource.stars}</span>
        </a>
      </div>
    </motion.div>
  );
}

export default function ResourcesPage() {
  const [activeTier, setActiveTier] = useState<ResourceTier | null>(null);

  const filtered = activeTier
    ? resources.filter((r) => r.tier === activeTier)
    : resources;

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
          <span className="text-celestial-gold"> Resources</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base text-cream-100/50 sm:text-lg">
          Documentation, APIs, and tools from our sponsors — organized by skill
          level to help you build faster.
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

      {/* Tier filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="relative z-10 mx-auto max-w-5xl px-4 pb-2 sm:px-6"
      >
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTier(null)}
            className={cn(
              "rounded-lg px-4 py-2.5 font-[family-name:var(--font-heading)] text-xs font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 sm:text-sm",
              activeTier === null
                ? "bg-cream-50/[0.08] text-cream-50"
                : "text-cream-100/40 hover:text-cream-100/70",
            )}
          >
            All ({resources.length})
          </button>
          {(Object.keys(tierConfig) as ResourceTier[]).map((tier) => {
            const config = tierConfig[tier];
            const count = resources.filter((r) => r.tier === tier).length;
            const isActive = activeTier === tier;
            return (
              <button
                key={tier}
                onClick={() => setActiveTier(isActive ? null : tier)}
                className={cn(
                  "rounded-lg px-4 py-2.5 font-[family-name:var(--font-heading)] text-xs font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 sm:text-sm",
                  isActive
                    ? `${config.bg} ${config.text}`
                    : "text-cream-100/40 hover:text-cream-100/70",
                )}
                style={isActive ? { boxShadow: config.glow } : undefined}
              >
                {config.label} ({count})
              </button>
            );
          })}
        </div>
        {activeTier && (
          <p className="mt-3 text-center text-sm text-cream-100/30">
            {tierConfig[activeTier].description}
          </p>
        )}
      </motion.div>

      {/* Bento grid */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-6 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource, i) => (
            <ResourceCard key={resource.name} resource={resource} index={i} />
          ))}
        </div>

        {/* GitHub + Devpost links */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://lotushack.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl border border-gold-400/15 bg-forest-950/60 px-6 py-4 font-[family-name:var(--font-heading)] text-sm font-medium tracking-wide text-cream-100/50 backdrop-blur-md transition-all duration-200 hover:border-gold-400/40 hover:text-gold-400 hover:shadow-[0_0_20px_oklch(0.78_0.16_75/0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Starter Templates
          </a>
          <a
            href="https://lotushack.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl border border-gold-400/15 bg-forest-950/60 px-6 py-4 font-[family-name:var(--font-heading)] text-sm font-medium tracking-wide text-cream-100/50 backdrop-blur-md transition-all duration-200 hover:border-gold-400/40 hover:text-gold-400 hover:shadow-[0_0_20px_oklch(0.78_0.16_75/0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            Hacker Guide
          </a>
        </div>
      </div>
    </>
  );
}
