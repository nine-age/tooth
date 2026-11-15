import { Link } from "react-router-dom";

// Паттерн Breadcrumb: nav + ol, текущая страница без ссылки с aria-current
export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      <ol>
        {items.map((it, i) => (
          <li key={i}>
            {it.to ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
