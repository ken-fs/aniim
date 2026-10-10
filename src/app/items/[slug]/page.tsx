import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { items, itemBySlug, RARITY_STYLE, CATEGORY_BLURB, SUBCATEGORY_BLURB } from "@/lib/items";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export function generateStaticParams() {
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const it = itemBySlug.get(slug);
  if (!it) return {};
  const sub = it.subcategory && it.subcategory !== it.category ? `${it.subcategory}, ` : "";
  const base = `${it.name} — Aniimo ${it.category} Item`;
  const title: Metadata["title"] = base.length + 12 <= 60 ? base : { absolute: base };
  return {
    title,
    description: `${it.name} is a ${it.rarity} ${sub}${it.category} item in Aniimo. Rarity, category and related items in the aniim.org item database.`,
    alternates: { canonical: `/items/${it.slug}/` },
  };
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const it = itemBySlug.get(slug);
  if (!it) notFound();

  const sameSub = items.filter((x) => x.id !== it.id && x.category === it.category && x.subcategory === it.subcategory);
  const related = (sameSub.length >= 6 ? sameSub : items.filter((x) => x.id !== it.id && x.category === it.category)).slice(0, 12);
  const subBlurb = it.subcategory ? SUBCATEGORY_BLURB[it.subcategory] : undefined;
  const catBlurb = CATEGORY_BLURB[it.category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Thing",
    name: it.name,
    url: `https://aniim.org/items/${it.slug}/`,
    description: `${it.name} — ${it.rarity} ${it.category} item in Aniimo.`,
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-ink-soft">
        <Link href="/items/" className="hover:text-brand">Items</Link> <span className="mx-1">/</span> {it.category} <span className="mx-1">/</span> {it.name}
      </nav>

      <section className="mt-4 rounded-3xl border border-line bg-card p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${RARITY_STYLE[it.rarity] ?? ""}`}>{it.rarity}</span>
          <span className="rounded-full bg-ink/5 px-2.5 py-0.5 text-xs font-semibold text-ink-soft">{it.category}</span>
          {it.subcategory && it.subcategory !== it.category ? (
            <span className="rounded-full bg-ink/5 px-2.5 py-0.5 text-xs font-semibold text-ink-soft">{it.subcategory}</span>
          ) : null}
        </div>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">{it.name}</h1>
        <p className="mt-3 max-w-3xl text-ink-soft">
          {subBlurb ?? catBlurb ?? "An item in Aniimo."}
          {subBlurb && catBlurb ? ` ${catBlurb}` : ""}
        </p>
        <dl className="mt-6 grid max-w-md grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div><dt className="text-ink-soft">Category</dt><dd className="font-semibold">{it.category}</dd></div>
          <div><dt className="text-ink-soft">Subcategory</dt><dd className="font-semibold">{it.subcategory || "—"}</dd></div>
          <div><dt className="text-ink-soft">Rarity</dt><dd className="font-semibold">{it.rarity}</dd></div>
        </dl>
        <p className="mt-5 text-sm">
          <Link href="/items/" className="font-semibold text-brand hover:underline">
            ← Browse all {items.length.toLocaleString("en-US")} items in the database
          </Link>
        </p>
      </section>

      <AdsterraBanner slot={RECTANGLE} className="mt-8" />

      <section className="mt-8">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          Related {it.subcategory && it.subcategory !== it.category ? it.subcategory : it.category} items
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {related.map((r) => (
            // 普通 <a>（硬导航）：物品页不参与 RSC 侧载，配合 strip-rsc-sidecars 把每页压到 1 个文件
            <a key={r.slug} href={`/items/${r.slug}/`} className="rounded-full border border-line bg-card px-4 py-1.5 text-sm font-medium hover:bg-black/5">
              {r.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
