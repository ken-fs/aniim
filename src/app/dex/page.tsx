import type { Metadata } from "next";
import { creatures, elements, roles } from "@/lib/creatures";
import { DexBrowser } from "./dex-browser";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: `Aniimo Dex — All ${creatures.length} Aniimo with Stats & Forms`,
  description: `Complete Aniimo index: all ${creatures.length} creatures with official base stats, elements, roles, forms and habitats. Filter by element and role.`,
  alternates: { canonical: "/dex/" },
};

export default function DexPage() {
  const slim = creatures.map((c) => ({
    slug: c.slug, name: c.name, number: c.number, elements: c.elements, role: c.role,
    imageId: c.imageId, total: c.base.stats.total ?? 0,
  }));
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Dex</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        The Aniimo Dex lists all {creatures.length} Aniimo available at global launch, with base stats from the
        in-game index. Filter by element or role, then click a creature for skills, evolutions, forms and habitats.
        Want to know where to find one? Check the <a href="/map/" className="font-semibold text-brand underline">Aniimo map</a>.
      </p>
      <DexBrowser creatures={slim} elements={elements} roles={roles} />
      <AdsterraBanner slot={RECTANGLE} className="mt-10" />
    </div>
  );
}
