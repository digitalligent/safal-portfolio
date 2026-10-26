import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { MarqueeDirection, Skill } from '../../types/skills';
import { SkillChip } from './SkillChip';

interface MarqueeTrackProps {
  skills: Skill[];
  direction: MarqueeDirection;
  speed: number;
  rowIndex: 0 | 1;
  reducedMotion: boolean;
}

interface MarqueeStyle extends CSSProperties {
  '--marquee-duration': string;
  '--marquee-animation-direction': 'normal' | 'reverse';
}

export function MarqueeTrack({
  skills,
  direction,
  speed,
  rowIndex,
  reducedMotion,
}: MarqueeTrackProps) {
  const copyRef = useRef<HTMLUListElement | null>(null);
  const [copyWidth, setCopyWidth] = useState(0);

  useEffect(() => {
    const element = copyRef.current;

    if (!element || reducedMotion || typeof ResizeObserver === 'undefined') {
      if (reducedMotion) {
        setCopyWidth(0);
      }
      return;
    }

    const updateWidth = () => {
      const width = element.getBoundingClientRect().width;
      setCopyWidth((previous) =>
        Math.abs(previous - width) > 0.5 ? width : previous,
      );
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [reducedMotion, skills]);

  const safeSpeed = Number.isFinite(speed) && speed > 0 ? speed : 45;
  const durationSeconds =
    copyWidth > 0 ? copyWidth / safeSpeed : 30;

  const rowDuration = durationSeconds * (rowIndex === 1 ? 1.25 : 1);
  const style: MarqueeStyle = {
    '--marquee-duration': `${rowDuration}s`,
    '--marquee-animation-direction':
      direction === 'rtl' ? 'reverse' : 'normal',
  };

  const renderSkills = (copyIndex: 0 | 1) =>
    skills.map((skill, index) => (
      <li className="marquee-copy__item" key={`${copyIndex}-${skill.id}`}>
        <SkillChip skill={skill} index={index} />
      </li>
    ));

  return (
    <div
      className={`skills-marquee ${reducedMotion ? 'skills-marquee--static' : ''}`}
      data-direction={direction}
      data-row={rowIndex}
    >
      <div
        className="marquee-viewport"
        aria-label={reducedMotion ? 'Skills' : undefined}
      >
        <div
          className="marquee-track"
          style={style}
          data-animated={!reducedMotion}
        >
          <ul
            className="marquee-copy"
            role="list"
            ref={copyRef}
          >
            {renderSkills(0)}
          </ul>

          {!reducedMotion && (
            <ul
              className="marquee-copy marquee-copy--duplicate"
              role="list"
              aria-hidden="true"
              inert
            >
              {renderSkills(1)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}