import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { GithubIcon } from '../../components/common/SocialIcons';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ProjectDetailModal } from './ProjectDetailModal';
import { portfolioConfig } from '../../config/portfolio';
import type { ProjectItem } from '../../types/portfolio';

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioConfig;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured'>('all');

  const filteredProjects =
    activeFilter === 'featured'
      ? projects.filter((p) => p.isFeatured)
      : projects;

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Portfolio Showcase"
          title="Featured Software &"
          highlight="System Architectures"
          description="A selection of web platforms, civic intelligence applications, and institutional software designed for real-world utility."
          action={
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeFilter === 'all'
                    ? 'bg-violet-600 text-white font-medium shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Works ({projects.length})
              </button>
              <button
                onClick={() => setActiveFilter('featured')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeFilter === 'featured'
                    ? 'bg-violet-600 text-white font-medium shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Featured Only
              </button>
            </div>
          }
        />

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-2xl overflow-hidden bg-[#0c1020]/80 border border-white/10 hover:border-violet-500/40 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col"
            >
              {/* Cover Image Container */}
              <div
                className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1020] via-transparent to-transparent opacity-80" />

                {/* Status Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wide bg-[#08090d]/85 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                    {project.status}
                  </span>
                  {project.isFeatured && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wide bg-violet-600/90 text-white flex items-center gap-1 backdrop-blur-md">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-violet-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 rounded-xl bg-[#08090d]/90 text-white text-xs font-mono border border-white/20 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    View Project Details ↗
                  </span>
                </div>
              </div>

              {/* Project Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-xl sm:text-2xl font-bold text-white font-display hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300 line-clamp-3 leading-relaxed font-light">
                    {project.shortDescription}
                  </p>

                  {/* Technology Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-slate-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded-lg text-xs font-mono text-slate-500">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300 group/btn"
                  >
                    <span>Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-violet-600/20 text-slate-400 hover:text-white border border-white/5 hover:border-violet-500/30 transition-all"
                        aria-label="View Github Repository"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-cyan-600/20 text-slate-400 hover:text-white border border-white/5 hover:border-cyan-500/30 transition-all"
                        aria-label="View Live Demo"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for full project view */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
