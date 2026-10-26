import { memo } from 'react';
import type { CSSProperties } from 'react';
import type { SkillChipProps } from '../../types/skills';
import { fallbackSkillIcon, skillIcons } from './icons';

function SkillChipComponent({ skill, index }: SkillChipProps) {
  const Icon = skillIcons[skill.id] ?? fallbackSkillIcon;

  const style = {
    '--i': index,
  } as CSSProperties;

  const content = (
    <>
      <Icon className="skill-chip__icon" />
      <span className="skill-chip__label">{skill.label}</span>
    </>
  );

  if (skill.href) {
    return (
      <a
        className="skill-chip"
        href={skill.href}
        style={style}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="skill-chip" style={style}>
      {content}
    </div>
  );
}

export const SkillChip = memo(SkillChipComponent);