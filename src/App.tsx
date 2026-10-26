
import { useEffect, useState, type FormEvent } from "react";
import profileData from "./data/profile.json";
import projectsData from "./data/projects.json";
import skillsData from "./data/skills.json";
import "./App.css";

type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: string;
  tools: string[];
  link: string;
  linkText: string;
  featured: boolean;
};

type Theme = "dark" | "light";

const profile = profileData;
const projects = projectsData as Project[];
const skills = skillsData;

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (!selectedProject) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedProject(null);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const filters = [
    "All",
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFormStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xvkkgjer", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("The message could not be sent.");
      }

      setFormStatus("Your message was sent successfully.");
      form.reset();
    } catch {
      setFormStatus(
        "We couldn't send your message. Please try again later.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <header className="site-header">
        <nav className="nav container" aria-label="Main navigation">
          <a className="brand" href="#home" aria-label="Safal Silwal home">
            <span className="brand-mark">S.</span>
            <span>SAFAL<span className="brand-dot">.</span></span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>

          <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              onClick={() =>
                setTheme((current) =>
                  current === "dark" ? "light" : "dark",
                )
              }
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title="Toggle color theme"
            >
              {theme === "dark" ? "☼" : "☾"}
            </button>
            <a className="button button-small" href="#contact">
              Let's talk <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" />
                {profile.greeting}
              </p>

              <h1>
                Safal
                <br />
                <span className="gradient-text">Silwal.</span>
              </h1>

              <h2 className="hero-role">{profile.professionalTitle}</h2>

              <p className="hero-description">{profile.intro}</p>

              <div className="hero-actions">
                <a className="button" href="#projects">
                  Explore my work <span aria-hidden="true">↗</span>
                </a>
                <a className="button button-secondary" href="#contact">
                  Get in touch
                </a>
              </div>

              <div className="hero-location">
                <span aria-hidden="true">⌖</span>
                Based in {profile.location}
              </div>
            </div>

            <div className="hero-art" aria-label="Personal profile">
              <div className="orbit orbit-one" aria-hidden="true" />
              <div className="orbit orbit-two" aria-hidden="true" />
              <div className="hero-monogram" aria-hidden="true">S</div>
              <div className="hero-art-label">
                <span className="status-dot" />
                Curious by nature. Building with purpose.
              </div>
              <span className="hero-coordinate" aria-hidden="true">
                01 / PORTFOLIO
              </span>
            </div>
          </div>

          <a className="scroll-cue" href="#about">
            <span /> Scroll to explore
          </a>
        </section>

        <section className="stats-strip" aria-label="Project highlights">
          <div className="container stats-grid">
            {profile.stats.map((stat) => (
              <div className="stat-item" key={stat.label}>
                <strong>
                  {stat.value}{stat.suffix}
                </strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="about">
          <div className="container about-grid">
            <div className="section-intro">
              <p className="eyebrow">01 — ABOUT ME</p>
              <h2>
                Curiosity into
                <br />
                <span className="gradient-text">creation.</span>
              </h2>
            </div>

            <div className="about-copy">
              <p className="about-lead">
                I'm {profile.name}, an independent creator and developer
                interested in technology, digital experiences, and creative
                problem-solving.
              </p>
              <p>
                I learn by building practical projects, exploring new tools,
                and improving each iteration. This portfolio brings together
                some of the work I'm developing across technology and digital
                content.
              </p>

              <div className="about-values">
                <div>
                  <span>01</span>
                  <strong>Learn by building</strong>
                  <p>Turn ideas into practical experiments.</p>
                </div>
                <div>
                  <span>02</span>
                  <strong>Keep improving</strong>
                  <p>Refine the details and learn from each project.</p>
                </div>
                <div>
                  <span>03</span>
                  <strong>Stay curious</strong>
                  <p>Explore technology with an open mind.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">02 — TOOLKIT</p>
              <h2>
                Skills & <span className="gradient-text">interests.</span>
              </h2>
              <p>
                Technologies and capabilities featured in my current toolkit.
              </p>
            </div>

            <div className="skills-grid">
              {skills.map((skill) => (
                <div className="skill-card" key={skill.id}>
                  <span className="skill-symbol" aria-hidden="true">↗</span>
                  <span>{skill.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="container">
            <div className="section-heading projects-heading">
              <div>
                <p className="eyebrow">03 — SELECTED WORK</p>
                <h2>
                  Things I've <span className="gradient-text">created.</span>
                </h2>
              </div>
              <p>
                A selection of projects exploring web tools, music, and
                curiosity-driven content.
              </p>
            </div>

            <div className="project-filters" aria-label="Filter projects">
              {filters.map((filter) => (
                <button
                  className={activeFilter === filter ? "filter active" : "filter"}
                  type="button"
                  key={filter}
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <article className="project-card" key={project.id}>
                  <button
                    type="button"
                    className="project-preview"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`View details for ${project.title}`}
                  >
                    <span className="project-number">{project.number}</span>
                    <span className="project-preview-title">
                      {project.title}
                    </span>
                    <span className="project-preview-arrow" aria-hidden="true">
                      ↗
                    </span>
                    <span className="project-preview-category">
                      {project.categoryLabel}
                    </span>
                  </button>

                  <div className="project-body">
                    <div className="project-title-row">
                      <h3>{project.title}</h3>
                      <button
                        type="button"
                        className="text-action"
                        onClick={() => setSelectedProject(project)}
                      >
                        Details <span aria-hidden="true">↗</span>
                      </button>
                    </div>
                    <p>{project.description}</p>
                    <div className="tag-list">
                      {project.tools.map((tool) => (
                        <span className="tag" key={tool}>{tool}</span>
                      ))}
                    </div>
                    <a
                      className="project-link"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.linkText} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">04 — CONTACT</p>
              <h2>
                Have an idea?
                <br />
                <span className="gradient-text">Let's connect.</span>
              </h2>
              <p>
                Have a question, a project idea, or an opportunity to discuss?
                Send me a message.
              </p>
              <div className="contact-note">
                <span className="status-dot" />
                {profile.availability}
              </div>
              <p className="contact-location">⌖ {profile.location}</p>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    autoComplete="name"
                    maxLength={100}
                    required
                  />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </label>
              </div>

              <label>
                Subject
                <input
                  name="subject"
                  type="text"
                  placeholder="What would you like to discuss?"
                  maxLength={150}
                  required
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  placeholder="Tell me a little about it..."
                  rows={5}
                  maxLength={5000}
                  required
                />
              </label>

              <button className="button form-submit" type="submit" disabled={submitting}>
                {submitting ? "Sending..." : "Send message"}
                <span aria-hidden="true">↗</span>
              </button>

              {formStatus && (
                <p className="form-status" role="status" aria-live="polite">
                  {formStatus}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand" href="#home">
            <span className="brand-mark">S.</span>
            <span>SAFAL<span className="brand-dot">.</span></span>
          </a>
          <p>Designed and built with curiosity.</p>
          <span>© {new Date().getFullYear()} {profile.name}</span>
        </div>
      </footer>

      {selectedProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              ×
            </button>
            <p className="eyebrow">{selectedProject.categoryLabel}</p>
            <h2 id="modal-title">{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>
            <div className="tag-list">
              {selectedProject.tools.map((tool) => (
                <span className="tag" key={tool}>{tool}</span>
              ))}
            </div>
            <a
              className="button"
              href={selectedProject.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedProject.linkText} <span aria-hidden="true">↗</span>
            </a>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
