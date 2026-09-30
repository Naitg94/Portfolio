import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Mail, Sparkles, MapPin, ShieldCheck, Terminal, Layers, Cpu } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { MagneticButton } from '../components/MagneticButton';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for subtle 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle 3D perspective transforms
  const rotateX = useTransform(smoothY, [-300, 300], [4, -4]);
  const rotateY = useTransform(smoothX, [-300, 300], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    mouseX.set(x - centerX);
    mouseY.set(y - centerY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const getSocialIcon = (icon: 'github' | 'linkedin' | 'email') => {
    switch (icon) {
      case 'github':
        return <GithubIcon className="w-4 h-4" />;
      case 'linkedin':
        return <LinkedinIcon className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="about"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern"
    >
      {/* Dynamic Cursor-reactive Ambient Spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-500 hidden md:block"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.12), transparent 70%)`,
          }}
        />
      )}

      {/* Atmospheric ambient gradients with smooth depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-purple-600/15 via-indigo-500/10 to-blue-500/8 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse duration-1000" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[280px] bg-gradient-to-bl from-blue-500/12 via-indigo-600/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 3D Tilted Content Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        className="max-w-4xl mx-auto text-center space-y-7 z-10 will-change-transform"
      >
        {/* Availability & Location Pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/85 dark:bg-zinc-900/85 border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xs backdrop-blur-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
            {PORTFOLIO_CONTENT.statusBadge}
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
            <MapPin className="w-3 h-3 text-indigo-500" />
            <span>{PORTFOLIO_CONTENT.location}</span>
          </span>
        </motion.div>

        {/* Title, Monogram & Identity */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.08]">
            Hi, I'm{' '}
            <span className="text-gradient-animated">
              {PORTFOLIO_CONTENT.name}
            </span>
          </h1>

          {/* Precision Role & Focus */}
          <div className="inline-flex items-center justify-center gap-2 text-base sm:text-xl font-semibold text-zinc-700 dark:text-zinc-200">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>{PORTFOLIO_CONTENT.role}</span>
          </div>
        </motion.div>

        {/* Value-Driven Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          {PORTFOLIO_CONTENT.valueProp}
        </motion.p>

        {/* Tangible Proof Metrics Bar — Concrete Evidence Over Buzzwords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2 text-left"
        >
          {/* Card 1 */}
          <div className="group/metric p-3.5 rounded-xl bg-white/75 dark:bg-zinc-900/65 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5">
            <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-mono font-medium mb-1">
              <Terminal className="w-3.5 h-3.5 group-hover/metric:rotate-6 transition-transform" />
              <span>PRODUCTION</span>
            </div>
            <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              5 Deployed Apps
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Live on Vercel & Web
            </div>
          </div>

          {/* Card 2 */}
          <div className="group/metric p-3.5 rounded-xl bg-white/75 dark:bg-zinc-900/65 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5">
            <div className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-mono font-medium mb-1">
              <ShieldCheck className="w-3.5 h-3.5 group-hover/metric:rotate-6 transition-transform" />
              <span>AI ENGINES</span>
            </div>
            <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              4-Tier Guardrails
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Circuit-breaker controls
            </div>
          </div>

          {/* Card 3 */}
          <div className="group/metric p-3.5 rounded-xl bg-white/75 dark:bg-zinc-900/65 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-mono font-medium mb-1">
              <Cpu className="w-3.5 h-3.5 group-hover/metric:rotate-6 transition-transform" />
              <span>NLP & VOICE</span>
            </div>
            <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Trilingual Voice
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
              EN · HI · Hinglish Copilot
            </div>
          </div>

          {/* Card 4 */}
          <div className="group/metric p-3.5 rounded-xl bg-white/75 dark:bg-zinc-900/65 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5">
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono font-medium mb-1">
              <Layers className="w-3.5 h-3.5 group-hover/metric:rotate-6 transition-transform" />
              <span>STACK RIGOR</span>
            </div>
            <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Full-Stack TS
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Next.js + FastAPI + SQL
            </div>
          </div>
        </motion.div>

        {/* Magnetic Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3"
        >
          <MagneticButton strength={0.3}>
            <button
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </MagneticButton>

          <MagneticButton strength={0.3}>
            <a
              href={`mailto:${PORTFOLIO_CONTENT.email}?subject=Project%20or%20Internship%20Inquiry%20via%20Portfolio`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 shadow-2xs cursor-pointer"
            >
              <Mail className="w-4 h-4 text-indigo-500" />
              <span>Direct Email ({PORTFOLIO_CONTENT.email})</span>
            </a>
          </MagneticButton>

          <MagneticButton strength={0.3}>
            <a
              href="https://github.com/Naitg94"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-zinc-100 text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Profile</span>
            </a>
          </MagneticButton>
        </motion.div>

        {/* Small Social Icon Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex items-center justify-center gap-3 pt-2"
        >
          {PORTFOLIO_CONTENT.socials.map((social) => (
            <MagneticButton key={social.label} strength={0.4}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs block"
                aria-label={social.label}
                title={social.label}
              >
                {getSocialIcon(social.icon)}
              </a>
            </MagneticButton>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Down Prompt */}
      <motion.button
        onClick={() => scrollToSection('projects')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 0.8 }, y: { repeat: Infinity, duration: 2.2 } }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer p-2"
        aria-label="Scroll to Projects section"
      >
        <ArrowDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
};
