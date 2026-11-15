import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tooth, ToothShield, ToothSensitive } from "../components/Tooth.jsx";

const STEP1 = { q: "Есть ли у вас брекеты, импланты, коронки или протезы?", a: [
  ["none", "🦷 Нет, зубы свои"], ["braces", "⬜ Брекеты"], ["implants", "🔩 Импланты"], ["crowns", "👑 Коронки или мосты"], ["dentures", "🫧 Съёмные протезы"] ] };
const STEP2 = { q: "Что беспокоит больше всего?", a: [
  ["sens", "❄️ Зубы реагируют на холодное и горячее"], ["gums", "🩸 Дёсны воспаляются или кровоточат"],
  ["smoke", "☕ Я курю или часто пью кофе и чёрный чай"], ["healthy", "✨ Ничего не беспокоит"] ] };

export default function Quiz() {
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const cur = step === 1 ? STEP1 : STEP2;
  const qRef = useRef(null);
  const first = useRef(true);
  // после смены шага переводим фокус на вопрос (экранные читалки озвучат его)
  useEffect(() => { if (first.current) { first.current = false; return; } qRef.current?.focus(); }, [step]);
  const pick = (v) => {
    if (step === 1 && v === "none") return setStep(2);
    nav(`/type/${v}`);
  };
  return (
    <section className="hero">
      {/* Декоративные зубики вместо звёздочек */}
      <ToothShield size={50} style={{ position: "absolute", left: "4%", top: 10, opacity: 0.3 }} />
      <ToothSensitive size={40} style={{ position: "absolute", right: "5%", top: 50, opacity: 0.25 }} />

      <h1 className="big">Моя здоровая улыбка!</h1>
      <p className="script">Ответьте на пару вопросов — и мы подберём уход именно для вас</p>

      <div className="quiz">
        <ol className="steps" aria-label="Прогресс опроса">
          <li className={step >= 1 ? "on" : ""} aria-current={step === 1 ? "step" : undefined}><span className="sr-only">Шаг 1 из 2{step > 1 ? ", пройден" : ", текущий"}</span></li>
          <li className={step >= 2 ? "on" : ""} aria-current={step === 2 ? "step" : undefined}><span className="sr-only">Шаг 2 из 2{step === 2 ? ", текущий" : ""}</span></li>
        </ol>
        <p className="step-label" aria-hidden="true">Шаг {step} из 2</p>
        <h2 ref={qRef} tabIndex={-1} id="quiz-q">{cur.q}</h2>
        <div className="options" role="group" aria-labelledby="quiz-q">
          {cur.a.map(([v, label]) => <button key={v} onClick={() => pick(v)}>{label}</button>)}
        </div>
        <button className="back" onClick={() => setStep(1)} style={step === 1 ? { visibility: "hidden" } : undefined} tabIndex={step === 1 ? -1 : 0} aria-hidden={step === 1}>← Назад</button>
      </div>

      <div className="mascots"><Tooth size={130} /></div>
      <p className="skip">Не хотите проходить опрос? Откройте раздел <b>«Главная»</b> и выберите свой случай.</p>
    </section>
  );
}
