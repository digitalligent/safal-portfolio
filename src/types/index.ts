
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SocialLinks {
  instagram: string;
  linkedin: string;
  dribbble: string;
  behance: string;
  github: string;
  x: string;
  pinterest: string;
}

export interface Profile {
  name: string;
  firstName: string;
  professionalTitle: string;
  greeting: string;
  intro: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  cvPath: string;
  portraitPath: string;
  stats: Stat[];
  socialLinks: SocialLinks;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: string;
  tools: string[];
  link: string;
  linkText: string;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
}
