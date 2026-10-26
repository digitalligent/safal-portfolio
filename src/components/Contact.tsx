
import { useState, type FormEvent } from "react";
import type { Profile } from "../types";

interface ContactProps {
  profile: Profile;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvkkgjer";

function Contact({ profile }: ContactProps) {
  const [formData, setFormData] =
    useState<ContactFormData>(initialFormData);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [statusMessage, setStatusMessage] = useState("");

  function handleChange(
    field: keyof ContactFormData,
    value: string,
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : "The message could not be submitted. Please try again.",
        );
      }

      setStatus("success");
      setStatusMessage(
        "Your message was submitted successfully. Thank you for getting in touch!",
      );
      setFormData(initialFormData);
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error &&
          error.message !== "Failed to fetch"
          ? error.message
          : "We couldn't reach the form service. Please check your connection and try again.",
      );
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-heading">
          <span className="section-kicker">GET IN TOUCH</span>

          <h2>
            Have an idea? Let's{" "}
            <span className="gradient-text">talk.</span>
          </h2>

          <p>
            Have a question, a project idea, or an opportunity to
            discuss? Use the form below to get started.
          </p>
        </div>

        <div className="contact-grid">
          <aside className="contact-information glass">
            <h3>Let's connect</h3>

            <p>
              I'm based in {profile.location}. You can use the form
              or contact me through the details below.
            </p>

            {profile.email && (
              <a
                className="contact-detail"
                href={`mailto:${profile.email}`}
              >
                <span aria-hidden="true">@</span>
                <span>
                  <small>Email</small>
                  <strong>{profile.email}</strong>
                </span>
              </a>
            )}

            {profile.phone && (
              <a
                className="contact-detail"
                href={`tel:${profile.phone}`}
              >
                <span aria-hidden="true">☎</span>
                <span>
                  <small>Phone</small>
                  <strong>{profile.phone}</strong>
                </span>
              </a>
            )}

            <div className="contact-detail">
              <span aria-hidden="true">⌖</span>
              <span>
                <small>Location</small>
                <strong>{profile.location}</strong>
              </span>
            </div>
          </aside>

          <div className="contact-form-wrapper glass">
            {statusMessage && (
              <p
                className={
                  status === "success"
                    ? "contact-success"
                    : status === "error"
                      ? "contact-error"
                      : ""
                }
                role="status"
                aria-live="polite"
              >
                {statusMessage}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="form-field">
                  <label htmlFor="contact-name">
                    Your name
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(event) =>
                      handleChange("name", event.target.value)
                    }
                    placeholder="Enter your name"
                    minLength={2}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email">
                    Email address
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(event) =>
                      handleChange("email", event.target.value)
                    }
                    placeholder="you@example.com"
                    maxLength={254}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="contact-subject">
                  Subject
                </label>

                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(event) =>
                    handleChange("subject", event.target.value)
                  }
                  placeholder="What would you like to discuss?"
                  minLength={3}
                  maxLength={150}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-message">
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={(event) =>
                    handleChange("message", event.target.value)
                  }
                  placeholder="Tell me a little about your idea..."
                  rows={5}
                  minLength={10}
                  maxLength={5000}
                  required
                />
              </div>

              <button
                className="button button-primary contact-submit"
                type="submit"
                disabled={status === "submitting"}
              >
                {status === "submitting"
                  ? "Sending..."
                  : "Send message"}

                <span aria-hidden="true">↗</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
