import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aniimo Guides — Catch Rate, Starters, Evolution",
  description:
    "Aniimo guides built from official game data: the full catch formula, a beginner roadmap and how evolution and resonance work — no speculation.",
  alternates: { canonical: "/guides/" },
};

const GUIDES = [
  {
    href: "/guides/catch-chance/",
    title: "Catch Chance, Explained",
    desc: "The complete official catch formula — Aniipods, level gap, HP, backstab and every multiplier table, with worked examples.",
    tag: "Deep dive",
  },
  {
    href: "/guides/beginner/",
    title: "Beginner's Roadmap",
    desc: "What to do in your first hours: area progression, roles explained, which Aniimo to invest in and the traps to avoid.",
    tag: "New players",
  },
  {
    href: "/guides/evolution/",
    title: "Evolution & Resonance",
    desc: "Lumin, Gamma and Nova stages, what Resonance Training costs, and how to plan a long-term team.",
    tag: "Progression",
  },
];

export default function GuidesIndex() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Guides</h1>
      <p className="mt-2 text-ink-soft">Practical guides built from official data — no speculation, and every table can be verified in-game.</p>
      <div className="mt-8 space-y-3">
        {GUIDES.map((g) => (
          <Link key={g.href} href={g.href} className="dex-card block rounded-2xl border border-line bg-card p-5">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-bold text-brand">{g.tag}</span>
            </div>
            <h2 className="font-display mt-2 text-xl font-bold">{g.title}</h2>
            <p className="mt-1 text-sm text-ink-soft">{g.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
