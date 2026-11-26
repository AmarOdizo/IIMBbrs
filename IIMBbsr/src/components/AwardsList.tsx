'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Award,
  Calendar,
  Building2,
  Search,
  ArrowRight,
  Medal,
  LayoutGrid,
  List,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  AWARDEES_DATA,
  CHAPTER_AWARD_CATEGORIES,
  type AwardeeItem,
} from '@/data/awardsData';

export default function AwardsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAward, setSelectedAward] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Extract distinct years sorted descending
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(AWARDEES_DATA.map((a) => a.year)));
    return years.sort((a, b) => b - a);
  }, []);

  // Filtered awardees list
  const filteredAwardees = useMemo(() => {
    return AWARDEES_DATA.filter((item) => {
      // Award filter
      if (selectedAward !== 'ALL' && item.awardName !== selectedAward) {
        return false;
      }
      // Year filter
      if (selectedYear !== 'ALL' && item.year.toString() !== selectedYear) {
        return false;
      }
      // Search filter (name or organisation)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.recipientName.toLowerCase().includes(q);
        const matchOrg = item.recipientOrganisation.toLowerCase().includes(q);
        const matchAward = item.awardName.toLowerCase().includes(q);
        const matchYear = item.year.toString().includes(q);
        return matchName || matchOrg || matchAward || matchYear;
      }
      return true;
    });
  }, [searchQuery, selectedAward, selectedYear]);

  // Color & styling helper for each award type
  const getAwardTheme = (awardName: string) => {
    if (awardName.includes('Tamotia')) {
      return {
        pill: 'bg-amber-50 text-amber-800 border-amber-200/90',
        dot: 'bg-amber-500',
        border: 'hover:border-amber-400/80',
        accentBar: 'bg-gradient-to-r from-amber-400 to-amber-500',
        avatarBg: 'bg-amber-100 text-amber-800 border-amber-200',
        short: 'Dr. S. K. Tamotia Award',
      };
    }
    if (awardName.includes('Das')) {
      return {
        pill: 'bg-purple-50 text-purple-800 border-purple-200/90',
        dot: 'bg-purple-500',
        border: 'hover:border-purple-400/80',
        accentBar: 'bg-gradient-to-r from-purple-400 to-purple-600',
        avatarBg: 'bg-purple-100 text-purple-800 border-purple-200',
        short: 'Dr. R. P. Das Memorial Award',
      };
    }
    return {
      pill: 'bg-blue-50 text-blue-800 border-blue-200/90',
      dot: 'bg-blue-600',
      border: 'hover:border-blue-400/80',
      accentBar: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      avatarBg: 'bg-blue-100 text-blue-800 border-blue-200',
      short: 'Chapter Award',
    };
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedAward('ALL');
    setSelectedYear('ALL');
  };

  return (
    <div className="w-full bg-surface min-h-screen">
      {/* Top Accent Gradient Bar */}
      <div className="w-full h-1.5 bg-gradient-to-r from-primary via-amber-500 to-tertiary"></div>

      {/* Hero Eyebrow & Title */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-8 pb-6">
        <nav className="flex items-center gap-2 font-label-md text-label-md text-secondary mb-4">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Home</span>
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="text-primary font-semibold">Awards &amp; Honors</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-surface-variant/40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-primary font-label-sm text-label-sm uppercase tracking-widest mb-3">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>ANNUAL INSTITUTIONAL BENCHMARKS &amp; HONORS</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-4">
              Chapter Awards &amp; Roll of Honor
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Official citations and roll of honor conferred by The Indian Institute of Metals, Bhubaneswar Chapter.
              Celebrating groundbreaking achievements in metallurgical engineering, hydrometallurgy, mineral processing,
              and industrial materials leadership across Eastern India and globally.
            </p>
          </div>

          {/* Quick Counter Mosaic */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container-low p-4 rounded-2xl border border-slate-200/80 shadow-xs shrink-0">
            <div className="flex flex-col border-r border-surface-variant/50 pr-4 last:border-0">
              <span className="font-headline-sm text-headline-sm text-primary font-bold">
                {AWARDEES_DATA.length}
              </span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Laureates</span>
            </div>
            <div className="flex flex-col border-r border-surface-variant/50 pr-4 last:border-0">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">03</span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Apex Awards</span>
            </div>
            <div className="flex flex-col border-r border-surface-variant/50 pr-4 last:border-0">
              <span className="font-headline-sm text-headline-sm text-primary font-bold">2018–26</span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Conferment</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-tertiary font-semibold">1978</span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Charter</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Cards: The 3 Endowed Awards */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Major Conferred Honors
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Instituted awards recognizing research, academic excellence, and industrial leadership
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-slate-100 rounded-full text-slate-600 self-start sm:self-auto border border-slate-200">
            Click any award below to filter recipients
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHAPTER_AWARD_CATEGORIES.map((cat) => {
            const count = AWARDEES_DATA.filter((a) => a.awardName === cat.name).length;
            const isSelected = selectedAward === cat.name;

            return (
              <div
                key={cat.id}
                onClick={() => setSelectedAward(isSelected ? 'ALL' : cat.name)}
                className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'border-primary bg-primary/[0.03] ring-2 ring-primary/20 shadow-md'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cat.badgeColor}`}>
                      {cat.shortName}
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {count} Recipients
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors mb-1.5 leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-medium text-amber-700 mb-3">{cat.tagline}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{cat.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className={`font-semibold ${isSelected ? 'text-primary' : 'text-slate-500'}`}>
                    {isSelected ? '✓ Filter Applied' : 'View Recipients'}
                  </span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${
                      isSelected ? 'text-primary' : 'text-slate-400'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Roll of Honor Cards & Directory Section */}
      <section id="roll-of-honor" className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-4 pb-24">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <Medal className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Official Roll of Honor
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Conferred laureates and institutional affiliations across Eastern India (2018–2026)
              </p>
            </div>

            {/* Total count badge & View Mode Toggle */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-xl">
                Showing {filteredAwardees.length} of {AWARDEES_DATA.length} Laureates
              </span>

              {/* View Toggle: Cards vs Table */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    viewMode === 'cards'
                      ? 'bg-white text-primary shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Card View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-white text-primary shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Table View"
                >
                  <List className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="py-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search recipient name, organisation (e.g. CSIR-IMMT, NALCO, IIT)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Dropdowns / Controls */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {/* Award filter */}
              <select
                aria-label="Filter by Award"
                value={selectedAward}
                onChange={(e) => setSelectedAward(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="ALL">All Awards ({AWARDEES_DATA.length})</option>
                <option value="IIM Bhubaneswar Chapter Award">IIM Bhubaneswar Chapter Award</option>
                <option value="Dr. S. K. Tamotia Award">Dr. S. K. Tamotia Award</option>
                <option value="Dr. R. P. Das Memorial Award">Dr. R. P. Das Memorial Award</option>
              </select>

              {/* Year filter */}
              <select
                aria-label="Filter by Year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="ALL">All Years</option>
                {availableYears.map((yr) => (
                  <option key={yr} value={yr.toString()}>
                    Year {yr}
                  </option>
                ))}
              </select>

              {/* Reset button if filter is active */}
              {(selectedAward !== 'ALL' || selectedYear !== 'ALL' || searchQuery !== '') && (
                <button
                  onClick={handleResetFilters}
                  className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Pill Badges */}
          <div className="pb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Quick Filters:</span>
            <button
              onClick={() => setSelectedAward('ALL')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedAward === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              All ({AWARDEES_DATA.length})
            </button>
            <button
              onClick={() => setSelectedAward('IIM Bhubaneswar Chapter Award')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedAward === 'IIM Bhubaneswar Chapter Award'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60'
              }`}
            >
              Chapter Award (14)
            </button>
            <button
              onClick={() => setSelectedAward('Dr. S. K. Tamotia Award')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedAward === 'Dr. S. K. Tamotia Award'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
              }`}
            >
              Dr. S. K. Tamotia Award (6)
            </button>
            <button
              onClick={() => setSelectedAward('Dr. R. P. Das Memorial Award')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedAward === 'Dr. R. P. Das Memorial Award'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200/60'
              }`}
            >
              Dr. R. P. Das Memorial Award (4)
            </button>
          </div>

          {/* ================= PRIMARY VIEW: USER-FRIENDLY CARDS ================= */}
          {viewMode === 'cards' && (
            <div>
              {filteredAwardees.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredAwardees.map((item, idx) => {
                    const theme = getAwardTheme(item.awardName);
                    // Extract initial letter for avatar monogram
                    const cleanName = item.recipientName.replace(/^(Dr\.|Prof\.|Shri|Ms\.|Mr\.)\s*/i, '').trim();
                    const initials = cleanName.charAt(0) || 'A';

                    return (
                      <div
                        key={item.id}
                        className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg ${theme.border} transition-all duration-300 flex flex-col justify-between overflow-hidden relative group hover:-translate-y-1`}
                      >
                        {/* Top decorative accent line */}
                        <div className={`w-full h-1.5 ${theme.accentBar}`}></div>

                        <div className="p-5 flex-1 flex flex-col">
                          {/* Top Row: Award Badge & Year */}
                          <div className="flex items-center justify-between gap-2 mb-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border truncate ${theme.pill}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${theme.dot}`}></span>
                              <span className="truncate">{item.awardName}</span>
                            </span>

                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 font-bold text-slate-800 text-xs border border-slate-200 font-mono shrink-0 shadow-2xs">
                              <Calendar className="w-3 h-3 text-slate-500" />
                              <span>{item.year}</span>
                            </span>
                          </div>

                          {/* Recipient Profile Section */}
                          <div className="flex items-start gap-3.5 mb-4">
                            {/* Avatar Monogram */}
                            <div
                              className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base shrink-0 shadow-2xs border ${theme.avatarBg}`}
                            >
                              {initials}
                            </div>

                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-tight mb-0.5">
                                Awardee Laureate #{item.sl}
                              </span>
                              <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors text-base sm:text-lg leading-snug">
                                {item.recipientName}
                              </h3>
                            </div>
                          </div>

                          {/* Recipient Organisation Pill */}
                          <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-700 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100/90">
                            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="font-medium truncate">{item.recipientOrganisation}</span>
                          </div>
                        </div>

                        {/* Card Footer Bar */}
                        <div className="px-5 py-2.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1 font-medium text-slate-500">
                            <Medal className="w-3 h-3 text-amber-500" />
                            <span>Conferred Honor</span>
                          </span>
                          <span className="font-mono text-slate-400">Year {item.year}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-16 text-center text-slate-500 bg-slate-50/60 rounded-3xl border border-dashed border-slate-200">
                  <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                  <span className="font-bold text-slate-800 text-base block">No award recipients match your search</span>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try searching with another keyword (e.g. CSIR-IMMT, NALCO, IIT, or a recipient name).
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-container transition shadow-xs cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================= SECONDARY VIEW: OPTIONAL COMPACT TABLE ================= */}
          {viewMode === 'table' && (
            <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 w-14 text-center">#</th>
                    <th className="py-3.5 px-4 w-28">Year</th>
                    <th className="py-3.5 px-6">Award Name</th>
                    <th className="py-3.5 px-6">Recipient Name</th>
                    <th className="py-3.5 px-6">Recipient Organisation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAwardees.length > 0 ? (
                    filteredAwardees.map((item, idx) => {
                      const theme = getAwardTheme(item.awardName);
                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/80 transition-colors group"
                        >
                          {/* Sl No */}
                          <td className="py-4 px-4 text-center font-mono font-medium text-slate-400">
                            {idx + 1}
                          </td>

                          {/* Year */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 font-bold text-slate-800 text-xs border border-slate-200/60 font-mono">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <span>{item.year}</span>
                            </span>
                          </td>

                          {/* Award Name */}
                          <td className="py-4 px-6">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${theme.pill}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`}></span>
                              <span>{item.awardName}</span>
                            </span>
                          </td>

                          {/* Recipient Name */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-xs shrink-0 border ${theme.avatarBg}`}>
                                {item.recipientName.replace(/^(Dr\.|Prof\.|Shri|Ms\.|Mr\.)\s*/i, '').charAt(0)}
                              </div>
                              <span className="font-bold text-slate-900 group-hover:text-primary transition-colors text-sm">
                                {item.recipientName}
                              </span>
                            </div>
                          </td>

                          {/* Recipient Organisation */}
                          <td className="py-4 px-6 text-slate-700 font-medium">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{item.recipientOrganisation}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Search className="w-6 h-6 text-slate-300" />
                          <span className="font-semibold text-slate-700 text-sm">No award recipients match your search.</span>
                          <p className="text-xs text-slate-400">Try adjusting your keyword or reset filters.</p>
                          <button
                            onClick={handleResetFilters}
                            className="mt-2 px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-container transition"
                          >
                            Clear All Filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
