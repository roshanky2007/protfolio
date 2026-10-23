import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Trophy, Camera, Code2, Milestone } from 'lucide-react';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { portfolioConfig } from '../../config/portfolio';

export const JourneySection: React.FC = () => {
  const { journey } = portfolioConfig;

  const getMilestoneIcon = (iconName?: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4 text-violet-400" />;
      case 'Trophy':
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case 'Camera':
        return <Camera className="w-4 h-4 text-cyan-400" />;
      case 'Code2':
        return <Code2 className="w-4 h-4 text-pink-400" />;
      default:
        return <Milestone className="w-4 h-4 text-violet-400" />;
    }
  };

  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-[#06070b]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Milestones & Timeline"
          title="Education, Hackathons &"
          highlight="Key Journey Steps"
          description="A chronological record of academic pursuit, civic hackathon initiatives, and self-directed engineering breakthroughs."
        />

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto mt-12">
          
          {/* Vertical Glowing Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-violet-500 via-cyan-400 to-transparent opacity-30" />

          <div className="space-y-12">
            {journey.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#08090d] border-2 border-violet-500/60 shadow-[0_0_15px_rgba(139,92,246,0.6)] flex items-center justify-center z-10">
                    {getMilestoneIcon(item.icon)}
                  </div>

                  {/* Content Card (Half-width) */}
                  <div
                    className={`ml-12 md:ml-0 w-full md:w-[calc(50%-2.5rem)] ${
                      isEven ? 'md:text-left' : 'md:text-left'
                    }`}
                  >
                    <div className="p-6 rounded-2xl bg-[#0c1020]/70 border border-white/10 hover:border-violet-500/30 transition-all shadow-[0_10px_25px_rgba(0,0,0,0.4)] backdrop-blur-md group">
                      
                      {/* Year & Period Badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-violet-600/30 text-violet-300 border border-violet-500/30">
                          {item.year}
                        </span>
                        {item.period && (
                          <span className="text-xs font-mono text-slate-500">
                            • {item.period}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-xs font-mono text-cyan-400 mt-1">
                        {item.subtitle}
                      </p>

                      {/* Description */}
                      <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        {item.description}
                      </p>

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
