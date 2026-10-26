
import type { Service } from "../types";

interface ServicesProps {
  services: Service[];
}

const serviceSymbols: Record<string, string> = {
  target: "◎",
  palette: "◈",
  code: "</>",
  "file-text": "▤",
  "pen-tool": "✎",
  "chart-no-axes-combined": "↗",
};

function Services({ services }: ServicesProps) {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-heading">
          <span className="section-kicker">WHAT I CAN DO</span>
          <h2>
            Services designed to create{" "}
            <span className="gradient-text">impact.</span>
          </h2>
          <p>
            Practical skills and creative thinking, brought together
            to turn ideas into useful digital experiences.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <article
              className="service-card glass"
              key={service.id}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="service-icon" aria-hidden="true">
                {serviceSymbols[service.icon] ?? "✦"}
              </div>

              <span className="service-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <span className="service-card-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
