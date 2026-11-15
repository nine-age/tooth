"""Превращает dental_hygiene_guide.docx в src/data/groups.json и content.json"""
import docx, re, json, sys
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph

SRC = sys.argv[1] if len(sys.argv) > 1 else "dental_hygiene_guide.docx"
d = docx.Document(SRC)
rels = d.part.rels
clean = lambda s: re.sub(r"\s+", " ", s).strip()
STORE = ["Золотое яблоко (goldapple.by)", "Mila (mila.by)", "открыть карточку", "открыть каталог паст mila.by"]

def link(cell):
    for h in cell._tc.iter(qn("w:hyperlink")):
        r = h.get(qn("r:id"))
        if r in rels: return rels[r].target_ref
    return ""

def product(row):
    c = row.cells
    name = c[0].text
    for s in STORE: name = name.replace(s, "")
    st = c[3].text
    status = "ok" if "✔" in st else "sample" if "▫" in st else "manual"
    return dict(name=clean(name), text=clean(c[1].text), price=clean(c[2].text), status=status, url=link(c[0]))

els = []
for el in d.element.body.iterchildren():
    if el.tag == qn("w:p"):
        t = clean(Paragraph(el, d).text)
        if t: els.append(("p", t))
    elif el.tag == qn("w:tbl"): els.append(("t", Table(el, d)))

texts = [t for k, t in els if k == "p"]
def between(a, b):
    i = next(i for i, t in enumerate(texts) if t.startswith(a)); j = next(i for i, t in enumerate(texts) if t.startswith(b))
    return texts[i + 1:j]
terms = [dict(term=t.split(" — ", 1)[0], text=t.split(" — ", 1)[1]) for t in between("Простыми словами", "Общие правила") if " — " in t]
rules = [r for r in between("Общие правила", "Сокращённый выбор") if not r.startswith("Группа")]

summary = {}
for k, t in els:
    if k == "t" and t.rows[0].cells[0].text.strip() == "Группа":
        for r in t.rows[1:]:
            n = clean(r.cells[0].text); summary[int(n.split(".")[0])] = dict(risk=clean(r.cells[1].text), must=clean(r.cells[2].text))

HEAD = {"Кто это и в чём проблема": "problem", "Задача ухода": "goal", "На что смотреть при выборе": "criteria",
        "Рекомендуемые пасты": "pastes", "Рекомендуемые зубные щётки": "brushes", "Дополнительные предметы": "extras",
        "Метод чистки": "method", "Чего избегать": "avoid", "Когда нужен врач": "doctor"}
groups, g, sec, sub = [], None, None, None
for k, v in els:
    if k == "p" and re.match(r"Группа \d+\.", v):
        n = int(re.match(r"Группа (\d+)", v).group(1))
        g = dict(n=n, title=v.split(". ", 1)[1], **summary.get(n, {}), problem=[], goal=[], criteria=[], pastes=[], brushes=[], extras=[], method=[], avoid=[], doctor=[])
        groups.append(g); sec = sub = None; continue
    if g is None: continue
    if k == "p":
        if v.startswith("Что я не смог проверить"): break
        key = next((val for h, val in HEAD.items() if v.startswith(h)), None)
        if key: sec = key; sub = None; continue
        if sec == "extras":
            if len(v) < 45 and not v.endswith("."):
                sub = dict(title=v, text=[], items=[]); g["extras"].append(sub)
            elif sub: sub["text"].append(v)
        elif sec: g[sec].append(v)
    elif k == "t" and sec:
        rows = [product(r) for r in v.rows[1:]]
        if sec == "extras" and sub: sub["items"] += rows
        elif sec in ("pastes", "brushes"): g[sec] += rows
json.dump(groups, open("src/data/groups.json", "w", encoding="utf8"), ensure_ascii=False, indent=1)
json.dump(dict(terms=terms, rules=rules), open("src/data/content.json", "w", encoding="utf8"), ensure_ascii=False, indent=1)
for x in groups:
    print(x["n"], x["title"][:30], "| пасты", len(x["pastes"]), "щётки", len(x["brushes"]), "доп", [(e["title"][:14], len(e["items"])) for e in x["extras"]], "метод", len(x["method"]))
print("terms", len(terms), "rules", len(rules))
