import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { byId, TYPES } from "../data/types.js";
import content from "../data/content.json";
import Tabs from "../components/Tabs.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { Bullets, Panel } from "../components/Bits.jsx";
import { TYPE_ICONS, Tooth, IconTarget, IconWarning, IconCheck, IconSearch, IconDoctor } from "../components/Tooth.jsx";

const TABS = [["overview", "📋 Обзор"], ["pastes", "🧴 Пасты"], ["brushes", "🪥 Щётки"], ["extras", "➕ Ещё"], ["method", "🔄 Метод чистки"], ["care", "⚠️ Осторожно"]];

export default function TypePage() {
  const { id } = useParams();
  const [tab, setTab] = useState("overview");
  const t = byId(id);
  useEffect(() => { if (t) document.title = `${t.short} — Моя здоровая улыбка`; setTab("overview"); }, [id]);
  if (!t) return <Navigate to="/types" />;

  const Icon = TYPE_ICONS[id] || Tooth;

  const views = {
    overview: (
      <>
        <Panel title="Кто это и в чём проблема" icon={<IconSearch />}><Bullets items={t.problem} /></Panel>
        <Panel title="Задача ухода" icon={<IconTarget />}><Bullets items={t.goal} /></Panel>
        <Panel title="На что смотреть" icon={<IconCheck />}><Bullets items={t.criteria} /></Panel>
        <details className="rules-box accordion">
          <summary><h3>📌 Общие правила <span className="acc-hint">({content.rules.length})</span></h3></summary>
          <div className="rules-grid">
            {content.rules.map((r, i) => (
              <div key={i} className="rule-item">
                <span className="rule-num">{i + 1}</span>
                <p>{r}</p>
              </div>
            ))}
          </div>
        </details>
      </>
    ),
    pastes: (
      <>
        <div className="section-intro">
          <span className="section-emoji">🧴</span>
          <p>Пасты подобраны для типа <b>«{t.short}»</b>. Смотрите состав на упаковке и консультируйтесь со стоматологом.</p>
        </div>
        <div className="grid">{t.pastes.map((p) => <ProductCard key={p.name} p={p} kind="paste" />)}</div>
      </>
    ),
    brushes: (
      <>
        <div className="section-intro">
          <span className="section-emoji">🪥</span>
          <p>Щётки для типа <b>«{t.short}»</b>. Меняйте каждые 3 месяца.</p>
        </div>
        <div className="grid">{t.brushes.map((p) => <ProductCard key={p.name} p={p} kind="brush" />)}</div>
      </>
    ),
    extras: t.extras.map((e) => (
      <Panel key={e.title} title={e.title}>
        {e.text.map((x, i) => <p key={i}>{x}</p>)}
        <div className="grid">{e.items.map((p) => <ProductCard key={p.name} p={p} hint={e.title} />)}</div>
      </Panel>
    )),
    method: (
      <>
        <Panel title="Метод чистки по шагам" icon={<IconCheck />}>
          <ol className="steps-list">{t.method.map((m, i) => <li key={i}><span>{i + 1}</span><p>{m}</p></li>)}</ol>
          <p><Link to="/methods" className="inline">📖 Все методы чистки →</Link></p>
        </Panel>
      </>
    ),
    care: (
      <>
        <Panel title="Чего избегать" icon={<IconWarning />}><Bullets items={t.avoid} /></Panel>
        <Panel title="Когда нужен врач" icon={<IconDoctor />}>
          <Bullets items={t.doctor.length ? t.doctor : ["При боли, кровоточивости дольше 2 недель или шатающихся зубах обратитесь к стоматологу."]} />
        </Panel>
      </>
    ),
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Опрос", to: "/" }, { label: "Все типы", to: "/types" }, { label: t.short }]} />
      <div className="type-hero" style={{ "--c": t.color }}>
        <div>
          <h1>{t.short}</h1>
          <p>{t.title}</p>
        </div>
        <Icon size={100} />
      </div>
      <Tabs id="type" label={`Разделы: ${t.short}`} tabs={TABS} active={tab} onChange={setTab}>
        {views[tab]}
      </Tabs>
      <h2 className="other-title">Другие типы</h2>
      <nav className="chips" aria-label="Другие типы">
        {TYPES.filter((x) => x.id !== t.id).map((x) => <Link key={x.id} to={`/type/${x.id}`} style={{ "--c": x.color }}>{x.short}</Link>)}
      </nav>
    </>
  );
}
