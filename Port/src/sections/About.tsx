import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Target, MapPin, Compass, Check, X, Shield, Cpu, Gauge, Terminal } from 'lucide-react';
import { PORTFOLIO_CONTENT, type FactCard } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';

export const About: React.FC = () => {
  const getFactIcon = (iconName: FactCard['iconName']) => {
    switch (iconName) {
      case 'graduation':
        return <GraduationCap className="w-5 h-5 text-indigo-500" />;
      case 'focus':
        return <Target className="w-5 h-5 text-purple-500" />;
      case 'location':
        return <MapPin className="w-5 h-5 text-blue-500" />;
      case 'interests':
        return <Compass className="w-5 h-5 text-emerald-500" />;
    }
  };

  const processPillars = [
    {
      icon: <Terminal className="w-4 h-4 text-indigo-500" />,
      title: 'Architectural Planning First',
      description: 'Designing state machines, schema boundaries, and error flows before writing a single line of client code.',
    },
    {
      icon: <Shield className="w-4 h-4 text-purple-500" />,
      title: 'Policy Guardrails & AI Safety',
      description: 'Implementing 4-level fallback circuits, human-in-the-loop approvals, and strict audit logs for autonomous tools.',
    },
    {
      icon: <Cpu className="w-4 h-4 text-blue-500" />,
      title: 'Strict Type-Safety & Modularity',
      description: 'Zero implicit any, end-to-end type contracts across React Query and FastAPI backends, and reusable components.',
    },
    {
      icon: <Gauge className="w-4 h-4 text-emerald-500" />,
      title: 'Performance & Lighthouse Audits',
      description: 'Prioritizing sub-second FCP, minimal bundle sizes, WCAG accessible contrast, and responsive layout stability.',
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        badge="Niche & Philosophy"
        title="Engineering Over Clones"
        description="I design software around concrete business operations and intelligent decision automation, not textbook boilerplate."
      />

      <div className="space-y-10">
        {/* Core Value & Two-Part Punch Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs relative overflow-hidden"
        >
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-medium">
              <span>SPECIALTY: AUTONOMOUS AI & FINOPS PLATFORMS</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-snug">
              "Building production-grade applications that solve real operational bottlenecks."
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p className="bg-zinc-50/70 dark:bg-zinc-950/40 p-5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
                {PORTFOLIO_CONTENT.punchLine1}
              </p>
              <p className="bg-zinc-50/70 dark:bg-zinc-950/40 p-5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
                {PORTFOLIO_CONTENT.punchLine2}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Niche Precision: What I Excel At vs. What I Avoid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What I Deliver */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45 }}
            className="p-6 sm:p-8 rounded-2xl bg-emerald-500/[0.03] dark:bg-emerald-500/[0.04] border border-emerald-500/20 dark:border-emerald-500/30 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
              <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="tracking-wide uppercase text-xs font-mono">What I Excel At & Build</span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                <span><strong>Autonomous Recovery & Risk Engines:</strong> Policy guardrails, human approvals, and circuit breakers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                <span><strong>Full-Stack TypeScript & Python:</strong> Next.js App Router frontends with fast, asynchronous FastAPI backends.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                <span><strong>Conversational & Voice NLP:</strong> Multi-lingual intent analysis (English, Hindi, Hinglish) and sentiment tracking.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                <span><strong>Relational DB Modeling:</strong> PostgreSQL, Supabase real-time subscriptions, and audit logging.</span>
              </li>
            </ul>
          </motion.div>

          {/* What I Don't Do */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45 }}
            className="p-6 sm:p-8 rounded-2xl bg-zinc-500/[0.03] dark:bg-zinc-800/20 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-2.5 text-zinc-600 dark:text-zinc-400 font-semibold text-sm">
              <div className="w-6 h-6 rounded-md bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <X className="w-4 h-4 text-zinc-500" />
              </div>
              <span className="tracking-wide uppercase text-xs font-mono">What I Don't Do (Niche Clarity)</span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-2" />
                <span><strong>Generic tutorial clones:</strong> I avoid building to-do lists or generic Netflix clones that offer zero business value.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-2" />
                <span><strong>Unguarded AI wrappers:</strong> Raw prompt dumping with no audit trails, fallback states, or user verification.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-2" />
                <span><strong>Fragile untyped code:</strong> No sloppy JavaScript without interfaces or haphazard schema changes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-2" />
                <span><strong>Slow, bloated SPAs:</strong> Every project is audited for bundle size, fast initial paint, and mobile ergonomics.</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Engineering Process & Standards */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 text-center">
            My Engineering Standard & Workflow
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-5 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xs space-y-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  {pillar.icon}
                </div>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {pillar.title}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4 Quick Fact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {PORTFOLIO_CONTENT.factCards.map((fact, idx) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="p-5 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-center">
                  {getFactIcon(fact.iconName)}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    {fact.title}
                  </span>
                  <div className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {fact.value}
                  </div>
                </div>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                {fact.subtitle}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
