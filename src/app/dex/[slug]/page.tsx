import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { creatures, creatureBySlug, formLabel } from "@/lib/creatures";
import { items } from "@/lib/items";
import { ElementChip, RoleChip, SectionTitle } from "@/components/ui";
import { regionSlug } from "@/lib/forms-meta";
import { FormViewer } from "./form-viewer";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export function generateStaticParams() {
  return creatures.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = creatureBySlug.get(slug);
  if (!c) return {};
  const forms = Object.keys(c.forms).length;
  const base = `${c.name} — Stats, Skills, Evolution & Habitats`;
  // 加品牌后缀超 60 字符时用 absolute(否则 SERP 会截断)
  const title: Metadata["title"] = base.length + 12 <= 60 ? base : { absolute: base };
  return {
    title,
    description: `${c.name} is a ${c.elements.join("/")} ${c.role} Aniimo (base total ${c.base.stats.total}). Stats, skills, ${forms} form${forms > 1 ? "s" : ""}, evolution stages and habitats.`,
    alternates: { canonical: `/dex/${c.slug}/` },
  };
}

export default async function CreaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = creatureBySlug.get(slug);
  if (!c) notFound();

  const related = creatures.filter((x) => x.slug !== c.slug && x.elements.some((e) => c.elements.includes(e))).slice(0, 8);
  const evoCount = c.base.evolutionStages.length;

  // 获取方式:匹配蛋物品。词边界匹配(避免 "Iris" 命中 "Irisalis")
  const esc = c.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const nameRe = new RegExp(`(?:^|[^a-z])${esc}(?:[^a-z]|$)`, "i");
  const eggs = items.filter((i) => /(?:^| )Egg$/i.test(i.name) && nameRe.test(i.name)).slice(0, 8);

  // 队伍搭配:角色归一(数据里 Break/BREAK 混用) + 基础属性排序
  const roleKey = (r: string) => (/dps/i.test(r) ? "DPS" : /break/i.test(r) ? "BREAK" : "SUPPORT");
  const ranked = creatures.filter((x) => x.slug !== c.slug).sort((a, b) => (b.base.stats.total ?? 0) - (a.base.stats.total ?? 0));
  const topBy = (key: string, n = 3) => ranked.filter((x) => roleKey(x.role) === key).slice(0, n);
  const mine = roleKey(c.role);
  const partnerGroups =
    mine === "DPS"
      ? [{ label: "BREAK partners", list: topBy("BREAK") }, { label: "Support partners", list: topBy("SUPPORT") }]
      : mine === "BREAK"
        ? [{ label: "DPS partners", list: topBy("DPS") }, { label: "Support partners", list: topBy("SUPPORT") }]
        : [{ label: "DPS partners", list: topBy("DPS") }, { label: "BREAK partners", list: topBy("BREAK") }];
  const sameRole = ranked.filter((x) => roleKey(x.role) === mine).slice(0, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Thing",
    name: c.name,
    description: c.description,
    url: `https://aniim.org/dex/${c.slug}/`,
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-ink-soft">
        <Link href="/dex/" className="hover:text-brand">Dex</Link> <span className="mx-1">/</span> #{String(c.number).padStart(3, "0")} {c.name}
      </nav>

      {/* Hero */}
      <section className="mt-4 grid gap-6 md:grid-cols-[320px_1fr]">
        <div className="rounded-3xl border border-line bg-card p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/creatures/${c.imageId}.webp`} alt={c.name} width={280} height={280} fetchPriority="high"
            className="mx-auto h-56 w-56 object-contain" />
        </div>
        <div className="rounded-3xl border border-line bg-card p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-ink-soft">NO.{String(c.number).padStart(3, "0")}</span>
            {c.elements.map((e) => <ElementChip key={e} el={e} />)}
            <RoleChip role={c.role} />
          </div>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">{c.name}</h1>
          <p className="mt-2 max-w-xl text-ink-soft">{c.description}</p>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-3">
            <div><dt className="text-ink-soft">Total stats</dt><dd className="font-display text-xl font-bold">{c.base.stats.total ?? "—"}</dd></div>
            <div><dt className="text-ink-soft">Forms</dt><dd className="font-display text-xl font-bold">{Object.keys(c.forms).length}</dd></div>
            <div><dt className="text-ink-soft">Evolution stages</dt><dd className="font-display text-xl font-bold">{evoCount || "—"}</dd></div>
          </dl>
        </div>
      </section>

      {/* 形态与数据(客户端切换) */}
      <section className="mt-6">
        <FormViewer creature={c} />
      </section>

      <AdsterraBanner slot={RECTANGLE} className="mt-8" />

      {/* 获取方式 */}
      <section className="mt-8">
        <SectionTitle sub="Wild spawns, eggs and evolution">How to get {c.name}</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-card p-5">
            <h3 className="font-display text-lg font-bold">In the wild</h3>
            {c.base.habitats?.length ? (
              <>
                <p className="mt-1 text-sm text-ink-soft">Official spawn regions for {c.name} — open the map to see the spots:</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.base.habitats.map((h) => (
                    <Link key={h} href={`/map/?region=${regionSlug(h)}`} className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm font-medium hover:bg-black/5">
                      {h}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-1 text-sm text-ink-soft">No spawn region recorded for {c.name} in our data yet — it may come from eggs, evolution or a later-game area.</p>
            )}
          </div>
          <div className="rounded-2xl border border-line bg-card p-5">
            <h3 className="font-display text-lg font-bold">Hatch from eggs</h3>
            {eggs.length ? (
              <>
                <p className="mt-1 text-sm text-ink-soft">
                  Eggs tied to {c.name} in the item database
                  {eggs.some((e) => /^prismana/i.test(e.name)) ? " — Prismana eggs hatch the Prismana form" : ""}:
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {eggs.map((e) => (
                    <Link key={e.slug} href={`/items/${e.slug}/`} className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm font-medium hover:bg-black/5">
                      {e.name}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-1 text-sm text-ink-soft">No {c.name}-specific egg in the item database — this one comes from catching it directly in the wild.</p>
            )}
          </div>
        </div>
      </section>

      {/* 进化链 */}
      {c.base.evolutionHeads.length > 0 && (
        <section className="mt-8">
          <SectionTitle sub={c.base.evolutionStages.join(" → ") || "Evolution chain"}>Evolution</SectionTitle>
          <div className="flex flex-wrap items-center gap-3">
            {c.base.evolutionHeads.map((h, i) => (
              <div key={h} className="flex items-center gap-3">
                <div className="rounded-2xl border border-line bg-card p-3 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/creatures/head_${h}.webp`} alt="stage" width={64} height={64} loading="lazy" className="h-14 w-14 object-contain" />
                  <div className="mt-1 text-[11px] font-semibold text-ink-soft">
                    {c.base.evolutionStages[i] ?? `Stage ${i + 1}`}
                  </div>
                </div>
                {i < c.base.evolutionHeads.length - 1 && <span className="text-lg text-ink-soft">→</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 队伍搭配 */}
      <section className="mt-10">
        <SectionTitle sub="Base-stat picks — same method as the tier list">Best team with {c.name}</SectionTitle>
        <p className="max-w-3xl text-ink-soft">
          {c.name} fills the <strong>{c.role}</strong> slot. A comfortable team is one damage dealer, one BREAK and one
          support — so the practical question is who covers the other two slots. These are the highest base-stat Aniimo
          in each role right now:
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {partnerGroups.map((g) => (
            <div key={g.label} className="rounded-2xl border border-line bg-card p-5">
              <h3 className="font-display text-base font-bold">{g.label}</h3>
              <div className="mt-3 space-y-2">
                {g.list.map((p) => (
                  <Link key={p.slug} href={`/dex/${p.slug}/`} className="flex items-center gap-3 rounded-xl border border-line bg-paper px-3 py-2 hover:bg-black/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/images/creatures/${p.imageId}.webp`} alt={p.name} width={36} height={36} loading="lazy" className="h-9 w-9 object-contain" />
                    <span className="text-sm font-semibold">{p.name}</span>
                    <span className="ml-auto text-xs text-ink-soft">{p.role} · {p.base.stats.total ?? "—"}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        {sameRole.length > 1 && (
          <p className="mt-4 text-sm text-ink-soft">
            Prefer another {mine.toLowerCase()}? Highest-stat alternatives:{" "}
            {sameRole.map((p, i) => (
              <span key={p.slug}>
                {i > 0 ? ", " : ""}
                <Link href={`/dex/${p.slug}/`} className="font-semibold text-brand hover:underline">{p.name}</Link>
              </span>
            ))}
          </p>
        )}
      </section>

      {/* 同元素 */}
      <section className="mt-10">
        <SectionTitle sub={`More ${c.elements[0]}-type Aniimo`}>Related</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {related.map((r) => (
            <Link key={r.slug} href={`/dex/${r.slug}/`} className="flex items-center gap-2 rounded-full border border-line bg-card py-1 pr-3 pl-1 hover:bg-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/creatures/${r.imageId}.webp`} alt={r.name} width={32} height={32} loading="lazy" className="h-8 w-8 object-contain" />
              <span className="text-sm font-semibold">{r.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
