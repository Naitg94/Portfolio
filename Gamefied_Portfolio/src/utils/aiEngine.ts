import { PORTFOLIO_KNOWLEDGE } from '../data/knowledgeBase';

export interface ActionButton {
  label: string;
  actionType: 'email' | 'linkedin' | 'github' | 'external';
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
• "Tell me about Tree Plantation"
• "Tell me about Expense Tracker"
• "Show me his projects"
• "Which project uses Supabase?"
• "What technologies does he work with?"
• "What is he currently studying?"
• "Why should I hire Naitik?"
• "Show me his GitHub"`,
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
        text: `Based on his current portfolio, Naitik is a strong candidate for student developer, engineering internship, or full-stack software opportunities.

Key Portfolio Strengths:
• Academic Focus: Pursuing B.Tech in CSE (AI/ML) at SSTC (2nd Semester).
• Practical Project Building: Full-stack applications like Tree Plantation (TypeScript, Supabase) and Expense Tracker (analytics & charts).
• Business Exposure: Real-world family store operations at Goyal Traders & E-Summit stall coordination.
• Certified Web & AI Training: Certified 8-week Full-Stack Web Development with AI (84% score).`,
        type: 'success',
        actions: [
          { label: 'TREE PLANTATION (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl },
          { label: 'SEND EMAIL', actionType: 'email', url: `mailto:${PORTFOLIO_KNOWLEDGE.contact.email}` },
          { label: 'CONNECT ON LINKEDIN', actionType: 'linkedin', url: PORTFOLIO_KNOWLEDGE.contact.linkedin },
        ],
      };
    }

    // 4. TREE PLANTATION SOURCE CODE INQUIRY INTENT
    if (
      (lower.includes('tree plantation') || lower.includes('tree-plantation')) &&
      (lower.includes('github') || lower.includes('source') || lower.includes('repo') || lower.includes('code'))
    ) {
      return {
        text: `The source code repository for Tree Plantation is private and not publicly available. However, the project is deployed live and fully accessible to explore:`,
        type: 'info',
        actions: [
          { label: 'TREE PLANTATION (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl },
        ],
      };
    }

    // 5. GITHUB INTENT
    if (lower === 'github' || lower.includes('github') || lower.includes('repository') || lower.includes('source code')) {
      return {
        text: `Explore Naitik's public repositories and project code on GitHub: ${PORTFOLIO_KNOWLEDGE.contact.github}

• EXPENSE TRACKER: https://github.com/Naitg94/Expense-Tracker.git (PUBLIC SOURCE AVAILABLE)
• GOYAL TRADERS: https://github.com/Naitg94/Goyal-Traders-2.git (PUBLIC SOURCE AVAILABLE)
• Note: Tree Plantation source repository is private and not publicly available.`,
        type: 'info',
        actions: [
          { label: 'OPEN GITHUB', actionType: 'github', url: PORTFOLIO_KNOWLEDGE.contact.github },
          { label: 'EXPENSE TRACKER REPO', actionType: 'github', url: PORTFOLIO_KNOWLEDGE.projects[1].githubUrl },
          { label: 'GOYAL TRADERS REPO', actionType: 'github', url: PORTFOLIO_KNOWLEDGE.projects[2].githubUrl },
        ],
      };
    }

    // 6. LINKEDIN INTENT
    if (lower === 'linkedin' || lower.includes('linkedin')) {
      return {
        text: `Connect with Naitik Goyal professionally on LinkedIn: ${PORTFOLIO_KNOWLEDGE.contact.linkedin}`,
        type: 'info',
        actions: [
          { label: 'CONNECT ON LINKEDIN', actionType: 'linkedin', url: PORTFOLIO_KNOWLEDGE.contact.linkedin },
        ],
      };
    }

    // 7. CONTACT INTENT
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

    // 8. PROJECT COMPARISONS & REPO AVAILABILITY INTENT
    if (
      lower.includes('compare') ||
      lower.includes('live demo') ||
      lower.includes('public github') ||
      lower.includes('which project has')
    ) {
      return {
        text: `Technical overview and public source availability for Naitik's projects:

• TREE PLANTATION: Sustainability Web Application (Live: https://tree-plantation-xi.vercel.app/ | SOURCE NOT PUBLICLY AVAILABLE)
• EXPENSE TRACKER: Personal Finance Tool (Live: https://expense-tracker-six-nu-33.vercel.app/ | PUBLIC SOURCE AVAILABLE)
• GOYAL TRADERS: Business Website (Live: https://naitg94.github.io/Goyal-Traders-2/ | PUBLIC SOURCE AVAILABLE)`,
        type: 'info',
        actions: [
          { label: 'TREE PLANTATION (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl },
          { label: 'EXPENSE TRACKER (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[1].liveUrl },
          { label: 'GOYAL TRADERS (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[2].liveUrl },
        ],
      };
    }

    if (lower.includes('supabase') || ((recentUserText.includes('project') || recentUserText.includes('work')) && lower.includes('which one'))) {
      return {
        text: `TREE PLANTATION (Project 01) uses Supabase / PostgreSQL for database management and backend data structures, paired with TypeScript on Vercel.`,
        type: 'info',
        actions: [
          { label: 'VIEW TREE PLANTATION', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl },
        ],
      };
    }

    // 9. PROJECTS INTENT ("Show me his projects", "What projects has he built?")
    if (
      lower === 'projects' ||
      lower.includes('project') ||
      lower.includes('built') ||
      lower.includes('portfolio') ||
      lower.includes('application')
    ) {
      return {
        text: `Naitik's portfolio includes 3 verified projects:

1. TREE PLANTATION — Sustainability full-stack web app (TypeScript, Supabase, Vercel). Live: https://tree-plantation-xi.vercel.app/ (Source code repository is private)
2. EXPENSE TRACKER — Personal finance application (JavaScript, HTML, CSS, Data Visualization charts). Live: https://expense-tracker-six-nu-33.vercel.app/
3. GOYAL TRADERS — Real-world business website (HTML, CSS, JavaScript). Live: https://naitg94.github.io/Goyal-Traders-2/`,
        type: 'info',
        actions: [
          { label: 'TREE PLANTATION (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl },
          { label: 'EXPENSE TRACKER (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[1].liveUrl },
          { label: 'GOYAL TRADERS (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[2].liveUrl },
        ],
      };
    }

    // 10. EDUCATION INTENT
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
• Focus: Artificial Intelligence, Machine Learning, Programming, Software Development.`,
        type: 'info',
      };
    }

    // 11. SKILLS INTENT
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

• PROGRAMMING: Python, TypeScript, JavaScript
• FRONTEND: Next.js, React, Tailwind CSS, React Query, Recharts, HTML5, CSS, Bootstrap
• BACKEND / SYSTEMS: FastAPI, Node.js, PostgreSQL / Supabase, JWT / RBAC, PHP, DBMS
• AI & INTELLIGENT SYSTEMS: AI Risk Engine, Voice Copilot & NLP, Artificial Intelligence, Machine Learning, AI Agents, Prompt Engineering, AI-Assisted Development
• TOOLS: GitHub, Supabase, Vercel`,
        type: 'info',
      };
    }

    // 12. BIO / ABOUT INTENT
    if (
      lower.includes('who is naitik') ||
      lower.includes('tell me about naitik') ||
      lower.includes('about him') ||
      lower.includes('who is he') ||
      lower.includes('bio')
    ) {
      return {
        text: `Naitik Goyal is an AI/ML Student & Developer based in Bhilai, Chhattisgarh, India.

He is in his 2nd Semester studying B.Tech in Computer Science Engineering (AI/ML) at Shri Shankaracharya Technical Campus (SSTC). He builds software products, such as Tree Plantation (Sustainability Full-Stack App), Expense Tracker (Personal Finance Tool), and Goyal Traders.`,
        type: 'info',
        actions: [
          { label: 'TREE PLANTATION (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl },
          { label: 'SEND EMAIL', actionType: 'email', url: `mailto:${PORTFOLIO_KNOWLEDGE.contact.email}` },
          { label: 'CONNECT ON LINKEDIN', actionType: 'linkedin', url: PORTFOLIO_KNOWLEDGE.contact.linkedin },
        ],
      };
    }

    // General fallback
    return {
      text: `Naitik Goyal is a 2nd Semester B.Tech CSE (AI/ML) student at SSTC building projects like Tree Plantation, Expense Tracker, and Goyal Traders. How can I help you explore his portfolio?`,
      type: 'info',
      actions: [
        { label: 'TREE PLANTATION (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl },
        { label: 'EXPENSE TRACKER (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[1].liveUrl },
        { label: 'SEND EMAIL', actionType: 'email', url: `mailto:${PORTFOLIO_KNOWLEDGE.contact.email}` },
      ],
    };
  }
}

export const aiEngine = new AIEngine();
