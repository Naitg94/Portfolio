import React, { useState } from 'react';
import { Mail, MapPin, ArrowUpRight, Clock, Check, Copy } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { ContactForm } from '../components/ContactForm';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_CONTENT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        badge="Direct Channels"
        title="Start a Conversation"
        description="Available for engineering internships, autonomous AI initiatives, and production software builds."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Info & Quick Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium border border-emerald-200 dark:border-emerald-800">
                <Clock className="w-3 h-3" />
                <span>Replies typically within 24 hours</span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                One-Click Direct Contact
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Whether you have an internship inquiry, technical question about REVORA, or want to discuss full-stack & AI architecture:
              </p>
            </div>

            {/* Direct Email Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href={`mailto:${PORTFOLIO_CONTENT.email}?subject=Engineering%20Inquiry%20via%20Portfolio`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
              >
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>Send Email</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl font-semibold text-xs bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700 cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>

            {/* What I'm Open For */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 space-y-1.5 text-xs">
              <div className="font-mono uppercase text-[10px] tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                Actively Seeking
              </div>
              <ul className="space-y-1 text-zinc-600 dark:text-zinc-300">
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-indigo-500" />
                  <span>AI/ML & Full-Stack Developer Internships (Summer/Fall)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-indigo-500" />
                  <span>Autonomous AI Systems & Voice NLP Engineering</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-indigo-500" />
                  <span>Next.js / FastAPI Web Product Collaborations</span>
                </li>
              </ul>
            </div>

            {/* Contact Details List */}
            <div className="space-y-3.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-xs sm:text-sm">
              <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-indigo-500 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Direct Email
                  </div>
                  <a
                    href={`mailto:${PORTFOLIO_CONTENT.email}`}
                    className="font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-mono"
                  >
                    {PORTFOLIO_CONTENT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-indigo-500 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Location & Mobility
                  </div>
                  <div className="font-medium">{PORTFOLIO_CONTENT.location} (Open to Remote Worldwide)</div>
                </div>
              </div>
            </div>

            {/* Social Network Buttons */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2.5">
                Profiles & Repositories
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://github.com/Naitg94"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>

                <a
                  href="https://linkedin.com/in/naitik-goyal-843504399"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-blue-500" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
