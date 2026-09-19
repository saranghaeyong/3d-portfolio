import React, { useState } from 'react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';
import {
  FileBadge,
  Building,
  Calendar,
  CheckCircle2,
  X,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Code,
  Layout,
  Cpu
} from 'lucide-react';
import { SoundEngine } from '../Experience/SoundEngine';
import { SectionId, CertificationItem } from '../types';

interface CertificationsPanelProps {
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
}

export const CertificationsPanel: React.FC<CertificationsPanelProps> = ({ onClose, onNavigate }) => {
  const [activeCertId, setActiveCertId] = useState<string>('cert-web');

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleResetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const getIconForCert = (id: string) => {
    switch (id) {
      case 'cert-web':
        return <Code size={20} className="text-sky-400" />;
      case 'cert-dtp':
        return <Layout size={20} className="text-emerald-400" />;
      case 'cert-dca':
      default:
        return <Cpu size={20} className="text-indigo-400" />;
    }
  };

  return (
    <div
      id="certifications-panel-container"
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in"
    >
      <div
        id="certifications-panel"
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-2xl text-slate-100 font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-emerald-400 border border-emerald-900 bg-emerald-950/50 px-2.5 py-1 rounded">
              05
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase font-mono">
                  COMPUTER TRAINING & CERTIFICATIONS
                </h2>
                <span className="hidden sm:inline-flex items-center text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-2 py-0.5 rounded">
                  <ShieldCheck size={11} className="mr-1" /> VERIFIED CREDENTIALS
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Professional Vocational & Software Certifications from Softmedia Computer Training
              </p>
            </div>
          </div>

          <button
            id="certifications-close-button"
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

        {/* Institution Overview Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 shrink-0">
              <FileBadge size={26} />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                TRAINING INSTITUTION
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Softmedia Computer Training
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Vocational Technical Training & Certified Software Foundations (2017–2019)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 bg-slate-950/80 border border-slate-800 px-3.5 py-2 rounded-lg self-start sm:self-auto">
            <Sparkles size={13} className="text-emerald-400" />
            <span>3 Certified Diplomas & Programs</span>
          </div>
        </div>

        {/* 3D Certificate Cards Grid / Timeline */}
        <div className="space-y-6 mb-8">
          {CERTIFICATIONS_DATA.map((cert: CertificationItem, idx: number) => {
            const isSelected = activeCertId === cert.id;

            return (
              <div
                key={cert.id}
                id={`cert-card-${cert.id}`}
                onMouseMove={handleTilt}
                onMouseLeave={handleResetTilt}
                onClick={() => {
                  SoundEngine.getInstance().playClick();
                  setActiveCertId(cert.id);
                }}
                className={`relative rounded-xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900/80 border-emerald-500/50 shadow-xl shadow-emerald-950/20'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.15s ease-out, border-color 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Ambient glow accent */}
                <div className="absolute top-0 right-0 w-48 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                {/* Top metadata bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/80 font-mono text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                      {cert.credentialType}
                    </span>
                    <span className="text-slate-400">CREDENTIAL 0{idx + 1}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-300">
                    <Calendar size={13} className="text-emerald-400" />
                    <span className="font-bold">YEAR: {cert.year}</span>
                    <span className="flex items-center space-x-1 text-emerald-400 text-[10px] bg-emerald-950/40 border border-emerald-800/80 px-2 py-0.5 rounded">
                      <CheckCircle2 size={11} />
                      <span>OFFICIALLY CONFERRED</span>
                    </span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex items-start space-x-3.5 mb-3">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                    {getIconForCert(cert.id)}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-sans">
                      {cert.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-300 font-medium mt-1">
                      <Building size={14} className="text-emerald-400 shrink-0" />
                      <span>{cert.institution}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 border border-slate-800/70 p-3.5 rounded-lg mb-3">
                  {cert.shortDescription}
                </p>

                {/* Competencies */}
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                  {cert.competencies.map((comp, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center space-x-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{comp}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800 font-mono text-xs">
          <button
            id="certifications-nav-education-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('education');
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← 04 EDUCATION
          </button>

          <button
            id="certifications-nav-projects-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('projects');
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded transition-colors cursor-pointer"
          >
            <span>NEXT: PROJECTS (06)</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
