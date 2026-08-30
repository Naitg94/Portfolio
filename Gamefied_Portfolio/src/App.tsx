import { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { PlayerProfile } from './components/PlayerProfile';
import { Journey } from './components/Journey';
import { SkillUniverse } from './components/SkillUniverse';
import { ProjectDatabase } from './components/ProjectDatabase';
import { AchievementVault } from './components/AchievementVault';
import { EducationNode } from './components/EducationNode';
import { ContactTerminal } from './components/ContactTerminal';
import { Footer } from './components/Footer';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Disable browser scroll restoration on mount so reload doesn't jump to scroll anchor
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.history.replaceState(null, '', window.location.pathname);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const sections = ['hero', 'profile', 'journey', 'skills', 'projects', 'achievements', 'education', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05070D] text-slate-100 font-sans selection:bg-[#35E5FF]/30 selection:text-[#35E5FF]">
      {/* Animated Particle & Grid Background */}
      <ParticleBackground />

      {/* Floating Cyber HUD Navigation */}
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main OS Sections */}
      <main className="relative z-10">
        <Hero onNavigate={handleNavigate} />
        <PlayerProfile />
        <Journey />
        <SkillUniverse />
        <ProjectDatabase />
        <AchievementVault />
        <EducationNode />
        <ContactTerminal />
      </main>

      {/* Footer / System Exit */}
      <Footer />
    </div>
  );
}

export default App;
