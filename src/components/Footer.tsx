
import type { Profile } from "../types";
import SocialLinks from "./SocialLinks";

interface FooterProps {
  profile: Profile;
}

function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="navbar-brand" href="#home">
              <span className="navbar-brand-mark">S</span>
              <span>
                {profile.firstName}
                <span className="gradient-text">.</span>
              </span>
            </a>

            <p>
              Learning, building, and turning ideas into digital
              projects.
            </p>
          </div>

          <div className="footer-navigation">
            <h3>Explore</h3>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#about">About me</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-social">
            <h3>Connect</h3>
            <SocialLinks links={profile.socialLinks} />
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} {profile.name}. All rights reserved.
          </p>

          <a href="#home" className="footer-back-to-top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
