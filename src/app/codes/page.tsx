import type { Metadata } from "next";
import codesData from "@/data/codes.json";
import { CopyCode } from "./copy-code";

const ACTIVE_COUNT = codesData.codes.filter((c) => c.status === "active").length;

export const metadata: Metadata = {
  title: `Aniimo Codes (Sept 2026) — ${ACTIVE_COUNT} Working Codes`,
  description:
    `All working Aniimo gift codes with rewards and region notes. Last checked ${codesData.checked} — updated the day a code drops or expires.`,
  alternates: { canonical: "/codes/" },
};

export default function CodesPage() {
  const active = codesData.codes.filter((c) => c.status === "active");
  const expired = codesData.codes.filter((c) => c.status !== "active");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I redeem a code in Aniimo?",
        acceptedAnswer: { "@type": "Answer", text: codesData.redeem.join(" ") },
      },
      {
        "@type": "Question",
        name: "Are Aniimo codes free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Gift codes are free reward codes posted by the developer for milestones, launch events and promotions. Never pay for a code.",
        },
      },
      {
        "@type": "Question",
        name: "Why did an Aniimo code not work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The three common causes: the code expired, it is region-locked (some codes are US-only), or you already claimed it on that account. Codes are single-use per account.",
        },
      },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Aniimo Gift Codes</h1>
      <p className="mt-2 text-ink-soft">
        Every working Aniimo redeem code, what it rewards, and where it works. Last checked{" "}
        <strong>{codesData.checked}</strong> · <strong>{active.length} live</strong>.
      </p>

      <div className="mt-6 space-y-2">
        {active.map((c) => (
          <div key={c.code} className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3">
            <code className="font-display text-lg font-bold tracking-wide text-brand">{c.code}</code>
            <span className="text-sm text-ink-soft">{c.rewards}</span>
            {c.region && <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs font-semibold text-ink-soft">{c.region}</span>}
            <span className="ml-auto"><CopyCode code={c.code} /></span>
          </div>
        ))}
      </div>

      {expired.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-bold text-ink-soft">Expired codes</h2>
          <p className="mt-1 text-sm text-ink-soft">Listed for reference — these no longer work.</p>
          <div className="mt-3 space-y-1.5">
            {expired.map((c) => (
              <div key={c.code} className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-card/60 px-4 py-2 text-sm">
                <code className="font-semibold text-ink-soft line-through">{c.code}</code>
                <span className="text-xs text-ink-soft">{c.rewards}</span>
                {"expired" in c && c.expired && <span className="ml-auto text-xs text-ink-soft">expired {c.expired}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold">How to redeem codes in Aniimo</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-soft">
          {codesData.redeem.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold">FAQ</h2>
        <div className="mt-3 space-y-4">
          <div>
            <h3 className="font-semibold">Are Aniimo codes free?</h3>
            <p className="text-ink-soft">Yes. Gift codes are free reward codes posted by the developer for milestones, launch events and promotions. Never pay for a code.</p>
          </div>
          <div>
            <h3 className="font-semibold">Why did a code not work?</h3>
            <p className="text-ink-soft">Usually one of three reasons: the code expired, it is region-locked (a few codes are US-only), or you already claimed it — codes are single-use per account.</p>
          </div>
          <div>
            <h3 className="font-semibold">How often are codes added?</h3>
            <p className="text-ink-soft">Mostly around launch milestones, updates and events. This page is checked daily and updated the day a code drops or retires.</p>
          </div>
        </div>
      </section>

      <p className="mt-10 text-xs text-ink-soft">
        Codes are community-reported and cross-checked against official announcements; the checked date above is when this page was last verified.
      </p>
    </div>
  );
}
