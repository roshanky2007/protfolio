import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Sparkles } from 'lucide-react';
import type { GalleryItem, GalleryCategory } from '../../types/gallery';

interface AdminEditModalProps {
  item: GalleryItem | null;
  isOpen: boolean;
  isSaving: boolean;
  onSave: (id: string, updates: Partial<GalleryItem>) => Promise<void>;
  onClose: () => void;
}

const CATEGORIES: GalleryCategory[] = [
  'Photography',
  'Portraits',
  'Sketches',
  'Editing',
  'Personal',
  'Other',
];

export const AdminEditModal: React.FC<AdminEditModalProps> = ({
  item,
  isOpen,
  isSaving,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<GalleryCategory>('Photography');
  const [dateTaken, setDateTaken] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [tagsStr, setTagsStr] = useState('');

  useEffect(() => {
    if (item) {
      setTitle(item.title || '');
      setCaption(item.caption || '');
      setCategory(item.category || 'Photography');
      setDateTaken(item.date_taken || '');
      setIsFeatured(Boolean(item.is_featured));
      setTagsStr(item.tags?.join(', ') || '');
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    await onSave(item.id, {
      title: title.trim(),
      caption: caption.trim(),
      category,
      date_taken: dateTaken,
      is_featured: isFeatured,
      tags,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl rounded-2xl bg-[#0d1222] border border-white/15 p-6 sm:p-8 shadow-2xl z-10 text-left"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="text-lg font-bold text-white font-display">
              Edit Photo Details
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="flex gap-4 items-center">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Title <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GalleryCategory)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090d1a] border border-white/10 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Date Taken
                </label>
                <input
                  type="date"
                  value={dateTaken}
                  onChange={(e) => setDateTaken(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Caption / Technical Shot Details
              </label>
              <textarea
                rows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Camera settings, lens used, paper type, or artistic intent..."
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="e.g. 35mm, Night Street, Neon"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="edit-featured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-white/10 text-violet-600 focus:ring-violet-500 bg-white/5"
              />
              <label
                htmlFor="edit-featured"
                className="text-xs font-mono text-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Mark as Featured (Highlights on home page)</span>
              </label>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 rounded-xl text-xs font-mono font-medium text-white bg-violet-600 hover:bg-violet-500 flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
