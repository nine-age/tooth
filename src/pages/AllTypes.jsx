import { Link } from "react-router-dom";
import { TYPES } from "../data/types.js";
import { Title } from "../components/Bits.jsx";
import { TYPE_ICONS, Tooth } from "../components/Tooth.jsx";

export default function AllTypes() {
  return (
    <div className="wide">
      <Title sub="Выберите свой случай — на странице будут пасты, щётки и метод чистки.">Все типы зубов</Title>
      <div className="cards">
        {TYPES.map((t) => {
          const Icon = TYPE_ICONS[t.id] || Tooth;
          return (
            <Link key={t.id} to={`/type/${t.id}`} className="type-card" style={{ "--c": t.color }}>
              <div className="type-card-top">
                <Icon size={48} />
                <h3>{t.short}</h3>
              </div>
              <div className="type-card-info">
                <div className="type-card-tag risk"><span className="tag-label">Риск</span>{t.risk}</div>
                <div className="type-card-tag need"><span className="tag-label">Что нужно</span>{t.must}</div>
              </div>
              <span className="more">Подробнее →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
