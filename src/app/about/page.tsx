import type { Metadata } from "next";
import Link from "next/link";
import { creatures } from "@/lib/creatures";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About aniim.org — Data Sources & Editorial Policy",
  description: "How aniim.org builds the Aniimo database: where the data comes from, how often it is updated, and how to report a correction.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">About {site.name}</h1>
      <p className="mt-3 text-ink-soft">
        {site.name} is an unofficial fan database for <strong>Aniimo</strong>, the open-world creature-collecting ARPG
        by Pawprint Studio. We index {creatures.length} Aniimo with their official stats, skills, evolution chains and
        habitats, and we keep the practical stuff — codes, catch odds, tier data — in the same place.
      </p>

      <h2 className="font-display mt-8 text-xl font-bold">Where the data comes from</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
        <li><strong>Creature stats, skills, evolution, habitats:</strong> the official in-game index (wiki.aniimo.com), which mirrors what the game itself shows players.</li>
        <li><strong>Catch probabilities:</strong> the official Probability Details page published by the developer.</li>
        <li><strong>Gift codes:</strong> community-reported and cross-checked against official announcements; each codes page shows the date it was last verified.</li>
        <li><strong>Artwork:</strong> official creature renders served from the developer&apos;s CDN, used under the fan-site convention of this game&apos;s community.</li>
      </ul>

      <h2 className="font-display mt-8 text-xl font-bold">Editorial policy</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
        <li>We do not invent numbers. Anything unverifiable is marked as such or left out.</li>
        <li>When community sources disagree, we say so instead of picking one silently.</li>
        <li>The <Link href="/tier-list/" className="font-semibold text-brand underline">tier list</Link> is generated from official base totals, so you can audit every placement — it is a baseline, not a substitute for matchup knowledge.</li>
      </ul>

      <h2 className="font-display mt-8 text-xl font-bold">Corrections</h2>
      <p className="mt-3 text-ink-soft">
        Spotted an outdated number or a missing creature? The game patches weekly and we re-sync on a schedule; a
        report with a screenshot speeds it up enormously. Reach us through the contact listed in the site profile.
      </p>

      <p className="mt-8 rounded-2xl border border-line bg-card p-4 text-sm text-ink-soft">
        {site.name} is not affiliated with, endorsed by, or sponsored by Pawprint Studio or Kingnet. Aniimo and all
        related assets are trademarks of their respective owners.
      </p>
    </div>
  );
}
