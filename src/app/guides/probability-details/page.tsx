import type { Metadata } from "next";
import Link from "next/link";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Aniimo Probability Details — Every Rate Explained",
  description:
    "Every number from Aniimo's official Probability Details page: catch chance, lucky and superlucky pity, Vein Essence, Alpha held items and Sparkling odds.",
  alternates: { canonical: "/guides/probability-details/" },
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

export default function ProbabilityDetailsGuide() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10">
      <nav className="text-sm text-ink-soft">
        <Link href="/guides/" className="hover:text-brand">Guides</Link> <span className="mx-1">/</span> Probability Details
      </nav>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Probability Details, in plain English</h1>
      <p className="mt-3 text-lg text-ink-soft">
        Probability Details is the official list of odds for Aniimo. It lives on the official site at{" "}
        <a href="https://aniimo.com/formula-multipliers" rel="nofollow noopener" target="_blank" className="font-semibold text-brand underline">aniimo.com/formula-multipliers</a>.
        It covers five things: catch chance, Vein Essence Nurture, lucky and superlucky, Alpha held items, and Sparkling styles.
      </p>
      <p className="mt-3 text-ink-soft">Below is every number on that page, with what it means for you.</p>

      <h2 className="font-display mt-10 text-2xl font-bold">The quick answers</h2>
      <ul className="mt-3 space-y-2 text-ink-soft">
        <li><strong>Alpha catch chance:</strong> 6% × your pod multiplier. Ultra pods and Sparkling Cubes always work.</li>
        <li><strong>lucky:</strong> 1% per check for your first 10 each week, guaranteed by check 200.</li>
        <li><strong>superlucky:</strong> 0.2% for your first one each week, guaranteed by check 500.</li>
        <li><strong>Vein Essence:</strong> 3% chance to trigger Prismana Flow directly, with a pity at 10,500.</li>
        <li><strong>Sparkling Cube in the world:</strong> 1% Dazzling Sparkling, 0% Shadow Sparkling.</li>
        <li><strong>Legendary held items from Alphas:</strong> 20%, but only from the Wayfarer III title onward.</li>
      </ul>

      <h2 className="font-display mt-10 text-2xl font-bold">1. Catch chance</h2>
      <p className="mt-2 text-ink-soft">
        Your catch chance is one multiplication. The game uses a slightly different one in and out of battle:
      </p>
      <div className="mt-4 space-y-3">
        <div className="rounded-2xl border border-line bg-card p-4 text-sm">
          <div className="mb-1 font-semibold text-ink-soft">Outside battle</div>
          <code className="block text-[13px] leading-relaxed">Base × Aniipod × Level × Backstab × Status</code>
        </div>
        <div className="rounded-2xl border border-line bg-card p-4 text-sm">
          <div className="mb-1 font-semibold text-ink-soft">In battle</div>
          <code className="block text-[13px] leading-relaxed">Base × Aniipod × Level × HP × Status</code>
        </div>
        <div className="rounded-2xl border border-line bg-card p-4 text-sm">
          <div className="mb-1 font-semibold text-ink-soft">Alpha Aniimo</div>
          <code className="block text-[13px] leading-relaxed">6% × Aniipod</code>
        </div>
      </div>
      <p className="mt-3 text-ink-soft">
        The base number depends on the area and the Aniimo&apos;s stage. Your Branches and Regional Badges add a catch
        bonus on top: Base × (1 + your bonus).
      </p>
      <div className="mt-4">
        <Table
          head={["Area", "Lumin stage", "Gamma stage", "Nova stage"]}
          rows={[
            ["Early-game", "56%", "42%", "28%"],
            ["Early-mid-game", "50%", "38%", "25%"],
            ["Mid-game", "44%", "33%", "22%"],
            ["Mid-late-game", "38%", "29%", "19%"],
            ["Late-game", "32%", "24%", "16%"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Takeaway: later areas and later stages are harder, so a late-game Nova Aniimo starts at just 16%.
      </p>
      <p className="mt-3 text-ink-soft">The multipliers, in short:</p>
      <ul className="mt-3 space-y-2 text-ink-soft">
        <li><strong>Level gap:</strong> ×1 up to 10 levels above you, then ×0.8, ×0.6, ×0.4, ×0.2, and ×0.1 at 15+.</li>
        <li><strong>Pods:</strong> Aniipod ×1, Pro ×1.5, Hyper / Trace / Mega ×2, Tumbler ×2 (×6 on Nurture targets).</li>
        <li><strong>Always succeed:</strong> Aniipod Ultra, Sparkling Cube, Legendary Aniipod: Departure with the Wind.</li>
        <li><strong>HP in battle:</strong> ×0.8 at full HP, up to ×2 at 0%.</li>
        <li><strong>Backstab:</strong> ×1.5 outside battle. It doesn&apos;t work with Tumblers.</li>
        <li>
          <strong>Status:</strong> if any debuff is on the target, the lowest status multiplier applies. If not, the
          highest one applies. The official page doesn&apos;t list the status numbers themselves.
        </li>
      </ul>
      <p className="mt-3 text-ink-soft">
        Some story encounters ignore all of this and force a success or a fail. We break the catch math down with
        worked examples in{" "}
        <Link href="/guides/catch-chance/" className="font-semibold text-brand underline">why your catches keep failing</Link>,
        and you can plug in your own numbers with the{" "}
        <Link href="/catch-calculator/" className="font-semibold text-brand underline">catch calculator</Link>.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">2. Nurture with Vein Essence</h2>
      <p className="mt-2 text-ink-soft">The official page lists three numbers for Nurture with Vein Essence:</p>
      <div className="mt-4">
        <Table
          head={["What", "Value"]}
          rows={[
            ["Chance to directly trigger Prismana Flow", "3%"],
            ["Prismatic Energy obtained directly", "480"],
            ["Prismana needed to trigger pity", "10,500"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Takeaway: each use is a 3% roll, and there&apos;s a pity counter behind it. The page doesn&apos;t spell out how
        the 480 feeds into the 10,500. If each miss adds 480, pity lands at about 22 uses (10,500 ÷ 480 ≈ 21.9). That&apos;s
        our reading, not an official statement.
      </p>

      <AdsterraBanner slot={RECTANGLE} className="mt-10" />

      <h2 className="font-display mt-10 text-2xl font-bold">3. lucky and superlucky</h2>
      <p className="mt-2 text-ink-soft">
        lucky and superlucky are bonus rolls you get when you catch an eligible Aniimo. They only start after you reach
        a certain point in the story. The game checks superlucky first. If that misses, it checks lucky.
      </p>
      <p className="mt-3 text-ink-soft">
        The odds drop the more times you&apos;ve hit them this week. Each one also has a pity: the number of checks after
        which a trigger is guaranteed.
      </p>
      <div className="mt-4">
        <Table
          head={["Roll", "Chance per check", "Guaranteed by"]}
          rows={[
            ["lucky — your 1st to 10th this week", "1%", "200 checks"],
            ["lucky — your 11th onward this week", "0.5%", "400 checks"],
            ["superlucky — 1st this week", "0.2%", "500 checks"],
            ["superlucky — 2nd this week", "0.1%", "1,000 checks"],
            ["superlucky — 3rd onward this week", "0.05%", "3,000 checks"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Takeaway: the first 10 luckies and the first superlucky each week are the cheap ones. After that the odds get
        much worse, so heavy catching late in the week pays off less.
      </p>

      <h3 className="font-display mt-8 text-xl font-bold">What they give you</h3>
      <div className="mt-4">
        <Table
          head={["Result", "Reward", "Chance"]}
          rows={[
            ["lucky Tier 1", "275 Prismatic Energy", "40%"],
            ["lucky Tier 2", "300 Prismatic Energy", "50%"],
            ["lucky Tier 3", "350 Prismatic Energy", "5%"],
            ["lucky Tier 4", "500 Prismatic Energy", "5%"],
            ["superlucky", "1,500 Prismatic Energy", "100%"],
            ["lucky or superlucky", "Prismana Weather directly", "0.60%"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Takeaway: an average lucky is worth about 302 Prismatic Energy (our math from the tier odds). One superlucky is
        worth about five luckies.
      </p>

      <h3 className="font-display mt-8 text-xl font-bold">Tumblers and the weekly reset</h3>
      <ul className="mt-3 space-y-2 text-ink-soft">
        <li>
          With a Tumbler, every Aniimo you catch gets its own check. Once one of them triggers lucky or superlucky, the
          rest of that batch don&apos;t roll. They don&apos;t count toward either pity counter either.
        </li>
        <li>The weekly count resets every Monday at 4:00 server time.</li>
      </ul>
      <div className="mt-4">
        <Table
          head={["Server", "Weekly reset"]}
          rows={[
            ["Aniimo-Apac", "Monday 4:00 (UTC+8)"],
            ["Aniimo-Europe", "Monday 4:00 (UTC+0)"],
            ["Aniimo-Americas", "Monday 4:00 (UTC-4)"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-ink-soft">Takeaway: check your own server&apos;s row. The three regions reset at different real-world times.</p>

      <h2 className="font-display mt-10 text-2xl font-bold">4. Alpha held item drops</h2>
      <p className="mt-2 text-ink-soft">
        Alphas drop a held item. Its rarity depends on your Pathfinder title:
      </p>
      <div className="mt-4">
        <Table
          head={["Title", "Rare", "Epic", "Legendary"]}
          rows={[
            ["Special Rookie", "100%", "0%", "0%"],
            ["Student I", "100%", "0%", "0%"],
            ["Student II", "100%", "0%", "0%"],
            ["Student III", "75%", "25%", "0%"],
            ["Wayfarer I", "75%", "25%", "0%"],
            ["Wayfarer II", "75%", "25%", "0%"],
            ["Wayfarer III", "0%", "80%", "20%"],
            ["Trailblazer I", "0%", "80%", "20%"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Takeaway: before Student III you only get Rare items. Wayfarer III is the big jump. Rare drops stop and
        Legendary hits 20%, so it&apos;s fine to save Alpha hunting until then.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">5. Sparkling style odds</h2>
      <p className="mt-2 text-ink-soft">
        Sparkling is the shiny version of an Aniimo. When you get one, it rolls a style. There are ten normal styles
        (Type I to X), plus two rare ones: Dazzling and Shadow.
      </p>
      <div className="mt-4">
        <Table
          head={["Style", "Sparkling Cube catch", "Cube on normal eggs", "Cube on Egg Heist eggs", "Sparkling Sigil"]}
          rows={[
            ["Each of Type I–X", "9.9%", "9.9%", "9.9%", "9.9%"],
            ["Dazzling Sparkling", "1%", "1%", "0%", "0.5%"],
            ["Shadow Sparkling", "0%", "0%", "1%", "0.5%"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Takeaway: you can&apos;t get Shadow from a world catch or a normal egg. Shadow only comes from{" "}
        <Link href="/guides/egg-heist/" className="font-semibold text-brand underline">Operation: Egg Heist</Link> eggs or a
        Sparkling Sigil. Dazzling never comes from Egg Heist eggs.
      </p>

      <h3 className="font-display mt-8 text-xl font-bold">Rerolling with Sparkling Pigment</h3>
      <p className="mt-2 text-ink-soft">
        Sparkling Pigment changes the style of a Sparkling Aniimo. It never gives you back the style you already have.
      </p>
      <div className="mt-4">
        <Table
          head={["Your current style", "Each other Type I–X", "Dazzling", "Shadow"]}
          rows={[
            ["Any of Type I–X", "10.99%", "0.55%", "0.55%"],
            ["Dazzling Sparkling", "9.95%", "0%", "0.50%"],
            ["Shadow Sparkling", "9.95%", "0.50%", "0%"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        Takeaway: rerolling a Type I–X has about a 1-in-90 chance of landing on Dazzling or Shadow. Rerolling a
        Dazzling or Shadow almost always drops it back to a normal type. Don&apos;t pigment a rare style unless you
        really want a change.
      </p>
      <p className="mt-3 text-ink-soft">
        Sparkling is separate from Prismana forms. For those, see{" "}
        <Link href="/guides/prismana/" className="font-semibold text-brand underline">all 27 Prismana forms and how to hatch them</Link>.
      </p>

      <p className="mt-10 text-xs text-ink-soft">
        Source: the official Aniimo Probability Details page (aniimo.com/formula-multipliers), checked 17 October 2026.
        Averages marked &ldquo;our math&rdquo; are worked out from those numbers. If a patch changes the odds, we update this page.
      </p>

      <AdsterraBanner slot={RECTANGLE} className="mt-10" />
    </article>
  );
}
