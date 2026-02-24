"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

interface Result {
  rank: number;
  animal: string;
  emoji: string;
  score: number;
  trait: string;
}

const MOCK_RESULTS: Result[] = [
  { rank: 1, animal: "Wolf", emoji: "🐺", score: 94, trait: "pack leader energy, deep resonance, low harmonics" },
  { rank: 2, animal: "Raven", emoji: "🐦‍⬛", score: 71, trait: "sharp attack, erratic rhythm, high pitch spikes" },
  { rank: 3, animal: "Fox", emoji: "🦊", score: 58, trait: "midrange brightness, quick cadence, adaptive patterns" },
];

export default function ResultClient() {
  const [copied, setCopied] = useState(false);
  const topMatch = MOCK_RESULTS[0];
  const otherMatches = MOCK_RESULTS.slice(1);

  const handleShare = async () => {
    const shareText = `I am ${topMatch.score}% ${topMatch.animal.toUpperCase()} ${topMatch.emoji} – what's your therian?`;
    const shareUrl = `https://therian-app-iota.vercel.app/result?animal=${topMatch.animal}&score=${topMatch.score}&emoji=${encodeURIComponent(topMatch.emoji)}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: "THERIAN.", text: shareText, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(`${shareText} → ${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // user cancelled — do nothing
    }
  };

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white">
      <div className="mx-auto flex w-full max-w-[375px] flex-col gap-4">
        <section className="border border-amber p-5">
          <p className="text-xs font-bold tracking-[0.2em] text-amber">RANK #1</p>
          <h1 className="mt-2 text-4xl font-extrabold uppercase tracking-[0.08em]">
            {topMatch.animal} {topMatch.emoji}
          </h1>
          <p className="mt-2 text-lg font-bold tracking-[0.12em] text-amber">
            {topMatch.score}% MATCH
          </p>
          <div className="mt-3 h-3 w-full border border-amber">
            <motion.div
              className="h-full bg-amber"
              initial={{ width: 0 }}
              animate={{ width: `${topMatch.score}%` }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </div>
          <p className="mt-3 text-sm text-zinc-300">{topMatch.trait}</p>
        </section>

        {otherMatches.map((result) => (
          <section key={result.rank} className="border border-zinc-700 p-4">
            <p className="text-[0.65rem] font-bold tracking-[0.2em] text-zinc-400">RANK #{result.rank}</p>
            <h2 className="mt-1 text-2xl font-bold uppercase tracking-[0.06em]">
              {result.animal} {result.emoji}
            </h2>
            <p className="mt-1 text-sm font-bold tracking-[0.12em] text-amber">
              {result.score}% MATCH
            </p>
            <div className="mt-2 h-2.5 w-full border border-zinc-600">
              <motion.div
                className="h-full bg-amber"
                initial={{ width: 0 }}
                animate={{ width: `${result.score}%` }}
                transition={{ duration: 0.9, ease: "easeOut", delay: result.rank * 0.1 }}
              />
            </div>
            <p className="mt-2 text-xs text-zinc-400">{result.trait}</p>
          </section>
        ))}

        <button
          type="button"
          onClick={handleShare}
          className="w-full bg-amber px-4 py-3 text-sm font-extrabold tracking-[0.1em] text-black"
        >
          {copied ? "COPIED!" : "SHARE YOUR RESULT"}
        </button>

        <Link href="/" className="text-center text-sm font-semibold tracking-[0.08em] text-zinc-300 underline">
          TRY AGAIN
        </Link>

        <section className="mt-2 bg-amber p-5 text-black">
          <h3 className="text-2xl font-extrabold uppercase tracking-[0.06em]">
            UNLOCK YOUR FULL PROFILE
          </h3>
          <p className="mt-2 text-sm font-medium">
            See all 8 animals, voice breakdown, and your therian history.
          </p>
          <a
            href="https://buy.stripe.com/8x2cN74GrfJcgmv0GBfw402"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full bg-black px-4 py-3 text-center text-sm font-extrabold tracking-[0.1em] text-amber"
          >
            JOIN WAITLIST →
          </a>
        </section>
      </div>
    </main>
  );
}
