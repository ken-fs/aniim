import type { Metadata } from "next";
import Link from "next/link";
import { CatchCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "Aniimo Catch Rate Calculator — Pods, Level Gap, HP & Alpha Odds",
  description:
    "Work out your exact Aniimo catch chance: pick area, stage, level gap, Aniipod, HP and backstab — the calculator applies every official multiplier and shows the boosts needed for 50% and 90% odds.",
  alternates: { canonical: "/catch-calculator/" },
};

export default function CatchCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is catch chance calculated in Aniimo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Outside battle: Base × Aniipod × Level × Backstab × Status. In battle: Base × Aniipod × Level × HP × Status. The base depends on the area band (32–56%) and the target's evolution stage, and is increased by your Pathfinder catch bonus from badges and branches.",
        },
      },
      {
        "@type": "Question",
        name: "How do I catch an Alpha Aniimo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alpha catch chance only depends on the pod: 6% base × Aniipod multiplier. Level gap, HP and backstab do not apply, so an Ultra-tier or sparkling pod is the only way to guarantee an Alpha.",
        },
      },
      {
        "@type": "Question",
        name: "Does leveling up improve catch rate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Being 15+ levels under a target multiplies catch chance by only ×0.1, while being within 10 levels keeps the multiplier at ×1. Leveling to within 10 of your target is often the biggest catch-rate upgrade available.",
        },
      },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Catch Rate Calculator</h1>
      <p className="mt-2 max-w-3xl text-ink-soft">
        Every multiplier from the game&apos;s official Probability Details, applied live. Set the situation on the left —
        the odds, the formula and the number of throws for 50% / 90% confidence update instantly.
      </p>

      <CatchCalculator />

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-bold">How to use it</h2>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-ink-soft">
            <li>Pick the <strong>area band</strong> — late-game areas halve your base odds versus early areas.</li>
            <li>Set your <strong>level difference</strong>: each level past +10 cuts the multiplier from ×1 to as low as ×0.1.</li>
            <li>Choose the <strong>pod you actually have</strong>. A Pro pod is ×1.5, Hyper ×2, Ultra-tier guarantees the catch.</li>
            <li>Outside battle, enable <strong>backstab</strong> (×1.5) — remember it does not work with Tumblers. In battle, drag HP down to watch the odds climb.</li>
            <li>Read the <strong>boosts needed</strong> numbers: that is how many additional throws give you 50% / 90% confidence, assuming the same setup.</li>
          </ol>
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">Related</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
            <li>→ <Link href="/guides/catch-chance/" className="font-semibold text-brand underline">Full catch-chance guide</Link> — every official table in one page.</li>
            <li>→ <Link href="/guides/beginner/" className="font-semibold text-brand underline">Beginner&apos;s roadmap</Link> — leveling order, badges and free pods.</li>
            <li>→ <Link href="/map/" className="font-semibold text-brand underline">Region explorer</Link> — find where each Aniimo spawns.</li>
            <li>→ <Link href="/codes/" className="font-semibold text-brand underline">Gift codes</Link> — grab free Aniipod Pro while it lasts.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
