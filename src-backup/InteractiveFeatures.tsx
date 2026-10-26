import { useEffect, useState } from 'react';

/** Lightweight custom cursor. Native cursor remains enabled for accessibility. */
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
      setActive(Boolean((event.target as HTMLElement | null)?.closest('a, button, input, textarea, select')));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', left: position.x, top: position.y, zIndex: 99998,
        width: active ? 28 : 12, height: active ? 28 : 12,
        border: '1px solid #526b50', borderRadius: '50%',
        background: active ? 'rgba(82,107,80,.12)' : 'rgba(82,107,80,.25)',
        pointerEvents: 'none', opacity: visible ? 1 : 0,
        transform: 'translate(-50%, -50%)', transition: 'width .12s, height .12s, opacity .15s',
      }}
    />
  );
}
