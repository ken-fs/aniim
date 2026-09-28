import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How aniim.org handles data: no accounts, no tracking without consent, and what analytics we do collect.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: 28 September 2026</p>

      <div className="mt-6 space-y-6 text-ink-soft">
        <section>
          <h2 className="font-display text-xl font-bold text-ink">What we collect</h2>
          <p className="mt-2">This site has no accounts and no login. We store one thing on your device: your analytics consent choice, in local storage.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-ink">Analytics</h2>
          <p className="mt-2">If — and only if — you accept the consent banner, we load Google Analytics to count visits and see which pages help players. Decline, and nothing from Google is loaded and no analytics cookies are set. Your choice is remembered and can be changed by clearing site data.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-ink">Third parties</h2>
          <p className="mt-2">Creature artwork is served from the game developer&apos;s CDN. The site is hosted on Cloudflare. We do not sell, rent, or share personal data with anyone.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-ink">Contact</h2>
          <p className="mt-2">Questions or removal requests about any content on this site can be raised through the contact listed in the site profile.</p>
        </section>
      </div>
    </div>
  );
}
