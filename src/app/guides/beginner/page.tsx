import type { Metadata } from "next";
import Link from "next/link";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Aniimo Beginner Guide — What to Do First",
  description:
    "Just started Aniimo? Pick a starter, learn what the roles do, and do these five things first. Plain advice, no fluff.",
  alternates: { canonical: "/guides/beginner/" },
};

export default function BeginnerGuide() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10">
      <nav className="text-sm text-ink-soft">
        <Link href="/guides/" className="hover:text-brand">Guides</Link> <span className="mx-1">/</span> Beginner
      </nav>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Just started? Do these five things</h1>
      <p className="mt-3 text-lg text-ink-soft">
        Aniimo doesn&apos;t explain much, so here&apos;s the short version. Five things, in order, that make the first
        few hours much smoother.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">1. Grab the free codes first</h2>
      <p className="mt-2 text-ink-soft">
        Before you do anything else, go to <strong>Settings → Account → Gift Code Redemption</strong> and punch in the
        codes from our <Link href="/codes/" className="font-semibold text-brand underline">codes page</Link>. You get
        credits, Glimmer, Growth Flowers and free Aniipod Pro. It takes two minutes and it&apos;s free stuff you&apos;d
        otherwise farm for an hour.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">2. Picking your starter: Helion or Lunara</h2>
      <p className="mt-2 text-ink-soft">
        Good news — they&apos;re the same creature with a different paint job. Identical stats (HP 100, ATK 116,
        defenses 72/72, REGEN 90, BREAK 64), both holy/Light, both DPS. So don&apos;t stress over it.
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
              <td className="px-4 py-2.5 font-semibold">Does</td>
              <td className="px-4 py-2.5">Physical damage</td>
              <td className="px-4 py-2.5">Magic damage</td>
            </tr>
            <tr className="border-b border-line/70">
              <td className="px-4 py-2.5 font-semibold">Trait</td>
              <td className="px-4 py-2.5">Every 4 basic attacks charges up your next skill</td>
              <td className="px-4 py-2.5">Skills build stacks, basics spend them to hit harder and heal</td>
            </tr>
            <tr className="border-b border-line/70">
              <td className="px-4 py-2.5 font-semibold">Feels like</td>
              <td className="px-4 py-2.5">Charge up, then drop one big hit</td>
              <td className="px-4 py-2.5">Steady pressure, self-healing, never stop attacking</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-semibold">Evolves into</td>
              <td className="px-4 py-2.5"><Link href="/dex/soleon/" className="text-brand underline">Soleon</Link></td>
              <td className="px-4 py-2.5"><Link href="/dex/fennelun/" className="text-brand underline">Fennelun</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Pick Helion if you like burst damage. Pick Lunara if you like staying alive. You can catch the other one later
        anyway.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">3. What the five roles actually mean</h2>
      <p className="mt-2 text-ink-soft">
        Every Aniimo has one role. Here&apos;s what they do in a fight, in plain words:
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-black/[0.03] text-left text-xs font-semibold text-ink-soft">
              <th className="px-4 py-2.5">Role</th>
              <th className="px-4 py-2.5">What it does</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["DPS", "Your damage. Most of the dex is this."],
              ["BREAK", "Breaks enemy guard so everyone else hits harder. Bring one."],
              ["Support", "Buffs, debuffs, utility. Quietly wins fights."],
              ["Regen", "Keeps you topped up during long grind sessions."],
              ["Heal", "Dedicated healer. Only five exist, all worth catching."],
            ].map(([r, d], i) => (
              <tr key={r} className={i < 4 ? "border-b border-line/70" : ""}>
                <td className="px-4 py-2.5 font-semibold">{r}</td>
                <td className="px-4 py-2.5 text-ink-soft">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        A comfortable team is one DPS, one BREAK, one Support. Your starter covers the DPS slot, so look for the other two.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">4. Level up more than you think you need to</h2>
      <p className="mt-2 text-ink-soft">
        This is the one thing that catches everyone out. If a wild Aniimo is 15 levels above you, your catch rate gets
        multiplied by <strong>0.1</strong>. Ten times worse. No pod in the game fixes that.
      </p>
      <p className="mt-2 text-ink-soft">
        Stay within 10 levels of what you&apos;re hunting and your catch chance stays at full strength. Overleveling is
        not wasted time — it&apos;s catch rate.
      </p>
      <p className="mt-2 text-sm text-ink-soft">
        Want the exact numbers? The <Link href="/catch-calculator/" className="font-semibold text-brand underline">catch calculator</Link> shows
        your odds for any level gap, pod and HP.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">5. Three habits that save hours</h2>
      <ul className="mt-3 space-y-2.5 text-ink-soft">
        <li>
          <strong>Collect badges and branches when you see them.</strong> They permanently raise your catch rate for
          everything, forever. Skipping them is the slowest way to play.
        </li>
        <li>
          <strong>Weaken before you throw.</strong> In battle, a target at low HP is roughly twice as easy to catch.
          Sounds obvious, saves a fortune in pods.
        </li>
        <li>
          <strong>Don&apos;t waste good pods on common stuff.</strong> Ultra-tier pods guarantee a catch, so they&apos;re
          best saved for Alphas — where a normal pod is only 6% but an Ultra is 100%. That&apos;s the whole difference
          between a two-hour hunt and a single throw.
        </li>
      </ul>

      <div className="mt-10 rounded-2xl border border-line bg-card p-5">
        <div className="font-display text-lg font-bold">Where to next</div>
        <ul className="mt-2 space-y-1 text-sm">
          <li>→ <Link href="/guides/catch-chance/" className="font-semibold text-brand underline">How catching actually works</Link> — all the multipliers in plain words</li>
          <li>→ <Link href="/map/" className="font-semibold text-brand underline">Find where things spawn</Link></li>
          <li>→ <Link href="/tier-list/" className="font-semibold text-brand underline">See which Aniimo are worth your time</Link></li>
        </ul>
      </div>

      <AdsterraBanner slot={RECTANGLE} className="mt-10" />
    </article>
  );
}
