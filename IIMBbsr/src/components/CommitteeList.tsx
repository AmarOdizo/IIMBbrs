'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Building, UserCheck, Search, Mail, ShieldCheck } from 'lucide-react';
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
        const matchTitle = (m.title || '').toLowerCase().includes(q);
        return matchName || matchRole || matchInst || matchTitle;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Color helper for roles
  const getRoleBadgeStyle = (role: string) => {
    if (role === 'Chairman') {
      return {
        badge: 'bg-amber-50 text-amber-900 border-amber-300 font-bold',
        dot: 'bg-amber-500',
        cardBorder: 'border-amber-200/90 hover:border-amber-400 shadow-sm hover:shadow-md ring-1 ring-amber-400/20',
      };
    }
    if (role.includes('Vice-Chairman')) {
      return {
        badge: 'bg-amber-50/70 text-amber-800 border-amber-200 font-semibold',
        dot: 'bg-amber-500',
        cardBorder: 'border-slate-200 hover:border-amber-300/80 shadow-xs hover:shadow-md',
      };
    }
    if (role === 'Secretary') {
      return {
        badge: 'bg-blue-50 text-blue-800 border-blue-200 font-semibold',
        dot: 'bg-blue-600',
        cardBorder: 'border-slate-200 hover:border-blue-300/80 shadow-xs hover:shadow-md',
      };
    }
    if (role.includes('Joint Secretary')) {
      return {
        badge: 'bg-indigo-50 text-indigo-800 border-indigo-200 font-semibold',
        dot: 'bg-indigo-600',
        cardBorder: 'border-slate-200 hover:border-indigo-300/80 shadow-xs hover:shadow-md',
      };
    }
    if (role.includes('Treasurer')) {
      return {
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
        dot: 'bg-emerald-600',
        cardBorder: 'border-slate-200 hover:border-emerald-300/80 shadow-xs hover:shadow-md',
      };
    }
    return {
      badge: 'bg-slate-100 text-slate-700 border-slate-200 font-medium',
      dot: 'bg-slate-400',
      cardBorder: 'border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md',
    };
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Category Navigation & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-nowrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search & Count */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, role, institution..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <span className="text-xs font-mono font-bold text-slate-600 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 shrink-0">
            {filteredOfficers.length} Members
          </span>
        </div>
      </div>

      {/* Officers Grid */}
      {filteredOfficers.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center">
          <UserCheck className="w-10 h-10 text-slate-400 mb-3" />
          <h4 className="text-base font-bold text-slate-800">No Council Members Found</h4>
          <p className="text-xs text-slate-500 mt-1">Try another search term or reset category filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-container transition cursor-pointer"
          >
            Show All Members
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredOfficers.map((officer, index) => {
            const style = getRoleBadgeStyle(officer.role);
            const isChairman = officer.role === 'Chairman';
            const hasImage = Boolean(officer.image);

            // Clean initials
            const cleanName = officer.name.replace(/^(Dr\.|Prof\.|Shri|Ms\.|Mr\.)\s*/i, '').trim();
            const initials = cleanName
              .split(' ')
              .map((n) => n[0])
              .filter(Boolean)
              .slice(0, 2)
              .join('')
              .toUpperCase();

            return (
              <div
                key={`${officer.name}-${index}`}
                className={`bg-white rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between group hover:-translate-y-0.5 ${style.cardBorder}`}
              >
                <div>
                  {/* Top Bar: Role badge + Tenure */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs border ${style.badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      <span>{officer.role}</span>
                    </span>

                    <span className="text-[11px] font-mono font-medium text-slate-400">
                      2026–27
                    </span>
                  </div>

                  {/* Profile Section: Photo or Monogram */}
                  <div className="flex flex-col items-center text-center">
                    {hasImage ? (
                      <div className="w-24 h-24 rounded-2xl overflow-hidden relative ring-2 ring-slate-100 shadow-xs bg-slate-50 mb-3.5 group-hover:ring-primary/30 transition-all">
                        <Image
                          src={officer.image}
                          alt={officer.name}
                          fill
                          unoptimized
                          priority={isChairman}
                          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                          sizes="96px"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 ring-2 ring-slate-100 shadow-xs flex flex-col items-center justify-center text-slate-700 font-bold text-xl mb-3.5 group-hover:ring-primary/20 transition-all border border-slate-200/60">
                        <span>{initials}</span>
                      </div>
                    )}

                    {/* Member Name */}
                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                      {officer.name}
                    </h3>

                    {/* Designation / Title */}
                    {officer.title && (
                      <span className="text-xs font-semibold text-primary mt-1">
                        {officer.title}
                      </span>
                    )}

                    {/* Optional Email */}
                    {officer.email && (
                      <a
                        href={`mailto:${officer.email}`}
                        className="text-[11px] text-slate-500 hover:text-primary flex items-center gap-1 mt-1.5 transition-colors"
                        title={`Email ${officer.name}`}
                      >
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span className="truncate max-w-[200px]">{officer.email}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom Bar: Institution */}
                {officer.institution && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-600 font-medium text-center">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
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
