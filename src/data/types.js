import groups from "./groups.json";
import { healthy } from "./healthy.js";

// n — номер группы в документе; id — адрес страницы
const META = {
  0: { id: "healthy", short: "Здоровые зубы", color: "#cfe6f7" },
  1: { id: "sens", short: "Чувствительные зубы", color: "#c9efe5" },
  2: { id: "smoke", short: "Курение, кофе и чай", color: "#fde3b6" },
  3: { id: "braces", short: "Брекеты", color: "#c9eef2" },
  4: { id: "implants", short: "Импланты", color: "#dcdff7" },
  5: { id: "gums", short: "Воспалённые дёсны", color: "#f6d3e4" },
  6: { id: "crowns", short: "Коронки и мосты", color: "#e6ddf6" },
  7: { id: "dentures", short: "Съёмные протезы", color: "#d9eccf" },
};

export const TYPES = [healthy, ...groups].map((g) => ({ ...g, ...META[g.n] }));
export const byId = (id) => TYPES.find((t) => t.id === id);
