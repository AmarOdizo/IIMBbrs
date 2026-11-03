'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Grid,
  LayoutGrid,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Tag,
  Image as ImageIcon,
  Loader2,
  Upload,
  Download,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Mail,
  Camera,
  ArrowRight,
  FileText,
} from 'lucide-react';

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

const FALLBACK_GALLERY: GalleryItemData[] = [
  {
    _id: 'seed-gal-1',
    title: '18th National Symposium on Advanced High-Strength Steels (AHSS-2026)',
    category: 'Symposium',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDAyZ6b1SVPtJP7nMHrvAIAPgm3Ebgg2c9p6KCUUgDGjG4sAReR0RkbVfIWXR2FyCVWl3OOdaS3nmHsX7FcIVR-7yXI6qbIASRL0ex4gIlGz2L0hYwy8WurpOUKc6Y8GkWGUXoW-v-LUzdgQWHdvuQ8cHolQ1UdNOU5ZF_o_I8teraw1Tcs2CFDcMOEhMvCvY-s2tnN8Dfx0QlYdNXwGYdll4LAiDNQDwW2MUVHGmCTZnoNEbAengeh',
    description:
      'Comprehensive visual highlights covering keynote orations by SAIL and Tata Steel chief metallurgists, young scholars poster session, and the Industry-Academia dialogue dinner.',
    eventDate: '2026-03-15',
    orderIndex: 1,
    isActive: true,
  },
  {
    _id: 'seed-gal-2',
    title: 'High-Resolution TEM Characterization Masterclass at CSIR-IMMT',
    category: 'Lectures',
    imageUrl:
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=1200',
    description:
      'Hands-on experimental electron microscopy demonstration at the CSIR-IMMT Central Characterization Facility for precipitate analysis in microalloyed steels.',
    eventDate: '2026-02-18',
    orderIndex: 2,
    isActive: true,
  },
  {
    _id: 'seed-gal-3',
    title: 'Executive Council Ratification & Annual General Body Meeting',
    category: 'Ceremonies',
    imageUrl:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    description:
      'Governance assembly of chapter office bearers, student chapter advisors, and councilors reviewing 2025–2026 technical programs and financial audits.',
    eventDate: '2026-01-20',
    orderIndex: 3,
    isActive: true,
  },
  {
    _id: 'seed-gal-4',
    title: 'Industrial Technical Expedition to Tata Steel Meramandali Blast Furnace',
    category: 'Field Visits',
    imageUrl:
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200',
    description:
      'Chapter members and engineering delegates examining modern 4300m³ blast furnace cast-house tapping operations and pulverized coal injection.',
    eventDate: '2025-11-28',
    orderIndex: 4,
    isActive: true,
  },
  {
    _id: 'seed-gal-5',
    title: 'Prof. Brahm Prakash Memorial Metallurgy Quiz & Awards Presentation',
    category: 'Ceremonies',
    imageUrl:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    description:
      'Felicitation of winners and certificate distribution for young materials science scholars from premier technical institutes across Odisha.',
    eventDate: '2025-07-22',
    orderIndex: 5,
    isActive: true,
  },
  {
    _id: 'seed-gal-6',
    title: 'High-Temperature Tensile & Fracture Mechanics Laboratory Session',
    category: 'Lectures',
    imageUrl:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
    description:
      'Mechanical property evaluation of prototype automotive dual-phase steels subjected to uniaxial tension at variable strain rates.',
    eventDate: '2025-09-14',
    orderIndex: 6,
    isActive: true,
  },
  {
    _id: 'seed-gal-7',
    title: 'Jindal Stainless Cold Rolling Complex & Pickling Line Technical Tour',
    category: 'Field Visits',
    imageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
    description:
      'Delegates inspecting high-speed 20-high Sendzimir cold rolling mills, continuous annealing furnaces, and automated strip inspection systems at Jajpur.',
    eventDate: '2025-10-12',
    orderIndex: 7,
    isActive: true,
  },
  {
    _id: 'seed-gal-8',
    title: 'CSIR-IMMT Mineral Processing & Hydro-Metallurgical Pilot Plant',
    category: 'Campus',
    imageUrl:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    description:
      'Demonstration of multi-stage column flotation banks, fluid-bed roasting units, and rare-earth solvent extraction pilot columns.',
    eventDate: '2025-08-30',
    orderIndex: 8,
    isActive: true,
  },
  {
    _id: 'seed-gal-9',
    title: 'Young Scholar Technical Poster Exhibition & Industrial Interface',
    category: 'Symposium',
    imageUrl:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
    description:
      'Doctoral and postgraduate research scholars presenting 45 peer-reviewed technical posters to senior industry directors and metallurgical executives.',
    eventDate: '2025-12-05',
    orderIndex: 9,
    isActive: true,
  },
];

const PRESS_CLIPPINGS = [
  {
    publication: 'The Pioneer',
    date: 'March 17, 2026',
    edition: 'Page 5, Eastern Ed.',
    headline: '‘IIM Bhubaneswar Symposium Urges Next-Gen Automotive Alloy Adoption in Odisha’',
    snippet:
      'Front-page coverage of the AHSS-2026 technical recommendations presented by council members to state industrial planning directors.',
    link: '#',
  },
  {
    publication: 'The Sambad',
    date: 'July 22, 2025',
    edition: 'Business Bureau',
    headline: '‘Young Metallurgists Showcase Talent at BPMQ Regional Finals in Capital City’',
    snippet:
      'Detailed reporting on student participants from eight state institutes and the announcement of winners proceeding to Kalpakkam national finals.',
    link: '#',
  },
  {
    publication: 'Mining & Metals Gazette',
    date: 'Nov 28, 2025',
    edition: 'Vol. 41 / Issue 9',
    headline: '‘Plant Focus: Engineers Tour Kalinganagar Hot Strip Expansion Milestone’',
    snippet:
      'Technical trade digest examining the IIM industrial cohort’s observations on cold-reduction feed quality and hot runout lubrication.',
    link: '#',
  },
];

export default function GalleryGrid() {
  const [items, setItems] = useState<GalleryItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'masonry'>('grid');
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  // Fetch gallery items from MongoDB API with fallback
  useEffect(() => {
    async function fetchGallery() {
      setLoading(true);
      try {
        const url =
          selectedCategory === 'All'
            ? '/api/gallery'
            : `/api/gallery?category=${encodeURIComponent(selectedCategory)}`;

        const res = await fetch(url);
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setItems(json.data);
        } else {
          // Fallback if DB empty or during initial deployment
          if (selectedCategory === 'All') {
            setItems(FALLBACK_GALLERY);
          } else {
            setItems(FALLBACK_GALLERY.filter((item) => item.category === selectedCategory));
          }
        }
      } catch (err) {
        console.warn('Using fallback gallery items due to fetch error:', err);
        if (selectedCategory === 'All') {
          setItems(FALLBACK_GALLERY);
        } else {
          setItems(FALLBACK_GALLERY.filter((item) => item.category === selectedCategory));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, [selectedCategory]);

  // Filter items by search query
  const filteredItems = items.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const titleMatch = item.title?.toLowerCase().includes(query);
    const descMatch = item.description?.toLowerCase().includes(query);
    const catMatch = item.category?.toLowerCase().includes(query);
    return titleMatch || descMatch || catMatch;
  });

  const spotlightItem = items.length > 0 ? items[0] : FALLBACK_GALLERY[0];

  const openModal = (index: number) => {
    setActiveModalIndex(index);
  };

  const closeModal = () => {
    setActiveModalIndex(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeModalIndex !== null && filteredItems.length > 0) {
      setActiveModalIndex((activeModalIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeModalIndex !== null && filteredItems.length > 0) {
      setActiveModalIndex((activeModalIndex - 1 + filteredItems.length) % filteredItems.length);
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
    <div className="flex flex-col w-full">
      {/* 1. Masthead Hero Header with Ambient Elements & Live Archival Ledger */}
      <div className="relative w-full bg-surface-container-low overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-tertiary-fixed/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-12">
          {/* Breadcrumb Bar */}
          <nav className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-8">
            <Link className="hover:text-primary transition-colors flex items-center gap-1" href="/">
              <span className="material-symbols-outlined text-[15px]">home</span>
              <span>Home</span>
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Visual Repository &amp; Gallery</span>
          </nav>

          {/* Section Hero Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary ring-4 ring-primary/20" />
                <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
                  Visual Repository &amp; Archives
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm tracking-tight">
                  Est. 1982
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-medium leading-tight">
                Chapter Photographic Chronicle
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed mt-1">
                Documenting four decades of metallurgical symposia, industrial blast furnace expeditions, academic convocations, student conclaves, and laboratory masterclasses across Odisha’s minerals corridor.
              </p>
            </div>

            {/* Live Curatorial Metrics Bar */}
            <div className="lg:col-span-4 w-full">
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col gap-4 border border-slate-200/50">
                <div className="flex items-center justify-between border-b border-surface-variant/40 pb-2.5">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">inventory_2</span> Archival Ledger
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live DB Sync
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low p-3 rounded-lg flex flex-col">
                    <span className="font-display-lg-mobile text-headline-sm font-bold text-on-surface leading-none">
                      {CATEGORIES.length - 1}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Curated Series</span>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded-lg flex flex-col">
                    <span className="font-display-lg-mobile text-headline-sm font-bold text-primary leading-none">
                      {items.length > 0 ? `${items.length}+` : '320+'}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Archival Photos</span>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded-lg flex flex-col">
                    <span className="font-title-md text-title-md font-bold text-on-surface leading-none mt-1">
                      1982–26
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Historical Span</span>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded-lg flex flex-col">
                    <span className="font-display-lg-mobile text-headline-sm font-bold text-tertiary leading-none">
                      4
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Media Releases</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body Content Canvas */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full flex flex-col gap-12">
        {/* 2. Featured Album Spotlight Banner (Dynamic from Top Photo) */}
        {spotlightItem && (
          <div className="relative w-full rounded-2xl overflow-hidden bg-inverse-surface text-inverse-on-surface shadow-xl">
            {/* Metallurgical grain boundary graphic watermark */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" stroke="currentColor" viewBox="0 0 400 300">
                <polygon points="20,10 120,40 180,120 70,160 10,80" strokeWidth="1.5" />
                <polygon points="120,40 280,30 310,140 180,120" strokeWidth="1.5" />
                <polygon points="180,120 310,140 260,260 160,240 70,160" strokeWidth="1.5" />
                <polygon points="310,140 390,90 395,220 260,260" strokeWidth="1.5" />
                <polygon points="70,160 160,240 100,290 10,240" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Visual Presentation Left */}
              <div
                onClick={() => openModal(0)}
                className="lg:col-span-7 relative min-h-[340px] lg:min-h-[420px] overflow-hidden group cursor-pointer"
              >
                <Image
                  src={spotlightItem.imageUrl}
                  alt={spotlightItem.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/30 to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold uppercase tracking-wider shadow-md">
                    <Sparkles className="w-3.5 h-3.5" /> Spotlight Album
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-inverse-surface/80 backdrop-blur-md text-surface-bright font-label-sm text-label-sm">
                    <Camera className="w-3.5 h-3.5 text-amber-300" /> Archival Record
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-inverse-surface/85 backdrop-blur-md text-inverse-on-surface font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-primary-fixed-dim text-[16px]">location_on</span>
                  <span>CSIR-IMMT Sen Auditorium, Bhubaneswar</span>
                </div>
              </div>

              {/* Featured Meta & Action Right */}
              <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-inverse-surface">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded font-label-sm text-label-sm font-semibold bg-tertiary-fixed text-on-tertiary-fixed tracking-wide uppercase">
                      {spotlightItem.category}
                    </span>
                    {spotlightItem.eventDate && (
                      <span className="font-label-sm text-label-sm text-surface-variant/70 tracking-wider">
                        {new Date(spotlightItem.eventDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        }).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h2 className="font-headline-md text-headline-md font-semibold text-surface-bright leading-snug">
                    {spotlightItem.title}
                  </h2>
                  <p className="font-body-md text-body-md text-surface-variant/80 leading-relaxed">
                    {spotlightItem.description ||
                      'Comprehensive photographic chronicle documenting technical sessions, research deliberations, and industrial partnerships organized under the auspices of IIM Bhubaneswar Chapter.'}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 rounded-full bg-surface-variant/10 text-surface-variant font-label-sm text-label-sm">
                      Microalloyed Steels
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-surface-variant/10 text-surface-variant font-label-sm text-label-sm">
                      Phase Transformation
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-surface-variant/10 text-surface-variant font-label-sm text-label-sm">
                      CSIR Plenary
                    </span>
                  </div>
                </div>
                <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="button"
                    onClick={() => openModal(0)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md tracking-wide uppercase font-semibold transition-all shadow-md group"
                  >
                    <span>View Spotlight Photo</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <span className="font-label-sm text-label-sm text-surface-variant/70">
                    Curator: Chapter Photographic Desk
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Interactive Filtering & Search Control Bar */}
        <div className="w-full flex flex-col gap-4 bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-slate-200/60">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full xl:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search live photos by keyword, category, or title..."
                className="w-full pl-11 pr-10 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all border border-transparent focus:border-primary/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* View Mode Controls & Count */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-label-sm text-label-sm text-secondary px-3 py-1.5 rounded-lg bg-surface-container-low font-semibold">
                {filteredItems.length} {filteredItems.length === 1 ? 'Photograph' : 'Photographs'} Live
              </span>

              <div className="flex items-center bg-surface-container p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setLayoutMode('grid')}
                  className={`p-1.5 rounded transition-all flex items-center justify-center ${
                    layoutMode === 'grid'
                      ? 'bg-surface-container-lowest text-primary shadow-xs font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  title="Grid Layout (3 columns)"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('masonry')}
                  className={`p-1.5 rounded transition-all flex items-center justify-center ${
                    layoutMode === 'masonry'
                      ? 'bg-surface-container-lowest text-primary shadow-xs font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  title="Compact Layout (4 columns)"
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

        {/* 4. Gallery Grid Content */}
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
                : `No active photographs listed under category "${selectedCategory}". Add photos via the Admin Panel.`}
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

        {/* 5. Load Earlier / Archive Count Summary Bar */}
        <div className="flex flex-col items-center justify-center gap-3 pt-2 pb-4">
          <div className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md tracking-wider uppercase font-semibold shadow-xs">
            <span className="material-symbols-outlined text-[18px]">history</span>
            <span>Archival Collection (1982–2026)</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Showing {filteredItems.length} of {items.length} archival photographs across {CATEGORIES.length - 1} categories
          </span>
        </div>

        {/* 6. Media Coverage & Press Clippings Section */}
        <section className="flex flex-col gap-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                  Print &amp; Broadcast Archive
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Media Coverage &amp; Press Clippings
              </h2>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Regional metallurgical developments reported in mainline dailies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRESS_CLIPPINGS.map((press, i) => (
              <article
                key={i}
                className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-shadow border border-slate-200/50"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                      {press.publication}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {press.date}
                    </span>
                  </div>
                  <h4 className="font-title-md text-title-md font-semibold text-on-surface leading-snug">
                    {press.headline}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {press.snippet}
                  </p>
                </div>
                <div className="pt-3 border-t border-surface-container-high flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-primary" /> {press.edition}
                  </span>
                  <a
                    className="text-primary hover:underline font-semibold flex items-center gap-0.5"
                    href="/news"
                  >
                    <span>View News</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 7. Chapter Photo Submissions & Media Contribution Callout */}
        <div className="w-full rounded-2xl bg-surface-container p-8 lg:p-10 shadow-sm relative overflow-hidden border border-slate-200/50">
          {/* Decorative Phase Line Pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-80 opacity-5 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line stroke="currentColor" strokeWidth="2" x1="0" x2="100" y1="0" y2="100" />
              <line stroke="currentColor" strokeWidth="2" x1="100" x2="0" y1="0" y2="100" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-primary/10 text-primary font-label-sm text-label-sm font-semibold uppercase">
                  Community Contribution
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  High-Resolution Photography Desk
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">
                Attended a Chapter Event? Contribute Your Photographs
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
                Fellows, corporate associates, and student delegates are invited to submit camera captures from symposium sessions, lab demonstrations, or industrial tours. Submissions undergo archival curation before permanent inclusion in the IIM Bhubaneswar repository.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Minimum 300 DPI or 12MP
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Include Date &amp; Venue Metadata
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-primary" /> media@iimbhubaneswar.in
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch gap-3">
              <a
                href="mailto:media@iimbhubaneswar.in?subject=Chapter%20Event%20Photo%20Submission"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md tracking-wider uppercase font-semibold transition-all shadow-md text-center"
              >
                <Upload className="w-4 h-4" />
                <span>Submit Event Photos</span>
              </a>
              <a
                href="/assets/images/logo1.svg"
                download="IIM-Logo.svg"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-md text-label-md tracking-wider uppercase font-semibold transition-all text-center border border-slate-200"
              >
                <Download className="w-4 h-4" />
                <span>Press Asset Kit (Logos &amp; Photos)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Fullscreen Lightbox / Modal */}
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
              {filteredItems[activeModalIndex].eventDate && (
                <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    Recorded: {new Date(filteredItems[activeModalIndex].eventDate!).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
