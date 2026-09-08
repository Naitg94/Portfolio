import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers3, ExternalLink, CheckCircle2, ChevronRight, Layers, Sparkles, Trophy } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';
import { soundFx } from '../utils/sound';

export const ProjectDatabase: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS[0].id);

  // Gamification: LocalStorage-persisted explored projects tracking across all 4 projects
  const [exploredProjects, setExploredProjects] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('naitik_os_explored_projects');
      const parsed = saved ? JSON.parse(saved) : [PROJECTS[0].id];
      // Ensure all valid stored IDs exist in current PROJECTS
      return Array.isArray(parsed) ? parsed.filter((id) => PROJECTS.some((p) => p.id === id)) : [PROJECTS[0].id];
    } catch {
      return [PROJECTS[0].id];
    }
  });

  const selectedProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  useEffect(() => {
    // Automatically mark the currently viewed project as explored
    if (!exploredProjects.includes(selectedProjectId)) {
      const updated = [...exploredProjects, selectedProjectId];
      setExploredProjects(updated);
      try {
        localStorage.setItem('naitik_os_explored_projects', JSON.stringify(updated));
      } catch {}
    }
  }, [selectedProjectId, exploredProjects]);

  const handleSelectProject = (project: Project) => {
    soundFx.playClick();
    setSelectedProjectId(project.id);

    if (!exploredProjects.includes(project.id)) {
      const updated = [...exploredProjects, project.id];
      setExploredProjects(updated);
      try {
        localStorage.setItem('naitik_os_explored_projects', JSON.stringify(updated));
      } catch {}

      // If all 4 projects are now explored, trigger unlock sound
      if (updated.length === PROJECTS.length) {
        soundFx.playUnlock();
      }
    }
  };

  const handleLaunch = (url: string) => {
    soundFx.playUnlock();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const isAllExplored = exploredProjects.length === PROJECTS.length;

  return (
    <section id="projects" className="py-20 px-4 relative z-10 max-w-6xl mx-auto">
      {/* Section Title & Exploration HUD */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-[#35E5FF] rounded-full shadow-[0_0_10px_#35E5FF]" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-wider flex items-center gap-3">
              <span>PROJECT DATABASE</span>
              <Layers3 className="w-5 h-5 text-[#35E5FF]" />
            </h2>
            <p className="text-xs font-mono text-slate-400">Interactive Project Console & Verified Deployments</p>
          </div>
        </div>

        {/* Gamification Exploration Badge */}
        <div className="px-3.5 py-1.5 rounded-full cyber-glass border border-[#35E5FF]/30 text-xs font-mono text-[#35E5FF] flex items-center gap-2 shadow-[0_0_15px_rgba(53,229,255,0.15)]">
          <span className={`w-2 h-2 rounded-full ${isAllExplored ? 'bg-emerald-400' : 'bg-[#35E5FF] animate-pulse'}`} />
          <span>{exploredProjects.length}/{PROJECTS.length} PROJECTS EXPLORED</span>
          {isAllExplored && (
            <span className="text-emerald-400 font-bold ml-1 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>[PROJECT ARCHIVIST]</span>
            </span>
          )}
        </div>
      </div>

      {/* Grid: Project Selector List (Left) + Expanded Project Brief (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Project Selection Console */}
        <div className="lg:col-span-4 space-y-4">
          <div className="text-xs font-mono text-slate-400 px-1 uppercase tracking-widest flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#35E5FF]" />
              <span>PROJECT INDEX</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              {exploredProjects.length}/{PROJECTS.length} VISITED
            </span>
          </div>

          {PROJECTS.map((project) => {
            const isSelected = project.id === selectedProjectId;
            const isExplored = exploredProjects.includes(project.id);

            return (
              <motion.button
                key={project.id}
                onClick={() => handleSelectProject(project)}
                onMouseEnter={() => soundFx.playHover()}
                whileHover={{ x: 4 }}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer font-mono relative overflow-hidden ${
                  isSelected
                    ? 'cyber-glass border-[#35E5FF] bg-gradient-to-r from-[#35E5FF]/20 via-[#0A1020] to-[#0A1020] shadow-[0_0_25px_rgba(53,229,255,0.25)]'
                    : 'cyber-glass border-[#35E5FF]/20 hover:border-[#35E5FF]/50 text-slate-300'
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#35E5FF] shadow-[0_0_10px_#35E5FF]" />
                )}

                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="text-[#35E5FF] font-bold">{project.code}</span>
                  <span className={`flex items-center gap-1 ${isExplored ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{isExplored ? 'EXPLORED' : project.status}</span>
                  </span>
                </div>

                <div className="text-base font-bold font-heading text-white tracking-wide mb-1">
                  {project.name}
                </div>

                <div className="text-xs text-slate-400 truncate">
                  {project.category}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Column: Detailed Project Brief Panel */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="cyber-glass p-6 sm:p-8 rounded-2xl border border-[#35E5FF]/40 space-y-6 shadow-2xl relative cyber-border-corner bg-gradient-to-b from-[#0A1020] to-[#05070D]"
            >
              {/* Project Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#35E5FF]/20 pb-4 font-mono">
                <div>
                  <div className="text-xs font-bold text-[#35E5FF] tracking-widest uppercase">
                    {selectedProject.code} // {selectedProject.category}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-wide mt-1">
                    {selectedProject.name}
                  </h3>
                </div>

                {selectedProject.status && (
                  <div className="flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>STATUS: {selectedProject.status}</span>
                  </div>
                )}
              </div>

              {/* Project Objective */}
              {selectedProject.objective && (
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#35E5FF] font-semibold tracking-wider uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>PROJECT OBJECTIVE</span>
                  </div>
                  <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed bg-[#080C16] p-4 rounded-xl border border-[#35E5FF]/20">
                    {selectedProject.objective}
                  </p>
                </div>
              )}

              {/* Description & Key Highlights */}
              {(selectedProject.description || (selectedProject.highlights && selectedProject.highlights.length > 0)) && (
                <div className="space-y-3 font-sans">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    PROJECT BRIEF & SYSTEM FEATURES
                  </div>
                  {selectedProject.description && (
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedProject.description}
                    </p>
                  )}

                  {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {selectedProject.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 font-mono">
                          <ChevronRight className="w-4 h-4 text-[#35E5FF] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Repository Overview (when no description / objective provided) */}
              {!selectedProject.objective && !selectedProject.description && (
                <div className="space-y-3 font-mono">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    REPOSITORY OVERVIEW
                  </div>
                  <div className="bg-[#080C16] p-4 rounded-xl border border-[#35E5FF]/20 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-2">
                    <div className="text-[#35E5FF] font-semibold">GitHub Repository Reference</div>
                    <p className="text-slate-400">
                      Source code repository available on GitHub. Verified project details, features, and technology stack have not been provided yet.
                    </p>
                    <div className="text-[11px] text-slate-500 truncate pt-1">
                      Repository: {selectedProject.githubUrl}
                    </div>
                  </div>
                </div>
              )}

              {/* Tech Stack Badges */}
              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#35E5FF]/20 font-mono">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    SYSTEM TECHNOLOGIES
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-[#35E5FF]/10 text-[#35E5FF] border border-[#35E5FF]/30 text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-[#35E5FF]/20 font-mono">
                {/* Live Project Launch Button */}
                {selectedProject.liveUrl && (
                  <button
                    onClick={() => handleLaunch(selectedProject.liveUrl!)}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#35E5FF] to-[#4DA3FF] text-[#05070D] font-bold text-xs tracking-wider hover:shadow-[0_0_25px_#35E5FF] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>
                      {selectedProject.id === 'revora'
                        ? '▶ VIEW LIVE PROJECT'
                        : selectedProject.id === 'tree-plantation'
                        ? '▶ LAUNCH PROJECT'
                        : selectedProject.id === 'expense-tracker'
                        ? '▶ EXPLORE APPLICATION'
                        : '▶ VISIT PROJECT'}
                    </span>
                  </button>
                )}

                {/* GitHub Source Code Button */}
                {selectedProject.githubUrl && (
                  <button
                    onClick={() => handleLaunch(selectedProject.githubUrl)}
                    className={`w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      !selectedProject.liveUrl
                        ? 'bg-gradient-to-r from-[#35E5FF] to-[#4DA3FF] text-[#05070D] hover:shadow-[0_0_25px_#35E5FF]'
                        : 'cyber-glass border border-[#35E5FF]/40 text-slate-200 hover:text-[#35E5FF] hover:border-[#35E5FF]'
                    }`}
                  >
                    <GithubIcon className={`w-4 h-4 ${!selectedProject.liveUrl ? 'text-[#05070D]' : 'text-[#35E5FF]'}`} />
                    <span>
                      &lt; &gt; {selectedProject.id === 'mplads-sentinels' ? 'VIEW SOURCE CODE' : selectedProject.id === 'revora' ? 'VIEW ON GITHUB' : 'VIEW SOURCE'}
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
