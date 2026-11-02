'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mail, Building, Tag, MapPin, Award, Loader2, UserCheck } from 'lucide-react';

export interface CommitteeOfficer {
  _id: string;
  name: string;
  role: string;
  category: 'Apex' | 'Office Bearer' | 'Executive Member' | 'Advisory' | string;
  title: string;
  institution: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  tags?: string[];
  image?: string;
  orderIndex?: number;
  isActive?: boolean;
}

const CATEGORIES = [
  { label: 'All Council', value: 'All' },
  { label: 'Apex Council', value: 'Apex' },
  { label: 'Office Bearers', value: 'Office Bearer' },
  { label: 'Executive Committee', value: 'Executive Member' },
  { label: 'Advisory Panel', value: 'Advisory' },
];

export default function CommitteeList() {
  const [officers, setOfficers] = useState<CommitteeOfficer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function fetchCommittee() {
      setLoading(true);
      try {
        const url = selectedCategory === 'All' 
          ? '/api/committee' 
          : `/api/committee?category=${encodeURIComponent(selectedCategory)}`;

        const res = await fetch(url);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setOfficers(json.data);
        }
      } catch (err) {
        console.error('Failed to load committee officers:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCommittee();
  }, [selectedCategory]);

  return (
    <div className="w-full flex flex-col gap-8 max-w-7xl mx-auto px-6 lg:px-12 py-10">
      {/* Category Navigation Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low p-4 rounded-2xl border border-slate-200/60 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-nowrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                selectedCategory === cat.value
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-secondary px-3 py-1.5 rounded-lg bg-surface-container shrink-0">
          {officers.length} Council Leaders Synchronized
        </span>
      </div>

      {/* Officers Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm">Fetching chapter executive council from MongoDB...</p>
        </div>
      ) : officers.length === 0 ? (
        <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center">
          <UserCheck className="w-10 h-10 text-primary/40 mb-3" />
          <h4 className="text-base font-bold text-slate-800">No Officers Listed</h4>
          <p className="text-xs text-slate-500 mt-1">No council members listed under this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {officers.map((officer) => (
            <div
              key={officer._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between group"
            >
              <div>
                {/* Officer photo or avatar */}
                <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                  {officer.image ? (
                    <Image
                      src={officer.image}
                      alt={officer.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-800 to-primary text-white font-bold text-3xl">
                      {officer.name
                        .split(' ')
                        .map((n) => n[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join('')}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 font-label-sm text-[10px] font-bold uppercase tracking-wider">
                      {officer.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-widest block">
                      {officer.role}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-snug drop-shadow-sm">
                      {officer.name}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex flex-col gap-1 text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">{officer.title}</span>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Building className="w-3.5 h-3.5 shrink-0 text-primary" />
                      <span className="line-clamp-1">{officer.institution}</span>
                    </div>
                    {officer.location && (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{officer.location}</span>
                      </div>
                    )}
                  </div>

                  {officer.bio && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed border-t border-slate-100 pt-2">
                      {officer.bio}
                    </p>
                  )}

                  {officer.tags && officer.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
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

              {/* Action footer */}
              {officer.email && (
                <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={`mailto:${officer.email}`}
                    className="font-semibold text-primary hover:underline flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Official Dispatch Email</span>
                  </a>
                  <span className="text-[10px] text-slate-400 font-mono">Executive Roll</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

