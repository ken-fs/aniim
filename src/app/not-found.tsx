import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-24 text-center">
      <div className="font-display text-6xl font-extrabold text-brand">404</div>
      <h1 className="font-display mt-3 text-2xl font-bold">This Aniimo ran away</h1>
      <p className="mt-2 text-ink-soft">The page you were looking for is not in our index. Try the dex instead.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/dex/" className="rounded-xl bg-ink px-5 py-2.5 font-semibold text-paper hover:bg-ink/85">Open the Dex</Link>
        <Link href="/" className="rounded-xl border border-ink/15 bg-card px-5 py-2.5 font-semibold hover:bg-black/5">Home</Link>
      </div>
    </div>
  );
}
