"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { LotusDecoration } from "@/components/ui/LotusDecoration";
import { perks } from "@/data/perks";
import type { Perk } from "@/data/perks";

type VerifiedPerk = Perk & { code: string };

// Accent → tailwind token mapping
const accentMap = {
  gold: {
    border: "border-l-gold-400",
    bg: "bg-gold-400/15",
    bgHover: "hover:bg-gold-400/25",
    text: "text-gold-300",
    glow: "0 0 20px oklch(0.78 0.16 75 / 0.25)",
    badge: "bg-gold-400/10 text-gold-400 border-gold-400/25",
  },
  jade: {
    border: "border-l-jade-400",
    bg: "bg-jade-400/15",
    bgHover: "hover:bg-jade-400/25",
    text: "text-jade-400",
    glow: "0 0 20px oklch(0.55 0.17 165 / 0.25)",
    badge: "bg-jade-400/10 text-jade-400 border-jade-400/25",
  },
  lotus: {
    border: "border-l-lotus-400",
    bg: "bg-lotus-400/15",
    bgHover: "hover:bg-lotus-400/25",
    text: "text-lotus-300",
    glow: "0 0 20px oklch(0.65 0.25 330 / 0.25)",
    badge: "bg-lotus-400/10 text-lotus-400 border-lotus-400/25",
  },
  amber: {
    border: "border-l-amber-500",
    bg: "bg-amber-500/15",
    bgHover: "hover:bg-amber-500/25",
    text: "text-amber-400",
    glow: "0 0 20px oklch(0.7 0.15 70 / 0.25)",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/25",
  },
} as const;

function PerkCard({ perk, index }: { perk: VerifiedPerk; index: number }) {
  const [copied, setCopied] = useState(false);
  const a = accentMap[perk.accent];

  function handleCopy() {
    navigator.clipboard.writeText(perk.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.08,
      }}
      className={`group relative overflow-hidden rounded-2xl border border-gold-400/15 bg-forest-950/60 backdrop-blur-md ${a.border} border-l-[3px] p-5 transition-all duration-300 sm:p-6`}
      style={{
        boxShadow:
          "0 0 40px oklch(0.78 0.16 75 / 0.04), 0 0 80px oklch(0.78 0.16 75 / 0.02)",
      }}
    >
      {/* Header: logo + sponsor name */}
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/[0.07] p-1.5 sm:h-12 sm:w-12">
          <Image
            src={perk.logo}
            alt={perk.sponsor}
            fill
            className="object-contain p-1"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold tracking-wide text-cream-50 sm:text-lg">
            {perk.sponsor}
          </h3>
          <span
            className={`inline-block font-[family-name:var(--font-heading)] text-[0.625rem] font-medium uppercase tracking-[0.15em] ${a.text} opacity-70`}
          >
            {perk.value}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-cream-100/40">
        {perk.description}
      </p>

      {/* Code block */}
      <div className="mt-4 flex items-center gap-2">
        <code className="flex-1 truncate rounded-lg border border-gold-400/10 bg-forest-950/50 px-4 py-3 font-mono text-sm tabular-nums text-cream-50/70 sm:text-base">
          {perk.code}
        </code>
        <button
          onClick={handleCopy}
          className={`shrink-0 rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 ${
            copied
              ? "border-jade-400/30 bg-jade-400/10 text-jade-400"
              : "border-gold-400/15 bg-forest-950/40 text-cream-100/50 hover:border-gold-400/40 hover:text-gold-400"
          }`}
        >
          {copied ? (
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
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
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copy
            </span>
          )}
        </button>
      </div>
    </motion.div>
  );
}

function GlowButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="glow-btn flex w-full items-center justify-center gap-2 bg-forest-950/80 px-8 py-4 font-[family-name:var(--font-heading)] text-base font-semibold tracking-wide text-gold-400 transition-all duration-300 hover:bg-forest-900/80 hover:text-cream-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 disabled:pointer-events-none disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export default function PerksPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [verifiedPerks, setVerifiedPerks] = useState<VerifiedPerk[] | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/perks/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), phone: phone.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.error ||
            "We couldn't find your registration. Double-check your email and phone number.",
        );
      }

      const data: { perks: VerifiedPerk[] } = await res.json();
      setVerifiedPerks(data.perks);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative z-10">
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
          Claim Your
          <span className="text-celestial-gold"> Perks</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base text-cream-100/50 sm:text-lg">
          Verify your registration to unlock exclusive sponsor credits and API
          keys for the hackathon.
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

      {/* Main content area */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 pb-20 sm:px-6">
        <AnimatePresence mode="wait">
          {verifiedPerks === null ? (
            /* ── Verification form ── */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div
                className="relative overflow-hidden rounded-2xl border border-gold-400/15 bg-forest-950/60 p-6 backdrop-blur-md sm:p-10"
                style={{
                  boxShadow:
                    "0 0 40px oklch(0.78 0.16 75 / 0.06), 0 0 80px oklch(0.78 0.16 75 / 0.03)",
                }}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold-400/[0.03] blur-2xl" />
                <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-jade-400/[0.03] blur-2xl" />

                <div className="relative">
                  <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold tracking-wide text-cream-50 sm:text-2xl">
                    Verify Your Registration
                  </h2>
                  <p className="mt-2 text-sm text-cream-100/40 sm:text-base">
                    Enter the email and phone number you used on Luma.
                  </p>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block font-[family-name:var(--font-heading)] text-xs font-medium uppercase tracking-[0.2em] text-cream-100/35"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-gold-400/15 bg-forest-950/50 px-4 py-3 font-mono text-base text-cream-50 placeholder-cream-100/20 transition-all duration-200 focus:border-gold-400/50 focus:shadow-[0_0_20px_oklch(0.78_0.16_75/0.12)] focus:outline-none focus:ring-1 focus:ring-gold-400/30"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block font-[family-name:var(--font-heading)] text-xs font-medium uppercase tracking-[0.2em] text-cream-100/35"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+84 xxx xxx xxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-lg border border-gold-400/15 bg-forest-950/50 px-4 py-3 font-mono text-base text-cream-50 placeholder-cream-100/20 transition-all duration-200 focus:border-gold-400/50 focus:shadow-[0_0_20px_oklch(0.78_0.16_75/0.12)] focus:outline-none focus:ring-1 focus:ring-gold-400/30"
                      />
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <GlowButton type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="3"
                              className="opacity-25"
                            />
                            <path
                              d="M4 12a8 8 0 018-8"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          Verifying...
                        </>
                      ) : (
                        "Unlock Perks"
                      )}
                    </GlowButton>
                  </form>
                </div>
              </div>

              {/* Sponsor logos */}
              <div className="mt-8">
                <p className="mb-2 text-center font-[family-name:var(--font-heading)] text-xs uppercase tracking-[0.25em] text-gold-400/40">
                  Powered By
                </p>
                <div className="grid grid-cols-3 place-items-center gap-x-4 gap-y-0 sm:gap-x-6">
                  {perks.map((perk) => (
                    <div
                      key={perk.sponsor}
                      className={`relative w-full opacity-30 transition-opacity duration-300 hover:opacity-60 ${
                        perk.sponsor === "Agora"
                          ? "h-14 sm:h-20 md:h-24"
                          : "h-8 sm:h-12 md:h-14"
                      }`}
                    >
                      <Image
                        src={perk.logo}
                        alt={perk.sponsor}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── Verified: show perks ── */
            <motion.div
              key="perks"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mb-8 flex items-center gap-3 rounded-xl border border-jade-400/20 bg-jade-400/10 px-5 py-4"
                style={{
                  boxShadow: "0 0 24px oklch(0.55 0.17 165 / 0.15)",
                }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-jade-400/20">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-jade-400"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-heading)] text-sm font-semibold tracking-wide text-jade-400">
                    Verified Successfully
                  </p>
                  <p className="text-xs text-cream-100/40">
                    {email} &middot; {verifiedPerks.length} perks unlocked
                  </p>
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                {verifiedPerks.map((perk, i) => (
                  <PerkCard key={perk.sponsor} perk={perk} index={i} />
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setVerifiedPerks(null);
                    setEmail("");
                    setPhone("");
                  }}
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
                  Verify another registration
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
