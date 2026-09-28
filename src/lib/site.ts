// 站点单一事实来源(AGENTS.md 教训:别散落多处兜底)
export const site = {
  name: "aniim.org",
  domain: "aniim.org",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aniim.org",
  title: "Aniimo Wiki & Database — aniim.org",
  description:
    "The complete Aniimo database: all 100+ creatures with stats, skills, evolutions and habitats, plus tier list, redeem codes and beginner guides.",
  game: "Aniimo",
  developer: "Pawprint Studio",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;

export const CDN =
  "https://worldx-website-cdn.aniimo.com/official-website/worldx/wiki_stage/init";

export function creatureArt(imageId: string) {
  return `${CDN}/Wiki_Aniimo_${imageId}.png`;
}
export function petHead(id: string) {
  return `${CDN}/Wiki_PetHead_${id}.png`;
}
