import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, Copy, Check, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../../components/common/SocialIcons';
import confetti from 'canvas-confetti';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { submitContactMessage } from '../../lib/storage';
import { portfolioConfig } from '../../config/portfolio';

export const ContactSection: React.FC = () => {
  const { personal } = portfolioConfig;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Spam protection
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.social.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot check
    if (formData.honeypot) {
      return;
    }

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    try {
      setStatus('loading');
      setErrorMessage('');

      await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'Portfolio Contact Inquiry',
        message: formData.message.trim(),
      });

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });

      // Trigger celebratory confetti
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#8b5cf6', '#06b6d4', '#ec4899'],
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#07090f]">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Initiate Dialogue"
          title="Let's Build Something"
          highlight="Exceptional Together"
          description="Have a project in mind, an engineering problem to discuss, or want to collaborate on creative visual work? Reach out anytime."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Left Column: Direct Contacts & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#0c1020]/70 border border-white/10 backdrop-blur-md space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  Direct Contact Information
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Based in {personal.location} • Open to remote and worldwide collaborations.
                </p>
              </div>

              {/* Email Card with 1-click copy */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-violet-600/20 text-violet-400 border border-violet-500/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase text-slate-400">Direct Email</p>
                    <a
                      href={`mailto:${personal.social.email}`}
                      className="text-sm font-medium text-white hover:text-cyan-300 transition-colors"
                    >
                      {personal.social.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Social Channels List */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Connect on Social & Code
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href={personal.social.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-violet-600/20 border border-white/5 hover:border-violet-500/30 flex flex-col items-center justify-center gap-1.5 text-center transition-all group"
                  >
                    <GithubIcon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                    <span className="text-xs font-medium text-slate-300 group-hover:text-white">
                      GitHub
                    </span>
                  </a>

                  <a
                    href={personal.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-600/20 border border-white/5 hover:border-cyan-500/30 flex flex-col items-center justify-center gap-1.5 text-center transition-all group"
                  >
                    <LinkedinIcon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                    <span className="text-xs font-medium text-slate-300 group-hover:text-white">
                      LinkedIn
                    </span>
                  </a>

                  <a
                    href={personal.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-pink-600/20 border border-white/5 hover:border-pink-500/30 flex flex-col items-center justify-center gap-1.5 text-center transition-all group"
                  >
                    <InstagramIcon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                    <span className="text-xs font-medium text-slate-300 group-hover:text-white">
                      Instagram
                    </span>
                  </a>
                </div>
              </div>

              {/* Response Time Guarantee */}
              <div className="pt-2 text-xs font-mono text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Typical response time: within 24-48 hours.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1020]/80 border border-white/10 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              
              <h3 className="text-xl font-bold text-white font-display mb-1">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-mono">
                Submissions are stored securely and delivered to Roshan's mailbox.
              </p>

              {/* Status alerts */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs font-mono flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Message Transmitted Successfully!</p>
                    <p className="mt-0.5 text-emerald-300/80">
                      Thank you for reaching out. I have received your message and will get back to you shortly.
                    </p>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs font-mono flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Unable to Send Message</p>
                    <p className="mt-0.5 text-rose-300/80">{errorMessage}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for bot spam */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Subject / Project Context
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Collaboration on Civic Tech / Web Project"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your ideas, questions, or opportunities..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium text-sm shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
