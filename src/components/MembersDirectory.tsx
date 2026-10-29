'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Building,
  Mail,
  Award,
  MapPin,
  Tag,
  Loader2,
  X,
  UserCheck,
} from 'lucide-react';

export interface MemberData {
  _id: string;
  memberCode: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  organization: string;
  designation?: string;
  city?: string;
  specialization?: string[];
  isActive?: boolean;
}

const CADRES = [
  'All Cadres',
  'Life Fellow',
  'Life Member',
  'Member',
  'Student Member',
  'Associate Member',
];

export default function MembersDirectory() {
  const [members, setMembers] = useState<MemberData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCadre, setSelectedCadre] = useState('All Cadres');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true);
      try {
        let url = '/api/members';
        const params = new URLSearchParams();
        if (selectedCadre !== 'All Cadres') {
          params.append('category', selectedCadre);
        }
        if (searchQuery.trim()) {
          params.append('search', searchQuery.trim());
        }
        const qs = params.toString();
        if (qs) url += `?${qs}`;

        const res = await fetch(url);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setMembers(json.data);
        }
      } catch (err) {
        console.error('Failed to load members:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, [selectedCadre, searchQuery]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Search and Filters */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by member name, membership ID (e.g. LM-), or organization..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition"
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

        {/* Cadre Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-nowrap">
          {CADRES.map((cadre) => (
            <button
              key={cadre}
              onClick={() => setSelectedCadre(cadre)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCadre === cadre
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cadre}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Status Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          <h3 className="text-lg font-bold text-slate-900">Official Chapter Roll</h3>
        </div>
        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
          {members.length} {members.length === 1 ? 'Member' : 'Members'} Verified
        </span>
      </div>

      {/* Member Cards Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm">Fetching verified members roll from MongoDB...</p>
        </div>
      ) : members.length === 0 ? (
        <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center">
          <UserCheck className="w-10 h-10 text-primary/40 mb-3" />
          <h4 className="text-base font-bold text-slate-800">No Members Found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            {searchQuery
              ? `No members found matching "${searchQuery}". Try different keywords.`
              : 'No members listed under this cadre filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((m) => {
            const initials = m.name
              .split(' ')
              .map((n) => n[0])
              .filter(Boolean)
              .slice(0, 2)
              .join('');

            return (
              <div
                key={m._id}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-slate-200/80 flex flex-col justify-between gap-4 group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center text-sm shadow-inner shrink-0">
                        {initials}
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors text-base line-clamp-1">
                          {m.name}
                        </h4>
                        <span className="text-xs text-slate-500 line-clamp-1">
                          {m.designation || 'Member'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-label-sm text-[11px] font-semibold border border-amber-200/50">
                      {m.category}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {m.memberCode}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="line-clamp-1">{m.organization}</span>
                    </div>
                    {m.city && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{m.city}</span>
                      </div>
                    )}
                  </div>

                  {m.specialization && m.specialization.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {m.specialization.slice(0, 3).map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {m.email && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={`mailto:${m.email}`}
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Contact Desk</span>
                    </a>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                      Verified Roll
                    </span>
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

