"use client";

import { useMemo, useState } from "react";

/** 官方 Probability Details 的乘数表(全部来自官方页面,未插值猜数) */
const AREAS = [
  { id: "early", label: "Early-game areas", base: { lumin: 56, gamma: 42, nova: 28 } },
  { id: "emid", label: "Early-mid-game areas", base: { lumin: 50, gamma: 38, nova: 25 } },
  { id: "mid", label: "Mid-game areas", base: { lumin: 44, gamma: 33, nova: 22 } },
  { id: "mlate", label: "Mid-late-game areas", base: { lumin: 38, gamma: 29, nova: 19 } },
  { id: "late", label: "Late-game areas", base: { lumin: 32, gamma: 24, nova: 16 } },
] as const;

const STAGES = [
  { id: "lumin", label: "Lumin stage" },
  { id: "gamma", label: "Gamma stage" },
  { id: "nova", label: "Nova stage" },
] as const;

/** 等级差 → 乘数(区间步进,官方离散表) */
function levelMult(diff: number): number {
  if (diff <= 10) return 1;
  if (diff >= 15) return 0.1;
  return { 11: 0.8, 12: 0.6, 13: 0.4, 14: 0.2 }[diff] ?? 1;
}

/** HP 剩余 % → 乘数(官方断点之间线性插值) */
const HP_POINTS: [number, number][] = [[0, 2], [5, 1.65], [10, 1.26], [50, 1.1], [80, 1], [90, 0.9], [100, 0.8]];
function hpMult(hp: number): number {
  for (let i = 0; i < HP_POINTS.length - 1; i++) {
    const [x1, y1] = HP_POINTS[i];
    const [x2, y2] = HP_POINTS[i + 1];
    if (hp <= x2) return y1 + ((hp - x1) / (x2 - x1)) * (y2 - y1);
  }
  return 0.8;
}

interface Pod { id: string; label: string; m: number; noBackstab?: boolean; guaranteed?: boolean }
const PODS: Pod[] = [
  { id: "basic", label: "Aniipod", m: 1 },
  { id: "pro", label: "Aniipod Pro", m: 1.5 },
  { id: "hyper", label: "Aniipod Hyper / Trace / Mega", m: 2 },
  { id: "tumbler", label: "Tumbler", m: 2, noBackstab: true },
  { id: "nurture", label: "Tumbler (Nurture-gathered target)", m: 6, noBackstab: true },
  { id: "ultra", label: "Aniipod Ultra / Sparkling Cube / Legendary", m: 0, guaranteed: true },
];

function attempts(p: number, target: number): number | null {
  if (p <= 0) return null;
  if (p >= 1) return 1;
  return Math.ceil(Math.log(1 - target) / Math.log(1 - p));
}

function pct(x: number) {
  return `${(x * 100).toFixed(1)}%`;
}

export function CatchCalculator() {
  const [alpha, setAlpha] = useState(false);
  const [area, setArea] = useState<(typeof AREAS)[number]["id"]>("early");
  const [stage, setStage] = useState<(typeof STAGES)[number]["id"]>("lumin");
  const [diff, setDiff] = useState(0);
  const [mode, setMode] = useState<"outside" | "battle">("outside");
  const [backstab, setBackstab] = useState(false);
  const [hp, setHp] = useState(100);
  const [pod, setPod] = useState<string>("pro");
  const [bonus, setBonus] = useState(0);

  const result = useMemo(() => {
    const podDef = PODS.find((p) => p.id === pod)!;
    const lm = levelMult(diff);
    const hm = mode === "battle" ? hpMult(hp) : 1;
    const bs = mode === "outside" && backstab && !podDef.noBackstab ? 1.5 : 1;

    if (alpha) {
      const p = podDef.guaranteed ? 1 : Math.min(1, 0.06 * podDef.m);
      return {
        chance: p,
        parts: [{ label: "Alpha base", value: "6%" }, { label: "Aniipod", value: podDef.guaranteed ? "guaranteed" : `×${podDef.m}` }],
        lm, hm, bs, base: 6,
      };
    }
    const base = AREAS.find((a) => a.id === area)!.base[stage] / 100 * (1 + bonus / 100);
    const gear = podDef.guaranteed ? null : podDef.m;
    const raw = podDef.guaranteed ? 1 : base * lm * gear! * bs * hm;
    return {
      chance: Math.min(1, raw),
      parts: [
        { label: "Base", value: `${(base * 100).toFixed(1)}%` },
        { label: "Level", value: `×${lm}` },
        { label: "Aniipod", value: podDef.guaranteed ? "guaranteed" : `×${podDef.m}` },
        ...(mode === "outside" ? [{ label: "Backstab", value: `×${bs}` }] : [{ label: "HP", value: `×${hm.toFixed(2)}` }]),
      ],
      lm, hm, bs, base,
    };
  }, [alpha, area, stage, diff, mode, backstab, hp, pod, bonus]);

  const n50 = attempts(result.chance, 0.5);
  const n90 = attempts(result.chance, 0.9);
  const podDef = PODS.find((p) => p.id === pod)!;
  const backstabDisabled = Boolean(podDef.noBackstab);

  const selCls = "h-10 w-full rounded-xl border border-line bg-card px-3 text-sm outline-none focus:border-brand";
  const segCls = (on: boolean) =>
    `cursor-pointer rounded-xl px-3 py-2 text-sm font-semibold transition ${on ? "bg-ink text-paper" : "border border-line bg-card hover:bg-black/5"}`;

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* 输入 */}
      <div className="space-y-5 rounded-3xl border border-line bg-card p-5">
        <div className="flex flex-wrap items-center gap-2">
          <button className={segCls(!alpha)} onClick={() => setAlpha(false)}>Wild Aniimo</button>
          <button className={segCls(alpha)} onClick={() => setAlpha(true)}>Alpha Aniimo</button>
          {alpha && <span className="text-xs text-ink-soft">Alphas ignore level gap, HP and backstab — only your pod matters.</span>}
        </div>

        {!alpha && (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-ink-soft">Area band</span>
                <select className={selCls} value={area} onChange={(e) => setArea(e.target.value as typeof area)}>
                  {AREAS.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-ink-soft">Target evolution stage</span>
                <select className={selCls} value={stage} onChange={(e) => setStage(e.target.value as typeof stage)}>
                  {STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-ink-soft">
                  Level difference (target − you): {diff > 0 ? `+${diff}` : diff}
                </span>
                <input type="range" min={-10} max={20} value={diff} onChange={(e) => setDiff(Number(e.target.value))} className="w-full accent-[var(--color-brand)]" />
                <span className="mt-0.5 block text-xs text-ink-soft">Multiplier ×{result.lm}</span>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-ink-soft">Pathfinder catch bonus (badges/branches): {bonus}%</span>
                <input type="range" min={0} max={100} step={5} value={bonus} onChange={(e) => setBonus(Number(e.target.value))} className="w-full accent-[var(--color-brand)]" />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button className={segCls(mode === "outside")} onClick={() => setMode("outside")}>Outside battle</button>
              <button className={segCls(mode === "battle")} onClick={() => setMode("battle")}>In battle</button>
              {mode === "outside" ? (
                <label className={`flex items-center gap-2 text-sm font-semibold ${backstabDisabled ? "opacity-40" : ""}`}>
                  <input type="checkbox" disabled={backstabDisabled} checked={backstab && !backstabDisabled} onChange={(e) => setBackstab(e.target.checked)} className="h-4 w-4 accent-[var(--color-brand)]" />
                  Backstab (×1.5){backstabDisabled ? " — disabled with Tumblers" : ""}
                </label>
              ) : (
                <label className="flex flex-1 items-center gap-3 text-sm font-semibold">
                  HP left: {hp}%
                  <input type="range" min={0} max={100} value={hp} onChange={(e) => setHp(Number(e.target.value))} className="flex-1 accent-[var(--color-brand)]" />
                  <span className="text-xs text-ink-soft">×{result.hm.toFixed(2)}</span>
                </label>
              )}
            </div>
          </>
        )}

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-ink-soft">Capture item</span>
          <select className={selCls} value={pod} onChange={(e) => setPod(e.target.value)}>
            {PODS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </label>

        {!alpha && diff > 10 && (
          <p className="rounded-xl bg-brand-soft px-3 py-2 text-xs text-brand">
            ⚠️ You are {diff} levels under. Leveling to within +10 would raise the level multiplier from ×{result.lm} to ×1 — often the single biggest upgrade available.
          </p>
        )}
      </div>

      {/* 结果 */}
      <div className="h-fit rounded-3xl border border-line bg-card p-5 lg:sticky lg:top-20">
        <div className="text-xs font-semibold text-ink-soft">Final catch chance</div>
        <div className="font-display mt-1 text-5xl font-extrabold tabular-nums text-brand">{pct(result.chance)}</div>
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-soft">
          {result.parts.map((p) => (
            <span key={p.label}><span className="font-semibold text-ink">{p.label}</span> {p.value}</span>
          ))}
        </div>
        {!alpha && (
          <div className="mt-3 rounded-xl bg-black/[0.03] p-3 text-xs text-ink-soft">
            {result.parts.map((p) => p.value).join(" × ")}
          </div>
        )}
        <div className="mt-4 space-y-1.5 border-t border-line pt-3 text-sm">
          <div className="flex justify-between"><span className="text-ink-soft">Boosts for 50% odds</span><span className="font-bold tabular-nums">{n50 ?? "—"} catch{n50 === 1 ? "" : "es"}</span></div>
          <div className="flex justify-between"><span className="text-ink-soft">Boosts for 90% odds</span><span className="font-bold tabular-nums">{n90 ?? "—"} catch{n90 === 1 ? "" : "es"}</span></div>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-ink-soft">
          Not modelled: the status/behavior multiplier (documented as situational — debuffed targets use the <em>lowest</em> active
          multiplier, otherwise the highest). Full tables: <a className="underline" href="/guides/catch-chance/">catch chance guide</a> · source: official
          Probability Details.
        </p>
      </div>
    </div>
  );
}
