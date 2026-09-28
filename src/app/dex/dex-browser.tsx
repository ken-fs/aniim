"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

interface Slim { slug: string; name: string; number: number; elements: string[]; role: string; imageId: string; total: number }

const EL_MAP: Record<string, string> = {
  fire: "fire", water: "water", grass: "flora", electric: "volt", ice: "frost",
  rock: "terra", wind: "gale", dark: "umbra", holy: "lumen",
};

export function DexBrowser({ creatures, elements, roles }: { creatures: Slim[]; elements: string[]; roles: string[] }) {
  const [q, setQ] = useState("");
  const [el, setEl] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [sort, setSort] = useState<"num" | "stats">("num");

  const list = useMemo(() => {
    let r = creatures.filter((c) =>
      (!q || c.name.toLowerCase().includes(q.toLowerCase())) &&
      (!el || c.elements.includes(el)) &&
      (!role || c.role === role)
    );
    if (sort === "stats") r = [...r].sort((a, b) => b.total - a.total);
    return r;
  }, [creatures, q, el, role, sort]);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Aniimo…"
          className="h-10 w-48 rounded-xl border border-line bg-card px-3 text-sm outline-none focus:border-brand"
        />
        <div className="flex flex-wrap gap-1">
          {elements.map((e) => (
            <button key={e} onClick={() => setEl(el === e ? null : e)}
              className={`el-chip cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${el === e ? "ring-2 ring-ink/30" : "opacity-70 hover:opacity-100"}`}
              style={{ ["--el" as string]: `var(--color-el-${EL_MAP[e] ?? "neutral"})` }}>
              {e}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {roles.map((r) => (
            <button key={r} onClick={() => setRole(role === r ? null : r)}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition ${role === r ? "bg-ink text-paper" : "bg-ink/5 text-ink-soft hover:bg-ink/10"}`}>
              {r}
            </button>
          ))}
        </div>
        <button onClick={() => setSort(sort === "num" ? "stats" : "num")}
          className="ml-auto cursor-pointer rounded-full border border-line bg-card px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-black/5">
          Sort: {sort === "num" ? "Dex №" : "Total stats"}
        </button>
      </div>

      <p className="mt-3 text-sm text-ink-soft">{list.length} result{list.length === 1 ? "" : "s"}</p>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {list.map((c) => (
          <Link key={c.slug} href={`/dex/${c.slug}/`} className="dex-card group flex flex-col items-center rounded-2xl border border-line bg-card p-4 text-center">
            <span className="self-start text-xs font-semibold text-ink-soft">#{String(c.number).padStart(3, "0")}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/creatures/${c.imageId}.webp`} alt={c.name} width={140} height={140} loading="lazy"
              className="my-1 h-28 w-28 object-contain transition-transform group-hover:scale-105" />
            <span className="font-display text-sm font-bold leading-tight">{c.name}</span>
            <span className="mt-1.5 flex flex-wrap justify-center gap-1">
              {c.elements.map((e) => (
                <span key={e} className="el-chip rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize"
                  style={{ ["--el" as string]: `var(--color-el-${EL_MAP[e] ?? "neutral"})` }}>{e}</span>
              ))}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
