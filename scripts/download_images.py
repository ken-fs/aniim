#!/usr/bin/env python3
"""下载生物图片到 public/images/(本地化,避免热链 + 可控性能)"""
import json, pathlib, urllib.request, concurrent.futures, time

ROOT = pathlib.Path(__file__).resolve().parent.parent
CDN = "https://worldx-website-cdn.aniimo.com/official-website/worldx/wiki_stage/init"
OUT = ROOT / "public" / "images" / "creatures"
OUT.mkdir(parents=True, exist_ok=True)

forms = json.load(open(ROOT / "src" / "data" / "forms.json"))

want: dict[str, str] = {}  # filename -> url
for iid, f in forms.items():
    for slug, d in f.items():
        if d.get("imageId"):
            want[f"{d['imageId']}.png"] = f"{CDN}/Wiki_Aniimo_{d['imageId']}.png"
        for h in d.get("evolutionHeads", []):
            want[f"head_{h}.png"] = f"{CDN}/Wiki_PetHead_{h}.png"

print(f"待下载 {len(want)} 张")
UA = {"User-Agent": "Mozilla/5.0"}

def dl(item):
    name, url = item
    p = OUT / name
    if p.exists() and p.stat().st_size > 1000:
        return True
    for i in range(3):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=30) as r:
                p.write_bytes(r.read())
            return True
        except Exception:
            time.sleep(1 + i)
    print("  ✗", name)
    return False

with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
    ok = sum(ex.map(dl, want.items()))
print(f"完成 {ok}/{len(want)}")
