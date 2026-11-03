'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  FileText,
  Calendar,
  ExternalLink,
  Download,
  X,
  Loader2,
  Tag,
  ArrowRight,
  User,
  FolderArchive,
  CheckCircle2,
  Send,
  Mail,
  Phone,
  Building2,
  Sparkles,
  FileCheck,
  Clock,
  Printer,
} from 'lucide-react';

export interface NewsItemData {
  _id: string;
  circularNo?: string;
  title: string;
  category:
    | 'Symposium'
    | 'Circular'
    | 'Achievement'
    | 'Lecture'
    | 'Membership'
    | 'Statutory Resolution'
    | 'Electoral Notice'
    | string;
  summary: string;
  content?: string;
  author?: string;
  attachmentPdfUrl?: string;
  isFeatured?: boolean;
  publishedAt?: string;
  createdAt?: string;
  isPublished?: boolean;
}

const NEWS_CATEGORIES = [
  'All Dispatches',
  'Circular',
  'Symposium',
  'Achievement',
  'Lecture',
  'Membership',
  'Statutory Resolution',
  'Electoral Notice',
];

const FALLBACK_NEWS: NewsItemData[] = [
  {
    _id: 'seed-news-1',
    circularNo: 'CIR-48/04',
    title:
      'IIM Bhubaneswar Chapter Adopts Regional Decarbonization Roadmap: 100% Green Hydrogen Direct-Reduction Pilot Framework Formulated with CSIR-IMMT',
    category: 'Statutory Resolution',
    summary:
      'In a landmark joint resolution with the Eastern Steel Forum and CSIR-IMMT, the Chapter Executive Council has ratified an open-access roadmap to transition secondary steelmakers and rotary kiln sponge iron plants towards clean syngas and green hydrogen DRI kinetics by 2030.',
    content: `The Executive Council of the Indian Institute of Metals, Bhubaneswar Chapter, in formal assembly on 14 March 2026 alongside principal researchers from CSIR-IMMT, declares the regional industrial transition from fossil-coal direct reduction ironmaking (DRI) to hydrogen-blended syngas a strategic metallurgical priority for Odisha.

This circular articulates benchmark operating boundaries, ore beneficiation thresholds, and phase-gate industrial demonstrations binding Chapter-affiliated institutions for the 2026–2035 transition horizon.

Key Strategic Directives:
1. Phase-Wise Hydrogen Blending in DRI Rotary Kilns & Shafts: Initiating with 10% syngas/H₂ co-injection by Q3 2026, scaling to a 20% blend by 2027. Full-scale pure green hydrogen topochemical shaft reduction units are slated for validation by 2035 across the Kalinganagar corridor.
2. Beneficiation of Low-Grade BHQ / BHJ Deposits (Fe > 67%): Hydrogen-based gas reduction requires iron ore pellets with Fe > 67.0% and gangue content (SiO₂ + Al₂O₃) under 2.5%.
3. Zero-Carbon Renewable Power & EAF Integration Corridors: Coupling H₂-DRI sponge iron directly with hot charging into high-efficiency Electric Arc Furnaces (EAF).

By authorization of the Executive Committee of The Indian Institute of Metals, Bhubaneswar Chapter, this circular is entered into the chapter’s permanent technical archive.`,
    author: 'Dr. Ashok Kumar Mohanty & Prof. S. N. Pattnaik',
    attachmentPdfUrl: '#',
    isFeatured: true,
    publishedAt: '2026-03-18T09:00:00Z',
    isPublished: true,
  },
  {
    _id: 'seed-news-2',
    circularNo: 'CIR-48/03',
    title: 'Call for Papers: 18th National Symposium on Advanced High-Strength Steels (AHSS-2026)',
    category: 'Symposium',
    summary:
      'Due to overwhelming requests from research institutes and industry across Eastern India, the abstract submission deadline for the 18th National Symposium has been extended to Feb 28, 2026. Peer-reviewed papers will be published in the archival symposium proceedings.',
    content: `Abstract submissions are formally invited from research scholars, plant metallurgists, and materials scientists for the 18th National Symposium on Advanced High-Strength Steels (AHSS-2026).

Symposium Sub-Themes:
- Physical Metallurgy & Microalloying of Third-Generation AHSS
- Hydrogen Direct Reduction Kinetics & Decarbonized Ironmaking
- Slag Valorization & Industrial Byproduct Utilization in Mega Steel Plants
- Electron Microscopy, EBSD & Atom Probe Tomography of Metallic Interfaces

Selected papers will be recommended for inclusion in the Transactions of the Indian Institute of Metals (Springer Nature).`,
    author: 'Symposium Secretariat',
    attachmentPdfUrl: '#',
    isFeatured: true,
    publishedAt: '2026-02-22T10:00:00Z',
    isPublished: true,
  },
  {
    _id: 'seed-news-3',
    circularNo: 'CIR-48/02',
    title: 'IIM Bhubaneswar Chapter Awarded Best Chapter Citation by Kolkata Head Office',
    category: 'Achievement',
    summary:
      'At the National Council Meeting in Kolkata, Bhubaneswar Chapter was conferred the citation for exemplary technical programming, continuous industrial workshops, and student chapter mentoring throughout 2025.',
    content: `The National Council of The Indian Institute of Metals (IIM), Kolkata, has recognized the Bhubaneswar Chapter as one of the apex active chapters across India for the year 2025.

Key accomplishments cited:
- Successful hosting of three regional technical symposia with over 600 cumulative delegates.
- Continuous mentoring and establishment of active Student Chapters at premier engineering colleges.
- Organization of industrial technical tours to Tata Steel Meramandali, JSL Jajpur, and NALCO Angul.
- Publication of quarterly gazetted bulletins and young scholars awards distribution.`,
    author: 'Chapter Council Liaison',
    attachmentPdfUrl: '#',
    isFeatured: true,
    publishedAt: '2026-01-18T11:00:00Z',
    isPublished: true,
  },
  {
    _id: 'seed-news-4',
    circularNo: 'CIR-48/01',
    title: 'National Metallurgists Day & Dr. B. K. Satpathy Memorial Endowment Lecture Announced',
    category: 'Lecture',
    summary:
      'Distinguished memorial address on "Decarbonized Mineral Processing in Eastern India" scheduled at Dr. Nilamani Sen Auditorium, CSIR-IMMT, featuring keynote lectures by leading national fellows.',
    content: `The Bhubaneswar Chapter announces the annual Dr. B. K. Satpathy Memorial Endowment Lecture in conjunction with National Metallurgists Day celebrations.

The lecture will review transformative flotation kinetics, deep beneficiation of low-grade iron ore slimes, and hydrometallurgical recovery of critical metals from industrial wastes. All chapter life members and student affiliates are invited to attend.`,
    author: 'Honorary Secretary',
    attachmentPdfUrl: '#',
    isFeatured: false,
    publishedAt: '2025-12-14T14:30:00Z',
    isPublished: true,
  },
  {
    _id: 'seed-news-5',
    circularNo: 'CIR-47/12',
    title: 'Call for New Life Memberships & Institutional Benefactor Enrolment (2026 Cycle)',
    category: 'Membership',
    summary:
      'Applications are invited for Life Membership and Corporate Benefactor enrollment. Enjoy lifetime journal access, voting rights at AGM, and discounted national conference registrations across all affiliated institutes.',
    content: `Practicing metallurgists, faculty members, and materials engineering professionals residing or working in Odisha are cordially invited to submit their Life Membership credentials.

Corporate memberships are also open for iron and steel manufacturers, aluminium producers, mining companies, and equipment suppliers.`,
    author: 'Membership Desk',
    attachmentPdfUrl: '#',
    isFeatured: false,
    publishedAt: '2025-11-28T09:00:00Z',
    isPublished: true,
  },
  {
    _id: 'seed-news-6',
    circularNo: 'CIR-47/10',
    title: '48th Annual General Body Meeting (AGM) Notice & Election of Executive Committee',
    category: 'Electoral Notice',
    summary:
      'Statutory notice convening the 48th Annual General Body Meeting and inviting nominations for Chapter Office Bearers and Executive Committee members for the 2026–2028 tenure.',
    content: `Notice is hereby given to all bonafide Life Members of the Indian Institute of Metals, Bhubaneswar Chapter, that the 48th Annual General Meeting will convene at CSIR-IMMT Bhubaneswar.

Agenda:
1. Presentation and adoption of the Annual Report for 2025–2026.
2. Presentation and ratification of audited statements of accounts.
3. Declaration of election results for the Chapter Executive Committee 2026–2028.
4. Any other matter with the permission of the Chair.`,
    author: 'Election Officer',
    attachmentPdfUrl: '#',
    isFeatured: false,
    publishedAt: '2025-10-15T15:00:00Z',
    isPublished: true,
  },
];

const OFFICIAL_DOWNLOADS = [
  {
    title: 'AHSS-2026 Call for Extended Papers Template',
    meta: 'ZIP · 3.4 MB · LaTeX & MS Word',
    icon: FolderArchive,
    url: '#',
  },
  {
    title: '48th AGM Minutes & Audited Balance Sheet FY 2025-26',
    meta: 'PDF · 2.1 MB · Certified True Copy',
    icon: FileText,
    url: '#',
  },
  {
    title: 'NMD-2026 Regional Award Nomination Dossier',
    meta: 'DOCX · 850 KB · Annexure A–D',
    icon: FileCheck,
    url: '#',
  },
  {
    title: 'IIM Bhubaneswar Chapter Annual Almanac 2026',
    meta: 'PDF · 5.6 MB · Full Colour Broadsheet',
    icon: FileText,
    url: '#',
  },
  {
    title: 'Student Chapter Charter & Grant Guidelines',
    meta: 'PDF · 1.2 MB · Revised Criteria',
    icon: FileCheck,
    url: '#',
  },
];

export default function NewsList() {
  const [news, setNews] = useState<NewsItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Dispatches');
  const [selectedYear, setSelectedYear] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'gazette-id' | 'title'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<NewsItemData | null>(null);
  const [subscriptionEmail, setSubscriptionEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Fetch news circulars from MongoDB API with fallback
  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        let url = '/api/news';
        const params = new URLSearchParams();
        if (selectedCategory !== 'All Dispatches') {
          params.append('category', selectedCategory);
        }
        if (searchQuery.trim()) {
          params.append('search', searchQuery.trim());
        }
        const qs = params.toString();
        if (qs) url += `?${qs}`;

        const res = await fetch(url);
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setNews(json.data);
        } else {
          // Fallback if DB empty or unseeded
          if (selectedCategory === 'All Dispatches') {
            setNews(FALLBACK_NEWS);
          } else {
            setNews(FALLBACK_NEWS.filter((item) => item.category === selectedCategory));
          }
        }
      } catch (err) {
        console.warn('Using fallback news items due to fetch error:', err);
        if (selectedCategory === 'All Dispatches') {
          setNews(FALLBACK_NEWS);
        } else {
          setNews(FALLBACK_NEWS.filter((item) => item.category === selectedCategory));
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [selectedCategory, searchQuery]);

  // Client-side filtering & sorting for instant responsiveness
  const filteredNews = useMemo(() => {
    let result = [...news];

    // Year filter
    if (selectedYear !== 'All') {
      result = result.filter((item) => {
        const date = item.publishedAt || item.createdAt;
        if (!date) return false;
        const year = new Date(date).getFullYear().toString();
        return year === selectedYear;
      });
    }

    // Sort order
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        const dateA = new Date(a.publishedAt || a.createdAt || 0).getTime();
        const dateB = new Date(b.publishedAt || b.createdAt || 0).getTime();
        return dateB - dateA;
      }
      if (sortBy === 'gazette-id') {
        return (a.circularNo || '').localeCompare(b.circularNo || '');
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [news, selectedYear, sortBy]);

  // Lead Featured Story (first featured item or first item)
  const leadStory = useMemo(() => {
    return news.find((item) => item.isFeatured) || news[0] || FALLBACK_NEWS[0];
  }, [news]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriptionEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscriptionEmail('');
    }, 3000);
  };

  const lastGazettedDate = useMemo(() => {
    if (news.length === 0) return '18 Mar 2026';
    const latest = news[0]?.publishedAt || news[0]?.createdAt;
    if (!latest) return '18 Mar 2026';
    return new Date(latest).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, [news]);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Industrial Atmosphere Backdrop & Masthead Header */}
      <div className="relative w-full overflow-hidden bg-surface-container-low">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute top-80 left-1/4 w-80 h-80 bg-tertiary-fixed-dim/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-10 w-full relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-6">
            <Link className="hover:text-primary transition-colors flex items-center gap-1" href="/">
              <span className="material-symbols-outlined text-[15px]">home</span>
              <span>Home</span>
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">News &amp; Circulars</span>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface-variant font-mono">GAZETTE VOL. 48</span>
          </nav>

          {/* Masthead Header Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded bg-secondary-container/40 text-on-secondary-fixed mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                  OFFICIAL DISPATCH &amp; GAZETTE · EST. 1978
                </span>
              </div>
              <h1 className="font-display-lg text-headline-lg sm:text-display-lg text-on-surface tracking-tight mb-4 leading-tight">
                Chapter News, Technical Circulars &amp; Gazetted Notices
              </h1>
              <p className="font-body-lg text-body-lg text-secondary max-w-3xl leading-relaxed">
                Authoritative bulletins on metallurgical research frontiers, council resolutions, call-for-papers, award notifications, and policy memorandums across Odisha&apos;s industrial materials ecosystem.
              </p>
            </div>

            {/* Quick Statistics Badges Grid (Dynamic) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2.5 bg-surface-container p-3.5 rounded-xl border border-slate-200/50">
                <div className="bg-surface-container-lowest p-3 rounded-lg shadow-xs">
                  <span className="font-label-sm text-label-sm uppercase text-secondary block mb-0.5">Records</span>
                  <span className="font-title-lg text-title-lg text-on-surface font-semibold flex items-center gap-1.5">
                    {news.length}
                    <span className="font-label-sm text-label-sm text-primary font-normal">Circulars</span>
                  </span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-lg shadow-xs">
                  <span className="font-label-sm text-label-sm uppercase text-secondary block mb-0.5">Dispatches</span>
                  <span className="font-title-lg text-title-lg text-on-surface font-semibold flex items-center gap-1.5">
                    {NEWS_CATEGORIES.length - 1}
                    <span className="font-label-sm text-label-sm text-secondary font-normal">Series</span>
                  </span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-lg shadow-xs">
                  <span className="font-label-sm text-label-sm uppercase text-secondary block mb-0.5">Registry</span>
                  <span className="font-title-lg text-title-lg text-primary font-semibold">Vol. 48</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-lg shadow-xs">
                  <span className="font-label-sm text-label-sm uppercase text-secondary block mb-0.5">Last Gazetted</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold pt-1 block truncate">
                    {lastGazettedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search, Categorization and Archive Filters Bar */}
          <div className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm flex flex-col gap-4 border border-slate-200/60">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Live Query Field */}
              <div className="md:col-span-7 relative">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notices, circular numbers, authors, or topics..."
                  className="w-full pl-10 pr-10 py-2.5 bg-surface-container-low text-on-surface placeholder:text-secondary/70 font-body-md text-body-md rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all border border-transparent focus:border-primary/20"
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

              {/* Year Selector */}
              <div className="md:col-span-2">
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full appearance-none px-3.5 py-2.5 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                  >
                    <option value="All">All Years</option>
                    <option value="2026">Year: 2026</option>
                    <option value="2025">Year: 2025</option>
                    <option value="2024">Year: 2024</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Sort Selector */}
              <div className="md:col-span-3">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'gazette-id' | 'title')}
                    className="w-full appearance-none px-3.5 py-2.5 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                  >
                    <option value="newest">Sort: Newest First</option>
                    <option value="gazette-id">Sort: Gazette ID (Ascending)</option>
                    <option value="title">Sort: Headline Title</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[18px]">
                    sort
                  </span>
                </div>
              </div>
            </div>

            {/* Filter Classification Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-nowrap scrollbar-none">
              {NEWS_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg font-label-md text-label-md transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-on-primary font-semibold shadow-xs'
                      : 'bg-surface-container-low text-secondary hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Lead Featured Editorial Story (Flagship Announcement) */}
      {leadStory && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 my-10 w-full">
          <div className="bg-inverse-surface text-inverse-on-surface rounded-2xl overflow-hidden shadow-xl relative group">
            {/* Copper metallurgical accent ribbon top border */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-tertiary-fixed-dim to-primary" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              {/* Text Body Container */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                      GAZETTED · {leadStory.circularNo || '48/04'}
                    </span>
                    {leadStory.publishedAt && (
                      <span className="px-2.5 py-1 rounded bg-secondary/30 text-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-mono">
                        {new Date(leadStory.publishedAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        }).toUpperCase()}
                      </span>
                    )}
                    <span className="text-tertiary-fixed font-label-sm text-label-sm font-mono flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      COUNCIL RATIFIED
                    </span>
                  </div>

                  <h2 className="font-headline-lg text-xl sm:text-2xl lg:text-3xl font-bold text-surface-bright mb-4 tracking-tight leading-tight">
                    {leadStory.title}
                  </h2>

                  <p className="font-body-md text-body-md text-surface-variant/90 mb-6 leading-relaxed">
                    {leadStory.summary}
                  </p>

                  {/* Signatories & Authority Sign-off */}
                  <div className="flex items-center gap-4 py-3 px-4 rounded-xl bg-on-background/40 mb-6 border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-[22px]">draw</span>
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm uppercase text-surface-variant/70 block">
                        Signatory Authorities
                      </span>
                      <p className="font-body-sm text-body-sm text-surface-bright font-medium">
                        {leadStory.author || 'Dr. Ashok Kumar Mohanty (Chairman) & Prof. S. N. Pattnaik (Honorary Secretary)'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metadata & Action Group */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-surface-variant/70 font-label-sm text-label-sm font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" /> 6 min read
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4 text-tertiary-fixed" /> Annexure (1.8 MB)
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveArticle(leadStory)}
                      className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-md font-semibold"
                    >
                      <span>Read Full Dispatch</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href={leadStory.attachmentPdfUrl || '#'}
                      className="px-4 py-2.5 rounded-lg bg-secondary/30 hover:bg-secondary/50 text-surface-bright font-label-md text-label-md transition-colors flex items-center gap-1.5 font-medium"
                    >
                      <Download className="w-4 h-4" />
                      <span>PDF Docket</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Featured Visual / Laboratory Imagery */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-secondary overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6frPC2ZyNU0oyBcKksH4bX6xtEbhUDzFQusD_2ZD7W5TU4k3POvwE_xnV0KD1e0Yz8LRIFUJzBTIK0mP0GPfdCs0HCbS5FThFaUFNL53dc8dctFFdU6Eej5EVX9ZPJp19QghxzYIUFTFRRyefThOZMoF6rixgdJf3agUtcy6_t5Ftw6HGXGPX2aJP2ypuceN99naqqMStsbpvqna2fG5eFvK82JFaGkirEXsGMK3FitcldO3wE-6x"
                  alt="Modern pilot green hydrogen metallurgy laboratory inside CSIR IMMT Bhubaneswar"
                  fill
                  unoptimized
                  className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/30 to-transparent lg:bg-gradient-to-r lg:from-inverse-surface lg:via-transparent lg:to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-inverse-surface/90 backdrop-blur rounded-lg flex items-center justify-between border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">biotech</span>
                    <span className="font-label-sm text-label-sm text-surface-variant font-mono">
                      PILOT DRI CHAMBER · 1400°C SIMULATION
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-tertiary-fixed font-semibold">FIG. 48-A</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Main Two-Column Editorial & Dispatch Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Primary News & Circular Grid (~68%) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <h3 className="text-lg font-bold text-slate-900">Recent Gazetted Circulars &amp; Dispatches</h3>
              </div>
              <span className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-md font-semibold">
                {filteredNews.length} {filteredNews.length === 1 ? 'Dispatch' : 'Dispatches'} Live
              </span>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="font-body-sm text-body-sm">Fetching gazette notifications from MongoDB...</p>
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center">
                <FileText className="w-10 h-10 text-primary/40 mb-3" />
                <h4 className="text-base font-bold text-slate-800">No Dispatches Found</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  {searchQuery
                    ? `No circulars matched "${searchQuery}". Try different search terms.`
                    : `No dispatches listed under category "${selectedCategory}".`}
                </p>
                {(searchQuery || selectedCategory !== 'All Dispatches' || selectedYear !== 'All') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All Dispatches');
                      setSelectedYear('All');
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-primary bg-white rounded-lg border border-primary/20 hover:bg-primary/5 transition"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {filteredNews.map((item) => {
                  const pubDate = item.publishedAt || item.createdAt;
                  const dateStr = pubDate
                    ? new Date(pubDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Active';

                  return (
                    <article
                      key={item._id}
                      onClick={() => setActiveArticle(item)}
                      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-slate-200/80 flex flex-col justify-between gap-4 group cursor-pointer"
                    >
                      <div className="flex flex-col gap-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded bg-primary/10 text-primary font-mono text-xs font-bold uppercase">
                              {item.circularNo || 'CIR-GEN'}
                            </span>
                            <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                              {item.category}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-primary" /> {dateStr}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                          {item.title}
                        </h4>

                        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                          {item.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1.5 font-medium">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.author || 'Secretariat Bureau'}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          {item.attachmentPdfUrl && (
                            <span className="inline-flex items-center gap-1 text-slate-600 hover:text-primary">
                              <Download className="w-3.5 h-3.5" />
                              <span>Docket</span>
                            </span>
                          )}
                          <span className="text-primary font-semibold inline-flex items-center gap-1 group-hover:underline">
                            <span>Read Gazette</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Institutional Documents, Subscriptions & Media Liaison (~32%) */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-32">
            {/* 1. Official Document Downloads Desk */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-slate-200/60">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">folder_special</span>
                  <h3 className="font-title-md text-title-md font-bold text-on-surface">Gazetted Repository</h3>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-mono">Q1 2026</span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mb-4 leading-normal">
                Direct access to chapter governance dossiers, nomination packets, and conference circulars.
              </p>
              <div className="flex flex-col gap-2.5">
                {OFFICIAL_DOWNLOADS.map((doc, idx) => {
                  const DocIcon = doc.icon;
                  return (
                    <a
                      key={idx}
                      href={doc.url}
                      className="p-3 rounded-lg bg-surface-container-low hover:bg-secondary-container/50 transition-colors flex items-start gap-3 group"
                    >
                      <DocIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors leading-tight line-clamp-2">
                          {doc.title}
                        </p>
                        <span className="font-label-sm text-label-sm font-mono text-secondary mt-1 block">
                          {doc.meta}
                        </span>
                      </div>
                      <Download className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* 2. Gazette Subscription & Dispatch Alert Widget */}
            <div className="bg-surface-container-low rounded-xl p-6 shadow-sm border border-slate-200/60">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary text-[20px]">mark_email_read</span>
                <h3 className="font-title-md text-title-md font-bold text-on-surface">Gazette Subscription</h3>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mb-4 leading-normal">
                Receive notifications for gazetted circulars, award nomination deadlines, and symposium agendas directly to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
                <input
                  type="email"
                  value={subscriptionEmail}
                  onChange={(e) => setSubscriptionEmail(e.target.value)}
                  placeholder="metallurgist@institute.ac.in"
                  required
                  className="w-full px-3.5 py-2.5 bg-surface-container-lowest text-on-surface placeholder:text-secondary/70 font-body-sm text-body-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-xs border border-slate-200"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe to Official Dispatch</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {subscribed && (
                <div className="mt-3 p-2.5 rounded bg-emerald-50 text-emerald-800 font-label-sm text-label-sm flex items-center gap-1.5 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Subscribed to Chapter Gazette Vol. 48. Thank you!</span>
                </div>
              )}
              <span className="font-label-sm text-label-sm text-secondary/80 mt-3 block text-center">
                Official communications delivered monthly. Zero commercial spam.
              </span>
            </div>

            {/* 3. Press Desk & Media Contact Widget */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-slate-200/60">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                <span className="material-symbols-outlined text-secondary text-[20px]">newspaper</span>
                <h3 className="font-title-md text-title-md font-bold text-on-surface">Press Desk &amp; Media</h3>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mb-4 leading-normal">
                Accredited correspondents and industry trade editors may direct press inquiries and embargoed bulletin requests to our editorial bureau.
              </p>
              <div className="space-y-3 font-body-sm text-body-sm">
                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-label-sm text-label-sm uppercase text-secondary block font-semibold">
                      Liaison Secretariat
                    </span>
                    <span className="text-on-surface font-medium">
                      CSIR-IMMT Complex, Acharya Vihar, Bhubaneswar, 751013
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="font-label-sm text-label-sm uppercase text-secondary block font-semibold">
                      Direct Editorial Inbox
                    </span>
                    <a className="text-primary hover:underline font-mono" href="mailto:press@iimbhubaneswar.in">
                      press@iimbhubaneswar.in
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="font-label-sm text-label-sm uppercase text-secondary block font-semibold">
                      Media Hotline
                    </span>
                    <span className="text-on-surface font-mono">+91 (0674) 237-4920</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <a
                  className="w-full py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md text-center block transition-colors font-medium border border-slate-200"
                  href="mailto:press@iimbhubaneswar.in?subject=Request%20Media%20Kit%202026"
                >
                  Request Media Kit (2026 Edition)
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 4. Interactive Gazette Detail Reader Modal */}
      {activeArticle && (
        <div
          onClick={() => setActiveArticle(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl flex flex-col gap-5 border border-slate-200 relative"
          >
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-primary/10 text-primary font-mono text-xs font-bold uppercase">
                {activeArticle.circularNo || 'CIR-GEN'}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                {activeArticle.category}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 leading-tight">
              {activeArticle.title}
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-y border-slate-100 py-2.5">
              <span>
                <strong>Published:</strong>{' '}
                {activeArticle.publishedAt
                  ? new Date(activeArticle.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Active'}
              </span>
              <span>•</span>
              <span>
                <strong>Authority:</strong> {activeArticle.author || 'Secretariat Bureau'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs sm:text-sm text-amber-950 leading-relaxed italic">
              &ldquo;{activeArticle.summary}&rdquo;
            </div>

            {activeArticle.content && (
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {activeArticle.content}
              </div>
            )}

            {activeArticle.attachmentPdfUrl && (
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Official Docket Document</span>
                <a
                  href={activeArticle.attachmentPdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-semibold transition shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / View Attachment</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
