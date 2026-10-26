
import { useEffect } from "react";
import type { Project } from "../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  return (
    <div
      className="project-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="project-modal glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <button
          className="project-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          autoFocus
        >
          ×
        </button>

        <span className="project-category">
          {project.categoryLabel}
        </span>

        <span className="project-modal-number">
          PROJECT {project.number}
        </span>

        <h2 id="project-modal-title">{project.title}</h2>

        <p>{project.description}</p>

        <div className="project-tools">
          {project.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>

        <div className="project-modal-actions">
          <a
            className="button button-primary"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.linkText} <span aria-hidden="true">↗</span>
          </a>

          <button
            className="button button-outline"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProjectModal;
