import VideoSelect from "./VideoSelect.jsx";

// Выбор раздела через выпадающий список (вместо ряда вкладок). Содержимое раздела показывается под списком.
export default function Tabs({ tabs, active, onChange, label, id = "tabs", children }) {
  const items = tabs.map(([k, name]) => ({ id: k, tag: label, title: name }));
  return (
    <>
      <div className="tabs-select">
        <VideoSelect items={items} value={active} onChange={onChange} label={label} tagInList={false} />
      </div>
      <div className="tab-body" role="region" id={`${id}-panel`} aria-label={tabs.find(([k]) => k === active)?.[1]}>
        {children}
      </div>
    </>
  );
}
