import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';

export const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formspreeKey = import.meta.env.VITE_FORMSPREE_KEY;
    const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY;

    try {
      if (formspreeKey) {
        const response = await fetch(`https://formspree.io/f/${formspreeKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(formState),
        });

        if (response.ok) {
          setStatus('success');
          setStatusMessage('Thank you! Your message has been sent successfully.');
          setFormState({ name: '', email: '', subject: '', message: '' });
          return;
        }
      } else if (web3formsKey) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ access_key: web3formsKey, ...formState }),
        });

        if (response.ok) {
          setStatus('success');
          setStatusMessage('Thank you! Your message has been sent successfully.');
          setFormState({ name: '', email: '', subject: '', message: '' });
          return;
        }
      }

      // Fallback to mailto if no API key is configured or API returns non-200
      const mailtoSubject = encodeURIComponent(
        formState.subject ? `[Portfolio Contact] ${formState.subject}` : 'Portfolio Inquiry'
      );
      const mailtoBody = encodeURIComponent(
        `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
      );
      window.location.href = `mailto:${PORTFOLIO_CONTENT.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

      setStatus('success');
      setStatusMessage('Opening your email client to send the message...');
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setStatusMessage('Something went wrong. Please reach out directly via email.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-5 shadow-xs"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Your Name <span className="text-indigo-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formState.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Email Address <span className="text-indigo-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formState.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="subject" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formState.subject}
          onChange={handleChange}
          placeholder="Project collaboration, internship, or inquiry"
          className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Message <span className="text-indigo-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formState.message}
          onChange={handleChange}
          placeholder="Tell me about your project, idea, or questions..."
          className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-indigo-500 transition-colors resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 shadow-xs hover:shadow-indigo-500/25 disabled:opacity-60 cursor-pointer"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </>
        )}
      </button>

      {status === 'success' && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>{statusMessage}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{statusMessage}</span>
        </div>
      )}
    </form>
  );
};
