'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Building, UserCheck, Search, Star } from 'lucide-react';
import { committeeMembers, Officer } from '@/data/siteData';

const CATEGORIES = [
  { label: 'All Council (23)', value: 'All' },
  { label: 'Apex Council (4)', value: 'Apex' },
  { label: 'Office Bearers (5)', value: 'Office Bearer' },
  { label: 'Executive Committee (14)', value: 'Executive Member' },
];

export default function CommitteeList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered members
  const filteredOfficers: Officer[] = useMemo(() => {
    return committeeMembers.filter((m) => {
      // Category filter
      if (selectedCategory !== 'All' && m.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName = m.name.toLowerCase().includes(q);
        const matchRole = m.role.toLowerCase().includes(q);
        const matchInst = m.institution.toLowerCase().includes(q);
        const matchTitle = m.title.toLowerCase().includes(q);
        return matchName || matchRole || matchInst || matchTitle;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Color helper for roles
  const getRoleBadgeStyle = (role: string) => {
    if (role === 'Chairman') {
      return {
        badge: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
        dot: 'bg-amber-500',
        cardBorder: 'border-amber-300/90 shadow-md ring-1 ring-amber-400/20 hover:border-amber-400 hover:shadow-xl',
      };
    }
    if (role.includes('Vice-Chairman')) {
      return {
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
        cardBorder: 'border-slate-200/90 hover:border-amber-300/80 shadow-xs hover:shadow-md',
      };
    }
    if (role.includes('Secretary')) {
      return {
        badge: 'bg-blue-50 text-blue-800 border-blue-200',
        dot: 'bg-blue-600',
        cardBorder: 'border-slate-200/90 hover:border-blue-300/80 shadow-xs hover:shadow-md',
      };
    }
    if (role.includes('Treasurer')) {
      return {
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-600',
        cardBorder: 'border-slate-200/90 hover:border-emerald-300/80 shadow-xs hover:shadow-md',
      };
    }
    return {
      badge: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-400',
      cardBorder: 'border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md',
    };
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-7xl mx-auto px-6 lg:px-12 py-8">
      {/* Category Navigation & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-low p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none text-nowrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search & Count */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, institution, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <span className="text-xs font-mono font-bold text-slate-600 px-3 py-2 rounded-xl bg-white border border-slate-200 shrink-0">
            {filteredOfficers.length} Members
          </span>
        </div>
      </div>

      {/* Officers Grid */}
      {filteredOfficers.length === 0 ? (
        <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center">
          <UserCheck className="w-10 h-10 text-primary/40 mb-3" />
          <h4 className="text-base font-bold text-slate-800">No Members Found</h4>
          <p className="text-xs text-slate-500 mt-1">Try another keyword or select &quot;All Council&quot;.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-container transition cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOfficers.map((officer, index) => {
            const style = getRoleBadgeStyle(officer.role);
            const isChairman = officer.role === 'Chairman';
            const hasImage = Boolean(officer.image);

            // Extract clean initials
            const cleanName = officer.name.replace(/^(Dr\.|Prof\.|Shri|Ms\.|Mr\.)\s*/i, '').trim();
            const initials = cleanName
              .split(' ')
              .map((n) => n[0])
              .filter(Boolean)
              .slice(0, 2)
              .join('')
              .toUpperCase();

            // ================= CHAIRMAN CARD (FEATURING UPLOADED PHOTO) =================
            if (isChairman && hasImage) {
              return (
                <div
                  key={`${officer.name}-${index}`}
                  className="relative rounded-2xl overflow-hidden bg-slate-900 border border-amber-300/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 min-h-[300px] sm:min-h-[320px]"
                >
                  {/* Background Portrait Photo */}
                  <Image
                    src={officer.image}
                    alt={officer.name}
                    fill
                    unoptimized
                    priority
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  {/* Subtle dark gradient overlay for crystal clear contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/30" />

                  {/* Top Badges */}
                  <div className="relative z-10 p-4 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md border border-amber-300/40">
                      <Star className="w-3.5 h-3.5 fill-white text-white" />
                      <span>{officer.role}</span>
                    </span>

                    <span className="text-[11px] font-bold text-amber-200 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-400/30 font-mono">
                      2026–27
                    </span>
                  </div>

                  {/* Bottom Info */}
                  <div className="relative z-10 p-4 pt-10 text-white">
                    <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md leading-tight">
                      {officer.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-300 drop-shadow-sm mt-0.5">
                      {officer.title}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-2 bg-slate-900/70 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 w-fit">
                      <Building className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{officer.institution}</span>
                    </div>
                  </div>
                </div>
              );
            }

            // ================= STANDARD CLEAN COUNCIL MEMBER CARD =================
            return (
              <div
                key={`${officer.name}-${index}`}
                className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${style.cardBorder}`}
              >
                <div>
                  {/* Top Bar: Role badge + Year */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold border ${style.badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      <span>{officer.role}</span>
                    </span>

                    <span className="text-[11px] font-mono font-semibold text-slate-400">
                      2026–27
                    </span>
                  </div>

                  {/* Middle: Avatar + Name + Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center shrink-0 border border-slate-200/80">
                      {initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug truncate group-hover:text-primary transition-colors">
                        {officer.name}
                      </h3>
                      {officer.title && (
                        <span className="text-xs font-medium text-slate-500 block truncate mt-0.5">
                          {officer.title}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom: Organisation */}
                {officer.institution && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <Building className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">{officer.institution}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
