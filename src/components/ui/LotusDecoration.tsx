import { cn } from "@/lib/utils";

type LotusDecorationProps = {
  size?: "sm" | "md" | "lg";
  variant?: "pink" | "gold" | "muted";
  className?: string;
  style?: React.CSSProperties;
};

const sizeMap = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

const colorMap = {
  pink: {
    outer: "fill-lotus-400/60",
    inner: "fill-lotus-300/40",
    center: "fill-lotus-500",
  },
  gold: {
    outer: "fill-gold-400/70",
    inner: "fill-gold-300/50",
    center: "fill-gold-500",
  },
  muted: {
    outer: "fill-text-muted/20",
    inner: "fill-text-muted/10",
    center: "fill-text-muted/30",
  },
};

export function LotusDecoration({
  size = "md",
  variant = "pink",
  className,
  style,
}: LotusDecorationProps) {
  const colors = colorMap[variant];

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(sizeMap[size], className)}
      style={style}
      aria-hidden="true"
    >
      {/* Outer petals (5) */}
      <ellipse cx="50" cy="20" rx="12" ry="28" className={colors.outer} transform="rotate(0, 50, 50)" />
      <ellipse cx="50" cy="20" rx="12" ry="28" className={colors.outer} transform="rotate(72, 50, 50)" />
      <ellipse cx="50" cy="20" rx="12" ry="28" className={colors.outer} transform="rotate(144, 50, 50)" />
      <ellipse cx="50" cy="20" rx="12" ry="28" className={colors.outer} transform="rotate(216, 50, 50)" />
      <ellipse cx="50" cy="20" rx="12" ry="28" className={colors.outer} transform="rotate(288, 50, 50)" />
      {/* Inner petals (5, smaller) */}
      <ellipse cx="50" cy="28" rx="8" ry="18" className={colors.inner} transform="rotate(36, 50, 50)" />
      <ellipse cx="50" cy="28" rx="8" ry="18" className={colors.inner} transform="rotate(108, 50, 50)" />
      <ellipse cx="50" cy="28" rx="8" ry="18" className={colors.inner} transform="rotate(180, 50, 50)" />
      <ellipse cx="50" cy="28" rx="8" ry="18" className={colors.inner} transform="rotate(252, 50, 50)" />
      <ellipse cx="50" cy="28" rx="8" ry="18" className={colors.inner} transform="rotate(324, 50, 50)" />
      {/* Center */}
      <circle cx="50" cy="50" r="8" className={colors.center} />
    </svg>
  );
}
