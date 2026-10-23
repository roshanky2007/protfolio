import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Maximize2 } from 'lucide-react';
import type { GalleryItem } from '../../types/gallery';

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item, index, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.08 }}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden bg-[#0c1020] border border-white/10 hover:border-violet-500/40 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.5)] cursor-pointer mb-6 break-inside-avoid"
    >
      {/* Image container */}
      <div className="relative overflow-hidden">
        <img
          src={item.image_url}
          alt={item.title}
          loading="lazy"
          className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Ambient Hover Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-[#060810]/40 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Badges on Top */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-[#08090d]/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
            {item.category}
          </span>

          {item.is_featured && (
            <span className="p-1.5 rounded-full bg-violet-600/90 text-white shadow-md backdrop-blur-md">
              <Sparkles className="w-3 h-3" />
            </span>
          )}
        </div>

        {/* Expand icon in center on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="p-3 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md transform scale-90 group-hover:scale-100 transition-transform">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>

        {/* Caption & Metadata Reveal on Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <h4 className="text-sm sm:text-base font-bold text-white font-display">
            {item.title}
          </h4>

          {item.caption && (
            <p className="text-xs text-slate-300 line-clamp-2 mt-1 font-light leading-snug">
              {item.caption}
            </p>
          )}

          {item.date_taken && (
            <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-slate-400">
              <Calendar className="w-3 h-3 text-cyan-400" />
              <span>{item.date_taken}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
