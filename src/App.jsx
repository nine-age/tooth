import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BubbleBackground from "./components/BubbleBackground.jsx";
import Quiz from "./pages/Quiz.jsx";
import AllTypes from "./pages/AllTypes.jsx";
import TypePage from "./pages/TypePage.jsx";
import Methods from "./pages/Methods.jsx";
import Guide from "./pages/Guide.jsx";
import BackToTop from "./components/BackToTop.jsx";

const TITLES = { "/": "Опрос", "/types": "Все типы зубов", "/methods": "Методы чистки", "/guide": "Справочник" };

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (TITLES[pathname]) document.title = `${TITLES[pathname]} — Моя здоровая улыбка`;
  }, [pathname]);
  return (
    <div className={"app" + (pathname === "/" ? " no-scroll" : "")}>
      <a href="#main" className="skip-link">К основному содержимому</a>
      <BubbleBackground />
      <Header />
      <main id="main" tabIndex={-1}>
        <ErrorBoundary key={pathname}>
          <Routes>
            <Route path="/" element={<Quiz />} />
            <Route path="/types" element={<AllTypes />} />
            <Route path="/type/:id" element={<TypePage />} />
            <Route path="/methods" element={<Methods />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
