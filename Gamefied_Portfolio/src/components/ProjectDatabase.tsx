import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers3, ExternalLink, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';
import { soundFx } from '../utils/sound';

export const ProjectDatabase: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS[0].id);

  const selectedProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  const handleSelectProject = (project: Project) => {
    soundFx.playClick();
    setSelectedProjectId(project.id);
  };

  const handleLaunch = (url: string) => {
    soundFx.playUnlock();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const hasDistinctLiveDemo = selectedProject.liveUrl && selectedProject.liveUrl !== selectedProject.githubUrl;

  return (
    <section id="projects" className="py-20 px-4 relative z-10 max-w-6xl mx-auto">
      {/* Section Title */}
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

        <div className="px-3 py-1 rounded-full cyber-glass border border-[#35E5FF]/30 text-xs font-mono text-[#35E5FF] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#35E5FF] animate-pulse" />
          <span>{PROJECTS.length} PROJECTS DEPLOYED</span>
        </div>
      </div>

      {/* Grid: Project Selector List (Left) + Expanded Project Brief (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Project Selection Console */}
        <div className="lg:col-span-4 space-y-4">
          <div className="text-xs font-mono text-slate-400 px-1 uppercase tracking-widest flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#35E5FF]" />
            <span>PROJECT INDEX</span>
          </div>

          {PROJECTS.map((project) => {
            const isSelected = project.id === selectedProjectId;
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
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    {project.status}
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

                <div className="flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>STATUS: {selectedProject.status}</span>
                </div>
              </div>

              {/* Project Objective */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#35E5FF] font-semibold tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PROJECT OBJECTIVE</span>
                </div>
                <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed bg-[#080C16] p-4 rounded-xl border border-[#35E5FF]/20">
                  {selectedProject.objective}
                </p>
              </div>

              {/* Description & Key Highlights */}
              <div className="space-y-3 font-sans">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  PROJECT BRIEF & SYSTEM FEATURES
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="space-y-2 pt-2">
                  {selectedProject.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 font-mono">
                      <ChevronRight className="w-4 h-4 text-[#35E5FF] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Badges */}
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

              {/* Project Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-[#35E5FF]/20 font-mono">
                {hasDistinctLiveDemo && (
                  <button
                    onClick={() => handleLaunch(selectedProject.liveUrl)}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#35E5FF] to-[#4DA3FF] text-[#05070D] font-bold text-xs tracking-wider hover:shadow-[0_0_25px_#35E5FF] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>
                      {selectedProject.id === 'tree-plantation'
                        ? '▶ LAUNCH PROJECT'
                        : selectedProject.id === 'expense-tracker'
                        ? '▶ EXPLORE APPLICATION'
                        : '▶ VISIT PROJECT'}
                    </span>
                  </button>
                )}

                <button
                  onClick={() => handleLaunch(selectedProject.githubUrl)}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    !hasDistinctLiveDemo
                      ? 'bg-gradient-to-r from-[#35E5FF] to-[#4DA3FF] text-[#05070D] hover:shadow-[0_0_25px_#35E5FF]'
                      : 'cyber-glass border border-[#35E5FF]/40 text-slate-200 hover:text-[#35E5FF] hover:border-[#35E5FF]'
                  }`}
                >
                  <GithubIcon className={`w-4 h-4 ${!hasDistinctLiveDemo ? 'text-[#05070D]' : 'text-[#35E5FF]'}`} />
                  <span>&lt; &gt; {selectedProject.id === 'revora' ? 'VIEW ON GITHUB (REVORA)' : 'VIEW SOURCE'}</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
