import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Globe, Wrench, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { portfolioConfig } from '../../config/portfolio';

export const SkillsSection: React.FC = () => {
  const { skills } = portfolioConfig;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'programming':
        return <Terminal className="w-4 h-4 text-violet-400" />;
      case 'webdev':
        return <Globe className="w-4 h-4 text-cyan-400" />;
      case 'tools':
        return <Wrench className="w-4 h-4 text-pink-400" />;
      case 'creative':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      default:
        return <Code className="w-4 h-4 text-slate-400" />;
    }
  };

  const filteredCategories =
    selectedCategory === 'all'
      ? skills
      : skills.filter((c) => c.id === selectedCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#07080c]">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Technical Stack & Creative Craft"
          title="Capabilities Across"
          highlight="Code & Visuals"
          description="A balanced toolkit ranging from low-level systems programming and modern full-stack web technologies to camera optics and analog pencil art."
        />

        {/* Category Tabs Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wide transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            All Disciplines
          </button>

          {skills.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono tracking-wide transition-all ${
                  isSelected
                    ? 'bg-violet-600 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-violet-400/40'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {getCategoryIcon(category.id)}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Category Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-8 rounded-2xl bg-[#0c1020]/70 border border-white/10 hover:border-violet-500/30 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-md relative group"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                      {getCategoryIcon(category.id)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        {category.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-light mt-0.5">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                    {category.skills.length} Skills
                  </span>
                </div>

                {/* Skills Interactive Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.02, x: 2 }}
                      className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-violet-500/30 transition-all flex items-start justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: skill.color || '#8b5cf6' }}
                          />
                          <p className="text-sm font-semibold text-white tracking-wide">
                            {skill.name}
                          </p>
                        </div>
                        {skill.level && (
                          <p className="text-[11px] font-mono text-slate-400 mt-1 pl-4">
                            {skill.level}
                          </p>
                        )}
                      </div>
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Philosophy Note Banner */}
        <div className="mt-12 p-5 rounded-2xl bg-gradient-to-r from-violet-950/20 via-cyan-950/20 to-transparent border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Continuous learning mindset: Always exploring novel frameworks, micro-interactions, and creative code.</span>
          </div>
          <span className="text-violet-300 font-semibold shrink-0">
            Zero Fabricated Percentages • Verified Competencies
          </span>
        </div>

      </div>
    </section>
  );
};
