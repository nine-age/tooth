import { useState, useRef, useLayoutEffect } from "react";
import { METHODS } from "../data/guide.js";
import { Title, Panel } from "../components/Bits.jsx";
import VideoSelect from "../components/VideoSelect.jsx";

// 6 обучающих видео от профессиональных стоматологов
const VIDEOS = [
  {
    id: "W12YFx5-iJY",
    tag: "Базовый уход",
    title: "Стандартная чистка зубов",
    desc: "Базовая техника чистки обычной мануальной щёткой: последовательность челюстей и поверхностей.",
    keyPoints: [
      "Чистите зубы минимум 2 минуты (по 30 секунд на каждую четверть)",
      "Выметающие движения от десны к краю зуба",
      "Очищайте наружные, внутренние и жевательные поверхности",
    ],
  },
  {
    id: "iBDdPgYPTSA",
    tag: "Золотой стандарт",
    title: "Метод Басса (BASS) под 45°",
    desc: "Самый рекомендуемый стоматологами метод: эффективное очищение пришеечной зоны и десневого желобка.",
    keyPoints: [
      "Щётка устанавливается под углом 45° к десневому краю",
      "Лёгкие вибрирующие движения на месте без давления",
      "Выметающее движение по направлению к жевательной поверхности",
    ],
  },
  {
    id: "MAhyN0fYxFo",
    tag: "Брекеты",
    title: "Чистка зубов с брекет-системой",
    desc: "Как правильно ухаживать за зубами во время ортодонтического лечения, чтобы избежать кариеса под дугами.",
    keyPoints: [
      "Очищайте зону над и под замочками брекетов",
      "Используйте V-образную щётку и монопучок",
      "Обязательно очищайте пространство под дугой специальным ёршиком",
    ],
  },
  {
    id: "q_r4pHoJdr0",
    tag: "Труднодоступные места",
    title: "Монопучковая щётка",
    desc: "Как точечно очистить дальние «восьмёрки», скученности, пришеечную область и коронки без травм десны.",
    keyPoints: [
      "Держите щётку как пишущую ручку — без сильного нажима",
      "Точечные круговые движения по контуру десны каждого зуба",
      "Идеальна для очищения за последними коренными зубами",
    ],
  },
  {
    id: "bxHGRW8BRqo",
    tag: "Ирригатор",
    title: "Как правильно пользоваться ирригатором",
    desc: "Подробная инструкция: давление струи, угол подачи воды и правильное положение насадки.",
    keyPoints: [
      "Начинайте с минимального давления, постепенно увеличивая мощность",
      "Струю направляйте перпендикулярно десне (90°)",
      "Ирригатор дополняет нить и щётку, но не заменяет их полностью",
    ],
  },
  {
    id: "1VogfiebDIo",
    tag: "Межзубная гигиена",
    title: "Межзубные ёршики",
    desc: "Как подобрать правильный размер и безопасно вводить ёршик между зубами, не травмируя сосочки дёсен.",
    keyPoints: [
      "Подбирайте диаметр по размеру промежутка (часто нужно 2–3 разных размера)",
      "Вводите ёршик прямо и без усилий, не сгибая проволоку",
      "Очищайте промежутки один раз в день перед сном",
    ],
  },
];

export default function Methods() {
  const [activeVideoId, setActiveVideoId] = useState(VIDEOS[0].id);
  const ALL_METHODS = [
    ...METHODS.main.map((m) => ({ ...m, id: m.name, tag: "Основной метод" })),
    ...METHODS.aux.map((m) => ({ ...m, id: m.name, tag: "Вспомогательный метод" })),
  ];
  // Таймлайн на узком экране вертикальный: считаем, где останавливается бегущая точка
  const tlRef = useRef(null);
  useLayoutEffect(() => {
    const el = tlRef.current;
    if (!el) return;
    const calc = () => {
      const items = [...el.querySelectorAll(".tl-step")];
      const first = items[0], last = items[items.length - 1];
      const total = last.offsetTop - first.offsetTop;
      el.style.setProperty("--tl-bottom", `${last.offsetHeight - 22}px`);
      [1, 2].forEach((i) => {
        const f = total > 0 ? (items[i].offsetTop - first.offsetTop) / total : i / 3;
        el.style.setProperty(`--p${i}`, `${f * 100}%`);
        el.style.setProperty(`--s${i}`, String(f));
      });
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    el.querySelectorAll(".tl-step").forEach((n) => ro.observe(n));
    document.fonts?.ready.then(calc);
    window.addEventListener("resize", calc);
    return () => { ro.disconnect(); window.removeEventListener("resize", calc); };
  }, []);
  const [methodId, setMethodId] = useState(ALL_METHODS[0].id);
  const method = ALL_METHODS.find((m) => m.id === methodId) || ALL_METHODS[0];
  const activeVideo = VIDEOS.find((v) => v.id === activeVideoId) || VIDEOS[0];

  return (
    <div className="methods-page">
      <Title sub="Пошаговые техники движений и наглядные видео-инструкции от стоматологов.">Как правильно чистить зубы</Title>

      {/* Важное правило техники */}
      <div className="why-box">
        <div className="why-icon">💡</div>
        <div>
          <h4 style={{ margin: "0 0 4px", color: "var(--ink)" }}>Почему техника важнее силы нажима?</h4>
          <p style={{ margin: 0 }}>{METHODS.why}</p>
        </div>
      </div>

      {/* Блок ВИДЕО-УРОКОВ */}
      <section className="video-section">
        <div className="section-head">
          <span className="section-pill">Правила чистки</span>
          <h2>Наглядные инструкции по чистке</h2>
          <p>Выберите нужный способ или аппаратную процедуру:</p>
        </div>

        <VideoSelect label="Выбор видео" items={VIDEOS} value={activeVideoId} onChange={setActiveVideoId} />

        {/* Активный видеоплеер */}
        <div className="featured-video-card">
          <div className="video-embed-wrap">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?rel=0`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="video-details">
            <span className="badge ok">{activeVideo.tag}</span>
            <h3>{activeVideo.title}</h3>
            <p>{activeVideo.desc}</p>
            <div className="video-keypoints">
              <b>Главное из видео:</b>
              <ul>
                {activeVideo.keyPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
              target="_blank"
              rel="noreferrer"
              className="inline yt-link"
            >
              Смотреть на YouTube ↗
            </a>
          </div>
        </div>
      </section>

      {/* Каталог классических методов */}
      <h2 className="h2" style={{ marginTop: 36 }}>Классические методы чистки</h2>
      <VideoSelect label="Выбор метода чистки" items={ALL_METHODS.map((m) => ({ id: m.id, tag: m.tag, title: m.name }))} value={methodId} onChange={setMethodId} />
      <article className="method-detail" key={method.id}>
        <div className="method-detail-head">
          <span className={"method-badge-type" + (method.tag.startsWith("Вспом") ? " aux" : "")}>{method.tag}</span>
          <h4>{method.name}</h4>
          <p className="method-summary">{method.summary}</p>
          <ul className="method-chips" aria-label="Ключевые движения">
            {method.points.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        <h5>Как выполнять</h5>
        <ol className="method-steps">
          {method.steps.map((p, i) => <li key={i}><span className="n" aria-hidden="true">{i + 1}</span><p>{p}</p></li>)}
        </ol>
        <div className="method-boxes">
          <div className="method-fits"><h5>Кому подходит</h5><p>{method.fits}</p></div>
          <div className="method-note"><h5>Важно</h5><p>{method.note}</p></div>
        </div>
      </article>

      {/* Пошаговая последовательность чистки */}
      <h2 className="h2" style={{ marginTop: 36 }}>Порядок чистки по шагам</h2>
      <div className="timeline-wrap">
        <ol className="timeline" ref={tlRef}>
          <div className="tl-track" aria-hidden="true"><span className="tl-fill" /><span className="tl-dot" /></div>
          {METHODS.standardSteps.map((st, i) => (
            <li key={st.title} className={`tl-step tl-${i}`}>
              <span className="tl-node" aria-hidden="true">{i + 1}</span>
              <div className="tl-card">
                <h4>{st.title}</h4>
                <p>{st.text}</p>
                <ul className="tl-moves">{st.moves.map((m) => <li key={m}>{m}</li>)}</ul>
                <p className="tl-tip">{st.tip}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
