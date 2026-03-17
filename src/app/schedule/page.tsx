"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCountdown } from "@/hooks/useCountdown";
import {
  EVENT_START,
  EVENT_END,
  EVENT_LOCATION,
  REGISTER_URL,
  DISCORD_URL,
} from "@/lib/constants";
import { pad } from "@/lib/utils";
import { schedule, categoryStyle } from "@/data/schedule";
import type { EventCategory, ScheduleEvent } from "@/data/schedule";
import { TimelineEvent } from "@/components/ui/TimelineEvent";
import { LotusDecoration } from "@/components/ui/LotusDecoration";

// ── Time-grid layout helpers ──

function timeToMin(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

type LayoutedEvent = {
  event: ScheduleEvent;
  col: number;
  totalCols: number;
  topPx: number;
  heightPx: number;
};

function layoutEvents(
  events: ScheduleEvent[],
  minHour: number,
  hourPx: number,
): LayoutedEvent[] {
  if (events.length === 0) return [];

  const items = events
    .map((e) => {
      const startMin = timeToMin(e.startTime);
      const endMin =
        e.endTime === e.startTime ? startMin + 30 : timeToMin(e.endTime);
      return { event: e, startMin, endMin };
    })
    .sort((a, b) => a.startMin - b.startMin || a.endMin - b.endMin);

  // Greedy column assignment for overlapping events
  const placed: {
    startMin: number;
    endMin: number;
    col: number;
    event: ScheduleEvent;
  }[] = [];

  for (const item of items) {
    const occupied = new Set(
      placed
        .filter((p) => p.endMin >= item.startMin && p.startMin <= item.endMin)
        .map((p) => p.col),
    );
    let col = 0;
    while (occupied.has(col)) col++;
    placed.push({ ...item, col });
  }

  return placed.map((item) => {
    const overlapping = placed.filter(
      (p) => p.endMin > item.startMin && p.startMin < item.endMin,
    );
    const totalCols = Math.max(...overlapping.map((p) => p.col)) + 1;
    const topPx = ((item.startMin - minHour * 60) / 60) * hourPx;
    const dur = Math.max(item.endMin - item.startMin, 30);
    const heightPx = (dur / 60) * hourPx;
    return { event: item.event, col: item.col, totalCols, topPx, heightPx };
  });
}

function CountdownUnit({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className="min-w-[3.5rem] text-center font-mono text-5xl font-bold tabular-nums text-gold-400 sm:min-w-[5rem] sm:text-7xl"
        style={{ textShadow: "0 0 32px oklch(0.78 0.16 75 / 0.45)" }}
      >
        {value}
      </span>
      <span className="font-[family-name:var(--font-heading)] text-xs font-medium uppercase tracking-[0.2em] text-text-muted sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeCategory, setActiveCategory] = useState<EventCategory | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const preEvent = useCountdown(EVENT_START);
  const hackingEnd = useCountdown(EVENT_END);

  const hasStarted = preEvent.mounted && preEvent.days === 0 && preEvent.hours === 0 && preEvent.minutes === 0 && preEvent.seconds === 0;
  const isLive = hasStarted && !(hackingEnd.days === 0 && hackingEnd.hours === 0 && hackingEnd.minutes === 0 && hackingEnd.seconds === 0);
  const mounted = preEvent.mounted;
  const ph = "--";

  // Real-time clock for "now" indicator
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* ── Floating lotus decorations ── */}
      <LotusDecoration
        size="lg"
        variant="gold"
        className="pointer-events-none fixed right-[6%] top-[15%] z-0 opacity-[0.07] animate-lotus-drift-glow drop-shadow-[0_0_10px_oklch(0.78_0.16_75/0.4)] motion-reduce:animate-none"
      />
      <LotusDecoration
        size="md"
        variant="gold"
        className="pointer-events-none fixed left-[4%] top-[40%] z-0 opacity-[0.05] animate-lotus-float-glow drop-shadow-[0_0_8px_oklch(0.78_0.16_75/0.3)] motion-reduce:animate-none"
        style={{ animationDelay: "2.5s" }}
      />
      <LotusDecoration
        size="lg"
        variant="gold"
        className="pointer-events-none fixed left-[8%] bottom-[20%] z-0 opacity-[0.06] animate-lotus-drift-glow drop-shadow-[0_0_10px_oklch(0.78_0.16_75/0.4)] motion-reduce:animate-none"
        style={{ animationDelay: "4s" }}
      />
      <LotusDecoration
        size="md"
        variant="gold"
        className="pointer-events-none fixed right-[5%] bottom-[35%] z-0 opacity-[0.04] animate-lotus-float-glow drop-shadow-[0_0_8px_oklch(0.78_0.16_75/0.3)] motion-reduce:animate-none"
        style={{ animationDelay: "1s" }}
      />

        {/* ── Hero strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative z-10 px-4 pb-10 pt-8 text-center sm:pt-12"
        >
          <h1 className="section-heading text-4xl font-bold text-cream-50 sm:text-5xl md:text-6xl">
            LOTUS
            <span className="text-celestial-gold">HACK</span>
            {" "}2026
          </h1>

          {/* Status badge + location */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-cream-100/50">
            {isLive ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-red-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-400">
                March 20–22, 2026
              </span>
            )}
            <span aria-hidden="true" className="text-gold-400/30">&middot;</span>
            <span className="font-[family-name:var(--font-heading)] tracking-wide">
              {EVENT_LOCATION}
            </span>
          </div>

          {/* Main countdown — until hack begins */}
          <div className="mt-8" role="timer" aria-live="polite" aria-label="Countdown until event starts">
            <div className="flex items-start justify-center gap-3 sm:gap-5">
              <CountdownUnit value={preEvent.mounted ? pad(preEvent.days) : ph} label="Days" />
              <span className="self-start pt-2 font-mono text-4xl font-bold text-gold-400/30 sm:pt-3 sm:text-6xl" aria-hidden="true">:</span>
              <CountdownUnit value={preEvent.mounted ? pad(preEvent.hours) : ph} label="Hours" />
              <span className="self-start pt-2 font-mono text-4xl font-bold text-gold-400/30 sm:pt-3 sm:text-6xl" aria-hidden="true">:</span>
              <CountdownUnit value={preEvent.mounted ? pad(preEvent.minutes) : ph} label="Min" />
              <span className="self-start pt-2 font-mono text-4xl font-bold text-gold-400/30 sm:pt-3 sm:text-6xl" aria-hidden="true">:</span>
              <CountdownUnit value={preEvent.mounted ? pad(preEvent.seconds) : ph} label="Sec" />
            </div>
            <p className="mt-3 font-[family-name:var(--font-heading)] text-xs uppercase tracking-[0.2em] text-cream-100/30">
              until the hack begins
            </p>
          </div>

          {/* 36h hacking timer — dormant until hack day */}
          <div className="mt-8">
            <p className="font-[family-name:var(--font-heading)] text-[0.6875rem] uppercase tracking-[0.25em] text-jade-400/50 sm:text-xs">
              36-Hour Hacking Timer
            </p>
            <p
              className="mt-2 font-mono text-4xl font-bold tabular-nums text-jade-400/25 sm:text-5xl"
              style={{
                textShadow: "0 0 30px oklch(0.55 0.17 165 / 0.15), 0 0 60px oklch(0.55 0.17 165 / 0.08)",
              }}
            >
              {isLive
                ? `${pad(hackingEnd.hours + hackingEnd.days * 24)}:${pad(hackingEnd.minutes)}:${pad(hackingEnd.seconds)}`
                : "36:00:00"}
            </p>
            <p className="mt-1.5 text-xs text-cream-100/25 sm:text-sm">
              {isLive ? "hacking in progress" : "activates when hacking begins"}
            </p>
          </div>
        </motion.div>

        {/* ── Gold lotus divider ── */}
        <div className="relative mx-auto max-w-3xl px-6" aria-hidden="true">
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

        {/* ── Day tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
          className="relative z-10 mx-auto max-w-3xl px-4 pt-6 sm:px-6"
        >
          <div
            className="flex justify-center gap-2 overflow-x-auto pb-1 sm:gap-3"
            role="tablist"
            aria-label="Schedule days"
          >
            {schedule.map((day, i) => {
              const dayHasCategory = activeCategory !== null && day.events.some((e) => e.category === activeCategory);
              return (
              <button
                key={day.label}
                role="tab"
                id={`tab-day-${i}`}
                aria-selected={activeDay === i}
                aria-controls={`tabpanel-day-${i}`}
                onClick={() => setActiveDay(i)}
                className={`group relative shrink-0 rounded-xl px-5 py-3.5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 sm:px-6 sm:py-4 ${
                  activeDay === i
                    ? "bg-gold-400/10 shadow-sm shadow-gold-400/10"
                    : "hover:bg-cream-50/[0.03]"
                }`}
                style={dayHasCategory && activeCategory ? { boxShadow: categoryStyle[activeCategory].glow } : undefined}
              >
                {/* Active indicator line */}
                {activeDay === i && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-gold-400/60 via-gold-400 to-gold-400/60"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`block font-[family-name:var(--font-heading)] text-sm font-semibold tracking-wide transition-colors duration-200 sm:text-base ${
                    activeDay === i
                      ? "text-gold-400"
                      : "text-cream-100/40 group-hover:text-cream-100/70"
                  }`}
                >
                  {day.label}
                </span>
                <span
                  className={`mt-0.5 block text-xs transition-colors duration-200 ${
                    activeDay === i
                      ? "text-gold-400/60"
                      : "text-cream-100/20 group-hover:text-cream-100/40"
                  }`}
                >
                  {day.date}
                </span>
              </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Category legend ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="relative z-10 mx-auto max-w-4xl px-4 pt-5 pb-2 sm:px-6"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {(Object.keys(categoryStyle) as EventCategory[]).map((cat) => {
              const isActive = activeCategory === cat;
              const isInactive = activeCategory !== null && !isActive;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(isActive ? null : cat)}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-md border-l-[3px] px-3 py-1.5 text-xs transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 ${categoryStyle[cat].border} ${
                    isActive
                      ? categoryStyle[cat].bg
                      : isInactive
                        ? "bg-forest-950/30 opacity-40"
                        : categoryStyle[cat].bg
                  }`}
                  style={isActive ? { boxShadow: categoryStyle[cat].glow } : undefined}
                >
                  <span className={`font-[family-name:var(--font-heading)] text-[0.6875rem] font-semibold tracking-wide ${
                    isInactive ? "text-cream-100/40" : categoryStyle[cat].text
                  }`}>
                    {categoryStyle[cat].label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Hacking period note */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-4 text-center sm:px-6">
          <p className="text-sm text-cream-100/40">
            <span className="font-[family-name:var(--font-heading)] tracking-wide text-jade-400/70">Hacking Period</span>
            <span className="mx-2 text-gold-400/20" aria-hidden="true">&middot;</span>
            Friday 20:00 — Sunday 08:00 (36 hours)
          </p>
        </div>

        {/* Subtle divider */}
        <div className="mx-auto max-w-4xl px-6 py-2" aria-hidden="true">
          <div className="h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />
        </div>

        {/* ── Time grid ── */}
        <AnimatePresence mode="wait">
          {schedule.map((day, i) => {
            if (activeDay !== i) return null;

            const filteredEvents = day.events;
            const HOUR_PX = 100;

            // Compute hour range from filtered events
            const allMins = filteredEvents.flatMap((e) => {
              const s = timeToMin(e.startTime);
              const end =
                e.endTime === e.startTime ? s + 30 : timeToMin(e.endTime);
              return [s, end];
            });
            const minHour = Math.floor(Math.min(...allMins) / 60);
            const maxHour = Math.ceil(Math.max(...allMins) / 60);
            const totalHours = maxHour - minHour;

            const layouted = layoutEvents(filteredEvents, minHour, HOUR_PX);

            // Now indicator
            const nowMin = now.getHours() * 60 + now.getMinutes();
            const dayDate = new Date(`${day.date} 2026`);
            const isToday =
              mounted && now.toDateString() === dayDate.toDateString();
            const nowTopPx = ((nowMin - minHour * 60) / 60) * HOUR_PX;
            const showNow =
              isToday &&
              nowMin >= minHour * 60 &&
              nowMin <= maxHour * 60;

            return (
              <motion.div
                key={day.label}
                id={`tabpanel-day-${i}`}
                role="tabpanel"
                aria-labelledby={`tab-day-${i}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative z-10 mx-auto max-w-4xl px-4 py-4 sm:px-6"
              >
                <div className="rounded-2xl border border-gold-400/10 bg-forest-950/60 backdrop-blur-md">
                  {/* Scrollable grid — hidden scrollbar */}
                  <div
                    className="overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    style={{ maxHeight: "65vh" }}
                  >
                    <div
                      className="relative"
                      style={{
                        height: `${totalHours * HOUR_PX}px`,
                      }}
                    >
                      {/* Hour grid lines + Events share push-down logic */}
                      {(() => {
                        const EXPAND_PX = 90;
                        const hovered = hoveredIdx !== null ? layouted[hoveredIdx] : null;
                        const hoveredEndPx = hovered ? hovered.topPx + hovered.heightPx : 0;

                        return (
                          <>
                            {/* Hour grid lines */}
                            {Array.from({ length: totalHours + 1 }, (_, idx) => {
                              const hour = minHour + idx;
                              const linePx = idx * HOUR_PX;
                              const pushDown = hovered && linePx >= hoveredEndPx ? EXPAND_PX : 0;
                              return (
                                <motion.div
                                  key={hour}
                                  className="absolute left-0 right-0"
                                  style={{ top: `${linePx}px` }}
                                  animate={{ y: pushDown }}
                                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="w-14 shrink-0 text-right font-mono text-[0.6875rem] tabular-nums text-cream-100/30 sm:text-xs">
                                      {`${String(hour).padStart(2, "0")}:00`}
                                    </span>
                                    <div className="h-px flex-1 bg-cream-100/[0.06]" />
                                  </div>
                                </motion.div>
                              );
                            })}

                            {/* Events container */}
                            <div
                              className="absolute top-0 bottom-0 right-0"
                              style={{ left: "4.75rem" }}
                            >
                              {layouted.map((le, idx) => {
                                const isHovered = hoveredIdx === idx;
                                const baseTop = le.topPx + 2;
                                const pushDown = hovered && !isHovered && le.topPx >= hoveredEndPx ? EXPAND_PX : 0;
                                return (
                                  <motion.div
                                    key={`${le.event.startTime}-${le.event.title}`}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0, y: pushDown }}
                                    transition={{
                                      duration: 0.25,
                                      ease: "easeOut",
                                      delay: idx * 0.04,
                                      y: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                                    }}
                                    className="absolute"
                                    style={{
                                      top: `${baseTop}px`,
                                      left: `calc(${(le.col / le.totalCols) * 100}% + 2px)`,
                                      width: `calc(${(1 / le.totalCols) * 100}% - 4px)`,
                                      zIndex: isHovered ? 50 : 1,
                                    }}
                                    onMouseEnter={() => setHoveredIdx(idx)}
                                    onMouseLeave={() => setHoveredIdx(null)}
                                  >
                                    <TimelineEvent event={le.event} dimmed={activeCategory !== null && le.event.category !== activeCategory} height={Math.max(le.heightPx - 4, 56)} expanded={isHovered} />
                                  </motion.div>
                                );
                              })}

                              {/* Now indicator line */}
                              {showNow && (
                                <motion.div
                                  className="pointer-events-none absolute left-0 right-0 z-20"
                                  style={{ top: `${nowTopPx}px` }}
                                  animate={{ y: hovered && nowTopPx >= hoveredEndPx ? EXPAND_PX : 0 }}
                                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                >
                                  <div className="flex items-center">
                                    <div className="-ml-1.5 h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                                    <div className="h-[2px] flex-1 bg-red-500/70" />
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* ── Gold lotus divider ── */}
        <div className="relative mx-auto max-w-3xl px-6 pt-6" aria-hidden="true">
          <div className="flex h-10 items-center justify-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-400/20 to-gold-400/40" />
            <div className="mx-2 h-1.5 w-1.5 rotate-45 bg-gold-400/30" />
            <LotusDecoration
              size="sm"
              variant="gold"
              className="mx-2 shrink-0 animate-lotus-float"
              style={{ animationDelay: "2s" }}
            />
            <div className="mx-2 h-1.5 w-1.5 rotate-45 bg-gold-400/30" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-400/20 to-gold-400/40" />
          </div>
        </div>

        {/* ── Quick links footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-3xl px-4 pb-16 pt-4 sm:px-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-register inline-flex min-h-[2.625rem] items-center justify-center px-8 py-3.5 font-[family-name:var(--font-heading)] text-sm font-semibold tracking-wide text-gold-400 transition-colors duration-300 hover:text-cream-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 touch-action-manipulation"
            >
              <span className="brush-bg" aria-hidden="true" />
              <span className="relative">Register Now</span>
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[2.625rem] items-center justify-center gap-2.5 rounded-lg border border-gold-400/20 px-6 py-3.5 font-[family-name:var(--font-heading)] text-sm font-medium tracking-wide text-cream-100/60 transition-all duration-200 hover:border-gold-400/50 hover:text-gold-400 hover:shadow-[0_0_12px_oklch(0.78_0.16_75/0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
              </svg>
              Join Discord
            </a>
          </div>
        </motion.div>
    </>
  );
}
