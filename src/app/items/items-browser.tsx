"use client";

import { useMemo, useState } from "react";

interface Item { id: string; name: string; category: string; subcategory: string; rarity: string }

const RARITY_STYLE: Record<string, string> = {
  Common: "bg-slate-100 text-slate-600 border-slate-200",
  Uncommon: "bg-green-50 text-green-700 border-green-200",
  Rare: "bg-blue-50 text-blue-700 border-blue-200",
  Epic: "bg-purple-50 text-purple-700 border-purple-200",
  Legendary: "bg-amber-50 text-amber-700 border-amber-200",
  Prismatic: "bg-teal-50 text-teal-700 border-teal-200",
};

const PAGE = 120;

export function ItemsBrowser({ items, categories, rarities }: { items: Item[]; categories: string[]; rarities: string[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [rar, setRar] = useState<string | null>(null);
  const [limit, setLimit] = useState(PAGE);

  const list = useMemo(() => {
    let r = items.filter((i) =>
      (!q || i.name.toLowerCase().includes(q.toLowerCase())) &&
      (!cat || i.category === cat) &&
      (!rar || i.rarity === rar)
    );
    r = [...r].sort((a, b) => (a.category === b.category ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category)));
    return r;
  }, [items, q, cat, rar]);

  const shown = list.slice(0, limit);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-2">
        <input value={q} onChange={(e) => { setQ(e.target.value); setLimit(PAGE); }} placeholder="Search items…"
          className="h-10 w-52 rounded-xl border border-line bg-card px-3 text-sm outline-none focus:border-brand" />
        <div className="flex flex-wrap gap-1">
          {categories.map((c) => (
            <button key={c} onClick={() => { setCat(cat === c ? null : c); setLimit(PAGE); }}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition ${cat === c ? "bg-ink text-paper" : "bg-ink/5 text-ink-soft hover:bg-ink/10"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          {rarities.map((r) => (
            <button key={r} onClick={() => { setRar(rar === r ? null : r); setLimit(PAGE); }}
              className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition ${rar === r ? "ring-2 ring-ink/30" : ""} ${RARITY_STYLE[r] ?? ""}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm text-ink-soft">
        {list.length} item{list.length === 1 ? "" : "s"}{cat ? ` in ${cat}` : ""}{rar ? ` · ${rar}` : ""}
      </p>

      <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-black/[0.03] text-left text-xs font-semibold text-ink-soft">
              <th className="px-4 py-2.5">Item</th>
              <th className="px-4 py-2.5">Category</th>
              <th className="hidden px-4 py-2.5 md:table-cell">Subcategory</th>
              <th className="px-4 py-2.5 text-right">Rarity</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((i) => (
              <tr key={i.id} className="border-b border-line/60 last:border-0 hover:bg-black/[0.02]">
                <td className="px-4 py-2 font-medium">{i.name}</td>
                <td className="px-4 py-2 text-ink-soft">{i.category}</td>
                <td className="hidden px-4 py-2 text-ink-soft md:table-cell">{i.subcategory}</td>
                <td className="px-4 py-2 text-right">
                  <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${RARITY_STYLE[i.rarity] ?? ""}`}>{i.rarity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {list.length > limit && (
        <div className="mt-4 text-center">
          <button onClick={() => setLimit(limit + PAGE)}
            className="cursor-pointer rounded-xl border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:bg-black/5">
            Show more ({list.length - limit} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
