// Adsterra ad units — single source of truth.
//
// Copy each unit's GET CODE snippet verbatim into `src` below. Adsterra has used
// at least two snippet shapes over time and they are not interchangeable, so the
// full URL is stored rather than reconstructed from the key.
//
// A slot with an empty key renders nothing (`AdsterraBanner` returns null), so
// this file is safe to ship before units for this domain are approved — ads
// appear only once the keys are filled in.
//
// ⚠️ Adsterra keys are per-website: units approved for another domain (e.g.
// petsuniverse.site) must NOT be reused here. Add aniim.org in the Adsterra
// dashboard, create units, and paste their keys + src URLs below.
//
// NOTE: Adsterra also expects its ads.txt record in public/ads.txt (from the
// dashboard). Without it, demand-side platforms cannot verify the inventory.

export type AdSlot = {
  key: string;
  width: number;
  height: number;
  /** Exact script URL from the dashboard's GET CODE snippet. */
  src: string;
};

/** 728×90 leaderboard. Desktop only — it overflows phones. */
export const LEADERBOARD: AdSlot = {
  key: "67d3c8bba945881e73e6e3bcd9a9b4a4",
  width: 728,
  height: 90,
  src: "https://bauval.org/22/67d3c8bba945881e73e6e3bcd9a9b4a4",
};

/** 300×250 rectangle. Fits every viewport. */
export const RECTANGLE: AdSlot = {
  key: "46b0207a74b95818bdca19e007c8c973",
  width: 300,
  height: 250,
  src: "https://bauval.org/22/46b0207a74b95818bdca19e007c8c973",
};
