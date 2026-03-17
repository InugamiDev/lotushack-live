import { NextResponse } from "next/server";

/**
 * POST /api/perks/verify
 * Stub endpoint — replace with real Luma DB lookup.
 * For now, returns mock codes for any input so the UI can be tested.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.email || !body?.phone) {
    return NextResponse.json(
      { error: "Email and phone number are required." },
      { status: 400 },
    );
  }

  // TODO: Replace with real verification against Luma/database
  const mockPerks = [
    {
      sponsor: "OpenAI",
      logo: "/assets/svg/sponsors/openai-white.svg",
      description:
        "API credits for GPT-4o, o1, and DALL-E during the hackathon",
      value: "API Credits",
      accent: "jade",
      code: "sk-lh26-XXXX-XXXX-XXXX",
    },
    {
      sponsor: "ElevenLabs",
      logo: "/assets/svg/sponsors/elevenlabs-white.svg",
      description: "Text-to-speech and voice AI API access",
      value: "API Credits",
      accent: "lotus",
      code: "el-lh26-XXXX-XXXX",
    },
    {
      sponsor: "Agora",
      logo: "/assets/svg/sponsors/agora-white.svg",
      description:
        "Real-time voice, video, and interactive live streaming SDK",
      value: "API Credits",
      accent: "gold",
      code: "agora-lh26-XXXX-XXXX",
    },
    {
      sponsor: "Redis",
      logo: "/assets/svg/sponsors/redis-white.svg",
      description: "Redis Cloud database credits for your project",
      value: "Cloud Credits",
      accent: "amber",
      code: "redis-lh26-XXXX-XXXX",
    },
    {
      sponsor: "n8n",
      logo: "/assets/svg/sponsors/n8n-white.svg",
      description: "Workflow automation platform credits",
      value: "Pro Access",
      accent: "jade",
      code: "n8n-lh26-XXXX-XXXX",
    },
    {
      sponsor: "Exa",
      logo: "/assets/svg/sponsors/exa-white.svg",
      description: "AI-powered search API for your hackathon project",
      value: "API Credits",
      accent: "gold",
      code: "exa-lh26-XXXX-XXXX",
    },
  ];

  return NextResponse.json({ perks: mockPerks });
}
