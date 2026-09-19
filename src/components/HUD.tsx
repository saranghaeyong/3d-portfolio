import React from 'react';
import { SectionId, QualityLevel } from '../types';
import { PERSONAL_DATA, NAV_STATIONS } from '../data/portfolioData';
import { Volume2, VolumeX, Terminal, FileText, Menu, Compass, Sparkles } from 'lucide-react';
import { SoundEngine } from '../Experience/SoundEngine';

interface HUDProps {
  currentSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onOpenMenu: () => void;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  quality: QualityLevel;
  onChangeQuality: (q: QualityLevel) => void;
  hoveredObject: { label: string; type: string } | null;
}

export const HUD: React.FC<HUDProps> = ({
  currentSection,
  onNavigate,
  onOpenMenu,
  onOpenTerminal,
  onOpenResume,
  isMuted,
  onToggleMute,
  quality,
  onChangeQuality,
  hoveredObject
}) => {
  const currentStationIndex = NAV_STATIONS.findIndex(s => s.id === currentSection);
  const currentStation = NAV_STATIONS[currentStationIndex] || NAV_STATIONS[0];

  const handleStationClick = (id: SectionId) => {
    SoundEngine.getInstance().playClick();
    onNavigate(id);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 md:p-6 font-mono select-none">
      {/* Top Header Bar */}
      <header className="flex items-start justify-between w-full">
        {/* Top-Left: Personal Identity Branding */}
        <div
          id="hud-identity"
          onClick={() => handleStationClick('intro')}
          className="pointer-events-auto cursor-pointer group bg-slate-950/70 border border-slate-800/80 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-lg hover:border-sky-500/50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <h1 className="text-sm font-bold text-white tracking-wider font-sans group-hover:text-sky-400 transition-colors">
              {PERSONAL_DATA.name}
            </h1>
          </div>
          <div className="text-[11px] text-sky-400 tracking-wider font-medium">
            {PERSONAL_DATA.primaryTitle}
          </div>
          <div className="text-[9px] text-slate-400 tracking-wide hidden sm:block">
            {PERSONAL_DATA.location}
          </div>
        </div>

        {/* Top-Right: Controls & Menu */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          {/* Quality Switcher */}
          <div className="hidden md:flex items-center bg-slate-950/70 border border-slate-800/80 backdrop-blur-md rounded-lg p-1 text-[11px]">
            <span className="px-2 text-slate-400 text-[10px] uppercase font-semibold">GFX:</span>
            {(['low', 'medium', 'high'] as QualityLevel[]).map((lvl) => (
              <button
                key={lvl}
                id={`hud-quality-${lvl}`}
                onClick={() => {
                  SoundEngine.getInstance().playClick();
                  onChangeQuality(lvl);
                }}
                className={`px-2 py-1 rounded uppercase tracking-wider text-[10px] font-semibold transition-colors cursor-pointer ${
                  quality === lvl
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Sound Toggle */}
          <button
            id="hud-sound-toggle"
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="flex items-center justify-center w-9 h-9 bg-slate-950/70 border border-slate-800/80 hover:border-sky-500/50 backdrop-blur-md rounded-lg text-slate-300 hover:text-sky-400 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-sky-400" />}
          </button>

          {/* Terminal Launcher */}
          <button
            id="hud-terminal-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onOpenTerminal();
            }}
            title="Interactive Developer Terminal"
            className="hidden sm:flex items-center space-x-1.5 px-3 h-9 bg-slate-950/70 border border-slate-800/80 hover:border-sky-500/50 backdrop-blur-md rounded-lg text-xs text-slate-300 hover:text-sky-400 transition-colors cursor-pointer"
          >
            <Terminal size={14} />
            <span>TERMINAL</span>
          </button>

          {/* Full Resume Button */}
          <button
            id="hud-resume-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onOpenResume();
            }}
            title="View Full Digital Resume"
            className="flex items-center space-x-1.5 px-3 h-9 bg-sky-500/10 border border-sky-500/40 hover:bg-sky-500/20 backdrop-blur-md rounded-lg text-xs text-sky-400 font-semibold transition-colors cursor-pointer"
          >
            <FileText size={14} />
            <span className="hidden sm:inline">VIEW CV</span>
            <span className="sm:hidden">CV</span>
          </button>

          {/* Station Menu Toggle */}
          <button
            id="hud-menu-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onOpenMenu();
            }}
            title="Menu & Station Navigation"
            className="flex items-center space-x-2 px-3 h-9 bg-slate-950/70 border border-slate-800/80 hover:border-sky-500/50 backdrop-blur-md rounded-lg text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Menu size={16} />
            <span className="hidden md:inline">NAVIGATE</span>
          </button>
        </div>
      </header>

      {/* Floating 3D Hover Tooltip */}
      {hoveredObject && (
        <div
          id="hud-hover-tooltip"
          className="self-center pointer-events-auto bg-slate-950/90 border border-sky-500/60 shadow-[0_0_20px_rgba(56,189,248,0.25)] backdrop-blur-md px-4 py-2 rounded-full text-xs text-sky-300 flex items-center space-x-2 animate-fade-in"
        >
          <Sparkles size={14} className="text-sky-400 animate-spin" />
          <span className="font-semibold">{hoveredObject.label}</span>
          <span className="text-[10px] text-slate-400 border-l border-slate-700 pl-2">CLICK TO FOCUS</span>
        </div>
      )}

      {/* Bottom HUD Bar */}
      <footer className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Current Station Tracker */}
        <div
          id="hud-station-tracker"
          className="pointer-events-auto flex items-center space-x-3 bg-slate-950/80 border border-slate-800/80 backdrop-blur-md px-4 py-2 rounded-lg text-xs text-slate-300"
        >
          <Compass size={16} className="text-sky-400" />
          <div className="flex items-center space-x-2">
            <span className="text-sky-400 font-bold tracking-wider">
              {currentStation.number} / 06
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-white font-semibold tracking-wider">
              {currentStation.label}
            </span>
          </div>
        </div>

        {/* Station Navigation Quick Bar */}
        <nav
          id="hud-station-pills"
          className="pointer-events-auto hidden lg:flex items-center space-x-1 bg-slate-950/80 border border-slate-800/80 backdrop-blur-md p-1 rounded-lg"
        >
          {NAV_STATIONS.map((station) => {
            const isActive = station.id === currentSection;
            return (
              <button
                key={station.id}
                id={`hud-pill-${station.id}`}
                onClick={() => handleStationClick(station.id)}
                className={`px-3 py-1.5 rounded text-[11px] font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <span>{station.number}</span> <span className="ml-1">{station.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Interactive Exploration Hint */}
        <div className="text-[10px] text-slate-400 tracking-wider uppercase text-center md:text-right hidden sm:block">
          <div>DRAG TO ROTATE 3D CAM • CLICK OBJECTS TO JUMP</div>
        </div>
      </footer>
    </div>
  );
};
