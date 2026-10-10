import type { Metadata } from "next";
import codesData from "@/data/codes.json";
import { CopyCode } from "./copy-code";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { LEADERBOARD, RECTANGLE } from "@/lib/ads";

type GiftCode = {
  code: string;
  rewards: string;
  added?: string;
  expired?: string;
  status: string;
  region?: string;
};

const ALL: GiftCode[] = codesData.codes as GiftCode[];
const ACTIVE = ALL.filter((c) => c.status === "active");
const EXPIRED = ALL.filter((c) => c.status !== "active");

const checkedMs = Date.parse(`${codesData.checked}T00:00:00Z`);
const monthLabel = Number.isFinite(checkedMs)
  ? new Date(checkedMs).toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
  : "";

const REWARD_UNITS = ["Aniipod Pro", "Aniipod", "Glimmer", "Credits", "Growth Flower"];
const SUMMARY = (() => {
  const totals = new Map<string, number>();
  for (const c of ACTIVE) {
    for (const m of c.rewards.matchAll(/([\d,]+)\s*(Aniipod Pro|Aniipod|Glimmer|Credits|Growth Flower)/g)) {
      totals.set(m[2], (totals.get(m[2]) ?? 0) + Number(m[1].replace(/,/g, "")));
    }
  }
  return REWARD_UNITS.filter((u) => totals.has(u)).map((u) => `${totals.get(u)!.toLocaleString("en-US")} ${u}`);
})();

function isNew(added?: string) {
  if (!added || !Number.isFinite(checkedMs)) return false;
  const t = Date.parse(`${added}T00:00:00Z`);
  return Number.isFinite(t) && checkedMs - t >= 0 && checkedMs - t <= 7 * 864e5;
}

export const metadata: Metadata = {
  title: `Aniimo Codes (${monthLabel}) — ${ACTIVE.length} Working Codes`,
  description:
    `All working Aniimo gift codes with rewards and region notes, re-checked daily. Last checked ${codesData.checked} — ${ACTIVE.length} live codes and a running total of everything they give.`,
  alternates: { canonical: "/codes/" },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "How do I redeem a code in Aniimo?",
    a: codesData.redeem.join(" "),
  },
  {
    q: "Are Aniimo codes free?",
    a: "Yes. Gift codes are free reward codes posted by the developer for milestones, launch events and promotions. Never pay for a code.",
  },
  {
    q: "Why did an Aniimo code not work?",
    a: "The three common causes: the code expired, it is region-locked (some codes are US-only), or you already claimed it on that account. Codes are single-use per account.",
  },
  {
    q: "Do Aniimo codes expire?",
    a: `Yes, and faster than you may expect — launch-period codes have been retired within days of appearing (${EXPIRED.length > 0 ? `${EXPIRED[0].code} stopped working on ${EXPIRED[0].expired ?? "its retirement date"}` : "several launch codes stopped working"}). Redeem new codes as soon as you see them.`,
  },
  {
    q: "Where do new Aniimo codes come from?",
    a: "The developer posts them for launch milestones, updates, events and collaborations. This page tracks two independent code databases plus official announcements, so new codes usually appear here within a day.",
  },
];

export default function CodesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Gift Codes</h1>
      <p className="mt-2 text-ink-soft">
        Every working Aniimo redeem code, what it rewards, and where it works. Last checked{" "}
        <strong>{codesData.checked}</strong> · <strong>{ACTIVE.length} live</strong>.
      </p>
      {SUMMARY.length > 0 && (
        <p className="mt-4 rounded-2xl border border-line bg-card px-4 py-3 text-sm text-ink-soft">
          Claiming every live code currently nets{" "}
          <strong className="text-ink">{SUMMARY.join(" · ")}</strong>.
        </p>
      )}

      <AdsterraBanner slot={LEADERBOARD} className="mt-6 hidden md:flex" />
      <div className="mt-6 space-y-2">
        {ACTIVE.map((c) => (
          <div key={c.code} className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <code className="font-display text-lg font-bold tracking-wide text-brand">{c.code}</code>
                {isNew(c.added) && (
                  <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-bold text-brand">New</span>
                )}
                {c.region && (
                  <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs font-semibold text-ink-soft">{c.region}</span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-ink-soft">
                {c.rewards}
                {c.added ? ` · added ${c.added}` : ""}
              </p>
            </div>
            <CopyCode code={c.code} />
          </div>
        ))}
      </div>

      {EXPIRED.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-bold text-ink-soft">Expired codes</h2>
          <p className="mt-1 text-sm text-ink-soft">Listed for reference — these no longer work.</p>
          <div className="mt-3 space-y-1.5">
            {EXPIRED.map((c) => (
              <div key={c.code} className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-card/60 px-4 py-2 text-sm">
                <code className="font-semibold text-ink-soft line-through">{c.code}</code>
                <span className="text-xs text-ink-soft">{c.rewards}</span>
                {c.expired && <span className="ml-auto text-xs text-ink-soft">expired {c.expired}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      <AdsterraBanner slot={RECTANGLE} className="mt-8" />

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold">How to redeem codes in Aniimo</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-soft">
          {codesData.redeem.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold">How this page stays accurate</h2>
        <p className="mt-2 text-ink-soft">
          An automated job re-checks this list every day against independent trackers ({codesData.sources.join(", ")})
          and the game&apos;s official channels. A code is only retired after two consecutive daily checks miss it in
          both trackers — so a wrong &ldquo;expired&rdquo; verdict is rare — and the <strong>Last checked</strong> date
          above updates even on days when nothing changes. If a working code is missing here, it usually shows up
          within a day.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold">FAQ</h2>
        <div className="mt-3 space-y-4">
          {FAQ.slice(1).map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold">{f.q}</h3>
              <p className="text-ink-soft">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 text-xs text-ink-soft">
        Codes are community-reported and cross-checked against official announcements; the checked date above is when
        this page was last verified.
      </p>
    </div>
  );
}
