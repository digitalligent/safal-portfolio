
import { useEffect, useRef, useState } from 'react';
import './Intro.css';

type Phase = 'vault' | 'glitch' | 'leaving';

function createMathChallenge() {
  const a = Math.floor(Math.random() * 9) + 2;
  const b = Math.floor(Math.random() * 9) + 1;
  const multiply = Math.random() < 0.5;

  return {
    question: multiply ? `${a} × ${b}` : `${a} + ${b}`,
    answer: multiply ? a * b : a + b,
  };
}

export default function CinematicIntro() {
  const [phase, setPhase] = useState<Phase>('vault');
  const [challenge, setChallenge] = useState(createMathChallenge);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(true);
  const [feedback, setFeedback] = useState(
    'SOLVE THE MATH TO CONTINUE',
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/sounds/locker-open.mp3');

    audio.loop = false;
    audio.volume = 0.35;
    audio.muted = muted;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  function enterDigit(digit: string) {
    if (opened || phase !== 'vault' || answer.length >= 3) {
      return;
    }

    setAnswer((current) => current + digit);
    setError(false);
    setFeedback('ENTER YOUR ANSWER');
  }

  function clearAnswer() {
    if (opened || phase !== 'vault') {
      return;
    }

    setAnswer('');
    setError(false);
    setFeedback('ANSWER CLEARED');
  }

  function submitAnswer() {
    if (opened || phase !== 'vault') {
      return;
    }

    if (
      answer.trim() !== '' &&
      Number(answer) === challenge.answer
    ) {
      setOpened(true);
      setFeedback('ACCESS GRANTED');

      if (!muted && audioRef.current) {
        audioRef.current.currentTime = 0;

        void audioRef.current.play().catch(() => undefined);
      }

      window.setTimeout(() => {
        setPhase('glitch');
      }, 1200);

      return;
    }

    setError(true);
    setFeedback('INCORRECT ANSWER — TRY AGAIN');
    setAnswer('');

    window.setTimeout(() => {
      setError(false);
      setChallenge(createMathChallenge());
      setFeedback('SOLVE THE MATH TO CONTINUE');
    }, 650);
  }

  function finishIntro() {
    if (phase === 'leaving') {
      return;
    }

    setPhase('leaving');

    window.setTimeout(() => {
      window.dispatchEvent(
        new Event('portfolio-intro-complete'),
      );
    }, 800);
  }

  if (phase === 'leaving') {
    return null;
  }

  return (
    <div
      className={`cinematic-intro ${
        error ? 'intro-error' : ''
      }`}
    >
      <div className="intro-vignette" />
      <div className="intro-dust" />

      <p className="intro-eyebrow">
        SAFAL SILWAL <span>•</span> PERSONAL PORTFOLIO
      </p>

      {phase === 'vault' && (
        <div className="vault-scene">
          <div
            className={`vault-art ${
              opened ? 'vault-art-opened' : ''
            }`}
          >
            <div className="vault-shadow" />

            <div className="vault-body">
              <div className="vault-inner">
                <div className="vault-velvet">
                  <span className="vault-sparkle">✦</span>
                  <span className="vault-sparkle">✧</span>
                  <span className="vault-sparkle">✦</span>
                </div>
              </div>

              <div className="vault-door">
                <div className="vault-door-inset" />

                <div className="vault-badge">SS</div>

                <div className="vault-dial">
                  <div className="dial-ring">
                    <span>0</span>
                    <span>3</span>
                    <span>6</span>
                    <span>9</span>
                    <i />
                  </div>
                </div>

                <div className="vault-handle">
                  <span />
                  <span />
                  <span />
                </div>

                <i className="vault-bolt bolt-one" />
                <i className="vault-bolt bolt-two" />
                <i className="vault-bolt bolt-three" />
                <i className="vault-bolt bolt-four" />

                <div className="vault-reflection" />
              </div>
            </div>
          </div>

          <div className="vault-console">
            <p className="vault-console-label">
              SECURE PORTFOLIO ACCESS
            </p>

            <h1 className="vault-question">
              Solve to unlock.
            </h1>

            <p className="vault-hint">
              Calculate the answer to the question below.
            </p>

            <div
              className="math-challenge"
              aria-live="polite"
            >
              {challenge.question} = ?
            </div>

            <div
              className={`vault-display ${
                error ? 'display-error' : ''
              }`}
              aria-live="polite"
            >
              <span className="display-led" />
              {answer || 'ENTER ANSWER'}
            </div>

            <div className="vault-keypad">
              {[
                '1', '2', '3',
                '4', '5', '6',
                '7', '8', '9',
                'CLEAR', '0', 'ENTER',
              ].map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`vault-key ${
                    key === 'ENTER' ? 'key-enter' : ''
                  } ${
                    key === 'CLEAR' ? 'key-clear' : ''
                  }`}
                  onClick={() => {
                    if (key === 'CLEAR') {
                      clearAnswer();
                    } else if (key === 'ENTER') {
                      submitAnswer();
                    } else {
                      enterDigit(key);
                    }
                  }}
                  disabled={opened}
                >
                  {key}
                </button>
              ))}
            </div>

            <p
              className="vault-feedback"
              aria-live="polite"
            >
              {feedback}
            </p>
          </div>
        </div>
      )}

      {phase === 'glitch' && (
        <div className="glitch-scene">
          <p className="glitch-overline">
            ACCESS GRANTED · WELCOME
          </p>

          <div className="glitch-word-wrap">
            <h1 className="glitch-word glitch-main">
              SAFAL SILWAL
            </h1>

            <span
              className="glitch-word glitch-cyan"
              aria-hidden="true"
            >
              SAFAL SILWAL
            </span>

            <span
              className="glitch-word glitch-magenta"
              aria-hidden="true"
            >
              SAFAL SILWAL
            </span>
          </div>

          <p className="glitch-subtitle">
            LEARNING. BUILDING. IMPROVING.
          </p>

          <button
            className="vault-key key-enter"
            type="button"
            onClick={finishIntro}
          >
            ENTER PORTFOLIO ↗
          </button>
        </div>
      )}

      <button
        className="intro-mute"
        type="button"
        onClick={() => setMuted((value) => !value)}
        aria-label={
          muted ? 'Enable intro sound' : 'Mute intro sound'
        }
      >
        {muted ? 'SOUND: OFF' : 'SOUND: ON'}
      </button>

      <button
        className="intro-skip"
        type="button"
        onClick={finishIntro}
      >
        SKIP INTRO ↗
      </button>
    </div>
  );
}
