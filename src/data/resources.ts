export type ResourceTier = "beginner" | "intermediate" | "professional";

export type Resource = {
  name: string;
  logo: string;
  docsUrl: string;
  description: string;
  tier: ResourceTier;
  category: "ai" | "cloud" | "tools" | "data" | "media";
  /** GitHub repo link */
  repoUrl: string;
  /** org/repo format */
  repoName: string;
  /** Approximate star count label */
  stars: string;
};

export const resources: Resource[] = [
  // ── AI & LLMs ──
  {
    name: "OpenAI",
    logo: "/assets/svg/sponsors/openai-white.svg",
    docsUrl: "https://platform.openai.com/docs/quickstart",
    description:
      "API for GPT models — text generation, vision, embeddings, and function calling in a few lines of code",
    tier: "intermediate",
    category: "ai",
    repoUrl: "https://github.com/openai/openai-cookbook",
    repoName: "openai/openai-cookbook",
    stars: "70k+",
  },
  {
    name: "OpenRouter",
    logo: "/assets/svg/sponsors/openrouter-white.svg",
    docsUrl: "https://openrouter.ai/docs/quickstart",
    description:
      "Unified API gateway to 500+ LLMs from 60+ providers through a single OpenAI-compatible endpoint",
    tier: "intermediate",
    category: "ai",
    repoUrl: "https://github.com/OpenRouterTeam/openrouter-examples",
    repoName: "OpenRouterTeam/openrouter-examples",
    stars: "300+",
  },
  {
    name: "Qwen",
    logo: "/assets/svg/sponsors/qwen-white.svg",
    docsUrl: "https://qwen.readthedocs.io",
    description:
      "Open-weight language models by Alibaba Cloud — run locally or via API for multilingual AI tasks",
    tier: "professional",
    category: "ai",
    repoUrl: "https://github.com/QwenLM/Qwen3",
    repoName: "QwenLM/Qwen3",
    stars: "15k+",
  },
  {
    name: "Dify",
    logo: "/assets/svg/sponsors/dify-white.svg",
    docsUrl: "https://docs.dify.ai/en/use-dify/getting-started/quick-start",
    description:
      "Open-source platform for building AI apps with visual workflow builder, RAG pipelines, and agent orchestration",
    tier: "beginner",
    category: "ai",
    repoUrl: "https://github.com/langgenius/dify",
    repoName: "langgenius/dify",
    stars: "123k+",
  },
  {
    name: "Manus",
    logo: "/assets/svg/sponsors/manus-white.svg",
    docsUrl: "https://manus.im",
    description:
      "General-purpose AI agent that can browse, code, and complete complex tasks autonomously",
    tier: "beginner",
    category: "ai",
    repoUrl: "https://github.com/FoundationAgents/OpenManus",
    repoName: "FoundationAgents/OpenManus",
    stars: "55k+",
  },
  {
    name: "Exa",
    logo: "/assets/svg/sponsors/exa-white.svg",
    docsUrl: "https://docs.exa.ai/reference/search",
    description:
      "AI-native search API using embeddings to find and retrieve web content with semantic understanding",
    tier: "intermediate",
    category: "ai",
    repoUrl: "https://github.com/exa-labs/exa-js",
    repoName: "exa-labs/exa-js",
    stars: "120+",
  },

  // ── Cloud & Infrastructure ──
  {
    name: "AWS",
    logo: "/assets/svg/sponsors/aws-white.svg",
    docsUrl: "https://aws.amazon.com/getting-started/",
    description:
      "Cloud infrastructure with compute, storage, databases, and AI/ML services (Bedrock, Lambda, S3) plus free tier",
    tier: "professional",
    category: "cloud",
    repoUrl: "https://github.com/aws-samples/serverless-patterns",
    repoName: "aws-samples/serverless-patterns",
    stars: "1.8k+",
  },
  {
    name: "Redis",
    logo: "/assets/svg/sponsors/redis-white.svg",
    docsUrl: "https://redis.io/docs/latest/operate/rc/rc-quickstart/",
    description:
      "In-memory data store and cloud database for caching, real-time analytics, and sub-millisecond data access",
    tier: "intermediate",
    category: "cloud",
    repoUrl: "https://github.com/redis/redis",
    repoName: "redis/redis",
    stars: "67k+",
  },
  {
    name: "Replit",
    logo: "/assets/svg/sponsors/replit-white.svg",
    docsUrl: "https://docs.replit.com/getting-started/intro-replit",
    description:
      "Browser-based IDE with AI coding agent, instant hosting, multiplayer collaboration, and one-click deploy",
    tier: "beginner",
    category: "cloud",
    repoUrl: "https://github.com/replit/kaboom",
    repoName: "replit/kaboom",
    stars: "2.7k+",
  },

  // ── Developer Tools ──
  {
    name: "Trae",
    logo: "/assets/svg/sponsors/trae-white.svg",
    docsUrl: "https://docs.trae.ai/",
    description:
      "Free AI-powered code editor by ByteDance with autonomous SOLO mode, inline completion, and Builder workflows",
    tier: "beginner",
    category: "tools",
    repoUrl: "https://github.com/bytedance/trae-agent",
    repoName: "bytedance/trae-agent",
    stars: "11k+",
  },
  {
    name: "n8n",
    logo: "/assets/svg/sponsors/n8n-white.svg",
    docsUrl: "https://docs.n8n.io/try-it-out/quickstart/",
    description:
      "Open-source workflow automation with a visual builder, 400+ integrations, and built-in AI agent nodes",
    tier: "beginner",
    category: "tools",
    repoUrl: "https://github.com/n8n-io/n8n",
    repoName: "n8n-io/n8n",
    stars: "100k+",
  },
  {
    name: "Lovable",
    logo: "/assets/svg/sponsors/lovable-white.svg",
    docsUrl: "https://docs.lovable.dev/",
    description:
      "AI app builder that generates full-stack React + Supabase apps from natural language with GitHub sync",
    tier: "beginner",
    category: "tools",
    repoUrl: "https://github.com/AntonOsika/gpt-engineer",
    repoName: "AntonOsika/gpt-engineer",
    stars: "52k+",
  },

  // ── Data & Scraping ──
  {
    name: "Bright Data",
    logo: "/assets/svg/sponsors/bright-data-white.svg",
    docsUrl: "https://docs.brightdata.com/scraping-automation/scraping-browser/introduction",
    description:
      "Web scraping infrastructure with managed proxies, anti-bot bypass, browser API, and pre-scraped datasets",
    tier: "professional",
    category: "data",
    repoUrl: "https://github.com/luminati-io/brightdata-mcp",
    repoName: "luminati-io/brightdata-mcp",
    stars: "1.6k+",
  },

  // ── Media & Communication ──
  {
    name: "Agora",
    logo: "/assets/svg/sponsors/agora-white.svg",
    docsUrl: "https://docs.agora.io/en/video-calling/get-started/get-started-sdk",
    description:
      "Real-time voice, video calling, and interactive live streaming SDKs with ultra-low latency across platforms",
    tier: "intermediate",
    category: "media",
    repoUrl: "https://github.com/AgoraIO/Basic-Video-Call",
    repoName: "AgoraIO/Basic-Video-Call",
    stars: "680+",
  },
  {
    name: "ElevenLabs",
    logo: "/assets/svg/sponsors/elevenlabs-white.svg",
    docsUrl: "https://elevenlabs.io/docs/quickstart",
    description:
      "Voice AI API for text-to-speech, speech-to-text, voice cloning, and real-time audio generation",
    tier: "intermediate",
    category: "media",
    repoUrl: "https://github.com/elevenlabs/elevenlabs-examples",
    repoName: "elevenlabs/elevenlabs-examples",
    stars: "570+",
  },
];

export const tierConfig: Record<
  ResourceTier,
  { label: string; description: string; accent: string; border: string; bg: string; text: string; glow: string }
> = {
  beginner: {
    label: "Beginner",
    description: "No-code tools and simple APIs to get started fast",
    accent: "jade",
    border: "border-jade-400/30",
    bg: "bg-jade-400/10",
    text: "text-jade-400",
    glow: "0 0 12px oklch(0.55 0.17 165 / 0.3)",
  },
  intermediate: {
    label: "Intermediate",
    description: "APIs and SDKs that require some coding experience",
    accent: "gold",
    border: "border-gold-400/30",
    bg: "bg-gold-400/10",
    text: "text-gold-400",
    glow: "0 0 12px oklch(0.78 0.16 75 / 0.3)",
  },
  professional: {
    label: "Professional",
    description: "Advanced infrastructure for scalable architectures",
    accent: "lotus",
    border: "border-lotus-400/30",
    bg: "bg-lotus-400/10",
    text: "text-lotus-400",
    glow: "0 0 12px oklch(0.65 0.25 330 / 0.3)",
  },
};
