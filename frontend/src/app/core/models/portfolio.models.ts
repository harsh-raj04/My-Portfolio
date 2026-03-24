export interface AboutCard {
  title: string;
  icon: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface HeroTech {
  label: string;
  color: string;
  position: string;
  delay: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectGalleryItem {
  type: 'screenshot' | 'diagram';
  label: string;
  image: string;
}

export interface Project {
  _id?: string;
  slug: string;
  title: string;
  summary: string;
  metric: ProjectMetric;
  previewImage: string;
  architectureImage: string;
  techStack: string[];
  categories: string[];
  highlights: string[];
  features: string[];
  gallery: ProjectGalleryItem[];
  githubUrl: string;
  order: number;
}

export interface Skill {
  _id?: string;
  category: string;
  name: string;
  iconKey: string;
  level: number;
  accent: string;
  description: string;
  order: number;
}

export interface EducationEntry {
  _id?: string;
  period: string;
  institution: string;
  program: string;
  scoreLabel: string;
  scoreValue: string;
  location: string;
  order: number;
}

export interface Certificate {
  _id?: string;
  title: string;
  issuer: string;
  logo: string;
  previewImage?: string;
  credentialUrl: string;
  order: number;
}

export interface PortfolioContent {
  hero: {
    name: string;
    tagline: string;
    intro: string;
    profileImage: string;
    cvUrl: string;
    links: SocialLink[];
    techStack: HeroTech[];
  };
  aboutCards: AboutCard[];
  contactLinks: SocialLink[];
  contributionGraph: number[][];
}
