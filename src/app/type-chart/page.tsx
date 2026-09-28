import type { Metadata } from "next";
import Link from "next/link";
import chart from "@/data/type-chart.json";
import { creatures } from "@/lib/creatures";

export const metadata: Metadata = {
  title: "Aniimo Type Chart — Element Strengths & Weaknesses",
  description:
    "The full Aniimo element chart: what each of the 9 types beats (×1.6), what it is weak to (×0.625), and which Aniimo to bring for every matchup.",
  alternates: { canonical: "/type-chart/" },
};

const ELEMENTS = ["fire", "water", "grass", "electric", "ice", "rock", "wind", "dark", "holy"] as const;

const EL_MAP: Record<string, string> = {
  fire: "fire", water: "water", grass: "flora", electric: "volt", ice: "frost",
  rock: "terra", wind: "gale", dark: "umbra", holy: "lumen",
};

type Chart = Record<string, { strong: string[]; weak: string[]; takes_more: string[]; takes_less: string[] }>;
const c = chart as Chart;

function El({ name }: { name: string }) {
  return (
    <span className="el-chip rounded-full px-2 py-0.5 text-xs font-semibold capitalize"
      style={{ ["--el" as string]: `var(--color-el-${EL_MAP[name] ?? "neutral"})` }}>
      {name}
    </span>
  );
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
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Type Chart</h1>
      <p className="mt-2 max-w-3xl text-ink-soft">
        Nine elements, two multipliers: <strong>×1.6</strong> when you counter, <strong>×0.625</strong> when you are
        countered. Below is the full relationship table plus the best Aniimo to bring for each element.
      </p>

      {/* 速查表 */}
      <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-black/[0.03] text-left text-xs font-semibold text-ink-soft">
              <th className="px-4 py-3">Element</th>
              <th className="px-4 py-3">Counters <span className="font-mono">×1.6</span></th>
              <th className="px-4 py-3">Weak to <span className="font-mono">×0.625</span></th>
              <th className="px-4 py-3">Takes more from <span className="font-mono">×1.6</span></th>
              <th className="px-4 py-3">Takes less from <span className="font-mono">×0.625</span></th>
            </tr>
          </thead>
          <tbody>
            {ELEMENTS.map((el) => (
              <tr key={el} className="border-b border-line/70 last:border-0">
                <td className="px-4 py-3"><El name={el} /></td>
                <td className="px-4 py-3">
                  <span className="flex flex-wrap gap-1">{c[el]?.strong.map((e) => <El key={e} name={e} />)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex flex-wrap gap-1">{c[el]?.weak.map((e) => <El key={e} name={e} />)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex flex-wrap gap-1">{c[el]?.takes_more.map((e) => <El key={e} name={e} />)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex flex-wrap gap-1">{c[el]?.takes_less.map((e) => <El key={e} name={e} />)}</span>
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
              <h2 className="font-display text-xl font-bold capitalize">{el}</h2>
              <El name={el} />
              <span className="text-sm text-ink-soft">{byEl.get(el)?.length ?? 0} Aniimo</span>
            </div>
            <p className="mt-2 text-sm text-ink-soft">
              Counters <strong>{c[el]?.strong.join(", ")}</strong> · is countered by{" "}
              <strong>{c[el]?.takes_more.join(", ") || "nothing"}</strong> · resists {c[el]?.takes_less.join(", ")}.
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

      <p className="mt-8 text-xs text-ink-soft">
        Multipliers verified against in-game damage behaviour and community databases; element names use the official
        in-game index naming. Last cross-checked 28 September 2026.
      </p>
    </div>
  );
}
