import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aniimo Operation: Egg Heist — Ranks, Coins & First Steps",
  description:
    "How Aniimo's Egg Heist extraction mode works: the rank ladder, Eggshell Coins, difficulty unlocks, beginner protection and what resets each season.",
  alternates: { canonical: "/guides/egg-heist/" },
};

export default function EggHeistGuide() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10">
      <nav className="text-sm text-ink-soft">
        <Link href="/guides/" className="hover:text-brand">Guides</Link> <span className="mx-1">/</span> Egg Heist
      </nav>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Operation: Egg Heist, explained</h1>
      <p className="mt-3 text-lg text-ink-soft">
        Egg Heist is the extraction mode — you land, you loot, you evacuate before things go wrong. It&apos;s also where
        most of the game&apos;s eggs, coins and cosmetics come from. Here&apos;s how it works, straight from the
        in-game text, minus the guesswork.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">The loop</h2>
      <p className="mt-2 text-ink-soft">
        Team Mode is <strong>PvE</strong>: your team lands on the lost island, collects supplies, and races to find the
        entrance to the <em>Lost Sanctum</em>. The single rule that matters:{" "}
        <strong>evacuate successfully</strong>. A clean extraction earns Rank Points; failing to extract is where runs
        get expensive — until you read the next section.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">The rank ladder</h2>
      <p className="mt-2 text-ink-soft">
        Rank Points come from successful evacuations. The game lists the ladder in its own text:
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-black/[0.03] text-left text-xs font-semibold text-ink-soft">
              <th className="px-4 py-2.5">#</th>
              <th className="px-4 py-2.5">Rank</th>
              <th className="px-4 py-2.5">What it changes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "Rookie Egg Hunter", "Where everyone starts"],
              ["2", "Rising Egg Scout", "Daily chests start mattering"],
              ["3", "Pro Egg Snatcher", "—"],
              ["4", "Elite Egg Seeker", "Rank IV (Elite Egg Seeker IV) unlocks PvP matchmaking"],
              ["5", "Expert Egg Raider", "Rank-exclusive items appear in the shop"],
              ["6", "Egg Heist Master", "—"],
              ["7", "Egg Emperor", "The top badge — plus the Wind Chaser title line"],
            ].map((r, i) => (
              <tr key={r[1]} className={`border-line/70 ${i < 6 ? "border-b" : ""}`}>
                <td className="px-4 py-2 tabular-nums text-ink-soft">{r[0]}</td>
                <td className="px-4 py-2 font-semibold">{r[1]}</td>
                <td className="px-4 py-2 text-ink-soft">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-ink-soft">
        Each rank has sub-tiers (I, II, III…), and the game text is clear on the reward loop: advancing your rank gets
        you <em>daily chests</em> and unlocks <em>rank-exclusive items in the shop</em>.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">Difficulties — and the PvP gate</h2>
      <ul className="mt-3 space-y-2 text-ink-soft">
        <li>Team Mode unlocks harder tiers as you progress — <strong>Hard</strong>, <strong>Chaos</strong> and <strong>Nightmare</strong> are each separate unlocks.</li>
        <li>
          The higher tiers are where <em>chips</em> earn their slot — anti-Chaos/anti-Nightmare chips explicitly
          &ldquo;increase damage against targets on Chaos and Nightmare difficulties or lower&rdquo;.
        </li>
        <li>
          There&apos;s also a PvP mode: &ldquo;intense battles against other Pathfinders&rdquo;. You can&apos;t even
          queue for it until <strong>Elite Egg Seeker IV</strong> — don&apos;t plan around it early.
        </li>
      </ul>

      <h2 className="font-display mt-10 text-2xl font-bold">Your first three rounds are free — use them</h2>
      <p className="mt-2 text-ink-soft">
        This is the most useful line in the entire mode description, and most players never read it. For{" "}
        <strong>each difficulty</strong> in Team Mode, the first 3 rounds have <em>Beginner Protection</em>: if you fail
        to extract, your BINI #9 unit, amplifier, chip, backpack and everything inside are fully retained. Load out
        aggressively for those three runs — the risk is zero.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">Eggshell Coins: earn early, spend smart</h2>
      <ul className="mt-3 space-y-2 text-ink-soft">
        <li>The game gifts you <strong>Startup Funds</strong> in Eggshell Coins — spend them meaningfully, they&apos;re a one-time boost.</li>
        <li>Coins buy the shop&apos;s <strong>Equipment, Eggs and Consumables</strong>, and a successful evacuation voucher can be exchanged for supplies and eggs at the Lumintech Shop.</li>
        <li>They also pay for <strong>Egg Heist Talents</strong> (coins + relics found during exploration).</li>
        <li>
          ⚠️ <strong>Talents reset every season.</strong> The game says it in plain words. Late in a season, don&apos;t
          dump everything into talents you&apos;ll lose next patch cycle.
        </li>
      </ul>

      <h2 className="font-display mt-10 text-2xl font-bold">Collectibles are cosmetic unlocks, not loot</h2>
      <p className="mt-2 text-ink-soft">
        Named collectibles — Rose Thorn Blade, Cloudsoft Slumber, Dragonflame Horn, Wolfspirit Ghost Lantern and the
        rest — go into the Egg Heist cabinet, and extracting one unlocks an <strong>S1-exclusive Aniimo
        Accessory</strong>. They&apos;re the mode&apos;s real long-term chase if cosmetics matter to you. Full list in the{" "}
        <Link href="/items/" className="font-semibold text-brand underline">item database</Link>.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">The season clock</h2>
      <p className="mt-2 text-ink-soft">
        Egg Heist runs on Season 1, <em>Departure with the Wind</em> — Part I ends <strong>Oct 29, 2026</strong>, and
        Part II runs to early December. When a season ends, unclaimed chests are cleared and converted into Eggshell
        Coins sent to your mailbox. If you can&apos;t claim chests before the deadline, at least don&apos;t leave vouchers
        and rank rewards sitting there.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">The four habits that save time</h2>
      <ol className="mt-3 space-y-2 text-ink-soft">
        <li><strong>Burn your 3 protected rounds immediately</strong> on each difficulty you unlock — free information, free loot.</li>
        <li><strong>Evacuate early when the run goes sideways.</strong> Points come from successful extraction, not from dying rich.</li>
        <li><strong>Bring a chip built for the difficulty</strong> once you&apos;re past Normal — they&apos;re the difference-maker on Chaos+.</li>
        <li><strong>Track your rank points.</strong> Elite Egg Seeker IV is the door to the PvP mode — plan to hit it if PvP interests you.</li>
      </ol>
      <p className="mt-4 text-ink-soft">
        Related: your <Link href="/guides/catch-chance/" className="font-semibold text-brand underline">catch rate</Link>{" "}
        matters here too — eggs you snatch still have to be hatched, and pods don&apos;t work on Alphas.
      </p>
    </article>
  );
}
