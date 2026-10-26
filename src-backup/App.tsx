
import { useState } from 'react';
import './App.css';
import MusicPlayer from './MusicPlayer';
import CinematicIntro from './Intro';
import CustomCursor from './InteractiveFeatures';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <CinematicIntro />
      <CustomCursor />
      <header className="navbar">
        <a className="logo" href="#home" onClick={closeMenu}>
          SS<span>.</span>
        </a>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Hire me <span>↗</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-content">
            <div className="availability">
              <span className="status-dot" />
              Open to freelance opportunities
            </div>

            <p className="eyebrow">HELLO, I'M</p>
            <h1>Safal <span>Silwal.</span></h1>

            <h2>Building my skills.<br />Creating what's next.</h2>

            <p className="hero-description">
              I'm developing my skills and working towards creating
              useful, thoughtful digital experiences. I'm open to
              connecting with people who have interesting projects.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore my work <span>↗</span>
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
              <span>FIND ME ON</span>
              <a href="#contact">Get in touch ↗</a>
              {/* Add your real GitHub and LinkedIn URLs here. */}
            </div>
          </div>

          <div className="hero-visual">
            <div className="photo-frame">
              <img
                src="/images/profile.jpg"
                alt="Portrait of Safal Silwal"
              />
            </div>
            <div className="photo-caption">
              <span className="caption-mark">✳</span>
              <div>
                <strong>Safal Silwal</strong>
                <p>Learning. Building. Improving.</p>
              </div>
            </div>
            <div className="decorative-circle" />
          </div>
        </section>

        <section className="about section" id="about">
          <div className="section-heading">
            <p className="eyebrow">A LITTLE ABOUT ME</p>
            <h2>Curious by nature.<br />Driven to <span>create.</span></h2>
          </div>

          <div className="about-content">
            <p>
              I'm at the beginning of my learning journey, developing
              my skills and exploring how ideas become useful digital
              products.
            </p>
            <p>
              I'm interested in connecting with people, learning from
              real projects, and finding opportunities to contribute.
              This portfolio will grow as I gain experience and build
              work I can share.
            </p>
            <a className="text-link" href="#contact">
              Let's talk about your project ↗
            </a>
          </div>
        </section>

        <section className="projects section" id="projects">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2>Projects & <span>experiments.</span></h2>
            </div>
            <p className="section-note">
              A space for work, experiments, and future projects.
            </p>
          </div>

          <div className="project-grid">
            <article className="project-card">
              <div className="project-placeholder">
                <span>01 / PROJECT</span>
                <span className="placeholder-symbol">↗</span>
              </div>
              <div className="project-info">
                <p className="project-type">PROJECT TODO</p>
                <h3>Add your first project</h3>
                <p>
                  Replace this placeholder with a real project,
                  what it does, and what you learned while building it.
                </p>
                <div className="tags">
                  <span>TODO: Technology</span>
                  <span>TODO: Category</span>
                </div>
              </div>
            </article>

            <article className="project-card">
              <div className="project-placeholder project-placeholder-alt">
                <span>02 / PROJECT</span>
                <span className="placeholder-symbol">✳</span>
              </div>
              <div className="project-info">
                <p className="project-type">PROJECT TODO</p>
                <h3>Your next project</h3>
                <p>
                  Add another genuine project when you have one
                  ready to show.
                </p>
                <div className="tags">
                  <span>TODO: Technology</span>
                  <span>TODO: Category</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="skills section" id="skills">
          <div className="section-heading">
            <p className="eyebrow">WHAT I'M LEARNING</p>
            <h2>Skills & <span>growth.</span></h2>
            <p className="section-note">
              My skills will be listed here as I develop and verify them.
            </p>
          </div>

          <div className="skill-groups">
            <div className="skill-group">
              <span className="skill-number">01</span>
              <h3>Languages</h3>
              <p>TODO: Add languages you genuinely know.</p>
            </div>
            <div className="skill-group">
              <span className="skill-number">02</span>
              <h3>Development</h3>
              <p>TODO: Add tools and technologies you're learning.</p>
            </div>
            <div className="skill-group">
              <span className="skill-number">03</span>
              <h3>Other skills</h3>
              <p>TODO: Add your verified skills and interests.</p>
            </div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
            <h2>Let's make something <span>useful.</span></h2>
            <p>
              Have a question, a project idea, or a potential
              opportunity? Send me a message using the form.
            </p>
            <p className="contact-note">
              Fields marked with * are required.
            </p>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <label htmlFor="name">Your name *</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              required
              maxLength={100}
            />

            <label htmlFor="email">Email address *</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              maxLength={254}
            />

            <label htmlFor="company">Company (optional)</label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Your company or organisation"
              maxLength={150}
            />

            <label htmlFor="projectType">What can I help with? *</label>
            <select
              id="projectType"
              name="projectType"
              defaultValue=""
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="Freelance project">Freelance project</option>
              <option value="Employment opportunity">Employment opportunity</option>
              <option value="Collaboration">Collaboration</option>
              <option value="General enquiry">General enquiry</option>
            </select>

            <label htmlFor="message">Your message *</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell me about your idea or opportunity..."
              rows={5}
              required
              minLength={10}
              maxLength={5000}
            />

            <button className="button button-primary submit-button" type="submit">
              Send enquiry <span>↗</span>
            </button>

            {submitted && (
              <p className="form-message" role="status">
                The form is not connected to email yet. Your message
                has not been sent. We'll connect an email service next.
              </p>
            )}
          </form>
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="#home">SS<span>.</span></a>
        <p>© {new Date().getFullYear()} Safal Silwal.</p>
        <a href="#home">Back to top ↑</a>
      </footer>
      <MusicPlayer />
    </>
  );
}

export default App;
