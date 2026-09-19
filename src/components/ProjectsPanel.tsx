import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem, SectionId } from '../types';
import { FolderGit2, X, ArrowRight, CheckCircle2, Terminal, Code2 } from 'lucide-react';
import { SoundEngine } from '../Experience/SoundEngine';

interface ProjectsPanelProps {
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
  initialProjectId?: string;
}

export const ProjectsPanel: React.FC<ProjectsPanelProps> = ({
  onClose,
  onNavigate,
  initialProjectId
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(() => {
    if (initialProjectId) {
      const found = PROJECTS_DATA.find(p => p.id === initialProjectId);
      if (found) return found;
    }
    return PROJECTS_DATA[0];
  });

  const handleSelect = (project: ProjectItem) => {
    SoundEngine.getInstance().playClick();
    setSelectedProject(project);
  };

  return (
    <div
      id="projects-panel-container"
      className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in"
    >
      <div
        id="projects-panel"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl text-slate-100 font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-sky-400 border border-sky-900 bg-sky-950/40 px-2 py-0.5 rounded">
              03
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase font-mono">
                ACADEMIC & TECHNICAL PROJECTS
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Detailed case studies from verified MCA academic and applied implementations
              </p>
            </div>
          </div>

          <button
            id="projects-close-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Project Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 font-mono text-xs">
          {PROJECTS_DATA.map((proj) => {
            const isSelected = selectedProject.id === proj.id;
            return (
              <button
                key={proj.id}
                id={`project-tab-${proj.id}`}
                onClick={() => handleSelect(proj)}
                className={`p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.15)]'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] text-sky-400 font-bold mb-1">{proj.number}</div>
                <div className="text-white font-semibold line-clamp-1">{proj.title}</div>
              </button>
            );
          })}
        </div>

        {/* Cinematic Case Study Deep Dive */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
          {/* Project Title and Overview */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-sky-950/60 border border-sky-800/60 text-sky-300 rounded">
                {selectedProject.number}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {selectedProject.subtitle}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
              {selectedProject.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedProject.description}
            </p>
          </div>

          {/* Technology Tags */}
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Code2 size={13} className="text-sky-400" />
              <span>TECHNOLOGIES USED</span>
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {selectedProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-md text-sky-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Problem & Approach Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* The Problem */}
            <div className="bg-slate-950/70 border border-slate-800/90 rounded-lg p-4">
              <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-wide mb-2 flex items-center space-x-1.5">
                <Terminal size={14} />
                <span>PROBLEM STATEMENT</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedProject.problem}
              </p>
            </div>

            {/* The Approach */}
            <div className="bg-slate-950/70 border border-slate-800/90 rounded-lg p-4">
              <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wide mb-2 flex items-center space-x-1.5">
                <FolderGit2 size={14} />
                <span>TECHNICAL APPROACH</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedProject.approach}
              </p>
            </div>
          </div>

          {/* Result & Evaluation */}
          <div className="bg-slate-950/70 border border-emerald-900/30 rounded-lg p-4">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide mb-2 flex items-center space-x-1.5">
              <CheckCircle2 size={14} />
              <span>RESULT & OUTCOME</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedProject.result}
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
          <button
            id="projects-nav-skills-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('skills');
            }}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← 02 SKILLS
          </button>

          <button
            id="projects-nav-education-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('education');
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold rounded transition-colors cursor-pointer"
          >
            <span>VIEW EDUCATION (04)</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
