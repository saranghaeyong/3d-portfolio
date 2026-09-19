import React, { useEffect, useRef, useState } from 'react';
import { Experience } from './Experience/Experience';
import { SoundEngine } from './Experience/SoundEngine';
import { HUD } from './components/HUD';
import { LoadingScreen } from './components/LoadingScreen';
import { AboutPanel } from './components/AboutPanel';
import { SkillsPanel } from './components/SkillsPanel';
import { ProjectsPanel } from './components/ProjectsPanel';
import { EducationPanel } from './components/EducationPanel';
import { CertificationsPanel } from './components/CertificationsPanel';
import { ResumeModal } from './components/ResumeModal';
import { ContactPanel } from './components/ContactPanel';
import { TerminalModal } from './components/TerminalModal';
import { NavigationMenu } from './components/NavigationMenu';
import { QualityLevel, SectionId, ThemeMode } from './types';
import { InteractiveObjectData } from './Experience/World/DeveloperWorkspace';
import { getInitialTheme, applyTheme } from './utils/themeManager';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const experienceRef = useRef<Experience | null>(null);

  // Theme State with LocalStorage Persistence
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  // App UI State
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<SectionId>('intro');
  const [activePanel, setActivePanel] = useState<SectionId | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);

  // Sound & Quality
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [quality, setQuality] = useState<QualityLevel>('high');
  const [hoveredObject, setHoveredObject] = useState<{ label: string; type: string } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Apply initial theme to document DOM
    applyTheme(theme);

    // Detect prefers-reduced-motion or low power
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const initialQuality: QualityLevel = prefersReducedMotion ? 'low' : 'high';
    setQuality(initialQuality);

    // Initialize 3D Experience with user theme
    const exp = new Experience(canvasRef.current, initialQuality, theme);
    experienceRef.current = exp;

    // Listen for 3D RayCaster events
    exp.on('hover', (event: { data: InteractiveObjectData } | null) => {
      if (event && event.data) {
        setHoveredObject({ label: event.data.label, type: event.data.type });
      } else {
        setHoveredObject(null);
      }
    });

    exp.on('select', (data: InteractiveObjectData) => {
      if (data.sectionId) {
        if (data.type === 'project' && data.detail) {
          setSelectedProjectId(data.detail);
        }
        handleNavigate(data.sectionId);
      }
    });

    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Escape') {
        setActivePanel(null);
        setMenuOpen(false);
        setTerminalOpen(false);
        setResumeOpen(false);
        return;
      }

      if (e.key === 't' || e.key === 'T') {
        setTerminalOpen(prev => !prev);
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        setMenuOpen(prev => !prev);
        return;
      }

      const numMap: Record<string, SectionId> = {
        '0': 'intro',
        '1': 'intro',
        '2': 'about',
        '3': 'skills',
        '4': 'education',
        '5': 'certifications',
        '6': 'projects',
        '7': 'resume',
        '8': 'contact'
      };

      if (numMap[e.key]) {
        handleNavigate(numMap[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      exp.destroy();
      experienceRef.current = null;
    };
  }, []);

  const handleToggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    applyTheme(nextTheme);
    if (experienceRef.current) {
      experienceRef.current.setTheme(nextTheme);
    }
  };

  const handleNavigate = (section: SectionId) => {
    setCurrentSection(section);
    if (experienceRef.current) {
      experienceRef.current.navigateTo(section);
    }

    // Open corresponding panel if not overview
    if (section === 'intro') {
      setActivePanel(null);
      setResumeOpen(false);
    } else if (section === 'resume') {
      setActivePanel(null);
      setResumeOpen(true);
    } else {
      setActivePanel(section);
      setResumeOpen(false);
    }
  };

  const handleToggleMute = () => {
    const muted = SoundEngine.getInstance().toggleMute();
    setIsMuted(muted);
  };

  const handleChangeQuality = (q: QualityLevel) => {
    setQuality(q);
    if (experienceRef.current) {
      experienceRef.current.setQuality(q);
    }
  };

  const handleEnterExperience = () => {
    setHasEntered(true);
    SoundEngine.getInstance().startAmbientTone();
    if (experienceRef.current) {
      experienceRef.current.navigateTo('intro');
    }
  };

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden font-sans transition-colors duration-300 ${
        theme === 'light' ? 'bg-[#f1f5f9] text-slate-900' : 'bg-[#04060a] text-slate-100'
      }`}
    >
      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        id="webgl-canvas"
        className="fixed inset-0 w-full h-full outline-none block z-0"
      />

      {/* Cinematic Diagnostic Preloader */}
      {!hasEntered && (
        <LoadingScreen onEnter={handleEnterExperience} />
      )}

      {/* Heads-Up Display (HUD) */}
      {hasEntered && (
        <HUD
          currentSection={currentSection}
          onNavigate={handleNavigate}
          onOpenMenu={() => setMenuOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          quality={quality}
          onChangeQuality={handleChangeQuality}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          hoveredObject={hoveredObject}
        />
      )}

      {/* Section Modals & Overlays */}
      {hasEntered && activePanel === 'about' && (
        <AboutPanel
          onClose={() => setActivePanel(null)}
          onNavigate={handleNavigate}
        />
      )}

      {hasEntered && activePanel === 'skills' && (
        <SkillsPanel
          onClose={() => setActivePanel(null)}
          onNavigate={handleNavigate}
        />
      )}

      {hasEntered && activePanel === 'education' && (
        <EducationPanel
          onClose={() => setActivePanel(null)}
          onNavigate={handleNavigate}
        />
      )}

      {hasEntered && activePanel === 'certifications' && (
        <CertificationsPanel
          onClose={() => setActivePanel(null)}
          onNavigate={handleNavigate}
        />
      )}

      {hasEntered && activePanel === 'projects' && (
        <ProjectsPanel
          initialProjectId={selectedProjectId}
          onClose={() => {
            setActivePanel(null);
            setSelectedProjectId(undefined);
          }}
          onNavigate={handleNavigate}
        />
      )}

      {hasEntered && activePanel === 'contact' && (
        <ContactPanel
          onClose={() => setActivePanel(null)}
          onNavigate={handleNavigate}
        />
      )}

      {/* Dedicated Resume Modal */}
      {hasEntered && resumeOpen && (
        <ResumeModal
          onClose={() => setResumeOpen(false)}
          onNavigate={handleNavigate}
        />
      )}

      {/* Interactive Developer Terminal Modal */}
      {hasEntered && terminalOpen && (
        <TerminalModal
          onClose={() => setTerminalOpen(false)}
          onNavigate={handleNavigate}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      )}

      {/* Navigation Station Menu */}
      {hasEntered && menuOpen && (
        <NavigationMenu
          currentSection={currentSection}
          onNavigate={handleNavigate}
          onClose={() => setMenuOpen(false)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      )}
    </div>
  );
}
export default App;
