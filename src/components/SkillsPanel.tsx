import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillItem, SectionId } from '../types';
import { Layers, X, ArrowRight, CheckCircle2, Terminal } from 'lucide-react';
import { SoundEngine } from '../Experience/SoundEngine';

interface SkillsPanelProps {
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
}

type CategoryFilter = 'ALL' | 'LANGUAGE' | 'DATABASE' | 'WEB' | 'AI / ML' | 'TOOLS';

export const SkillsPanel: React.FC<SkillsPanelProps> = ({ onClose, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('ALL');
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILLS_DATA[0]);

  const categories: CategoryFilter[] = ['ALL', 'LANGUAGE', 'DATABASE', 'WEB', 'AI / ML', 'TOOLS'];

  const filteredSkills = selectedCategory === 'ALL'
    ? SKILLS_DATA
    : SKILLS_DATA.filter(s => s.category === selectedCategory);

  const handleSkillHover = (skill: SkillItem) => {
    setActiveSkill(skill);
    SoundEngine.getInstance().playHover();
  };

  return (
    <div
      id="skills-panel-container"
      className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in"
    >
      <div
        id="skills-panel"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl text-slate-100 font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-sky-400 border border-sky-900 bg-sky-950/40 px-2 py-0.5 rounded">
              02
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase font-mono">
                TECHNICAL SKILLS & FOUNDATIONS
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Categorized competencies without fabricated statistical percentages
              </p>
            </div>
          </div>

          <button
            id="skills-close-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6 font-mono text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`skill-filter-${cat}`}
                onClick={() => {
                  SoundEngine.getInstance().playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold'
                    : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Skills Matrix + Live Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Skills Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredSkills.map((skill) => {
              const isActive = activeSkill.name === skill.name;
              return (
                <div
                  key={skill.name}
                  id={`skill-card-${skill.name}`}
                  onMouseEnter={() => handleSkillHover(skill)}
                  onClick={() => handleSkillHover(skill)}
                  className={`p-3.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.15)]'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono font-bold text-sm text-white tracking-wide">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-sky-300">
                      {skill.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Dedicated Skill Inspection Panel */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-xl p-5 font-mono text-xs shadow-inner space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
              <span className="flex items-center space-x-1.5 text-sky-400">
                <Terminal size={14} />
                <span>SKILL_INSPECTOR</span>
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                {activeSkill.category}
              </span>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">
                COMPETENCY NAME
              </div>
              <div className="text-xl font-bold text-white tracking-wide font-sans">
                {activeSkill.name}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">
                ROLE CONTEXT & FUNCTION
              </div>
              <p className="text-sm text-slate-200 font-sans leading-relaxed bg-slate-950 p-3.5 rounded-lg border border-slate-800/80">
                &ldquo;{activeSkill.description}&rdquo;
              </p>
            </div>

            {activeSkill.tags && (
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">
                  VERIFIED APPLICATIONS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeSkill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-800/80 border border-slate-700/60 rounded text-[11px] text-slate-300"
                    >
                      <CheckCircle2 size={11} className="text-emerald-400" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Foundation Standard</span>
              <span className="text-sky-400">MCA Curriculum + Applied</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
          <button
            id="skills-nav-about-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('about');
            }}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← 01 ABOUT ME
          </button>

          <button
            id="skills-nav-projects-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('projects');
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold rounded transition-colors cursor-pointer"
          >
            <span>DISCOVER PROJECTS (03)</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
