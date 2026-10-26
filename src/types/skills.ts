import type { FC, SVGProps } from 'react';

export const skillIds = [
  'html',
  'css',
  'javascript',
  'typescript',
  'react',
  'vite',
  'git',
  'github',
  'nodejs',
  'rest-api',
  'responsive-design',
  'accessibility',
  'figma',
  'problem-solving',
] as const;

export type SkillId = (typeof skillIds)[number];

export interface Skill {
  id: SkillId;
  label: string;
  href?: string;
}

export type SkillIcon = FC<SVGProps<SVGSVGElement>>;

export type SkillIconMap = Record<SkillId, SkillIcon>;

export type MarqueeDirection = 'ltr' | 'rtl';

export interface SkillsProps {
  title: string;
  subtitle?: string;
  skills?: Skill[];
  rows?: 1 | 2;
  direction?: MarqueeDirection;
  speed?: number;
  pauseOnHover?: boolean;
}

export interface SkillChipProps {
  skill: Skill;
  index: number;
}