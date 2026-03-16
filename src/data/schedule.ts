export type EventCategory =
  | "ceremony"
  | "workshop"
  | "meal"
  | "judging"
  | "activity"
  | "speaker";

export type ScheduleEvent = {
  title: string;
  startTime: string;
  endTime: string;
  category: EventCategory;
  description?: string;
  location?: string;
  host?: string;
};

export type ScheduleDay = {
  label: string;
  date: string;
  events: ScheduleEvent[];
};

export const categoryStyle: Record<
  EventCategory,
  { label: string; bg: string; border: string; text: string; pill: string; glow: string }
> = {
  ceremony: {
    label: "Ceremony",
    bg: "bg-gold-400/25 hover:bg-gold-400/35",
    border: "border-l-gold-400",
    text: "text-gold-300",
    pill: "border-gold-400/30 bg-gold-400/10 text-gold-400",
    glow: "0 0 12px oklch(0.78 0.16 75 / 0.4), 0 0 24px oklch(0.78 0.16 75 / 0.15)",
  },
  workshop: {
    label: "Workshop",
    bg: "bg-lotus-400/25 hover:bg-lotus-400/35",
    border: "border-l-lotus-400",
    text: "text-lotus-300",
    pill: "border-lotus-400/30 bg-lotus-400/10 text-lotus-400",
    glow: "0 0 12px oklch(0.65 0.25 330 / 0.4), 0 0 24px oklch(0.65 0.25 330 / 0.15)",
  },
  meal: {
    label: "Meal",
    bg: "bg-jade-400/25 hover:bg-jade-400/35",
    border: "border-l-jade-400",
    text: "text-jade-400",
    pill: "border-jade-400/30 bg-jade-400/10 text-jade-400",
    glow: "0 0 12px oklch(0.55 0.17 165 / 0.4), 0 0 24px oklch(0.55 0.17 165 / 0.15)",
  },
  judging: {
    label: "Judging",
    bg: "bg-amber-600/25 hover:bg-amber-600/35",
    border: "border-l-amber-600",
    text: "text-gold-300",
    pill: "border-gold-400/30 bg-gold-400/10 text-gold-400",
    glow: "0 0 12px oklch(0.7 0.15 70 / 0.4), 0 0 24px oklch(0.7 0.15 70 / 0.15)",
  },
  activity: {
    label: "Activity",
    bg: "bg-sienna-500/25 hover:bg-sienna-500/35",
    border: "border-l-sienna-500",
    text: "text-sienna-400",
    pill: "border-sienna-500/30 bg-sienna-500/10 text-sienna-400",
    glow: "0 0 12px oklch(0.65 0.15 50 / 0.4), 0 0 24px oklch(0.65 0.15 50 / 0.15)",
  },
  speaker: {
    label: "Speaker",
    bg: "bg-sky-500/25 hover:bg-sky-500/35",
    border: "border-l-sky-400",
    text: "text-sky-300",
    pill: "border-sky-400/30 bg-sky-400/10 text-sky-400",
    glow: "0 0 12px oklch(0.65 0.18 240 / 0.4), 0 0 24px oklch(0.65 0.18 240 / 0.15)",
  },
};

export const schedule: ScheduleDay[] = [
  {
    label: "Day 1 — Friday",
    date: "March 20",
    events: [
      {
        title: "Check-In & Registration",
        startTime: "16:30",
        endTime: "18:30",
        category: "ceremony",
        description: "Pick up your badge, swag bag, and get settled in",
        location: "CIS MLC",
        host: "Organizers",
      },
      {
        title: "Voice Agents with Avatar",
        startTime: "17:00",
        endTime: "18:30",
        category: "workshop",
        description: "Build real-time voice agents with Agora's avatar SDK",
        location: "CIS MLC Theater",
        host: "Agora",
      },
      {
        title: "OpenRouter Workshop",
        startTime: "17:00",
        endTime: "18:30",
        category: "workshop",
        description: "Access 100+ AI models through a single API with OpenRouter",
        location: "CIS MLC Theater",
        host: "OpenRouter",
      },
      {
        title: "Transition to Bus",
        startTime: "18:30",
        endTime: "19:00",
        category: "ceremony",
        description: "Head to the buses — we're moving to VNG Campus!",
        location: "CIS MLC",
        host: "Everyone",
      },
      {
        title: "Bus to VNG",
        startTime: "19:00",
        endTime: "19:20",
        category: "ceremony",
        description: "Shuttle ride to VNG Campus, the main hacking venue",
        host: "Everyone",
      },
      {
        title: "Opening Ceremony & Keynote",
        startTime: "19:45",
        endTime: "20:45",
        category: "ceremony",
        description: "Welcome speeches, sponsor intros, rules, and the keynote address",
        location: "VNG Main Atrium",
        host: "Hackers & Organizers",
      },
      {
        title: "Hackathon Starts!",
        startTime: "21:00",
        endTime: "21:30",
        category: "ceremony",
        description: "36 hours on the clock — form teams and start building!",
      },
      {
        title: "Snacks",
        startTime: "22:00",
        endTime: "22:30",
        category: "meal",
        description: "Fuel up for the first night of hacking",
        location: "VNG Lobby",
        host: "Organizers",
      },
    ],
  },
  {
    label: "Day 2 — Saturday",
    date: "March 21",
    events: [
      {
        title: "Late Night Domino's",
        startTime: "01:00",
        endTime: "02:00",
        category: "meal",
        description: "Free Domino's pizza to keep you going through the night",
        host: "Organizers",
      },
      {
        title: "Morning Trivia",
        startTime: "02:00",
        endTime: "03:00",
        category: "activity",
        description: "Stay awake with a fun trivia session — prizes for winners!",
        host: "Organizers",
      },
      {
        title: "Mandatory Devpost Workshop",
        startTime: "08:00",
        endTime: "08:30",
        category: "ceremony",
        description: "Learn how to submit your project on Devpost — required for all hackers",
        host: "Organizers",
      },
      {
        title: "Breakfast",
        startTime: "08:00",
        endTime: "10:00",
        category: "meal",
        description: "Grab breakfast and start your day",
      },
      {
        title: "Outdoor Games",
        startTime: "09:00",
        endTime: "10:00",
        category: "activity",
        description: "Take a break from coding with outdoor games and activities",
        host: "Organizers",
      },
      {
        title: "Codex Workshop",
        startTime: "10:00",
        endTime: "11:00",
        category: "workshop",
        description: "Hands-on session building with OpenAI's Codex coding agent",
        location: "Training Room",
        host: "Gabriel Chua — OpenAI",
      },
      {
        title: "AWS Workshop",
        startTime: "11:00",
        endTime: "12:00",
        category: "workshop",
        description: "Deploy and scale your hackathon project with AWS cloud services",
        location: "Training Room",
        host: "AWS",
      },
      {
        title: "Team Indication Form Due",
        startTime: "12:00",
        endTime: "12:30",
        category: "ceremony",
        description: "Submit your team roster and project idea — deadline!",
      },
      {
        title: "Lunch",
        startTime: "12:00",
        endTime: "13:00",
        category: "meal",
        description: "Lunch break — refuel and recharge",
      },
      {
        title: "CIO Coca-Cola",
        startTime: "12:00",
        endTime: "13:00",
        category: "speaker",
        description: "Fireside chat with Coca-Cola's Chief Information Officer",
      },
      {
        title: "Algorithmics",
        startTime: "17:00",
        endTime: "18:00",
        category: "workshop",
        description: "Deep dive into algorithms and competitive programming techniques",
        host: "Mr. Robert",
      },
      {
        title: "Dinner",
        startTime: "18:00",
        endTime: "19:00",
        category: "meal",
        description: "Dinner break before the evening activities",
      },
      {
        title: "Sovico BoD",
        startTime: "18:00",
        endTime: "19:00",
        category: "speaker",
        description: "Talk from Sovico Group's Board of Directors on tech innovation",
      },
      {
        title: "Peer Expo",
        startTime: "19:00",
        endTime: "20:30",
        category: "activity",
        description: "Walk around and see what other teams are building — share ideas and get inspired!",
        host: "Hackers",
      },
      {
        title: "Snacks",
        startTime: "22:30",
        endTime: "23:00",
        category: "meal",
        description: "Late night snacks to power through",
        host: "Organizers",
      },
    ],
  },
  {
    label: "Day 3 — Sunday",
    date: "March 22",
    events: [
      {
        title: "Late Night McDonald's",
        startTime: "01:00",
        endTime: "02:00",
        category: "meal",
        description: "Free McDonald's run — last meal before the final push",
        host: "Organizers",
      },
      {
        title: "Tech Support Available",
        startTime: "08:00",
        endTime: "09:00",
        category: "ceremony",
        description: "Final hour of hacking — mentors and tech support on standby to help you ship",
        host: "Organizers",
      },
      {
        title: "Submissions Due on Devpost",
        startTime: "09:00",
        endTime: "09:30",
        category: "judging",
        description: "Hackathon ends! All projects must be submitted on Devpost by 9:00 AM sharp",
      },
      {
        title: "Breakfast",
        startTime: "09:00",
        endTime: "10:00",
        category: "meal",
        description: "Post-submission breakfast — you made it!",
      },
      {
        title: "Booth Fair",
        startTime: "09:00",
        endTime: "10:30",
        category: "activity",
        description: "Explore sponsor booths, collect swag, and network with industry reps",
      },
      {
        title: "College Workshop",
        startTime: "09:00",
        endTime: "10:00",
        category: "workshop",
        description: "University admissions and study abroad opportunities with ETEST",
        location: "Training Room",
        host: "ETEST",
      },
      {
        title: "Judges Briefing",
        startTime: "10:15",
        endTime: "10:30",
        category: "judging",
        description: "Judges receive scoring criteria and project assignments",
        location: "Meeting Room",
        host: "Organizers",
      },
      {
        title: "Judging Expo — Round 1",
        startTime: "10:30",
        endTime: "12:30",
        category: "judging",
        description: "Teams present their projects at their booths — judges rotate through demos",
        location: "Training Room",
        host: "Judges & Sponsors",
      },
      {
        title: "Lunch",
        startTime: "12:30",
        endTime: "14:00",
        category: "meal",
        description: "Lunch while finalists are selected",
        location: "VNG",
        host: "Organizers",
      },
      {
        title: "Judging Final",
        startTime: "14:30",
        endTime: "16:00",
        category: "judging",
        description: "Top teams pitch on the main stage to the full judging panel",
        location: "Main Atrium",
        host: "Hackers & Judges",
      },
      {
        title: "Closing Ceremony & Awards",
        startTime: "16:30",
        endTime: "17:15",
        category: "ceremony",
        description: "Winners announced, prizes awarded, and group photos!",
      },
    ],
  },
];
