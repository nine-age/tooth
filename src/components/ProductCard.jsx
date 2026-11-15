import { useId } from "react";
// Картинки и подписи по типам средств
const INFO = {
  tongue: { type: "tongue", label: "Скребок для языка", icon: "👅", image: "/images/products/tongue.webp" },
  rinse: { type: "rinse", label: "Ополаскиватель", icon: "🧪", image: "/images/products/rinse.webp" },
  irrigator: { type: "irrigator", label: "Ирригатор", icon: "💧", image: "/images/products/irrigator.webp" },
  denture_care: { type: "denture_care", label: "Уход за протезами", icon: "🫧", image: "/images/products/denture.webp" },
  gel: { type: "gel", label: "Укрепляющий гель", icon: "✨", image: "/images/products/gel.webp" },
  mono: { type: "mono", label: "Монопучок", icon: "🎯", image: "/images/products/mono.webp" },
  interdental: { type: "interdental", label: "Ёршик", icon: "🪡", image: "/images/products/interdental.webp" },
  floss: { type: "floss", label: "Зубная нить", icon: "🧵", image: "/images/products/floss.webp" },
  brush: { type: "brush", label: "Зубная щётка", icon: "🪥", image: "/images/products/brush.webp" },
  paste: { type: "paste", label: "Зубная паста", icon: "🧴", image: "/images/products/paste.webp" },
};

// Определение типа по названию (запасной вариант для раздела «Ещё»)
function detectType(name) {
  const n = name.toLowerCase();

  // 1. Скребок / щётка для языка
  if (n.includes("скребок") || n.includes("язык") || n.includes("tongue")) {
    return "tongue";
  }

  // 2. Жидкость для ирригатора / ополаскиватель / пенка
  if (n.includes("жидкость для ирригатора") || n.includes("ополаскивател") || n.includes("пенка")) {
    return "rinse";
  }

  // 3. Ирригатор
  if (n.includes("ирригатор") || (n.includes("miga") && !n.includes("паст"))) {
    return "irrigator";
  }

  // 4. Уход за протезами (таблетки, крем, фиксация)
  if (n.includes("протез") || n.includes("корега") || n.includes("protefix") || n.includes("таблетк")) {
    return "denture_care";
  }

  // 5. Реминерализующий гель / мусс
  if (n.includes("гель") || n.includes("mousse") || n.includes("реминерализ")) {
    return "gel";
  }

  // 6. Монопучковая щётка
  if (n.includes("монопучк") || n.includes("single") || n.includes("s1200") || n.includes("cs 1006")) {
    return "mono";
  }

  // 7. Межзубный ёршик
  if (n.includes("ёршик") || n.includes("ершик") || n.includes("cps") || n.includes("prime") || n.includes("межзубн")) {
    return "interdental";
  }

  // 8. Зубная нить / суперфлосс
  if (n.includes("нить") || n.includes("вощён") || n.includes("waxd") || n.includes("флосс") || n.includes("floss") || n.includes("нитевдевател")) {
    return "floss";
  }

  // 9. Зубная щётка
  if (n.includes("щётк") || n.includes("щетк") || n.includes("brush") || n.includes("cs 5460") || n.includes("pure soft") || n.includes("daily care") || n.includes("revyline")) {
    return "brush";
  }

  // 10. Зубная паста
  return "paste";
}

// Тип берём из раздела, где лежит товар: в «Пастах» всегда паста, в «Щётках» всегда щётка.
// В «Ещё» определяем по названию, а если не вышло, то по названию подраздела («Нить», «Ирригатор»…).
function getVisual(name, kind, hint) {
  if (kind === "paste") return INFO.paste;
  if (kind === "brush") return INFO.brush;
  let t = detectType(name);
  if (t === "paste" && hint) t = detectType(hint);
  return INFO[t] || INFO.paste;
}

// Статус есть абсолютно у каждого товара
function getProductStatus(p) {
  if (p.url && p.url.trim().length > 0) {
    return { label: "Есть в магазине", className: "ok" };
  }
  if (p.price && p.price.trim().length > 0) {
    return { label: "В каталоге", className: "catalog" };
  }
  return { label: "Рекомендовано", className: "rec" };
}

export default function ProductCard({ p, kind, hint }) {
  const id = useId();
  const visual = getVisual(p.name, kind, hint);
  const status = getProductStatus(p);

  return (
    <article className="product" aria-labelledby={id}>
      {/* Уникальный красивый графический баннер для каждого средства */}
      <div className="product-media-container">
        <img src={visual.image} alt="" width="800" height="325" loading="lazy" decoding="async" />
        
        {/* Бейджи статуса и категории поверх баннера */}
        <div className="product-floating-badges">
          <span className={"badge " + status.className}>{status.label}</span>
          <span className="category-tag">{visual.icon} {visual.label}</span>
        </div>
      </div>

      <div className="product-body">
        <h4 id={id}>{p.name}</h4>
        <p>{p.text}</p>
        <div className="product-foot">
          <b>{p.price || "Цена по запросу"}</b>
          {p.url ? (
            <a href={p.url} target="_blank" rel="noreferrer">
              В магазин <span aria-hidden="true">↗</span>
              <span className="sr-only"> — {p.name}, откроется в новой вкладке</span>
            </a>
          ) : (
            <span className="store-hint">В аптеках города</span>
          )}
        </div>
      </div>
    </article>
  );
}
