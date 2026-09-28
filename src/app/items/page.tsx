import type { Metadata } from "next";
import itemsData from "@/data/items.json";
import { ItemsBrowser } from "./items-browser";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: `Aniimo Items Database — All ${Object.keys(itemsData.items).length} Items`,
  description:
    "Every Aniimo item in one searchable database: currencies, materials, eggs, equipment and homeland items with rarity and category filters.",
  alternates: { canonical: "/items/" },
};

export default function ItemsPage() {
  const items = Object.entries(itemsData.items).map(([id, v]) => ({
    id,
    name: v.englishName || v.name,
    category: v.category,
    subcategory: v.subcategory,
    rarity: v.qualityName,
  }));
  const categories = [...new Set(items.map((i) => i.category))].sort();
  const rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Prismatic"];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Items Database</h1>
      <p className="mt-2 max-w-3xl text-ink-soft">
        All <strong>{items.length}</strong> items in Aniimo, pulled from the game&apos;s item tables — currencies,
        materials, eggs, equipment and homeland furniture. Filter by category or rarity, or search by name.
      </p>
      <ItemsBrowser items={items} categories={categories} rarities={rarities} />
      <AdsterraBanner slot={RECTANGLE} className="mt-10" />
    </div>
  );
}
