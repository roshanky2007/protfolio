import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  UploadCloud,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Shield,
  LogOut,
  ExternalLink,
  Code,
  Check,
  Copy,
  HelpCircle,
  Search,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import {
  fetchGalleryItems,
  deleteGalleryItem,
  updateGalleryItem,
  reorderGalleryItems,
} from '../../lib/storage';
import { AdminLoginModal } from './AdminLoginModal';
import { AdminUploadModal } from './AdminUploadModal';
import { AdminEditModal } from './AdminEditModal';
import { AdminDeleteDialog } from './AdminDeleteDialog';
import type { GalleryItem } from '../../types/gallery';

export const AdminGallery: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isSandboxMode, setIsSandboxMode] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  // Gallery state
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<GalleryItem | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Check auth session
  useEffect(() => {
    const checkSession = async () => {
      try {
        if (isSupabaseConfigured) {
          const { data } = await supabase.auth.getSession();
          if (data?.session?.user) {
            setUser(data.session.user);
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        console.error('Error checking auth:', err);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkSession();
  }, []);

  // Fetch gallery items
  const loadGallery = async () => {
    try {
      setLoading(true);
      const data = await fetchGalleryItems();
      setItems(data);
    } catch (err) {
      console.error('Error loading gallery in admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated || isSandboxMode) {
      loadGallery();
    }
  }, [isAuthenticated, isSandboxMode]);

  const handleSignOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setIsSandboxMode(false);
    setUser(null);
  };

  const handleToggleFeatured = async (item: GalleryItem) => {
    try {
      const updated = await updateGalleryItem(item.id, {
        is_featured: !item.is_featured,
      });
      setItems((prev) => prev.map((it) => (it.id === item.id ? updated : it)));
    } catch (err: any) {
      alert(`Failed to update featured status: ${err.message}`);
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);
    await reorderGalleryItems(newItems);
  };

  const handleSaveEdit = async (id: string, updates: Partial<GalleryItem>) => {
    try {
      setIsSavingEdit(true);
      const updated = await updateGalleryItem(id, updates);
      setItems((prev) => prev.map((it) => (it.id === id ? updated : it)));
      setEditingItem(null);
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    try {
      setIsDeleting(true);
      await deleteGalleryItem(deletingItem.id, deletingItem.storage_path);
      setItems((prev) => prev.filter((it) => it.id !== deletingItem.id));
      setDeletingItem(null);
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUploadSuccess = (newItems: GalleryItem[]) => {
    setItems((prev) => [...newItems, ...prev]);
  };

  const copySqlToClipboard = () => {
    const sqlText = `-- Supabase migration file is located in supabase/migrations/20261023_init_portfolio.sql
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    caption TEXT DEFAULT '',
    category TEXT NOT NULL CHECK (category IN ('Photography', 'Portraits', 'Sketches', 'Editing', 'Personal', 'Other')),
    image_url TEXT NOT NULL,
    storage_path TEXT,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 1,
    date_taken DATE DEFAULT CURRENT_DATE,
    tags TEXT[] DEFAULT '{}'::TEXT[]
);
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public visitors can view gallery items" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Owner can mutate gallery items" ON public.gallery_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-images', 'gallery-images', true) ON CONFLICT DO NOTHING;
CREATE POLICY "Public read storage" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');
CREATE POLICY "Owner mutate storage" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'gallery-images') WITH CHECK (bucket_id = 'gallery-images');`;
    navigator.clipboard.writeText(sqlText);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#08090d] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If not authenticated and not in sandbox, show login portal
  if (!isAuthenticated && !isSandboxMode) {
    return (
      <div className="min-h-screen bg-[#08090d]">
        <AdminLoginModal
          onLoginSuccess={(authUser) => {
            setUser(authUser);
            setIsAuthenticated(true);
          }}
          onEnterSandbox={() => {
            setIsSandboxMode(true);
          }}
        />
      </div>
    );
  }

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caption?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-200 pt-20 pb-24">
      {/* Top Banner Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="p-6 rounded-2xl bg-[#0c1020]/90 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 p-[1px] shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              <div className="w-full h-full bg-[#08090d] rounded-xl flex items-center justify-center text-violet-400">
                <Shield className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Gallery Management Studio
                </h1>
                {isSandboxMode ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Local Sandbox Mode
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Supabase Cloud Active
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                {user?.email || 'Logged in as Roshan (Owner Session)'} • Total {items.length} works in gallery
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowSqlGuide(!showSqlGuide)}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>Supabase Guide</span>
            </button>

            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium text-xs font-mono shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center gap-2 transition-all"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload New Photos</span>
            </button>

            <Link
              to="/"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5"
              title="View Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>

            <button
              onClick={handleSignOut}
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/5 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Supabase Setup Assistant Accordion */}
        <AnimatePresence>
          {showSqlGuide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 rounded-2xl bg-[#090d1a] border border-cyan-500/30 p-6 overflow-hidden shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-display">
                      Supabase Setup & Credentials Guide
                    </h3>
                    <p className="text-xs font-mono text-slate-400">
                      Step-by-step instructions to connect your free Supabase cloud backend
                    </p>
                  </div>
                </div>

                <button
                  onClick={copySqlToClipboard}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-1.5"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Script'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 font-mono mt-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-violet-400 font-bold">1. Create Project</span>
                  <p className="mt-1 text-[11px] text-slate-400 leading-relaxed font-sans">
                    Go to <strong>supabase.com</strong>, create a new project, and copy your <strong>Project URL</strong> and <strong>anon key</strong> into <code className="text-violet-300">.env</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-cyan-400 font-bold">2. Run SQL Migration</span>
                  <p className="mt-1 text-[11px] text-slate-400 leading-relaxed font-sans">
                    Open Supabase SQL Editor and execute the schema file at <code className="text-cyan-300">supabase/migrations/20261023_init_portfolio.sql</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-pink-400 font-bold">3. Create Owner User</span>
                  <p className="mt-1 text-[11px] text-slate-400 leading-relaxed font-sans">
                    In Supabase Dashboard, go to <strong>Authentication &rarr; Users &rarr; Add User</strong> to register your owner email and password.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toolbar: Search and Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Photography', 'Portraits', 'Sketches', 'Editing', 'Personal', 'Other'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-violet-600 text-white font-medium shadow-md'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search admin list..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        {/* Gallery Items Table / Cards */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs font-mono text-slate-400">Loading gallery records...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-white/5 bg-white/[0.01]">
            <p className="text-sm font-mono text-slate-400">No items match your filter.</p>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="mt-4 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-mono"
            >
              Upload Pictures Now
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-[#0c1020]/80 border border-white/10 hover:border-violet-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white font-display">
                        {item.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-cyan-300 border border-cyan-500/30">
                        {item.category}
                      </span>
                      {item.is_featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {item.caption || 'No caption provided'}
                    </p>

                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 mt-1">
                      {item.date_taken && <span>Date: {item.date_taken}</span>}
                      {item.local_file && <span className="text-amber-400">Local Preview</span>}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {/* Reorder Buttons */}
                  <button
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === filteredItems.length - 1}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Toggle Featured */}
                  <button
                    onClick={() => handleToggleFeatured(item)}
                    className={`p-2 rounded-lg border text-xs font-mono transition-colors ${
                      item.is_featured
                        ? 'bg-pink-500/20 border-pink-500/40 text-pink-300'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                    }`}
                    title="Toggle Featured"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-violet-600/20 text-slate-400 hover:text-violet-300 border border-white/5"
                    title="Edit Item Details"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => setDeletingItem(item)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/5"
                    title="Delete Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Modal */}
        <AdminUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onUploadSuccess={handleUploadSuccess}
        />

        {/* Edit Modal */}
        <AdminEditModal
          item={editingItem}
          isOpen={editingItem !== null}
          isSaving={isSavingEdit}
          onSave={handleSaveEdit}
          onClose={() => setEditingItem(null)}
        />

        {/* Delete Confirmation Dialog */}
        <AdminDeleteDialog
          item={deletingItem}
          isOpen={deletingItem !== null}
          isDeleting={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingItem(null)}
        />

      </div>
    </div>
  );
};
