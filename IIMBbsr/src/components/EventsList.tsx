'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  X,
  Loader2,
  Sparkles,
  Download,
  Share2,
  CheckCircle2,
  BookOpen,
  Award,
  ArrowRight,
  Handshake,
  Send,
  Mail,
  UserCheck,
} from 'lucide-react';

export interface EventSpeaker {
  name: string;
  designation: string;
  topic?: string;
  image?: string;
}

export interface EventItemData {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  time?: string;
  venue: string;
  description: string;
  bannerImage?: string;
  registrationUrl?: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled' | string;
  isFeatured?: boolean;
  speakers?: EventSpeaker[];
  brochurePdfUrl?: string;
}

const EVENT_TYPES = [
  'All Types',
  'National Symposium',
  'Memorial Lecture',
  'Technical Workshop',
  'Industrial Visit',
  'Colloquium',
  'Annual General Meeting',
];

const FALLBACK_EVENTS: EventItemData[] = [
  {
    _id: 'seed-1',
    title: '18th National Symposium on Advanced High-Strength Steels & Decarbonized Ironmaking (AHSS-2026)',
    eventType: 'National Symposium',
    eventDate: '2026-03-28T09:00:00Z',
    time: '09:00 AM - 05:30 PM IST',
    venue: 'Dr. Nilamani Sen Hall, CSIR-IMMT & Virtual Hybrid',
    description:
      'Focusing on physical metallurgy of ultra-clean automotive grades, hydrogen direct reduction kinetics in Eastern Indian hematite pellets, and circular slag valorization in mega blast furnace complexes.',
    status: 'Upcoming',
    isFeatured: true,
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-kykxnI1VXLbgs2DRsX2Zsi8eLDyS6qLaHvY8FZpPDa9S2oliqL_oYipt5YOnGfKwvEjT4INx2aKxsG-MjgLCQah1cGlbB3KjRwUSm025RJ7DZvAB-1KFvziwRIMHKvJdd84H9b-ulzOzD3GoK3NJz2xFpw_pzyz6zCth6JDkADDGZBDgD--aFOmX7fakETECqcEfSjrXCKiJFM-PT3cvwemdMWZT00daxh36iKipZczROp9nSdKk',
    speakers: [
      {
        name: 'Dr. Ashok Kumar Mohanty',
        designation: 'Chief Scientist, CSIR-IMMT',
        topic: 'Decarbonization Pathways for Eastern Indian Steelmakers',
      },
    ],
  },
  {
    _id: 'seed-2',
    title: 'International Workshop on Green Hydrogen in Blast Furnaces & DRI',
    eventType: 'Technical Workshop',
    eventDate: '2026-04-15T09:30:00Z',
    time: '09:30 AM - 05:00 PM IST',
    venue: 'Mayfair Convention & Hybrid Stream, Bhubaneswar',
    description:
      'Evaluating tuyere gas injection dynamics, cold pellet crushing strength, and thermochemical modeling of zero-carbon ironmaking shafts.',
    status: 'Upcoming',
    isFeatured: true,
  },
  {
    _id: 'seed-3',
    title: 'Prof. P. K. Jena Memorial Lecture on Mineral Wealth of Odisha',
    eventType: 'Memorial Lecture',
    eventDate: '2026-05-08T16:30:00Z',
    time: '04:30 PM - 07:00 PM IST',
    venue: 'Main Auditorium, IIT Bhubaneswar',
    description:
      'Annual endowment oration delivering strategic pathways for bauxite, chromite, and manganese valorization in eastern regional clusters.',
    status: 'Upcoming',
    isFeatured: false,
  },
  {
    _id: 'seed-4',
    title: 'Colloquium on Strategic Rare Earth & Titanium Sand Beneficiation',
    eventType: 'Colloquium',
    eventDate: '2026-06-22T10:00:00Z',
    time: '10:00 AM - 05:30 PM IST',
    venue: 'CSIR-IMMT Bhubaneswar Campus',
    description:
      'Industrial round-table focusing on heavy mineral beach sands of Ganjam, monazite cracking, and ilmenite chlorination processes.',
    status: 'Upcoming',
    isFeatured: false,
  },
  {
    _id: 'seed-5',
    title: 'Odisha Metallurgical Conclave & Inter-Collegiate Quiz 2026',
    eventType: 'Technical Workshop',
    eventDate: '2026-07-18T09:00:00Z',
    time: '2-Day Summit',
    venue: 'KIIT-DU School of Materials Science, Bhubaneswar',
    description:
      'Undergraduate paper competitions, metallographic photo-micrograph contests, and state-wide metallurgical quiz with ₹1,00,000 cash prizes.',
    status: 'Upcoming',
    isFeatured: false,
  },
  {
    _id: 'seed-6',
    title: 'National Metallurgist Day (NMD) Regional Honors & Banquet',
    eventType: 'Annual General Meeting',
    eventDate: '2026-08-07T18:00:00Z',
    time: '06:00 PM - 10:00 PM IST',
    venue: 'Hotel Swosti Premium, Bhubaneswar',
    description:
      'Honoring distinguished chapter fellows, presenting Young Metallurgist Excellence plaques, and Chapter Executive installation dinner.',
    status: 'Upcoming',
    isFeatured: true,
  },
  {
    _id: 'seed-7',
    title: 'Seminar on Corrosion Engineering in Marine & Coastal Industrial Assets',
    eventType: 'Technical Workshop',
    eventDate: '2026-09-18T09:30:00Z',
    time: 'Full Day Technical',
    venue: 'IISER Berhampur & Gopalpur Port',
    description:
      'Cathodic protection design, microbial-induced corrosion in offshore piping, and field excursion across port structures at Gopalpur.',
    status: 'Upcoming',
    isFeatured: false,
  },
  {
    _id: 'seed-8',
    title: 'Industrial Workshop on Circular Economy & Red Mud Valorization',
    eventType: 'Technical Workshop',
    eventDate: '2026-10-14T09:00:00Z',
    time: '09:00 AM - 05:00 PM IST',
    venue: 'NALCO Research & Damanjodi Delegations',
    description:
      'Extraction of scandium and titanium values from bauxite residue, geopolymer cement synthesis, and commercial slag utilization benchmarks.',
    status: 'Upcoming',
    isFeatured: false,
  },
  {
    _id: 'seed-past-1',
    title: 'National Seminar on Low-Carbon Ferroalloys & Smelting',
    eventType: 'National Symposium',
    eventDate: '2025-11-12T09:00:00Z',
    time: '2-Day Symposium',
    venue: 'Jajpur Road Industrial Corridor',
    description:
      'Conducted at Jajpur Road with delegates from Jindal Stainless and IMFA focusing on energy recovery in submerged arc furnaces.',
    status: 'Completed',
    isFeatured: false,
  },
  {
    _id: 'seed-past-2',
    title: 'Workshop on Refractory Degradation in DRI Rotary Kilns',
    eventType: 'Technical Workshop',
    eventDate: '2025-08-24T09:30:00Z',
    time: 'Full Day Technical',
    venue: 'CSIR-IMMT Bhubaneswar',
    description:
      'CSIR-IMMT lecture series covering spinel coatings, ring formation mitigation, and alkali corrosion resistance in DRI rotary kilns.',
    status: 'Completed',
    isFeatured: false,
  },
  {
    _id: 'seed-past-3',
    title: 'Odisha Materials Colloquium on Additive Manufacturing Alloys',
    eventType: 'Colloquium',
    eventDate: '2025-04-18T10:00:00Z',
    time: 'Full Day Technical',
    venue: 'IIT Bhubaneswar Campus',
    description:
      'Titanium and superalloy powder synthesis protocols, laser powder bed fusion kinetics, with IIT Bhubaneswar laboratory demonstration.',
    status: 'Completed',
    isFeatured: false,
  },
  {
    _id: 'seed-past-4',
    title: 'National Conference on Clean Beneficiation of Low-Grade Iron Ores',
    eventType: 'National Symposium',
    eventDate: '2024-12-05T09:00:00Z',
    time: '2-Day Conference',
    venue: 'Mayfair Convention, Bhubaneswar',
    description:
      'Hydrocyclone sizing, HGMS magnetic separators, and slime pond recovery plants for zero-loss iron ore mining in Eastern India.',
    status: 'Completed',
    isFeatured: false,
  },
];

export default function EventsList() {
  const [events, setEvents] = useState<EventItemData[]>(FALLBACK_EVENTS);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Upcoming' | 'Completed'>('All');
  const [selectedType, setSelectedType] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventItemData | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const res = await fetch('/api/events');
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setEvents(json.data);
        }
      } catch (err) {
        console.warn('Using seeded events fallback:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // Compute live statistics
  const upcomingEvents = events.filter((e) => e.status === 'Upcoming' || e.status === 'Ongoing');
  const completedEvents = events.filter((e) => e.status === 'Completed');

  // Top featured spotlight event (find featured upcoming, or any featured, or first upcoming)
  const featuredEvent =
    events.find((e) => e.isFeatured && (e.status === 'Upcoming' || e.status === 'Ongoing')) ||
    events.find((e) => e.isFeatured) ||
    events.find((e) => e.status === 'Upcoming') ||
    events[0];

  // Filter events list
  const filteredEvents = events.filter((ev) => {
    // Status filter
    if (statusFilter === 'Upcoming' && ev.status !== 'Upcoming' && ev.status !== 'Ongoing') {
      return false;
    }
    if (statusFilter === 'Completed' && ev.status !== 'Completed') {
      return false;
    }
    // Type filter
    if (selectedType !== 'All Types' && ev.eventType !== selectedType) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = ev.title.toLowerCase().includes(q);
      const matchVenue = ev.venue.toLowerCase().includes(q);
      const matchDesc = ev.description.toLowerCase().includes(q);
      const matchType = ev.eventType.toLowerCase().includes(q);
      const matchSpeaker = ev.speakers?.some((s) => s.name.toLowerCase().includes(q)) ?? false;
      return matchTitle || matchVenue || matchDesc || matchType || matchSpeaker;
    }
    return true;
  });

  return (
    <div className="w-full flex flex-col">
      {/* Top Breadcrumb & Live System Status */}
      <section className="w-full bg-surface-container-low/70 py-3 sm:py-3.5 px-6 lg:px-12 border-b border-surface-variant/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-label-sm text-label-sm">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">home</span>
              <span>Home</span>
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface font-semibold text-primary">Technical Calendar &amp; Symposia</span>
          </nav>
          <div className="flex items-center gap-4 text-on-surface-variant">
            <span className="inline-flex items-center gap-1.5 font-label-sm uppercase tracking-wider text-primary">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Synchronized with Chapter Database</span>
            </span>
            <span className="hidden sm:inline text-outline-variant">•</span>
            <span className="hidden sm:inline font-mono text-[11px] text-secondary">ISO/CPD SCHEME: IIM-BBSR-2026</span>
          </div>
        </div>
      </section>

      {/* Editorial Masthead & Thesis */}
      <section className="w-full bg-surface py-space-xl px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-end">
          {/* Left Column: Title & Thesis */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">
              <span className="h-px w-6 bg-primary"></span>
              <span>TECHNICAL SYMPOSIA &amp; COLLOQUIA 2024–2026</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight leading-none text-balance">
              Chapter Technical Calendar &amp; Symposia
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed text-pretty">
              Premier metallurgy conferences, industrial workshops, endowment lectures, and student colloquia
              advancing mineral processing and materials innovation across Eastern India’s mineral core.
            </p>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="font-mono font-semibold">{upcomingEvents.length} Upcoming in 2026</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary-container/60 text-on-secondary-container font-label-md text-label-md shadow-sm">
                <BookOpen className="w-4 h-4 text-secondary" />
                <span className="font-mono">{completedEvents.length} Archival Symposia</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md shadow-sm">
                <Award className="w-4 h-4 text-tertiary" />
                <span className="font-semibold uppercase tracking-wider">CPD Accredited</span>
              </div>
            </div>
          </div>

          {/* Right Column: Registrar Notice Card */}
          <div className="lg:col-span-4 flex flex-col gap-3 p-5 rounded-2xl bg-surface-container-low border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Registrar Notice
              </span>
              <span className="font-mono text-[11px] text-primary font-medium">REV 4.2</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-normal">
              All technical sessions offer structured Continuing Professional Development (CPD) credit certificates
              endorsed by IIM National Headquarters, Kolkata.
            </p>
            <div className="pt-2 flex items-center justify-between font-label-sm text-label-sm text-secondary border-t border-slate-200/60">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>All Times IST (UTC+5:30)</span>
              </span>
              <a href="#events-catalog" className="text-primary hover:underline inline-flex items-center gap-0.5 font-semibold">
                <span>View Catalog</span>
                <span className="text-xs">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED FLAGSHIP SPOTLIGHT BANNER */}
      {featuredEvent && (
        <section className="w-full bg-surface px-6 lg:px-12 pb-space-xl">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden bg-inverse-surface text-inverse-on-surface shadow-xl">
              <div className="h-1.5 w-full bg-gradient-to-r from-primary via-amber-400 to-tertiary"></div>
              <div className="p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Metadata & Narrative */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-widest font-semibold shadow-sm">
                      FLAGSHIP CHAPTER SYMPOSIUM
                    </span>
                    <span className="font-mono text-tertiary-fixed text-label-md font-semibold">
                      {new Date(featuredEvent.eventDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }).toUpperCase()}
                    </span>
                    <span className="hidden sm:inline text-surface-variant/40">•</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-surface-container-highest/20 text-surface-variant font-label-sm text-label-sm">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{featuredEvent.status} • CPD Certified</span>
                    </span>
                  </div>

                  <h2 className="font-headline-lg text-headline-lg text-surface-bright font-semibold leading-tight tracking-tight">
                    {featuredEvent.title}
                  </h2>

                  <p className="font-body-md text-body-md text-surface-variant/90 leading-relaxed max-w-3xl">
                    {featuredEvent.description}
                  </p>

                  {/* Parameter Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                    <div className="flex flex-col gap-1 p-3 rounded-xl bg-surface-container-highest/10 border border-white/5">
                      <span className="font-label-sm text-label-sm text-surface-variant/70 uppercase tracking-wider">
                        Date &amp; Schedule
                      </span>
                      <span className="font-mono text-label-md text-surface-bright font-medium">
                        {new Date(featuredEvent.eventDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="font-label-sm text-surface-variant/60">{featuredEvent.time || '09:00 AM - 05:30 PM IST'}</span>
                    </div>

                    <div className="flex flex-col gap-1 p-3 rounded-xl bg-surface-container-highest/10 border border-white/5">
                      <span className="font-label-sm text-label-sm text-surface-variant/70 uppercase tracking-wider">
                        Location / Venue
                      </span>
                      <span className="font-title-md text-[14px] text-surface-bright leading-tight font-semibold line-clamp-1">
                        {featuredEvent.venue}
                      </span>
                      <span className="font-label-sm text-surface-variant/60">CSIR-IMMT &amp; Hybrid Stream</span>
                    </div>

                    <div className="flex flex-col gap-1 p-3 rounded-xl bg-surface-container-highest/10 border border-white/5 sm:col-span-2 md:col-span-1">
                      <span className="font-label-sm text-label-sm text-surface-variant/70 uppercase tracking-wider">
                        Event Category
                      </span>
                      <span className="font-title-md text-[14px] text-surface-bright leading-tight font-semibold">
                        {featuredEvent.eventType}
                      </span>
                      <span className="font-label-sm text-surface-variant/60">IIM National Accredited</span>
                    </div>
                  </div>

                  {/* CTA Actions Strip */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <button
                      onClick={() => setSelectedEvent(featuredEvent)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all shadow-md font-semibold"
                    >
                      <span>View Event Details &amp; Register</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {featuredEvent.registrationUrl && (
                      <a
                        href={featuredEvent.registrationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-highest/20 hover:bg-surface-container-highest/30 text-surface-bright font-label-md text-label-md transition-colors shadow-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Direct Registration Link</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: Visual Specimen Card */}
                <div className="lg:col-span-4 flex flex-col gap-3">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg bg-surface-container-highest h-60">
                    {featuredEvent.bannerImage ? (
                      <Image
                        src={featuredEvent.bannerImage}
                        alt={featuredEvent.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-900 to-slate-900 p-6 text-center">
                        <Award className="w-12 h-12 text-amber-400 mb-2" />
                        <span className="text-white font-bold text-sm">{featuredEvent.eventType}</span>
                        <span className="text-amber-200/80 text-xs mt-1">Official Flagship Conclave</span>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 right-2 p-2.5 rounded-xl bg-inverse-surface/90 backdrop-blur-sm flex items-center justify-between text-surface-bright">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] text-surface-variant/80 uppercase tracking-widest">
                          Symposium Track
                        </span>
                        <span className="font-title-md text-[13px] font-semibold">Decarbonized Metallurgy</span>
                      </div>
                      <span className="font-mono text-tertiary-fixed text-[11px] font-bold">CPD: 16 HRS</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-container-highest/15 border border-white/5 flex items-center justify-between text-surface-bright font-mono text-[11px]">
                    <span>CSIR-IMMT</span>
                    <span>•</span>
                    <span>IIT BHUBANESWAR</span>
                    <span>•</span>
                    <span>TATA STEEL JSR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FILTER AND SEARCH TOOLBAR */}
      <section id="events-catalog" className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-4">
        <div className="w-full bg-surface-container-low p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container overflow-x-auto">
              <button
                onClick={() => setStatusFilter('All')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                  statusFilter === 'All'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                All Events ({events.length})
              </button>
              <button
                onClick={() => setStatusFilter('Upcoming')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                  statusFilter === 'Upcoming'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Upcoming Sessions ({upcomingEvents.length})
              </button>
              <button
                onClick={() => setStatusFilter('Completed')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                  statusFilter === 'Completed'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Past Symposia ({completedEvents.length})
              </button>
            </div>

            <span className="text-xs text-secondary font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Showing {filteredEvents.length} Events in Schedule</span>
            </span>
          </div>

          {/* Search & Type dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by title, keyword, speaker, or venue..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-on-surface text-sm placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-xs"
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

            <div className="md:col-span-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-white text-on-surface text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-xs"
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC EVENTS GRID */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm">Fetching scheduled symposia and events from MongoDB...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-16 text-center bg-surface-container-low/40 rounded-2xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center">
            <Calendar className="w-10 h-10 text-primary/40 mb-3" />
            <h4 className="text-base font-bold text-slate-800">No Events Found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              {searchQuery
                ? `No events match "${searchQuery}". Try different keywords.`
                : 'No scheduled events match the selected filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((ev) => {
              const dateObj = new Date(ev.eventDate);
              const day = dateObj.getDate();
              const month = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
              const year = dateObj.getFullYear();

              return (
                <div
                  key={ev._id}
                  onClick={() => setSelectedEvent(ev)}
                  className="flex flex-col justify-between rounded-2xl bg-white p-5 shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/80 group cursor-pointer"
                >
                  <div className="flex flex-col gap-3">
                    {/* Date & Category Tag */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-baseline gap-1.5 font-mono text-primary font-bold">
                        <span className="text-3xl leading-none">{day}</span>
                        <span className="text-xs uppercase font-semibold text-slate-600">
                          {month} {year}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] font-bold uppercase tracking-wider">
                        {ev.eventType}
                      </span>
                    </div>

                    {/* Banner if exists */}
                    {ev.bannerImage && (
                      <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-100">
                        <Image
                          src={ev.bannerImage}
                          alt={ev.title}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 350px"
                        />
                      </div>
                    )}

                    <h4 className="font-headline-sm text-base font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {ev.title}
                    </h4>

                    <p className="font-body-sm text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {ev.description}
                    </p>

                    <div className="flex flex-col gap-1.5 pt-2 text-xs text-slate-500 border-t border-slate-100">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{ev.venue}</span>
                      </div>
                      {ev.time && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{ev.time}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        ev.status === 'Upcoming'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : ev.status === 'Ongoing'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {ev.status}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold group-hover:underline">
                      <span>View Details</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ARCHIVAL PAST SYMPOSIA & PUBLISHED PROCEEDINGS */}
      {completedEvents.length > 0 && (
        <section className="w-full bg-surface-container-low py-space-xl px-6 lg:px-12 border-t border-surface-variant/40">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">
                  PEER-REVIEWED ARCHIVES
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
                  Recent Past Symposia &amp; Published Proceedings
                </h3>
              </div>
              <span className="text-xs text-secondary font-mono">
                {completedEvents.length} Archival Symposia Documented
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {completedEvents.map((pastEv, idx) => {
                const pastDate = new Date(pastEv.eventDate);
                const pastDateStr = pastDate.toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                }).toUpperCase();

                return (
                  <div
                    key={pastEv._id}
                    onClick={() => setSelectedEvent(pastEv)}
                    className="flex flex-col justify-between p-5 rounded-2xl bg-white shadow-xs hover:shadow-md transition border border-slate-200/80 cursor-pointer"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-secondary font-mono text-[11px]">
                        <span>{pastDateStr}</span>
                        <span className="font-bold text-primary">VOL. {43 - idx}</span>
                      </div>
                      <h5 className="font-title-md text-sm font-bold text-on-surface leading-snug line-clamp-2">
                        {pastEv.title}
                      </h5>
                      <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
                        {pastEv.description}
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col gap-2 border-t border-slate-100 mt-3">
                      <span className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>View Symposium Record</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CO-SPONSORSHIP & COLLABORATIVE BANNER */}
      <section className="w-full bg-surface py-space-xl px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 md:p-10 rounded-2xl bg-surface-container relative overflow-hidden shadow-xs border border-surface-variant/40">
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">
                  <Handshake className="w-5 h-5 text-primary" />
                  <span>INDUSTRY &amp; ACADEMIA COLLABORATIVE SYMPOSIA</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold leading-tight">
                  Host or Co-Sponsor a Technical Symposium with IIM Bhubaneswar Chapter
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
                  Industrial plants (Tata Steel, JSPL, NALCO, JSL, AM/NS) and research universities are invited
                  to partner with the Chapter to conduct plant-specific workshops, technical seminars, and
                  peer-reviewed endowment lectures with full national academic accreditation.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-on-surface font-label-sm text-label-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>CPD Point Accreditation</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>ISBN Cataloged Proceedings</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Regional Industry-Academia Network</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all shadow-md font-semibold text-center"
                >
                  <span>Submit Event Proposal</span>
                  <Send className="w-4 h-4" />
                </Link>
                <Link
                  href="/committee"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors text-center font-medium shadow-xs"
                >
                  <span>Contact Programmes Committee</span>
                  <Mail className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT DETAILS LIGHTBOX MODAL */}
      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl flex flex-col gap-5 border border-slate-200 relative"
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedEvent.bannerImage && (
              <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src={selectedEvent.bannerImage}
                  alt={selectedEvent.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                  {selectedEvent.eventType}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    selectedEvent.status === 'Upcoming'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {selectedEvent.status}
                </span>
                {selectedEvent.isFeatured && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                {selectedEvent.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>
                  <strong>Date:</strong>{' '}
                  {new Date(selectedEvent.eventDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              {selectedEvent.time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>
                    <strong>Time:</strong> {selectedEvent.time}
                  </span>
                </div>
              )}
              <div className="flex items-start gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Venue:</strong> {selectedEvent.venue}
                </span>
              </div>
            </div>

            {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-primary" />
                  <span>Featured Speakers &amp; Convenors</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedEvent.speakers.map((sp, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-surface-container-low border border-slate-200/60 flex flex-col">
                      <span className="font-semibold text-slate-900 text-xs">{sp.name}</span>
                      <span className="text-[11px] text-slate-500">{sp.designation}</span>
                      {sp.topic && (
                        <span className="text-[10px] text-primary mt-1 font-medium italic">
                          "{sp.topic}"
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">Overview &amp; Theme</h4>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {selectedEvent.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400 font-mono">
                CPD Certification Accredited
              </span>
              <div className="flex items-center gap-2">
                {selectedEvent.registrationUrl && (
                  <a
                    href={selectedEvent.registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-semibold transition shadow-sm"
                  >
                    <span>Register Online</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
