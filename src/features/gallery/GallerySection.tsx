import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, Search, Shield } from 'lucide-react';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { GalleryCard } from './GalleryCard';
import { LightboxModal } from './LightboxModal';
import { fetchGalleryItems } from '../../lib/storage';
import type { GalleryItem, GalleryCategory } from '../../types/gallery';

const CATEGORIES: ('All' | GalleryCategory)[] = [
  'All',
  'Photography',
  'Portraits',
  'Sketches',
  'Editing',
  'Personal',
  'Other',
];

export const GallerySection: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<'All' | GalleryCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLightboxIndex, setSelectedLightboxIndex] = useState<number | null>(null);

  // Load gallery items on mount
  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const data = await fetchGalleryItems();
        setItems(data);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();

    // Listen for storage change events (e.g. from admin upload in same tab or another tab)
    const handleStorageChange = () => {
      loadItems();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filter items by category and search query
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-[#06080e]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Visual Chronicles & Gallery"
          title="The Personal"
          highlight="Photo & Sketch Gallery"
          description="A curated visual diary of street photography, fine art portraiture, analog graphite anime drawings, and digital color grading experiments."
          action={
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-mono transition-all backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.2)]"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Upload & Manage Photos</span>
            </Link>
          }
        />

        {/* Filter Toolbar: Categories + Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wide transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, tag..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </div>

        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs font-mono text-slate-400">Loading visual gallery...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="py-20 text-center rounded-2xl border border-white/5 bg-white/[0.01] p-8">
            <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white font-display">No images found</h4>
            <p className="text-xs font-mono text-slate-400 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? `No pictures matching "${searchQuery}". Try clearing search or choosing another category.`
                : 'No pictures uploaded to this category yet.'}
            </p>
            <div className="mt-5">
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-mono hover:bg-violet-500 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Upload First Photo in /admin</span>
              </Link>
            </div>
          </div>
        )}

        {/* Responsive Masonry Grid (columns layout for seamless masonry heights) */}
        {!loading && filteredItems.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={index}
                  onClick={() => setSelectedLightboxIndex(index)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Fullscreen Lightbox Modal */}
        <LightboxModal
          items={filteredItems}
          currentIndex={selectedLightboxIndex ?? 0}
          isOpen={selectedLightboxIndex !== null}
          onClose={() => setSelectedLightboxIndex(null)}
          onNavigate={(newIndex) => setSelectedLightboxIndex(newIndex)}
        />

      </div>
    </section>
  );
};
