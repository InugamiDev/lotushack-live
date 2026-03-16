/** Event start: March 20, 2026 at 20:00 ICT (UTC+7) */
export const EVENT_START = new Date("2026-03-20T20:00:00+07:00");

/** Event end: March 22, 2026 at 08:00 ICT (UTC+7) */
export const EVENT_END = new Date("2026-03-22T08:00:00+07:00");

export const EVENT_LOCATION = "VNG Campus, Ho Chi Minh City, Vietnam";

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Tracks", href: "#tracks" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
  { label: "Schedule", href: "https://live.lotushack.org" },
] as const;

export const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/lotushacks/",
    icon: "instagram" as const,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/lotushacksvietnam",
    icon: "facebook" as const,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/lotushacks/",
    icon: "linkedin" as const,
  },
  {
    label: "Email",
    href: "mailto:team@lotushack.org",
    icon: "email" as const,
  },
  {
    label: "Discord",
    href: "https://discord.gg/3xCP2QkCrp",
    icon: "discord" as const,
  },
] as const;

export const REGISTER_URL = "https://luma.com/j9c5fvmq";
export const DISCORD_URL = "https://discord.gg/3xCP2QkCrp";
