import React, { useState } from 'react';
import { PERSONAL_DATA, SKILLS_DATA, PROJECTS_DATA, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../data/portfolioData';
import { Printer, Copy, Check, Mail, Phone, MapPin, X, ArrowRight, GraduationCap, FileBadge } from 'lucide-react';
import { SoundEngine } from '../Experience/SoundEngine';
import { SectionId } from '../types';

interface ResumeModalProps {
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ onClose, onNavigate }) => {
  const [copied, setCopied] = useState(false);

  // Exact requested order: MCA -> BCA -> Plus Two -> 10th
  const educationList = [
    {
      qualification: "Master of Computer Applications (MCA)",
      institution: "Cochin University of Science and Technology (CUSAT)",
      score: "CGPA: 7.66 / 10",
      classification: "First Class",
      duration: undefined
    },
    {
      qualification: "Bachelor of Computer Applications (BCA)",
      institution: "Bharata Mata College of Science and Arts",
      score: "CCPA: 6.24 / 10",
      classification: "B Class",
      duration: "2019–2022"
    },
    {
      qualification: "Higher Secondary / Plus Two",
      stream: "Science Biology",
      institution: "Cardinal Higher Secondary, Thrikkakara",
      score: undefined,
      classification: undefined,
      duration: "2017–2019"
    },
    {
      qualification: "High School / 10th",
      institution: "St Alberts HS, Ernakulam",
      score: undefined,
      classification: undefined,
      duration: "2012–2017"
    }
  ];

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
1. MCA — CUSAT — 7.66/10 — First Class
2. BCA — Bharata Mata College of Science and Arts — 2019–2022 — CCPA 6.24/10 — B Class
3. Plus Two — Science Biology — Cardinal Higher Secondary, Thrikkakara — 2017–2019
4. 10th — St Alberts HS, Ernakulam — 2012–2017

Computer Training & Certifications:
- Diploma in Web Designing — Softmedia Computer Training — 2019
- Desktop Publishing (DTP) — Softmedia Computer Training — 2018
- Diploma in Computer Applications — Softmedia Computer Training — 2017

Technical Competencies:
- Languages: Python, Java, C
- Databases: SQL, MySQL
- Web Technologies: HTML, CSS, JavaScript
- AI / ML: Machine Learning, Artificial Intelligence
- Version Control: Git, GitHub

Academic Projects:
1. ${PROJECTS_DATA[0].title}
   Technologies: ${PROJECTS_DATA[0].technologies.join(', ')}
   Summary: ${PROJECTS_DATA[0].description}

2. ${PROJECTS_DATA[1].title}
   Technologies: ${PROJECTS_DATA[1].technologies.join(', ')}
   Summary: ${PROJECTS_DATA[1].description}

3. ${PROJECTS_DATA[2].title}
   Technologies: ${PROJECTS_DATA[2].technologies.join(', ')}
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in"
    >
      <div
        id="resume-modal"
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl text-slate-100 font-sans overflow-hidden"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4 bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-sky-400 border border-sky-900 bg-sky-950/50 px-2.5 py-1 rounded">
              07
            </span>
            <span className="text-sm font-bold font-mono tracking-wider text-white uppercase">
              DIGITAL RESUME / CURRICULUM VITAE
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="resume-copy-button"
              onClick={handleCopyText}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded-lg border border-slate-700 transition-colors cursor-pointer"
              title="Copy plain formatted resume text"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'COPIED' : 'COPY TEXT'}</span>
            </button>

            <button
              id="resume-print-button"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer"
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
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer ml-1"
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
            <p className="text-sm text-slate-200 print:text-slate-800 leading-relaxed bg-slate-900/30 print:bg-transparent p-3.5 print:p-0 rounded-lg border border-slate-800/80 print:border-none">
              {PERSONAL_DATA.resumeSummary}
            </p>
          </div>

          {/* Education Section in Exact Specified Order */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold print:text-sky-800 flex items-center space-x-1.5">
              <GraduationCap size={14} />
              <span>EDUCATION</span>
            </h2>

            <div className="space-y-2.5">
              {/* 1. MCA */}
              <div className="bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 p-3.5 rounded-lg">
                <div className="flex flex-wrap items-center justify-between font-semibold text-sm text-white print:text-black">
                  <span>1. Master of Computer Applications (MCA)</span>
                  <span className="text-sky-400 print:text-sky-800 font-mono text-xs">
                    CGPA: 7.66 / 10 &bull; First Class
                  </span>
                </div>
                <div className="text-xs text-slate-300 print:text-slate-700 mt-0.5">
                  Cochin University of Science and Technology (CUSAT)
                </div>
              </div>

              {/* 2. BCA */}
              <div className="bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 p-3.5 rounded-lg">
                <div className="flex flex-wrap items-center justify-between font-semibold text-sm text-white print:text-black">
                  <span>2. Bachelor of Computer Applications (BCA)</span>
                  <span className="text-sky-400 print:text-sky-800 font-mono text-xs">
                    CCPA: 6.24 / 10 &bull; B Class
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-300 print:text-slate-700 mt-0.5">
                  <span>Bharata Mata College of Science and Arts</span>
                  <span className="font-mono text-slate-400 print:text-slate-600">Duration: 2019–2022</span>
                </div>
              </div>

              {/* 3. Plus Two */}
              <div className="bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 p-3.5 rounded-lg">
                <div className="flex flex-wrap items-center justify-between font-semibold text-sm text-white print:text-black">
                  <span>3. Higher Secondary / Plus Two (Science Biology)</span>
                  <span className="font-mono text-xs text-slate-400 print:text-slate-600">
                    Duration: 2017–2019
                  </span>
                </div>
                <div className="text-xs text-slate-300 print:text-slate-700 mt-0.5">
                  Cardinal Higher Secondary, Thrikkakara
                </div>
              </div>

              {/* 4. 10th */}
              <div className="bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 p-3.5 rounded-lg">
                <div className="flex flex-wrap items-center justify-between font-semibold text-sm text-white print:text-black">
                  <span>4. High School / 10th</span>
                  <span className="font-mono text-xs text-slate-400 print:text-slate-600">
                    Duration: 2012–2017
                  </span>
                </div>
                <div className="text-xs text-slate-300 print:text-slate-700 mt-0.5">
                  St Alberts HS, Ernakulam
                </div>
              </div>
            </div>
          </div>

          {/* Computer Training & Certifications Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold print:text-emerald-800 flex items-center space-x-1.5">
              <FileBadge size={14} />
              <span>COMPUTER TRAINING & CERTIFICATIONS</span>
            </h2>

            <div className="space-y-2.5">
              {/* Diploma in Web Designing */}
              <div className="bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 p-3.5 rounded-lg flex flex-wrap items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-white print:text-black">
                    Diploma in Web Designing
                  </div>
                  <div className="text-xs text-slate-300 print:text-slate-700">
                    Softmedia Computer Training
                  </div>
                </div>
                <div className="text-xs font-mono text-emerald-400 print:text-emerald-800 font-bold">
                  Year: 2019
                </div>
              </div>

              {/* Desktop Publishing (DTP) */}
              <div className="bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 p-3.5 rounded-lg flex flex-wrap items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-white print:text-black">
                    Desktop Publishing (DTP)
                  </div>
                  <div className="text-xs text-slate-300 print:text-slate-700">
                    Softmedia Computer Training
                  </div>
                </div>
                <div className="text-xs font-mono text-emerald-400 print:text-emerald-800 font-bold">
                  Year: 2018
                </div>
              </div>

              {/* Diploma in Computer Applications */}
              <div className="bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 p-3.5 rounded-lg flex flex-wrap items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-white print:text-black">
                    Diploma in Computer Applications
                  </div>
                  <div className="text-xs text-slate-300 print:text-slate-700">
                    Softmedia Computer Training
                  </div>
                </div>
                <div className="text-xs font-mono text-emerald-400 print:text-emerald-800 font-bold">
                  Year: 2017
                </div>
              </div>
            </div>
          </div>

          {/* Technical Competencies Section */}
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
        <div className="border-t border-slate-800 px-6 py-4 bg-slate-900/50 flex items-center justify-between font-mono text-xs">
          <button
            id="resume-nav-projects-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('projects');
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← 06 PROJECTS
          </button>

          <button
            id="resume-nav-contact-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('contact');
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
          >
            <span>PROCEED TO CONTACT (08)</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
