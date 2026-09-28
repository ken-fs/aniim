import type { Metadata } from "next";
import Link from "next/link";
import chart from "@/data/type-chart.json";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";
import { creatures } from "@/lib/creatures";

export const metadata: Metadata = {
  title: "Aniimo Type Chart — Full Attack vs Defense Matrix",
  description:
    "The complete Aniimo type chart: a 9×9 attacker vs defender matrix (×1.6 super effective, ×0.625 resisted) plus per-element matchup lists and the best Aniimo of every type.",
  alternates: { canonical: "/type-chart/" },
};

const ELEMENTS = ["fire", "water", "grass", "electric", "ice", "rock", "wind", "dark", "holy"] as const;

/** 官方索引名 + 社区常用别名(便于两种叫法的搜索都能命中) */
const ELEMENT_META: Record<string, { label: string; alias?: string; varName: string }> = {
  fire: { label: "Fire", varName: "fire" },
  water: { label: "Water", varName: "water" },
  grass: { label: "Grass", varName: "flora" },
  electric: { label: "Electric", alias: "Lightning", varName: "volt" },
  ice: { label: "Ice", varName: "frost" },
  rock: { label: "Rock", alias: "Earth", varName: "terra" },
  wind: { label: "Wind", varName: "gale" },
  dark: { label: "Dark", varName: "umbra" },
  holy: { label: "Holy", alias: "Light", varName: "lumen" },
};

type Chart = Record<string, { strong: string[]; weak: string[]; takes_more: string[]; takes_less: string[] }>;
const c = chart as Chart;

function El({ name, short = false }: { name: string; short?: boolean }) {
  const m = ELEMENT_META[name];
  return (
    <span className="el-chip rounded-full px-2 py-0.5 text-xs font-semibold"
      style={{ ["--el" as string]: `var(--color-el-${m?.varName ?? "neutral"})` }}>
      {short ? m?.label : `${m?.label ?? name}${m?.alias ? ` (${m.alias})` : ""}`}
    </span>
  );
}

/** 攻击方 → 防御方 倍率 */
function mult(attacker: string, defender: string): number {
  const ch = c[attacker];
  if (!ch) return 1;
  if (ch.strong.includes(defender)) return 1.6;
  if (ch.weak.includes(defender)) return 0.625;
  return 1;
}

function Cell({ v }: { v: number }) {
  if (v === 1.6) return <span className="font-semibold text-green-700">1.6×</span>;
  if (v === 0.625) return <span className="font-semibold text-red-600">0.625×</span>;
  return <span className="text-ink-soft">–</span>;
}

export default function TypeChartPage() {
  const byEl = new Map<string, typeof creatures>();
  for (const cr of creatures) {
    for (const e of cr.elements) {
      if (!byEl.has(e)) byEl.set(e, []);
      byEl.get(e)!.push(cr);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Type Chart</h1>
      <p className="mt-2 max-w-3xl text-ink-soft">
        The full attacker-vs-defender matrix: <strong>rows are the attacking element</strong>, columns the defending
        element. <span className="font-semibold text-green-700">1.6×</span> = super effective,{" "}
        <span className="font-semibold text-red-600">0.625×</span> = resisted, <span className="text-ink-soft">–</span>{" "}
        = neutral (×1).
      </p>

      {/* 攻防矩阵 */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-line bg-black/[0.03]">
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-ink-soft">
                ATK ↓ / DEF →
              </th>
              {ELEMENTS.map((el) => (
                <th key={el} className="px-2 py-2.5 text-center">
                  <El name={el} short />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ELEMENTS.map((atk) => (
              <tr key={atk} className="border-b border-line/60 last:border-0">
                <td className="px-3 py-2"><El name={atk} short /></td>
                {ELEMENTS.map((def) => (
                  <td key={def} className={`px-2 py-2 text-center tabular-nums ${atk === def ? "bg-black/[0.02]" : ""}`}>
                    <Cell v={mult(atk, def)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-soft">
        Element names follow the in-game index (Electric / Rock / Holy) with community aliases (Lightning / Earth /
        Light). Cross-verified against two independent databases — 81/81 cells agree.
      </p>

      {/* 速查表 */}
      <h2 className="font-display mt-10 text-2xl font-bold">Quick reference</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-black/[0.03] text-left text-xs font-semibold text-ink-soft">
              <th className="px-4 py-3">Element</th>
              <th className="px-4 py-3">Counters <span className="font-mono">×1.6</span></th>
              <th className="px-4 py-3">Resisted by <span className="font-mono">×0.625</span></th>
              <th className="px-4 py-3">Weak to <span className="font-mono">×1.6</span></th>
              <th className="px-4 py-3">Resists <span className="font-mono">×0.625</span></th>
            </tr>
          </thead>
          <tbody>
            {ELEMENTS.map((el) => (
              <tr key={el} className="border-b border-line/70 last:border-0">
                <td className="px-4 py-3"><El name={el} short /></td>
                <td className="px-4 py-3">
                  <span className="flex flex-wrap gap-1">{c[el]?.strong.map((e) => <El key={e} name={e} short />)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex flex-wrap gap-1">{c[el]?.weak.map((e) => <El key={e} name={e} short />)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex flex-wrap gap-1">{c[el]?.takes_more.map((e) => <El key={e} name={e} short />)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex flex-wrap gap-1">{c[el]?.takes_less.map((e) => <El key={e} name={e} short />)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 元素详情 */}
      <section className="mt-10 space-y-8">
        {ELEMENTS.map((el) => (
          <div key={el} className="rounded-2xl border border-line bg-card p-5">
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="font-display text-xl font-bold">{ELEMENT_META[el]?.label}</h2>
              <El name={el} />
              <span className="text-sm text-ink-soft">{byEl.get(el)?.length ?? 0} Aniimo</span>
            </div>
            <p className="mt-2 text-sm text-ink-soft">
              Counters <strong>{c[el]?.strong.map((e) => ELEMENT_META[e]?.label).join(", ")}</strong> · is countered by{" "}
              <strong>{c[el]?.takes_more.map((e) => ELEMENT_META[e]?.label).join(", ") || "nothing"}</strong> · resists{" "}
              {c[el]?.takes_less.map((e) => ELEMENT_META[e]?.label).join(", ")}.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(byEl.get(el) ?? []).slice(0, 14).map((cr) => (
                <Link key={cr.slug} href={`/dex/${cr.slug}/`} className="flex items-center gap-1.5 rounded-full border border-line bg-paper py-1 pr-2.5 pl-1 hover:bg-black/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/creatures/${cr.imageId}.webp`} alt={cr.name} width={26} height={26} loading="lazy" className="h-6.5 w-6.5 object-contain" />
                  <span className="text-xs font-semibold">{cr.name}</span>
                </Link>
              ))}
              {(byEl.get(el)?.length ?? 0) > 14 && (
                <Link href="/dex/" className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-ink-soft hover:bg-black/5">
                  +{(byEl.get(el)?.length ?? 0) - 14} more
                </Link>
              )}
            </div>
          </div>
        ))}
      </section>
      <AdsterraBanner slot={RECTANGLE} className="mt-10" />
    </div>
  );
}
