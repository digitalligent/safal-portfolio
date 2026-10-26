
import type { SocialLinks as SocialLinksData } from "../types";

interface SocialLinksProps {
  links: SocialLinksData;
  className?: string;
}

const socialIcons: Record<keyof SocialLinksData, string> = {
  instagram:
    "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z",
  linkedin:
    "M5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3V9Zm6 0h4v1.7c.6-1.1 1.7-2 3.6-2 3.2 0 4.4 2 4.4 5.3V21h-4v-6.2c0-1.7-.4-2.8-2-2.8s-2 1.2-2 2.8V21H9V9Z",
  dribbble:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 8.2a16 16 0 0 0-4.5-.1 23 23 0 0 0-1-2.1 16 16 0 0 0 3.1-2.4 8 8 0 0 1 2.4 4.6ZM12 4a8 8 0 0 1 3.1.6 14 14 0 0 1-2.6 2 30 30 0 0 0-2.1-3.1A8 8 0 0 1 12 4ZM8.3 4.9a26 26 0 0 1 2.4 3.2 28 28 0 0 1-5.9.8 8 8 0 0 1 3.5-4ZM4 12v-.1a29 29 0 0 0 7.7-1.1l.6 1.3a13 13 0 0 0-6.7 5.2A8 8 0 0 1 4 12Zm8 8a8 8 0 0 1-4.7-1.5 11 11 0 0 1 5.8-4.6 24 24 0 0 1 1.3 5.8A8 8 0 0 1 12 20Zm4.4-1.7a26 26 0 0 0-1.2-5.1 13 13 0 0 1 4 .2 8 8 0 0 1-2.8 4.9Z",
  behance:
    "M3 5h8a4 4 0 0 1 2.5 7.1A4.5 4.5 0 0 1 10 20H3V5Zm4 3v3h3a1.5 1.5 0 0 0 0-3H7Zm0 6v3h3a1.5 1.5 0 0 0 0-3H7Zm8-8h6v2h-6V6Zm-.5 8a4.5 4.5 0 0 1 9 0v1h-6a2 2 0 0 0 3.6 1h2.1a4.5 4.5 0 0 1-8.7-2Zm3-1a1.5 1.5 0 0 0-1.4 1h2.8a1.5 1.5 0 0 0-1.4-1Z",
  github:
    "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.3-4.5-1.1-4.5-5A3.9 3.9 0 0 1 6.7 8.8c-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.8 1a9.7 9.7 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.3 4.7-4.5 5 .4.3.7.9.7 1.8V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z",
  x:
    "M18.9 2H22l-6.8 7.8L23 22h-6.2L12 14.6 5.5 22H2.4l7.3-8.4L2 2h6.4l4.4 6.9L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z",
  pinterest:
    "M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.8.2-2.7l1.3-5.5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.4-.3 1 .5 1.8 1.5 1.8 1.8 0 3-2.3 3-5.1 0-2.1-1.4-3.7-4-3.7-2.9 0-4.7 2.2-4.7 4.6 0 .8.2 1.5.6 2 .2.2.2.3.1.6l-.2.8c-.1.3-.3.4-.6.3-1.3-.5-1.9-1.9-1.9-3.5 0-2.6 2.2-5.8 6.7-5.8 3.6 0 6 2.6 6 5.4 0 3.7-2 6.5-5 6.5-1 0-2-.6-2.4-1.2l-.7 2.7c-.2 1-.8 1.9-1.2 2.6A10 10 0 1 0 12 2Z",
};

const socialLabels: Record<keyof SocialLinksData, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  dribbble: "Dribbble",
  behance: "Behance",
  github: "GitHub",
  x: "X",
  pinterest: "Pinterest",
};

function SocialLinks({
  links,
  className = "",
}: SocialLinksProps) {
  return (
    <div className={`social-links ${className}`.trim()}>
      {(Object.keys(socialIcons) as Array<keyof SocialLinksData>)
        .filter((platform) => Boolean(links[platform]))
        .map((platform) => (
          <a
            key={platform}
            href={links[platform]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${socialLabels[platform]} profile`}
            title={socialLabels[platform]}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={socialIcons[platform]} />
            </svg>
          </a>
        ))}
    </div>
  );
}

export default SocialLinks;
