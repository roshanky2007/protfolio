import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowUp, Shield, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import { portfolioConfig } from '../../config/portfolio';

export const Footer: React.FC = () => {
  const { personal } = portfolioConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#06070a] pt-16 pb-12 overflow-hidden z-10">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-violet-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Identity & Motto */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 p-[1px]">
                <div className="w-full h-full bg-[#08090d] rounded-xl flex items-center justify-center font-display font-bold text-base text-white">
                  R
                </div>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                ROSHAN <span className="text-violet-400 font-light">KUMAR YADAV</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              {personal.tagline}
            </p>

            <blockquote className="text-xs italic font-serif text-violet-300/80 border-l-2 border-violet-500/40 pl-3 py-1">
              "{personal.detailedBio.quote}"
            </blockquote>
          </div>

          {/* Col 2: Navigation shortcuts */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-cyan-300 transition-colors">
                  About Story
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-300 transition-colors">
                  Technical Stack
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-300 transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-cyan-300 transition-colors">
                  Photo & Sketch Gallery
                </a>
              </li>
              <li>
                <a href="#creativelab" className="hover:text-cyan-300 transition-colors">
                  Creative Lab
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-cyan-300 transition-colors">
                  Milestones & Journey
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Admin */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300">
              Connect & Admin
            </h4>

            <div className="flex items-center gap-3">
              <a
                href={personal.social.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-violet-600/20 text-slate-400 hover:text-white border border-white/5 hover:border-violet-500/30 transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-violet-600/20 text-slate-400 hover:text-white border border-white/5 hover:border-violet-500/30 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-violet-600/20 text-slate-400 hover:text-white border border-white/5 hover:border-violet-500/30 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personal.social.email}`}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-violet-600/20 text-slate-400 hover:text-white border border-white/5 hover:border-violet-500/30 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-violet-300 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-violet-500/10 border border-white/10 hover:border-violet-500/30 transition-all"
              >
                <Shield className="w-3.5 h-3.5 text-violet-400" />
                <span>Admin Upload Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            Designed & Engineered with{' '}
            <Heart className="w-3.5 h-3.5 text-pink-500 inline fill-pink-500/20" /> by{' '}
            <span className="text-slate-300 font-medium">Roshan Kumar Yadav</span>
          </p>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-slate-600">
              React • TypeScript • Tailwind • Supabase
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
