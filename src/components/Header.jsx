import { NavLink, Link } from "react-router-dom";

const LINKS = [["/", "Опрос", true], ["/types", "Главная", false], ["/methods", "Методы чистки", false], ["/guide", "Справочник", false]];

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">Моя здоровая улыбка</Link>
      <nav aria-label="Основная навигация">
        {LINKS.map(([to, name, end]) => <NavLink key={to} to={to} end={end}>{name}</NavLink>)}
      </nav>
    </header>
  );
}
