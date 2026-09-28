import Link from "next/link";
import type { Creature } from "@/lib/creatures";

/** 元素名 → 色板变量名(对应 globals.css 的 --color-el-*) */
const EL_MAP: Record<string, string> = {
  fire: "fire", water: "water", grass: "flora", electric: "volt", ice: "frost",
  rock: "terra", wind: "gale", dark: "umbra", holy: "lumen",
};

export function ElementChip({ el }: { el: string }) {
  const v = EL_MAP[el.toLowerCase()] ?? "neutral";
  return (
    <span className="el-chip rounded-full px-2 py-0.5 text-xs font-semibold capitalize" style={{ ["--el" as string]: `var(--color-el-${v})` }}>
      {el}
    </span>
  );
}

export function RoleChip({ role }: { role: string }) {
  return <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs font-semibold text-ink-soft">{role}</span>;
}

export function CreatureCard({ c }: { c: Creature }) {
  return (
    <Link href={`/dex/${c.slug}/`} className="dex-card group flex flex-col items-center rounded-2xl border border-line bg-card p-4 text-center">
      <span className="self-start text-xs font-semibold text-ink-soft">#{String(c.number).padStart(3, "0")}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/creatures/${c.imageId}.webp`}
        alt={c.name}
        width={160}
        height={160}
        loading="lazy"
        className="my-1 h-32 w-32 object-contain transition-transform group-hover:scale-105"
      />
      <span className="font-display text-base font-bold leading-tight">{c.name}</span>
      <span className="mt-1.5 flex flex-wrap justify-center gap-1">
        {c.elements.map((e) => <ElementChip key={e} el={e} />)}
      </span>
    </Link>
  );
}

const STAT_LABELS: [string, string][] = [
  ["hp", "HP"], ["atk", "ATK"], ["pdef", "P.DEF"], ["mdef", "M.DEF"], ["break", "BREAK"], ["regen", "REGEN"],
];

export function StatBars({ stats, color = "var(--color-brand)" }: { stats: Record<string, number | undefined>; color?: string }) {
  const max = 150;
  return (
    <div className="space-y-2">
      {STAT_LABELS.map(([k, label]) => {
        const v = stats[k] ?? 0;
        return (
          <div key={k} className="flex items-center gap-3 text-sm">
            <span className="w-14 shrink-0 font-semibold text-ink-soft">{label}</span>
            <div className="stat-bar flex-1"><div style={{ width: `${Math.min(100, (v / max) * 100)}%`, background: color }} /></div>
            <span className="w-8 text-right font-bold tabular-nums">{v}</span>
          </div>
        );
      })}
    </div>
  );
}

export function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-5">
      <h2 className="font-display text-2xl font-bold tracking-tight">{children}</h2>
      {sub && <p className="mt-1 text-sm text-ink-soft">{sub}</p>}
    </div>
  );
}
