"use client";

import { useState } from "react";
import Link from "next/link";
import type { Creature, FormData } from "@/lib/forms-meta";
import { formLabel } from "@/lib/forms-meta";
import { StatBars } from "@/components/ui";

const EL_MAP: Record<string, string> = {
  fire: "fire", water: "water", grass: "flora", electric: "volt", ice: "frost",
  rock: "terra", wind: "gale", dark: "umbra", holy: "lumen",
};

function SkillTable({ form }: { form: FormData }) {
  if (!form.skills?.length) return null;
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line bg-black/[0.03] text-left text-xs font-semibold text-ink-soft">
            <th className="px-4 py-2.5">Skill</th>
            <th className="hidden px-4 py-2.5 md:table-cell">Effect</th>
            <th className="px-4 py-2.5 text-right">Type</th>
            <th className="px-4 py-2.5 text-right">Cost</th>
            <th className="px-4 py-2.5 text-right">Power</th>
          </tr>
        </thead>
        <tbody>
          {form.skills.map((s, i) => (
            <tr key={i} className="border-b border-line/70 last:border-0">
              <td className="px-4 py-3 align-top font-semibold">{s.name}</td>
              <td className="hidden max-w-md px-4 py-3 align-top text-ink-soft md:table-cell">{s.desc}</td>
              <td className="px-4 py-3 text-right align-top">{s.type ?? "—"}</td>
              <td className="px-4 py-3 text-right align-top tabular-nums">{s.cost ?? "—"}</td>
              <td className="px-4 py-3 text-right align-top font-bold tabular-nums">{s.power ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FormViewer({ creature }: { creature: Creature }) {
  const formSlugs = Object.keys(creature.forms);
  const [active, setActive] = useState(formSlugs[0]);
  const form = creature.forms[active] ?? creature.base;

  return (
    <div>
      {formSlugs.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {formSlugs.map((s) => (
            <button key={s} onClick={() => setActive(s)}
              className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition ${active === s ? "bg-ink text-paper" : "border border-line bg-card hover:bg-black/5"}`}>
              {formLabel(s)}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-card p-5">
          <h2 className="font-display mb-4 text-lg font-bold">Base stats · {formLabel(active)}</h2>
          <StatBars stats={form.stats} />
          <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-sm">
            <span className="font-semibold text-ink-soft">Total</span>
            <span className="font-display text-2xl font-extrabold">{form.stats.total ?? "—"}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-card p-5">
          <h2 className="font-display mb-4 text-lg font-bold">Details · {formLabel(active)}</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex gap-2">{form.elements.map((e) => (
              <span key={e} className="el-chip rounded-full px-2.5 py-1 text-xs font-semibold capitalize"
                style={{ ["--el" as string]: `var(--color-el-${EL_MAP[e] ?? "neutral"})` }}>{e}</span>
            ))}</div>
            <div><dt className="text-ink-soft">Role</dt><dd className="font-semibold">{form.role}</dd></div>
            {form.trait && <div><dt className="text-ink-soft">Trait</dt><dd><span className="font-semibold">{form.trait.name}</span> — {form.trait.desc}</dd></div>}
            {form.mobility && <div><dt className="text-ink-soft">Mobility</dt><dd><span className="font-semibold">{form.mobility.name}</span> — {form.mobility.desc}</dd></div>}
            {form.habitats?.length ? (
              <div><dt className="text-ink-soft">Habitats</dt><dd className="font-semibold">{form.habitats.join(", ")}</dd></div>
            ) : null}
          </dl>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-display mb-3 text-lg font-bold">Combat skills · {formLabel(active)}</h2>
        <SkillTable form={form} />
      </div>

      {form.resonance?.length ? (
        <div className="mt-6">
          <h2 className="font-display mb-3 text-lg font-bold">Resonance training</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {form.resonance.map((r) => (
              <div key={r.level} className="rounded-xl border border-line bg-card p-3 text-sm">
                <div className="font-bold">{r.level}</div>
                {r.req && <div className="text-ink-soft">{r.req}</div>}
                {r.cost && <div className="mt-1 text-xs font-semibold text-brand">{r.cost}</div>}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <p className="mt-6 text-xs text-ink-soft">
        Data source: official Aniimo in-game index (wiki.aniimo.com). Some values may change with balance patches.{" "}
        <Link href="/about/" className="underline">About our data</Link>
      </p>
    </div>
  );
}
