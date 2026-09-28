import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aniimo Catch Chance Formula — Every Multiplier Explained",
  description:
    "The complete Aniimo catch-rate formula from the official Probability Details: base catch chance by area, level gap, HP, backstab and status multipliers, Aniipod tiers and Alpha odds — with worked examples.",
  alternates: { canonical: "/guides/catch-chance/" },
};

function Table({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="not-prose overflow-x-auto rounded-2xl border border-line bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line bg-black/[0.03] text-left text-xs font-semibold text-ink-soft">
            {head.map((h) => <th key={h} className="px-4 py-2.5">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-line/70 last:border-0">
              {r.map((c, j) => <td key={j} className={`px-4 py-2 ${j > 0 ? "tabular-nums" : "font-medium"}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CatchChanceGuide() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10">
      <nav className="text-sm text-ink-soft">
        <Link href="/guides/" className="hover:text-brand">Guides</Link> <span className="mx-1">/</span> Catch Chance
      </nav>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Catch Chance, Explained</h1>
      <p className="mt-2 text-lg text-ink-soft">
        Every number on this page comes from the game&apos;s official Probability Details. Once you understand the
        multipliers, you stop wasting Aniipods — and know exactly when a catch is worth attempting.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">The two formulas</h2>
      <div className="mt-4 space-y-3">
        <div className="rounded-2xl border border-line bg-card p-4 text-sm">
          <div className="mb-1 font-semibold text-ink-soft">Outside battle</div>
          <code className="block text-[13px] leading-relaxed">
            Final Catch Chance = Base × Aniipod × Level × Backstab × Status
          </code>
        </div>
        <div className="rounded-2xl border border-line bg-card p-4 text-sm">
          <div className="mb-1 font-semibold text-ink-soft">In battle</div>
          <code className="block text-[13px] leading-relaxed">
            Final Catch Chance = Base × Aniipod × Level × HP × Status
          </code>
        </div>
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        The difference matters: the in-battle formula swaps the Backstab bonus (×1.5, out-of-battle/behind only) for the
        HP multiplier (up to ×2 at low HP). Alpha Aniimo use a separate rule entirely — see below.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">1. Base catch chance</h2>
      <p className="mt-2 text-ink-soft">
        Base chance depends on where you are in the world and the target&apos;s evolution stage. Late-game areas halve your odds,
        and Nova-stage Aniimo are the hardest common targets.
      </p>
      <div className="mt-4">
        <Table
          head={["Area band", "Lumin stage", "Gamma stage", "Nova stage"]}
          rows={[
            ["Early-game areas", "56%", "42%", "28%"],
            ["Early-mid-game areas", "50%", "38%", "25%"],
            ["Mid-game areas", "44%", "33%", "22%"],
            ["Mid-late-game areas", "38%", "29%", "19%"],
            ["Late-game areas", "32%", "24%", "16%"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Then that base is scaled once more: <strong>Base = Aniimo&apos;s Base × (1 + Pathfinder&apos;s Catch Bonus)</strong>,
        where the bonus comes from Branches and Regional Badges. Collecting badges is a permanent catch-rate upgrade —
        prioritize them.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">2. Level multiplier (level gap)</h2>
      <p className="mt-2 text-ink-soft">
        Level Difference = Aniimo Level − Pathfinder Level. Being underleveled is brutal — each level past +10 cuts the
        multiplier hard.
      </p>
      <div className="mt-4">
        <Table
          head={["Level difference", "Multiplier"]}
          rows={[
            ["≤ +10", "×1"], ["+11", "×0.8"], ["+12", "×0.6"], ["+13", "×0.4"], ["+14", "×0.2"], ["≥ +15", "×0.1"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Practical takeaway: if an Aniimo is 15+ levels above you, even a top-tier Aniipod barely helps. Level up first or
        soften the target in battle (low HP multiplies up to ×2).
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">3. Aniipod multiplier</h2>
      <div className="mt-4">
        <Table
          head={["Capture item", "Multiplier"]}
          rows={[
            ["Aniipod", "×1"],
            ["Aniipod Pro", "×1.5"],
            ["Aniipod Hyper / Trace / Mega", "×2"],
            ["Tumbler", "×2"],
            ["Tumbler (for Aniimo gathered by Nurture)", "×6"],
            ["Aniipod Ultra / Sparkling Cube / Legendary Aniipod", "Guaranteed success"],
          ]}
        />
      </div>

      <h2 className="font-display mt-10 text-2xl font-bold">4. HP multiplier (in-battle only)</h2>
      <p className="mt-2 text-ink-soft">Lower remaining HP means a better catch chance:</p>
      <div className="mt-4">
        <Table
          head={["Target HP remaining", "Multiplier"]}
          rows={[["0%", "×2"], ["5%", "×1.65"], ["10%", "×1.26"], ["50%", "×1.1"], ["80%", "×1"], ["90%", "×0.9"], ["100%", "×0.8"]]}
        />
      </div>

      <h2 className="font-display mt-10 text-2xl font-bold">5. Backstab &amp; status</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
        <li><strong>Backstab multiplier ×1.5</strong> — applies outside battle or from behind; it does <em>not</em> stack with Tumblers.</li>
        <li><strong>Status multiplier</strong> — depends on the Aniimo&apos;s behavior or status. When several are active: if any debuff is present, the lowest multiplier applies; otherwise the highest applies. Keeping a target calm/neutral therefore protects your multiplier.</li>
      </ul>

      <h2 className="font-display mt-10 text-2xl font-bold">Alpha Aniimo are different</h2>
      <p className="mt-2 text-ink-soft">
        Alphas ignore level gap, HP and backstab entirely. Their rule is simply:
      </p>
      <div className="mt-3 rounded-2xl border border-line bg-card p-4 text-sm">
        <code>Chance = Alpha base (6%) × Aniipod multiplier</code>
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        That means vs. an Alpha, your only lever is the pod tier: a Hyper/Trace pod turns 6% into 12%, and Ultra-tier
        pods guarantee it. Save guaranteed pods for Alphas you actually want.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">Worked examples</h2>
      <div className="mt-4 space-y-3 text-sm">
        <div className="rounded-2xl border border-line bg-card p-4">
          <div className="font-semibold">Chasing a Nova-stage Aniimo in a late-game area at +12 levels</div>
          <p className="mt-1 text-ink-soft">
            16% base × 0.6 (level) × 1.5 (Aniipod Pro) = <strong>14.4%</strong> outside battle. Catch it in battle at 5% HP
            instead: 16% × 0.6 × 1.5 × 1.65 = <strong>23.8%</strong> — nearly double. Aniipod Hyper would push it to ×2:
            31.7% in-battle.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-card p-4">
          <div className="font-semibold">Same target, but you are 5 levels above it</div>
          <p className="mt-1 text-ink-soft">
            Level multiplier is ×1: 16% × 1 × 1.5 = <strong>24%</strong> with a Pro pod out of battle; with backstab ×1.5
            that becomes <strong>36%</strong>. Leveling past your targets is the single biggest catch-rate upgrade in the game.
          </p>
        </div>
      </div>

      <h2 className="font-display mt-10 text-2xl font-bold">Related launch odds worth knowing</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
        <li><strong>Sparkling styles:</strong> ~99% Common / 1% Dazzling from wild Sparkling Cubes; eggs from Operation: Egg Heist can roll Shadow (1%) instead of Dazzling.</li>
        <li><strong>Nurture via Vein Essence:</strong> 3% chance to trigger Prismana Flow directly; 480 Prismatic Energy can be traded for a direct trigger; pity at 10,500 Prismana.</li>
      </ul>

      <p className="mt-10 text-xs text-ink-soft">
        Source: Aniimo official Probability Details (aniimo.com/formula-multipliers), retrieved at global launch. Values can
        change with patches — always re-check in-game after updates.
      </p>
    </article>
  );
}
