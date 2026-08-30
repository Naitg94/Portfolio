import React, { useState, useRef, useEffect } from 'react';
import { Bot, Mail, Download, CornerDownLeft, Sparkles, Send, ExternalLink, RefreshCw } from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { soundFx } from '../utils/sound';
import { aiEngine } from '../utils/aiEngine';
import type { AIResponse, ActionButton } from '../utils/aiEngine';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: 'gemini' | 'local';
  type?: 'success' | 'info' | 'cmd' | 'error';
  actions?: ActionButton[];
  timestamp: string;
}

export const ContactTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiStatus, setAiStatus] = useState<'AI_READY' | 'AI_CONNECTED' | 'LOCAL_MODE' | 'AI_UNAVAILABLE'>('AI_READY');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `NAITIK.OS AI ASSISTANT ONLINE

I can help you explore Naitik's portfolio:
• Projects & technical comparisons
• Listed skills & technologies
• Current B.Tech (AI/ML) studies
• Achievements & experiences
• Resume & direct contact channels

Ask me any natural question below.`,
      source: 'local',
      type: 'info',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const suggestionChips = [
    'Who is Naitik?',
    'Why should I hire Naitik?',
    'Show me his projects',
    'Based on his current portfolio, what project should he build next?',
    'Compare Tree Plantation and Expense Tracker',
    'Which project uses Supabase?',
  ];

  // Initial Health Check on component mount
  useEffect(() => {
    aiEngine.checkServerStatus().then((status) => {
      if (status.configured) {
        setAiStatus('AI_READY');
      } else {
        setAiStatus('LOCAL_MODE');
      }
    });
  }, []);

  const scrollToTerminalBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Only scroll the internal terminal message box if user has interacted (messages > 1) or is processing
    if (messages.length > 1 || isProcessing) {
      scrollToTerminalBottom();
    }
  }, [messages, isProcessing]);

  const handleQuerySubmit = async (queryText: string) => {
    const query = queryText.trim();
    if (!query || isProcessing) return;

    soundFx.playClick();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsProcessing(true);

    // AI Query Execution
    try {
      const response: AIResponse = await aiEngine.processQuery(query);
      setIsProcessing(false);

      if (response.source === 'gemini') {
        setAiStatus('AI_CONNECTED');
      } else {
        setAiStatus(response.source === 'local' ? 'LOCAL_MODE' : 'AI_UNAVAILABLE');
      }

      if (query.toLowerCase() === 'clear') {
        setMessages([
          {
            id: `clear-${Date.now()}`,
            sender: 'assistant',
            text: 'CONVERSATION CLEARED. How can I assist you?',
            source: 'local',
            type: 'info',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        return;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        source: response.source,
        type: response.type || 'info',
        actions: response.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      soundFx.playUnlock();
    } catch {
      setIsProcessing(false);
      setAiStatus('AI_UNAVAILABLE');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleQuerySubmit(inputVal);
  };

  const handleActionButtonClick = (action: ActionButton) => {
    soundFx.playClick();
    if (action.actionType === 'email') {
      window.location.href = action.url || `mailto:${CONTACT_INFO.email}`;
    } else if (action.actionType === 'linkedin') {
      window.open(action.url || CONTACT_INFO.linkedin, '_blank', 'noopener,noreferrer');
    } else if (action.actionType === 'github') {
      window.open(action.url || CONTACT_INFO.github, '_blank', 'noopener,noreferrer');
    } else if (action.actionType === 'external') {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    } else if (action.actionType === 'resume') {
      const link = document.createElement('a');
      link.href = action.url || '/Naitik_Goyal_Resume.pdf';
      link.download = 'Naitik_Goyal_Resume.pdf';
      link.click();
    }
  };

  const getStatusBadge = () => {
    switch (aiStatus) {
      case 'AI_CONNECTED':
        return (
          <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            AI CONNECTED (GEMINI)
          </span>
        );
      case 'AI_READY':
        return (
          <span className="text-[10px] text-[#35E5FF] font-semibold px-2 py-0.5 rounded bg-[#35E5FF]/10 border border-[#35E5FF]/30">
            AI READY
          </span>
        );
      case 'LOCAL_MODE':
        return (
          <span className="text-[10px] text-[#4DA3FF] font-semibold px-2 py-0.5 rounded bg-[#4DA3FF]/10 border border-[#4DA3FF]/30">
            LOCAL MODE
          </span>
        );
      case 'AI_UNAVAILABLE':
        return (
          <span className="text-[10px] text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
            AI UNAVAILABLE
          </span>
        );
    }
  };

  return (
    <section id="contact" className="py-20 px-4 relative z-10 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-1.5 h-8 bg-[#35E5FF] rounded-full shadow-[0_0_10px_#35E5FF]" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-wider flex items-center gap-3">
            <span>CONTACT & AI CHATBOT</span>
            <Bot className="w-6 h-6 text-[#35E5FF] animate-pulse" />
          </h2>
          <p className="text-xs font-mono text-slate-400">Open Communication Channel & Intelligent Conversational Interface</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct Communication Channels & Resume Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="cyber-glass p-6 sm:p-8 rounded-2xl border border-[#35E5FF]/30 space-y-6 shadow-xl relative cyber-border-corner">
            <div>
              <h3 className="text-xl font-bold font-heading text-white tracking-wide mb-2">
                HAVE AN IDEA, PROJECT OR OPPORTUNITY?
              </h3>
              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                Open a communication channel. I am always open to exploring new intelligent systems, engineering projects, and collaborations.
              </p>
            </div>

            {/* Communication Channels */}
            <div className="space-y-4 font-mono text-xs">
              {/* Email */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#080C16] border border-[#35E5FF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full min-w-0 overflow-hidden">
                <div className="flex items-center gap-3 min-w-0 flex-1 w-full sm:w-auto overflow-hidden">
                  <div className="p-2 rounded bg-[#35E5FF]/10 text-[#35E5FF] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <div className="text-slate-400 text-[10px] sm:text-xs tracking-wide uppercase truncate">DIRECT EMAIL</div>
                    <div className="text-white font-bold text-xs truncate font-mono block">{CONTACT_INFO.email}</div>
                  </div>
                </div>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  onClick={() => soundFx.playClick()}
                  className="w-full sm:w-auto px-3.5 py-2 rounded bg-[#35E5FF] text-[#05070D] font-bold hover:shadow-[0_0_15px_#35E5FF] transition-all text-center shrink-0 whitespace-nowrap text-xs"
                >
                  [ SEND EMAIL ]
                </a>
              </div>

              {/* GitHub */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#080C16] border border-[#35E5FF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full min-w-0 overflow-hidden">
                <div className="flex items-center gap-3 min-w-0 flex-1 w-full sm:w-auto overflow-hidden">
                  <div className="p-2 rounded bg-[#4DA3FF]/10 text-[#4DA3FF] shrink-0">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <div className="text-slate-400 text-[10px] sm:text-xs tracking-wide uppercase truncate">GITHUB REPOSITORIES</div>
                    <div className="text-white font-bold text-xs truncate font-mono block">github.com/Naitg94</div>
                  </div>
                </div>
                <a
                  href={CONTACT_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="w-full sm:w-auto px-3.5 py-2 rounded border border-[#4DA3FF]/40 text-[#4DA3FF] font-bold hover:bg-[#4DA3FF]/10 transition-all text-center shrink-0 whitespace-nowrap text-xs"
                >
                  [ OPEN GITHUB ]
                </a>
              </div>

              {/* LinkedIn */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#080C16] border border-[#35E5FF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full min-w-0 overflow-hidden">
                <div className="flex items-center gap-3 min-w-0 flex-1 w-full sm:w-auto overflow-hidden">
                  <div className="p-2 rounded bg-[#8D7BFF]/10 text-[#8D7BFF] shrink-0">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <div className="text-slate-400 text-[10px] sm:text-xs tracking-wide uppercase truncate">LINKEDIN NETWORK</div>
                    <div className="text-white font-bold text-xs truncate font-mono block">linkedin.com/in/naitik-goyal</div>
                  </div>
                </div>
                <a
                  href={CONTACT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="w-full sm:w-auto px-3.5 py-2 rounded border border-[#8D7BFF]/40 text-[#8D7BFF] font-bold hover:bg-[#8D7BFF]/10 transition-all text-center shrink-0 whitespace-nowrap text-xs"
                >
                  [ CONNECT ON LINKEDIN ]
                </a>
              </div>
            </div>

            {/* Resume Button */}
            <div className="pt-2">
              <a
                href="/Naitik_Goyal_Resume.pdf"
                download="Naitik_Goyal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#35E5FF] to-[#4DA3FF] text-[#05070D] font-mono font-bold text-xs tracking-wider hover:shadow-[0_0_20px_#35E5FF] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Conversational NAITIK.OS AI CHATBOT Terminal */}
        <div className="lg:col-span-7">
          <div className="cyber-glass p-4 sm:p-6 rounded-2xl border border-[#35E5FF]/40 h-full flex flex-col justify-between font-mono text-xs shadow-2xl relative cyber-border-corner bg-[#080C16]/95 min-h-[480px] sm:min-h-[520px] max-w-full overflow-hidden">
            
            {/* Terminal Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[#35E5FF]/20 pb-3 mb-4 gap-2 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-2 text-slate-100 font-bold tracking-wider">
                  <Bot className="w-4 h-4 text-[#35E5FF]" />
                  <span>NAITIK.OS AI CHATBOT</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge()}
                  <div className="hidden sm:flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                </div>
              </div>

              {/* Scrollable Conversation Container */}
              <div
                ref={messagesContainerRef}
                className="space-y-4 max-h-[300px] sm:max-h-[390px] overflow-y-auto pr-1 sm:pr-2 mb-4 scrollbar-thin max-w-full"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`space-y-1.5 ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {/* Message Header Label */}
                    <div className="text-[10px] text-slate-400 flex items-center justify-between gap-1.5 px-1">
                      {msg.sender === 'user' ? (
                        <span className="text-[#35E5FF] font-bold ml-auto">visitor@naitik.os:~$</span>
                      ) : (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <Bot className="w-3 h-3 text-[#35E5FF]" />
                            NAITIK.OS AI
                          </span>
                          {/* Response Source Badge */}
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded border font-mono font-bold ${
                              msg.source === 'gemini'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                            }`}
                          >
                            {msg.source === 'gemini' ? 'GEMINI AI' : 'LOCAL FALLBACK'}
                          </span>
                        </div>
                      )}
                      <span className="text-slate-600">[{msg.timestamp}]</span>
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`p-3.5 rounded-xl text-xs leading-relaxed whitespace-pre-line inline-block max-w-[98%] sm:max-w-[95%] break-words ${
                        msg.sender === 'user'
                          ? 'bg-[#35E5FF]/10 text-white border border-[#35E5FF]/40 text-left'
                          : msg.type === 'success'
                          ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(52,211,153,0.15)]'
                          : 'bg-[#0A1020] text-slate-200 border border-[#35E5FF]/20'
                      }`}
                    >
                      {msg.text}

                      {/* Contextual External/Action Buttons */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-3 mt-2 border-t border-[#35E5FF]/20">
                          {msg.actions.map((act, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleActionButtonClick(act)}
                              className="px-2.5 py-1.5 rounded bg-[#35E5FF]/15 text-[#35E5FF] border border-[#35E5FF]/40 font-bold text-[10px] sm:text-[11px] hover:bg-[#35E5FF] hover:text-[#05070D] transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_10px_rgba(53,229,255,0.1)]"
                            >
                              <span>[ {act.label} ]</span>
                              {act.actionType === 'email' && <Send className="w-3 h-3" />}
                              {act.actionType === 'resume' && <Download className="w-3 h-3" />}
                              {(act.actionType === 'github' || act.actionType === 'linkedin' || act.actionType === 'external') && (
                                <ExternalLink className="w-3 h-3" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Processing State */}
                {isProcessing && (
                  <div className="flex items-center gap-2 text-xs text-[#35E5FF] bg-[#0A1020] p-3 rounded-xl border border-[#35E5FF]/30 w-fit">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>NAITIK.OS is thinking...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Input & Suggestion Chips */}
            <div className="space-y-3 pt-3 border-t border-[#35E5FF]/20">
              {/* Prompt Suggestion Chips */}
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                <span className="text-slate-400 py-1 flex items-center gap-1 pr-1">
                  <Sparkles className="w-3 h-3 text-[#35E5FF]" />
                  ASK:
                </span>
                {suggestionChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuerySubmit(chip)}
                    className="px-2 py-1 rounded bg-[#080C16] text-slate-300 border border-[#35E5FF]/25 hover:text-[#35E5FF] hover:border-[#35E5FF] hover:bg-[#35E5FF]/10 transition-all cursor-pointer text-left break-words max-w-full"
                  >
                    [ {chip} ]
                  </button>
                ))}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleFormSubmit}>
                <div className="flex items-center gap-2 bg-[#05070D] px-3 py-2.5 rounded-xl border border-[#35E5FF]/40 focus-within:border-[#35E5FF] focus-within:shadow-[0_0_15px_rgba(53,229,255,0.2)] transition-all">
                  <span className="text-[#35E5FF] font-bold hidden sm:inline">visitor@naitik.os:~$</span>
                  <span className="text-[#35E5FF] font-bold sm:hidden">~$</span>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask NAITIK.OS AI anything..."
                    disabled={isProcessing}
                    className="flex-1 bg-transparent text-white focus:outline-none text-xs font-mono placeholder:text-slate-500 min-w-0"
                  />
                  <button
                    type="submit"
                    disabled={isProcessing || !inputVal.trim()}
                    className="text-slate-400 hover:text-[#35E5FF] disabled:opacity-40 cursor-pointer p-1 shrink-0"
                  >
                    <CornerDownLeft className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
