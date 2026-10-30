'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Award,
  BookOpen,
  Users,
  Gavel,
  School,
  Download,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles,
} from 'lucide-react';

export interface ProgrammeItem {
  _id: string;
  title: string;
  category: string;
  annualSchedule: string;
  description: string;
  highlights: string[];
  bannerImage?: string;
  brochurePdfUrl?: string;
  orderIndex?: number;
  isActive?: boolean;
}

export default function ProgrammesList() {
  const [programmes, setProgrammes] = useState<ProgrammeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    async function fetchProgrammes() {
      try {
        const res = await fetch('/api/programmes');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setProgrammes(json.data);
        }
      } catch (err) {
        console.error('Failed to load programmes:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProgrammes();
  }, []);

  const categories = [
    { id: 'ALL', label: 'All Programmes' },
    { id: 'Annual Tradition', label: 'Foundation Day' },
    { id: 'Honors & Recognition', label: 'Honors & NMD' },
    { id: 'Constitutional Governance', label: 'Governance & AGM' },
    { id: 'Endowed Memorial Oration', label: 'Memorial Orations' },
    { id: 'Youth & Academic Outreach', label: 'Collegiate Conclave' },
  ];

  const filteredProgrammes = programmes.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Top Progress Accent */}
      <div className="w-full h-1 bg-gradient-to-r from-primary via-primary-container to-tertiary"></div>

      {/* Hero Eyebrow & Title */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-10 pb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-semibold uppercase tracking-wider">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-primary">Programmes</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-xs uppercase tracking-widest font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Annual Institutional Benchmarks &amp; Professional Calendar
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-4">
              Flagship Chapter Programmes
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
              The IIM Bhubaneswar Chapter organizes seminal annual traditions advancing metallurgical research,
              recognizing professional excellence, nurturing student talent, and fostering industry-academic
              stewardship across Eastern India.
            </p>
          </div>

          {/* Quick Counter Mosaic */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 shrink-0">
            <div className="flex flex-col border-r border-slate-100 pr-4 last:border-0">
              <span className="text-2xl font-bold text-primary font-serif">05</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Apex Meets</span>
            </div>
            <div className="flex flex-col border-r border-slate-100 pr-4 last:border-0">
              <span className="text-2xl font-bold text-slate-900 font-serif">1978</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Charter Year</span>
            </div>
            <div className="flex flex-col border-r border-slate-100 pr-4 last:border-0">
              <span className="text-2xl font-bold text-amber-600 font-serif">₹1.5L</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Prize Pool</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-emerald-600 font-serif">30+</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Jena Orations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 sm:top-24 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between overflow-x-auto gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedCategory === c.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <a
            href="#nomination-workflow"
            className="hidden md:inline-flex items-center gap-1 text-primary text-xs font-semibold hover:underline"
          >
            <span>Nomination Protocol</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Programmes List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 flex flex-col gap-12 sm:gap-16">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm font-medium">Fetching live programmes from database...</p>
          </div>
        ) : filteredProgrammes.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-white rounded-2xl border p-8">
            <Sparkles className="w-8 h-8 mx-auto text-amber-500 mb-2" />
            <p className="font-semibold text-sm">No programmes found in this category.</p>
          </div>
        ) : (
          filteredProgrammes.map((p, index) => {
            const isEven = index % 2 === 0;
            return (
              <article
                key={p._id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition"
              >
                {/* Content */}
                <div className={`lg:col-span-7 flex flex-col items-start ${isEven ? 'order-2 lg:order-1' : 'order-2'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{p.annualSchedule}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600">{p.category}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-3 tracking-tight">
                    {p.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed font-light">
                    {p.description}
                  </p>

                  {/* Highlights Grid */}
                  {p.highlights && p.highlights.length > 0 && (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                      {p.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/events"
                      className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-semibold shadow-sm transition flex items-center gap-2"
                    >
                      <span>View Proceedings &amp; Dates</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {p.brochurePdfUrl ? (
                      <a
                        href={p.brochurePdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Guidelines</span>
                      </a>
                    ) : (
                      <a
                        href="#nomination-workflow"
                        className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition flex items-center gap-2"
                      >
                        <span>Nomination Guidelines</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Banner Image */}
                <div className={`lg:col-span-5 ${isEven ? 'order-1 lg:order-2' : 'order-1'}`}>
                  <div className="relative rounded-2xl overflow-hidden bg-slate-100 shadow-md h-72 sm:h-80 lg:h-96 w-full">
                    {p.bannerImage ? (
                      <img
                        src={p.bannerImage}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 font-serif font-bold text-lg">
                        IIM Bhubaneswar
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                        {p.annualSchedule}
                      </span>
                      <span className="text-sm font-semibold text-white/90 truncate">{p.title}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Nomination Workflow */}
      <section id="nomination-workflow" className="w-full bg-white border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-12 my-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-wider text-primary font-bold">Standardized Protocol</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
                Honors Nomination &amp; Adjudication Process
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-2 md:mt-0 font-light">
              The Council maintains rigorous, peer-reviewed standards for every citation and medallion conferred
              under Chapter auspices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Dossier Submission',
                desc: 'Proposer submits formal resume, bibliometrics, patent filings, or plant impact records before annual cutoff.',
                window: 'Window: 60 Days Prior',
              },
              {
                step: '02',
                title: 'Council Scrutiny',
                desc: 'Standing Chapter Honors Committee verifies statutory eligibility and conflict-of-interest disclosures.',
                window: 'Duration: 14 Working Days',
              },
              {
                step: '03',
                title: 'External Peer Audit',
                desc: 'Blind evaluation by independent national subject matter experts nominated from IIM Headquarters.',
                window: 'Double-Blind Peer Review',
              },
              {
                step: '04',
                title: 'Gala Conferment',
                desc: 'Medallion and formal parchment presented in plenary assembly before captains of Indian heavy industry.',
                window: 'Presided by National Dignitaries',
              },
            ].map((st) => (
              <div key={st.step} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm mb-4 shadow-sm">
                  {st.step}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-2">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">{st.desc}</p>
                <div className="pt-3 border-t border-slate-200 text-[10px] font-semibold text-primary uppercase tracking-wider">
                  {st.window}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship & Partners Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">
              Institutional Alliances &amp; Endowments
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
              Partner with IIM Bhubaneswar’s Flagship Calendar
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-4">
              Leading industrial groups—including Tata Steel, NALCO, and Jindal Stainless—partner with the Chapter
              to sponsor student awards, lecture series, and technological conclaves.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-semibold transition"
              >
                Inquire for Institutional Alliance
              </Link>
            </div>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-2 shrink-0 text-xs text-slate-300">
            <span className="font-semibold text-white">Secretariat Contact:</span>
            <span>Dr. Tarun K. Biswal, Hony. Jt. Secretary</span>
            <span>CSIR – IMMT, Acharya Vihar, Bhubaneswar - 751013</span>
            <span className="text-amber-400 font-mono">secretary@iimbhubaneswar.in</span>
          </div>
        </div>
      </section>
    </div>
  );
}
