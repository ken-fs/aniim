import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aniimo Guides — Catch Rate, Starters, Prismana & Egg Heist",
  description:
    "Plain-English Aniimo guides: what to do first, why your catches keep failing, every Prismana form, and how Operation: Egg Heist actually works.",
  alternates: { canonical: "/guides/" },
};

const GUIDES = [
  {
    href: "/guides/beginner/",
    title: "Just Started? Do These Five Things",
    desc: "Codes, starter pick, what the roles mean, and the level-gap mistake everyone makes in hour one.",
    tag: "Start here",
  },
  {
    href: "/guides/catch-chance/",
    title: "Why Do My Catches Keep Failing?",
    desc: "The catch formula in plain words. Level gap, HP, pods, backstab, Alphas — with the actual numbers.",
    tag: "Most useful",
  },
  {
    href: "/guides/probability-details/",
    title: "Aniimo Probability Details, Explained",
    desc: "Every official rate: lucky and superlucky pity, Vein Essence, Alpha held item drops and Sparkling odds.",
    tag: "Odds",
  },
  {
    href: "/guides/prismana/",
    title: "Prismana Forms: All 27 & How to Hatch Them",
    desc: "The rare forms — and the honest answer on whether they're worth chasing (they're not stronger).",
    tag: "Collecting",
  },
  {
    href: "/guides/egg-heist/",
    title: "Operation: Egg Heist, Explained",
    desc: "Rank ladder, Eggshell Coins, difficulty unlocks, free beginner rounds and the season reset rules.",
    tag: "Mode guide",
  },
  {
    href: "/guides/evolution/",
    title: "Evolving & Resonance: Worth It or Not?",
    desc: "What the stages do to your catch rate, what crystals really cost you, and the form variants nobody mentions.",
    tag: "Later game",
  },
];

export default function GuidesIndex() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Guides</h1>
      <p className="mt-2 text-ink-soft">Practical guides built from official data — no speculation, and every table can be verified in-game.</p>
      <p className="mt-2 text-sm text-ink-soft">
        Looking for one creature&apos;s stats, skills or habitat? Those live in the{" "}
        <Link href="/dex/" className="font-semibold text-brand underline">Aniimo Dex</Link>, with every Aniimo on one page.
      </p>
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
