import React, { useState } from 'react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { Mail, Phone, MapPin, Copy, Check, Send, X, ExternalLink, MessageSquare } from 'lucide-react';
import { SoundEngine } from '../Experience/SoundEngine';
import { SectionId } from '../types';

interface ContactPanelProps {
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
}

export const ContactPanel: React.FC<ContactPanelProps> = ({ onClose, onNavigate }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    SoundEngine.getInstance().playClick();
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div
      id="contact-panel-container"
      className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in"
    >
      <div
        id="contact-panel"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl text-slate-100 font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-sky-400 border border-sky-900 bg-sky-950/40 px-2 py-0.5 rounded">
              06
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase font-mono">
                GET IN TOUCH
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Direct Communication Node
              </p>
            </div>
          </div>

          <button
            id="contact-close-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hero Tagline */}
        <div className="mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            LET&rsquo;S BUILD SOMETHING.
          </h3>
          <p className="text-sm text-slate-300">
            Reach out directly for software development roles, collaborative projects, or technical inquiries.
          </p>

          {hoveredAction && (
            <div className="mt-2 text-xs font-mono text-sky-400 animate-fade-in flex items-center space-x-1.5">
              <MessageSquare size={12} />
              <span>{hoveredAction}</span>
            </div>
          )}
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Email Card */}
          <div
            className="bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 rounded-xl p-5 transition-all duration-200"
            onMouseEnter={() => setHoveredAction("Let's talk.")}
            onMouseLeave={() => setHoveredAction(null)}
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
              <span className="flex items-center space-x-1.5 text-sky-400 font-semibold">
                <Mail size={15} />
                <span>EMAIL ADDRESS</span>
              </span>
              <button
                id="contact-copy-email-button"
                onClick={() => handleCopy(PERSONAL_DATA.email, 'email')}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>

            <a
              id="contact-mailto-link"
              href={`mailto:${PERSONAL_DATA.email}`}
              className="text-base sm:text-lg font-mono font-bold text-white hover:text-sky-400 transition-colors block break-all mb-3"
            >
              {PERSONAL_DATA.email}
            </a>

            <a
              id="contact-email-action"
              href={`mailto:${PERSONAL_DATA.email}`}
              onClick={() => SoundEngine.getInstance().playClick()}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold rounded transition-colors"
            >
              <Send size={12} />
              <span>EMAIL ME</span>
            </a>
          </div>

          {/* Phone Card */}
          <div
            className="bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 rounded-xl p-5 transition-all duration-200"
            onMouseEnter={() => setHoveredAction("Let's connect.")}
            onMouseLeave={() => setHoveredAction(null)}
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
              <span className="flex items-center space-x-1.5 text-sky-400 font-semibold">
                <Phone size={15} />
                <span>TELEPHONE / MOBILE</span>
              </span>
              <button
                id="contact-copy-phone-button"
                onClick={() => handleCopy(PERSONAL_DATA.phone, 'phone')}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                title="Copy phone to clipboard"
              >
                {copiedPhone ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>

            <a
              id="contact-tel-link"
              href={`tel:${PERSONAL_DATA.phone}`}
              className="text-base sm:text-lg font-mono font-bold text-white hover:text-sky-400 transition-colors block mb-3"
            >
              {PERSONAL_DATA.phone}
            </a>

            <a
              id="contact-call-action"
              href={`tel:${PERSONAL_DATA.phone}`}
              onClick={() => SoundEngine.getInstance().playClick()}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs font-semibold rounded border border-slate-700 transition-colors"
            >
              <Phone size={12} />
              <span>CALL NOW</span>
            </a>
          </div>
        </div>

        {/* Location & Status Bar */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-2 text-slate-300">
            <MapPin size={15} className="text-sky-400 shrink-0" />
            <span>{PERSONAL_DATA.location}</span>
          </div>

          <div className="flex items-center space-x-2 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
          <button
            id="contact-nav-resume-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('resume');
            }}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← 05 RESUME
          </button>

          <button
            id="contact-nav-overview-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onNavigate('intro');
            }}
            className="text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
          >
            RETURN TO 3D OVERVIEW (00) ↑
          </button>
        </div>
      </div>
    </div>
  );
};
