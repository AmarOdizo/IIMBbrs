'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <div className="w-full bg-surface min-h-screen">
      {/* Top Progress Accent */}
      <div className="w-full h-1 bg-gradient-to-r from-primary via-primary-container to-tertiary"></div>

      {/* Hero Eyebrow & Title */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-8 pb-6">
        <nav className="flex items-center gap-2 font-label-md text-label-md text-secondary mb-4">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Home</span>
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="text-primary font-semibold">Programmes</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-surface-variant/40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-primary font-label-sm text-label-sm uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Annual Institutional Benchmarks &amp; Professional Calendar
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-4">
              Flagship Chapter Programmes
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              The IIM Bhubaneswar Chapter organizes seminal annual traditions advancing metallurgical research,
              recognizing professional excellence, nurturing student talent, and fostering industry-academic
              stewardship across Eastern India.
            </p>
          </div>

          {/* Quick Counter Mosaic */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container-low p-4 rounded-xl shadow-sm shrink-0">
            <div className="flex flex-col border-r border-surface-variant/50 pr-4 last:border-0">
              <span className="font-headline-sm text-headline-sm text-primary font-bold">05</span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Apex Meets</span>
            </div>
            <div className="flex flex-col border-r border-surface-variant/50 pr-4 last:border-0">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">1978</span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Charter Year</span>
            </div>
            <div className="flex flex-col border-r border-surface-variant/50 pr-4 last:border-0">
              <span className="font-headline-sm text-headline-sm text-primary font-bold">₹1.5L</span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Prize Pool</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-tertiary font-semibold">30+</span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Jena Orations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <nav className="sticky top-20 sm:top-24 z-30 bg-surface/95 backdrop-blur-md border-b border-surface-variant/30 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between overflow-x-auto gap-2 no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-lg font-label-md text-label-md transition-all ${
                  selectedCategory === c.id
                    ? 'bg-on-background text-surface shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <a
            href="#nomination-workflow"
            className="hidden md:inline-flex items-center gap-1.5 text-primary hover:text-primary-container font-label-md text-label-md whitespace-nowrap pl-4"
          >
            <span>Nomination Protocol</span>
            <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
          </a>
        </div>
      </nav>

      {/* Programmes List */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-12 flex flex-col gap-16 lg:gap-24">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-on-surface-variant gap-3">
            <span className="material-symbols-outlined text-4xl animate-spin text-primary">progress_activity</span>
            <p className="font-label-md text-label-md">Loading live programmes from database...</p>
          </div>
        ) : filteredProgrammes.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant bg-surface-container-low rounded-2xl p-8">
            <span className="material-symbols-outlined text-4xl text-tertiary mb-2">info</span>
            <p className="font-title-md text-title-md">No programmes found in this category.</p>
          </div>
        ) : (
          filteredProgrammes.map((p, index) => {
            const isEven = index % 2 === 0;
            return (
              <article
                key={p._id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Content */}
                <div className={`lg:col-span-7 flex flex-col items-start ${isEven ? 'order-2 lg:order-1' : 'order-2'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-wider mb-4">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <span>{p.annualSchedule}</span>
                    <span className="text-secondary/50">•</span>
                    <span>{p.category}</span>
                  </div>

                  <h2 className="font-headline-md text-headline-md text-on-surface mb-3 tracking-tight">
                    {p.title}
                  </h2>

                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Highlights Grid */}
                  {p.highlights && p.highlights.length > 0 && (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {p.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm"
                        >
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                            check_circle
                          </span>
                          <span className="font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/events"
                      className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-sm transition flex items-center gap-2"
                    >
                      <span>View Proceedings &amp; Dates</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>

                    {p.brochurePdfUrl ? (
                      <a
                        href={p.brochurePdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        <span>Download Guidelines</span>
                      </a>
                    ) : (
                      <a
                        href="#nomination-workflow"
                        className="px-5 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition flex items-center gap-2"
                      >
                        <span>Nomination Guidelines</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Banner Image */}
                <div className={`lg:col-span-5 ${isEven ? 'order-1 lg:order-2' : 'order-1'}`}>
                  <div className="relative rounded-2xl overflow-hidden bg-surface-container shadow-md h-72 sm:h-80 lg:h-96 w-full">
                    {p.bannerImage ? (
                      <img
                        src={p.bannerImage}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-on-surface-variant font-serif font-bold text-lg">
                        IIM Bhubaneswar
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/20 to-transparent flex flex-col justify-end p-6">
                      <div className="text-surface font-label-sm text-label-sm uppercase tracking-widest text-tertiary-fixed">
                        {p.annualSchedule}
                      </div>
                      <div className="text-surface font-title-md text-title-md font-semibold truncate">
                        {p.title}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Nomination Workflow */}
      <section id="nomination-workflow" className="w-full bg-surface-container py-16 px-6 lg:px-12 my-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                Standardized Protocol
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-1">
                Honors Nomination &amp; Adjudication Process
              </h2>
            </div>
            <p className="font-body-md text-body-md text-secondary max-w-md mt-2 md:mt-0">
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
              <div
                key={st.step}
                className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center font-bold text-sm mb-4">
                    {st.step}
                  </div>
                  <h3 className="font-title-md text-title-md text-on-surface mb-2 font-semibold">{st.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">
                    {st.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-surface-variant/30 font-label-sm text-label-sm text-primary font-semibold">
                  {st.window}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship & Partners Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-16">
        <div className="bg-inverse-surface text-inverse-on-surface rounded-2xl p-8 lg:p-12 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary-fixed block mb-2 font-semibold">
              Institutional Alliances &amp; Endowments
            </span>
            <h2 className="font-headline-md text-headline-md text-surface-bright mb-3">
              Partner with IIM Bhubaneswar’s Flagship Calendar
            </h2>
            <p className="font-body-md text-body-md text-surface-variant/90 leading-relaxed mb-6">
              Leading industrial groups—including Tata Steel, NALCO, and Jindal Stainless—partner with the Chapter
              to sponsor student awards, lecture series, and technological conclaves.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-all shadow-sm"
              >
                Inquire for Institutional Alliance
              </Link>
            </div>
          </div>

          <div className="p-6 bg-surface-bright/5 border border-surface-bright/10 rounded-xl flex flex-col gap-2 shrink-0 font-body-sm text-body-sm text-surface-variant/80">
            <span className="font-semibold text-surface-bright">Secretariat Contact:</span>
            <span>Dr. Tarun K. Biswal, Hony. Jt. Secretary</span>
            <span>CSIR – IMMT, Acharya Vihar, Bhubaneswar - 751013</span>
            <span className="text-tertiary-fixed font-mono">secretary@iimbhubaneswar.in</span>
          </div>
        </div>
      </section>
    </div>
  );
}
