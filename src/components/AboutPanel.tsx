import React from 'react';
import { PERSONAL_DATA } from '../data/portfolioData';
import {
  User,
  MapPin,
  GraduationCap,
  Code2,
  Sparkles,
  X,
  ArrowRight,
  CheckCircle2,
  FileBadge,
  School
} from 'lucide-react';
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
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in"
    >
      <div
        id="about-panel"
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-2xl text-slate-100 font-sans"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-sky-400 border border-sky-900 bg-sky-950/50 px-2.5 py-1 rounded">
              02
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase font-mono">
                ABOUT ME
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Software Developer Profile & Educational Background
              </p>
            </div>
          </div>

          <button
            id="about-close-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1.5 rounded-md hover:bg-slate-900 transition-colors cursor-pointer"
            title="Close Panel"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Card & Bio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-8">
          {/* Futuristic Developer ID Card */}
          <div className="md:col-span-5 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-sky-500/30 rounded-xl p-5 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between text-[10px] font-mono text-sky-400 border-b border-slate-800 pb-2 mb-4">
              <span>DEVELOPER_CREDENTIAL</span>
              <span className="text-emerald-400 font-semibold">[ VERIFIED ]</span>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-slate-800 border border-sky-400/40 flex items-center justify-center font-mono font-bold text-xl text-sky-400 shadow-inner shrink-0">
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
                <span className="text-slate-400">POSTGRAD</span>
                <span className="text-slate-200 font-medium">MCA • CUSAT</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">MCA CGPA</span>
                <span className="text-sky-400 font-bold">7.66 / 10 (First Class)</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">UNDERGRAD</span>
                <span className="text-slate-200 font-medium">BCA • Bharata Mata</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">TRAINING</span>
                <span className="text-emerald-400 font-medium">Softmedia Training</span>
              </div>
            </div>
          </div>

          {/* Bio & Details Column */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <User size={14} className="text-sky-400" />
                <span>PROFESSIONAL SUMMARY</span>
              </h4>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl">
                {PERSONAL_DATA.about.summary}
              </p>
            </div>

            {/* Key Information Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
                <div className="text-slate-400 text-[10px] flex items-center space-x-1 mb-1">
                  <Code2 size={12} className="text-sky-400" />
                  <span>ROLE & FOCUS</span>
                </div>
                <div className="text-slate-200 font-medium">{PERSONAL_DATA.about.role}</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
                <div className="text-slate-400 text-[10px] flex items-center space-x-1 mb-1">
                  <GraduationCap size={12} className="text-sky-400" />
                  <span>HIGHEST DEGREE</span>
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
                  <span>SPECIALIZATION</span>
                </div>
                <div className="text-slate-200 font-medium">Python, Machine Learning, Web</div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Journey Section */}
        <div className="border-t border-slate-800 pt-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-mono text-sky-400 uppercase tracking-wider flex items-center space-x-1.5">
              <School size={14} className="text-sky-400" />
              <span>ACADEMIC & TRAINING JOURNEY</span>
            </h4>
            <button
              onClick={() => {
                SoundEngine.getInstance().playClick();
                onNavigate('education');
              }}
              className="text-xs font-mono text-slate-400 hover:text-sky-400 flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <span>View Full 3D Timeline</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
            {/* MCA */}
            <div className="p-3.5 bg-slate-900/70 border border-sky-500/40 rounded-xl relative overflow-hidden">
              <div className="text-[10px] text-sky-400 font-bold mb-1 flex items-center justify-between">
                <span>MCA (POSTGRADUATE)</span>
                <span className="text-emerald-400">FIRST CLASS</span>
              </div>
              <div className="font-bold text-slate-100 text-sm font-sans mb-1">
                Cochin University (CUSAT)
              </div>
              <div className="text-slate-400 text-[11px]">CGPA: 7.66 / 10</div>
            </div>

            {/* BCA */}
            <div className="p-3.5 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div className="text-[10px] text-slate-400 font-bold mb-1 flex items-center justify-between">
                <span>BCA (UNDERGRADUATE)</span>
                <span className="text-slate-300">2019–2022</span>
              </div>
              <div className="font-bold text-slate-100 text-sm font-sans mb-1">
                Bharata Mata College
              </div>
              <div className="text-slate-400 text-[11px]">CCPA: 6.24 / 10 (B Class)</div>
            </div>

            {/* Plus Two */}
            <div className="p-3.5 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div className="text-[10px] text-slate-400 font-bold mb-1 flex items-center justify-between">
                <span>PLUS TWO (SCIENCE BIOLOGY)</span>
                <span className="text-slate-300">2017–2019</span>
              </div>
              <div className="font-bold text-slate-100 text-sm font-sans mb-1">
                Cardinal Higher Secondary
              </div>
              <div className="text-slate-400 text-[11px]">Thrikkakara, Ernakulam</div>
            </div>

            {/* 10th */}
            <div className="p-3.5 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div className="text-[10px] text-slate-400 font-bold mb-1 flex items-center justify-between">
                <span>HIGH SCHOOL / 10TH</span>
                <span className="text-slate-300">2012–2017</span>
              </div>
              <div className="font-bold text-slate-100 text-sm font-sans mb-1">
                St Alberts HS, Ernakulam
              </div>
              <div className="text-slate-400 text-[11px]">Secondary Education</div>
            </div>

            {/* Computer Training */}
            <div className="p-3.5 bg-slate-900/50 border border-emerald-500/30 rounded-xl sm:col-span-2">
              <div className="text-[10px] text-emerald-400 font-bold mb-1 flex items-center justify-between">
                <span>COMPUTER TRAINING & CERTIFICATIONS</span>
                <span className="text-emerald-400">3 DIPLOMAS</span>
              </div>
              <div className="font-bold text-slate-100 text-sm font-sans mb-1">
                Softmedia Computer Training
              </div>
              <div className="text-slate-400 text-[11px]">
                Web Designing (2019) • DTP (2018) • Computer Applications (2017)
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800 font-mono text-xs">
          <button
            id="about-explore-skills-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('skills');
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← 01 HOME
          </button>

          <div className="flex items-center space-x-2">
            <button
              id="about-explore-education-button"
              onClick={() => {
                SoundEngine.getInstance().playClick();
                onNavigate('education');
              }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <span>EDUCATION (04)</span>
              <ArrowRight size={14} />
            </button>

            <button
              id="about-explore-skills-next"
              onClick={() => {
                SoundEngine.getInstance().playClick();
                onNavigate('skills');
              }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
            >
              <span>SKILLS (03)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
