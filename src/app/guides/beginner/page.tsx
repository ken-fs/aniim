import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aniimo Beginner's Guide — Starters & Progression",
  description:
    "Start Aniimo right: Helion vs Lunara with official stats, what each role does, and the catch-rate habits that save hours.",
  alternates: { canonical: "/guides/beginner/" },
};

export default function BeginnerGuide() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10">
      <nav className="text-sm text-ink-soft">
        <Link href="/guides/" className="hover:text-brand">Guides</Link> <span className="mx-1">/</span> Beginner
      </nav>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Beginner&apos;s Roadmap</h1>
      <p className="mt-2 text-lg text-ink-soft">
        Everything that actually matters in your first sessions — the starter decision, what each role is for, and the
        progression habits that compound.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">Helion or Lunara? The starter choice</h2>
      <p className="mt-2 text-ink-soft">
        Both starters share the <strong>exact same stats</strong> — HP 100, ATK 116, M.DEF 72, P.DEF 72, REGEN 90,
        BREAK 64 (total 514, holy/Light element, DPS). They are mirrors of each other; the real difference is
        <strong> damage channel and trait</strong>:
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-black/[0.03] text-left text-xs font-semibold text-ink-soft">
              <th className="px-4 py-2.5"></th>
              <th className="px-4 py-2.5">Helion</th>
              <th className="px-4 py-2.5">Lunara</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-line/70">
              <td className="px-4 py-2.5 font-semibold">Damage type</td>
              <td className="px-4 py-2.5">Physical (Light Bombardment, Holy Storm)</td>
              <td className="px-4 py-2.5">Magic (Moon Impact, Lunar Eclipse)</td>
            </tr>
            <tr className="border-b border-line/70">
              <td className="px-4 py-2.5 font-semibold">Trait</td>
              <td className="px-4 py-2.5">Solar Grace — every 4 basic attacks grants Solar Halo, enhancing the next skill</td>
              <td className="px-4 py-2.5">Lunar Power — skills grant Silver Moon Marks; basic attacks consume them for 100% bonus damage and healing</td>
            </tr>
            <tr className="border-b border-line/70">
              <td className="px-4 py-2.5 font-semibold">Ultimate</td>
              <td className="px-4 py-2.5">Helios&apos; Judgment (167 power)</td>
              <td className="px-4 py-2.5">Selene&apos;s Judgment (167 power)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-semibold">Engine</td>
              <td className="px-4 py-2.5">Skill burst windows — charge with basics, then unload an empowered skill</td>
              <td className="px-4 py-2.5">Basic-attack sustain — skills build stacks, basics convert them to damage and healing</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Both traits include the same core: +30% damage when not attacking with an advantageous element.
        Pick Helion if you like burst windows; pick Lunara if you prefer steady attack-based sustain. Neither is a
        trap — you can catch both later.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">What the roles mean</h2>
      <p className="mt-2 text-ink-soft">Across the launch dex:</p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-black/[0.03] text-left text-xs font-semibold text-ink-soft">
              <th className="px-4 py-2.5">Role</th>
              <th className="px-4 py-2.5">Count</th>
              <th className="px-4 py-2.5">What it does</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["DPS", "30", "Primary damage dealers. Look for high ATK and a damage trait."],
              ["BREAK", "26", "Break the enemy's guard — the window everyone else exploits."],
              ["Support", "19", "Buffs, debuffs and utility that make the other three roles work."],
              ["REGEN", "8", "Sustain and recovery during long fights."],
              ["Heal", "5", "Dedicated healing. Rare, and always worth a roster slot."],
            ].map((r, i) => (
              <tr key={r[0]} className={i < 4 ? "border-b border-line/70" : ""}>
                <td className="px-4 py-2.5 font-semibold">{r[0]}</td>
                <td className="px-4 py-2.5 tabular-nums">{r[1]}</td>
                <td className="px-4 py-2.5 text-ink-soft">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-display mt-10 text-2xl font-bold">Six habits that pay off early</h2>
      <ol className="mt-3 list-decimal space-y-3 pl-5 text-ink-soft">
        <li>
          <strong>Level past your targets.</strong> An Aniimo 15+ levels above you has its catch chance cut to ×0.1
          — no pod fixes that. Leveling is catch rate.
        </li>
        <li>
          <strong>Collect Branches and Regional Badges.</strong> They feed the permanent Pathfinder Catch Bonus that
          scales every base catch chance.
        </li>
        <li>
          <strong>Weaken before you throw (in battle).</strong> A target at 5% HP is caught at up to ×1.65–×2 —
          nearly double the odds of a full-HP throw.
        </li>
        <li>
          <strong>Sneak up from behind.</strong> Backstab adds ×1.5 outside battle. Just remember it is disabled
          while using Tumblers.
        </li>
        <li>
          <strong>Open settings → Account → Gift Code Redemption.</strong> {""}
          <Link href="/codes/" className="font-semibold text-brand underline">13 launch codes</Link> are waiting and
          they front-load Credits, Glimmer and free Aniipod Pro.
        </li>
        <li>
          <strong>Bank guaranteed pods.</strong> Ultra-tier pods guarantee any normal catch — but versus Alphas they
          turn a 6% base into 100%. That is the difference between a two-hour hunt and a one-throw catch.
        </li>
      </ol>

      <h2 className="font-display mt-10 text-2xl font-bold">Your first team</h2>
      <p className="mt-2 text-ink-soft">
        A balanced early roster is one DPS, one BREAK, one Support — your starter fills the DPS slot. Prefer creatures
        whose base totals are 500+ when you have the choice; the{" "}
        <Link href="/tier-list/" className="font-semibold text-brand underline">tier list</Link> ranks every Aniimo by
        official totals, and the{" "}
        <Link href="/dex/" className="font-semibold text-brand underline">dex</Link> shows exactly where each one spawns.
      </p>

      <div className="mt-10 rounded-2xl border border-line bg-card p-5">
        <div className="font-display text-lg font-bold">Next steps</div>
        <ul className="mt-2 space-y-1 text-sm">
          <li>→ <Link href="/guides/catch-chance/" className="font-semibold text-brand underline">Master the catch formula</Link> — every multiplier, with worked examples</li>
          <li>→ <Link href="/guides/evolution/" className="font-semibold text-brand underline">Plan your evolution &amp; resonance path</Link></li>
          <li>→ <Link href="/codes/" className="font-semibold text-brand underline">Redeem all launch codes</Link></li>
        </ul>
      </div>
    </article>
  );
}
