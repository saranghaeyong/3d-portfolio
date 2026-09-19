export type SectionId =
  | 'intro'
  | 'about'
  | 'skills'
  | 'education'
  | 'certifications'
  | 'projects'
  | 'resume'
  | 'contact';

export type QualityLevel = 'low' | 'medium' | 'high';

export type ThemeMode = 'dark' | 'light';

export interface EducationItem {
  id: string;
  order: number;
  qualification: string;
  degreeCode: string;
  stream?: string;
  institution: string;
  duration?: string;
  year?: string;
  score?: string;
  scoreType?: 'CGPA' | 'CCPA';
  classification?: string;
  isHighest?: boolean;
  shortDescription: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  credentialType: string;
  institution: string;
  year: string;
  shortDescription: string;
  competencies: string[];
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  problem: string;
  approach: string;
  result: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface SkillItem {
  name: string;
  category: 'LANGUAGE' | 'DATABASE' | 'WEB' | 'AI / ML' | 'TOOLS';
  description: string;
  tags?: string[];
}

export interface NavStation {
  id: SectionId;
  number: string;
  label: string;
  objectName: string;
}

export interface TerminalCommandOutput {
  command: string;
  output: string | string[];
  isError?: boolean;
}
