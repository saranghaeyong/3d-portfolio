import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { SectionId } from '../types';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { SoundEngine } from '../Experience/SoundEngine';

interface TerminalModalProps {
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: string | React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ onClose, onNavigate }) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'welcome-1',
      command: 'system.boot',
      output: 'SARANG R N — Interactive Terminal OS v1.0.0 [Ready]'
    },
    {
      id: 'welcome-2',
      command: 'help',
      output: 'Type a command: help, about, skills, projects, education, resume, contact, whoami, coffee, clear, exit'
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    SoundEngine.getInstance().playKey();

    if (e.key === 'Enter') {
      const trimmed = inputVal.trim().toLowerCase();
      if (!trimmed) return;

      processCommand(trimmed);
      setInputVal('');
    }
  };

  const processCommand = (cmd: string) => {
    const id = Math.random().toString(36).substring(7);

    switch (cmd) {
      case 'help':
        setLogs(prev => [
          ...prev,
          {
            id,
            command: cmd,
            output: (
              <div className="space-y-1">
                <div>AVAILABLE COMMANDS:</div>
                <div className="text-sky-300">
                  <span className="font-bold">about</span> - Navigate to candidate overview
                </div>
                <div className="text-sky-300">
                  <span className="font-bold">skills</span> - Inspect verified technical proficiencies
                </div>
                <div className="text-sky-300">
                  <span className="font-bold">projects</span> - View academic and software implementations
                </div>
                <div className="text-sky-300">
                  <span className="font-bold">education</span> - Display CUSAT degree credentials
                </div>
                <div className="text-sky-300">
                  <span className="font-bold">resume</span> - Open full digital CV
                </div>
                <div className="text-sky-300">
                  <span className="font-bold">contact</span> - Direct email & phone channels
                </div>
                <div className="text-sky-300">
                  <span className="font-bold">whoami</span> - Print verified developer identity
                </div>
                <div className="text-sky-300">
                  <span className="font-bold">coffee</span> - Brew developer fuel
                </div>
                <div className="text-sky-300">
                  <span className="font-bold">clear</span> - Clear terminal window
                </div>
                <div className="text-sky-300">
                  <span className="font-bold">exit</span> - Close terminal console
                </div>
              </div>
            )
          }
        ]);
        break;

      case 'about':
        onNavigate('about');
        setLogs(prev => [
          ...prev,
          { id, command: cmd, output: 'Navigating camera to 01 ABOUT...' }
        ]);
        break;

      case 'skills':
        onNavigate('skills');
        setLogs(prev => [
          ...prev,
          { id, command: cmd, output: 'Navigating camera to 02 SKILLS...' }
        ]);
        break;

      case 'projects':
        onNavigate('projects');
        setLogs(prev => [
          ...prev,
          { id, command: cmd, output: 'Navigating camera to 03 PROJECTS...' }
        ]);
        break;

      case 'education':
        onNavigate('education');
        setLogs(prev => [
          ...prev,
          { id, command: cmd, output: 'Navigating camera to 04 EDUCATION...' }
        ]);
        break;

      case 'resume':
        onNavigate('resume');
        setLogs(prev => [
          ...prev,
          { id, command: cmd, output: 'Opening 05 DIGITAL RESUME...' }
        ]);
        break;

      case 'contact':
        onNavigate('contact');
        setLogs(prev => [
          ...prev,
          { id, command: cmd, output: 'Navigating camera to 06 CONTACT...' }
        ]);
        break;

      case 'whoami':
        setLogs(prev => [
          ...prev,
          {
            id,
            command: cmd,
            output: `${PERSONAL_DATA.name} | ${PERSONAL_DATA.primaryTitle} | ${PERSONAL_DATA.secondaryTitle}`
          }
        ]);
        break;

      case 'sudo portfolio':
      case 'sudo':
        setLogs(prev => [
          ...prev,
          { id, command: cmd, output: 'Nice try. Root access is strictly reserved for the developer.' }
        ]);
        break;

      case 'coffee':
        setLogs(prev => [
          ...prev,
          { id, command: cmd, output: '☕ Developer fuel initialized. Syntax errors mitigated by 80%.' }
        ]);
        break;

      case 'clear':
        setLogs([]);
        break;

      case 'exit':
      case 'quit':
        onClose();
        break;

      default:
        setLogs(prev => [
          ...prev,
          {
            id,
            command: cmd,
            output: `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`
          }
        ]);
        break;
    }
  };

  return (
    <div
      id="terminal-modal-container"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in"
    >
      <div
        id="terminal-modal"
        className="relative w-full max-w-2xl h-[520px] flex flex-col bg-[#050811] border border-slate-800 rounded-xl shadow-2xl font-mono text-xs text-slate-200 overflow-hidden"
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0b101d] border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-slate-400 pl-2 flex items-center space-x-1">
              <TerminalIcon size={13} className="text-sky-400" />
              <span>SARANG@PORTFOLIO:~$</span>
            </span>
          </div>

          <button
            id="terminal-close-button"
            onClick={() => {
              SoundEngine.getInstance().playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Console History Output */}
        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              <div className="flex items-center space-x-2 text-sky-400">
                <span className="text-emerald-400 font-bold">sarang@dev:~$</span>
                <span>{log.command}</span>
              </div>
              <div className="text-slate-300 pl-4 border-l border-slate-800">
                {log.output}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Input Line */}
        <div className="px-4 py-3 bg-[#070b14] border-t border-slate-800 flex items-center space-x-2">
          <span className="text-emerald-400 font-bold">sarang@dev:~$</span>
          <input
            ref={inputRef}
            id="terminal-input"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or any section..."
            className="flex-1 bg-transparent border-none outline-none text-sky-300 font-mono text-xs focus:ring-0"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};
