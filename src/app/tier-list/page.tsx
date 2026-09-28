import type { Metadata } from "next";
import Link from "next/link";
import { creatures, roles } from "@/lib/creatures";
import { ElementChip, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Aniimo Tier List — Best Aniimo by Role (Launch Patch)",
  description:
    "Aniimo tier list built from official base stats: the strongest DPS, BREAK, Support, Heal and Regen Aniimo at global launch, grouped into tiers with data you can verify.",
  alternates: { canonical: "/tier-list/" },
};

/** 由官方基础属性派生分层 —— 可复现、可解释,不假装是社区共识 */
function tierOf(c: (typeof creatures)[number]) {
  const s = c.base.stats;
  const total = s.total ?? 0;
  if (total >= 560) return "S";
  if (total >= 500) return "A";
  if (total >= 440) return "B";
  if (total >= 380) return "C";
  return "D";
}

const TIER_DESC: Record<string, string> = {
  S: "Highest base stats in the game — carries you through late-game content.",
  A: "Excellent stat lines; slightly behind S-tier or built for a narrower role.",
  B: "Solid and usable everywhere; most of the dex sits here.",
  C: "Serviceable early and mid game; invest once you lack better options.",
  D: "Lowest totals — catch for the dex, not for the team.",
};

export default function TierListPage() {
  const byTier = new Map<string, typeof creatures>();
  for (const c of creatures) {
    const t = tierOf(c);
    if (!byTier.has(t)) byTier.set(t, []);
    byTier.get(t)!.push(c);
  }
  const tiers = ["S", "A", "B", "C", "D"].filter((t) => byTier.has(t));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best Aniimo in Aniimo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `At launch the highest base-stat totals belong to ${byTier.get("S")?.map((c) => c.name).slice(0, 3).join(", ")}. Base stats are the official in-game totals; team synergy and element coverage matter just as much in practice.`,
        },
      },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Tier List</h1>
      <p className="mt-2 max-w-3xl text-ink-soft">
        This tier list is generated from <strong>official base stat totals</strong> for every Aniimo at global launch,
        so you can verify every placement yourself. Community lists weigh move-sets and boss matchups — treat this as
        the stat-driven baseline, then adjust for team synergy and element coverage.
      </p>

      <div className="mt-8 space-y-8">
        {tiers.map((t) => (
          <section key={t}>
            <div className="mb-3 flex items-baseline gap-3">
              <h2 className={`font-display text-4xl font-extrabold ${t === "S" ? "text-brand" : ""}`}>{t} Tier</h2>
              <p className="text-sm text-ink-soft">{TIER_DESC[t]}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {byTier.get(t)!.map((c) => (
                <Link key={c.slug} href={`/dex/${c.slug}/`} className="dex-card flex flex-col items-center rounded-xl border border-line bg-card p-2.5 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/creatures/${c.imageId}.webp`} alt={c.name} width={96} height={96} loading="lazy" className="h-20 w-20 object-contain" />
                  <span className="text-xs font-bold leading-tight">{c.name}</span>
                  <span className="mt-0.5 text-[10px] font-semibold text-ink-soft">{c.base.stats.total}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <SectionTitle sub="Filter by what your team needs">Best by role</SectionTitle>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => {
            const top = creatures
              .filter((c) => c.role === role)
              .sort((a, b) => (b.base.stats.total ?? 0) - (a.base.stats.total ?? 0))
              .slice(0, 5);
            return (
              <div key={role} className="rounded-2xl border border-line bg-card p-4">
                <div className="font-display mb-2 text-lg font-bold">{role}</div>
                <ol className="space-y-1.5 text-sm">
                  {top.map((c, i) => (
                    <li key={c.slug} className="flex items-center gap-2">
                      <span className="w-4 text-ink-soft">{i + 1}.</span>
                      <Link href={`/dex/${c.slug}/`} className="font-semibold hover:text-brand">{c.name}</Link>
                      <span className="ml-auto flex items-center gap-1.5">
                        {c.elements.map((e) => <ElementChip key={e} el={e} />)}
                        <span className="tabular-nums font-bold">{c.base.stats.total}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
