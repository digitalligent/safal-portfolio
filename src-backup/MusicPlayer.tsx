import { useRef, useState } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [showVolume, setShowVolume] = useState(false);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  return (
    <div style={{ position: 'fixed', right: 22, bottom: 22, zIndex: 1000, display: 'flex', alignItems: 'center', gap: 10 }}>
      <audio ref={audioRef} src="/sounds/music.mp3" loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />
      {showVolume && (
        <label style={{ background: '#fff', border: '1px solid #e8e7e0', borderRadius: 24, padding: '10px 12px', boxShadow: '0 8px 24px #0001' }}>
          <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)' }}>Music volume</span>
          <input aria-label="Music volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => { const next = Number(event.target.value); setVolume(next); if (audioRef.current) audioRef.current.volume = next; }} />
        </label>
      )}
      <button type="button" onClick={togglePlayback} onContextMenu={(event) => { event.preventDefault(); setShowVolume((value) => !value); }} onDoubleClick={() => setShowVolume((value) => !value)} aria-label={playing ? 'Pause background music' : 'Play background music'} title="Click to play/pause; double-click for volume" style={{ width: 58, height: 58, border: '1px solid #d8d8cf', borderRadius: '50%', background: '#fff', color: '#22231f', boxShadow: '0 8px 28px #0002', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
        <img src="/images/music-icon.png" alt="" onError={(event) => { event.currentTarget.style.display = 'none'; }} style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
        <span style={{ position: 'absolute', fontSize: 18, background: '#ffffffd9', borderRadius: 20, padding: '2px 6px' }}>{playing ? 'Ⅱ' : '▶'}</span>
      </button>
    </div>
  );
}
