'use client';

import React, { useState } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema } from '@/lib/seo';
import {
  Layers,
  Wrench,
  Cpu,
  FlaskConical,
  ShieldCheck,
  Recycle,
  Building2,
  GraduationCap,
  Landmark,
  Factory,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';

const FOCUS_AREAS = [
  {
    icon: Layers,
    title: 'Iron & Steel Metallurgy',
    desc: 'Blast furnace optimization, Direct Reduced Iron (DRI), and low-carbon hydrogen steelmaking.',
  },
  {
    icon: Building2,
    title: 'Aluminium & Bauxite',
    desc: 'Bayer process refining, energy-efficient electrolysis smelting, and high-purity aluminium alloys.',
  },
  {
    icon: Cpu,
    title: 'Strategic & Beach Minerals',
    desc: 'Beneficiation of titanium sands, ilmenite, rare-earth elements, and coastal placer minerals.',
  },
  {
    icon: FlaskConical,
    title: 'Hydrometallurgy & Bio-leaching',
    desc: 'Eco-friendly metal extraction, bacterial oxidation, and solvent extraction recovery systems.',
  },
  {
    icon: ShieldCheck,
    title: 'Corrosion & Materials Science',
    desc: 'Industrial marine corrosion deterrence, protective coatings, and high-temperature alloy integrity.',
  },
  {
    icon: Recycle,
    title: 'Waste Valorisation & Red Mud',
    desc: 'Zero-waste mineral utilization, blast furnace slag repurposing, and tailings management.',
  },
];

const TIMELINE_EVENTS = [
  {
    year: '1976–1978',
    era: 'foundational',
    title: 'Inception & Formal Charter of the Bhubaneswar Chapter',
    description:
      'Initiated in 1976 under the vision of eminent metallurgist Prof. P. K. Jena (Director, RRL Bhubaneswar, now CSIR-IMMT) alongside 25 research scientists. Granted formal institutional charter #OR-04 by the IIM National Council, Kolkata in 1978.',
    tag: 'Charter Grant #OR-04',
  },
  {
    year: '1989',
    era: 'foundational',
    title: 'National Symposium on Low-Grade Chromite Ores',
    description:
      'Convened the first flagship national technical conference addressing the beneficiation of Sukinda chromite belt ores, contributing recommendations widely adopted by public sector smelters.',
    tag: 'Sukinda Chromite Initiative',
  },
  {
    year: '2004',
    era: 'modern',
    title: 'Institution of the Annual Memorial Lecture Series',
    description:
      'Established the prestigious annual oration series to honor founding metallurgists of India, creating an enduring Eastern India forum for physical metallurgy and blast furnace innovation.',
    tag: 'Memorial Lecture Tradition',
  },
  {
    year: '2013–2016',
    era: 'modern',
    title: 'Chartering of University Student Chapters',
    description:
      'Expanded collegiate outreach by chartering affiliated student chapters at IIT Bhubaneswar, NIT Rourkela, KIIT University, and VSSUT Burla to mentor youth in metallurgical disciplines.',
    tag: 'Collegiate Affiliate Expansion',
  },
  {
    year: '2024–2026',
    era: 'modern',
    title: 'Green Metallurgy & Decarbonisation Initiatives',
    description:
      'Convened multi-institutional symposiums on Advanced High-Strength Steels (AHSS), hydrogen DRI kinetics, and circular economy practices across the Kalinganagar-Angul industrial belt.',
    tag: 'Sustainable Steel Initiative',
  },
];

const ECOSYSTEM_PARTNERS = [
  {
    icon: Building2,
    badge: 'R&D Secretariat',
    name: 'CSIR-IMMT',
    desc: 'Institute of Minerals and Materials Technology, Bhubaneswar. Host of the Chapter Secretariat and pioneer in extractive metallurgy.',
  },
  {
    icon: GraduationCap,
    badge: 'Academic Partner',
    name: 'IIT Bhubaneswar',
    desc: 'School of Minerals, Metallurgical and Materials Engineering (SMMME). Co-host for advanced research colloquiums and student chapters.',
  },
  {
    icon: Landmark,
    badge: 'Academic Partner',
    name: 'NIT Rourkela',
    desc: 'Department of Metallurgical & Materials Engineering. Collaborator in steel refining research and student conclaves.',
  },
  {
    icon: Factory,
    badge: 'Industry Patrons',
    name: 'Eastern Metal Corridor',
    desc: 'Patron participation from NALCO, Tata Steel (Kalinganagar Works), SAIL (Rourkela Steel Plant), and Jindal Steel & Power.',
  },
];

export default function AboutPage() {
  const [timelineEra, setTimelineEra] = useState<'all' | 'foundational' | 'modern'>('all');

  const filteredTimeline = TIMELINE_EVENTS.filter((e) => {
    if (timelineEra === 'all') return true;
    return e.era === timelineEra;
  });

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About Institution', path: '/about' },
        ])}
      />

      <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-slate-50/50 min-h-screen">
        {/* Editorial Masthead */}
        <section className="w-full bg-white border-b border-slate-200/80 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-primary">About Institution</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold uppercase tracking-wider mb-3">
                  Chartered 1978 • Bhubaneswar Chapter
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                  Dedicated to the Science, Technology &amp; Art of Metals
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
                  The Indian Institute of Metals (IIM) Bhubaneswar Chapter connects researchers, faculty, and industry professionals to advance mineral processing, metallurgical engineering, and sustainable manufacturing across Odisha.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-700 max-w-xs shrink-0">
                <div className="flex items-center justify-between text-slate-500 font-semibold mb-1">
                  <span>Parent Body Charter</span>
                  <span className="text-primary">EST. 1946</span>
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  The Indian Institute of Metals
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  National Headquarters: 'Metal House', Salt Lake, Kolkata (iim-india.net)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Genesis & Foundational History */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="text-xs uppercase font-bold tracking-widest text-primary">
                Chapter Genesis &amp; Focus
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                Rooted at the Heart of India’s Mineral Belt
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Founded in 1976 and formally chartered in 1978 under <strong>The Indian Institute of Metals (IIM, established 1946 in Kolkata)</strong>, the Bhubaneswar Chapter was instituted through the pioneering vision of eminent metallurgist <strong>Prof. P. K. Jena</strong> (former Director of RRL Bhubaneswar, who served as Founder Chairman for 12 years).
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Established at the Regional Research Laboratory (now CSIR-IMMT) with an inaugural group of 25–30 research scientists, the chapter formed foundational collaborations with regional industry leaders including <strong>IDCOL, FACOR, IMFA, IPICOL, and NALCO</strong> to connect materials science with the mineral wealth of Odisha—which holds over half of India’s bauxite, chromite, and iron ore reserves.
              </p>

              {/* Core Focus Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-xs font-bold text-slate-900 block">Mineral Beneficiation</span>
                  <span className="text-xs text-slate-600 mt-0.5 block">High-yield recovery from lean and low-grade ores.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-xs font-bold text-slate-900 block">Sustainable Metallurgy</span>
                  <span className="text-xs text-slate-600 mt-0.5 block">Low-carbon DRI ironmaking and green hydrogen feeds.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Key Chapter Facts</span>
                </h3>
                <dl className="flex flex-col gap-3.5 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-50">
                    <dt className="text-slate-500 font-medium">Chapter Charter Year</dt>
                    <dd className="font-bold text-slate-900">1978 (Charter #OR-04)</dd>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-50">
                    <dt className="text-slate-500 font-medium">Secretariat Location</dt>
                    <dd className="font-bold text-slate-900">CSIR-IMMT, Bhubaneswar</dd>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-50">
                    <dt className="text-slate-500 font-medium">Elected Council Members</dt>
                    <dd className="font-bold text-slate-900">23 Members (2026–27)</dd>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-50">
                    <dt className="text-slate-500 font-medium">Affiliated Student Chapters</dt>
                    <dd className="font-bold text-slate-900">6 Premier Institutes</dd>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <dt className="text-slate-500 font-medium">Head Office</dt>
                    <dd className="font-bold text-slate-900">IIM Kolkata HQ</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Core Thrust Areas */}
        <section className="w-full bg-white border-y border-slate-200/80 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase font-bold tracking-widest text-primary">
                Scientific Disciplines
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Core Research &amp; Industrial Thrust Areas
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Focused research domains supporting eastern India&apos;s steel mills, aluminium smelters, and mineral processing complexes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FOCUS_AREAS.map((area, i) => {
                const IconComponent = area.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 hover:bg-white transition-all shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary mb-3.5 shadow-2xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{area.title}</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{area.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Historical Chronicle Timeline */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-primary">
                Chronicle &amp; Traditions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Decades of Chapter Milestones
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Key technological forums, symposia, and academic milestones from 1976 to the present day.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setTimelineEra('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  timelineEra === 'all'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Milestones
              </button>
              <button
                onClick={() => setTimelineEra('foundational')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  timelineEra === 'foundational'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Foundational
              </button>
              <button
                onClick={() => setTimelineEra('modern')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  timelineEra === 'modern'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Modern Era
              </button>
            </div>
          </div>

          <div className="relative border-l border-slate-200 ml-4 sm:ml-6 pl-6 sm:pl-8 flex flex-col gap-8">
            {filteredTimeline.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-white border-4 border-primary shadow-xs" />
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs max-w-3xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                      {item.year}
                    </span>
                    <span className="text-[11px] font-mono font-medium text-slate-500">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Regional Ecosystem */}
        <section className="w-full bg-white border-t border-slate-200/80 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <span className="text-xs uppercase font-bold tracking-widest text-primary">
                Institutional Network
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Regional Metallurgical Ecosystem
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Uniting premier research laboratories, technical universities, and major metal producers across Eastern India.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {ECOSYSTEM_PARTNERS.map((partner, i) => {
                const Icon = partner.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {partner.badge}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{partner.name}</h3>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{partner.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 5: Governance & Secretariat */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="max-w-2xl">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                Statutory Governance &amp; Bylaws
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Democratic Governance Under National IIM Constitution
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                The Bhubaneswar Chapter operates under the registered Constitution and Bylaws of <strong>The Indian Institute of Metals</strong> (Head Office: &apos;Metal House&apos;, Plot 13/8, Block-GN, Sector-V, Salt Lake, Kolkata 700091). The chapter executive committee is democratically elected for biennial terms by registered Life Members and Fellows.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>CSIR-IMMT Complex, Bhubaneswar - 751013</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>iimbhubaneswarchapter@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/committee"
                className="px-5 py-3 bg-amber-500 text-slate-950 text-xs sm:text-sm font-bold rounded-xl hover:bg-amber-400 transition text-center shadow-xs"
              >
                View 2026–27 Council
              </Link>
              <Link
                href="/membership"
                className="px-5 py-3 bg-white/10 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-white/20 transition text-center border border-white/20"
              >
                Join Chapter
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
