import { useState } from "react";
import { GUIDE } from "../data/guide.js";
import content from "../data/content.json";
import { Title, Bullets, Table, Panel } from "../components/Bits.jsx";
import Tabs from "../components/Tabs.jsx";

const TAB_ICONS = {
  teeth: "🦷",
  brush: "🪥",
  paste: "🧴",
  tools: "🧰",
  food: "🍎",
  terms: "📖",
};

// Красивые карточки слоёв зуба вместо пугающей анатомической схемы
const ToothStructureCards = () => (
  <div className="tooth-layers-grid">
    <div className="layer-card enamel">
      <div className="layer-header">
        <span className="layer-badge">Слой 1</span>
        <h4>Эмаль зуба</h4>
      </div>
      <p>Самая твёрдая ткань в организме человека. Защищает зуб от истирания, механических повреждений и воздействия кислот.</p>
    </div>
    <div className="layer-card dentin">
      <div className="layer-header">
        <span className="layer-badge">Слой 2</span>
        <h4>Дентин</h4>
      </div>
      <p>Основная масса зуба под эмалью. Пронизан миллионами микроканальцев к нерву. При его оголении возникает чувствительность к холодному и горячему.</p>
    </div>
    <div className="layer-card pulp">
      <div className="layer-header">
        <span className="layer-badge">Слой 3</span>
        <h4>Пульпа («нерв»)</h4>
      </div>
      <p>Внутренняя мягкая часть зуба с нервными окончаниями и кровеносными сосудами. Обеспечивает питание и чувствительность зуба.</p>
    </div>
    <div className="layer-card root">
      <div className="layer-header">
        <span className="layer-badge">Основа</span>
        <h4>Корень и периодонт</h4>
      </div>
      <p>Удерживают зуб в костной лунке челюсти, амортизируют жевательную нагрузку и защищают кость.</p>
    </div>
  </div>
);

export default function Guide() {
  const [open, setOpen] = useState(GUIDE[0].id);
  const all = [...GUIDE, { id: "terms", title: "Термины" }];
  return (
    <>
      <Title sub="Всё про уход за зубами, выбор щёток, состав паст и полезные привычки.">Справочник стоматологической грамотности</Title>
      
      <Tabs
        id="guide"
        label="Разделы справочника"
        tabs={all.map((g) => [g.id, `${TAB_ICONS[g.id] || "📌"} ${g.title}`])}
        active={open}
        onChange={setOpen}
      >
        {open === "teeth" && <ToothStructureCards />}
        
        {open === "terms" ? (
          <div className="terms-grid">
            {content.terms.map((t) => (
              <div key={t.term} className="term-card">
                <dt>{t.term}</dt>
                <dd>{t.text}</dd>
              </div>
            ))}
          </div>
        ) : (
          GUIDE.find((g) => g.id === open).blocks.map((b, i) => (
            <Panel key={i} title={b.h}>
              {b.text && <p>{b.text}</p>}
              {b.list && <Bullets items={b.list} />}
              {b.table && <Table rows={b.table} />}
            </Panel>
          ))
        )}
      </Tabs>
    </>
  );
}
