import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/seo';
import {
  Layers,
  Building2,
  Calendar,
  GraduationCap,
  Award,
  Newspaper,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  FileText,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Indian Institute of Metals • Bhubaneswar Chapter | CSIR-IMMT',
  description:
    'Official portal of The Indian Institute of Metals (IIM) Bhubaneswar Chapter, chartered in 1978 at CSIR-IMMT. Promoting metallurgy, mineral processing, and sustainable steelmaking across Eastern India.',
  alternates: {
    canonical: '/',
  },
};

const PILLARS = [
  {
    icon: Layers,
    title: 'Mineral Processing & Beneficiation',
    desc: 'Research and industrial practices for upgrading lean iron, chromite, and bauxite ores in Odisha.',
  },
  {
    icon: Building2,
    title: 'Green Steel & Decarbonisation',
    desc: 'Low-carbon Direct Reduced Iron (DRI), hydrogen metallurgy, and blast furnace emission reduction.',
  },
  {
    icon: ShieldCheck,
    title: 'Strategic & Non-Ferrous Metals',
    desc: 'Recovery of titanium minerals, heavy mineral sands, aluminium smelting, and rare-earth processing.',
  },
  {
    icon: Compass,
    title: 'Circular Economy & Slag Valorisation',
    desc: 'Repurposing metallurgical slag, red mud remediation, and industrial zero-waste ecosystems.',
  },
];

const FLAGSHIP_PROGRAMS = [
  {
    title: 'Foundation Day Celebrations',
    period: 'Annual (May)',
    desc: 'Commemorating the chapter charter granted in 1978 with distinguished orations and fellow felicitations.',
    link: '/awards',
  },
  {
    title: "National Metallurgists' Day (NMD-ATM)",
    period: 'Annual (November)',
    desc: 'National celebration honoring breakthroughs in extractive metallurgy, materials physics, and industrial operations.',
    link: '/events',
  },
  {
    title: 'Prof. P.K. Jena Memorial Lecture',
    period: 'Annual Memorial Series',
    desc: 'Instituted in memory of Founder Chairman Prof. P. K. Jena, featuring lectures by eminent metallurgists.',
    link: '/awards',
  },
  {
    title: 'Eastern Regional Conclaves',
    period: 'Biennial Conclave',
    desc: 'High-level symposiums connecting CSIR laboratories, IIT faculty, and eastern steel plants.',
    link: '/events',
  },
];

const STUDENT_CHAPTERS = [
  { name: 'IIT Bhubaneswar', desc: 'School of Minerals, Metallurgical & Materials Engineering' },
  { name: 'NIT Rourkela', desc: 'Department of Metallurgical & Materials Engineering' },
  { name: 'IISER Berhampur', desc: 'Department of Physical & Chemical Sciences' },
  { name: 'KIIT Deemed to be University', desc: 'School of Mechanical & Materials Engineering' },
  { name: 'VSSUT Burla', desc: 'Department of Metallurgy & Materials Engineering' },
  { name: 'OUTR Bhubaneswar', desc: 'Department of Mechanical & Materials Engineering' },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getWebSiteSchema()} />

      <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-slate-50/50 min-h-screen">
        {/* Hero Section */}
        <section className="w-full bg-white border-b border-slate-200/80 py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>The Indian Institute of Metals • Bhubaneswar Chapter</span>
                </span>
                <span className="text-xs font-medium text-slate-500 hidden sm:inline">
                  Affiliated to IIM Kolkata HQ (Est. 1946)
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                Advancing Metallurgy &amp; Materials Science in Eastern India
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Chartered in 1978 and based at CSIR-IMMT Bhubaneswar, our chapter connects scientists, university faculty, and industrial leaders across Odisha’s mineral heartland.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/committee"
                  className="px-5 py-3 bg-primary text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-primary-container transition shadow-xs flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Executive Committee (2026–27)</span>
                </Link>

                <Link
                  href="/membership"
                  className="px-5 py-3 bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl hover:bg-slate-200 transition border border-slate-200 flex items-center gap-2"
                >
                  <span>Join Chapter</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/events"
                  className="px-4 py-3 text-slate-600 hover:text-primary text-xs sm:text-sm font-semibold transition flex items-center gap-1"
                >
                  <span>View Events &amp; Symposia</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-100">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900 block">1978</span>
                <span className="text-xs text-slate-600 mt-0.5 block font-medium">Charter Established</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900 block">23</span>
                <span className="text-xs text-slate-600 mt-0.5 block font-medium">Council Members (2026–27)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900 block">6</span>
                <span className="text-xs text-slate-600 mt-0.5 block font-medium">Collegiate Student Chapters</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900 block">CSIR-IMMT</span>
                <span className="text-xs text-slate-600 mt-0.5 block font-medium">Secretariat Complex</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Core Research Pillars */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-primary">
              Core Technical Thrusts
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Key Focus Areas in Metallurgy &amp; Materials
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Addressing raw mineral beneficiation, sustainable ironmaking, and non-ferrous manufacturing in Odisha.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{pillar.title}</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Flagship Programmes & Traditions */}
        <section className="w-full bg-white border-y border-slate-200/80 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-primary">
                  Annual Convocations
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Flagship Chapter Traditions
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Established orations, national awards, and technical symposiums hosted by the chapter.
                </p>
              </div>

              <Link
                href="/awards"
                className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-container flex items-center gap-1 shrink-0"
              >
                <span>View All Awards &amp; Honors</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {FLAGSHIP_PROGRAMS.map((prog, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-slate-100/70 transition"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider block mb-2">
                      {prog.period}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{prog.title}</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{prog.desc}</p>
                  </div>

                  <Link
                    href={prog.link}
                    className="mt-4 pt-3 border-t border-slate-200/80 text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Student Chapters Overview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-primary">
                Youth Mentorship
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Chartered Student Chapters
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Affiliated university chapters fostering metallurgical research cohorts across Odisha.
              </p>
            </div>

            <Link
              href="/student-chapters"
              className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-container flex items-center gap-1 shrink-0"
            >
              <span>Explore Student Chapters</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STUDENT_CHAPTERS.map((sc, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-slate-100 text-primary shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{sc.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{sc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Join Chapter CTA */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block mb-1">
                Professional Affiliation
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Join The Indian Institute of Metals
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Connect with metallurgists, materials scientists, and industry leaders across Eastern India. Membership is open to students, faculty, and corporate professionals.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/membership"
                className="px-5 py-3 bg-amber-500 text-slate-950 text-xs sm:text-sm font-bold rounded-xl hover:bg-amber-400 transition shadow-xs flex items-center gap-2"
              >
                <span>Apply for Membership</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-5 py-3 bg-white/10 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-white/20 transition border border-white/20"
              >
                <span>Contact Secretariat</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
