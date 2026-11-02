'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Grid, LayoutGrid, X, ChevronLeft, ChevronRight, Calendar, Tag, Image as ImageIcon, Loader2 } from 'lucide-react';

export interface GalleryItemData {
  _id: string;
  title: string;
  category: 'Symposium' | 'Lectures' | 'Ceremonies' | 'Field Visits' | 'Campus' | string;
  imageUrl: string;
  description?: string;
  eventDate?: string;
  orderIndex?: number;
  isActive?: boolean;
}

const CATEGORIES = [
  'All',
  'Symposium',
  'Lectures',
  'Ceremonies',
  'Field Visits',
  'Campus',
];

export default function GalleryGrid() {
  const [items, setItems] = useState<GalleryItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'masonry'>('grid');
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  // Fetch gallery items from MongoDB API
  useEffect(() => {
    async function fetchGallery() {
      setLoading(true);
      try {
        const url = selectedCategory === 'All' 
          ? '/api/gallery' 
          : `/api/gallery?category=${encodeURIComponent(selectedCategory)}`;
        
        const res = await fetch(url);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setItems(json.data);
        }
      } catch (err) {
        console.error('Failed to load gallery items:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, [selectedCategory]);

  // Filter items by search query
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const openModal = (index: number) => {
    setActiveModalIndex(index);
  };

  const closeModal = () => {
    setActiveModalIndex(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeModalIndex !== null) {
      setActiveModalIndex(
        (activeModalIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalIndex === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex, filteredItems.length]);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* 1. Interactive Filtering & Search Control Bar */}
      <div className="w-full flex flex-col gap-4 bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-slate-200/50">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full xl:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search live albums by keyword, category, or title..."
              className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all border border-transparent focus:border-primary/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Mode Controls & Count */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-label-sm text-label-sm text-secondary px-3 py-1.5 rounded-lg bg-surface-container-low">
              {filteredItems.length} {filteredItems.length === 1 ? 'Photograph' : 'Photographs'} Live
            </span>

            <div className="flex items-center bg-surface-container p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded transition-all flex items-center justify-center ${
                  layoutMode === 'grid'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                title="Grid Layout"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('masonry')}
                className={`p-1.5 rounded transition-all flex items-center justify-center ${
                  layoutMode === 'masonry'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                title="Compact Layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-surface-container-high/40 pt-3 text-nowrap scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                selectedCategory === cat
                  ? 'font-semibold bg-primary text-on-primary shadow-xs'
                  : 'font-medium bg-surface-container-low text-on-surface hover:bg-surface-container hover:text-primary'
              }`}
            >
              {cat === 'All' ? 'All Live Photos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Gallery Grid Content */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="font-body-sm text-body-sm">Fetching gallery images from MongoDB &amp; ImageKit...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center bg-surface-container-low/50 rounded-2xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center">
          <div className="p-4 bg-white rounded-full text-slate-400 mb-3 shadow-sm">
            <ImageIcon className="w-8 h-8 text-primary/60" />
          </div>
          <h4 className="font-title-md text-title-md font-semibold text-slate-800">No Photographs Found</h4>
          <p className="font-body-sm text-body-sm text-slate-500 mt-1 max-w-sm">
            {searchQuery
              ? `No images matched your search "${searchQuery}". Try different keywords.`
              : `No active photographs listed under category "${selectedCategory}". Add photos via Admin Panel.`}
          </p>
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-primary bg-white rounded-lg border border-primary/20 hover:bg-primary/5 transition"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div
          className={`grid gap-6 ${
            layoutMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}
        >
          {filteredItems.map((item, idx) => (
            <article
              key={item._id}
              onClick={() => openModal(idx)}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer border border-slate-200/60"
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-label-sm text-[11px] font-semibold tracking-wider uppercase">
                  <Tag className="w-3 h-3 text-amber-400" /> {item.category}
                </span>

                {item.eventDate && (
                  <div className="absolute bottom-3 left-3 text-white/90 text-xs flex items-center gap-1 font-label-sm">
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    <span>{new Date(item.eventDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-headline-sm text-lg font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="font-body-sm text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-primary font-semibold">
                  <span>View Full Photo</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 3. Fullscreen Lightbox / Modal */}
      {activeModalIndex !== null && filteredItems[activeModalIndex] && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
            title="Close (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          {filteredItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
                title="Previous photo (Left arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
                title="Next photo (Right arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Modal Content Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
          >
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black">
              <Image
                src={filteredItems[activeModalIndex].imageUrl}
                alt={filteredItems[activeModalIndex].title}
                fill
                unoptimized
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1200px"
                priority
              />
            </div>

            <div className="p-6 bg-slate-900 text-white flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-label-sm text-xs font-semibold uppercase tracking-wider">
                  {filteredItems[activeModalIndex].category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activeModalIndex + 1} of {filteredItems.length}
                </span>
              </div>
              <h3 className="text-xl font-bold">{filteredItems[activeModalIndex].title}</h3>
              {filteredItems[activeModalIndex].description && (
                <p className="text-sm text-slate-300 leading-relaxed">
                  {filteredItems[activeModalIndex].description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

