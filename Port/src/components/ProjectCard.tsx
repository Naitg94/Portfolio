import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { ExternalLink, Sparkles, Check, ChevronDown, ChevronUp, AlertCircle, Cpu, TrendingUp } from 'lucide-react';
import type { Project } from '../data/content';
import { GithubIcon } from './Icons';
import { cn } from '../lib/utils';

export interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

/**
 * Calculates strictly-monotonic input ranges and corresponding scales & overlay opacities
 * for each card based on its position in the stack.
 */
function getCardStackTransforms(index: number, total: number) {
  if (total <= 1 || index >= total - 1) {
    return {
      range: [0, 1],
      scale: [1, 1],
      overlay: [0, 0],
    };
  }

  const step = 1 / (total - 1);
  const startCover = Math.max(0, index * step);
  const fullCover = Math.min(1, (index + 1) * step);

  const depth = total - 1 - index;
  const targetScale = Math.max(0.88, 1 - depth * 0.025);
  const targetOverlay = Math.min(0.55, 0.22 + depth * 0.07);

  // If first card (startCover = 0)
  if (startCover <= 0.001) {
    return {
      range: [0, fullCover, 1],
      scale: [1, 0.95, targetScale],
      overlay: [0, 0.3, targetOverlay],
    };
  }

  // If second to last card (fullCover = 1)
  if (fullCover >= 0.999) {
    return {
      range: [0, startCover, 1],
      scale: [1, 1, 0.95],
      overlay: [0, 0, 0.3],
    };
  }

  return {
    range: [0, startCover, fullCover, 1],
    scale: [1, 1, 0.95, targetScale],
    overlay: [0, 0, 0.3, targetOverlay],
  };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
  progress,
}) => {
  // Case study accordion open state — default first card open on initial load
  const [showCaseStudy, setShowCaseStudy] = useState(index === 0 && project.featured);
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate dynamic stacking transforms
  const transforms = useMemo(() => getCardStackTransforms(index, total), [index, total]);
  const scale = useTransform(progress, transforms.range, transforms.scale);
  const overlayOpacity = useTransform(progress, transforms.range, transforms.overlay);

  // 3D Tilt motion values (subtle, active primarily on the topmost card)
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 280, damping: 22 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    setGlarePos({ x: percentX, y: percentY });

    // Subtle 2.2 degree max tilt to avoid overlapping adjacent stacked cards
    rotateX.set(((y - centerY) / centerY) * -2.2);
    rotateY.set(((x - centerX) / centerX) * 2.2);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleDeckTabClick = () => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Dynamic top offset calculation:
  // Base offset gives clearance below navbar
  // Stacking step ensures previous cards' header tabs remain peekable
  const stepDesktop = total <= 4 ? 26 : total <= 7 ? 20 : Math.max(12, Math.floor(140 / total));
  const stepMobile = total <= 4 ? 18 : total <= 7 ? 14 : Math.max(8, Math.floor(90 / total));

  const dynamicTop = `clamp(${68 + index * stepMobile}px, ${84 + index * stepDesktop}px, ${100 + index * stepDesktop}px)`;

  return (
    <motion.div
      layout
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -24 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="sticky mb-[20vh] sm:mb-[28vh] last:mb-0 w-full max-w-4xl mx-auto will-change-transform"
      style={{
        top: dynamicTop,
        zIndex: index + 10,
      }}
    >
      <motion.article
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          scale,
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformPerspective: 1000,
          transformOrigin: 'top center',
        }}
        className={cn(
          'group relative flex flex-col rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800/90 shadow-xl hover:shadow-2xl transition-[border-color,box-shadow] duration-300 hover:border-zinc-400/80 dark:hover:border-zinc-700/80 overflow-hidden'
        )}
      >
        {/* Dynamic Specular Glare Effect on Hover */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(450px circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.08), transparent 70%)`,
            }}
          />
        )}

        {/* Dynamic Darkening Overlay for cards underneath in the stack */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 z-20 bg-zinc-950/70 dark:bg-black/85 backdrop-blur-[0.5px] rounded-2xl transition-colors duration-200"
        />

        {/* Deck Tab Bar — peeks out at the top as cards stack over each other */}
        <div
          onClick={handleDeckTabClick}
          className="flex items-center justify-between px-5 sm:px-7 py-2.5 bg-zinc-100/95 dark:bg-zinc-900/95 border-b border-zinc-200/80 dark:border-zinc-800/80 cursor-pointer select-none transition-colors hover:bg-zinc-200/70 dark:hover:bg-zinc-800/70"
          title="Click to bring this card to top"
        >
          <div className="flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full shadow-xs"
              style={{ backgroundColor: project.accentColor }}
            />
            <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 tracking-tight">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {project.category.split('·')[0].trim()}
            </span>
            {project.featured && (
              <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                FLAGSHIP
              </span>
            )}
          </div>
        </div>

        {/* Project Header & Banner */}
        <div className="relative p-6 sm:p-7 bg-gradient-to-br from-zinc-50 via-zinc-100/40 to-zinc-200/30 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 border-b border-zinc-200/70 dark:border-zinc-800/80">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-15 pointer-events-none" />

          {/* Ambient colored glow matching project accent */}
          <div
            className="absolute -top-10 -right-10 w-64 h-64 rounded-full blur-3xl opacity-20 dark:opacity-25 pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
            style={{ backgroundColor: project.accentColor }}
          />

          <div className="relative z-10 space-y-4">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/90 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xs font-medium">
                  {project.category}
                </span>

                {project.featured && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80 shadow-2xs">
                    <Sparkles className="w-3 h-3" />
                    <span>Flagship Case Study</span>
                  </span>
                )}
              </div>

              {/* Monogram badge */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-zinc-200/80 dark:border-zinc-700/60 bg-white dark:bg-zinc-800 shadow-2xs group-hover:scale-105 transition-transform shrink-0"
                style={{ color: project.accentColor }}
              >
                <span className="text-sm font-bold font-mono">
                  {project.title.slice(0, 2).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        {/* Card Body: Case Study Accordion, Highlights, Tech Stack & Action Links */}
        <div className="p-6 sm:p-7 space-y-6">
          {/* Accessible Collapsible Case Study Accordion */}
          {project.problem && project.approach && project.result && (
            <div className="space-y-3">
              <button
                type="button"
                id={`case-study-btn-${project.id}`}
                aria-expanded={showCaseStudy}
                aria-controls={`case-study-panel-${project.id}`}
                onClick={() => setShowCaseStudy(!showCaseStudy)}
                className="flex items-center justify-between w-full text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold py-2 px-3 rounded-lg hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <span className="flex items-center gap-2">
                  <span>Case Study Breakdown</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800">
                    {showCaseStudy ? 'Collapse' : 'Expand'}
                  </span>
                </span>
                {showCaseStudy ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence initial={false}>
                {showCaseStudy && (
                  <motion.div
                    id={`case-study-panel-${project.id}`}
                    role="region"
                    aria-labelledby={`case-study-btn-${project.id}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-3 overflow-hidden pt-1"
                  >
                    {/* The Problem */}
                    <div className="p-4 rounded-xl bg-amber-500/[0.05] dark:bg-amber-500/[0.08] border border-amber-500/20 text-xs sm:text-sm space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400 font-mono text-[11px] uppercase tracking-wider">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>The Problem & Friction</span>
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    {/* Technical Architecture */}
                    <div className="p-4 rounded-xl bg-indigo-500/[0.05] dark:bg-indigo-500/[0.08] border border-indigo-500/20 text-xs sm:text-sm space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-400 font-mono text-[11px] uppercase tracking-wider">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Technical Architecture & Approach</span>
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {project.approach}
                      </p>
                    </div>

                    {/* Tangible Result */}
                    <div className="p-4 rounded-xl bg-emerald-500/[0.05] dark:bg-emerald-500/[0.08] border border-emerald-500/20 text-xs sm:text-sm space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 font-mono text-[11px] uppercase tracking-wider">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>Tangible Result & Impact</span>
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                        {project.result}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Verified Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Verified Implementation Highlights
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <Check className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Area: Tech Stack Badges & Action Links */}
          <div className="space-y-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-md group/link cursor-pointer"
                >
                  <span>Live Production App</span>
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700/80 cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              ) : (
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 py-1">
                  Private Enterprise Repo
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};
