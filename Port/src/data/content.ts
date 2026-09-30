export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email';
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FactCard {
  title: string;
  value: string;
  subtitle: string;
  iconName: 'graduation' | 'focus' | 'location' | 'interests';
}

export interface SkillItem {
  name: string;
  iconName?: string;
  usedIn?: string[]; // projects where this skill was applied
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  problem?: string;     // Business problem solved
  approach?: string;    // Technical approach taken
  result?: string;      // Quantifiable outcome
  featured: boolean;
  technologies: string[];
  highlights?: string[];
  liveUrl?: string;
  githubUrl?: string;
  accentColor: string;
  imagePlaceholder?: string;
}

export interface TimelineItem {
  id: string;
  type: 'education' | 'certification' | 'experience' | 'event';
  title: string;
  organization: string;
  date: string;
  badge?: string;
  description: string;
  details?: string[];
  technologies?: string[];
  certificateUrl?: string;
}

export interface PersonalData {
  name: string;
  role: string;
  tagline: string;
  valueProp: string;          // One sharp value-driven sentence for hero
  niche: string;              // What you specialize in (and implicitly what you don't)
  shortBio: string;
  punchLine1: string;         // First punch paragraph
  punchLine2: string;         // Second punch paragraph — what makes you different
  location: string;
  statusBadge: string;
  availableFrom?: string;
  avatarUrl?: string;
  cgpa?: string;
  email: string;
  resumeUrl?: string;
  socials: SocialLink[];
  navLinks: NavLink[];
  factCards: FactCard[];
  skills: SkillCategory[];
  currentlyLearning: string[];
  projects: Project[];
  timeline: TimelineItem[];
}

export const PORTFOLIO_CONTENT: PersonalData = {
  name: 'Naitik Goyal',
  role: 'AI/ML Engineer & Full-Stack Developer',
  tagline: 'Building autonomous AI systems and production-grade full-stack applications that solve real operational problems.',
  valueProp: 'I architect autonomous AI platforms and production full-stack systems — specializing in FinOps automation, voice NLP, and intelligent web applications that handle real-world operational complexity.',
  niche: 'Autonomous AI systems · FinOps automation · Full-stack React/Next.js · FastAPI backends',
  shortBio:
    'I am a Computer Science Engineering student specializing in AI & Machine Learning at Shri Shankaracharya Technical Campus. I build full-stack web applications and autonomous AI platforms that solve real-world operational challenges. Passionate about bridging robust software engineering with cutting-edge artificial intelligence, from conversational copilots to automated financial operations.',
  punchLine1:
    'I\'m a CSE student (AI/ML) who builds production-grade software — not tutorials, not clones. My projects tackle real operational problems: REVORA automates financial recovery workflows with AI risk guardrails; Shiftly distills weeks of team conversations into structured project memory.',
  punchLine2:
    'My edge is the intersection: I write clean TypeScript frontends, design FastAPI backends, and layer intelligent AI systems on top — then I ship them to production. I specialize in FinOps automation, voice NLP pipelines, and multi-tenant SaaS architecture. I don\'t do generic CRUD apps.',
  location: 'Bhilai, Chhattisgarh, India',
  statusBadge: 'Open to internships & projects',
  availableFrom: 'Available immediately',
  // TODO: Add your real avatar/headshot in Port/public/assets/avatar.jpg
  avatarUrl: undefined,
  // TODO: Add your current CGPA here if you want it displayed
  cgpa: undefined,
  email: 'goyalnait678@gmail.com',
  // TODO: Add your resume PDF to Port/public/assets/resume.pdf
  resumeUrl: undefined,
  socials: [
    {
      label: 'GitHub',
      url: 'https://github.com/Naitg94',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/naitik-goyal-843504399',
      icon: 'linkedin',
    },
    {
      label: 'Email',
      url: 'mailto:goyalnait678@gmail.com',
      icon: 'email',
    },
  ],
  navLinks: [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],
  factCards: [
    {
      title: 'Education',
      value: 'B.Tech CSE (AI/ML)',
      subtitle: 'Shri Shankaracharya Technical Campus · 2025–2029',
      iconName: 'graduation',
    },
    {
      title: 'Specialization',
      value: 'Autonomous AI & FinOps',
      subtitle: 'FastAPI · React/Next.js · AI Risk Engines · Voice NLP',
      iconName: 'focus',
    },
    {
      title: 'Location',
      value: 'Bhilai, Chhattisgarh',
      subtitle: 'Open to remote & on-site collaborations worldwide',
      iconName: 'location',
    },
    {
      title: 'Building Now',
      value: 'Production AI Systems',
      subtitle: 'FinOps automation · Multilingual voice copilots · Modern UX',
      iconName: 'interests',
    },
  ],
  skills: [
    {
      title: 'Languages',
      description: 'Core programming languages used across production projects.',
      skills: [
        { name: 'Python', usedIn: ['REVORA', 'AI Systems'] },
        { name: 'TypeScript', usedIn: ['REVORA', 'Shiftly', 'Portfolio'] },
        { name: 'JavaScript', usedIn: ['Expense Tracker', 'Goyal Traders'] },
        { name: 'HTML5 & CSS3', usedIn: ['All web projects'] },
        { name: 'PHP', usedIn: ['Internshala Full-Stack Training'] },
      ],
    },
    {
      title: 'AI & Intelligent Systems',
      description: 'Applied AI — risk engines, voice NLP, autonomous agents, and intelligent workflows.',
      skills: [
        { name: 'AI Risk Engine Design', usedIn: ['REVORA'] },
        { name: 'Voice Copilot & NLP', usedIn: ['REVORA'] },
        { name: 'Prompt Engineering', usedIn: ['REVORA', 'Shiftly'] },
        { name: 'Autonomous AI Agents', usedIn: ['REVORA'] },
        { name: 'AI-Assisted Development', usedIn: ['REVORA', 'Shiftly'] },
        { name: 'Machine Learning Concepts', usedIn: ['Academic coursework'] },
        { name: 'Communication Intelligence', usedIn: ['Shiftly'] },
      ],
    },
    {
      title: 'Web & Full-Stack',
      description: 'Modern full-stack architecture — React frontends, FastAPI backends, real-time data.',
      skills: [
        { name: 'React & Next.js', usedIn: ['REVORA', 'Shiftly', 'Tree Plantation'] },
        { name: 'FastAPI', usedIn: ['REVORA backend'] },
        { name: 'PostgreSQL & Supabase', usedIn: ['REVORA', 'Tree Plantation'] },
        { name: 'React Query', usedIn: ['REVORA'] },
        { name: 'Tailwind CSS', usedIn: ['REVORA', 'Shiftly', 'Portfolio'] },
        { name: 'Recharts', usedIn: ['REVORA analytics'] },
        { name: 'JWT & RBAC', usedIn: ['REVORA auth'] },
        { name: 'REST APIs', usedIn: ['REVORA', 'Tree Plantation'] },
      ],
    },
    {
      title: 'Tools & Platforms',
      description: 'Deployment, version control, and cloud infrastructure for production apps.',
      skills: [
        { name: 'Git & GitHub', usedIn: ['All projects'] },
        { name: 'Vercel', usedIn: ['REVORA', 'Shiftly', 'Tree Plantation', 'Expense Tracker'] },
        { name: 'Supabase', usedIn: ['REVORA', 'Tree Plantation'] },
        { name: 'GitHub Pages', usedIn: ['Goyal Traders'] },
      ],
    },
  ],
  currentlyLearning: [
    'LangChain & LLM orchestration',
    'Docker & containerized deployments',
    'CI/CD pipelines',
    'Advanced ML algorithms',
  ],
  projects: [
    {
      id: 'revora',
      title: 'REVORA',
      category: 'Autonomous AI · FinOps Platform',
      problem: 'SaaS businesses lose millions in failed recurring payments with no intelligent recovery system — just manual follow-ups and generic dunning emails.',
      approach: 'Built a 4-level AI risk engine with policy-bounded autonomous recovery workflows, a multilingual voice copilot (English/Hindi/Hinglish), and cryptographic audit trails — all in a multi-tenant Next.js + FastAPI architecture.',
      result: 'Full autonomous recovery lifecycle: detect → analyze risk → execute policy-bounded action → escalate for human approval on high-exposure cases. Deployed live on Vercel.',
      description:
        'An enterprise-grade autonomous AI revenue recovery platform that detects payment failures, applies policy-bounded recovery workflows with AI risk classification, and maintains auditable human-in-the-loop approval for high-exposure decisions.',
      featured: true,
      technologies: [
        'Next.js',
        'TypeScript',
        'FastAPI',
        'PostgreSQL',
        'Supabase',
        'React Query',
        'Tailwind CSS',
        'Recharts',
        'JWT/RBAC',
        'AI Risk Engine',
      ],
      highlights: [
        '4-level policy guardrails: autonomous → supervised → manual → circuit-breaker',
        'Multilingual voice copilot — English, Hindi, and Hinglish NLP',
        'AI Promise-to-Pay commitment tracking with NLP classification',
        'Cryptographic audit trail with high-exposure human approval queue',
        'Interactive risk analytics dashboard with accessible data visualizations',
      ],
      liveUrl: 'https://revora-fawn.vercel.app/',
      githubUrl: 'https://github.com/NaitG94/Revora',
      accentColor: '#7c3aed',
    },
    {
      id: 'shiftly',
      title: 'SHIFTLY',
      category: 'Communication Intelligence · AI Layer',
      problem: 'Engineering teams lose critical decisions buried in hundreds of Slack/Teams messages — manually skimming through is slow and error-prone.',
      approach: 'Built an AI-powered communication intelligence layer that accepts conversation paste or file upload, extracts action items, decisions, and blockers, and maintains structured project memory across sessions.',
      result: 'Converts hours of unstructured conversation into clean, actionable project memory in seconds. Live on Vercel with zero-backend architecture.',
      description:
        'An AI-powered communication intelligence tool that analyzes long project conversations, extracts critical action points and decisions, and builds structured project memory that teams can search and reference.',
      featured: true,
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'AI Intelligence', 'Vercel'],
      highlights: [
        'Intelligent extraction of action items, decisions, and blockers from raw conversation',
        'Structured project memory that persists context across team interactions',
        'Paste or file upload — no integration friction for onboarding',
        'Modern responsive UI built with Next.js 14 and Tailwind CSS',
      ],
      liveUrl: 'https://shiftly-woad.vercel.app',
      githubUrl: 'https://github.com/Naitg94/Shiftly',
      accentColor: '#3b82f6',
    },
    {
      id: 'tree-plantation',
      title: 'Tree Plantation',
      category: 'Full-Stack · Sustainability Platform',
      problem: 'Community tree plantation drives lacked transparent tracking — participants had no way to verify their impact or engage with the initiative digitally.',
      approach: 'Built a full-stack platform with Supabase backend for real-time participation data, community dashboards, and environmental impact metrics — responsive across all devices.',
      result: 'Live community platform with cloud-backed data management, accessible to participants across mobile and desktop.',
      description:
        'A full-stack sustainability platform supporting tree plantation initiatives with transparent participation tracking, community engagement dashboards, and live environmental impact metrics.',
      featured: false,
      technologies: ['TypeScript', 'Supabase', 'React', 'Tailwind CSS', 'Vercel'],
      highlights: [
        'Real-time participation tracking with Supabase cloud backend',
        'Community engagement dashboard with live environmental metrics',
        'Responsive across mobile, tablet, and desktop',
      ],
      liveUrl: 'https://tree-plantation-xi.vercel.app/',
      githubUrl: undefined,
      accentColor: '#10b981',
    },
    {
      id: 'expense-tracker',
      title: 'Expense Tracker',
      category: 'Personal Finance · Data Visualization',
      problem: 'Most expense apps are over-engineered. Users need a fast, offline-first tool that makes spending patterns visually obvious at a glance.',
      approach: 'Built a lightweight, zero-dependency JavaScript app with custom date heatmaps, trend charts, and budget category customization — pure HTML/CSS/JS, no framework overhead.',
      result: 'Sub-second load time, full offline capability, and visually clear spending insights with dark/light theme support.',
      description:
        'A lightweight personal finance app enabling users to track daily expenses, visualize spending patterns with interactive heatmaps and trend charts, and manage custom budget categories — built with zero-framework JavaScript for maximum performance.',
      featured: false,
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Data Visualization', 'Vercel'],
      highlights: [
        'Zero-framework JavaScript — sub-second load, full offline support',
        'Date heatmaps and spending trend charts built from scratch',
        'Financial insights dashboard with light and dark themes',
      ],
      liveUrl: 'https://expense-tracker-six-nu-33.vercel.app/',
      githubUrl: 'https://github.com/Naitg94/Expense-Tracker.git',
      accentColor: '#f59e0b',
    },
    {
      id: 'goyal-traders',
      title: 'Goyal Traders',
      category: 'Business Web · Commercial Presence',
      problem: 'A local trading business had no digital presence, causing lost leads and customer inquiries going through informal channels.',
      approach: 'Designed a clean, mobile-first static site with structured product catalog, direct inquiry channels, and fast GitHub Pages deployment — no backend cost, instant global delivery.',
      result: 'Established digital presence with a structured catalog and accessible contact pathway, fully mobile-optimized.',
      description:
        'A clean, mobile-first commercial web presence for Goyal Traders with a structured product catalog, customer inquiry channels, and zero-cost GitHub Pages deployment.',
      featured: false,
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
      highlights: [
        'Mobile-first responsive layout with fast-loading static architecture',
        'Structured product and service catalog presentation',
        'Zero-cost deployment via GitHub Pages with global CDN delivery',
      ],
      liveUrl: 'https://naitg94.github.io/Goyal-Traders-2/',
      githubUrl: 'https://github.com/Naitg94/Goyal-Traders-2.git',
      accentColor: '#8b5cf6',
    },
  ],
  timeline: [
    {
      id: 'internshala-fullstack',
      type: 'certification',
      title: 'Full Stack Web Development with AI',
      organization: 'Internshala Trainings',
      date: 'August 2026',
      badge: '84% Assessment Score',
      description:
        'Completed an intensive 8-week certified training in AI-powered web development — covering React, modern JavaScript, PHP, relational databases, DOM manipulation, and AI-assisted engineering workflows.',
      details: [
        'Built full-stack web applications with modern component-based architectures',
        'Mastered relational database design, SQL, and server-side operations with PHP',
        'Applied prompt engineering and AI-assisted development to real project workflows',
      ],
      technologies: ['React', 'JavaScript', 'PHP', 'SQL', 'HTML/CSS', 'AI-assisted Dev'],
      certificateUrl: undefined, // TODO: Add Internshala certificate URL
    },
    {
      id: 'esummit-game-stall',
      type: 'event',
      title: 'E-Summit Tech Stall Coordinator',
      organization: 'Shri Shankaracharya Technical Campus',
      date: 'March 2026',
      badge: 'Event Leadership',
      description:
        'Designed interactive coding challenges and led the competitive programming game stall at the annual college entrepreneurship summit — coordinating participant flow and technical demonstrations.',
      details: [
        'Engineered interactive logic and programming mini-challenges for summit participants',
        'Guided 50+ student participants through debugging and code exercises',
        'Collaborated on stall logistics, participant flow, and live technical demonstrations',
      ],
    },
    {
      id: 'goyal-traders-experience',
      type: 'experience',
      title: 'Business Operations & Digital Systems',
      organization: 'Goyal Traders',
      date: 'Ongoing',
      badge: 'Commercial Operations',
      description:
        'Real-world commercial experience managing daily operations, digitizing records, and identifying opportunities to improve customer reach via a new web presence.',
      details: [
        'Digitized manual inventory and commercial record systems',
        'Engaged directly with customers to understand product requirements and feedback',
        'Identified and executed digital accessibility improvements — built and launched the business website',
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
    },
    {
      id: 'sstc-btech',
      type: 'education',
      title: 'B.Tech in Computer Science Engineering (AI/ML)',
      organization: 'Shri Shankaracharya Technical Campus (SSTC), Bhilai',
      date: '2025 — 2029',
      badge: '2nd Semester · Active',
      description:
        'Pursuing undergraduate engineering with a dedicated AI/ML specialization. Running parallel to coursework: building production AI systems, full-stack applications, and autonomous platforms.',
      details: [
        'Core: data structures, algorithms, discrete mathematics, OOP principles',
        'Specialization track: AI algorithms, intelligent agents, ML principles',
        'Self-driven: shipped 5 production projects alongside academic curriculum',
      ],
    },
  ],
};
