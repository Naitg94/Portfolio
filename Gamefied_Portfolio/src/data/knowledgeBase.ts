export interface KnowledgeItem {
  id: string;
  topic: string;
  summary: string;
  details?: string;
  actions?: Array<{
    label: string;
    type: 'email' | 'linkedin' | 'github' | 'project';
    url?: string;
    targetId?: string;
  }>;
}

export const PORTFOLIO_KNOWLEDGE = {
  personal: {
    name: 'Naitik Goyal',
    role: 'AI/ML Student & Developer',
    location: 'Bhilai, Chhattisgarh, India',
    institution: 'Shri Shankaracharya Technical Campus (SSTC)',
    degree: 'B.Tech in Computer Science Engineering (AI/ML)',
    duration: '2025–2029',
    semester: '2nd Semester',
    focus: [
      'Artificial Intelligence',
      'Machine Learning',
      'Software Development',
      'Full-Stack Web Development',
      'AI-Assisted Development',
      'Building Real-World Digital Products'
    ],
    status: 'Student developer actively learning, building projects, and expanding technical skills.'
  },
  skills: {
    programming: ['Python', 'TypeScript', 'JavaScript'],
    frontend: ['Next.js', 'React', 'Tailwind CSS', 'React Query', 'Recharts', 'HTML5', 'CSS', 'Bootstrap'],
    backend: ['FastAPI', 'Node.js', 'PostgreSQL / Supabase', 'JWT / RBAC', 'PHP', 'Database Management Systems (DBMS)'],
    ai: ['AI Risk Engine', 'Voice Copilot & NLP', 'Artificial Intelligence', 'Machine Learning', 'AI Agents', 'Prompt Engineering', 'AI-Assisted Development'],
    tools: ['GitHub', 'Supabase', 'Vercel']
  },
  projects: [
    {
      id: 'tree-plantation',
      code: 'PROJECT 01',
      name: 'TREE PLANTATION',
      category: 'Full-Stack Web Application',
      description: 'A digital platform supporting tree plantation initiatives and creating a transparent, engaging experience for users.',
      highlights: 'Clean interface, frontend/backend integration, user data management, API integration, sustainability theme. Live deployment available; source code repository is private and not publicly available.',
      technologies: ['TypeScript', 'Supabase', 'Vercel', 'Web Technologies'],
      liveUrl: 'https://tree-plantation-xi.vercel.app/'
    },
    {
      id: 'expense-tracker',
      code: 'PROJECT 02',
      name: 'EXPENSE TRACKER',
      category: 'Personal Finance Application',
      description: 'A responsive expense management application to track spending, view financial insights, heatmaps, and custom categories.',
      highlights: 'Expense tracking, custom categories/colors, interactive charts, dashboards, light/dark theme.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Data Visualization'],
      liveUrl: 'https://expense-tracker-six-nu-33.vercel.app/',
      githubUrl: 'https://github.com/Naitg94/Expense-Tracker.git'
    },
    {
      id: 'goyal-traders',
      code: 'PROJECT 03',
      name: 'GOYAL TRADERS',
      category: 'Business Website',
      description: 'A professional business website for Goyal Traders showcasing services and enhancing digital accessibility.',
      highlights: 'Responsive design, user-friendly navigation, real-world business exposure, professional presence.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://naitg94.github.io/Goyal-Traders-2/',
      githubUrl: 'https://github.com/Naitg94/Goyal-Traders-2'
    }
  ],
  achievements: [
    {
      title: 'Full Stack Web Development with AI',
      organization: 'Internshala Trainings',
      date: 'August 2026',
      score: '84% Final Assessment',
      details: 'Certified 8-week training covering HTML, CSS, React, PHP, DBMS, JavaScript, and AI-assisted development.'
    },
    {
      title: 'E-Summit Coding Game Experience',
      date: 'March 2026',
      details: 'Designed and coordinated an interactive programming game stall at E-Summit.'
    },
    {
      title: 'Real-World Business Experience',
      details: 'Gained practical store operation, customer interaction, and management exposure at Goyal Traders.'
    }
  ],
  contact: {
    email: 'goyalnait678@gmail.com',
    github: 'https://github.com/Naitg94',
    linkedin: 'https://linkedin.com/in/naitik-goyal-843504399'
  }
};
