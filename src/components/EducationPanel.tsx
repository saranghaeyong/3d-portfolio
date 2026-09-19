import React, { useState } from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import {
  GraduationCap,
  Award,
  Building,
  CheckCircle,
  X,
  ArrowRight,
  Sparkles,
  ArrowDown,
  ArrowUp,
  Calendar,
  Layers,
  FileBadge
} from 'lucide-react';
import { SoundEngine } from '../Experience/SoundEngine';
import { SectionId, EducationItem } from '../types';

interface EducationPanelProps {
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
}

export const EducationPanel: React.FC<EducationPanelProps> = ({ onClose, onNavigate }) => {
  // Chronological (10th -> Plus Two -> BCA -> MCA) vs Latest First (MCA -> BCA -> Plus Two -> 10th)
  const [isChronological, setIsChronological] = useState<boolean>(true);
  const [activeCardId, setActiveCardId] = useState<string>('edu-mca');

  // Sorted items based on order
  const displayItems = isChronological
    ? [...EDUCATION_DATA].sort((a, b) => a.order - b.order) // 10th -> Plus Two -> BCA -> MCA
    : [...EDUCATION_DATA].sort((a, b) => b.order - a.order); // MCA -> BCA -> Plus Two -> 10th

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleResetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      id="education-panel-container"
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in"
    >
      <div
        id="education-panel"
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-2xl text-slate-100 font-sans"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-sky-400 border border-sky-900 bg-sky-950/50 px-2.5 py-1 rounded">
              04
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase font-mono">
                  EDUCATION TIMELINE
                </h2>
                <span className="hidden sm:inline-flex items-center text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-2 py-0.5 rounded">
                  <Sparkles size={11} className="mr-1" /> VERIFIED ACADEMIC RECORD
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Chronological Academic Milestones: 10th → Plus Two → BCA → MCA
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Order Toggle */}
            <button
              id="education-order-toggle"
              onClick={() => {
                SoundEngine.getInstance().playClick();
                setIsChronological(!isChronological);
              }}
              className="hidden md:flex items-center space-x-1.5 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded transition-colors cursor-pointer"
            >
              {isChronological ? <ArrowUp size={13} className="text-sky-400" /> : <ArrowDown size={13} className="text-sky-400" />}
              <span>{isChronological ? 'JOURNEY (10TH → MCA)' : 'NEWEST FIRST (MCA → 10TH)'}</span>
            </button>

            <button
              id="education-close-button"
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
        </div>

        {/* Highest Qualification Highlight Banner (MCA) */}
        <div className="relative overflow-hidden rounded-xl border-2 border-sky-500/30 bg-gradient-to-r from-sky-950/40 via-slate-900/60 to-slate-950 p-4 sm:p-5 mb-8 shadow-lg shadow-sky-500/5">
          <div className="absolute top-0 right-0 w-64 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="p-3 bg-sky-500/20 border border-sky-400/40 rounded-xl text-sky-400 shrink-0">
                <GraduationCap size={28} />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-sky-500 text-slate-950">
                    HIGHEST QUALIFICATION
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center">
                    <CheckCircle size={12} className="mr-1" /> FIRST CLASS
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Master of Computer Applications (MCA)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                  Cochin University of Science and Technology (CUSAT)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 font-mono bg-slate-950/90 border border-slate-800 rounded-lg p-3 self-start md:self-auto">
              <div>
                <div className="text-[10px] text-slate-400 uppercase">CUMULATIVE CGPA</div>
                <div className="text-xl sm:text-2xl font-bold text-sky-400">7.66 / 10</div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase">CLASSIFICATION</div>
                <div className="text-xs sm:text-sm font-bold text-emerald-400">FIRST CLASS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Progression Indicator */}
        <div className="hidden sm:flex items-center justify-between px-4 py-2.5 mb-6 bg-slate-900/50 border border-slate-800/80 rounded-lg text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Progression Path:</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300 font-semibold">
            <span className="text-slate-400">10th</span>
            <span className="text-sky-500">→</span>
            <span className="text-slate-400">Plus Two (Science Biology)</span>
            <span className="text-sky-500">→</span>
            <span className="text-slate-400">BCA</span>
            <span className="text-sky-500">→</span>
            <span className="text-sky-400 font-bold">MCA (CUSAT)</span>
          </div>
        </div>

        {/* 3D Interactive Timeline Cards */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-6 sm:space-y-8 my-6">
          {displayItems.map((item: EducationItem, idx: number) => {
            const isHighest = item.isHighest;
            const isSelected = activeCardId === item.id;

            return (
              <div
                key={item.id}
                id={`education-card-${item.id}`}
                className="relative group transition-all duration-300"
                onClick={() => {
                  SoundEngine.getInstance().playClick();
                  setActiveCardId(item.id);
                }}
              >
                {/* Timeline Node Icon */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isHighest
                      ? 'bg-sky-500 border-sky-400 text-slate-950 shadow-md shadow-sky-500/50 ring-4 ring-sky-500/20'
                      : isSelected
                      ? 'bg-slate-900 border-sky-400 text-sky-400 ring-2 ring-sky-500/30'
                      : 'bg-slate-950 border-slate-700 text-slate-400 group-hover:border-sky-500 group-hover:text-sky-400'
                  }`}
                >
                  <GraduationCap size={isHighest ? 16 : 14} />
                </div>

                {/* Card Container with 3D Depth on Hover */}
                <div
                  onMouseMove={handleTilt}
                  onMouseLeave={handleResetTilt}
                  className={`relative rounded-xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer ${
                    isHighest
                      ? 'bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 border-sky-500/40 shadow-xl shadow-sky-950/30'
                      : isSelected
                      ? 'bg-slate-900/70 border-slate-700 shadow-lg'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.15s ease-out, border-color 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  {/* Top Bar: Order & Year */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/70 font-mono text-xs">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          isHighest
                            ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        STAGE 0{item.order} • {item.degreeCode}
                      </span>
                      {item.stream && (
                        <span className="text-slate-400">Stream: <strong className="text-slate-200">{item.stream}</strong></span>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 text-slate-400">
                      {item.duration && (
                        <span className="flex items-center space-x-1">
                          <Calendar size={13} className="text-slate-500" />
                          <span>{item.duration}</span>
                        </span>
                      )}
                      {isHighest && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          HIGHEST
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Qualification & Institution */}
                  <div className="mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-sans">
                      {item.qualification}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-slate-300 font-medium mt-1">
                      <Building size={15} className="text-sky-400 shrink-0" />
                      <span>{item.institution}</span>
                    </div>
                  </div>

                  {/* Grades / Results Display when available */}
                  {(item.score || item.classification) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 font-mono">
                      {item.score && (
                        <div className="bg-slate-950 border border-slate-800/90 rounded-lg p-3">
                          <div className="text-[10px] text-slate-400 uppercase flex items-center space-x-1">
                            <Award size={12} className="text-sky-400" />
                            <span>{item.scoreType || 'GRADE / SCORE'}</span>
                          </div>
                          <div className="text-lg sm:text-xl font-bold text-sky-400 mt-0.5">
                            {item.score}
                          </div>
                        </div>
                      )}
                      {item.classification && (
                        <div className="bg-slate-950 border border-slate-800/90 rounded-lg p-3">
                          <div className="text-[10px] text-slate-400 uppercase flex items-center space-x-1">
                            <CheckCircle size={12} className="text-emerald-400" />
                            <span>CLASSIFICATION / CLASS</span>
                          </div>
                          <div className="text-lg sm:text-xl font-bold text-emerald-400 mt-0.5">
                            {item.classification}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/50 border border-slate-800/60 p-3.5 rounded-lg mb-3">
                    {item.shortDescription}
                  </p>

                  {/* Highlights pills */}
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                    {item.highlights.map((hl, hIdx) => (
                      <span
                        key={hIdx}
                        className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Link to Computer Training & Certifications */}
        <div className="mt-8 p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg">
              <FileBadge size={22} />
            </div>
            <div>
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase">
                PROFESSIONAL SKILLS TIMELINE
              </div>
              <div className="text-sm font-bold text-white">
                Computer Training & Certifications (Softmedia)
              </div>
              <div className="text-xs text-slate-400">
                Web Designing (2019) • DTP (2018) • Computer Applications (2017)
              </div>
            </div>
          </div>

          <button
            id="education-view-certs-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('certifications');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            <span>INSPECT CERTIFICATIONS</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800 font-mono text-xs">
          <button
            id="education-nav-skills-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('skills');
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← 03 SKILLS
          </button>

          <button
            id="education-nav-resume-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('certifications');
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded transition-colors cursor-pointer"
          >
            <span>NEXT: CERTIFICATIONS (05)</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
