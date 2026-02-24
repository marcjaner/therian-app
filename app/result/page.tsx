import type { Metadata } from "next";
import ResultClient from "./ResultClient";

interface Props {
  searchParams: Promise<{ animal?: string; score?: string; emoji?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const animal = (params.animal || "Wolf").toUpperCase();
  const score = params.score || "94";
  const emoji = params.emoji || "🐺";

  const ogUrl = `https://therian-app-iota.vercel.app/api/og?animal=${animal}&score=${score}&emoji=${encodeURIComponent(emoji)}`;

  return {
    title: `I am ${score}% ${animal} ${emoji} — THERIAN.`,
    description: `My voice matched ${animal} at ${score}%. What's your therian animal?`,
    openGraph: {
      title: `I am ${score}% ${animal} ${emoji}`,
      description: `My voice matched ${animal} at ${score}%. Find your animal at THERIAN.`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
      url: "https://therian-app-iota.vercel.app",
    },
    twitter: {
      card: "summary_large_image",
      title: `I am ${score}% ${animal} ${emoji}`,
      description: `My voice matched ${animal} at ${score}%. Find your animal.`,
      images: [ogUrl],
    },
  };
}

export default function ResultPage() {
  return <ResultClient />;
}
