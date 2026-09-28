import Link from "next/link";
import type { Metadata } from "next";
import { creatures, elements, roles } from "@/lib/creatures";
import { CreatureCard, SectionTitle } from "@/components/ui";
import { site } from "@/lib/site";
import codes from "@/data/codes.json";

export const metadata: Metadata = {
  title: "Aniimo Wiki & Database — Dex, Tier List, Codes & Guides",
  description: site.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  const totalForms = creatures.reduce((n, c) => n + Object.keys(c.forms).length, 0);
  const starterA = creatures.find((c) => c.name === "Helion");
  const starterB = creatures.find((c) => c.name === "Lunara");
  const featured = [...creatures].sort((a, b) => (b.base.stats.total ?? 0) - (a.base.stats.total ?? 0)).slice(0, 8);
  const activeCodes = codes.codes.filter((c) => c.status === "active");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    about: { "@type": "VideoGame", name: "Aniimo", gamePlatform: ["PC", "Xbox", "PlayStation", "Mobile"] },
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="grid items-center gap-8 py-12 md:grid-cols-2 md:py-16">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs font-semibold text-ink-soft">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-brand" /></span>
            Updated for global launch · Sept 2026
          </div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
            The complete <span className="text-brand">Aniimo</span> database
          </h1>
          <p className="mt-4 max-w-md text-lg text-ink-soft">
            {creatures.length} Aniimo with official stats, skills, evolutions and habitats — plus launch codes, tier list and catch-chance math.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dex/" className="rounded-xl bg-ink px-5 py-2.5 font-semibold text-paper hover:bg-ink/85">Open the Dex</Link>
            <Link href="/codes/" className="rounded-xl border border-ink/15 bg-card px-5 py-2.5 font-semibold hover:bg-black/5">
              {activeCodes.length} active codes
            </Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero.webp" alt="Aniimo creatures" width={1280} height={520} fetchPriority="high" className="h-auto w-full rounded-3xl" />
        </div>
      </section>

      {/* 统计带 */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          [String(creatures.length), "Aniimo indexed"],
          [String(totalForms), "Forms tracked"],
          [String(elements.length), "Elements"],
          [String(activeCodes.length), "Live gift codes"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-2xl border border-line bg-card p-4 text-center">
            <div className="font-display text-3xl font-extrabold">{n}</div>
            <div className="text-xs font-medium text-ink-soft">{l}</div>
          </div>
        ))}
      </section>

      {/* 强力生物 */}
      <section className="py-12">
        <SectionTitle sub="Ranked by official base stat total">Strongest Aniimo at launch</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {featured.map((c) => <CreatureCard key={c.slug} c={c} />)}
        </div>
        <div className="mt-4 text-right">
          <Link href="/dex/" className="text-sm font-semibold text-brand hover:underline">View all {creatures.length} →</Link>
        </div>
      </section>

      {/* 初始选择 */}
      {starterA && starterB && (
        <section className="pb-12">
          <SectionTitle sub="Both starters share identical stats — the traits differ">Helion or Lunara?</SectionTitle>
          <div className="grid gap-3 md:grid-cols-2">
            {[starterA, starterB].map((s) => (
              <Link key={s.slug} href={`/dex/${s.slug}/`} className="dex-card flex items-center gap-4 rounded-2xl border border-line bg-card p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/creatures/${s.imageId}.webp`} alt={s.name} width={96} height={96} className="h-24 w-24 object-contain" />
                <div>
                  <div className="font-display text-lg font-bold">{s.name}</div>
                  <div className="text-xs font-semibold text-ink-soft">holy · DPS · total {s.base.stats.total}</div>
                  <p className="mt-1 text-sm text-ink-soft">{s.base.trait?.name} — {s.base.trait?.desc.split(". ")[0]}.</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 text-right">
            <Link href="/guides/beginner/" className="text-sm font-semibold text-brand hover:underline">Full starter comparison →</Link>
          </div>
        </section>
      )}

      {/* 快捷入口 */}
      <section className="grid gap-3 pb-12 md:grid-cols-3">
        <Link href="/tier-list/" className="dex-card rounded-2xl border border-line bg-card p-5">
          <div className="font-display text-lg font-bold">Tier List</div>
          <p className="mt-1 text-sm text-ink-soft">Best Aniimo by role — DPS, BREAK, Support and Heal rankings from launch stats.</p>
        </Link>
        <Link href="/guides/catch-chance/" className="dex-card rounded-2xl border border-line bg-card p-5">
          <div className="font-display text-lg font-bold">Catch Chance Guide</div>
          <p className="mt-1 text-sm text-ink-soft">The official catch formula explained: Aniipods, HP multiplier, backstab and Alpha odds.</p>
        </Link>
        <Link href="/habitats/" className="dex-card rounded-2xl border border-line bg-card p-5">
          <div className="font-display text-lg font-bold">Habitats</div>
          <p className="mt-1 text-sm text-ink-soft">Where every Aniimo spawns — browse creatures by region across Idyll.</p>
        </Link>
      </section>

      {/* 元素速览 */}
      <section className="pb-14">
        <SectionTitle sub={`${roles.length} roles · ${elements.length} elements`}>Browse by element</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {elements.map((e) => (
            <Link key={e} href={`/elements/#${e}`} className="el-chip rounded-full px-4 py-1.5 text-sm font-semibold capitalize"
              style={{ ["--el" as string]: `var(--color-el-${{ fire: "fire", water: "water", grass: "flora", electric: "volt", ice: "frost", rock: "terra", wind: "gale", dark: "umbra", holy: "lumen" }[e] ?? "neutral"})` }}>
              {e} ({creatures.filter((c) => c.elements.includes(e)).length})
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
