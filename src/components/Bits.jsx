// Мелкие повторяющиеся блоки
export const Title = ({ children, sub }) => (
  <div className="title"><h1>{children}</h1>{sub && <p>{sub}</p>}</div>
);

export const Bullets = ({ items }) => (
  <ul className="bullets">{items.map((x, i) => <li key={i}>{x}</li>)}</ul>
);

export const Table = ({ rows }) => (
  <div className="table-wrap">
    <table><tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => (j === 0 ? <th key={j}>{c}</th> : <td key={j}>{c}</td>))}</tr>)}</tbody></table>
  </div>
);

export const Panel = ({ title, icon, children }) => (
  <section className="panel">
    {title && (
      <h3 className="panel-title">
        {icon && <span className="panel-icon">{icon}</span>}
        {title}
      </h3>
    )}
    {children}
  </section>
);
