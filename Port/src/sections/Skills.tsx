import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { SkillGroup } from '../components/SkillGroup';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        badge="Proof of Work"
        title="Technical Arsenal & Tooling"
        description="Every technology listed here has been applied directly in production architectures, backend services, or autonomous platforms."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {PORTFOLIO_CONTENT.skills.map((category, idx) => (
          <SkillGroup key={category.title} category={category} index={idx} />
        ))}
      </div>

      {/* Currently Learning / Next Frontier Radar */}
      {PORTFOLIO_CONTENT.currentlyLearning && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/[0.04] via-indigo-500/[0.04] to-blue-500/[0.04] border border-indigo-500/20 dark:border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Active Exploration & Engineering Radar</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Areas where I am actively writing code, benchmarking models, and reading papers:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {PORTFOLIO_CONTENT.currentlyLearning.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs"
              >
                <span>{item}</span>
                <ArrowUpRight className="w-3 h-3 text-indigo-500" />
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
};
