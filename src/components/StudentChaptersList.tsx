'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { School, Users, Calendar, Award, Mail, ExternalLink, Loader2, BookOpen } from 'lucide-react';

export interface StudentChapterData {
  _id: string;
  name: string;
  institutionName: string;
  chapterCode: string;
  establishedYear: number;
  facultyAdvisor: string;
  studentChair?: string;
  activeMembersCount: number;
  thrustAreas?: string[];
  recentAchievement?: string;
  bannerImage?: string;
  email?: string;
}

export default function StudentChaptersList() {
  const [chapters, setChapters] = useState<StudentChapterData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChapters() {
      setLoading(true);
      try {
        const res = await fetch('/api/student-chapters');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setChapters(json.data);
        }
      } catch (err) {
        console.error('Failed to load student chapters:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchChapters();
  }, []);

  return (
    <section className="w-full py-12 px-6 lg:px-12 bg-surface">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="font-label-md text-xs uppercase tracking-widest text-primary font-bold">
              Affiliated Campus Units
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">
              Active Collegiate Student Chapters
            </h2>
          </div>
          <span className="font-mono text-xs text-secondary bg-surface-container px-3 py-1.5 rounded-lg">
            {chapters.length} Collegiate Units Operational
          </span>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm">Fetching student chapters from MongoDB...</p>
          </div>
        ) : chapters.length === 0 ? (
          <div className="py-12 text-center text-slate-500">No student chapters found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {chapters.map((ch) => (
              <div
                key={ch._id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between group"
              >
                <div>
                  {ch.bannerImage && (
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={ch.bannerImage}
                        alt={ch.institutionName}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 font-mono text-xs font-bold">
                          {ch.chapterCode}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-xs text-slate-300 block font-semibold">
                          Est. {ch.establishedYear}
                        </span>
                        <h3 className="text-xl font-bold leading-snug drop-shadow-sm">
                          {ch.institutionName}
                        </h3>
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col gap-4">
                    {!ch.bannerImage && (
                      <div className="flex items-center justify-between border-b pb-3">
                        <h3 className="text-xl font-bold text-slate-900">{ch.institutionName}</h3>
                        <span className="px-2.5 py-1 rounded bg-primary/10 text-primary font-mono text-xs font-bold">
                          {ch.chapterCode}
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div>
                        <span className="text-slate-400 block mb-0.5 font-medium">Faculty Advisor</span>
                        <span className="font-semibold text-slate-800">{ch.facultyAdvisor}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5 font-medium">Student Cadre</span>
                        <span className="font-bold text-primary flex items-center gap-1 font-mono">
                          <Users className="w-3.5 h-3.5" /> {ch.activeMembersCount} Active
                        </span>
                      </div>
                    </div>

                    {ch.thrustAreas && ch.thrustAreas.length > 0 && (
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                          Core Research Thrusts
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {ch.thrustAreas.map((area, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-surface-container text-slate-700 text-xs font-medium"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {ch.recentAchievement && (
                      <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/50 text-xs text-amber-900 flex items-start gap-2">
                        <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ch.recentAchievement}</span>
                      </div>
                    )}
                  </div>
                </div>

                {ch.email && (
                  <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <a
                      href={`mailto:${ch.email}`}
                      className="text-primary font-semibold hover:underline flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{ch.email}</span>
                    </a>
                    <span className="text-slate-400 font-mono text-[11px]">Chapter Nodal Unit</span>
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

