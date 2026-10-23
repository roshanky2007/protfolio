import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { InteractiveCanvas } from './InteractiveCanvas';
import { portfolioConfig } from '../../config/portfolio';

export const CreativeLabSection: React.FC = () => {
  const { creativeLab } = portfolioConfig;

  return (
    <section id="creativelab" className="py-24 relative overflow-hidden bg-[#07090f]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="My Universe & Creative Lab"
          title="Where Code & Imagination"
          highlight="Collide"
          description={creativeLab.description}
        />

        {/* Top Feature: Interactive Coding Experiment */}
        <div className="mb-14">
          <InteractiveCanvas />
        </div>

        {/* Creative Sandbox Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {creativeLab.experiments.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-2xl overflow-hidden bg-[#0c1020]/70 border border-white/10 hover:border-violet-500/30 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col"
            >
              {/* Media Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1020] via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-[#08090d]/85 text-violet-300 border border-violet-500/30 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-slate-400 border border-white/5"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Artistic Annotation Note */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-slate-500 max-w-xl mx-auto">
            * All sketches are hand-drawn with graphite pencils on heavy Bristol paper; street & portrait captures are color-graded in Adobe Lightroom.
          </p>
        </div>

      </div>
    </section>
  );
};
