import React from 'react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { GraduationCap, Award, Building, BookOpen, CheckCircle, X, ArrowRight } from 'lucide-react';
import { SoundEngine } from '../Experience/SoundEngine';
import { SectionId } from '../types';

interface EducationPanelProps {
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
}

export const EducationPanel: React.FC<EducationPanelProps> = ({ onClose, onNavigate }) => {
  return (
    <div
      id="education-panel-container"
      className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in"
    >
      <div
        id="education-panel"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl text-slate-100 font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-sky-400 border border-sky-900 bg-sky-950/40 px-2 py-0.5 rounded">
              04
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase font-mono">
                ACADEMIC QUALIFICATION
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Official Degree & University Credentials
              </p>
            </div>
          </div>

          <button
            id="education-close-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Certificate / Academic Document Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-xl mb-6">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Verification Badge */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6 font-mono text-xs">
            <div className="flex items-center space-x-2 text-sky-400">
              <GraduationCap size={16} />
              <span>OFFICIAL_DEGREE_RECORD</span>
            </div>
            <div className="flex items-center space-x-1 text-emerald-400 font-semibold">
              <CheckCircle size={14} />
              <span>FIRST CLASS</span>
            </div>
          </div>

          {/* Degree Title */}
          <div className="mb-6">
            <div className="text-xs font-mono text-sky-400 uppercase tracking-wider mb-1">
              POSTGRADUATE DEGREE
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              {PERSONAL_DATA.education.degree}
            </h3>
          </div>

          {/* University Name */}
          <div className="flex items-start space-x-3 mb-6 p-4 bg-slate-950/80 border border-slate-800 rounded-lg">
            <Building size={20} className="text-sky-400 mt-1 shrink-0" />
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">INSTITUTION / UNIVERSITY</div>
              <div className="text-base sm:text-lg font-semibold text-slate-100">
                {PERSONAL_DATA.education.institution}
              </div>
              <div className="text-xs font-mono text-slate-400 mt-0.5">
                Kochi, Kerala, India
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 font-mono">
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4">
              <div className="text-slate-400 text-xs mb-1 flex items-center space-x-1.5">
                <Award size={14} className="text-sky-400" />
                <span>CUMULATIVE GRADE POINT AVERAGE</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-sky-400">
                {PERSONAL_DATA.education.cgpa}
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4">
              <div className="text-slate-400 text-xs mb-1 flex items-center space-x-1.5">
                <CheckCircle size={14} className="text-emerald-400" />
                <span>ACADEMIC CLASSIFICATION</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
                {PERSONAL_DATA.education.classification}
              </div>
            </div>
          </div>

          {/* Curriculum Scope */}
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <BookOpen size={14} className="text-sky-400" />
              <span>ACADEMIC FOUNDATION & FOCUS AREAS</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/80 border border-slate-800 p-4 rounded-lg">
              {PERSONAL_DATA.education.details}
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            id="education-nav-projects-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('projects');
            }}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← 03 PROJECTS
          </button>

          <button
            id="education-nav-resume-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('resume');
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold rounded transition-colors cursor-pointer"
          >
            <span>INSPECT DIGITAL RESUME (05)</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
