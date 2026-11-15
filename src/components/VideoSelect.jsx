import { useEffect, useId, useRef, useState } from "react";

// Выпадающий список (listbox) для выбора видео: клик, стрелки, Enter, Esc, закрытие по клику снаружи
export default function VideoSelect({ items, value, onChange, label = "Выбор", tagInList = true }) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const root = useRef(null);
  const btn = useRef(null);
  const idx = items.findIndex((v) => v.id === value);
  const cur = items[idx] || items[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (!root.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const openList = () => { setHi(Math.max(idx, 0)); setOpen(true); };
  const choose = (i) => { onChange(items[i].id); setOpen(false); btn.current?.focus(); };

  const onKeyDown = (e) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); openList(); }
      return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); setHi((hi + 1) % items.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHi((hi - 1 + items.length) % items.length); }
    else if (e.key === "Home") { e.preventDefault(); setHi(0); }
    else if (e.key === "End") { e.preventDefault(); setHi(items.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(hi); }
    else if (e.key === "Escape") { e.preventDefault(); setOpen(false); }
    else if (e.key === "Tab") setOpen(false);
  };

  return (
    <div className="vselect" ref={root} onKeyDown={onKeyDown}>
      <button
        ref={btn}
        type="button"
        className="vselect-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${uid}-list`}
        onClick={() => (open ? setOpen(false) : openList())}
      >
        <span className="vselect-text">
          {cur.tag && <span className="video-tab-tag">{cur.tag}</span>}
          <span className="vselect-title">{cur.title}</span>
        </span>
        <span className="vselect-caret" aria-hidden="true">▾</span>
      </button>
      {open && (
        <ul className="vselect-list" id={`${uid}-list`} role="listbox" aria-label={label} aria-activedescendant={`${uid}-${hi}`}>
          {items.map((v, i) => (
            <li
              key={v.id}
              id={`${uid}-${i}`}
              role="option"
              aria-selected={v.id === value}
              className={(i === hi ? "hi " : "") + (v.id === value ? "sel" : "")}
              onMouseEnter={() => setHi(i)}
              onClick={() => choose(i)}
            >
              {tagInList && v.tag && <span className="video-tab-tag">{v.tag}</span>}
              <span className="vselect-title">{v.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
