import raw from "@/data/items.json";

// Item pages:每个物品一个 URL(/items/<slug>/)。
// slug 规则:name 转 kebab;同名或撞 slug 的追加 -<id>;为空用 item-<id>。
// ⚠️ slug 必须稳定、唯一 —— sitemap 和页面共用本文件的同一份计算。

export interface Item {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  rarity: string;
}

export const RARITY_STYLE: Record<string, string> = {
  Common: "bg-slate-100 text-slate-600 border-slate-200",
  Uncommon: "bg-green-50 text-green-700 border-green-200",
  Rare: "bg-blue-50 text-blue-700 border-blue-200",
  Epic: "bg-purple-50 text-purple-700 border-purple-200",
  Legendary: "bg-amber-50 text-amber-700 border-amber-200",
  Prismatic: "bg-teal-50 text-teal-700 border-teal-200",
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

type RawItem = { name?: string; englishName?: string; category?: string; subcategory?: string; qualityName?: string };

function buildAll(): Item[] {
  const data = raw.items as unknown as Record<string, RawItem>;
  const base = Object.entries(data).map(([id, v]) => ({
    id,
    name: v.englishName || v.name || `Item #${id}`,
    category: v.category || "Other",
    subcategory: v.subcategory || "",
    rarity: v.qualityName || "Common",
  }));

  const counts = new Map<string, number>();
  for (const it of base) {
    const s = slugify(it.name);
    counts.set(s, (counts.get(s) ?? 0) + 1);
  }

  const seen = new Set<string>();
  const list: Item[] = [];
  for (const it of base) {
    let s = slugify(it.name);
    if (!s || (counts.get(s) ?? 0) > 1 || seen.has(s)) s = `${s || "item"}-${it.id}`;
    while (seen.has(s)) s = `${s}-${it.id}`;
    seen.add(s);
    list.push({ ...it, slug: s });
  }
  return list;
}

export const items: Item[] = buildAll();
export const itemBySlug = new Map(items.map((i) => [i.slug, i]));

/** 分类一句话(每页 About 段用,只写确定的事实) */
export const CATEGORY_BLURB: Record<string, string> = {
  Currency: "One of Aniimo's in-game currencies and progression tokens.",
  Material: "A material used across the world of Idyll for crafting, upgrades and quests.",
  Egg: "An Aniimo egg — hatch it to add an Aniimo to your team.",
  Equipment: "Equipment for your Aniimo.",
  Aniimo: "An item tied to a specific Aniimo — relics, buffs and appearances live here.",
  "Key Item": "A key item used for progression: eggs, resonance materials, runes and home supplies.",
  Homeland: "A Homeland item — furniture, seeds, home materials and treasures for your home base.",
  Other: "A miscellaneous item — appearances, chips, gear and reward chests.",
  Special: "A special item from events and milestones.",
  Backpack: "A backpack item.",
  "Carried Item Core": "A core for Held Items.",
};

/** 子类补充一句(仅限名字/来源里能看出的,不编机制) */
export const SUBCATEGORY_BLURB: Record<string, string> = {
  Furniture: "Furniture for your Homeland.",
  "Home materials": "A home-base supply — seeds, recipe notes and other Homeland materials.",
  Seed: "Seeds for planting in the Homeland.",
  "Rare Item": "A resource collected out in the world.",
  "Quest Item": "A quest item tied to the main story and side quests.",
  "Held Item": "A held item that can be equipped to an Aniimo.",
  "Held Item - Rune": "A rune that can be equipped to an Aniimo as a held item.",
  Chest: "A relic chest item tied to an Aniimo.",
  Buff: "An item that grants a buff.",
  Appearance: "A cosmetic appearance item.",
  "Appearance Pack": "A cosmetic appearance set.",
  "Resonance Material": "A resonance material used to upgrade an Aniimo.",
  Currency: "A currency item.",
  "Skill Points": "A skill point token used for progression.",
  EXP: "An experience item used for leveling.",
  Treasure: "A treasure found while exploring.",
  Egg: "An egg item.",
  "Recipe Note": "A recipe note for Homeland crafting.",
  Chip: "A chip item.",
  Gear: "A gear item.",
  Inventory: "A backpack item that affects what you can carry.",
};
