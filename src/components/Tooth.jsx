// Персонажи-зубики в точности по референсу (8 типов зубов)

// Базовый маскот-зуб
export function Tooth({ size = 100, sad = false, style }) {
  return (
    <svg width={size} viewBox="0 0 120 120" style={style} aria-hidden="true">
      <ellipse cx="60" cy="112" rx="42" ry="6" fill="#86b5b5" opacity=".6" />
      <path d="M22 44c0-22 20-30 38-26 18-4 38 4 38 26 0 26-10 36-10 58 0 9-10 12-14 2-3-9-7-16-14-16s-11 7-14 16c-4 10-14 7-14-2 0-22-10-32-10-58z" fill="#dfeced" />
      <path d="M30 40c3-9 10-12 17-10" stroke="#fff" strokeWidth="8" strokeLinecap="round" fill="none" />
      <circle cx="47" cy="58" r="4.5" fill="#222" /><circle cx="76" cy="58" r="4.5" fill="#222" />
      <path d={sad ? "M50 76q11-9 22 0" : "M50 70q11 10 22 0"} stroke="#222" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M100 58q10-4 12-16" stroke="#222" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M20 60q-10 6-8 20" stroke="#222" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// 0. Здоровые зубы — белый зубик с улыбкой и бирюзовым щитом справа вверху
export const ToothShield = ({ size = 64, style }) => (
  <svg width={size} viewBox="0 0 100 110" style={style} aria-hidden="true">
    <ellipse cx="50" cy="102" rx="34" ry="5" fill="#86b5b5" opacity=".45" />
    <path d="M22 38c0-18 16-25 28-22 14-3 28 4 28 22 0 22-8 30-8 48 0 7-8 10-11 2-3-7-6-13-9-13s-8 6-9 13c-3 8-11 5-11-2 0-18-8-26-8-48z" fill="#f4fafb" stroke="#c0dcdc" strokeWidth="1.5"/>
    <path d="M28 32c3-7 8-9 14-8" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none"/>
    <circle cx="41" cy="48" r="3.2" fill="#222"/>
    <circle cx="59" cy="48" r="3.2" fill="#222"/>
    <path d="M43 56q7 7 14 0" stroke="#222" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    {/* Бирюзовый щит */}
    <g transform="translate(62, 10)">
      <path d="M12 0 L24 5 V15 C24 23 18 29 12 31 C6 29 0 23 0 15 V5 Z" fill="#1aa59f" stroke="#0e7c76" strokeWidth="1.5"/>
      <path d="M7 15 L10.5 18.5 L17 11" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>
);

// 1. Чувствительные зубы — дрожащий зубик с молнией и снежинкой
export const ToothSensitive = ({ size = 64, style }) => (
  <svg width={size} viewBox="0 0 100 110" style={style} aria-hidden="true">
    <ellipse cx="50" cy="102" rx="34" ry="5" fill="#86b5b5" opacity=".45" />
    {/* Молния слева */}
    <path d="M12 18 L18 8 L16 16 L22 14 L14 26 L16 20 Z" fill="#ffd02f" stroke="#e6a600" strokeWidth="1"/>
    {/* Снежинка справа */}
    <g stroke="#3ea5dd" strokeWidth="1.8" strokeLinecap="round" transform="translate(74, 10)">
      <line x1="10" y1="0" x2="10" y2="20"/>
      <line x1="0" y1="10" x2="20" y2="10"/>
      <line x1="3" y1="3" x2="17" y2="17"/>
      <line x1="17" y1="3" x2="3" y2="17"/>
    </g>
    {/* Зуб */}
    <path d="M22 38c0-18 16-25 28-22 14-3 28 4 28 22 0 22-8 30-8 48 0 7-8 10-11 2-3-7-6-13-9-13s-8 6-9 13c-3 8-11 5-11-2 0-18-8-26-8-48z" fill="#f4fafb" stroke="#c0dcdc" strokeWidth="1.5"/>
    {/* Дрожь */}
    <line x1="14" y1="42" x2="18" y2="40" stroke="#3ea5dd" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="12" y1="48" x2="17" y2="48" stroke="#3ea5dd" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="82" y1="42" x2="86" y2="40" stroke="#3ea5dd" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="83" y1="48" x2="88" y2="48" stroke="#3ea5dd" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Глазки и дрожащий рот */}
    <circle cx="41" cy="48" r="3.2" fill="#222"/>
    <circle cx="59" cy="48" r="3.2" fill="#222"/>
    <path d="M43 59 Q46 56 49 59 Q52 62 55 59 Q58 56 61 59" stroke="#222" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
  </svg>
);

// 2. Курение, кофе и чай — крутой кремовый зубик в кепке BMW, тёмных очках, ярких кедах, с сигаретой и чашкой кофе
export const ToothSmoke = ({ size = 64, style }) => (
  <svg width={size} viewBox="0 0 100 110" style={style} aria-hidden="true">
    <ellipse cx="50" cy="102" rx="34" ry="5" fill="#86b5b5" opacity=".45" />
    <path d="M22 38c0-18 16-25 28-22 14-3 28 4 28 22 0 22-8 30-8 48 0 7-8 10-11 2-3-7-6-13-9-13s-8 6-9 13c-3 8-11 5-11-2 0-18-8-26-8-48z" fill="#fdf8eb" stroke="#dec9a8" strokeWidth="1.5"/>
    {/* Яркие кеды на корнях: электрик-синий верх, неоново-жёлтая полоска, лаймовая подошва */}
    {[[34, 1], [66, -1]].map(([x, dir]) => (
      <g key={x} transform={`translate(${x} 86) scale(${dir} 1)`}>
        <path d="M6 -2 H0 L-3 2.5 Q-12 2.5 -12 7 V9 H9 V3 Q9 0 6 -2 Z" fill="#1e88e5" stroke="#0d47a1" strokeWidth=".8" strokeLinejoin="round"/>
        <path d="M-12 7 Q-12 3.6 -6.5 3.2 Q-4.4 5.4 -4.4 9 H-12 Z" fill="#64b5f6" stroke="#0d47a1" strokeWidth=".7"/>
        <path d="M-2.4 3.6 L8 1.2" stroke="#ffee00" strokeWidth="2.1" strokeLinecap="round"/>
        <path d="M-1 0.8 l1.8 1.1 M1.4 -0.3 l1.8 1.1 M3.8 -1 l1.6 1" stroke="#ffffff" strokeWidth=".9" strokeLinecap="round"/>
        <circle cx="6.2" cy="5" r="1.4" fill="#ff1f8e" stroke="#ffffff" strokeWidth=".5"/>
        <rect x="-12.6" y="8.6" width="22.2" height="3.4" rx="1.7" fill="#ffffff" stroke="#0d47a1" strokeWidth=".6"/>
        <path d="M-10.5 10.3 H8" stroke="#39ff14" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
    ))}
    {/* Чёрная кепка с эмблемой BMW и полосками M-серии */}
    <path d="M22 34 C20 6 80 6 78 34 Q50 27 22 34 Z" fill="#1b1b20" stroke="#000" strokeWidth=".8" strokeLinejoin="round"/>
    <path d="M30 14 C40 8 60 8 70 14" stroke="#ffffff" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".18"/>
    <path d="M18 34 Q50 24 82 34 Q50 43 18 34 Z" fill="#2a2a31" stroke="#000" strokeWidth=".8" strokeLinejoin="round"/>
    <path d="M24 35.5 Q50 29 76 35.5" stroke="#4b4b55" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <g>
      <circle cx="50" cy="19" r="7" fill="#0c0c0f" stroke="#cfd3d8" strokeWidth=".7"/>
      <path d="M50 19 L50 14 A5 5 0 0 0 45 19 Z" fill="#1c69d4"/>
      <path d="M50 19 L55 19 A5 5 0 0 0 50 14 Z" fill="#ffffff"/>
      <path d="M50 19 L50 24 A5 5 0 0 0 55 19 Z" fill="#1c69d4"/>
      <path d="M50 19 L45 19 A5 5 0 0 0 50 24 Z" fill="#ffffff"/>
    </g>
    <path d="M63 12.5 L64.8 25" stroke="#81c4ff" strokeWidth="1.7" strokeLinecap="round"/>
    <path d="M66.2 12.8 L68 25.3" stroke="#1c3f94" strokeWidth="1.7" strokeLinecap="round"/>
    <path d="M69.4 13.2 L71 25.6" stroke="#e4002b" strokeWidth="1.7" strokeLinecap="round"/>
    {/* Суровые брови, тёмные очки и кривая ухмылка */}
    <path d="M29 39 L48 43.5" stroke="#3a2f26" strokeWidth="2.8" strokeLinecap="round"/>
    <path d="M71 39 L52 43.5" stroke="#3a2f26" strokeWidth="2.8" strokeLinecap="round"/>
    <path d="M22.5 46 L30 47 M77.5 46 L70 47" stroke="#15151a" strokeWidth="2.2" strokeLinecap="round"/>
    <rect x="29.5" y="44.5" width="20" height="12" rx="4.5" fill="#15151a"/>
    <rect x="50.5" y="44.5" width="20" height="12" rx="4.5" fill="#15151a"/>
    <path d="M49 48 q1 -1.5 2 0" stroke="#15151a" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M33 54 L38 46.5 M39.5 54 L43.5 48.5 M54 54 L59 46.5 M60.5 54 L64.5 48.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".45"/>
    <path d="M44 58.5 q8 4 15 -2.5" stroke="#222" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    {/* Сигарета в уголке рта: фильтр, бумага, тлеющий конец и дымок */}
    <path d="M12 60 q-5 -5 0 -10 t0 -10" stroke="#b9b1a6" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".75"/>
    <path d="M17 58 q-4 -4 0 -8 t0 -8" stroke="#cfc8be" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity=".6"/>
    <g transform="rotate(-14 44 57)">
      <rect x="40" y="54.6" width="11" height="4.2" rx="1.2" fill="#e9a251"/>
      <rect x="45.5" y="54.6" width="1" height="4.2" fill="#c97b2a" opacity=".6"/>
      <rect x="14" y="54.6" width="27" height="4.2" rx="1.2" fill="#ffffff" stroke="#d9ccb4" strokeWidth=".6"/>
      <rect x="39.4" y="54.6" width="1.4" height="4.2" fill="#c97b2a"/>
      <rect x="14" y="54.6" width="3" height="4.2" rx="1" fill="#9a8f84"/>
      <circle cx="12" cy="56.7" r="4.2" fill="#ff8a50" opacity=".35"/>
      <rect x="10" y="54.6" width="4.4" height="4.2" rx="1.4" fill="#ff5a36"/>
      <rect x="10" y="55.6" width="2" height="2.2" rx="1" fill="#ffd27a"/>
    </g>
    {/* Чашка кофе */}
    <g transform="translate(77, 42)">
      <rect x="0" y="8" width="16" height="13" rx="3" fill="#ffffff" stroke="#795548" strokeWidth="1.5"/>
      <path d="M16 10 C20 10 20 17 16 18" stroke="#795548" strokeWidth="1.5" fill="none"/>
      <path d="M4 4 Q2 1 4 0" stroke="#8d6e63" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M8 5 Q6 2 8 0" stroke="#8d6e63" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M12 4 Q10 1 12 0" stroke="#8d6e63" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </g>
  </svg>
);

// 3. Брекеты — зубик с металлической дугой и тремя замочками
export const ToothBraces = ({ size = 64, style }) => (
  <svg width={size} viewBox="0 0 100 110" style={style} aria-hidden="true">
    <ellipse cx="50" cy="102" rx="34" ry="5" fill="#86b5b5" opacity=".45" />
    <path d="M22 38c0-18 16-25 28-22 14-3 28 4 28 22 0 22-8 30-8 48 0 7-8 10-11 2-3-7-6-13-9-13s-8 6-9 13c-3 8-11 5-11-2 0-18-8-26-8-48z" fill="#f4fafb" stroke="#c0dcdc" strokeWidth="1.5"/>
    <circle cx="41" cy="42" r="3.2" fill="#222"/>
    <circle cx="59" cy="42" r="3.2" fill="#222"/>
    <path d="M43 49q7 6 14 0" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Дуга брекетов */}
    <line x1="20" y1="58" x2="80" y2="58" stroke="#78909c" strokeWidth="2.2" strokeLinecap="round"/>
    {/* 3 замочка */}
    <rect x="32" y="52" width="10" height="12" rx="2" fill="#cfd8dc" stroke="#546e7a" strokeWidth="1.3"/>
    <line x1="37" y1="52" x2="37" y2="64" stroke="#546e7a" strokeWidth="1"/>
    <rect x="45" y="52" width="10" height="12" rx="2" fill="#cfd8dc" stroke="#546e7a" strokeWidth="1.3"/>
    <line x1="50" y1="52" x2="50" y2="64" stroke="#546e7a" strokeWidth="1"/>
    <rect x="58" y="52" width="10" height="12" rx="2" fill="#cfd8dc" stroke="#546e7a" strokeWidth="1.3"/>
    <line x1="63" y1="52" x2="63" y2="64" stroke="#546e7a" strokeWidth="1"/>
  </svg>
);

// 4. Импланты — головка зуба на титановом ребристом винте
export const ToothImplant = ({ size = 64, style }) => (
  <svg width={size} viewBox="0 0 100 110" style={style} aria-hidden="true">
    <ellipse cx="50" cy="104" rx="30" ry="4" fill="#86b5b5" opacity=".4" />
    {/* Коронка */}
    <path d="M30 14 C30 8 38 6 50 6 C62 6 70 8 70 14 C70 30 66 38 66 46 H34 C34 38 30 30 30 14 Z" fill="#f4fafb" stroke="#b0ccd0" strokeWidth="1.5"/>
    <circle cx="44" cy="24" r="3" fill="#222"/>
    <circle cx="56" cy="24" r="3" fill="#222"/>
    <path d="M46 32q4 4 8 0" stroke="#222" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    {/* Абатмент и винт */}
    <rect x="44" y="46" width="12" height="6" fill="#90a4ae"/>
    <path d="M41 52 H59 L56 94 C55 98 52 100 50 100 C48 100 45 98 44 94 L41 52 Z" fill="#9fa8da" stroke="#3f51b5" strokeWidth="1.8"/>
    <line x1="42" y1="59" x2="58" y2="59" stroke="#3f51b5" strokeWidth="2"/>
    <line x1="43" y1="67" x2="57" y2="67" stroke="#3f51b5" strokeWidth="2"/>
    <line x1="44" y1="75" x2="56" y2="75" stroke="#3f51b5" strokeWidth="2"/>
    <line x1="45" y1="83" x2="55" y2="83" stroke="#3f51b5" strokeWidth="2"/>
  </svg>
);

// 5. Воспалённые дёсны — зубик сидит в припухшей розовой десне с красными точками
export const ToothGums = ({ size = 64, style }) => (
  <svg width={size} viewBox="0 0 100 110" style={style} aria-hidden="true">
    <ellipse cx="50" cy="102" rx="34" ry="5" fill="#86b5b5" opacity=".45" />
    <path d="M26 38c0-18 14-25 24-22 14-3 24 4 24 22 0 18-6 26-6 40 H32 c0-14-6-22-6-40z" fill="#f4fafb" stroke="#c0dcdc" strokeWidth="1.5"/>
    <circle cx="41" cy="40" r="3.2" fill="#222"/>
    <circle cx="59" cy="40" r="3.2" fill="#222"/>
    <path d="M44 48q6 6 12 0" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Воспалённая десна с точками */}
    <path d="M14 62 C22 54 36 52 50 52 C64 52 78 54 86 62 C88 74 84 88 74 94 C64 98 36 98 26 94 C16 88 12 74 14 62 Z" fill="#ffb4b4" stroke="#e57373" strokeWidth="2"/>
    <circle cx="28" cy="74" r="3.5" fill="#e53935"/>
    <circle cx="50" cy="78" r="4" fill="#e53935"/>
    <circle cx="72" cy="74" r="3.5" fill="#e53935"/>
  </svg>
);

// 6. Коронки и мосты — зубик в жёлтой короне на макушке
export const ToothCrown = ({ size = 64, style }) => (
  <svg width={size} viewBox="0 0 100 110" style={style} aria-hidden="true">
    <ellipse cx="50" cy="102" rx="34" ry="5" fill="#86b5b5" opacity=".45" />
    <path d="M22 42c0-18 16-25 28-22 14-3 28 4 28 22 0 22-8 30-8 48 0 7-8 10-11 2-3-7-6-13-9-13s-8 6-9 13c-3 8-11 5-11-2 0-18-8-26-8-48z" fill="#f4fafb" stroke="#c0dcdc" strokeWidth="1.5"/>
    <circle cx="41" cy="54" r="3.2" fill="#222"/>
    <circle cx="59" cy="54" r="3.2" fill="#222"/>
    <path d="M43 62q7 7 14 0" stroke="#222" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    {/* Жёлтая корона */}
    <path d="M25 36 L28 22 L36 29 L50 18 L64 29 L72 22 L75 36 Z" fill="#ffd02f" stroke="#e6a600" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
);

// 7. Съёмные протезы — зубик чистит щёточкой съёмный протез челюсти
export const ToothDentures = ({ size = 64, style }) => (
  <svg width={size} viewBox="0 0 100 110" style={style} aria-hidden="true">
    <ellipse cx="50" cy="102" rx="36" ry="5" fill="#86b5b5" opacity=".45" />
    {/* Белый зубчик-персонаж */}
    <path d="M24 38c0-16 14-22 26-20 12-2 26 4 26 20 0 16-6 24-6 38 0 6-6 8-9 2-3-6-5-10-8-10s-7 4-8 10c-3 6-9 4-9-2 0-14-6-22-6-38z" fill="#f4fafb" stroke="#c0dcdc" strokeWidth="1.5"/>
    <circle cx="42" cy="42" r="3" fill="#222"/>
    <circle cx="58" cy="42" r="3" fill="#222"/>
    <path d="M44 50q6 5 12 0" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round"/>
    
    {/* Зубная щёточка в руке */}
    <rect x="56" y="58" width="34" height="5" rx="2.5" fill="#ec407a" transform="rotate(-15 56 58)"/>
    <rect x="76" y="47" width="12" height="5" rx="1.5" fill="#00e676" transform="rotate(-15 56 58)"/>
    
    {/* Съёмный протез внизу спереди */}
    <path d="M30 76 C30 68 38 65 52 65 C66 65 74 68 74 76 L72 90 C70 94 62 96 52 96 C42 96 34 94 32 90 Z" fill="#f8bbd0" stroke="#d81b60" strokeWidth="1.5"/>
    <rect x="36" y="70" width="6" height="10" rx="2" fill="#fff" stroke="#c2185b" strokeWidth="1"/>
    <rect x="43" y="68" width="8" height="12" rx="2" fill="#fff" stroke="#c2185b" strokeWidth="1"/>
    <rect x="52" y="68" width="8" height="12" rx="2" fill="#fff" stroke="#c2185b" strokeWidth="1"/>
    <rect x="61" y="70" width="6" height="10" rx="2" fill="#fff" stroke="#c2185b" strokeWidth="1"/>
  </svg>
);

export const TYPE_ICONS = {
  healthy: ToothShield,
  sens: ToothSensitive,
  smoke: ToothSmoke,
  braces: ToothBraces,
  implants: ToothImplant,
  gums: ToothGums,
  crowns: ToothCrown,
  dentures: ToothDentures,
};

export const IconTarget = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#1aa59f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="#1aa59f"/>
  </svg>
);

export const IconWarning = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#f44336" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 22h20z"/><line x1="12" y1="9" x2="12" y2="15"/><circle cx="12" cy="18" r="0.8" fill="#f44336"/>
  </svg>
);

export const IconCheck = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#1aa59f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/>
  </svg>
);

export const IconSearch = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#2c7aa0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="7"/><line x1="15" y1="15" x2="21" y2="21"/>
  </svg>
);

export const IconDoctor = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#7e57c2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7"/>
    <line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/>
  </svg>
);
