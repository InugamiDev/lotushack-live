import { motion, AnimatePresence } from "motion/react";
import type { ScheduleEvent } from "@/data/schedule";
import { categoryStyle } from "@/data/schedule";
import { cn } from "@/lib/utils";

type TimelineEventProps = {
  event: ScheduleEvent;
  dimmed?: boolean;
  height?: number;
  expanded?: boolean;
};

export function TimelineEvent({ event, dimmed = false, height = 100, expanded = false }: TimelineEventProps) {
  const cat = categoryStyle[event.category];
  const compact = height < 60;
  const tiny = height < 40;

  return (
    <div
      className={cn(
        "relative rounded-md border-l-[3px] transition-shadow duration-300 motion-reduce:transition-none",
        expanded ? "z-50 shadow-xl shadow-black/40" : "",
        compact ? "px-2 py-1" : "p-2.5 sm:p-3",
        cat.bg,
        cat.border,
        dimmed && "opacity-25 blur-[1px] saturate-50",
      )}
      style={{ minHeight: `${height}px` }}
    >
      {!tiny && (
        <p className={cn(
          "font-mono tabular-nums text-cream-50/50",
          compact ? "text-[0.5rem]" : "text-[0.625rem] sm:text-xs",
        )}>
          {event.startTime}
          {event.endTime !== event.startTime ? ` – ${event.endTime}` : null}
        </p>
      )}
      <h4
        className={cn(
          "font-[family-name:var(--font-heading)] font-semibold leading-tight tracking-wide",
          expanded ? "whitespace-normal" : "truncate",
          tiny ? "text-[0.625rem]" : compact ? "text-xs" : "mt-0.5 text-sm sm:text-base",
          cat.text,
        )}
      >
        {event.title}
      </h4>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            {tiny && (
              <p className="mt-0.5 font-mono text-[0.5rem] tabular-nums text-cream-50/50">
                {event.startTime}
                {event.endTime !== event.startTime ? ` – ${event.endTime}` : null}
              </p>
            )}
            <div className="mt-2 space-y-1.5">
              {event.location && (
                <div className="flex items-center gap-2 text-xs text-cream-100/60">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-cream-100/40">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {event.location}
                </div>
              )}
              {event.host && (
                <div className="flex items-center gap-2 text-xs text-cream-100/60">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-cream-100/40">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {event.host}
                </div>
              )}
              {event.description && (
                <p className="text-xs leading-relaxed text-cream-100/45">
                  {event.description}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
