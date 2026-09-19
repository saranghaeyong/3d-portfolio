import React, { useState, useEffect } from 'react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { SoundEngine } from '../Experience/SoundEngine';

interface LoadingScreenProps {
  onEnter: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onEnter }) => {
  const [step, setStep] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Cinematic progressive diagnostics sequence
    const timers = [
      setTimeout(() => setStep(1), 350),
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1050),
      setTimeout(() => setStep(4), 1400),
      setTimeout(() => {
        setStep(5);
        setIsReady(true);
      }, 1750),
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const handleStart = () => {
    SoundEngine.getInstance().unlockAudio();
    SoundEngine.getInstance().playClick();
    SoundEngine.getInstance().playWhoosh();
    onEnter();
  };

  return (
    <div
      id="loading-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03060a] text-slate-100 font-mono select-none px-6 transition-opacity duration-1000"
    >
      {/* Background ambient grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-xl w-full flex flex-col items-center text-center">
        {/* Top Status Header */}
        <div className="flex items-center space-x-2 text-xs tracking-widest text-sky-400 mb-8 border border-sky-950 bg-sky-950/20 px-3 py-1 rounded-full">
          <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span>SYSTEM_INITIALIZATION</span>
        </div>

        {/* Console Diagnostic Log */}
        <div className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-5 mb-8 text-left text-xs font-mono space-y-2 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800/80">
            <span>TERMINAL_OUTPUT</span>
            <span className="text-slate-400">VITE_THREE_BUILD</span>
          </div>

          <div className="text-slate-400">
            {`> INITIALIZING CORE SYSTEMS...`}
          </div>

          {step >= 1 && (
            <div className="flex justify-between text-slate-300">
              <span>3D ENVIRONMENT (WEBGL)</span>
              <span className="text-emerald-400 font-semibold">[ OK ]</span>
            </div>
          )}

          {step >= 2 && (
            <div className="flex justify-between text-slate-300">
              <span>PORTFOLIO KERNEL SYSTEM</span>
              <span className="text-emerald-400 font-semibold">[ OK ]</span>
            </div>
          )}

          {step >= 3 && (
            <div className="flex justify-between text-slate-300">
              <span>PROJECT CASE STUDIES</span>
              <span className="text-emerald-400 font-semibold">[ OK ]</span>
            </div>
          )}

          {step >= 4 && (
            <div className="flex justify-between text-slate-300">
              <span>SARANG R N PROFILE DATA</span>
              <span className="text-emerald-400 font-semibold">[ OK ]</span>
            </div>
          )}

          {step >= 5 && (
            <div className="pt-2 text-sky-400 flex items-center justify-between font-semibold">
              <span>ALL MODULES OPERATIONAL</span>
              <span className="text-emerald-400">READY</span>
            </div>
          )}
        </div>

        {/* Hero Identity Reveal */}
        <div className="space-y-3 mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-sans">
            {PERSONAL_DATA.name}
          </h1>

          <div className="inline-block px-3 py-1 text-xs md:text-sm tracking-wider font-semibold text-sky-400 bg-sky-950/40 border border-sky-800/50 rounded">
            {PERSONAL_DATA.primaryTitle}
          </div>

          <p className="text-xs md:text-sm text-slate-400 tracking-wider">
            {PERSONAL_DATA.secondaryTitle}
          </p>

          <p className="text-xs text-slate-400 tracking-widest uppercase pt-2">
            &ldquo;{PERSONAL_DATA.tagline}&rdquo;
          </p>
        </div>

        {/* Enter Experience Action */}
        {isReady ? (
          <button
            id="enter-portfolio-button"
            onClick={handleStart}
            className="group relative inline-flex items-center space-x-3 px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-sans font-semibold text-sm tracking-wider uppercase rounded transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] cursor-pointer"
          >
            <span>ENTER PORTFOLIO</span>
            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2 text-slate-400 text-xs">
            <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
            <span>PREPARING 3D WORKSPACE...</span>
          </div>
        )}

        <div className="mt-8 text-[11px] text-slate-400">
          Tip: Supports 3D rotation, mouse parallax, and interactive stations.
        </div>
      </div>
    </div>
  );
};
