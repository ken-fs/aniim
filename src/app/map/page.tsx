import type { Metadata } from "next";
import Link from "next/link";
import { creatures } from "@/lib/creatures";
import { MapExplorer } from "./map-explorer";
import { regionSlug } from "@/lib/forms-meta";

export const metadata: Metadata = {
  title: "Aniimo Map — Interactive Region Explorer",
  description:
    "Find where every Aniimo spawns. Pick a region — Russet Highlands, Beast Fang Ridge, Nimbus Fields — or search a creature to see all its areas.",
  alternates: { canonical: "/map/" },
};

export default function MapPage() {
  const byRegion = new Map<string, typeof creatures>();
  for (const c of creatures) {
    for (const h of c.base.habitats ?? []) {
      if (!byRegion.has(h)) byRegion.set(h, []);
      byRegion.get(h)!.push(c);
    }
  }
  const regions = [...byRegion.entries()]
    .map(([name, list]) => ({
      name,
      slug: regionSlug(name),
      creatures: list
        .sort((a, b) => a.number - b.number)
        .map((c) => ({ slug: c.slug, name: c.name, number: c.number, elements: c.elements, imageId: c.imageId, total: c.base.stats.total ?? 0 })),
    }))
    .sort((a, b) => b.creatures.length - a.creatures.length);

  const covered = new Set(creatures.filter((c) => (c.base.habitats ?? []).length > 0).map((c) => c.slug)).size;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Map &amp; Region Explorer</h1>
      <p className="mt-2 max-w-3xl text-ink-soft">
        Every one of Idyll&apos;s <strong>{regions.length} spawn regions</strong>, with the full Aniimo that live there
        ({covered} of {creatures.length} indexed creatures have confirmed habitats). Pick a region on the left, or search
        a creature to see where to hunt it.
      </p>
      <p className="mt-1 text-xs text-ink-soft">
        This is a spawn-data explorer, not a game-accurate geographic map — region positions and terrain are not modelled.
      </p>

      <MapExplorer regions={regions} />

      <section className="mt-12 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-card p-5">
          <h2 className="font-display text-lg font-bold">Hunting tips</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
            <li>→ Catch odds drop by stage: Lumin 56% / Gamma 42% / Nova 28% base in early areas. Start with Lumin forms.</li>
            <li>→ The <Link href="/catch-calculator/" className="font-semibold text-brand underline">catch calculator</Link> shows your exact odds for any pod, level gap and HP.</li>
            <li>→ Habitats come from the official in-game index; a creature can appear in several regions — the more regions, the more common it is.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-card p-5">
          <h2 className="font-display text-lg font-bold">Browse instead</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
            <li>→ <Link href="/habitats/" className="font-semibold text-brand underline">Habitat list view</Link> — same data, plain pages, easier to scan.</li>
            <li>→ <Link href="/dex/" className="font-semibold text-brand underline">Full dex</Link> — filter by element and role.</li>
            <li>→ <Link href="/elements/" className="font-semibold text-brand underline">Elements</Link> — which type counters which.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
