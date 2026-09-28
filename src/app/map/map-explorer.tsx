"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

interface Slim { slug: string; name: string; number: number; elements: string[]; imageId: string; total: number }
interface Region { name: string; slug: string; creatures: Slim[] }

const EL_MAP: Record<string, string> = {
  fire: "fire", water: "water", grass: "flora", electric: "volt", ice: "frost",
  rock: "terra", wind: "gale", dark: "umbra", holy: "lumen",
};

function ElementPip({ el }: { el: string }) {
  return (
    <span className="el-chip rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize"
      style={{ ["--el" as string]: `var(--color-el-${EL_MAP[el] ?? "neutral"})` }}>{el}</span>
  );
}

export function MapExplorer({ regions }: { regions: Region[] }) {
  const [active, setActive] = useState(regions[0]?.slug ?? "");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"size" | "az">("size");

  // 支持 /map/?region=xxx 深链(来自生物详情页)
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("region");
    if (r && regions.some((x) => x.slug === r)) setActive(r);
  }, [regions]);

  const sorted = useMemo(
    () => (sort === "size" ? regions : [...regions].sort((a, b) => a.name.localeCompare(b.name))),
    [regions, sort]
  );
  const current = regions.find((r) => r.slug === active) ?? regions[0];

  const query = q.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!query) return null;
    return { creatures: regions.flatMap((r) => r.creatures).filter((c) => c.name.toLowerCase().includes(query)) };
  }, [query, regions]);

  // 搜索时按生物聚合,显示每个生物的所在区域
  const searchResults = useMemo(() => {
    if (!matches) return null;
    const seen = new Map<string, Slim>();
    for (const c of matches.creatures) seen.set(c.slug, c);
    return [...seen.values()].map((c) => ({
      creature: c,
      regions: regions.filter((r) => r.creatures.some((x) => x.slug === c.slug)),
    }));
  }, [matches, regions]);

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* 左:区域列表 + 搜索 */}
      <div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a creature…"
          className="h-10 w-full rounded-xl border border-line bg-card px-3 text-sm outline-none focus:border-brand"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-ink-soft">
          <span>{regions.length} regions</span>
          <button onClick={() => setSort(sort === "size" ? "az" : "size")}
            className="cursor-pointer rounded-full border border-line bg-card px-2.5 py-1 font-semibold hover:bg-black/5">
            {sort === "size" ? "By size" : "A–Z"}
          </button>
        </div>
        <div className="mt-2 max-h-[560px] space-y-1.5 overflow-y-auto pr-1">
          {sorted.map((r) => (
            <button
              key={r.slug}
              onClick={() => { setQ(""); setActive(r.slug); }}
              className={`flex w-full cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-left transition ${
                r.slug === active && !query ? "border-ink/30 bg-card shadow-sm" : "border-line bg-card/60 hover:bg-card"
              }`}
            >
              <span className="font-display text-sm font-bold">{r.name}</span>
              <span className="ml-auto text-xs font-bold tabular-nums text-ink-soft">{r.creatures.length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 右:选中区域 / 搜索结果 */}
      <div>
        {searchResults ? (
          <div>
            <h2 className="font-display text-xl font-bold">“{q}” — {searchResults.length} match{searchResults.length === 1 ? "" : "es"}</h2>
            <div className="mt-3 space-y-2">
              {searchResults.map(({ creature, regions: rs }) => (
                <div key={creature.slug} className="flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-card px-3 py-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/creatures/${creature.imageId}.webp`} alt={creature.name} width={40} height={40} className="h-10 w-10 object-contain" />
                  <Link href={`/dex/${creature.slug}/`} className="font-display text-sm font-bold hover:text-brand">#{String(creature.number).padStart(3, "0")} {creature.name}</Link>
                  <span className="ml-auto flex flex-wrap gap-1">
                    {rs.map((r) => (
                      <button key={r.slug} onClick={() => { setQ(""); setActive(r.slug); }}
                        className="cursor-pointer rounded-full border border-line bg-paper px-2.5 py-1 text-xs font-semibold hover:bg-black/5">
                        {r.name}
                      </button>
                    ))}
                  </span>
                </div>
              ))}
              {searchResults.length === 0 && (
                <p className="text-sm text-ink-soft">
                  No creature matches “{q}”. Try the <Link href="/dex/" className="font-semibold text-brand underline">full dex</Link>.
                </p>
              )}
            </div>
          </div>
        ) : current ? (
          <div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="font-display text-2xl font-bold">{current.name}</h2>
              <span className="text-sm text-ink-soft">{current.creatures.length} Aniimo spawn here</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {current.creatures.map((c) => (
                <Link key={c.slug} href={`/dex/${c.slug}/`} className="dex-card group flex flex-col items-center rounded-2xl border border-line bg-card p-3 text-center">
                  <span className="self-start text-xs font-semibold text-ink-soft">#{String(c.number).padStart(3, "0")}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/creatures/${c.imageId}.webp`} alt={c.name} width={120} height={120} loading="lazy"
                    className="my-1 h-24 w-24 object-contain transition-transform group-hover:scale-105" />
                  <span className="font-display text-sm font-bold leading-tight">{c.name}</span>
                  <span className="mt-1 flex flex-wrap justify-center gap-1">
                    {c.elements.map((e) => <ElementPip key={e} el={e} />)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
