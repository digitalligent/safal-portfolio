import type { SVGProps } from 'react';
import type { SkillIconMap, SkillId } from '../../types/skills';

const iconProps: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  focusable: 'false',
  'aria-hidden': true,
};

function HtmlIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m4 3 1.5 17L12 22l6.5-2L20 3H4Z" />
      <path d="M8 7h8l-.5 3.5H9l.5 3.5h5.5l-.5 4-2.5.8-2.5-.8-.2-2" />
    </svg>
  );
}

function CssIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m4 3 1.5 17L12 22l6.5-2L20 3H4Z" />
      <path d="M8 7h8l-.5 3.5H9l.3 3.5h5.4l-.4 4-2.3.8-2.5-.8-.2-2" />
    </svg>
  );
}

function JavascriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M11 8v8a2 2 0 0 1-4 0" />
      <path d="M17 10a2 2 0 0 0-3 1.7c0 2 4 1.1 4 3.3a2 2 0 0 1-4 1" />
    </svg>
  );
}

function TypescriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M6 9h7M9.5 9v9M15 12h3m-1.5 0v6m-1.5 0h3" />
    </svg>
  );
}

function ReactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ViteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m12 2 10 3-10 17L2 5l10-3Z" />
      <path d="m13 5-4 8h4l-2 6 6-9h-4l2-5" />
    </svg>
  );
}

function GitIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m12 3 9 9-9 9-9-9 9-9Z" />
      <path d="M9 8v8m0-4h6m0 0V8m0 4v4" />
      <circle cx="9" cy="8" r="1" fill="currentColor" />
      <circle cx="9" cy="16" r="1" fill="currentColor" />
      <circle cx="15" cy="8" r="1" fill="currentColor" />
      <circle cx="15" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M9 19c-4.5 1.4-4.5-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-1-2.6c3.3-.4 6.8-1.6 6.8-7.2a5.6 5.6 0 0 0-1.5-3.9 5.2 5.2 0 0 0-.1-3.9S18 0 15 2a13.3 13.3 0 0 0-6 0C6 0 3.8.5 3.8.5a5.2 5.2 0 0 0-.1 3.9 5.6 5.6 0 0 0-1.5 3.9c0 5.6 3.5 6.8 6.8 7.2a3.4 3.4 0 0 0-1 2.6V22" />
    </svg>
  );
}

function NodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z" />
      <path d="m8 9 4-2 4 2v6l-4 2-4-2V9Z" />
      <path d="m8 9 4 2 4-2m-4 2v6" />
    </svg>
  );
}

function ApiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M8 8 4 12l4 4m8-8 4 4-4 4m-2-11-4 14" />
    </svg>
  );
}

function ResponsiveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="4" width="13" height="16" rx="2" />
      <path d="M7 7h5M8 17h3" />
      <rect x="17" y="9" width="4" height="9" rx="1" />
      <path d="M18 11h2m-2 5h2" />
    </svg>
  );
}

function AccessibilityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="4" r="2" />
      <path d="M4 8h16M12 8v5m-4 8 4-8 4 8m-8-9-3 5m10-5 3 5" />
    </svg>
  );
}

function FigmaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 12a4 4 0 1 1 4-4h-4Z" />
      <path d="M8 4h4v8H8a4 4 0 0 1 0-8Z" />
      <path d="M8 12h4v4a4 4 0 1 1-4-4Z" />
      <circle cx="16" cy="12" r="4" />
      <circle cx="12" cy="20" r="0.5" />
    </svg>
  );
}

function ProblemSolvingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M9 18h6m-5 3h4m-2-19a7 7 0 0 0-4 12.7c.8.6 1 1.2 1 2.3h6c0-1.1.2-1.7 1-2.3A7 7 0 0 0 12 2Z" />
      <path d="m10 10 1.5 1.5L14 9" />
    </svg>
  );
}

export const skillIcons = {
  html: HtmlIcon,
  css: CssIcon,
  javascript: JavascriptIcon,
  typescript: TypescriptIcon,
  react: ReactIcon,
  vite: ViteIcon,
  git: GitIcon,
  github: GithubIcon,
  nodejs: NodeIcon,
  'rest-api': ApiIcon,
  'responsive-design': ResponsiveIcon,
  accessibility: AccessibilityIcon,
  figma: FigmaIcon,
  'problem-solving': ProblemSolvingIcon,
} satisfies SkillIconMap;

export const fallbackSkillIcon: SkillIconMap[SkillId] = ProblemSolvingIcon;