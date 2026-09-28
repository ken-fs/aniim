import type { Metadata } from "next";
import Link from "next/link";
import { creatures } from "@/lib/creatures";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Aniimo Evolution & Resonance — Worth It or Not?",
  description:
    "Should you evolve? What do Omnisource Crystals actually buy you? A straight answer on evolution stages, resonance costs and variant forms.",
  alternates: { canonical: "/guides/evolution/" },
};

export default function EvolutionGuide() {
  const chains = creatures.filter((c) => c.base.evolutionHeads.length > 0);
  const longest = creatures
    .filter((c) => c.base.evolutionHeads.length >= 4)
    .sort((a, b) => b.base.evolutionHeads.length - a.base.evolutionHeads.length)
    .slice(0, 8);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10">
      <nav className="text-sm text-ink-soft">
        <Link href="/guides/" className="hover:text-brand">Guides</Link> <span className="mx-1">/</span> Evolution
      </nav>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Evolving and Resonance, without the confusion</h1>
      <p className="mt-3 text-lg text-ink-soft">
        Two systems, easy to mix up. Evolution makes your creature stronger by changing its stage. Resonance is a
        separate thing you pay for at level 55+. Here&apos;s how both work and when they&apos;re worth it.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">Evolution stages: Lumin, Gamma, Nova</h2>
      <p className="mt-2 text-ink-soft">
        Every evolution chain is labelled with three stage names, in this order: <strong>Lumin</strong>, then{" "}
        <strong>Gamma</strong>, then <strong>Nova</strong>. They show up in-game next to the creature&apos;s name.
      </p>
      <p className="mt-2 text-ink-soft">
        The important part is what stage does to your <em>catch</em> rate. Same area, same everything else:
      </p>
      <ul className="mt-3 space-y-1.5 text-ink-soft">
        <li>Lumin stage: 56% in early areas</li>
        <li>Gamma stage: 42%</li>
        <li>Nova stage: 28% — half the Lumin rate</li>
      </ul>
      <p className="mt-3 text-sm text-ink-soft">
        So if you&apos;re collecting rather than fighting, the earlier stage is genuinely the easier catch. Evolved stages
        are for your team; base stages are for your dex.
      </p>

      <h3 className="font-display mt-6 text-xl font-bold">Not everything evolves</h3>
      <p className="mt-2 text-ink-soft">
        Out of {creatures.length} Aniimo on the site right now, {chains.length} have evolution chains and{" "}
        {creatures.length - chains.length} are standalone — they never change form. If you&apos;re hunting a specific
        final form, check its page first; some of them you just catch directly.
      </p>

      <h3 className="font-display mt-6 text-xl font-bold">The longest chains</h3>
      <p className="mt-2 text-sm text-ink-soft">These are the multi-stage lines — expect to raise them for a while:</p>
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

      <h2 className="font-display mt-10 text-2xl font-bold">Resonance: what you actually pay</h2>
      <p className="mt-2 text-ink-soft">
        Every single Aniimo has the same two resonance tiers. No exceptions, no creature-specific costs:
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-black/[0.03] text-left text-xs font-semibold text-ink-soft">
              <th className="px-4 py-2.5">Tier</th>
              <th className="px-4 py-2.5">You need to be</th>
              <th className="px-4 py-2.5">It costs</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-line/70">
              <td className="px-4 py-2.5 font-semibold">LV 6</td>
              <td className="px-4 py-2.5">Level 55</td>
              <td className="px-4 py-2.5">1 Omnisource Crystal</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-semibold">LV 7</td>
              <td className="px-4 py-2.5">Level 65</td>
              <td className="px-4 py-2.5">2 Omnisource Crystals</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-ink-soft">
        Here&apos;s the catch: crystals are limited. Three per creature means you can fully unlock maybe three or four
        Aniimo, not twenty. So spend them on your keepers — the ones with 500+ base stats that you actually use — and
        ignore the rest until you&apos;re swimming in crystals.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">Wait, there are other forms too?</h2>
      <p className="mt-2 text-ink-soft">
        Yes, and this is where it gets interesting. Plenty of Aniimo come in alternate forms — Highland, Mountain Woods,
        Snowfield, Nighttime, and rarer ones like Prismana and Umbrabow. They usually keep the same name but change
        stats or even gain a second element. A few examples:
      </p>
      <ul className="mt-3 space-y-1.5 text-ink-soft">
        <li><Link href="/dex/magmarex/" className="font-semibold text-brand underline">Magmarex</Link> is Fire. Its Umbrabow form is Fire/Dark with a completely different stat line.</li>
        <li><Link href="/dex/cornet/" className="font-semibold text-brand underline">Cornet</Link> is Wind. Umbrabow Cornet adds Electric.</li>
        <li><Link href="/dex/turbo/" className="font-semibold text-brand underline">Turbo</Link> has a Cloudmist form, a Plateau form and an Umbrabow form, all with different numbers.</li>
      </ul>
      <p className="mt-3 text-sm text-ink-soft">
        Open any creature page and click the form tabs — the stats, element and skills update per form, so you can
        compare them side by side.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">A simple plan</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-soft">
        <li>Catch the base (Lumin) stage — cheapest catch rate in every area.</li>
        <li>Pick three creatures you actually enjoy and raise those. Everything else is collection.</li>
        <li>Hold your Omnisource Crystals until you have 3 saved, then fully unlock one keeper.</li>
        <li>Check the form tabs before you invest — sometimes the variant is the version you actually want.</li>
      </ol>

      <p className="mt-10 text-xs text-ink-soft">
        Stage names, form lists and resonance costs come from the official in-game index, cross-checked at launch.
        If a patch changes costs, this page gets re-checked.
      </p>

      <AdsterraBanner slot={RECTANGLE} className="mt-10" />
    </article>
  );
}
