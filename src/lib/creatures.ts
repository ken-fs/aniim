import raw from "@/data/forms.json";
import type { Creature, FormData } from "./forms-meta";

export type { Creature, FormData, Skill } from "./forms-meta";
export { FORM_LABELS, formLabel } from "./forms-meta";

const data = raw as unknown as Record<string, Record<string, FormData>>;

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildAll(): Creature[] {
  const list: Creature[] = [];
  for (const [itemId, forms] of Object.entries(data)) {
    const base = forms["basic-form"] ?? Object.values(forms)[0];
    if (!base?.name || !base.number) continue;
    list.push({
      itemId,
      slug: slugify(base.name),
      name: base.name,
      number: base.number,
      elements: base.elements?.length ? base.elements : [base.element],
      role: base.role,
      description: base.description,
      imageId: base.imageId ?? "",
      base,
      forms,
    });
  }
  return list.sort((a, b) => a.number - b.number);
}

export const creatures: Creature[] = buildAll();
export const creatureBySlug = new Map(creatures.map((c) => [c.slug, c]));

export const elements = [...new Set(creatures.flatMap((c) => c.elements))].sort();
export const roles = [...new Set(creatures.map((c) => c.role))].sort();

/** 栖息地 → 出现该地的生物 */
export function habitatIndex(): Map<string, Creature[]> {
  const m = new Map<string, Creature[]>();
  for (const c of creatures) {
    for (const h of c.base.habitats ?? []) {
      if (!m.has(h)) m.set(h, []);
      m.get(h)!.push(c);
    }
  }
  return m;
}
