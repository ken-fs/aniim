import type { Metadata } from "next";
import Link from "next/link";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Aniimo Catch Rate — How It Actually Works",
  description:
    "Why do some catches fail ten times in a row? Here's the actual catch formula in plain words, with every multiplier table and real examples.",
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
        <Link href="/guides/" className="hover:text-brand">Guides</Link> <span className="mx-1">/</span> Catch Rate
      </nav>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Why do my catches keep failing?</h1>
      <p className="mt-3 text-lg text-ink-soft">
        Catching in Aniimo isn&apos;t random. It&apos;s one multiplication with five numbers in it, and once you know
        what they are, you stop guessing. Everything below is straight from the developers&apos; own probability page.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">The short version</h2>
      <ul className="mt-3 space-y-2 text-ink-soft">
        <li>Being underleveled is the single biggest thing that kills your catch rate. Fix that first.</li>
        <li>Weakening a target in battle roughly doubles your odds.</li>
        <li>Better pods help a lot, but they can&apos;t rescue you if you&apos;re 15 levels under.</li>
        <li>Alphas ignore all of the above. Only your pod matters there.</li>
      </ul>

      <h2 className="font-display mt-10 text-2xl font-bold">The actual math</h2>
      <p className="mt-2 text-ink-soft">Two formulas, depending on whether you&apos;re in a fight or sneaking up:</p>
      <div className="mt-4 space-y-3">
        <div className="rounded-2xl border border-line bg-card p-4 text-sm">
          <div className="mb-1 font-semibold text-ink-soft">Sneaking up (outside battle)</div>
          <code className="block text-[13px] leading-relaxed">
            Chance = Base × Aniipod × Level × Backstab × Status
          </code>
        </div>
        <div className="rounded-2xl border border-line bg-card p-4 text-sm">
          <div className="mb-1 font-semibold text-ink-soft">In a fight</div>
          <code className="block text-[13px] leading-relaxed">
            Chance = Base × Aniipod × Level × HP × Status
          </code>
        </div>
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        The difference: sneaking gives you the Backstab bonus (×1.5) but not the HP bonus. Fighting lets you knock a
        target down to low HP for up to ×2. Both paths work — fighting usually wins.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">Where does the base number come from?</h2>
      <p className="mt-2 text-ink-soft">
        Two things: how far into the game the area is, and what stage the creature is. Later areas are just harder.
      </p>
      <div className="mt-4">
        <Table
          head={["Where you are", "Lumin stage", "Gamma stage", "Nova stage"]}
          rows={[
            ["Early areas", "56%", "42%", "28%"],
            ["Early-mid areas", "50%", "38%", "25%"],
            ["Mid areas", "44%", "33%", "22%"],
            ["Mid-late areas", "38%", "29%", "19%"],
            ["Late areas", "32%", "24%", "16%"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Then your badges and branches nudge it up: <strong>Base = the table number × (1 + your catch bonus)</strong>.
        That bonus never goes away, which is why collecting badges early pays off forever.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">The level gap is brutal</h2>
      <p className="mt-2 text-ink-soft">
        This table is why you should never try to catch something far above your level:
      </p>
      <div className="mt-4">
        <Table
          head={["They're this much above you", "Your odds get multiplied by"]}
          rows={[
            ["Up to 10 levels", "×1 — full odds"],
            ["11 levels", "×0.8"],
            ["12 levels", "×0.6"],
            ["13 levels", "×0.4"],
            ["14 levels", "×0.2"],
            ["15 or more", "×0.1 — one tenth"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        At 15+ levels under, even a Pro pod barely helps. Go level up, come back, catch it in three throws. It&apos;s
        faster than the 20 throws you&apos;d waste now.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">Which pod should you throw?</h2>
      <div className="mt-4">
        <Table
          head={["Pod", "Multiplier"]}
          rows={[
            ["Aniipod", "×1"],
            ["Aniipod Pro", "×1.5"],
            ["Hyper / Trace / Mega", "×2"],
            ["Tumbler", "×2"],
            ["Tumbler (Nurture targets)", "×6"],
            ["Ultra / Sparkling Cube / Legendary", "Guaranteed catch"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Pro pods are cheap to make and cover most situations. Save the guaranteed ones for Alphas (see below).
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">Knock it down first</h2>
      <p className="mt-2 text-ink-soft">
        If you&apos;re fighting the thing, its remaining HP changes your odds a lot:
      </p>
      <div className="mt-4">
        <Table
          head={["Target's HP left", "Multiplier"]}
          rows={[["0%", "×2"], ["5%", "×1.65"], ["10%", "×1.26"], ["50%", "×1.1"], ["80%", "×1"], ["90%", "×0.9"], ["100%", "×0.8"]]}
        />
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Worth repeating: catching at full HP is the worst case. Two more hits before you throw is almost always correct.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">Sneaking up from behind</h2>
      <ul className="mt-3 space-y-2 text-ink-soft">
        <li>Backstab gives <strong>×1.5</strong>, but only outside battle and only from behind.</li>
        <li>Backstab <strong>doesn&apos;t work with Tumblers</strong> — pick one or the other.</li>
        <li>
          Status effects matter too. If the creature is debuffed, use the <em>lowest</em> active multiplier; if
          it&apos;s calm, the highest. Translation: don&apos;t poison something you&apos;re about to catch.
        </li>
      </ul>

      <h2 className="font-display mt-10 text-2xl font-bold">Alphas play by different rules</h2>
      <p className="mt-2 text-ink-soft">
        Alpha Aniimo ignore your level, their HP, and backstab. The whole formula collapses to:
      </p>
      <div className="mt-3 rounded-2xl border border-line bg-card p-4 text-sm">
        <code>Chance = 6% × your pod multiplier</code>
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        So a Pro pod gives you 9%. A Hyper gives 12%. But a guaranteed pod gives 100% — instantly. That&apos;s what
        those pods are for. Don&apos;t burn them on anything else.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">Two examples</h2>
      <div className="mt-4 space-y-3 text-sm">
        <div className="rounded-2xl border border-line bg-card p-4">
          <div className="font-semibold">A Nova-stage Aniimo in a late area, and you&apos;re 12 levels under</div>
          <p className="mt-1 text-ink-soft">
            16% base × 0.6 (level gap) × 1.5 (Pro pod) = <strong>14%</strong> if you just throw. Fight it down to 5% HP
            first and you get 16% × 0.6 × 1.5 × 1.65 = <strong>24%</strong>. Nearly double, same pod.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-card p-4">
          <div className="font-semibold">Same creature, but you leveled up first</div>
          <p className="mt-1 text-ink-soft">
            Within 10 levels, that ×0.6 becomes ×1: 16% × 1.5 = <strong>24%</strong> with no fight at all. Add backstab
            and it&apos;s <strong>36%</strong>. Twenty minutes of leveling tripled your catch rate.
          </p>
        </div>
      </div>

      <h2 className="font-display mt-10 text-2xl font-bold">Two bonus odds worth knowing</h2>
      <ul className="mt-3 space-y-2 text-ink-soft">
        <li>
          <strong>Sparkling (shiny) chances:</strong> about 99% common style and 1% dazzling when you use a Sparkling
          Cube out in the world. Eggs from Egg Heist can roll Shadow instead.
        </li>
        <li>
          <strong>Nurture:</strong> Vein Essence has a 3% chance to trigger Prismana Flow. You can also just pay 480
          Prismatic Energy for a guaranteed trigger, and pity kicks in at 10,500 Prismana.
        </li>
      </ul>

      <p className="mt-10 text-xs text-ink-soft">
        Source: the game&apos;s own Probability Details page. If a patch changes the numbers, this page gets updated —
        last checked 28 September 2026.
      </p>

      <AdsterraBanner slot={RECTANGLE} className="mt-10" />
    </article>
  );
}
