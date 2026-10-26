import { useRef, useState } from 'react';
import type { Skill } from '../../types/skills';
import importedSkills from '../../data/skills.json';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { MarqueeTrack } from './MarqueeTrack';
import type { SkillsProps } from '../../types/skills';
import { skillIds } from '../../types/skills';

const validSkillIds: ReadonlySet<string> = new Set(skillIds);

function isSkill(value: unknown): value is Skill {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    validSkillIds.has(candidate.id) &&
    typeof candidate.label === 'string' &&
    candidate.label.trim().length > 0 &&
    (candidate.href === undefined || typeof candidate.href === 'string')
  );
}

function parseSkills(value: unknown): Skill[] {
  if (!Array.isArray(value) || !value.every(isSkill)) {
    throw new Error(
      'Invalid skills.json: every skill must have a valid id, a non-empty label, and an optional string href.',
    );
  }

  const ids = value.map((skill) => skill.id);

  if (new Set(ids).size !== ids.length) {
    throw new Error('Invalid skills.json: skill IDs must be unique.');
  }

  return value;
}

const defaultSkills = parseSkills(importedSkills);

function oppositeDirection(direction: 'ltr' | 'rtl'): 'ltr' | 'rtl' {
  return direction === 'ltr' ? 'rtl' : 'ltr';
}

export default function Skills({
  title,
  subtitle,
  skills = defaultSkills,
  rows = 2,
  direction = 'ltr',
  speed = 45,
  pauseOnHover = true,
}: SkillsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, {
    once: false,
    rootMargin: '120px 0px',
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [hasEntered, setHasEntered] = useState(false);

  if (isInView && !hasEntered) {
    setHasEntered(true);
  }

  const firstRowSkills =
    rows === 2 ? skills.filter((_, index) => index % 2 === 0) : skills;

  const secondRowSkills = skills.filter((_, index) => index % 2 === 1);

  return (
    <section
      ref={sectionRef}
      className="skills-section"
      aria-labelledby="skills-heading"
      data-in-view={isInView}
      data-entered={hasEntered}
      data-reduced-motion={prefersReducedMotion}
      data-pause-on-hover={pauseOnHover}
    >
      <svg
        className="skills-svg-sprite"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id="skill-accent-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>

      <div className="skills-heading">
        <span className="skills-eyebrow">MY TOOLKIT</span>
        <h2 id="skills-heading" className="skills-title">
          {title}
        </h2>

        {subtitle && <p className="skills-subtitle">{subtitle}</p>}
      </div>

      <div className="skills-rows">
        <MarqueeTrack
          skills={firstRowSkills}
          direction={direction}
          speed={speed}
          rowIndex={0}
          reducedMotion={prefersReducedMotion}
        />

        {rows === 2 && secondRowSkills.length > 0 && (
          <MarqueeTrack
            skills={secondRowSkills}
            direction={oppositeDirection(direction)}
            speed={speed}
            rowIndex={1}
            reducedMotion={prefersReducedMotion}
          />
        )}
      </div>
    </section>
  );
}