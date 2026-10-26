
import { useEffect, useState } from "react";
import "./Intro.css";

type Greeting = {
  text: string;
  lang: string;
  direction?: "rtl" | "ltr";
};

type CinematicIntroProps = {
  onComplete: () => void;
};

const greetings: Greeting[] = [
  { text: "Welcome to my portfolio", lang: "en" },
  { text: "Bem-vindo ao meu portfólio", lang: "pt" },
  { text: "Bienvenido a mi portafolio", lang: "es" },
  { text: "Bienvenue sur mon portfolio", lang: "fr" },
  { text: "Willkommen in meinem Portfolio", lang: "de" },
  { text: "Benvenuto nel mio portfolio", lang: "it" },
  { text: "मेरो पोर्टफोलियोमा स्वागत छ", lang: "ne" },
  { text: "मेरे पोर्टफोलियो में आपका स्वागत है", lang: "hi" },
  {
    text: "مرحبًا بكم في معرض أعمالي",
    lang: "ar",
    direction: "rtl",
  },
  { text: "ポートフォリオへようこそ", lang: "ja" },
  { text: "제 포트폴리오에 오신 것을 환영합니다", lang: "ko" },
  { text: "欢迎来到我的作品集", lang: "zh" },
  { text: "Добро пожаловать в моё портфолио", lang: "ru" },
  { text: "Portföyüme hoş geldiniz", lang: "tr" },
];

export default function CinematicIntro({
  onComplete,
}: CinematicIntroProps) {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reducedMotion) {
      const timer = window.setTimeout(() => {
        setLeaving(true);
      }, 900);

      return () => window.clearTimeout(timer);
    }

    const greetingTimer = window.setInterval(() => {
      setGreetingIndex(
        (current) => (current + 1) % greetings.length,
      );
    }, 650);

    const finishTimer = window.setTimeout(() => {
      setLeaving(true);
    }, 9800);

    return () => {
      window.clearInterval(greetingTimer);
      window.clearTimeout(finishTimer);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!leaving) return;

    const timer = window.setTimeout(() => {
      setSkipped(true);
    }, reducedMotion ? 80 : 650);

    return () => window.clearTimeout(timer);
  }, [leaving, reducedMotion]);

  useEffect(() => {
    if (skipped) {
      onComplete();
    }
  }, [skipped, onComplete]);

  if (skipped) return null;

  const greeting = greetings[greetingIndex];

  return (
    <div
      className={`portfolio-intro${
        leaving ? " portfolio-intro--leaving" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Safal's portfolio"
    >
      <div
        className="portfolio-intro__grid"
        aria-hidden="true"
      />

      <div
        className="portfolio-intro__glow"
        aria-hidden="true"
      />

      <div
        className="portfolio-intro__content"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="portfolio-intro__eyebrow">
          SAFAL SILWAL <span>·</span> PORTFOLIO 2026
        </p>

        <div
          className="portfolio-intro__word-wrap"
          key={`${greeting.lang}-${greetingIndex}`}
        >
          <h1
            className="portfolio-intro__welcome"
            lang={greeting.lang}
            dir={greeting.direction ?? "auto"}
          >
            {greeting.text}
          </h1>

          <span
            className="portfolio-intro__welcome-layer portfolio-intro__welcome-layer--cyan"
            aria-hidden="true"
          >
            {greeting.text}
          </span>

          <span
            className="portfolio-intro__welcome-layer portfolio-intro__welcome-layer--magenta"
            aria-hidden="true"
          >
            {greeting.text}
          </span>
        </div>

        <p className="portfolio-intro__subtitle">
          CREATIVITY · CURIOSITY · CONTINUOUS GROWTH
        </p>

        <div
          className="portfolio-intro__progress"
          aria-hidden="true"
        >
          <span />
        </div>
      </div>

      <button
        className="portfolio-intro__skip"
        type="button"
        onClick={() => setLeaving(true)}
      >
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
