import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Code2, Camera, Palette, ExternalLink } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio';

export const HeroSection: React.FC = () => {
  const { personal } = portfolioConfig;
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle through the animated roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personal.roleTitles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [personal.roleTitles.length]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getRoleIcon = (role: string) => {
    if (role.includes('Developer')) return <Code2 className="w-4 h-4 text-cyan-400" />;
    if (role.includes('Student')) return <Terminal className="w-4 h-4 text-violet-400" />;
    if (role.includes('Photographer')) return <Camera className="w-4 h-4 text-pink-400" />;
    return <Palette className="w-4 h-4 text-amber-400" />;
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background ambient lighting orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-mono mb-6 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span>Open to Innovation & Collaboration</span>
            </motion.div>

            {/* Greeting & Name */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base font-mono tracking-widest uppercase text-cyan-400 mb-2"
            >
              Hello, I am
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-white leading-[1.08] mb-4"
            >
              Roshan Kumar <br />
              <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-pink-400 bg-clip-text text-transparent">
                Yadav.
              </span>
            </motion.h1>

            {/* Cycling Animated Role Headline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex items-center gap-2 sm:gap-3 text-lg sm:text-2xl font-medium text-slate-300 mb-6 h-10"
            >
              <span className="text-slate-400 font-light">I am a</span>
              <div className="relative inline-flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIndex}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white font-semibold font-display shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  >
                    {getRoleIcon(personal.roleTitles[roleIndex])}
                    <span>{personal.roleTitles[roleIndex]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Short Introduction Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-base sm:text-lg text-slate-300/90 max-w-xl font-light leading-relaxed mb-8"
            >
              {personal.shortBio}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="relative group px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white font-medium text-sm shadow-[0_0_25px_rgba(139,92,246,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2"
              >
                <span>Explore My Work</span>
                <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/40 text-slate-200 hover:text-white font-medium text-sm transition-all backdrop-blur-md flex items-center justify-center gap-2"
              >
                <span>Get In Touch</span>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </button>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 w-full max-w-lg"
            >
              <div>
                <p className="text-xl sm:text-2xl font-bold font-display text-white">B.Tech</p>
                <p className="text-xs font-mono text-slate-400 mt-0.5">CSE Undergrad</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-display text-cyan-400">4+</p>
                <p className="text-xs font-mono text-slate-400 mt-0.5">Core Projects</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-display text-violet-400">Multi</p>
                <p className="text-xs font-mono text-slate-400 mt-0.5">Disciplinary</p>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Column: Large Featured Portrait (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-md"
            >
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-violet-600 via-pink-500 to-cyan-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-1000 -z-10 animate-pulse" />

              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0a0d18] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden group">
                  <img
                    src={personal.avatarUrl}
                    alt={`${personal.name} — Creative Developer & Artist`}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                    fetchPriority="high"
                  />

                  {/* Gradient overlay at the bottom of the portrait */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/30 to-transparent pointer-events-none" />

                  {/* Handwritten / Editorial tag overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wide bg-[#08090d]/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                      FEATURED PORTRAIT
                    </span>
                  </div>

                  {/* Bottom Image Caption & Audio/Camera badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#0b1021]/85 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-mono text-violet-400 uppercase tracking-wider">
                          Creator Studio
                        </p>
                        <p className="text-sm font-semibold text-white mt-0.5">
                          Roshan Kumar Yadav
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                        <Camera className="w-3.5 h-3.5 text-cyan-400" />
                        <span>35mm / Code</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating creative note */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-5 -left-4 sm:-left-6 p-3 rounded-xl bg-[#0f142b]/95 border border-violet-500/30 shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-lg flex items-center gap-3 z-20"
              >
                <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/40 flex items-center justify-center">
                  <Palette className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-400">Creative Motto</p>
                  <p className="text-xs font-medium text-white">Art in Logic • Soul in Lens</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="mt-16 flex justify-center">
          <motion.button
            onClick={() => scrollToSection('about')}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
            aria-label="Scroll to about section"
          >
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
              Scroll To Discover
            </span>
            <div className="w-7 h-11 rounded-full border border-white/15 flex items-start justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
              />
            </div>
          </motion.button>
        </div>

      </div>
    </section>
  );
};
