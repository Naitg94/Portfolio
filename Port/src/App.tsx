import React from 'react';
import { useTheme } from './hooks/useTheme';
import { useActiveSection } from './hooks/useActiveSection';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection(['about', 'projects', 'experience', 'contact']);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <Navbar theme={theme} onToggleTheme={toggleTheme} activeSection={activeSection} />

      <main className="flex-1">
        <Hero />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
