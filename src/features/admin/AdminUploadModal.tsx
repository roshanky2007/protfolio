import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, X, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { validateImageFile, uploadGalleryPhoto } from '../../lib/storage';
import type { GalleryCategory, GalleryItem } from '../../types/gallery';

interface PendingUploadItem {
  id: string;
  file: File;
  previewUrl: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  date_taken: string;
  is_featured: boolean;
  tagsStr: string;
  progress: number;
  status: 'pending' | 'uploading' | 'done' | 'error';
  errorMessage?: string;
}

interface AdminUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (items: GalleryItem[]) => void;
}

const CATEGORIES: GalleryCategory[] = [
  'Photography',
  'Portraits',
  'Sketches',
  'Editing',
  'Personal',
  'Other',
];

export const AdminUploadModal: React.FC<AdminUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [items, setItems] = useState<PendingUploadItem[]>([]);
  const [globalError, setGlobalError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    processFiles(Array.from(e.target.files));
  };

  const processFiles = (files: File[]) => {
    setGlobalError('');
    const newItems: PendingUploadItem[] = [];

    for (const file of files) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setGlobalError(validation.error || 'Invalid file');
        continue;
      }

      // Generate clean title from filename
      const rawName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      const formattedTitle = rawName
        .replace(/[_-]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl: URL.createObjectURL(file),
        title: formattedTitle,
        caption: '',
        category: 'Photography',
        date_taken: new Date().toISOString().split('T')[0],
        is_featured: false,
        tagsStr: '',
        progress: 0,
        status: 'pending',
      });
    }

    setItems((prev) => [...prev, ...newItems]);
  };

  const handleRemove = (id: string) => {
    setItems((prev) => {
      const filtered = prev.filter((it) => it.id !== id);
      return filtered;
    });
  };

  const updateItemField = (
    id: string,
    field: keyof PendingUploadItem,
    value: any
  ) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  const handleStartUpload = async () => {
    if (items.length === 0) return;
    setIsUploading(true);
    setGlobalError('');

    const uploadedResults: GalleryItem[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.status === 'done') continue;

      // Update state to uploading
      updateItemField(item.id, 'status', 'uploading');

      try {
        const result = await uploadGalleryPhoto(
          item.file,
          {
            title: item.title.trim() || 'Untitled Photo',
            caption: item.caption.trim(),
            category: item.category,
            date_taken: item.date_taken,
            is_featured: item.is_featured,
            tags: item.tagsStr
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean),
          },
          (progress) => {
            updateItemField(item.id, 'progress', progress);
          }
        );

        updateItemField(item.id, 'status', 'done');
        uploadedResults.push(result);
      } catch (err: any) {
        updateItemField(item.id, 'status', 'error');
        updateItemField(item.id, 'errorMessage', err?.message || 'Upload failed');
      }
    }

    setIsUploading(false);

    if (uploadedResults.length > 0) {
      onUploadSuccess(uploadedResults);
      // If all finished, close after a brief moment
      setTimeout(() => {
        onClose();
      }, 800);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={!isUploading ? onClose : undefined}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0c1020] border border-white/15 shadow-2xl z-10 text-left overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Upload Photos & Sketches
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Select JPEG, PNG, or WebP images (Up to 10MB each)
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={isUploading}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Error banner */}
            {globalError && (
              <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{globalError}</span>
              </div>
            )}

            {/* Drag & Drop Upload Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files) {
                  processFiles(Array.from(e.dataTransfer.files));
                }
              }}
              className="p-8 border-2 border-dashed border-white/15 hover:border-violet-500/50 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-all text-center cursor-pointer group"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-white">
                Click to browse or drag and drop images here
              </p>
              <p className="text-xs font-mono text-slate-500 mt-1">
                Supports multiple files • Automatic preview & metadata editing
              </p>
            </div>

            {/* Selected Queue Items */}
            {items.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Selected Images ({items.length})</span>
                  <span>Review and customize details before uploading</span>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3 relative"
                    >
                      {/* Top preview row */}
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/50 border border-white/10 shrink-0 relative">
                          <img
                            src={item.previewUrl}
                            alt="preview"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-mono text-slate-300 mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              value={item.title}
                              disabled={isUploading}
                              onChange={(e) => updateItemField(item.id, 'title', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-violet-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-slate-300 mb-1">
                              Category
                            </label>
                            <select
                              value={item.category}
                              disabled={isUploading}
                              onChange={(e) => updateItemField(item.id, 'category', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-[#090d1a] border border-white/10 text-xs text-white focus:outline-none focus:border-violet-500"
                            >
                              {CATEGORIES.map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Remove item button */}
                        {!isUploading && (
                          <button
                            type="button"
                            onClick={() => handleRemove(item.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                            title="Remove file"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Second row: Caption and Featured */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            placeholder="Caption (camera lens, technical settings, or sketch medium)..."
                            value={item.caption}
                            disabled={isUploading}
                            onChange={(e) => updateItemField(item.id, 'caption', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-violet-500"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`feat-${item.id}`}
                            checked={item.is_featured}
                            disabled={isUploading}
                            onChange={(e) => updateItemField(item.id, 'is_featured', e.target.checked)}
                            className="w-3.5 h-3.5 rounded border-white/10 text-violet-600 focus:ring-violet-500 bg-white/5"
                          />
                          <label
                            htmlFor={`feat-${item.id}`}
                            className="text-[11px] font-mono text-slate-300 flex items-center gap-1 cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3 text-pink-400" />
                            <span>Featured</span>
                          </label>
                        </div>
                      </div>

                      {/* Status / Progress indicator */}
                      {item.status === 'uploading' && (
                        <div className="pt-2">
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-200"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-cyan-400 mt-1 block">
                            Uploading... {item.progress}%
                          </span>
                        </div>
                      )}

                      {item.status === 'done' && (
                        <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 pt-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Uploaded & Persisted Successfully</span>
                        </div>
                      )}

                      {item.status === 'error' && (
                        <div className="text-[11px] font-mono text-rose-400 flex items-center gap-1 pt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{item.errorMessage || 'Upload failed'}</span>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Controls */}
          <div className="p-4 sm:p-5 border-t border-white/10 flex items-center justify-between bg-black/40">
            <span className="text-xs font-mono text-slate-400">
              {items.length} item{items.length === 1 ? '' : 's'} staged
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isUploading}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleStartUpload}
                disabled={isUploading || items.length === 0}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium text-xs font-mono shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Uploads...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload & Publish to Gallery</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
