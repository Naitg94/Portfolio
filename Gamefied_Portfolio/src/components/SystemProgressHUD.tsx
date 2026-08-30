import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';

interface SystemProgressHUDProps {
  visitedSections: Set<string>;
}

export const SystemProgressHUD: React.FC<SystemProgressHUDProps> = ({
  visitedSections,
}) => {
  const trackedSections = [
    { id: 'profile', label: 'PROFILE' },
    { id: 'journey', label: 'JOURNEY' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'achievements', label: 'ACHIEVEMENTS' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const completedCount = trackedSections.filter((s) =>
    visitedSections.has(s.id)
  ).length;
  const totalCount = trackedSections.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <aside aria-label="System Exploration HUD" className="fixed bottom-4 left-4 z-30 hidden xl:block font-mono text-[11px] pointer-events-none">
      <div className="cyber-glass px-4 py-3 rounded-xl border border-[#35E5FF]/30 shadow-2xl space-y-2 pointer-events-auto max-w-[220px]">
        <div className="flex items-center justify-between text-xs text-white font-bold pb-1 border-b border-[#35E5FF]/20">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#35E5FF]" />
            <span>EXPLORATION</span>
          </div>
          <span className="text-[#35E5FF]">{percentage}%</span>
        </div>

        <div className="space-y-1 text-slate-400">
          {trackedSections.map((sec) => {
            const isDone = visitedSections.has(sec.id);
            return (
              <div key={sec.id} className="flex items-center justify-between">
                <span>{sec.label}</span>
                {isDone ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                ) : (
                  <span className="text-slate-600">○</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
