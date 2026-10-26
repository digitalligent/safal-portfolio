
import type { Theme } from "../hooks/useTheme";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      className={`theme-switch ${isDark ? "is-on" : "is-off"}`}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Dark mode ${isDark ? "on" : "off"}`}
      title={`Turn dark mode ${isDark ? "off" : "on"}`}
      onClick={onToggle}
    >
      <span className="theme-switch-bulb" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="23"
          height="23"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M8.5 14.5a7 7 0 1 1 7 0c-.8.6-1.2 1.5-1.2 2.5h-4.6c0-1-.4-1.9-1.2-2.5Z" />
          {isDark && (
            <>
              <path d="M12 2v1" />
              <path d="m4.9 4.9.7.7" />
              <path d="M19.1 4.9l-.7.7" />
            </>
          )}
        </svg>
      </span>

      <span className="theme-switch-track" aria-hidden="true">
        <span className="theme-switch-thumb">
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v10" />
            <path d="M5.6 5.6a9 9 0 1 0 12.8 0" />
          </svg>
        </span>
      </span>

      <span className="theme-switch-status" aria-hidden="true">
        {isDark ? "ON" : "OFF"}
      </span>
    </button>
  );
}

export default ThemeToggle;
