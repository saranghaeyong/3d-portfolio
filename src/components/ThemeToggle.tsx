import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeMode } from '../types';
import { SoundEngine } from '../Experience/SoundEngine';

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = ''
}) => {
  const isLight = theme === 'light';

  const handleClick = () => {
    SoundEngine.getInstance().playClick();
    onToggle();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className={`flex items-center space-x-1.5 ${className}`}>
      <button
        id="hud-theme-toggle"
        role="switch"
        type="button"
        aria-checked={isLight}
        aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
        title={isLight ? 'Switch to dark theme (OFF)' : 'Switch to light theme (ON)'}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`group relative inline-flex items-center h-9 px-2 sm:px-2.5 rounded-lg border backdrop-blur-md transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 ${
          isLight
            ? 'bg-white/90 border-slate-300 text-slate-900 shadow-sm hover:border-sky-500'
            : 'bg-slate-950/70 border-slate-800/80 text-slate-200 shadow-lg hover:border-sky-500/50'
        }`}
      >
        {/* Toggle Track & Sliding Knob Assembly */}
        <div className="flex items-center space-x-2">
          {/* Animated Moon / Sun Icon Indicator */}
          <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
            {isLight ? (
              <Sun
                size={15}
                className="text-amber-500 transition-transform duration-300 rotate-0 scale-100"
              />
            ) : (
              <Moon
                size={15}
                className="text-sky-400 transition-transform duration-300 -rotate-12 scale-100"
              />
            )}
          </div>

          {/* Desktop Switch Capsule Track */}
          <div
            className={`relative w-9 h-5 rounded-full transition-colors duration-250 p-0.5 flex items-center ${
              isLight
                ? 'bg-sky-500 shadow-inner'
                : 'bg-slate-800 border border-slate-700/80 shadow-inner'
            }`}
          >
            {/* Sliding Switch Knob */}
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-250 ease-out flex items-center justify-center ${
                isLight ? 'translate-x-4' : 'translate-x-0'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isLight ? 'bg-sky-600' : 'bg-slate-700'
                }`}
              />
            </div>
          </div>

          {/* Theme State Text Badge */}
          <span
            className={`text-[10px] font-mono font-bold tracking-wider uppercase hidden sm:inline select-none ${
              isLight ? 'text-slate-800' : 'text-slate-300'
            }`}
          >
            {isLight ? 'LIGHT' : 'DARK'}
          </span>
        </div>
      </button>
    </div>
  );
};
