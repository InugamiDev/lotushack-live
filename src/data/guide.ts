export type GuideSection = {
  id: string;
  icon: string;
  title: string;
  description: string;
  entries: GuideEntry[];
};

export type GuideEntry = {
  title: string;
  content: string;
  /** Optional code/prompt snippet */
  snippet?: string;
  /** Optional language hint for the snippet */
  lang?: string;
  /** Optional link */
  link?: { label: string; url: string };
};

export const guide: GuideSection[] = [
  // ── 1. Getting Started ──
  {
    id: "getting-started",
    icon: "rocket",
    title: "Getting Started",
    description: "First steps when the hack begins — environment, team, and idea.",
    entries: [
      {
        title: "Set up your dev environment early",
        content:
          "Have your IDE, Git, Node.js/Python, and API keys ready before hacking starts. Use Trae or Replit if you want a zero-config setup. Clone a boilerplate so you're not starting from scratch.",
      },
      {
        title: "Pick a track and scope ruthlessly",
        content:
          "LotusHack has 4 tracks: Enterprise, Technology & Consumer, Social & Mobility, and EdTech. Pick one, brainstorm 3 ideas, then choose the one you can demo in 36 hours. A polished MVP beats an ambitious half-build every time.",
      },
      {
        title: "Split roles in your team",
        content:
          "Assign clear ownership: frontend, backend/API, AI/ML integration, and pitch/demo. Use Discord or a shared doc for async comms. Commit early and often — don't wait for 'perfect' code.",
      },
      {
        title: "Register on Devpost immediately",
        content:
          "Create your project on Devpost as soon as you have a name. You can update the description later, but the submission deadline is hard. The mandatory Devpost workshop on Saturday 08:00 will walk you through it.",
      },
    ],
  },

  // ── 2. AI & LLM Integration ──
  {
    id: "ai-llm",
    icon: "brain",
    title: "AI & LLM Integration",
    description: "How to wire up AI models — from OpenAI to open-source.",
    entries: [
      {
        title: "OpenAI — Chat Completions API",
        content:
          "The fastest path to AI in your app. Use GPT-4o for multimodal (text + images), o1 for complex reasoning. The chat completions endpoint handles 90% of hackathon use cases.",
        snippet: `import OpenAI from "openai";

const openai = new OpenAI(); // uses OPENAI_API_KEY env var

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Explain quantum computing in 2 sentences." },
  ],
});

console.log(response.choices[0].message.content);`,
        lang: "typescript",
        link: {
          label: "OpenAI Cookbook",
          url: "https://github.com/openai/openai-cookbook",
        },
      },
      {
        title: "OpenRouter — Try 500+ models with one API",
        content:
          "Can't decide which model to use? OpenRouter lets you swap between Claude, GPT-4o, Gemini, Llama, and 500+ others by just changing the model name. Same OpenAI-compatible format.",
        snippet: `const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer $OPENROUTER_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "anthropic/claude-sonnet-4",
    messages: [{ role: "user", content: "Hello!" }],
  }),
});`,
        lang: "typescript",
        link: {
          label: "OpenRouter Docs",
          url: "https://openrouter.ai/docs/quickstart",
        },
      },
      {
        title: "Exa — AI-powered web search for RAG",
        content:
          "Need your AI to reference real-time web data? Exa gives you semantic search that understands meaning, not just keywords. Perfect for building RAG (Retrieval-Augmented Generation) pipelines.",
        snippet: `import Exa from "exa-js";

const exa = new Exa(process.env.EXA_API_KEY);

const results = await exa.searchAndContents("latest AI research papers", {
  type: "neural",
  numResults: 5,
  text: true,
});

// Feed results.results[].text into your LLM as context`,
        lang: "typescript",
        link: {
          label: "Exa JS SDK",
          url: "https://github.com/exa-labs/exa-js",
        },
      },
      {
        title: "Dify — Build AI apps without code",
        content:
          "Dify lets you visually wire up LLM chains, RAG pipelines, and AI agents with a drag-and-drop editor. Export as API. Great for non-coders on the team or rapid prototyping before writing custom code.",
        link: {
          label: "Dify Quick Start",
          url: "https://docs.dify.ai/en/use-dify/getting-started/quick-start",
        },
      },
      {
        title: "Qwen — Open-weight models you can run anywhere",
        content:
          "Qwen3 models are fully open-weight with 100+ language support. Run them locally with Ollama, on HuggingFace, or via API. Great if you need offline inference, custom fine-tuning, or want to avoid API costs.",
        snippet: `# Run Qwen3 locally with Ollama
ollama run qwen3:8b

# Or use the API
curl http://localhost:11434/api/generate \\
  -d '{"model": "qwen3:8b", "prompt": "Write a haiku about hackathons"}'`,
        lang: "bash",
        link: {
          label: "QwenLM/Qwen3",
          url: "https://github.com/QwenLM/Qwen3",
        },
      },
    ],
  },

  // ── 3. Voice, Video & Media ──
  {
    id: "media",
    icon: "mic",
    title: "Voice, Video & Media",
    description: "Add real-time communication and voice AI to your project.",
    entries: [
      {
        title: "Agora — Real-time video/voice in minutes",
        content:
          "Agora's SDK adds video calling, voice chat, and live streaming to any web or mobile app. Ultra-low latency (<400ms). Their Avatar SDK also lets you build AI-powered voice agents with visual avatars.",
        snippet: `import AgoraRTC from "agora-rtc-sdk-ng";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// Join a channel
await client.join(APP_ID, "my-channel", TOKEN, UID);

// Create and publish local tracks
const [micTrack, camTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
await client.publish([micTrack, camTrack]);`,
        lang: "typescript",
        link: {
          label: "Agora Video Call Guide",
          url: "https://docs.agora.io/en/video-calling/get-started/get-started-sdk",
        },
      },
      {
        title: "ElevenLabs — Text-to-speech & voice cloning",
        content:
          "Generate realistic speech from text, clone voices, or build real-time voice conversations. Works great for accessibility features, AI characters, podcast generators, or voice-first interfaces.",
        snippet: `import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({ apiKey: "your-key" });

const audio = await client.textToSpeech.convert("voice-id", {
  text: "Welcome to LotusHack 2026!",
  model_id: "eleven_multilingual_v2",
});

// audio is a ReadableStream — pipe to file or audio element`,
        lang: "typescript",
        link: {
          label: "ElevenLabs Examples",
          url: "https://github.com/elevenlabs/elevenlabs-examples",
        },
      },
    ],
  },

  // ── 4. Backend & Data ──
  {
    id: "backend",
    icon: "database",
    title: "Backend & Data",
    description: "Databases, cloud infra, and data pipelines.",
    entries: [
      {
        title: "Redis — Lightning-fast caching & vector search",
        content:
          "Use Redis as a cache (sub-millisecond reads), session store, real-time leaderboard, or even a vector database for AI embeddings. Redis Cloud gives you a managed instance in seconds.",
        snippet: `import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL });
await client.connect();

// Cache API responses
await client.set("user:123", JSON.stringify(userData), { EX: 3600 });
const cached = await client.get("user:123");

// Leaderboard
await client.zAdd("leaderboard", { score: 1500, value: "team-alpha" });
const top10 = await client.zRangeWithScores("leaderboard", 0, 9, { REV: true });`,
        lang: "typescript",
        link: {
          label: "Redis Quickstart",
          url: "https://redis.io/docs/latest/operate/rc/rc-quickstart/",
        },
      },
      {
        title: "AWS — Deploy anything at scale",
        content:
          "Use Lambda + API Gateway for serverless APIs, S3 for file storage, DynamoDB for NoSQL, and Bedrock for managed AI models. The free tier covers most hackathon workloads. Use SAM or CDK for infrastructure-as-code.",
        snippet: `# Deploy a serverless API with AWS SAM
sam init --runtime nodejs20.x --app-template hello-world
sam build
sam deploy --guided

# Or use the AWS SDK directly
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: "us-east-1" });`,
        lang: "bash",
        link: {
          label: "AWS Serverless Patterns",
          url: "https://github.com/aws-samples/serverless-patterns",
        },
      },
      {
        title: "Bright Data — Scrape any website without getting blocked",
        content:
          "Need training data, competitor analysis, or real-time web data? Bright Data handles proxies, CAPTCHAs, and anti-bot systems so you can focus on the data. Their MCP server also integrates with AI agents.",
        link: {
          label: "Bright Data MCP",
          url: "https://github.com/luminati-io/brightdata-mcp",
        },
      },
    ],
  },

  // ── 5. No-Code & Rapid Prototyping ──
  {
    id: "no-code",
    icon: "wand",
    title: "No-Code & Rapid Prototyping",
    description: "Ship faster with AI builders and visual tools.",
    entries: [
      {
        title: "Lovable — Describe it, get a full-stack app",
        content:
          "Tell Lovable what you want in plain English and it generates a complete React + Supabase app. Syncs to GitHub, deploys instantly. Perfect for non-technical teammates or rapid UI prototyping.",
        link: {
          label: "Lovable Docs",
          url: "https://docs.lovable.dev/",
        },
      },
      {
        title: "Replit — Code in the browser, deploy in one click",
        content:
          "Zero setup IDE with built-in hosting. Great for quick experiments, pair programming, or when your laptop dies at 3 AM. The AI agent can scaffold entire projects from a prompt.",
        link: {
          label: "Replit Getting Started",
          url: "https://docs.replit.com/getting-started/intro-replit",
        },
      },
      {
        title: "Trae — AI-native code editor",
        content:
          "Free VS Code alternative by ByteDance with deep AI integration. SOLO mode autonomously writes and debugs code. Builder mode plans and executes multi-file changes. Great for solo hackers or small teams.",
        link: {
          label: "Trae Agent",
          url: "https://github.com/bytedance/trae-agent",
        },
      },
      {
        title: "n8n — Automate anything with visual workflows",
        content:
          "Connect 400+ services, databases, and AI models without writing glue code. Drag-and-drop nodes for HTTP requests, data transforms, conditional logic, and AI agent chains. Self-host or use cloud.",
        snippet: `// n8n workflow example (JSON format)
// Trigger: Webhook → OpenAI Chat → Slack Message
{
  "nodes": [
    { "type": "n8n-nodes-base.webhook", "parameters": { "path": "/chat" } },
    { "type": "@n8n/n8n-nodes-langchain.openAi", "parameters": { "model": "gpt-4o" } },
    { "type": "n8n-nodes-base.slack", "parameters": { "channel": "#hackathon" } }
  ]
}`,
        lang: "json",
        link: {
          label: "n8n Quickstart",
          url: "https://docs.n8n.io/try-it-out/quickstart/",
        },
      },
      {
        title: "Manus / OpenManus — AI agent that builds for you",
        content:
          "Describe a task and Manus autonomously browses the web, writes code, runs commands, and delivers the result. Use OpenManus (open-source) to build your own autonomous agent workflows.",
        link: {
          label: "OpenManus",
          url: "https://github.com/FoundationAgents/OpenManus",
        },
      },
    ],
  },

  // ── 6. Prompt Engineering ──
  {
    id: "prompts",
    icon: "sparkle",
    title: "Prompt Engineering",
    description: "Craft better prompts — patterns that actually work.",
    entries: [
      {
        title: "The system prompt formula",
        content:
          "Every good AI app starts with a strong system prompt. Use this structure: Role + Context + Task + Constraints + Output Format. Be specific — vague prompts get vague results.",
        snippet: `const systemPrompt = \`You are a Vietnamese food expert helping hackathon participants find lunch nearby.

Context: LotusHack 2026 is at VNG Campus, Ho Chi Minh City. It's March, hot and humid.

Task: Recommend 3 restaurants within walking distance based on the user's preferences.

Constraints:
- Only suggest places open right now
- Include price range (budget: < 100k VND per person)
- Mention any dietary accommodations

Output: Return a JSON array with { name, cuisine, distance, priceRange, note }.\`;`,
        lang: "typescript",
      },
      {
        title: "Chain-of-thought for complex reasoning",
        content:
          'When your AI needs to solve multi-step problems, ask it to "think step by step." This dramatically improves accuracy for math, logic, debugging, and analysis tasks.',
        snippet: `const messages = [
  {
    role: "system",
    content: "You are a code reviewer. Think step by step before giving your verdict."
  },
  {
    role: "user",
    content: \`Review this function for bugs:

function calculateScore(votes) {
  return votes.reduce((sum, v) => sum + v.score) / votes.length;
}

Think through each potential issue before answering.\`
  }
];`,
        lang: "typescript",
      },
      {
        title: "Few-shot examples beat long instructions",
        content:
          "Instead of writing paragraphs explaining what you want, show 2-3 examples. Models learn patterns from examples faster than from instructions.",
        snippet: `const messages = [
  {
    role: "system",
    content: "Convert user descriptions into SQL queries."
  },
  { role: "user", content: "All users who signed up this week" },
  { role: "assistant", content: "SELECT * FROM users WHERE created_at >= NOW() - INTERVAL '7 days'" },
  { role: "user", content: "Top 10 teams by score" },
  { role: "assistant", content: "SELECT team_name, score FROM teams ORDER BY score DESC LIMIT 10" },
  // Now the model understands the pattern:
  { role: "user", content: "Count of projects per track" },
];`,
        lang: "typescript",
      },
      {
        title: "Structured output with JSON mode",
        content:
          "Force the model to return valid JSON by using response_format. This eliminates parsing headaches and makes your AI outputs reliable for frontend rendering.",
        snippet: `const response = await openai.chat.completions.create({
  model: "gpt-4o",
  response_format: { type: "json_object" },
  messages: [
    {
      role: "system",
      content: "Return a JSON object with: { summary: string, tags: string[], sentiment: 'positive' | 'negative' | 'neutral' }"
    },
    { role: "user", content: "This hackathon is amazing, I love the Vietnamese food!" }
  ],
});

const data = JSON.parse(response.choices[0].message.content);
// { summary: "...", tags: ["hackathon", "food"], sentiment: "positive" }`,
        lang: "typescript",
      },
      {
        title: "Tool calling / function calling",
        content:
          "Let the AI decide when to call your functions — database lookups, API calls, calculations. Define tools with JSON schemas and the model will invoke them with the right arguments.",
        snippet: `const tools = [{
  type: "function",
  function: {
    name: "search_sponsors",
    description: "Search for hackathon sponsors by category",
    parameters: {
      type: "object",
      properties: {
        category: { type: "string", enum: ["ai", "cloud", "tools"] },
        tier: { type: "string", enum: ["hero", "gold", "silver", "bronze"] },
      },
      required: ["category"],
    },
  },
}];

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "What AI sponsors do we have?" }],
  tools,
});

// Model returns: tool_calls[0].function = { name: "search_sponsors", arguments: '{"category":"ai"}' }`,
        lang: "typescript",
      },
    ],
  },

  // ── 7. Demo & Pitch Tips ──
  {
    id: "demo",
    icon: "presentation",
    title: "Demo & Pitch",
    description: "Win the judges — presentation matters as much as code.",
    entries: [
      {
        title: "Structure your 3-minute pitch",
        content:
          "1) Problem (30s) — What pain point are you solving? Make it relatable.\n2) Solution (60s) — Live demo, not slides. Show the product working.\n3) How it works (45s) — Quick tech overview. Mention sponsor tools you used.\n4) Impact (30s) — Who benefits? What's the scale potential?\n5) Ask (15s) — What's next? What would you build with more time?",
      },
      {
        title: "Demo the happy path first",
        content:
          "Show the core flow working perfectly before anything else. Judges have short attention spans. If your demo crashes, have a pre-recorded backup video. Screen record a successful run before judging starts.",
      },
      {
        title: "Name-drop sponsor tech",
        content:
          "Judges love hearing how you used sponsor tools creatively. \"We used Agora for real-time video, OpenAI for smart responses, and Redis for sub-millisecond caching\" is music to sponsor-judges' ears. It shows you explored the ecosystem.",
      },
      {
        title: "Your Devpost submission matters",
        content:
          "Include: clear project description, screenshots/video, tech stack list, challenges overcome, and what you learned. Many judges review Devpost before live demos. A polished submission sets expectations high.",
      },
    ],
  },

  // ── 8. Survival Tips ──
  {
    id: "survival",
    icon: "heart",
    title: "36-Hour Survival",
    description: "Stay healthy, productive, and sane through the hackathon.",
    entries: [
      {
        title: "Sleep strategy",
        content:
          "Don't skip sleep entirely — a 3-4 hour nap between 2-6 AM on Saturday makes you dramatically more productive on Sunday than pulling an all-nighter. Set an alarm. Your code at 4 AM is probably creating bugs, not fixing them.",
      },
      {
        title: "Commit early, commit often",
        content:
          "Push to Git every 30-60 minutes. Hackathon WiFi can be unreliable. Your laptop could die. \"It was working on my machine\" doesn't get you judging points. Deploy to a live URL early so you always have a demo-able version.",
      },
      {
        title: "Use the meals and snacks",
        content:
          "Friday: Snacks at 22:00. Saturday: Late Night Domino's at 01:00, Breakfast 08:00, Lunch 12:00, Dinner 18:00, Snacks 22:30. Sunday: McDonald's at 01:00, Breakfast 09:00, Lunch 12:30. You can't code on an empty stomach.",
      },
      {
        title: "Ask for help",
        content:
          "Mentors and sponsor engineers are there to help — use them. The Discord #help channel is active 24/7. Don't spend 2 hours stuck on a bug when someone can point you in the right direction in 5 minutes.",
      },
    ],
  },
];
