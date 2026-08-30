import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Building2, Calendar, BookOpen, Clock } from 'lucide-react';
import { EDUCATION } from '../data/portfolioData';

export const EducationNode: React.FC = () => {
  return (
    <section id="education" className="py-20 px-4 relative z-10 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-1.5 h-8 bg-[#4DA3FF] rounded-full shadow-[0_0_10px_#4DA3FF]" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-wider flex items-center gap-3">
            <span>EDUCATION DATABASE</span>
            <GraduationCap className="w-5 h-5 text-[#4DA3FF]" />
          </h2>
          <p className="text-xs font-mono text-slate-400">Academic System Node & Specialization Parameters</p>
        </div>
      </div>

      {/* Main Education Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="cyber-glass p-8 rounded-2xl border border-[#35E5FF]/30 space-y-6 shadow-2xl relative cyber-border-corner"
      >
        {/* Degree & Duration Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#35E5FF]/20 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-[#35E5FF] font-semibold tracking-wider">
              PRIMARY ACADEMIC PROGRAM
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
              {EDUCATION.degree}
            </h3>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#35E5FF]/10 border border-[#35E5FF]/30 text-xs font-mono text-[#35E5FF] font-bold">
            <Calendar className="w-4 h-4" />
            <span>{EDUCATION.duration}</span>
          </div>
        </div>

        {/* Institution & Academic Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#4DA3FF]" />
              <span>INSTITUTION</span>
            </div>
            <div className="text-base font-bold text-slate-100">
              {EDUCATION.institution}
            </div>
            <div className="text-xs text-slate-400">Bhilai, Chhattisgarh</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#8D7BFF]" />
              <span>CURRENT ACADEMIC STATUS</span>
            </div>
            <div className="text-base font-bold text-[#35E5FF]">
              {EDUCATION.semester.toUpperCase()}
            </div>
            <div className="text-xs text-slate-400">Computer Science Engineering (AI & ML)</div>
          </div>
        </div>

        {/* Current Focus Areas */}
        <div className="space-y-3 pt-4 border-t border-[#35E5FF]/20 font-mono">
          <div className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#8D7BFF]" />
            <span>CURRENT ACADEMIC FOCUS AREAS</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {EDUCATION.currentFocus.map((focus) => (
              <span
                key={focus}
                className="px-3 py-1 rounded bg-[#080C16] border border-[#35E5FF]/30 text-slate-200 text-xs font-semibold"
              >
                {focus}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
