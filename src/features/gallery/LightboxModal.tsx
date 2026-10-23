import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Tag, Sparkles } from 'lucide-react';
import type { GalleryItem } from '../../types/gallery';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(items.length - 1);
    }
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8">
        {/* Fullscreen Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#040508]/95 backdrop-blur-xl"
        />

        {/* Top Controls Bar */}
        <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between text-white pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono backdrop-blur-md border border-white/10">
              {currentIndex + 1} / {items.length}
            </span>
            <span className="px-3 py-1 rounded-full bg-violet-600/80 text-xs font-mono backdrop-blur-md">
              {currentItem.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/60 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 backdrop-blur-md pointer-events-auto transition-colors"
            aria-label="Close Lightbox (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-50 p-3 rounded-full bg-black/60 hover:bg-violet-600/80 text-white border border-white/15 backdrop-blur-md transition-all hover:scale-110"
              aria-label="Previous Image (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-50 p-3 rounded-full bg-black/60 hover:bg-violet-600/80 text-white border border-white/15 backdrop-blur-md transition-all hover:scale-110"
              aria-label="Next Image (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Main Content Card */}
        <div className="relative z-10 max-w-5xl max-h-[92vh] flex flex-col items-center justify-center">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative rounded-2xl overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-[#08090e] max-h-[75vh]"
          >
            <img
              src={currentItem.image_url}
              alt={currentItem.title}
              className="max-h-[75vh] w-auto max-w-full object-contain"
            />
          </motion.div>

          {/* Caption & Metadata Panel */}
          <motion.div
            key={`meta-${currentItem.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 w-full max-w-2xl text-center px-4"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              {currentItem.title}
            </h3>

            {currentItem.caption && (
              <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {currentItem.caption}
              </p>
            )}

            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-slate-400">
              {currentItem.date_taken && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>{currentItem.date_taken}</span>
                </span>
              )}

              {currentItem.tags && currentItem.tags.length > 0 && (
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3 text-violet-400" />
                  <span>{currentItem.tags.join(', ')}</span>
                </span>
              )}

              {currentItem.is_featured && (
                <span className="flex items-center gap-1 text-pink-400">
                  <Sparkles className="w-3 h-3" />
                  <span>Featured Work</span>
                </span>
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </AnimatePresence>
  );
};
