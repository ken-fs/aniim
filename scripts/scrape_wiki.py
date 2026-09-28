#!/usr/bin/env python3
"""抓取 wiki.aniimo.com 全部生物页 → src/data/creatures.json

数据源:官方 wiki(SSR HTML,bs4 解析)。礼貌限速,失败重试。
用法: python3 scripts/scrape_wiki.py [--limit N]
"""
import json, re, sys, time, urllib.request, pathlib
from bs4 import BeautifulSoup

ROOT = pathlib.Path(__file__).resolve().parent.parent
RAW = ROOT / "raw"
RAW.mkdir(exist_ok=True)
BASE = "https://wiki.aniimo.com"
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36"}

LIMIT = None
if "--limit" in sys.argv:
    LIMIT = int(sys.argv[sys.argv.index("--limit") + 1])


def fetch(url: str, retries: int = 3) -> str:
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read().decode("utf-8", "ignore")
        except Exception as e:
            if i == retries - 1:
                raise
            time.sleep(2 * (i + 1))
    return ""


def get_urls() -> list[str]:
    xml = fetch(f"{BASE}/__sitemap__/en-US.xml")
    urls = re.findall(r"<loc>(https://wiki\.aniimo\.com/item/[^<]+)</loc>", xml)
    return urls


def slugify(name: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return s


def text_of(node) -> str:
    return re.sub(r"\s+", " ", node.get_text(" ", strip=True)) if node else ""


def parse_form_page(html: str, url: str) -> dict:
    soup = BeautifulSoup(html, "lxml")
    full = soup.get_text("|", strip=True)
    out: dict = {"url": url.replace(BASE, "")}

    # 编号 + 名字 + 元素 + 职业:title 形如 "Emberpup | Aniimo Wiki"
    t = soup.find("title")
    out["name"] = t.get_text().split("|")[0].strip() if t else ""
    m = re.search(r"NO\.(\d+)", full)
    out["number"] = int(m.group(1)) if m else None
    # 头部块:NO.001|…|NO.001|Emberpup|fire|(dark)|DPS|Overview —— 名字后、Overview 前最后一个 token 是职业,中间是元素(1-2 个)
    hm = re.search(r"NO\.\d+\|+\s*NO\.\d+\|+(.+?)\|+Overview", full)
    if hm:
        toks = [t.strip() for t in hm.group(1).split("|") if t.strip()]
        if len(toks) >= 3:
            out["name"] = toks[0]
            out["elements"] = toks[1:-1]
            out["role"] = toks[-1]
            out["element"] = toks[1]  # 主元素(兼容旧字段)

    # 描述
    d = soup.select_one(".info-desc-content")
    out["description"] = text_of(d)

    # 属性
    stats: dict = {}
    am = re.search(r"Attributes：(\d+)", full)
    if am:
        stats["total"] = int(am.group(1))
    for label, key in [("HP", "hp"), ("BREAK", "break"), ("ATK", "atk"), ("M.DEF", "mdef"), ("P.DEF", "pdef"), ("REGEN", "regen")]:
        sm = re.search(re.escape(label) + r"：\|(\d+)", full)
        if sm:
            stats[key] = int(sm.group(1))
    out["stats"] = stats

    # 主视觉 internal id:NO.xxx 之后第一张 Wiki_Aniimo_<id>.png(页面后半是全图鉴预载,不能取)
    ni = html.find(f'NO.{out["number"]:03d}') if out.get("number") else -1
    best = None
    for im in re.finditer(r"Wiki_Aniimo_(\d+)\.png", html):
        if ni >= 0 and im.start() > ni:
            best = im.group(1)
            break
    if best:
        out["imageId"] = best

    # 形态 tabs
    item_id = re.search(r"/item/(\d+)/", url).group(1)
    forms = sorted(set(re.findall(rf"/item/{item_id}/([a-z0-9\-]+)", html)))
    out["forms"] = forms

    # 进化链:PetHead 顺序 + stage 名
    evo_heads = re.findall(r"Wiki_PetHead_(\d+)\.png", html)
    stages = re.findall(r">((?:Lumin|Gamma|Nova|Basic|Alpha|Beta|Omega|Delta|Sigma)[^<]{0,20} Stage)<", html)
    out["evolutionHeads"] = list(dict.fromkeys(evo_heads))
    out["evolutionStages"] = list(dict.fromkeys(stages))

    # 栖息地
    hab = re.search(r"Habitats\|(.+?)\|Homeland Ability", full)
    if hab:
        out["habitats"] = [x for x in hab.group(1).split("|") if x and not x.startswith("]")]

    # Mobility / Trait
    mob = re.search(r"Mobility\|([^|]+)\|([^|]+?)\|Trait", full)
    if mob:
        out["mobility"] = {"name": mob.group(1).strip(), "desc": mob.group(2).strip()}
    tr = re.search(r"Trait\|([^|]+)\|([^|]+?)\|Skill Details", full)
    if tr:
        out["trait"] = {"name": tr.group(1).strip(), "desc": tr.group(2).strip()}

    # 技能:Skill Details|Combat|Innate| <名字>|<描述>|Element: |Type: |<类型>|Cost: |<c>|Power: |<p>| ...
    skills = []
    sk_sec = full.split("Skill Details")
    if len(sk_sec) > 1:
        body = sk_sec[1]
        # 切到 Resonance 之前
        body = body.split("Resonance Training")[0]
        parts = body.split("|")
        parts = [p.strip() for p in parts]
        # 跳过开头分类词 Combat/Innate
        i = 0
        prev_marker = ""
        while i < len(parts):
            p = parts[i]
            if p in ("", "Combat", "Innate"):
                i += 1
                continue
            if p == "ATK":
                prev_marker = "ATK"  # 下一个块是普攻(无名,只有描述)
                i += 1
                continue
            # p = 技能名,后跟描述,直到 "Element:";普攻则 p 本身是描述
            if i + 1 < len(parts):
                is_basic = prev_marker == "ATK"
                prev_marker = ""
                desc_parts = []
                j = i if is_basic else i + 1
                while j < len(parts) and parts[j] != "Element:":
                    desc_parts.append(parts[j])
                    j += 1
                if j < len(parts) and parts[j] == "Element:":
                    # j+1..: [icon空], Type:, 类型, Cost:, c, Power:, p
                    rest = parts[j + 1:j + 12]
                    skill = {"name": "Basic Attack" if is_basic else p, "desc": " ".join(desc_parts).strip()}
                    try:
                        ti = rest.index("Type:")
                        skill["type"] = rest[ti + 1]
                    except ValueError:
                        pass
                    for k, v in enumerate(rest):
                        if v == "Cost:" and k + 1 < len(rest):
                            skill["cost"] = rest[k + 1]
                        if v == "Power:" and k + 1 < len(rest):
                            skill["power"] = rest[k + 1]
                    skills.append(skill)
                    # 跳到 Power 值之后
                    try:
                        pi = parts.index("Power:", j)
                        i = pi + 2
                    except ValueError:
                        i = j + 1
                else:
                    i += 1
            else:
                break
    out["skills"] = skills

    # Resonance Training
    res = []
    rs = full.split("Resonance Training")
    if len(rs) > 1:
        body = rs[1].split("Terms of Use")[0]
        toks = [x.strip() for x in body.split("|") if x.strip() and x.strip() != "]"]
        k = 0
        while k < len(toks):
            if re.match(r"^LV \d+$", toks[k]):
                entry = {"level": toks[k]}
                if k + 1 < len(toks):
                    entry["req"] = toks[k + 1]
                if k + 2 < len(toks) and not re.match(r"^LV \d+$", toks[k + 2]):
                    entry["cost"] = toks[k + 2]
                res.append(entry)
                k += 3
            else:
                k += 1
    out["resonance"] = res

    # 技能图标
    out["skillIcons"] = sorted(set(re.findall(r"(\d+_Skill_\d+_Icon\.png)", html)))
    return out


def main():
    urls = get_urls()
    if LIMIT:
        urls = urls[:LIMIT]
    print(f"共 {len(urls)} 个形态页")
    pages = {}
    ok = fail = 0
    for n, url in enumerate(urls):
        rel = url.replace(BASE + "/", "").replace("/", "_")
        cache = RAW / f"{rel}.html"
        try:
            if cache.exists() and cache.stat().st_size > 10000:
                html = cache.read_text(encoding="utf-8", errors="ignore")
            else:
                html = fetch(url)
                cache.write_text(html, encoding="utf-8")
                time.sleep(0.35)
            d = parse_form_page(html, url)
            item_id = re.search(r"/item/(\d+)/", url).group(1)
            form = re.search(r"/item/\d+/([a-z0-9\-]+)", url).group(1)
            pages.setdefault(item_id, {})[form] = d
            ok += 1
            if (n + 1) % 25 == 0:
                print(f"  {n + 1}/{len(urls)}")
        except Exception as e:
            fail += 1
            print(f"  ✗ {url}: {e}")
    out = ROOT / "src" / "data" / "forms.json"
    out.write_text(json.dumps(pages, ensure_ascii=False, indent=1))
    print(f"完成 ok={ok} fail={fail} → {out} ({out.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
