'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { School, Users, Calendar, Award, Mail, MapPin, Search, X, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';

export interface StaticStudentChapter {
  id: string;
  chapterCode: string;
  institutionName: string;
  institution: string; // for backward compatibility with seed.ts
  estd: string;
  establishedYear: number;
  facultyAdvisor: string;
  advisor: string; // for backward compatibility with seed.ts
  location: string;
  members: string; // for backward compatibility with seed.ts
  activeMembersCount: string;
  highlights: string[];
  thrustAreas: string[];
  recentAchievement?: string;
  bannerImage: string;
  email: string;
  badge: 'Apex Chapter' | 'Premier Chapter' | 'Active Chapter' | 'Growing Chapter';
}

export const STATIC_STUDENT_CHAPTERS: StaticStudentChapter[] = [
  {
    id: 'sc-1',
    chapterCode: 'IIM-SC-01',
    institutionName: 'IIT Bhubaneswar Student Chapter',
    institution: 'IIT Bhubaneswar Student Chapter',
    estd: '2013',
    establishedYear: 2013,
    facultyAdvisor: 'Dr. K. G. Suresh Kumar / Prof. S. N. Pattnaik',
    advisor: 'Prof. S. N. Pattnaik',
    location: 'School of Materials Engineering, IIT Bhubaneswar, Argul, Jatni - 752050',
    members: '140+ Students',
    activeMembersCount: '140+ Scholars',
    badge: 'Premier Chapter',
    thrustAreas: [
      'Advanced High-Strength Steels',
      'Phase Transformations',
      'Electron Microscopy (TEM/SEM)',
      'Green Hydrogen Metallurgy',
    ],
    highlights: [
      'Annual Materials Conclave (MatX)',
      'Industrial Immersion with Jindal Stainless & NALCO',
      'Technical Quizzes & National Seminars',
    ],
    recentAchievement:
      'Winners of Eastern Regional Materials Conclave (MatX) 2025; 14 peer-reviewed publications authored by student cadre.',
    email: 'iim.sc@iitbbs.ac.in',
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDAyZ6b1SVPtJP7nMHrvAIAPgm3Ebgg2c9p6KCUUgDGjG4sAReR0RkbVfIWXR2FyCVWl3OOdaS3nmHsX7FcIVR-7yXI6qbIASRL0ex4gIlGz2L0hYwy8WurpOUKc6Y8GkWGUXoW-v-LUzdgQWHdvuQ8cHolQ1UdNOU5ZF_o_I8teraw1Tcs2CFDcMOEhMvCvY-s2tnN8Dfx0QlYdNXwGYdll4LAiDNQDwW2MUVHGmCTZnoNEbAengeh',
  },
  {
    id: 'sc-2',
    chapterCode: 'IIM-SC-02',
    institutionName: 'NIT Rourkela Student Chapter',
    institution: 'NIT Rourkela Student Chapter',
    estd: '2008',
    establishedYear: 2008,
    facultyAdvisor: 'Dr. Debasis Chaira',
    advisor: 'Dr. Debasis Chaira',
    location: 'Dept. of Metallurgical & Materials Engineering, NIT Rourkela - 769008',
    members: '210+ Students',
    activeMembersCount: '210+ Scholars',
    badge: 'Apex Chapter',
    thrustAreas: [
      'Powder Metallurgy',
      'Spark Plasma Sintering',
      'Extractive Metallurgy',
      'Corrosion Deterrence',
    ],
    highlights: [
      'National Metallurgy Olympiad Champions',
      'Hands-on Sintering Masterclass',
      'Alumni Core Sector Mentorship Series',
    ],
    recentAchievement:
      'Champions of National Metallurgy Olympiad 2025; annual foundry & sintering hands-on camp executed.',
    email: 'iim.nitrkl@nitrkl.ac.in',
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJA2iacY8ceATiuSx8mRaUmhW6pB8v2ttcnx3o5TPGGgBuMC2j02S4xWHpl7mlbWlRyfhJOl_uI8JpcdAb8gj5fW9fx2lT6t5yDyKmGJTi-6whpA6LE_yvklztDgTgnXhuAQ3MxTxPu3SfQkot2l-xro9qgKuC8Yxu3_-gyMKcZLNbORlcv7KrLHQrMRbL88CoWt5ujuSy-34Mp746JGxSczIU7hHrS5V1Dw8UElp6HfVMb4M5crj',
  },
  {
    id: 'sc-3',
    chapterCode: 'IIM-SC-03',
    institutionName: 'IISER Berhampur Student Affiliate',
    institution: 'IISER Berhampur Student Affiliate',
    estd: '2021',
    establishedYear: 2021,
    facultyAdvisor: 'Dr. Smruti Rekha Rout',
    advisor: 'Dr. Smruti Rekha Rout',
    location: 'Dept. of Physical & Chemical Sciences, IISER Berhampur - 760010',
    members: '65+ Students',
    activeMembersCount: '65+ Scholars',
    badge: 'Active Chapter',
    thrustAreas: [
      'Solid-State Chemistry',
      'Condensed Matter Physics',
      'Single-Crystal XRD',
      'Magnetic Materials',
    ],
    highlights: [
      'National Metallurgists Day Delegations',
      'Fundamental Physics & Crystallography Series',
      'Interdisciplinary Laboratory Treks',
    ],
    recentAchievement:
      'Represented Eastern India at the National Metallurgists’ Day (NMD-ATM) symposium with 3 oral presentations.',
    email: 'srrout@iiserbpr.ac.in',
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-kykxnI1VXLbgs2DRsX2Zsi8eLDyS6qLaHvY8FZpPDa9S2oliqL_oYipt5YOnGfKwvEjT4INx2aKxsG-MjgLCQah1cGlbB3KjRwUSm025RJ7DZvAB-1KFvziwRIMHKvJdd84H9b-ulzOzD3GoK3NJz2xFpw_pzyz6zCth6JDkADDGZBDgD--aFOmX7fakETECqcEfSjrXCKiJFM-PT3cvwemdMWZT00daxh36iKipZczROp9nSdKk',
  },
  {
    id: 'sc-4',
    chapterCode: 'IIM-SC-04',
    institutionName: 'KIIT Deemed to be University Student Chapter',
    institution: 'KIIT Deemed to be University Student Chapter',
    estd: '2018',
    establishedYear: 2018,
    facultyAdvisor: 'Prof. Chinmay K. Pradhan',
    advisor: 'Prof. Chinmay K. Pradhan',
    location: 'School of Mechanical & Materials Engineering, KIIT-DU, Patia, Bhubaneswar',
    members: '112+ Students',
    activeMembersCount: '112+ Scholars',
    badge: 'Active Chapter',
    thrustAreas: [
      'Sustainable Waste Repurposing',
      'Geopolymer Cement',
      'Blast Furnace Slag Beneficiation',
      'Materials Tribology',
    ],
    highlights: [
      'Prof. Brahm Prakash Memorial Materials Quiz (BPMQ) Host',
      'Sustainable Manufacturing Hackathon',
      'Student Research Poster Colloquiums',
    ],
    recentAchievement:
      'Organized regional qualifiers for the Prof. Brahm Prakash Memorial Materials Quiz (BPMMQ) for 120+ teams.',
    email: 'cpradhan@kiit.ac.in',
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDU5oX62ix7nJL4aoKm1nhvdAIdWQv6xnDXoSw3s1A1pKIuMwoxrOD_dEoZ38rCkqJ0tJ1qS8ntSrpEULfqT5p9hoj1C4_NzJHM4U7WDnn1pgyFfyuGpNUdP53Hc7unXrAm47qYQudd0V3qfxhV5g4Gxinbwq_FEoiCwz-LwLtHcR2rGGOWI082TF2HMGpn7b9j8dXNLAEEbnkVI37H4WaMdfHcylxDaLwFvvzCCjsyZ9Q4kNEZ3aEr',
  },
  {
    id: 'sc-5',
    chapterCode: 'IIM-SC-05',
    institutionName: 'VSSUT Burla Student Chapter',
    institution: 'VSSUT Burla Student Chapter',
    estd: '2016',
    establishedYear: 2016,
    facultyAdvisor: 'Dr. B. K. Mishra',
    advisor: 'Dr. B. K. Mishra',
    location: 'Dept. of Metallurgy & Materials Engineering, VSSUT Burla, Sambalpur - 768018',
    members: '95+ Students',
    activeMembersCount: '95+ Scholars',
    badge: 'Active Chapter',
    thrustAreas: [
      'Foundry & Metal Casting',
      'Non-Destructive Testing (NDT)',
      'Alloy Characterisation',
      'Industrial Failure Analysis',
    ],
    highlights: [
      'Foundry Technology Demonstrations',
      'National Science Day Colloquium Prizes',
      'Field Excursions to Rourkela Steel Plant',
    ],
    recentAchievement:
      'First prize at National Science Day State Colloquium for Low-Cost Slag Briquetting prototype.',
    email: 'iim.vssut@vssut.ac.in',
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5B20NBXTZ_xnvycjhtokgyQzdFrUk5LdaaA5bHmt-gqxD-03My7dNA1vWRRHnmalAy9P8ciBlbmxlA3Jh_t4ZLPlmP0V1RPiYQP1OpNwXk98f8elEBXRUcb2-yuXiKAs-T0oNl_SrfOlYIaOabFflmA7VL05veLI3lgCoMhZ9NkF0YhM7woqt6ZYf_MZkrKeH5RA-PAHw62qEwHPeH_i0EXZBEt4GjsqaA1m7MD2t63Ztbmoq2I3C',
  },
  {
    id: 'sc-6',
    chapterCode: 'IIM-SC-06',
    institutionName: 'OUTR Bhubaneswar Student Chapter',
    institution: 'OUTR Bhubaneswar Student Chapter',
    estd: '2019',
    establishedYear: 2019,
    facultyAdvisor: 'Dr. R. K. Mohapatra',
    advisor: 'Dr. R. K. Mohapatra',
    location: 'Odisha University of Technology & Research (Formerly CET), Ghatikia, Bhubaneswar',
    members: '80+ Students',
    activeMembersCount: '80+ Scholars',
    badge: 'Growing Chapter',
    thrustAreas: [
      'Additive Manufacturing',
      'Laser Processing of Alloys',
      'Functional Biomaterials',
      'Computational Metallurgy',
    ],
    highlights: [
      'Additive Manufacturing Hands-on Camps',
      'Paper Presentation Contests',
      'CAD/CAM Simulation Masterclasses',
    ],
    recentAchievement:
      'Conducted 3 state-level workshops on 3D metal printing for eastern regional engineering colleges.',
    email: 'iim.outr@outr.ac.in',
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBeTyMWHozqO1tDTDj1jNRJeLrd5WDhqkSw5VOkNNltDNINe0m4_Hhuj82pbRUTizptwbj_bpZXmayya3eRzkcqGik5XIIigkrsME8Z8D9kJLLaauLboZBEuyk43NBUViPoJGUrlAic2u7WZPKSb4VtgOIj96ZST51vDYy5ylGvqwdMtRiGER6gSrqw5IB9dFssHnT-_5oEK8SzRsqj_N5InCW9Xy6gv3OvPVopMxjTaeGm4bC-0vE_',
  },
];

export default function StudentChaptersList() {
  const [filterBadge, setFilterBadge] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredChapters = STATIC_STUDENT_CHAPTERS.filter((ch) => {
    if (filterBadge !== 'All' && ch.badge !== filterBadge) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        ch.institutionName.toLowerCase().includes(q) ||
        ch.facultyAdvisor.toLowerCase().includes(q) ||
        ch.location.toLowerCase().includes(q) ||
        ch.chapterCode.toLowerCase().includes(q) ||
        ch.thrustAreas.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <section className="w-full py-12 px-6 lg:px-12 bg-surface">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="font-label-md text-xs uppercase tracking-widest text-primary font-bold">
              Affiliated Campus Units
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">
              Active Collegiate Student Chapters
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Officially chartered collegiate cells under IIM Bhubaneswar Chapter governance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Premier Chapter', 'Active Chapter', 'Growing Chapter'].map((b) => (
              <button
                key={b}
                onClick={() => setFilterBadge(b)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  filterBadge === b
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chapters by university, advisor, location, or research..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-xs"
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

        {/* Static Chapters Grid */}
        {filteredChapters.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-surface-container-low rounded-2xl p-8 border border-dashed border-slate-200">
            <School className="w-10 h-10 text-primary/40 mx-auto mb-2" />
            <p className="font-semibold text-slate-800">No Student Chapters Found</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChapters.map((ch) => (
              <div
                key={ch.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between group"
              >
                <div>
                  {/* Banner Image */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={ch.bannerImage}
                      alt={ch.institutionName}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />
                    
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 font-mono text-xs font-bold shadow-xs">
                        {ch.chapterCode}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/80 backdrop-blur-md text-white text-[10px] font-semibold">
                        {ch.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-xs text-amber-300 block font-semibold">
                        Chartered {ch.estd}
                      </span>
                      <h3 className="text-lg font-bold leading-snug drop-shadow-sm">
                        {ch.institutionName}
                      </h3>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                      <div>
                        <span className="text-slate-400 block mb-0.5 font-medium">Faculty Advisor</span>
                        <span className="font-semibold text-slate-800 line-clamp-1">{ch.facultyAdvisor}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5 font-medium">Student Cadre</span>
                        <span className="font-bold text-primary flex items-center gap-1 font-mono">
                          <Users className="w-3.5 h-3.5" /> {ch.activeMembersCount}
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{ch.location}</span>
                    </div>

                    {/* Core Research Thrusts */}
                    {ch.thrustAreas && ch.thrustAreas.length > 0 && (
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                          Core Research Thrusts
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {ch.thrustAreas.map((area, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-surface-container text-slate-700 text-[11px] font-medium"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Highlights */}
                    {ch.highlights && ch.highlights.length > 0 && (
                      <div className="flex flex-col gap-1 border-t border-slate-100 pt-3">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                          Key Initiatives
                        </span>
                        <ul className="flex flex-col gap-1 text-xs text-slate-600">
                          {ch.highlights.slice(0, 2).map((h, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Recent Achievement */}
                    {ch.recentAchievement && (
                      <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/50 text-xs text-amber-900 flex items-start gap-2">
                        <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed line-clamp-2">{ch.recentAchievement}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                {ch.email && (
                  <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                    <a
                      href={`mailto:${ch.email}`}
                      className="text-primary font-semibold hover:underline flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{ch.email}</span>
                    </a>
                    <span className="text-slate-400 font-mono text-[10px]">Affiliated Unit</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
