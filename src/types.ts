export type SectionId = 'intro' | 'about' | 'skills' | 'projects' | 'education' | 'resume' | 'contact';

export type QualityLevel = 'low' | 'medium' | 'high';

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
