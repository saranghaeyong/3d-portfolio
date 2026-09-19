import React, { useState } from 'react';
import { PERSONAL_DATA, SKILLS_DATA, PROJECTS_DATA } from '../data/portfolioData';
import { Printer, Copy, Check, Mail, Phone, MapPin, X, ArrowRight, Download } from 'lucide-react';
import { SoundEngine } from '../Experience/SoundEngine';
import { SectionId } from '../types';

interface ResumeModalProps {
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ onClose, onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    SoundEngine.getInstance().playClick();
    const resumeText = `
${PERSONAL_DATA.name}
${PERSONAL_DATA.primaryTitle}
${PERSONAL_DATA.secondaryTitle}

Contact:
Email: ${PERSONAL_DATA.email}
Phone: ${PERSONAL_DATA.phone}
Location: ${PERSONAL_DATA.location}

Professional Summary:
${PERSONAL_DATA.resumeSummary}

Education:
${PERSONAL_DATA.education.degree}
${PERSONAL_DATA.education.institution}
CGPA: ${PERSONAL_DATA.education.cgpa} (${PERSONAL_DATA.education.classification})

Technical Competencies:
- Languages: Python, Java, C
- Databases: SQL, MySQL
- Web Technologies: HTML, CSS, JavaScript
- AI / ML: Machine Learning, Artificial Intelligence
- Version Control: Git, GitHub

Academic & Applied Projects:
1. ${PROJECTS_DATA[0].title}
   Tech: ${PROJECTS_DATA[0].technologies.join(', ')}
   Summary: ${PROJECTS_DATA[0].description}

2. ${PROJECTS_DATA[1].title}
   Tech: ${PROJECTS_DATA[1].technologies.join(', ')}
   Summary: ${PROJECTS_DATA[1].description}

3. ${PROJECTS_DATA[2].title}
   Tech: ${PROJECTS_DATA[2].technologies.join(', ')}
   Summary: ${PROJECTS_DATA[2].description}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    SoundEngine.getInstance().playClick();
    window.print();
  };

  return (
    <div
      id="resume-modal-container"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in"
    >
      <div
        id="resume-modal"
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-950 border border-slate-800 rounded-xl shadow-2xl text-slate-100 font-sans overflow-hidden"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/50">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-sky-400 border border-sky-900 bg-sky-950/40 px-2 py-0.5 rounded">
              05
            </span>
            <span className="text-sm font-bold font-mono tracking-wider text-white uppercase">
              DIGITAL RESUME / CURRICULUM VITAE
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="resume-copy-button"
              onClick={handleCopyText}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded border border-slate-700 transition-colors cursor-pointer"
              title="Copy plain formatted resume text"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'COPIED' : 'COPY TEXT'}</span>
            </button>

            <button
              id="resume-print-button"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-mono font-bold rounded transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">PRINT / PDF</span>
            </button>

            <button
              id="resume-close-button"
              onClick={() => {
                SoundEngine.getInstance().playClick();
                onClose();
              }}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer ml-2"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-slate-950 print:bg-white print:text-black">
          {/* Header Block */}
          <div className="border-b border-slate-800 pb-6 print:border-slate-300">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white print:text-black mb-1">
              {PERSONAL_DATA.name}
            </h1>
            <div className="text-sm font-mono text-sky-400 font-semibold print:text-sky-700">
              {PERSONAL_DATA.primaryTitle} &bull; {PERSONAL_DATA.secondaryTitle}
            </div>

            {/* Contact Row */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 mt-3 text-xs font-mono text-slate-300 print:text-slate-700">
              <a
                href={`mailto:${PERSONAL_DATA.email}`}
                className="flex items-center space-x-1.5 hover:text-sky-400 transition-colors"
              >
                <Mail size={13} className="text-sky-400 print:text-slate-700" />
                <span>{PERSONAL_DATA.email}</span>
              </a>

              <a
                href={`tel:${PERSONAL_DATA.phone}`}
                className="flex items-center space-x-1.5 hover:text-sky-400 transition-colors"
              >
                <Phone size={13} className="text-sky-400 print:text-slate-700" />
                <span>{PERSONAL_DATA.phone}</span>
              </a>

              <div className="flex items-center space-x-1.5 text-slate-400 print:text-slate-700">
                <MapPin size={13} className="text-sky-400 print:text-slate-700" />
                <span>{PERSONAL_DATA.location}</span>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold print:text-sky-800">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm text-slate-200 print:text-slate-800 leading-relaxed">
              {PERSONAL_DATA.resumeSummary}
            </p>
          </div>

          {/* Education Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold print:text-sky-800">
              EDUCATION
            </h2>
            <div className="bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 p-4 rounded-lg space-y-1">
              <div className="flex flex-wrap items-center justify-between font-semibold text-sm text-white print:text-black">
                <span>{PERSONAL_DATA.education.degree}</span>
                <span className="text-sky-400 print:text-sky-800 font-mono text-xs">
                  CGPA: {PERSONAL_DATA.education.cgpa} ({PERSONAL_DATA.education.classification})
                </span>
              </div>
              <div className="text-xs text-slate-300 print:text-slate-700">
                {PERSONAL_DATA.education.institution}
              </div>
              <p className="text-xs text-slate-400 print:text-slate-600 pt-1">
                {PERSONAL_DATA.education.details}
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold print:text-sky-800">
              TECHNICAL COMPETENCIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 p-3 rounded-lg">
                <span className="font-mono text-slate-400 print:text-slate-600 font-bold block mb-1">
                  LANGUAGES
                </span>
                <span className="text-slate-200 print:text-slate-900">Python, Java, C</span>
              </div>
              <div className="bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 p-3 rounded-lg">
                <span className="font-mono text-slate-400 print:text-slate-600 font-bold block mb-1">
                  DATABASES
                </span>
                <span className="text-slate-200 print:text-slate-900">SQL, MySQL</span>
              </div>
              <div className="bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 p-3 rounded-lg">
                <span className="font-mono text-slate-400 print:text-slate-600 font-bold block mb-1">
                  WEB TECHNOLOGIES
                </span>
                <span className="text-slate-200 print:text-slate-900">HTML, CSS, JavaScript</span>
              </div>
              <div className="bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 p-3 rounded-lg">
                <span className="font-mono text-slate-400 print:text-slate-600 font-bold block mb-1">
                  MACHINE LEARNING & TOOLS
                </span>
                <span className="text-slate-200 print:text-slate-900">
                  Machine Learning, Artificial Intelligence, Git, GitHub
                </span>
              </div>
            </div>
          </div>

          {/* Academic Projects Section */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold print:text-sky-800">
              ACADEMIC & TECHNICAL PROJECTS
            </h2>
            <div className="space-y-3">
              {PROJECTS_DATA.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 p-4 rounded-lg space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between">
                    <span className="font-semibold text-sm text-white print:text-black">
                      {proj.title}
                    </span>
                    <span className="text-xs font-mono text-sky-400 print:text-sky-700">
                      {proj.subtitle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 print:text-slate-600">
                    <span className="font-bold">Technologies:</span> {proj.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-slate-800 px-6 py-4 bg-slate-900/50 flex items-center justify-between">
          <button
            id="resume-nav-education-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('education');
            }}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← 04 EDUCATION
          </button>

          <button
            id="resume-nav-contact-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('contact');
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold rounded transition-colors cursor-pointer"
          >
            <span>PROCEED TO CONTACT (06)</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
