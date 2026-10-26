import { useEffect, useRef, useState } from 'react';
import './Intro.css';

type Phase = 'vault' | 'dino' | 'glitch' | 'leaving';
const ACCESS_CODE = '2026';

export default function CinematicIntro() {
  const [phase, setPhase] = useState<Phase>('vault');
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(true);
  const [feedback, setFeedback] = useState('AWAITING ACCESS CODE');
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
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  function enterDigit(digit: string) {
    if (code.length >= 4 || opened) return;
    setCode((current) => (current + digit).slice(0, 4));
    setError(false);
    setFeedback('ENTER FOUR DIGITS');
  }

  function clearCode() {
    setCode('');
    setError(false);
    setFeedback('CODE CLEARED');
  }

  function submitCode() {
    if (code === ACCESS_CODE) {
      setOpened(true);
      setFeedback('ACCESS GRANTED');
      if (!muted && audioRef.current) {
        audioRef.current.currentTime = 0;
        void audioRef.current.play().catch(() => undefined);
      }
      window.setTimeout(() => setPhase('glitch'), 1200);
    } else {
      setError(true);
      setFeedback('ACCESS DENIED — TRY AGAIN');
      setCode('');
      window.setTimeout(() => setError(false), 550);
    }
  }

  function skipIntro() {
    setPhase('leaving');
    window.setTimeout(() => setPhase('glitch'), 500);
  }

  function finishIntro() {
    setPhase('leaving');
    window.setTimeout(() => setPhase('done' as Phase), 800);
  }

  if ((phase as string) === 'done') return null;

  return (
    <div className={`cinematic-intro ${error ? 'intro-error' : ''} ${phase === 'leaving' ? 'intro-phase-leaving' : ''}`}>
      <div className="intro-vignette" />
      <div className="intro-dust" />
      <p className="intro-eyebrow">SAFAL SILWAL <span>•</span> PERSONAL PORTFOLIO</p>

      {phase === 'vault' && (
        <div className="vault-scene">
          <div className={`vault-art ${opened ? 'vault-art-opened' : ''}`}>
            <div className="vault-shadow" />
            <div className="vault-body">
              <div className="vault-inner">
                <div className="vault-velvet">
                  <span className="vault-sparkle">✦</span><span className="vault-sparkle">✧</span><span className="vault-sparkle">✦</span>
                </div>
              </div>
              <div className="vault-door">
                <div className="vault-door-inset" />
                <div className="vault-badge">SS</div>
                <div className="vault-dial"><div className="dial-ring"><span>0</span><span>3</span><span>6</span><span>9</span><i /></div></div>
                <div className="vault-handle"><span /><span /><span /></div>
                <i className="vault-bolt bolt-one" /><i className="vault-bolt bolt-two" /><i className="vault-bolt bolt-three" /><i className="vault-bolt bolt-four" />
                <div className="vault-reflection" />
              </div>
            </div>
          </div>

          <div className="vault-console">
            <p className="vault-console-label">SECURE PORTFOLIO ACCESS</p>
            <h1 className="vault-question">Unlock the vault.</h1>
            <div className={`vault-display ${error ? 'display-error' : ''}`} aria-live="polite">
              <span className="display-led" />{'• '.repeat(code.length).trim() || '— — — —'}
            </div>
            <div className="vault-keypad">
              {['1','2','3','4','5','6','7','8','9','CLEAR','0','ENTER'].map((key) => (
                <button key={key} type="button" className={`vault-key ${key === 'ENTER' ? 'key-enter' : ''} ${key === 'CLEAR' ? 'key-clear' : ''}`} onClick={() => key === 'CLEAR' ? clearCode() : key === 'ENTER' ? submitCode() : enterDigit(key)} disabled={opened}>
                  {key}
                </button>
              ))}
            </div>
            <p className="vault-feedback" aria-live="polite">{feedback}</p>
            <p className="vault-hint">Enter the access code to continue.</p>
          </div>
        </div>
      )}

      {phase === 'dino' && (
        <div className="dino-lock-screen"><p className="dino-speech">ACCESS LOCKED</p><div className="intro-dino" role="img" aria-label="Pixel dinosaur">🦖</div><p className="dino-title">TRY AGAIN</p><p className="dino-hint">Enter the correct code or skip the intro.</p></div>
      )}

      {phase === 'glitch' && (
        <div className="glitch-scene">
          <p className="glitch-overline">ACCESS GRANTED · WELCOME</p>
          <div className="glitch-word-wrap">
            <h1 className="glitch-word glitch-main">SAFAL SILWAL</h1>
            <span className="glitch-word glitch-cyan" aria-hidden="true">SAFAL SILWAL</span>
            <span className="glitch-word glitch-magenta" aria-hidden="true">SAFAL SILWAL</span>
          </div>
          <p className="glitch-subtitle">LEARNING. BUILDING. IMPROVING.</p>
          <button className="vault-key key-enter" type="button" onClick={finishIntro}>ENTER PORTFOLIO ↗</button>
        </div>
      )}

      {phase === 'leaving' && <div className="intro-transition-flash" />}
      <button className="intro-mute" type="button" onClick={() => setMuted((value) => !value)}>{muted ? 'SOUND: OFF' : 'SOUND: ON'}</button>
      <button className="intro-skip" type="button" onClick={skipIntro}>SKIP INTRO ↗</button>
    </div>
  );
}
