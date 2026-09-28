import type { Metadata } from "next";
import Link from "next/link";
import { creatures } from "@/lib/creatures";
import { ElementChip, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Aniimo Elements — Every Type and the Aniimo That Use It",
  description:
    "All Aniimo elements at launch — fire, water, grass, electric, ice, rock, wind, dark and holy — with the full creature list, counts and dual-element combos.",
  alternates: { canonical: "/elements/" },
};

const EL_MAP: Record<string, string> = {
  fire: "fire", water: "water", grass: "flora", electric: "volt", ice: "frost",
  rock: "terra", wind: "gale", dark: "umbra", holy: "lumen",
};

const EL_NOTES: Record<string, string> = {
  fire: "Burn pressure and area damage. Fire Aniimo apply stacking Fire Debuffs that punish prolonged fights.",
  water: "Slippery control and sustain — Water kits lean on debuff application and safe ranged poke.",
  grass: "Attrition and regeneration. Grass Aniimo win long engagements through heals and growth effects.",
  electric: "Burst mobility. Electric kits convert speed into damage, with stun windows for teammates.",
  ice: "Lockdown. Ice Aniimo slow and freeze targets, buying time for BREAK windows.",
  rock: "Front-line stability. Rock creatures trade speed for defense and unshakeable break damage.",
  wind: "Displacement. Wind kits reposition enemies and dodge through attacks with stackable mobility.",
  dark: "Ambush damage. Dark Aniimo hit hardest from behind — pair with Backstab tactics.",
  holy: "Support and anti-debuff tools. Holy Aniimo cleanse, shield and enable the rest of the team.",
};

export default function ElementsPage() {
  const byEl = new Map<string, typeof creatures>();
  for (const c of creatures) for (const e of c.elements) {
    if (!byEl.has(e)) byEl.set(e, []);
    byEl.get(e)!.push(c);
  }
  const duals = creatures.filter((c) => c.elements.length > 1);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Elements</h1>
      <p className="mt-2 max-w-3xl text-ink-soft">
        {byEl.size} elements shape team building in Aniimo. The official damage-multiplier table is published in-game
        under Probability Details — below is what each element plays like and the full list of Aniimo that use it.
      </p>

      <div className="mt-8 space-y-10">
        {[...byEl.entries()].sort((a, b) => b[1].length - a[1].length).map(([el, list]) => (
          <section key={el} id={el} className="scroll-mt-24">
            <div className="mb-2 flex items-center gap-3">
              <h2 className="font-display text-2xl font-bold capitalize">{el}</h2>
              <ElementChip el={el} />
              <span className="text-sm text-ink-soft">{list.length} Aniimo</span>
            </div>
            <p className="mb-4 max-w-3xl text-sm text-ink-soft">{EL_NOTES[el] ?? ""}</p>
            <div className="flex flex-wrap gap-2">
              {list.map((c) => (
                <Link key={c.slug} href={`/dex/${c.slug}/`} className="flex items-center gap-2 rounded-full border border-line bg-card py-1 pr-3 pl-1 hover:bg-black/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/creatures/${c.imageId}.webp`} alt={c.name} width={32} height={32} loading="lazy" className="h-8 w-8 object-contain" />
                  <span className="text-sm font-semibold">{c.name}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <SectionTitle sub={`${duals.length} Aniimo carry two elements`}>Dual-element Aniimo</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {duals.map((c) => (
            <Link key={c.slug} href={`/dex/${c.slug}/`} className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm font-semibold hover:bg-black/5">
              {c.name}
              <span className="flex gap-1">{c.elements.map((e) => <span key={e} className="text-xs capitalize text-ink-soft">{e}</span>)}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
