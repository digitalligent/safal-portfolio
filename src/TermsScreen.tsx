import { useState } from "react";
import "./TermsScreen.css";

type TermsScreenProps = {
  onAccept: () => void;
};

export default function TermsScreen({
  onAccept,
}: TermsScreenProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <main className="terms-screen">
      <section
        className="terms-card"
        aria-labelledby="terms-title"
      >
        <p className="terms-eyebrow">
          BEFORE YOU CONTINUE
        </p>

        <h1 id="terms-title">
          A few things to know.
        </h1>

        <p className="terms-description">
          Welcome to my portfolio. Please review these
          notes before exploring the website.
        </p>

        <div className="terms-content">
          <h2>Website information</h2>
          <p>
            This portfolio presents my projects, skills,
            and creative work for informational purposes.
            Project details may change over time.
          </p>

          <h2>External links</h2>
          <p>
            This website may link to external services,
            including GitHub, YouTube, WhatsApp, and
            other project websites. Those services have
            their own policies and terms.
          </p>

          <h2>Contact form</h2>
          <p>
            If you contact me through the form, the
            information you submit will be processed
            through the form service used by this website.
            Please do not submit sensitive information.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Unless otherwise indicated, portfolio text,
            design, and original materials belong to
            their respective owners. Please request
            permission before reusing original work.
          </p>
        </div>

        <label className="terms-consent">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) =>
              setAccepted(event.target.checked)
            }
          />

          <span>
            I have read and understood this notice.
          </span>
        </label>

        <button
          className="terms-accept-button"
          type="button"
          disabled={!accepted}
          onClick={onAccept}
        >
          Continue to portfolio
          <span aria-hidden="true">↗</span>
        </button>

        <p className="terms-footnote">
          This notice is informational and is not a
          substitute for legally reviewed website terms
          or a privacy policy.
        </p>
      </section>
    </main>
  );
}
