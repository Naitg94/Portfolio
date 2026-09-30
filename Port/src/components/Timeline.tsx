import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import type { TimelineItem } from '../data/content';
import { cn } from '../lib/utils';

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const getItemIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-4 h-4 text-indigo-500" />;
      case 'certification':
        return <Award className="w-4 h-4 text-emerald-500" />;
      case 'experience':
        return <Briefcase className="w-4 h-4 text-blue-500" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-amber-500" />;
      default:
        return <GraduationCap className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="relative pl-6 sm:pl-8 space-y-10 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          className="relative group"
        >
          {/* Timeline Dot Indicator */}
          <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 flex items-center justify-center group-hover:border-indigo-500 dark:group-hover:border-indigo-400 transition-colors shadow-2xs">
            {getItemIcon(item.type)}
          </div>

          {/* Timeline Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 shadow-xs hover:shadow-md space-y-3">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                  {item.organization}
                </span>
                <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {item.badge && (
                  <span
                    className={cn(
                      'text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border',
                      item.type === 'certification'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 font-semibold'
                        : item.type === 'education'
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                    )}
                  >
                    {item.badge}
                  </span>
                )}

                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  {item.date}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {item.description}
            </p>

            {/* Bullet details */}
            {item.details && item.details.length > 0 && (
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 space-y-1.5">
                {item.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5 opacity-80" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Applied Technologies */}
            {item.technologies && item.technologies.length > 0 && (
              <div className="pt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mr-1">
                  Stack:
                </span>
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
