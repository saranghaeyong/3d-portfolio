import React from 'react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { User, MapPin, GraduationCap, Code2, Sparkles, X, ArrowRight } from 'lucide-react';
import { SoundEngine } from '../Experience/SoundEngine';
import { SectionId } from '../types';

interface AboutPanelProps {
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
}

export const AboutPanel: React.FC<AboutPanelProps> = ({ onClose, onNavigate }) => {
  return (
    <div
      id="about-panel-container"
      className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in"
    >
      <div
        id="about-panel"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl text-slate-100 font-sans"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-sky-400 border border-sky-900 bg-sky-950/40 px-2 py-0.5 rounded">
              01
            </span>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase font-mono">
              ABOUT ME
            </h2>
          </div>

          <button
            id="about-close-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Card & Bio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Futuristic Developer ID Card */}
          <div className="md:col-span-5 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-sky-500/30 rounded-lg p-5 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between text-[10px] font-mono text-sky-400 border-b border-slate-800 pb-2 mb-4">
              <span>DEVELOPER_CREDENTIAL</span>
              <span className="text-emerald-400 font-semibold">[ VERIFIED ]</span>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 rounded-lg bg-slate-800 border border-sky-400/40 flex items-center justify-center font-mono font-bold text-xl text-sky-400 shadow-inner">
                SR
              </div>
              <div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {PERSONAL_DATA.name}
                </h3>
                <p className="text-xs font-mono text-sky-400 font-semibold">
                  {PERSONAL_DATA.primaryTitle}
                </p>
                <p className="text-[10px] font-mono text-slate-400">
                  {PERSONAL_DATA.secondaryTitle}
                </p>
              </div>
            </div>

            {/* Credential Metrics */}
            <div className="space-y-2 border-t border-slate-800/80 pt-3 text-xs font-mono">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">INSTITUTION</span>
                <span className="text-slate-200 font-medium">CUSAT</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">CGPA</span>
                <span className="text-sky-400 font-bold">7.66 / 10</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">CLASSIFICATION</span>
                <span className="text-emerald-400 font-semibold">FIRST CLASS</span>
              </div>
            </div>
          </div>

          {/* Bio & Details Column */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <User size={14} className="text-sky-400" />
                <span>PROFESSIONAL INTRODUCTION</span>
              </h4>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {PERSONAL_DATA.about.summary}
              </p>
            </div>

            {/* Key Information Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
                <div className="text-slate-400 text-[10px] flex items-center space-x-1 mb-1">
                  <Code2 size={12} className="text-sky-400" />
                  <span>ROLE</span>
                </div>
                <div className="text-slate-200 font-medium">{PERSONAL_DATA.about.role}</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
                <div className="text-slate-400 text-[10px] flex items-center space-x-1 mb-1">
                  <GraduationCap size={12} className="text-sky-400" />
                  <span>EDUCATION</span>
                </div>
                <div className="text-slate-200 font-medium">{PERSONAL_DATA.about.education}</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
                <div className="text-slate-400 text-[10px] flex items-center space-x-1 mb-1">
                  <MapPin size={12} className="text-sky-400" />
                  <span>LOCATION</span>
                </div>
                <div className="text-slate-200 font-medium">{PERSONAL_DATA.about.location}</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
                <div className="text-slate-400 text-[10px] flex items-center space-x-1 mb-1">
                  <Sparkles size={12} className="text-sky-400" />
                  <span>FOCUS</span>
                </div>
                <div className="text-slate-200 font-medium">Software Dev, Python, ML</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
              <button
                id="about-explore-skills-button"
                onClick={() => {
                  SoundEngine.getInstance().playClick();
                  onNavigate('skills');
                }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold rounded transition-colors cursor-pointer"
              >
                <span>EXPLORE SKILLS (02)</span>
                <ArrowRight size={14} />
              </button>

              <button
                id="about-explore-projects-button"
                onClick={() => {
                  SoundEngine.getInstance().playClick();
                  onNavigate('projects');
                }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-semibold rounded transition-colors cursor-pointer"
              >
                <span>VIEW PROJECTS (03)</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
