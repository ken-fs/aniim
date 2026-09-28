import type { Metadata } from "next";
import Link from "next/link";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { site } from "@/lib/site";
import { AnalyticsConsent } from "@/components/analytics-consent";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", images: [{ url: "/images/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image" },
};

const NAV = [
  { href: "/dex/", label: "Aniimo Dex" },
  { href: "/tier-list/", label: "Tier List" },
  { href: "/codes/", label: "Codes" },
  { href: "/map/", label: "Map" },
  { href: "/catch-calculator/", label: "Calculator" },
  { href: "/elements/", label: "Elements" },
  { href: "/guides/", label: "Guides" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
          <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-4">
            <Link href="/" className="font-display text-xl font-bold tracking-tight">
              aniim<span className="text-brand">.org</span>
            </Link>
            <nav className="hidden gap-1 md:flex">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="rounded-lg px-3 py-1.5 text-sm font-medium text-ink-soft hover:bg-black/5 hover:text-ink">
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto" />
          </div>
          <nav className="flex gap-1 overflow-x-auto border-t border-line px-4 py-1.5 md:hidden">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="whitespace-nowrap rounded-lg px-3 py-1 text-sm font-medium text-ink-soft">
                {n.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line bg-card">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
            <div>
              <div className="font-display text-lg font-bold">aniim.org</div>
              <p className="mt-2 text-sm text-ink-soft">
                The fan-made Aniimo database: creatures, stats, evolutions, codes and guides. Updated for the global launch.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold">Database</div>
              <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                <li><Link href="/dex/">Aniimo Dex</Link></li>
                <li><Link href="/map/">Interactive Map</Link></li>
                <li><Link href="/elements/">Elements</Link></li>
                <li><Link href="/habitats/">Habitats</Link></li>
                <li><Link href="/tier-list/">Tier List</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold">Players</div>
              <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                <li><Link href="/codes/">Gift Codes</Link></li>
                <li><Link href="/catch-calculator/">Catch Calculator</Link></li>
                <li><Link href="/guides/">Guides</Link></li>
                <li><Link href="/guides/catch-chance/">Catch Chance Guide</Link></li>
                <li><Link href="/guides/beginner/">Beginner Guide</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold">Site</div>
              <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                <li><Link href="/about/">About</Link></li>
                <li><Link href="/privacy/">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-line px-4 py-4 text-center text-xs text-ink-soft">
            aniim.org is an unofficial fan site. Aniimo is a trademark of Pawprint Studio / Kingnet. Not affiliated with or endorsed by the developer.
          </div>
        </footer>
      </body>
    </html>
  );
}
