
import { useState } from "react";
import type { Project } from "../types";
import Button from "./Button";

interface PortfolioProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

const filters = ["All", "Web", "Creative"] as const;

function Portfolio({
  projects,
  onOpenProject,
}: PortfolioProps) {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeFilter,
        );

  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="container">
        <div className="section-heading">
          <span className="section-kicker">SELECTED WORK</span>
          <h2>
            Projects that bring{" "}
            <span className="gradient-text">ideas to life.</span>
          </h2>
          <p>
            A selection of digital tools and creative projects
            I've been working on.
          </p>
        </div>

        <div
          className="portfolio-filters"
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`portfolio-filter${
                activeFilter === filter ? " is-active" : ""
              }`}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <article className="project-card glass" key={project.id}>
              <button
                type="button"
                className="project-preview"
                onClick={() => onOpenProject(project)}
                aria-label={`View details for ${project.title}`}
              >
                <span className="project-preview-number">
                  {project.number}
                </span>
                <span className="project-preview-decoration" aria-hidden="true">
                  ✳
                </span>
                <span className="project-preview-title">
                  {project.title}
                </span>
                <span className="project-preview-hint">
                  View project details ↗
                </span>
              </button>

              <div className="project-card-content">
                <span className="project-category">
                  {project.categoryLabel}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-tools">
                  {project.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>

                <div className="project-card-actions">
                  <Button
                    variant="outline"
                    onClick={() => onOpenProject(project)}
                  >
                    Details
                  </Button>

                  <a
                    className="project-external-link"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.linkText} ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
