
import { useState, type FormEvent } from 'react';
import './App.css';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  function closeMenu() {
    setMenuOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/xvkkgjer', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        form.reset();
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  }

  return (
    <>
      <header className="navbar">
        <a className="logo" href="#home" onClick={closeMenu}>
          SS<span>.</span>
        </a>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
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
        {/* Hero */}
        <section className="hero section" id="home">
          <div className="hero-content">
            <div className="availability">
              <span className="status-dot" />
              Open to freelance opportunities
            </div>

            <p className="eyebrow">HELLO, I'M</p>
            <h1>Safal <span>Silwal.</span></h1>

            <h2>
              Building my skills.
              <br />
              Creating what's next.
            </h2>

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
              <a href="#skills">My YouTube channels ↗</a>
              <a href="#contact">Get in touch ↗</a>
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

        {/* About */}
        <section className="about section" id="about">
          <div className="section-heading">
            <p className="eyebrow">A LITTLE ABOUT ME</p>
            <h2>
              Curious by nature.
              <br />
              Driven to <span>create.</span>
            </h2>
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

        {/* Projects */}
        <section className="projects section" id="projects">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2>
                Projects & <span>experiments.</span>
              </h2>
            </div>

            <p className="section-note">
              Websites, content projects, and practical experiments
              I'm developing and sharing.
            </p>
          </div>

          <div className="project-grid">
            <article className="project-card">
              <a
                className="project-placeholder project-link-visual"
                href="https://all-in-one-forex-tools.onrender.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Open All-in-One Forex Tools website"
              >
                <span>01 / LIVE WEBSITE</span>
                <span className="placeholder-symbol">↗</span>
              </a>

              <div className="project-info">
                <p className="project-type">DEPLOYED PROJECT</p>
                <h3>All-in-One Forex Tools</h3>

                <p>
                  A live website bringing together useful tools for
                  people learning about Forex. Visit the deployed
                  project to explore it.
                </p>

                <div className="tags">
                  <span>Web development</span>
                  <span>Live deployment</span>
                </div>

                <a
                  className="text-link project-external-link"
                  href="https://all-in-one-forex-tools.onrender.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit website ↗
                </a>
              </div>
            </article>

            <article className="project-card">
              <div className="project-placeholder project-placeholder-alt">
                <span>02 / VIDEO CONTENT</span>
                <span className="placeholder-symbol">▶</span>
              </div>

              <div className="project-info">
                <p className="project-type">SOCIAL MEDIA & CONTENT</p>
                <h3>YouTube channel projects</h3>

                <p>
                  I create and manage content across gaming, vlogging,
                  and mystery-themed YouTube channels while developing
                  my video editing and content-presentation skills.
                </p>

                <div className="tags">
                  <span>Content creation</span>
                  <span>Video editing</span>
                  <span>YouTube</span>
                </div>

                <a className="text-link project-external-link" href="#skills">
                  Explore my channels ↓
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* Skills and YouTube channels */}
        <section className="skills section" id="skills">
          <div className="section-heading">
            <p className="eyebrow">WHAT I'M LEARNING</p>
            <h2>
              Skills & <span>growth.</span>
            </h2>

            <p className="section-note">
              A practical snapshot of the skills I'm developing and
              the content I create.
            </p>
          </div>

          <div className="skill-groups">
            <div className="skill-group">
              <span className="skill-number">01</span>
              <h3>Web development</h3>

              <p>
                Building and improving websites, learning through
                practical projects, and publishing work online.
              </p>

              <a
                className="skill-link"
                href="https://all-in-one-forex-tools.onrender.com/"
                target="_blank"
                rel="noreferrer"
              >
                View my deployed website ↗
              </a>
            </div>

            <div className="skill-group">
              <span className="skill-number">02</span>
              <h3>Social media handling</h3>

              <p>
                Managing my own YouTube channels and exploring how
                to organise, present, and share content for different
                audiences.
              </p>

              <ul className="channel-list">
                <li>
                  <a
                    href="https://www.youtube.com/@frenzycrave369"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Gaming channel <span>↗</span>
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.youtube.com/@glazeproject339"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Vlogs channel <span>↗</span>
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.youtube.com/@TheEnigmaticPedia"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Mystery & enigmatic videos <span>↗</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="skill-group">
              <span className="skill-number">03</span>
              <h3>Video editing & content</h3>

              <p>
                Developing video editing skills by working on my own
                channel content, with a focus on clear presentation
                and engaging visuals.
              </p>

              <div className="tags">
                <span>Video editing</span>
                <span>Content creation</span>
                <span>YouTube</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section className="contact section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
            <h2>
              Let's make something <span>useful.</span>
            </h2>

            <p>
              Have a question, a project idea, or a potential
              opportunity? Send me a message using the form.
            </p>

            <p className="contact-note">
              Fields marked with * are required.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Your name *</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              required
              maxLength={100}
              disabled={formStatus === 'sending'}
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
              disabled={formStatus === 'sending'}
            />

            <label htmlFor="company">Company (optional)</label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Your company or organisation"
              maxLength={150}
              disabled={formStatus === 'sending'}
            />

            <label htmlFor="projectType">
              What can I help with? *
            </label>

            <select
              id="projectType"
              name="projectType"
              defaultValue=""
              required
              disabled={formStatus === 'sending'}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="Freelance project">
                Freelance project
              </option>
              <option value="Employment opportunity">
                Employment opportunity
              </option>
              <option value="Collaboration">
                Collaboration
              </option>
              <option value="General enquiry">
                General enquiry
              </option>
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
              disabled={formStatus === 'sending'}
            />

            <button
              className="button button-primary submit-button"
              type="submit"
              disabled={formStatus === 'sending'}
            >
              {formStatus === 'sending'
                ? 'Sending...'
                : 'Send enquiry'}

              {formStatus !== 'sending' && <span>↗</span>}
            </button>

            <div aria-live="polite" aria-atomic="true">
              {formStatus === 'success' && (
                <p className="form-message" role="status">
                  Thank you for your message! Your enquiry was
                  submitted successfully.
                </p>
              )}

              {formStatus === 'error' && (
                <p className="form-message" role="alert">
                  Your message could not be sent. Please try again
                  or contact me through another channel.
                </p>
              )}
            </div>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <a className="logo" href="#home">
          SS<span>.</span>
        </a>

        <p>© {new Date().getFullYear()} Safal Silwal.</p>

        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}

export default App;
