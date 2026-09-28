// 客户端安全模块:只有类型和纯函数,不 import forms.json(避免把全量数据打进客户端 bundle)
export interface Skill {
  name: string;
  desc: string;
  type?: string;
  cost?: string;
  power?: string;
}
export interface FormData {
  url: string;
  name: string;
  number: number;
  element: string;
  elements: string[];
  role: string;
  description: string;
  stats: { total?: number; hp?: number; break?: number; atk?: number; mdef?: number; pdef?: number; regen?: number };
  imageId?: string;
  forms: string[];
  evolutionHeads: string[];
  evolutionStages: string[];
  habitats?: string[];
  mobility?: { name: string; desc: string };
  trait?: { name: string; desc: string };
  skills: Skill[];
  resonance: { level: string; req?: string; cost?: string }[];
}
export interface Creature {
  itemId: string;
  slug: string;
  name: string;
  number: number;
  elements: string[];
  role: string;
  description: string;
  imageId: string;
  base: FormData;
  forms: Record<string, FormData>;
}

export const FORM_LABELS: Record<string, string> = {
  "basic-form": "Basic",
  "highland-form": "Highland",
  "mountain-woods-form": "Mountain Woods",
  "prismana-form": "Prismana",
};

export function formLabel(slug: string) {
  return FORM_LABELS[slug] ?? slug.replace(/-form$/, "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
