import type { Metadata } from "next";
import { items } from "@/lib/items";
import { ItemsBrowser } from "./items-browser";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: `Aniimo Items Database — All ${items.length} Items`,
  description:
    "Every Aniimo item in one searchable database: currencies, materials, eggs, equipment and homeland items with rarity and category filters — each item with its own page.",
  alternates: { canonical: "/items/" },
};

export default function ItemsPage() {
  const browserItems = items.map((i) => ({
    id: i.id,
    slug: i.slug,
    name: i.name,
    category: i.category,
    subcategory: i.subcategory,
    rarity: i.rarity,
  }));
  const categories = [...new Set(items.map((i) => i.category))].sort();
  const rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Prismatic"];
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Items Database</h1>
      <p className="mt-2 max-w-3xl text-ink-soft">
        All <strong>{items.length}</strong> items in Aniimo, pulled from the game&apos;s item tables — currencies,
        materials, eggs, equipment and homeland furniture. Filter by category or rarity, or search by name.
      </p>
      <ItemsBrowser items={browserItems} categories={categories} rarities={rarities} />
      <AdsterraBanner slot={RECTANGLE} className="mt-10" />

      <details className="mt-10 rounded-2xl border border-line bg-card p-5">
        <summary className="cursor-pointer font-display text-lg font-bold">Browse all {items.length.toLocaleString("en-US")} items A–Z</summary>
        <div className="mt-4 columns-2 gap-x-6 text-xs sm:columns-3 lg:columns-4">
          {sorted.map((i) => (
            <a key={i.slug} href={`/items/${i.slug}/`} className="block break-inside-avoid py-0.5 text-ink-soft hover:text-brand">
              {i.name}
            </a>
          ))}
        </div>
      </details>
    </div>
  );
}
