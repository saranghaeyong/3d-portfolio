import React from 'react';
import { SectionId, ThemeMode } from '../types';
import { NAV_STATIONS, PERSONAL_DATA } from '../data/portfolioData';
import { X, ArrowRight, Compass } from 'lucide-react';
import { SoundEngine } from '../Experience/SoundEngine';
import { ThemeToggle } from './ThemeToggle';

interface NavigationMenuProps {
  currentSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onClose: () => void;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  currentSection,
  onNavigate,
  onClose,
  theme,
  onToggleTheme
}) => {
  const handleSelect = (id: SectionId) => {
    SoundEngine.getInstance().playClick();
    onNavigate(id);
    onClose();
  };

  return (
    <div
      id="navigation-menu-container"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in font-mono"
    >
      <div
        id="navigation-menu"
        className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl text-slate-100"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center space-x-2 text-sky-400">
            <Compass size={18} />
            <h2 className="text-sm font-bold tracking-wider text-white uppercase">
              3D STATION NAVIGATION
            </h2>
          </div>

          <button
            id="nav-menu-close-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Station Links */}
        <div className="space-y-2 mb-6">
          {NAV_STATIONS.map((st) => {
            const isActive = st.id === currentSection;
            return (
              <button
                key={st.id}
                id={`nav-menu-station-${st.id}`}
                onClick={() => handleSelect(st.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-sky-500/10 border-sky-400 text-white shadow-sm'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      isActive ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-sky-400'
                    }`}
                  >
                    {st.number}
                  </span>
                  <span className="text-sm font-sans font-bold tracking-wide">
                    {st.label}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  {isActive && <span className="text-sky-400 font-semibold text-[10px]">CURRENT</span>}
                  <ArrowRight size={14} className={isActive ? 'text-sky-400' : 'text-slate-600'} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Identity & Theme Toggle */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center space-x-2">
            <span>{PERSONAL_DATA.name}</span>
            <span className="text-slate-600">|</span>
            <span className="text-sky-400">{PERSONAL_DATA.primaryTitle}</span>
          </div>

          {theme && onToggleTheme && (
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase text-slate-400">THEME:</span>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
