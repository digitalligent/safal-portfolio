
import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import CinematicIntro from "./Intro";
import CustomCursor from "./InteractiveFeatures";
import MusicPlayer from "./MusicPlayer";

const projects = [
  {
    number: "01",
    category: "FINANCE · WEB APPLICATION",
    title: "All-in-One Forex Tools",
    description:
      "An interactive collection of Forex calculation tools designed to make trading mathematics easier to understand.",
    link: "https://all-in-one-forex-tools.onrender.com/",
    linkText: "Explore project",
  },
  {
    number: "02",
    category: "MUSIC · CREATIVE PROJECT",
    title: "Frenzy Crave",
    description:
      "A creative YouTube project exploring music, gaming, and digital content.",
    link: "https://www.youtube.com/@frenzycrave369",
    linkText: "Visit channel",
  },
  {
    number: "03",
    category: "MEDIA · CONTENT CREATION",
    title: "The Enigmatic Pedia",
    description:
      "A YouTube project focused on curiosity, research, and mystery-themed content.",
    link: "https://www.youtube.com/@TheEnigmaticPedia",
    linkText: "Visit channel",
  },
];

const skills = [
  "React",
  "TypeScript",
  "JavaScript",
  "HTML & CSS",
  "Web Development",
  "AI Tools",
  "Prompt Engineering",
  "Photoshop",
  "Figma",
  "DaVinci Resolve",
  "Creative Projects",
  "Problem Solving",
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [visitorTime, setVisitorTime] = useState(() =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisitorTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  async function handleContactSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setSending(true);
    setFormStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://formspree.io/f/xvkkgjer",
        {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        },
      );

      if (response.ok) {
        setFormStatus(
          "Message sent successfully. Thank you for reaching out.",
        );
        form.reset();
      } else {
        setFormStatus(
          "Your message could not be sent. Please try again.",
        );
      }
    } catch {
      setFormStatus(
        "Connection error. Please check your internet and try again.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <CinematicIntro />
      <CustomCursor />

      <div className="portfolio-shell" id="top">
        <header className="site-header">
          <a
            href="#top"
            className="brand"
            aria-label="Safal Silwal home"
            onClick={() => setMenuOpen(false)}
          >
            <span className="brand-name">
              SAFAL SILWAL<span>.</span>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={
              menuOpen ? "Close navigation" : "Open navigation"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <nav
            className={menuOpen ? "main-nav nav-open" : "main-nav"}
            aria-label="Main navigation"
          >
            {[
              ["About", "#about"],
              ["Projects", "#projects"],
              ["Skills", "#skills"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                href={href}
                key={label}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}

            <a
              className="nav-cta"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Let's talk <span>↗</span>
            </a>
          </nav>
        </header>

        <main>
          <section className="hero section-container" id="home">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" />
                INDEPENDENT CREATOR · DEVELOPER
              </p>

              <h1>
                Building ideas
                <br />
                into <span className="serif-accent">something</span>
                <br />
                meaningful<span className="title-period">.</span>
              </h1>

              <p className="hero-description">
                I'm Safal Silwal. I explore technology, build digital
                experiences, and turn curiosity into projects.
              </p>

              <div className="hero-actions">
                <a className="button button-dark" href="#projects">
                  Explore my work <span>↘</span>
                </a>

                <a
                  className="button button-secondary"
                  href="/files/safal-cv.pdf"
                  download
                >
                  Download CV <span>↓</span>
                </a>
              </div>

              <div className="hero-socials">
                <a
                  href="https://www.linkedin.com/in/safal-silwal-a01aa2341/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://www.pinterest.com/silwalsafal369/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pinterest ↗
                </a>
              </div>
            </div>

            <div className="hero-art">
              <div className="art-grid" />
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-monogram">S</div>

              <div className="art-caption">
                <span>FIG. 001</span>
                <span>IDEAS IN MOTION</span>
              </div>

              <span className="art-cross cross-one">+</span>
              <span className="art-cross cross-two">+</span>

              <div className="art-stamp">
                CURIOUS
                <br />
                BY NATURE
              </div>
            </div>

            <a className="scroll-cue" href="#about">
              <span className="scroll-line" />
              SCROLL TO EXPLORE
            </a>
          </section>

          <section className="intro-strip">
            <p>
              CURIOUS MIND <span>✳</span> DIGITAL CRAFT <span>✳</span>{" "}
              CONTINUOUS LEARNING <span>✳</span> BIG IDEAS
            </p>
          </section>

          <section className="about section-container" id="about">
            <div className="section-heading">
              <p className="eyebrow">01 / A LITTLE ABOUT ME</p>
              <span className="heading-decoration">✳</span>
            </div>

            <div className="about-layout">
              <h2>
                Curious about
                <br />
                <span className="serif-accent">what's possible.</span>
              </h2>

              <div className="about-copy">
                <p>
                  I'm an independent learner interested in technology,
                  creative work, music, and building useful things on
                  the internet.
                </p>

                <p>
                  I've explored tools such as Photoshop, Figma,
                  DaVinci Resolve, and AI tools. I learn by building
                  real projects, solving problems, and improving what
                  I've made.
                </p>

                <p>
                  I'm open to connecting with people and discussing
                  suitable projects and opportunities.
                </p>

                <a className="text-link" href="#contact">
                  Let's connect <span>↗</span>
                </a>
              </div>
            </div>
          </section>

          <section className="projects-section" id="projects">
            <div className="section-container">
              <div className="section-heading">
                <p className="eyebrow">02 / SELECTED WORK</p>
                <span className="section-note">PROJECTS IN PROGRESS</span>
              </div>

              <div className="projects-title-row">
                <h2>
                  Made with
                  <br />
                  <span className="serif-accent">curiosity.</span>
                </h2>

                <p>
                  Digital tools, creative experiments, and ideas
                  developed through hands-on learning.
                </p>
              </div>

              <div className="project-list">
                {projects.map((project) => (
                  <article
                    className="project-card"
                    key={project.number}
                  >
                    <span className="project-number">
                      {project.number}
                    </span>

                    <div className="project-info">
                      <p className="project-category">
                        {project.category}
                      </p>
                      <h3>{project.title}</h3>
                      <p className="project-description">
                        {project.description}
                      </p>
                    </div>

                    <a
                      className="project-link"
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.linkText}: ${project.title}`}
                    >
                      <span>{project.linkText}</span>
                      <span className="project-arrow">↗</span>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            className="skills-section section-container"
            id="skills"
          >
            <div className="section-heading">
              <p className="eyebrow">03 / TOOLS & INTERESTS</p>
              <span className="section-note">ALWAYS LEARNING</span>
            </div>

            <div className="skills-layout">
              <h2>
                Learning.
                <br />
                <span className="serif-accent">Making.</span>
                <br />
                Improving.
              </h2>

              <div className="skills-content">
                <p>
                  My toolkit grows with every project. These are
                  technologies and creative areas I use or explore.
                </p>

                <div className="skill-tags">
                  {skills.map((skill) => (
                    <span className="skill-tag" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="channel-links">
                  <a
                    href="https://www.youtube.com/@frenzycrave369"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Frenzy Crave on YouTube ↗
                  </a>
                  <a
                    href="https://www.youtube.com/@TheEnigmaticPedia"
                    target="_blank"
                    rel="noreferrer"
                  >
                    The Enigmatic Pedia ↗
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="contact-section" id="contact">
            <div className="section-container">
              <div className="section-heading">
                <p className="eyebrow">04 / GET IN TOUCH</p>
                <span className="heading-decoration">↗</span>
              </div>

              <div className="contact-layout">
                <div className="contact-copy">
                  <h2>
                    Have something
                    <br />
                    <span className="serif-accent">in mind?</span>
                  </h2>

                  <p>
                    Have a question, an idea, or an interesting
                    opportunity? Send me a message.
                  </p>

                  <p className="contact-note">
                    Your details are used to respond to your enquiry.
                  </p>
                </div>

                <form
                  className="contact-form"
                  onSubmit={handleContactSubmit}
                >
                  <label htmlFor="contact-name">Your name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    disabled={sending}
                  />

                  <label htmlFor="contact-email">
                    Email address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={254}
                    required
                    disabled={sending}
                  />

                  <label htmlFor="contact-project">
                    What can I help with?
                  </label>
                  <select
                    id="contact-project"
                    name="projectType"
                    defaultValue="General enquiry"
                    disabled={sending}
                  >
                    <option>General enquiry</option>
                    <option>Freelance project</option>
                    <option>Employment opportunity</option>
                    <option>Collaboration</option>
                  </select>

                  <label htmlFor="contact-message">Your message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me about your idea..."
                    rows={5}
                    minLength={10}
                    maxLength={5000}
                    required
                    disabled={sending}
                  />

                  <button
                    className="button button-dark submit-button"
                    type="submit"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Send message"}
                    <span>↗</span>
                  </button>

                  {formStatus && (
                    <p className="form-status" role="status">
                      {formStatus}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <a className="footer-brand" href="#top">
            SS<span>.</span>
          </a>

          <p>DESIGNED WITH CURIOSITY · BUILT BY SAFAL SILWAL</p>

          <div className="visitor-clock">
            <span>YOUR LOCAL TIME</span>
            <strong>{visitorTime}</strong>
          </div>

          <a href="#top" className="back-to-top">
            BACK TO TOP ↑
          </a>

          <span className="footer-year">
            © {new Date().getFullYear()}
          </span>
        </footer>
      </div>

      <MusicPlayer />
    </>
  );
}

export default App;
