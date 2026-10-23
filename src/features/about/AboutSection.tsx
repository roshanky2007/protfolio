import React from 'react';
import { motion } from 'framer-motion';
import { Code2, PenTool, Camera, Sparkles, Compass, Layers } from 'lucide-react';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { portfolioConfig } from '../../config/portfolio';

export const AboutSection: React.FC = () => {
  const { personal } = portfolioConfig;

  const getInterestIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'PenTool':
        return <PenTool className="w-5 h-5 text-violet-400" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-pink-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      default:
        return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Personal Storytelling"
          title="The Convergence of"
          highlight="Code & Creative Expression"
          description="A Computer Science student bridging algorithmic structure with visual narrative, camera optics, and graphite sketches."
        />

        {/* Main Editorial Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Narrative Story & Current Focus (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Current Focus Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 via-[#0d1326] to-[#0a0f1d] border border-violet-500/20 backdrop-blur-md flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-300 shrink-0">
                <Compass className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-400 font-semibold">
                  CURRENT DIRECTION & FOCUS
                </span>
                <p className="text-white text-base font-medium mt-0.5">
                  {personal.detailedBio.currentFocus}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Actively engineering full-stack platforms while experimenting with visual storytelling and generative tools.
                </p>
              </div>
            </motion.div>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              {personal.detailedBio.paragraphs.map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white/[0.02] p-4 rounded-xl border border-white/5"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-[#0b1021]/60 border-l-4 border-l-cyan-400 border border-white/10 italic text-slate-300 text-sm sm:text-base font-serif"
            >
              "{personal.detailedBio.quote}"
              <p className="not-italic text-xs font-mono font-medium text-cyan-400 mt-2 text-right">
                — Roshan Kumar Yadav
              </p>
            </motion.div>

          </div>

          {/* Right Column: Visual Collage & 4 Pillars (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Editorial Photo Collage: Sketch vs Night Photo */}
            <div className="grid grid-cols-2 gap-4">
              {/* Photo 1: Pencil Sketch Sample */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] bg-[#0c1020]"
              >
                <img
                  src="/images/gallery_sketch.jpg"
                  alt="Graphite Sketch Sample"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-violet-300 bg-violet-950/80 px-2 py-0.5 rounded border border-violet-500/30">
                    Art Form
                  </span>
                  <p className="text-xs font-semibold text-white mt-1">Pencil & Anime Art</p>
                </div>
              </motion.div>

              {/* Photo 2: Street Photography Sample */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] bg-[#0c1020] mt-6"
              >
                <img
                  src="/images/gallery_street.jpg"
                  alt="Street Photography Sample"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    Lenscraft
                  </span>
                  <p className="text-xs font-semibold text-white mt-1">Street & Low Light</p>
                </div>
              </motion.div>
            </div>

            {/* 4 Core Pillars of Creative Energy */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Creative Disciplines
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {personal.detailedBio.interests.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-violet-500/30 transition-all group"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 group-hover:scale-110 transition-transform">
                        {getInterestIcon(item.icon)}
                      </div>
                      <h5 className="text-xs font-semibold text-white font-display">
                        {item.title}
                      </h5>
                    </div>
                    <p className="text-[12px] text-slate-400 leading-normal font-light">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
