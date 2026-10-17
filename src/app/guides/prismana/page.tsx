import type { Metadata } from "next";
import Link from "next/link";
import { creatures } from "@/lib/creatures";
import { ElementChip, RoleChip } from "@/components/ui";

export const metadata: Metadata = {
  title: "Aniimo Prismana Forms — All 27 & How to Get Them",
  description:
    "Every Prismana Form in Aniimo, hatched from Prismana eggs — with roles, stats and the honest truth about whether they're stronger.",
  alternates: { canonical: "/guides/prismana/" },
};

export default function PrismanaGuide() {
  const prismana = creatures
    .filter((c) => c.forms["prismana-form"])
    .map((c) => ({ c, f: c.forms["prismana-form"] }))
    .sort((a, b) => (b.f.stats.total ?? 0) - (a.f.stats.total ?? 0));

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10">
      <nav className="text-sm text-ink-soft">
        <Link href="/guides/" className="hover:text-brand">Guides</Link> <span className="mx-1">/</span> Prismana Forms
      </nav>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Prismana forms, explained</h1>
      <p className="mt-3 text-lg text-ink-soft">
        A Prismana Form looks like the rarest thing in Aniimo — and in most ways it is. But before you hunt one,
        know the one thing almost every video gets wrong: <strong>it is not stronger</strong>.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">They&apos;re rarer — not better</h2>
      <p className="mt-2 text-ink-soft">
        We compared all {prismana.length} Prismana forms in the game data against their regular versions. Base stat
        totals are <strong>identical</strong> — the difference is exactly 0, every single one of them. A Prismana
        Witchin is a Witchin: same stats, same role, same evolution. What you get is a different look and a rarer
        hatch. Chase one because you want it on your team for the flex — not because it will win you fights.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">How you actually get one</h2>
      <p className="mt-2 text-ink-soft">
        All Prismana Forms come from eggs. The game&apos;s own egg descriptions say it plainly:
      </p>
      <ul className="mt-3 space-y-2 text-ink-soft">
        <li>
          <strong>Hatch at a Hatchinator.</strong> Prismana eggs work at both the <em>Outpost Hatchinator</em> and the{" "}
          <em>Home Hatchinator</em>.
        </li>
        <li>
          <strong>Creature-specific eggs exist.</strong> Some are literally named after their result — the game text for
          them reads &ldquo;an egg containing the power of Prismana Turbo&rdquo; / Glacy / Blazen / Thornblade and so on,
          collected by the Polaris Institute during the Prismana Flow.
        </li>
        <li>
          <strong>Weekend Prayers guarantees one.</strong> Event eggs state they are &ldquo;guaranteed to hatch a
          Prismana Form Aniimo featured in the current Weekend Prayers event&rdquo; — the safest way to aim for a
          specific one.
        </li>
        <li>
          <strong>Bring a Sparkling Cube.</strong> Prismana egg text explicitly recommends using one (the style odds are in{" "}
          <Link href="/guides/probability-details/" className="font-semibold text-brand underline">Probability Details</Link>). Sparkling is the
          mutation layer on top of the form — some eggs even guarantee a Prismana Form with a named mutation like{" "}
          <em>Shadow Sparkling</em>.
        </li>
        <li>
          <strong>You get shards back.</strong> Every Prismana hatch leaves residual energy that coalesces into
          Prismana Shell Shards (egg text: 1, 3 or 5 depending on the egg).
        </li>
      </ul>

      <h2 className="font-display mt-10 text-2xl font-bold">The full list — all {prismana.length} Prismana forms</h2>
      <p className="mt-2 text-ink-soft">
        Sorted by base stat total. Stats are identical to each creature&apos;s regular form, so judge them exactly the
        way you&apos;d judge the base version — the{" "}
        <Link href="/tier-list/" className="font-semibold text-brand underline">tier list</Link> still applies.
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-black/[0.03] text-left text-xs font-semibold text-ink-soft">
              <th className="px-4 py-2.5">Prismana Form</th>
              <th className="px-4 py-2.5">Elements</th>
              <th className="px-4 py-2.5">Role</th>
              <th className="px-4 py-2.5 text-right">Base total</th>
            </tr>
          </thead>
          <tbody>
            {prismana.map(({ c, f }) => (
              <tr key={c.slug} className="border-b border-line/70 last:border-0 hover:bg-black/[0.02]">
                <td className="px-4 py-2 font-medium">
                  <Link href={`/dex/${c.slug}/`} className="hover:text-brand hover:underline">
                    Prismana {f.name}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <span className="flex flex-wrap gap-1">{(f.elements ?? []).map((e) => <ElementChip key={e} el={e} />)}</span>
                </td>
                <td className="px-4 py-2"><RoleChip role={f.role} /></td>
                <td className="px-4 py-2 text-right font-semibold tabular-nums">{f.stats.total ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-display mt-10 text-2xl font-bold">Which one should you aim for?</h2>
      <p className="mt-2 text-ink-soft">
        Since the stats are a wash, pick by what your team is missing. The Prismana pool skews heavily toward damage
        dealers — {prismana.filter((p) => /dps/i.test(p.f.role)).length} of {prismana.length} are DPS — so if
        you&apos;re already stacked on damage, the interesting picks are the support and BREAK roles. From the list
        above, Panpanta, Inferlupa and Magmarex are the ones that fill a BREAK slot at the top of the stat table.
      </p>
      <p className="mt-3 text-ink-soft">
        And if you&apos;re early in the game: none of this matters yet. You need a catch-rate engine before you need a
        trophy — start with the{" "}
        <Link href="/guides/beginner/" className="font-semibold text-brand underline">beginner guide</Link>, and let
        Prismana hunting be a season-two project.
      </p>

      <h2 className="font-display mt-10 text-2xl font-bold">Prismana items in the database</h2>
      <p className="mt-2 text-ink-soft">
        Prismana Shell Shards, Prismana Crystals, creature-specific Prismana eggs — they all live in the{" "}
        <Link href="/items/" className="font-semibold text-brand underline">item database</Link>. Search{" "}
        <em>Prismana</em> there and you can see every one, including which eggs are tied to which creature.
      </p>
    </article>
  );
}
