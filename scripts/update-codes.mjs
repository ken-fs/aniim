#!/usr/bin/env node
/**
 * update-codes.mjs — 每日核对 Aniimo 礼包码（零 AI、零依赖）
 *
 * 信源（固定 URL 直抓，不走 SERP）：
 *   1. beebom.com/aniimo-codes/    独立聚合，有 active / expired 分区
 *   2. aniidex.com/codes/          结构化卡片，带 added 日期和区域
 *
 * 策略：
 *   - 两源都没出现的活码 → miss+1，连续 2 次才标记过期（防单源故障误杀）
 *   - 出现在 expired 分区 → 直接标过期
 *   - 新码：必须含 "aniim"（防误抓普通单词），reward 取有描述的一侧
 *   - 无变化也会更新 checked 日期并提交（保持 "Last checked" 真实 = 每天推送新鲜度信号）
 *
 * 用法：node scripts/update-codes.mjs [--dry]
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CODES = join(ROOT, "src/data/codes.json");
const STATE = join(ROOT, "scripts/.codes-state.json");
const DRY = process.argv.includes("--dry");
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36";

const today = new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD

async function fetchText(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(25000) });
      if (r.ok) return await r.text();
    } catch { /* retry */ }
    await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
  }
  return null;
}

function pipeText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, "|")
    .replace(/\s+/g, " ")
    .replace(/\|+/g, "|");
}

const CODE_RE = /^[A-Za-z0-9]{4,24}$/;

/** aniidex: 结构化卡片 → 活跃码 */
function parseAniidex(html) {
  const text = pipeText(html);
  const out = new Map();
  const re = /Gift code\|([A-Za-z0-9]+)\|Copy\| code\|(.+?)\|Added\|([^|]+)\|Expires\|([^|]+)\|?(?:Works in\|([^|]+)\|)?/g;
  for (const m of text.matchAll(re)) {
    out.set(m[1].toLowerCase(), {
      code: m[1],
      rewards: m[2].replace(/\|New\|.*/, "").replace(/\|/g, ", ").replace(/,\s*$/, "").trim(),
      added: parseDate(m[3]),
      region: (m[5] || "").trim() || undefined,
    });
  }
  return out;
}

/** beebom: active 列表 + expired 列表 */
function parseBeebom(html) {
  const text = pipeText(html);
  const active = new Map();
  const expired = new Set();
  const ai = text.indexOf("All New Aniimo Codes");
  const ei = text.indexOf("Expired Aniimo Codes");
  const activeSec = ai >= 0 ? text.slice(ai, ei > ai ? ei : ai + 6000) : "";
  const expiredSec = ei >= 0 ? text.slice(ei, ei + 2500) : "";

  for (const m of activeSec.matchAll(/\|([A-Za-z0-9]{4,24})\|:\s*([^|]+)/g)) {
    const code = m[1];
    if (!CODE_RE.test(code)) continue;
    if (!/aniim/i.test(code)) {
      console.log(`  [review] beebom 活跃区出现非 aniim 码：${code} — 未自动收录`);
      continue;
    }
    active.set(code.toLowerCase(), { code, rewards: m[2].replace(/\(?\|NEW\|.*/i, "").replace(/,\s*$/, "").trim() });
  }
  for (const m of expiredSec.matchAll(/\|([A-Za-z0-9]{4,24})\|/g)) {
    const code = m[1];
    if (CODE_RE.test(code) && /aniim/i.test(code)) expired.add(code.toLowerCase());
  }
  return { active, expired };
}

function parseDate(s) {
  const m = /(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/.exec(s);
  if (!m) return today;
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${m[3]}-${String(months.indexOf(m[2]) + 1).padStart(2, "0")}-${String(m[1]).padStart(2, "0")}`;
}

async function main() {
  console.log(`[codes] ${today} 核对开始`);
  const [beebomHtml, aniidexHtml] = await Promise.all([
    fetchText("https://beebom.com/aniimo-codes/"),
    fetchText("https://aniidex.com/codes/"),
  ]);
  const beebom = beebomHtml ? parseBeebom(beebomHtml) : { active: new Map(), expired: new Set() };
  const aniidex = aniidexHtml ? parseAniidex(aniidexHtml) : new Map();
  console.log(`  来源: beebom=${beebomHtml ? `${beebom.active.size} active / ${beebom.expired.size} expired` : "失败"}  aniidex=${aniidexHtml ? `${aniidex.size} active` : "失败"}`);
  if (!beebomHtml && !aniidexHtml) {
    console.error("  ✗ 两个来源都抓不到，放弃本次更新");
    process.exit(1);
  }

  const sourceActive = new Map();
  for (const [k, v] of aniidex) sourceActive.set(k, v);
  for (const [k, v] of beebom.active) if (!sourceActive.has(k)) sourceActive.set(k, v);

  const data = JSON.parse(readFileSync(CODES, "utf8"));
  const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, "utf8")) : { misses: {} };
  const before = JSON.stringify(data);

  const seen = new Set();
  for (const c of data.codes) {
    const k = c.code.toLowerCase();
    seen.add(k);
    const inSources = sourceActive.has(k);
    const explicitlyExpired = beebom.expired.has(k);

    if (inSources) {
      state.misses[k] = 0;
      if (c.status !== "active") {
        console.log(`  ♻ ${c.code} 重新生效`);
        c.status = "active";
        delete c.expired;
      }
      continue;
    }
    if (c.status === "active") {
      if (explicitlyExpired) {
        console.log(`  ✗ ${c.code} → 过期（来源明确标记）`);
        c.status = "expired";
        c.expired = today;
      } else {
        state.misses[k] = (state.misses[k] ?? 0) + 1;
        if (state.misses[k] >= 2) {
          console.log(`  ✗ ${c.code} → 过期（连续 ${state.misses[k]} 次未出现）`);
          c.status = "expired";
          c.expired = today;
        } else {
          console.log(`  ? ${c.code} 未出现（miss ${state.misses[k]}/2，暂留）`);
        }
      }
    }
  }

  for (const [k, v] of sourceActive) {
    if (seen.has(k)) continue;
    console.log(`  + 新码 ${v.code} — ${v.rewards || "(无描述)"}`);
    data.codes.push({
      code: v.code,
      rewards: v.rewards || "Rewards not yet confirmed",
      added: v.added ?? today,
      status: "active",
      ...(v.region ? { region: v.region } : {}),
    });
  }

  data.checked = today;
  data.codes.sort((a, b) => (a.status === b.status ? 0 : a.status === "active" ? -1 : 1));

  const after = JSON.stringify(data);
  if (!DRY) {
    writeFileSync(CODES, JSON.stringify(data, null, 1), "utf8");
    writeFileSync(STATE, JSON.stringify(state), "utf8");
  }
  if (before === after && !DRY) {
    console.log("  无实质变化（checked 日期已刷新）");
  }

  const active = data.codes.filter((c) => c.status === "active").length;
  console.log(`[codes] 完成：${active} 活跃 / ${data.codes.length - active} 过期`);

  if (DRY) return;
  // 提交推送（部署 = git push；SSH 主通道，代理 https 兜底）
  const git = (args, env = {}) => execFileSync("git", args, { cwd: ROOT, env: { ...process.env, ...env }, stdio: "pipe" });
  try {
    git(["add", "src/data/codes.json"]);
    git(["commit", "-m", `codes: daily check ${today}`]);
  } catch {
    console.log("  git commit 无变化或跳过");
    return;
  }
  try {
    git(["push", "-q", "origin", "main"]);
    console.log("  ✅ 已推送（SSH）");
  } catch {
    try {
      git(["push", "-q", "origin", "main"], { https_proxy: "http://127.0.0.1:7897", http_proxy: "http://127.0.0.1:7897" });
      console.log("  ✅ 已推送（代理）");
    } catch (e) {
      console.error("  ⚠️ 推送失败，内容已 commit 留在本地：", String(e).slice(0, 200));
    }
  }
}

main();
