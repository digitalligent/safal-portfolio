
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import type { Theme } from "../hooks/useTheme";
import type { SectionId } from "../hooks/useActiveSection";

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  activeSection: SectionId;
}

const navigationLinks: {
  label: string;
  href: `#${SectionId}`;
  section: SectionId;
}[] = [
  { label: "Home", href: "#home", section: "home" },
  { label: "Services", href: "#services", section: "services" },
  { label: "About me", href: "#about", section: "about" },
  { label: "Portfolio", href: "#portfolio", section: "portfolio" },
  { label: "Contact", href: "#contact", section: "contact" },
];

function Navbar({
  theme,
  onToggleTheme,
  activeSection,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <a
          className="navbar-brand"
          href="#home"
          onClick={closeMenu}
          aria-label="Go to homepage"
        >
          <span className="navbar-brand-mark" aria-hidden="true">
            S
          </span>
          <span>
            Safal<span className="gradient-text">.</span>
          </span>
        </a>

        <button
          className="navbar-menu-toggle"
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="navbar-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          id="navbar-links"
          className={`navbar-links${menuOpen ? " is-open" : ""}`}
        >
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={
                activeSection === link.section ? "is-active" : undefined
              }
              aria-current={
                activeSection === link.section ? "location" : undefined
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="navbar-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <a
            className="button button-primary navbar-hire-button"
            href="#contact"
            onClick={closeMenu}
          >
            Hire Me <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
