export interface Project {
  id: string;
  code: string;
  name: string;
  category: string;
  status?: 'COMPLETED' | 'IN PROGRESS';
  objective?: string;
  description?: string;
  highlights?: string[];
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  themeColor: string;
  accentBg: string;
}

export interface SkillNode {
  name: string;
  category: 'PROGRAMMING' | 'FRONTEND' | 'BACKEND / SYSTEMS' | 'AI & INTELLIGENT SYSTEMS' | 'TOOLS & PLATFORMS';
  status: 'BUILDING WITH' | 'LEARNING' | 'EXPLORING' | 'WORKING WITH';
  icon?: string;
}

export interface Achievement {
  id: string;
  title: string;
  status: 'UNLOCKED';
  organization?: string;
  date?: string;
  assessmentScore?: string;
  description: string;
  activities?: string[];
  type: 'CERTIFICATION' | 'EVENT' | 'EXPERIENCE';
}

export interface JourneyLevel {
  level: string;
  title: string;
  description: string;
  isCurrent?: boolean;
}

export const PLAYER_PROFILE = {
  name: 'Naitik Goyal',
  role: 'AI/ML Student & Developer',
  location: 'Bhilai, Chhattisgarh, India',
  currentPath: 'Artificial Intelligence, Machine Learning & Software Development',
  status: 'Building. Learning. Evolving.',
  tagline: 'BUILDING DIGITAL PRODUCTS. EXPLORING INTELLIGENT SYSTEMS. LEVELING UP WITH EVERY PROJECT.',
  intro: 'Aspiring Computer Science student specializing in AI/ML, focused on building real-world digital products, learning modern technologies, and continuously evolving toward more intelligent systems.'
};

export const JOURNEY_LEVELS: JourneyLevel[] = [
  {
    level: 'LEVEL 01',
    title: 'WEB DEVELOPMENT',
    description: 'Started exploring how websites work through HTML, CSS and JavaScript.'
  },
  {
    level: 'LEVEL 02',
    title: 'BUILDING PRODUCTS',
    description: 'Moved from learning concepts to creating practical applications and complete user experiences.'
  },
  {
    level: 'LEVEL 03',
    title: 'FULL STACK DEVELOPMENT',
    description: 'Expanded into backend systems, databases, APIs and end-to-end applications.'
  },
  {
    level: 'LEVEL 04',
    title: 'AI/ML EXPLORATION',
    description: 'Began focusing on Artificial Intelligence, Machine Learning, AI-assisted development and intelligent systems.'
  },
  {
    level: 'CURRENT LEVEL',
    title: 'BUILDING TOWARD INTELLIGENT SYSTEMS',
    description: 'Continuing to build projects, learn new technologies and develop toward more advanced AI and software systems.',
    isCurrent: true
  }
];

export const SKILL_NODES: SkillNode[] = [
  // PROGRAMMING
  { name: 'Python', category: 'PROGRAMMING', status: 'BUILDING WITH' },
  { name: 'TypeScript', category: 'PROGRAMMING', status: 'BUILDING WITH' },
  { name: 'JavaScript', category: 'PROGRAMMING', status: 'BUILDING WITH' },

  // FRONTEND
  { name: 'Next.js', category: 'FRONTEND', status: 'BUILDING WITH' },
  { name: 'React', category: 'FRONTEND', status: 'BUILDING WITH' },
  { name: 'Tailwind CSS', category: 'FRONTEND', status: 'BUILDING WITH' },
  { name: 'React Query', category: 'FRONTEND', status: 'BUILDING WITH' },
  { name: 'Recharts', category: 'FRONTEND', status: 'BUILDING WITH' },
  { name: 'HTML5', category: 'FRONTEND', status: 'WORKING WITH' },
  { name: 'CSS', category: 'FRONTEND', status: 'WORKING WITH' },
  { name: 'Bootstrap', category: 'FRONTEND', status: 'WORKING WITH' },

  // BACKEND / SYSTEMS
  { name: 'FastAPI', category: 'BACKEND / SYSTEMS', status: 'BUILDING WITH' },
  { name: 'Node.js', category: 'BACKEND / SYSTEMS', status: 'BUILDING WITH' },
  { name: 'PostgreSQL / Supabase', category: 'BACKEND / SYSTEMS', status: 'BUILDING WITH' },
  { name: 'JWT / RBAC', category: 'BACKEND / SYSTEMS', status: 'BUILDING WITH' },
  { name: 'PHP', category: 'BACKEND / SYSTEMS', status: 'WORKING WITH' },
  { name: 'Database Management Systems', category: 'BACKEND / SYSTEMS', status: 'BUILDING WITH' },

  // AI & INTELLIGENT SYSTEMS
  { name: 'AI Risk Engine', category: 'AI & INTELLIGENT SYSTEMS', status: 'BUILDING WITH' },
  { name: 'Voice Copilot & NLP', category: 'AI & INTELLIGENT SYSTEMS', status: 'BUILDING WITH' },
  { name: 'Artificial Intelligence', category: 'AI & INTELLIGENT SYSTEMS', status: 'LEARNING' },
  { name: 'Machine Learning', category: 'AI & INTELLIGENT SYSTEMS', status: 'LEARNING' },
  { name: 'AI Agents', category: 'AI & INTELLIGENT SYSTEMS', status: 'EXPLORING' },
  { name: 'Prompt Engineering', category: 'AI & INTELLIGENT SYSTEMS', status: 'BUILDING WITH' },
  { name: 'AI-Assisted Development', category: 'AI & INTELLIGENT SYSTEMS', status: 'BUILDING WITH' },

  // TOOLS & PLATFORMS
  { name: 'GitHub', category: 'TOOLS & PLATFORMS', status: 'WORKING WITH' },
  { name: 'Supabase', category: 'TOOLS & PLATFORMS', status: 'BUILDING WITH' },
  { name: 'Vercel', category: 'TOOLS & PLATFORMS', status: 'BUILDING WITH' }
];

export const PROJECTS: Project[] = [
  {
    id: 'tree-plantation',
    code: 'PROJECT 01',
    name: 'TREE PLANTATION',
    category: 'FULL-STACK WEB APPLICATION',
    status: 'COMPLETED',
    objective: 'Build a digital platform supporting tree plantation initiatives and creating a more transparent and engaging experience for users.',
    description: 'Developed a full-stack Tree Plantation web application with a modern and responsive interface. The project includes frontend and backend functionality, data management, user interactions and API integration.',
    highlights: [
      'Clean and modern user interface',
      'Responsive design for mobile, tablet and desktop',
      'Data management and backend functionality',
      'User interactions & API integration',
      'Environment-focused visuals & sustainability initiatives'
    ],
    technologies: ['TypeScript', 'Supabase', 'Vercel', 'Web Development Technologies'],
    liveUrl: 'https://tree-plantation-xi.vercel.app/',
    themeColor: '#35E5FF',
    accentBg: 'from-emerald-950/40 via-cyan-950/20 to-slate-950'
  },
  {
    id: 'expense-tracker',
    code: 'PROJECT 02',
    name: 'EXPENSE TRACKER',
    category: 'PERSONAL FINANCE APPLICATION',
    status: 'COMPLETED',
    objective: 'Create a modern application that helps users track, analyze and better understand their personal spending.',
    description: 'A responsive expense management web application that allows users to manage expenses and analyze financial habits.',
    highlights: [
      'Add expenses & categories/subcategories',
      'Amount and date tracking with heatmaps',
      'Dedicated dashboards & interactive charts',
      'Financial insights & custom category colors',
      'Dark/light theme with intuitive navigation'
    ],
    technologies: ['JavaScript', 'HTML', 'CSS', 'Data Visualization'],
    liveUrl: 'https://expense-tracker-six-nu-33.vercel.app/',
    githubUrl: 'https://github.com/Naitg94/Expense-Tracker.git',
    themeColor: '#4DA3FF',
    accentBg: 'from-blue-950/40 via-indigo-950/20 to-slate-950'
  },
  {
    id: 'goyal-traders',
    code: 'PROJECT 03',
    name: 'GOYAL TRADERS',
    category: 'BUSINESS WEBSITE',
    status: 'COMPLETED',
    objective: 'Create a professional digital presence for a real-world business.',
    description: 'Developed a business website for Goyal Traders to showcase services and improve customer engagement and accessibility.',
    highlights: [
      'User-friendly interface & responsive design',
      'Real-world business application',
      'Improved digital accessibility',
      'Professional online presence & customer engagement'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://naitg94.github.io/Goyal-Traders-2/',
    githubUrl: 'https://github.com/Naitg94/Goyal-Traders-2.git',
    themeColor: '#8D7BFF',
    accentBg: 'from-violet-950/40 via-purple-950/20 to-slate-950'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'internshala-fullstack',
    title: 'FULL STACK WEB DEVELOPMENT WITH AI',
    status: 'UNLOCKED',
    organization: 'Internshala Trainings',
    date: 'August 2026',
    assessmentScore: '84%',
    description: 'Successfully completed an 8-week certified training covering AI-powered web development, HTML, CSS, Bootstrap, DBMS, PHP, JavaScript, DOM, React, next-generation AI tools and AI-assisted projects.',
    type: 'CERTIFICATION'
  },
  {
    id: 'esummit-game-stall',
    title: 'E-SUMMIT CODING GAME EXPERIENCE',
    status: 'UNLOCKED',
    date: 'March 2026',
    description: 'Set up and participated in a coding-based game stall during E-Summit.',
    activities: [
      'Designed simple interactive programming games',
      'Guided participants & explained game rules',
      'Managed participant flow',
      'Collaborated on stall setup and coordination'
    ],
    type: 'EVENT'
  },
  {
    id: 'goyal-traders-experience',
    title: 'REAL-WORLD BUSINESS EXPERIENCE',
    status: 'UNLOCKED',
    description: 'Gained practical exposure by helping with family business operations at Goyal Traders, including store operations, customer interaction and basic business tasks.',
    type: 'EXPERIENCE'
  }
];

export const EDUCATION = {
  degree: 'B.TECH — COMPUTER SCIENCE ENGINEERING (AI/ML)',
  institution: 'Shri Shankaracharya Technical Campus (SSTC)',
  duration: '2025 — 2029',
  semester: '2nd Semester',
  currentFocus: [
    'Artificial Intelligence',
    'Machine Learning',
    'Programming',
    'Software Development'
  ]
};

export const CONTACT_INFO = {
  email: 'goyalnait678@gmail.com',
  github: 'https://github.com/Naitg94',
  linkedin: 'https://linkedin.com/in/naitik-goyal-843504399',
  location: 'Bhilai, Chhattisgarh, India'
};
