import { useRef } from "react";

// Ряд вкладок-«таблеток». Содержимое раздела показывается под ним.
export default function Tabs({ tabs, active, onChange, label, id = "tabs", children }) {
  const refs = useRef([]);
  const onKeyDown = (e, i) => {
    const n = tabs.length;
    let j = null;
    if (e.key === "ArrowRight") j = (i + 1) % n;
    else if (e.key === "ArrowLeft") j = (i - 1 + n) % n;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = n - 1;
    if (j === null) return;
    e.preventDefault();
    onChange(tabs[j][0]);
    refs.current[j]?.focus();
  };
  return (
    <>
      <div className="tabs" role="tablist" aria-label={label}>
        {tabs.map(([k, name], i) => (
          <button
            key={k}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="tab"
            id={`${id}-tab-${k}`}
            aria-selected={k === active}
            aria-controls={`${id}-panel`}
            tabIndex={k === active ? 0 : -1}
            className={k === active ? "active" : ""}
            onClick={() => onChange(k)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="tab-body" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} tabIndex={-1}>
        {children}
      </div>
    </>
  );
}
