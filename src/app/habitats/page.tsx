import type { Metadata } from "next";
import Link from "next/link";
import { creatures } from "@/lib/creatures";
import { ElementChip } from "@/components/ui";

export const metadata: Metadata = {
  title: "Aniimo Habitats — Where Every Aniimo Spawns (Idyll Regions)",
  description:
    "Every Aniimo habitat in Idyll: Nimbus Fields, The Mistwoods, The Argent Strait, Echoback Landing, Beast Fang Ridge and more — with the full spawn list per region.",
  alternates: { canonical: "/habitats/" },
};

export default function HabitatsPage() {
  const byHab = new Map<string, typeof creatures>();
  for (const c of creatures) for (const h of c.base.habitats ?? []) {
    if (!byHab.has(h)) byHab.set(h, []);
    byHab.get(h)!.push(c);
  }
  const regions = [...byHab.entries()].sort((a, b) => b[1].length - a[1].length);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Habitats</h1>
      <p className="mt-2 max-w-3xl text-ink-soft">
        Where to find each Aniimo across the regions of Idyll. Spawn lists come from the official in-game index;
        this page groups them so you can plan a hunt region by region.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {regions.map(([region, list]) => (
          <section key={region} className="rounded-2xl border border-line bg-card p-5">
            <h2 className="font-display text-xl font-bold">{region}</h2>
            <p className="mt-0.5 text-sm text-ink-soft">{list.length} Aniimo spawn here</p>
            <div className="mt-3 space-y-1.5">
              {list.sort((a, b) => a.number - b.number).map((c) => (
                <Link key={c.slug} href={`/dex/${c.slug}/`} className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-black/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/creatures/${c.imageId}.webp`} alt={c.name} width={28} height={28} loading="lazy" className="h-7 w-7 object-contain" />
                  <span className="text-sm font-semibold">{c.name}</span>
                  <span className="ml-auto flex gap-1">{c.elements.map((e) => <ElementChip key={e} el={e} />)}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
