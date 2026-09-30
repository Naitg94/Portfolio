import React from 'react';
import { motion } from 'framer-motion';
import type { SkillCategory } from '../data/content';
import { Code, Brain, Layout, Wrench } from 'lucide-react';

interface SkillGroupProps {
  category: SkillCategory;
  index: number;
}

export const SkillGroup: React.FC<SkillGroupProps> = ({ category, index }) => {
  const getCategoryIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'languages':
        return <Code className="w-5 h-5 text-indigo-500" />;
      case 'ai & intelligent systems':
        return <Brain className="w-5 h-5 text-purple-500" />;
      case 'web & full-stack':
        return <Layout className="w-5 h-5 text-blue-500" />;
      case 'tools & platforms':
        return <Wrench className="w-5 h-5 text-emerald-500" />;
      default:
        return <Code className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 shadow-xs hover:shadow-md"
    >
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 group-hover:scale-105 transition-transform duration-300">
            {getCategoryIcon(category.title)}
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {category.title}
            </h3>
          </div>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Proof-Backed Skill Chips */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
        {category.skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col gap-1 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/60 hover:border-indigo-400 dark:hover:border-indigo-500/70 transition-all duration-150"
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>{skill.name}</span>
            </div>

            {skill.usedIn && skill.usedIn.length > 0 && (
              <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 pl-3">
                ↳ {skill.usedIn.join(' · ')}
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
