export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
  twitter?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    icon?: string;
    level?: string; // e.g., 'Primary', 'Exploring', 'Intermediate'
    color?: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  coverImage: string;
  screenshots?: string[];
  githubUrl?: string;
  demoUrl?: string;
  status: 'Completed' | 'In Development' | 'Prototype' | 'Featured';
  isFeatured: boolean;
  highlights?: string[];
  category?: 'Web App' | 'AI / Civic Tech' | 'System / Education' | 'Creative';
}

export interface JourneyMilestone {
  id: string;
  year: string;
  period?: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'education' | 'project' | 'hackathon' | 'milestone';
  icon?: string;
}

export interface PortfolioConfig {
  personal: {
    name: string;
    givenName: string;
    surName: string;
    tagline: string;
    roleTitles: string[];
    shortBio: string;
    detailedBio: {
      paragraphs: string[];
      currentFocus: string;
      quote: string;
      interests: { title: string; desc: string; icon: string }[];
    };
    location: string;
    avatarUrl: string;
    social: SocialLinks;
  };
  skills: SkillCategory[];
  projects: ProjectItem[];
  journey: JourneyMilestone[];
  creativeLab: {
    title: string;
    subtitle: string;
    description: string;
    experiments: {
      id: string;
      title: string;
      category: 'Sketch' | 'Photography' | 'Interactive Code' | 'Lightroom Edit';
      image: string;
      description: string;
      tags: string[];
    }[];
  };
}
