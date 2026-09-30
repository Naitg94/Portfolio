import React from 'react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { Timeline } from '../components/Timeline';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <SectionHeading
        badge="Career & Education"
        title="Experience & Certifications"
        description="Academic background, certified technical milestones, and practical leadership experience."
      />

      <Timeline items={PORTFOLIO_CONTENT.timeline} />
    </section>
  );
};
