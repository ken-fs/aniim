import type { Metadata } from "next";
import Link from "next/link";
import { creatures } from "@/lib/creatures";

export const metadata: Metadata = {
  title: "Aniimo Evolution & Resonance — Stages and Training Costs",
  description:
    "How Aniimo evolution stages work — Lumin, Gamma and Nova — plus the full breakdown of Resonance Training levels, requirements and Omnisource Crystal costs at launch.",
  alternates: { canonical: "/guides/evolution/" },
};

export default function EvolutionGuide() {
  const chains = creatures.filter((c) => c.base.evolutionHeads.length > 0);
  const longest = creatures
    .filter((c) => c.base.evolutionHeads.length >= 4)
    .sort((a, b) => b.base.evolutionHeads.length - a.base.evolutionHeads.length)
    .slice(0, 10);
  const dist: Record<number, number> = {};
  for (const c of creatures) dist[c.base.evolutionHeads.length] = (dist[c.base.evolutionHeads.length] ?? 0) + 1;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10">
      <nav className="text-sm text-ink-soft">
        <Link href="/guides/" className="hover:text-brand">Guides</Link> <span className="mx-1">/</span> Evolution &amp; Resonance
      </nav>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Evolution &amp; Resonance, Explained</h1>
      <p className="mt-2 text-lg text-ink-soft">
        Evolution changes a creature&apos;s stage — which also changes how hard it is to catch and how its stats read.
        Resonance is the separate level-55+ training track. Here is how both work, with the launch numbers.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">Evolution stages: Lumin → Gamma → Nova</h2>
      <p className="mt-2 text-ink-soft">
        The in-game index labels every evolution chain with three stage names: <strong>Lumin</strong>, then{" "}
        <strong>Gamma</strong>, then <strong>Nova</strong>. Stage matters in two ways:
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
        <li>
          <strong>Catch rates drop by stage.</strong> In an early-game area a Lumin-stage Aniimo is caught at 56% base,
          a Gamma at 42%, and a Nova at just 28% — and the gap stays proportional in every area band.
        </li>
        <li>
          <strong>Stat totals climb.</strong> Evolved stages are the ones that reach the top of the{" "}
          <Link href="/tier-list/" className="font-semibold text-brand underline">tier list</Link>; your early catches are
          future team members, not final forms.
        </li>
      </ul>
      <p className="mt-3 text-sm text-ink-soft">
        Not every Aniimo evolves. Across the {creatures.length} launch creatures,{" "}
        {chains.length} have evolution chains and {creatures.length - chains.length} are standalone.
        Chain lengths at launch: {[1, 2, 3, 4, 5].filter((n) => dist[n]).map((n) => `${dist[n]} with ${n} stage${n > 1 ? "s" : ""}`).join(", ")}.
      </p>

      <h3 className="font-display mt-6 text-xl font-bold">Longest evolution chains at launch</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {longest.map((c) => (
          <Link key={c.slug} href={`/dex/${c.slug}/`} className="flex items-center gap-2 rounded-full border border-line bg-card py-1 pr-3 pl-1 hover:bg-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/creatures/${c.imageId}.webp`} alt={c.name} width={32} height={32} loading="lazy" className="h-8 w-8 object-contain" />
            <span className="text-sm font-semibold">{c.name}</span>
            <span className="text-xs text-ink-soft">{c.base.evolutionHeads.length} stages</span>
          </Link>
        ))}
      </div>

      <h2 className="font-display mt-10 text-2xl font-bold">Resonance Training</h2>
      <p className="mt-2 text-ink-soft">
        Every Aniimo has two Resonance Training tiers, and the launch data is remarkably uniform across the whole dex:
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-black/[0.03] text-left text-xs font-semibold text-ink-soft">
              <th className="px-4 py-2.5">Tier</th>
              <th className="px-4 py-2.5">Requirement</th>
              <th className="px-4 py-2.5">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-line/70">
              <td className="px-4 py-2.5 font-semibold">LV 6</td>
              <td className="px-4 py-2.5">Reach level 55</td>
              <td className="px-4 py-2.5">Omnisource Crystal ×1</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-semibold">LV 7</td>
              <td className="px-4 py-2.5">Reach level 65</td>
              <td className="px-4 py-2.5">Omnisource Crystal ×2</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        All 88 launch Aniimo list identical Resonance tiers — so the real question is not whether a creature has
        resonance, but which creatures you spend Omnisource Crystals on. Spend them on keepers: 500+ base total,
        a role your team lacks, and an element that covers your worst matchup.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">Planning a long-term roster</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-soft">
        <li>Catch the Lumin stage early — it is the cheapest stage to catch, in every area, at every level.</li>
        <li>Level the chain&apos;s final stage as your main; the intermediate stages become collection entries.</li>
        <li>Budget Omnisource Crystals for 3–4 creatures, not 8. Two tiers per creature means 3 crystals each.</li>
        <li>Re-check the tier list after balance patches — totals shift, and this page regenerates from live data.</li>
      </ol>

      <p className="mt-10 text-xs text-ink-soft">
        Data source: official Aniimo in-game index (wiki.aniimo.com), retrieved at global launch. Stage names and
        catch-rate tables cross-checked against the game&apos;s official Probability Details.
      </p>
    </article>
  );
}
