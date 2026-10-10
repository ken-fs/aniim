#!/usr/bin/env node
/**
 * strip-rsc-sidecars.mjs — 精简静态导出产物（降低 Cloudflare 静态资源文件数）
 *
 * 背景:next build 给每个动态页生成 5 个文件(index.html + 4 个 RSC 侧载)。
 * 3,450 个物品页 ≈ 17k 文件,逼近 Cloudflare Workers 免费档 2 万文件上限。
 *
 * 设计:物品页全部用普通 <a> 链接(表格 / 关联区 / A-Z 索引),不做客户端软导航、
 * 不预取 RSC —— 因此物品页的 4 个侧载文件永远不会被请求,全部删除,
 * 每个物品页只剩 index.html(HTML 里内联了完整的 RSC 数据,首次加载/水合不受影响)。
 * 全站文件数 18k → ~4.3k。
 *
 * ⚠️ 如果以后把某个物品页链接改回 <Link> 软导航,这里删掉的 __PAGE__.txt 会 404,
 * 软导航会退化成硬跳转 —— 改回时记得同步改回本脚本。
 */
import { readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "out", "items");

let removed = 0;
for (const entry of readdirSync(OUT, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dir = join(OUT, entry.name);
  for (const f of readdirSync(dir)) {
    if (f === "index.txt" || (f.startsWith("__next.") && f.endsWith(".txt"))) {
      rmSync(join(dir, f));
      removed++;
    }
  }
}
console.log(`strip-rsc-sidecars: 删除 ${removed} 个物品页侧载文件`);
