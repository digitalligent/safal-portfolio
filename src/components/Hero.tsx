
import type { Profile } from "../types";
import Button from "./Button";
import SocialLinks from "./SocialLinks";

interface HeroProps {
  profile: Profile;
}

function Hero({ profile }: HeroProps) {
  return (
    <section className="hero section" id="home">
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="hero-eyebrow">
            <span className="hero-status-dot" />
            {profile.availability}
          </p>

          <p className="hero-greeting">{profile.greeting}</p>

          <h1>
            {profile.firstName}
            <br />
            <span className="gradient-text">
              {profile.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <h2 className="hero-title">
            {profile.professionalTitle}
          </h2>

          <p className="hero-description">{profile.intro}</p>

          <div className="hero-actions">
            <Button
              onClick={() => {
                document
                  .getElementById("portfolio")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore My Work <span aria-hidden="true">↗</span>
            </Button>

            <a className="button button-outline" href="#contact">
              Let's Talk
            </a>
          </div>

          <div className="hero-social">
            <span>Find me on</span>
            <SocialLinks links={profile.socialLinks} />
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-frame">
            <img
              className="hero-profile-image"
              src="/images/profile.jpg"
              alt={`${profile.name} — profile portrait`}
            />

            <div className="hero-image-caption glass">
              <span className="hero-caption-icon" aria-hidden="true">
                ✦
              </span>
              <div>
                <strong>Creative mind.</strong>
                <span>Practical solutions.</span>
              </div>
            </div>
          </div>

          <div className="hero-floating-card hero-floating-location glass">
            <span aria-hidden="true">⌖</span>
            <div>
              <strong>Based in</strong>
              <span>{profile.location}</span>
            </div>
          </div>

          <div className="hero-floating-card hero-floating-availability glass">
            <span className="hero-status-dot" />
            <div>
              <strong>Open to</strong>
              <span>New opportunities</span>
            </div>
          </div>

          <div className="hero-decoration hero-decoration-one" />
          <div className="hero-decoration hero-decoration-two" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
