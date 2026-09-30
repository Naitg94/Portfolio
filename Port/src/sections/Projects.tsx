import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Layers } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';

type FilterType = 'all' | 'ai' | 'web';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking across the sticky card stack container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate dynamic category counts
  const totalCount = PORTFOLIO_CONTENT.projects.length;
  const aiCount = PORTFOLIO_CONTENT.projects.filter(
    (p) =>
      p.category.toLowerCase().includes('ai') ||
      p.category.toLowerCase().includes('intelligence') ||
      p.technologies.some((t) => t.toLowerCase().includes('ai'))
  ).length;

  const webCount = PORTFOLIO_CONTENT.projects.filter(
    (p) =>
      p.category.toLowerCase().includes('web') ||
      p.category.toLowerCase().includes('finance') ||
      p.category.toLowerCase().includes('business') ||
      p.category.toLowerCase().includes('full-stack')
  ).length;

  const filteredProjects = PORTFOLIO_CONTENT.projects.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'ai') {
      return (
        project.category.toLowerCase().includes('ai') ||
        project.category.toLowerCase().includes('intelligence') ||
        project.technologies.some((t) => t.toLowerCase().includes('ai'))
      );
    }
    if (filter === 'web') {
      return (
        project.category.toLowerCase().includes('web') ||
        project.category.toLowerCase().includes('finance') ||
        project.category.toLowerCase().includes('business') ||
        project.category.toLowerCase().includes('full-stack')
      );
    }
    return true;
  });

  const handleFilterClick = (newFilter: FilterType) => {
    if (filter === newFilter) return;
    setFilter(newFilter);

    // Gently scroll to projects heading if user was deep down in the stack
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      const rect = projectsEl.getBoundingClientRect();
      if (rect.top < 0) {
        projectsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const filterOptions: { id: FilterType; label: string; count: number }[] = [
    { id: 'all', label: 'All Projects', count: totalCount },
    { id: 'ai', label: 'AI & Autonomous', count: aiCount },
    { id: 'web', label: 'Web Applications', count: webCount },
  ];

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        badge="Portfolio"
        title="Featured Projects"
        description="Production web applications, autonomous AI platforms, and real-world software implementations presented in an interactive card deck."
      />

      {/* Floating Filter Chip Bar */}
      <div className="sticky top-16 sm:top-20 z-40 flex flex-col items-center justify-center gap-3 mb-10 sm:mb-14">
        <div className="inline-flex p-1.5 rounded-2xl bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg shadow-zinc-900/5 dark:shadow-black/30">
          {filterOptions.map((opt) => {
            const isActive = filter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleFilterClick(opt.id)}
                className={`relative px-3.5 sm:px-4 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 select-none ${
                  isActive
                    ? 'text-zinc-900 dark:text-zinc-50 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterChip"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700/80 shadow-2xs"
                  />
                )}
                <span className="relative z-10">{opt.label}</span>
                <span
                  className={`relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-zinc-200/80 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100'
                      : 'bg-zinc-100 dark:bg-zinc-800/70 text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Deck Navigation Hint */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 dark:text-zinc-500 tracking-wide">
          <Layers className="w-3.5 h-3.5 text-indigo-500" />
          <span>Stacked Sticky Deck · Scroll to flip through cards</span>
        </div>
      </div>

      {/* Stacked Sticky Card Deck Container */}
      <div ref={containerRef} className="relative pt-2 pb-16 sm:pb-24">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              total={filteredProjects.length}
              progress={scrollYProgress}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
