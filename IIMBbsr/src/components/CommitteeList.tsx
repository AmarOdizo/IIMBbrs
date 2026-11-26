'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Mail, Building, MapPin, UserCheck, Search, ShieldCheck, Star, Award } from 'lucide-react';
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
        badge: 'bg-amber-100 text-amber-900 border-amber-300',
        dot: 'bg-amber-500',
        bar: 'bg-gradient-to-r from-amber-500 to-amber-600',
      };
    }
    if (role.includes('Vice-Chairman')) {
      return {
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
        bar: 'bg-gradient-to-r from-amber-400 to-amber-500',
      };
    }
    if (role.includes('Secretary')) {
      return {
        badge: 'bg-blue-50 text-blue-800 border-blue-200',
        dot: 'bg-blue-600',
        bar: 'bg-gradient-to-r from-blue-500 to-blue-700',
      };
    }
    if (role.includes('Treasurer')) {
      return {
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-600',
        bar: 'bg-gradient-to-r from-emerald-500 to-emerald-700',
      };
    }
    return {
      badge: 'bg-slate-100 text-slate-800 border-slate-200',
      dot: 'bg-slate-400',
      bar: 'bg-gradient-to-r from-slate-400 to-slate-600',
    };
  };

  return (
    <div className="w-full flex flex-col gap-8 max-w-7xl mx-auto px-6 lg:px-12 py-10">
      {/* Category Navigation & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-low p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-nowrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
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
            {filteredOfficers.length} of {committeeMembers.length} Leaders
          </span>
        </div>
      </div>

      {/* Officers Grid */}
      {filteredOfficers.length === 0 ? (
        <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center">
          <UserCheck className="w-10 h-10 text-primary/40 mb-3" />
          <h4 className="text-base font-bold text-slate-800">No Council Members Match Your Query</h4>
          <p className="text-xs text-slate-500 mt-1">Try resetting the search keyword or selecting &quot;All Council&quot;.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-container transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOfficers.map((officer, index) => {
            const style = getRoleBadgeStyle(officer.role);
            // Extract clean initials
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
                className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/90 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Top color bar */}
                  <div className={`w-full h-1.5 ${style.bar}`}></div>

                  {/* Header: Role badge & Category */}
                  <div className="p-5 pb-3">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${style.badge}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                        <span>{officer.role}</span>
                      </span>

                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        2026–27
                      </span>
                    </div>

                    {/* Officer Monogram & Identity */}
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 to-primary text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs border border-slate-800/40">
                        {initials}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                          {officer.name}
                        </h3>
                        <span className="text-xs font-semibold text-slate-600 block mt-0.5">
                          {officer.title}
                        </span>
                      </div>
                    </div>

                    {/* Institution Box */}
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
                      <Building className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate">{officer.institution}</span>
                    </div>
                  </div>

                  {/* Bio & Tags */}
                  <div className="px-5 pb-5 flex flex-col gap-3">
                    {officer.bio && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed border-t border-slate-100 pt-3">
                        {officer.bio}
                      </p>
                    )}

                    {officer.tags && officer.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {officer.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                  {officer.email ? (
                    <a
                      href={`mailto:${officer.email}`}
                      className="font-semibold text-primary hover:underline flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span className="truncate">Contact Council Desk</span>
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Elected Council Member</span>
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 font-mono">Executive Roll</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
