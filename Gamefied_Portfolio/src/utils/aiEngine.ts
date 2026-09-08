import { PORTFOLIO_KNOWLEDGE } from '../data/knowledgeBase';

export interface ActionButton {
  label: string;
  actionType: 'email' | 'linkedin' | 'github' | 'resume' | 'external';
  url?: string;
}

export interface AIResponse {
  text: string;
  source: 'gemini' | 'local';
  actions?: ActionButton[];
  type?: 'success' | 'info' | 'cmd' | 'error';
}

class AIEngine {
  private conversationHistory: Array<{ role: 'user' | 'assistant'; text: string }> = [];
  private lastSource: 'gemini' | 'local' = 'local';

  public async checkServerStatus(): Promise<{ configured: boolean; provider: string | null }> {
    try {
      const res = await fetch('/api/chat/status', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch {
      // Endpoint error
    }
    return { configured: false, provider: null };
  }

  public getLastSource(): 'gemini' | 'local' {
    return this.lastSource;
  }

  public async processQuery(userInput: string): Promise<AIResponse> {
    const query = userInput.trim();
    if (!query) {
      return { text: 'Please enter a question or message.', source: this.lastSource, type: 'info' };
    }

    const lowerQuery = query.toLowerCase();

    // Add user query to conversation history
    this.conversationHistory.push({ role: 'user', text: query });

    // Handle CLI clear command
    if (lowerQuery === 'clear') {
      this.conversationHistory = [];
      return { text: 'CONVERSATION CLEARED. How can I assist you?', source: 'local', type: 'info' };
    }

    // Step A: ALWAYS attempt POST /api/chat (Real Gemini API) FIRST!
    try {
      const serverResponse = await this.callServerGeminiEndpoint(query, this.conversationHistory);
      
      if (serverResponse && serverResponse.source === 'gemini' && serverResponse.response) {
        this.lastSource = 'gemini';
        this.conversationHistory.push({ role: 'assistant', text: serverResponse.response });
        return {
          text: serverResponse.response,
          source: 'gemini',
          actions: serverResponse.actions,
          type: 'info',
        };
      }
    } catch {
      // Server connection error -> Fallback to local Knowledge Engine
    }

    // Step B: Secondary Local Fallback Engine (Used only if Gemini is unconfigured or fails)
    this.lastSource = 'local';
    const localResponse = this.generateLocalFallbackResponse(lowerQuery, query);
    this.conversationHistory.push({ role: 'assistant', text: localResponse.text });
    return {
      ...localResponse,
      source: 'local',
    };
  }

  private async callServerGeminiEndpoint(
    userMessage: string,
    history: Array<{ role: 'user' | 'assistant'; text: string }>
  ): Promise<{ source: 'gemini' | 'local'; response: string | null; actions?: ActionButton[] } | null> {
    if (typeof window === 'undefined') return null;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: history.slice(-6),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return {
          source: data.source || 'local',
          response: data.response || null,
          actions: data.actions || [],
        };
      }
    } catch {
      // Fetch error -> fallback
    }
    return { source: 'local', response: null };
  }

  private generateLocalFallbackResponse(lower: string, _originalQuery: string): { text: string; actions?: ActionButton[]; type?: 'success' | 'info' | 'cmd' } {
    const recentUserText = this.conversationHistory.slice(-4).map(m => m.text.toLowerCase()).join(' ');

    // 1. Easter Egg Trigger
    if (lower === 'hire naitik') {
      return {
        text: "GOOD CHOICE. LET'S BUILD SOMETHING INTERESTING.\n\nNaitik is open to engineering opportunities and intelligent product development.",
        type: 'success',
        actions: [
          { label: 'SEND EMAIL', actionType: 'email', url: `mailto:${PORTFOLIO_KNOWLEDGE.contact.email}` },
          { label: 'CONNECT ON LINKEDIN', actionType: 'linkedin', url: PORTFOLIO_KNOWLEDGE.contact.linkedin },
        ],
      };
    }

    // 2. Command: HELP
    if (lower === 'help' || lower === '?') {
      return {
        text: `NAITIK.OS AI ASSISTANT HELP:

Ask me any natural question about Naitik's portfolio:
• "Who is Naitik?"
• "Tell me about REVORA"
• "Open Revora"
• "Show me his projects"
• "Which project uses FastAPI and Next.js?"
• "Compare REVORA and Tree Plantation"
• "What technologies does he work with?"
• "What is he currently studying?"
• "Why should I hire Naitik?"
• "Show me his GitHub / Can I download his resume?"`,
        type: 'info',
      };
    }

    // 3. HIRING & COLLABORATION INTENT
    if (
      lower.includes('hire') ||
      lower.includes('why hire') ||
      lower.includes('why should i hire') ||
      lower.includes('should i hire') ||
      lower.includes('work with naitik') ||
      lower.includes('collaborate') ||
      lower.includes('collaboration') ||
      lower.includes('work together') ||
      lower.includes('partnership') ||
      lower.includes('job opportunity') ||
      lower.includes('project opportunity')
    ) {
      return {
        text: `Based on his current portfolio, Naitik is a strong candidate for student developer, engineering internship, or full-stack/AI software opportunities.

Key Portfolio Strengths:
• Autonomous AI & FinOps: REVORA — Autonomous AI Revenue Recovery Platform (Live: https://revora-fawn.vercel.app/) built with Next.js, FastAPI, PostgreSQL/Supabase, AI Risk Engine & Multilingual Voice Copilot.
• Academic Focus: Pursuing B.Tech in CSE (AI/ML) at SSTC (2nd Semester).
• Practical Project Building: Full-stack applications like Tree Plantation (TypeScript, Supabase) and Expense Tracker (analytics & charts).
• Business Exposure: Real-world family store operations at Goyal Traders & E-Summit stall coordination.
• Certified Web & AI Training: Certified 8-week Full-Stack Web Development with AI (84% score).`,
        type: 'success',
        actions: [
          { label: 'OPEN REVORA', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl },
          { label: 'SEND EMAIL', actionType: 'email', url: `mailto:${PORTFOLIO_KNOWLEDGE.contact.email}` },
          { label: 'CONNECT ON LINKEDIN', actionType: 'linkedin', url: PORTFOLIO_KNOWLEDGE.contact.linkedin },
        ],
      };
    }

    // 4. REVORA SPECIFIC INTENT (e.g. "Tell me about Revora", "What is Revora?", "Open Revora")
    if (lower.includes('revora')) {
      return {
        text: `REVORA is Naitik's flagship Autonomous AI Revenue Recovery & Risk Operations Platform:

• PURPOSE: Autonomously detects payment failures, prioritizes financial exposure, executes policy-bounded recovery workflows, and maintains human-in-the-loop governance for high-value transactions.
• LIVE PLATFORM: https://revora-fawn.vercel.app/
• TECH STACK: Next.js, TypeScript, FastAPI, PostgreSQL/Supabase, React Query, Tailwind CSS, Recharts, JWT/RBAC, AI Risk Engine, Voice Copilot.
• CORE CAPABILITIES:
  - 4-Level Policy Guardrails (Autonomous Low-Risk to Critical Anomaly Blocks)
  - Continuous Multilingual Voice Copilot ("Talk to REVORA" in English, Hindi & Hinglish)
  - Promise to Pay (P2P) NLP Parsing
  - Real-Time Recovery Telemetry Feed & Cryptographic Audit Trails
  - High-Exposure Human Approval Queue`,
        type: 'info',
        actions: [
          { label: 'OPEN REVORA', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl },
          { label: 'VIEW ON GITHUB', actionType: 'github', url: PORTFOLIO_KNOWLEDGE.projects[0].githubUrl },
        ],
      };
    }

    // 5. MPLADS SENTINELS INTENT (e.g. "What is MPLADS Sentinels?", "Open MPLADS Sentinels", "Show me MPLADS Sentinels", "Show me the MPLADS GitHub", "Open the MPLADS repository")
    if (lower.includes('mplads')) {
      return {
        text: "MPLADS Sentinels is a GitHub repository in Naitik's portfolio, but I don't have a verified project description available here yet.",
        type: 'info',
        actions: [
          { label: 'OPEN GITHUB', actionType: 'github', url: PORTFOLIO_KNOWLEDGE.projects[4]?.githubUrl || 'https://github.com/Naitg94/MPLADS-Sentinals.git' },
        ],
      };
    }

    // 6. RESUME INTENT
    if (lower === 'resume' || lower.includes('resume') || lower.includes('cv')) {
      return {
        text: `You can download Naitik Goyal's official one-page resume PDF directly:`,
        type: 'info',
        actions: [
          { label: 'DOWNLOAD RESUME (PDF)', actionType: 'resume', url: PORTFOLIO_KNOWLEDGE.contact.resumeUrl },
        ],
      };
    }

    // 7. GITHUB INTENT
    if (lower === 'github' || lower.includes('github') || lower.includes('repository') || lower.includes('source code')) {
      return {
        text: `Explore Naitik's repositories and project code on GitHub: ${PORTFOLIO_KNOWLEDGE.contact.github}`,
        type: 'info',
        actions: [
          { label: 'OPEN GITHUB', actionType: 'github', url: PORTFOLIO_KNOWLEDGE.contact.github },
          { label: 'VIEW REVORA REPO', actionType: 'github', url: PORTFOLIO_KNOWLEDGE.projects[0].githubUrl },
          { label: 'MPLADS SENTINELS REPO', actionType: 'github', url: PORTFOLIO_KNOWLEDGE.projects[4]?.githubUrl || 'https://github.com/Naitg94/MPLADS-Sentinals.git' },
        ],
      };
    }

    // 7. LINKEDIN INTENT
    if (lower === 'linkedin' || lower.includes('linkedin')) {
      return {
        text: `Connect with Naitik Goyal professionally on LinkedIn: ${PORTFOLIO_KNOWLEDGE.contact.linkedin}`,
        type: 'info',
        actions: [
          { label: 'CONNECT ON LINKEDIN', actionType: 'linkedin', url: PORTFOLIO_KNOWLEDGE.contact.linkedin },
        ],
      };
    }

    // 8. CONTACT INTENT
    if (lower === 'contact' || lower.includes('email') || lower.includes('contact') || lower.includes('reach out')) {
      return {
        text: `You can reach Naitik Goyal directly via email or LinkedIn:

• Email: ${PORTFOLIO_KNOWLEDGE.contact.email}
• LinkedIn: ${PORTFOLIO_KNOWLEDGE.contact.linkedin}
• GitHub: ${PORTFOLIO_KNOWLEDGE.contact.github}`,
        type: 'info',
        actions: [
          { label: 'SEND EMAIL', actionType: 'email', url: `mailto:${PORTFOLIO_KNOWLEDGE.contact.email}` },
          { label: 'CONNECT ON LINKEDIN', actionType: 'linkedin', url: PORTFOLIO_KNOWLEDGE.contact.linkedin },
        ],
      };
    }

    // 9. PROJECT COMPARISONS & SUPABASE / FASTAPI INTENT
    if (lower.includes('compare') && (lower.includes('revora') || lower.includes('tree') || lower.includes('expense') || lower.includes('project'))) {
      return {
        text: `Technical comparison of Naitik's featured projects:

• REVORA: An enterprise AI FinOps & Revenue Recovery platform built with Next.js, FastAPI, PostgreSQL/Supabase, AI Risk Engine, and Voice Copilot. Live at https://revora-fawn.vercel.app/.
• TREE PLANTATION: A sustainability-focused full-stack web application built with TypeScript, Supabase, and Vercel.
• EXPENSE TRACKER: A client-side personal finance tool built with JavaScript, HTML, and CSS focused on interactive analytics, custom category dashboards, and spending heatmaps.

REVORA represents his most advanced full-stack & AI systems architecture, while Tree Plantation and Expense Tracker showcase frontend/backend integration and UI analytics.`,
        type: 'info',
        actions: [
          { label: 'OPEN REVORA', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl },
          { label: 'TREE PLANTATION (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[1].liveUrl },
          { label: 'EXPENSE TRACKER (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[2].liveUrl },
        ],
      };
    }

    if (lower.includes('supabase') || ((recentUserText.includes('project') || recentUserText.includes('work')) && lower.includes('which one'))) {
      return {
        text: `Both REVORA (Project 01) and TREE PLANTATION (Project 02) use Supabase / PostgreSQL for database management and backend data structures. REVORA pairs Supabase with FastAPI and Next.js, while Tree Plantation utilizes TypeScript on Vercel.`,
        type: 'info',
        actions: [
          { label: 'OPEN REVORA', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl },
          { label: 'VIEW TREE PLANTATION', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[1].liveUrl },
        ],
      };
    }

    // 11. PROJECTS INTENT ("Show me his projects", "What projects has he built?")
    if (
      lower === 'projects' ||
      lower.includes('project') ||
      lower.includes('built') ||
      lower.includes('portfolio') ||
      lower.includes('application')
    ) {
      return {
        text: `Naitik's portfolio includes featured projects and repositories:

1. REVORA — Autonomous AI Revenue Recovery Platform (Next.js, FastAPI, Supabase, AI Risk Engine, Voice Copilot). Live: https://revora-fawn.vercel.app/
2. TREE PLANTATION — Sustainability full-stack web app (TypeScript, Supabase, Vercel). Live: https://tree-plantation-xi.vercel.app/
3. EXPENSE TRACKER — Personal finance application (JavaScript, HTML, CSS, Data Visualization charts). Live: https://naitg94.github.io/Expense-Tracker/
4. GOYAL TRADERS — Real-world business website (HTML, CSS, JavaScript). Live: https://naitg94.github.io/Goyal-Traders-2/
5. MPLADS SENTINELS — GitHub Repository: https://github.com/Naitg94/MPLADS-Sentinals.git`,
        type: 'info',
        actions: [
          { label: 'OPEN REVORA', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl },
          { label: 'TREE PLANTATION (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[1].liveUrl },
          { label: 'EXPENSE TRACKER (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[2].liveUrl },
          { label: 'GOYAL TRADERS (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[3].liveUrl },
          { label: 'MPLADS GITHUB', actionType: 'github', url: PORTFOLIO_KNOWLEDGE.projects[4]?.githubUrl || 'https://github.com/Naitg94/MPLADS-Sentinals.git' },
        ],
      };
    }

    // 11. EDUCATION INTENT
    if (
      lower === 'education' ||
      lower.includes('study') ||
      lower.includes('studying') ||
      lower.includes('college') ||
      lower.includes('university') ||
      lower.includes('semester') ||
      lower.includes('sstc')
    ) {
      return {
        text: `Naitik is pursuing B.Tech in Computer Science Engineering (AI/ML) at Shri Shankaracharya Technical Campus (SSTC) in Bhilai, Chhattisgarh, India.

• Academic Period: 2025–2029
• Current Status: 2nd Semester
• Focus: Artificial Intelligence, Machine Learning, Autonomous AI Systems, Programming, Software Development.`,
        type: 'info',
      };
    }

    // 12. SKILLS INTENT
    const hasWordAI = /\bai\b/i.test(lower);
    const hasWordML = /\bml\b/i.test(lower);
    if (
      lower === 'skills' ||
      lower.includes('skill') ||
      lower.includes('technology') ||
      lower.includes('tech stack') ||
      lower.includes('next') ||
      lower.includes('fastapi') ||
      lower.includes('react') ||
      lower.includes('python') ||
      lower.includes('typescript') ||
      lower.includes('javascript') ||
      lower.includes('programming') ||
      hasWordAI ||
      hasWordML
    ) {
      return {
        text: `Naitik's verified skills matrix:

• PROGRAMMING: Python, TypeScript, JavaScript (building with)
• FRONTEND: Next.js, React, Tailwind CSS, React Query, Recharts, HTML5, CSS, Bootstrap (building with / working with)
• BACKEND / SYSTEMS: FastAPI, Node.js, PostgreSQL / Supabase, JWT / RBAC, PHP, DBMS (building with / working with)
• AI & INTELLIGENT SYSTEMS: AI Risk Engine, Voice Copilot & NLP, Artificial Intelligence, Machine Learning, AI Agents, Prompt Engineering, AI-Assisted Development
• TOOLS: GitHub, Supabase, Vercel`,
        type: 'info',
      };
    }

    // 13. BIO / ABOUT INTENT
    if (
      lower.includes('who is naitik') ||
      lower.includes('tell me about naitik') ||
      lower.includes('about him') ||
      lower.includes('who is he') ||
      lower.includes('bio')
    ) {
      return {
        text: `Naitik Goyal is an AI/ML Student & Developer based in Bhilai, Chhattisgarh, India.

He is in his 2nd Semester studying B.Tech in Computer Science Engineering (AI/ML) at Shri Shankaracharya Technical Campus (SSTC). He builds intelligent software products, such as REVORA (Autonomous AI Revenue Recovery Platform) and Tree Plantation.`,
        type: 'info',
        actions: [
          { label: 'OPEN REVORA', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl },
          { label: 'SEND EMAIL', actionType: 'email', url: `mailto:${PORTFOLIO_KNOWLEDGE.contact.email}` },
          { label: 'CONNECT ON LINKEDIN', actionType: 'linkedin', url: PORTFOLIO_KNOWLEDGE.contact.linkedin },
        ],
      };
    }

    // General fallback
    return {
      text: `Naitik Goyal is a 2nd Semester B.Tech CSE (AI/ML) student at SSTC building projects like REVORA (Autonomous AI Revenue Recovery Platform) and Tree Plantation. How can I help you explore his portfolio?`,
      type: 'info',
      actions: [
        { label: 'OPEN REVORA', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl },
        { label: 'SEND EMAIL', actionType: 'email', url: `mailto:${PORTFOLIO_KNOWLEDGE.contact.email}` },
        { label: 'DOWNLOAD RESUME (PDF)', actionType: 'resume', url: PORTFOLIO_KNOWLEDGE.contact.resumeUrl },
      ],
    };
  }
}

export const aiEngine = new AIEngine();
