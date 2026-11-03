'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Calendar,
  CheckCircle2,
  Download,
  ArrowRight,
  BookOpen,
  Sparkles,
  Trophy,
  Users,
  ShieldCheck,
  FileText,
  Mail,
  Send,
} from 'lucide-react';

export interface AwardItem {
  id: string;
  title: string;
  category: string;
  annualSchedule: string;
  description: string;
  highlights: string[];
  bannerImage: string;
  badge: string;
  prizePool?: string;
}

export const STATIC_AWARDS: AwardItem[] = [
  {
    id: 'award-1',
    title: 'Annual Foundation Day & Fellowship Conferment',
    category: 'Annual Tradition',
    annualSchedule: '24 February Annually',
    badge: 'Apex Chapter Convocation',
    description:
      'Commemorating the charter establishment of the Bhubaneswar Chapter. This apex gathering brings together senior fellows, academic leaders from CSIR-IMMT, IIT Bhubaneswar, and senior technocrats from Tata Steel Kalinganagar, Nalco Damanjodi, and Jindal Stainless to deliberate on mineral stewardship and honour regional pioneers.',
    highlights: [
      'Life Citations & Honorary Fellowships',
      'Milestone Charter Roadmap Release',
      'Apex Keynote Address & Annual Monograph',
    ],
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0mjDh06hbXmM_nUU2jyOwKjf8FtFotI4yWQnDAYtqi4EfUim91hJTpYqvl5xuzkyGB3jmLqvWGWlEzvlO1FJkJAt-OgNOAntRW8xcydSOZdQHumD8RG4Ug3DLsKSQS8K7Au-U7oALuFSMDkv_9enhjSlkqwDjmzYLL8UyqqE-WEF3uTj_XTBIZqEi0qTWImXyf2hOJ01iqQ8bOaBQdSQfhnbBwtGCMNcKUcwkhBCQgVxm3R04Ke4q',
  },
  {
    id: 'award-2',
    title: 'National Metallurgist Day (NMD) Regional Honors',
    category: 'Honors & Recognition',
    annualSchedule: '07 August Annually',
    badge: 'National Medal Citation',
    description:
      'Celebrated across eastern mineral clusters in alignment with national IIM standards. The Bhubaneswar Chapter bestows regional honors to promising plant metallurgists, process innovators, and doctoral researchers driving efficiency in steelmaking, alumina refining, and rare earths extraction.',
    highlights: [
      'Young Metallurgist Excellence Award (<35 Years)',
      'Plant Metallurgical Innovation Citation',
      'Best Published Paper Award in Mineral Processing',
    ],
    prizePool: 'Gold Plaque & Research Grant',
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJA2iacY8ceATiuSx8mRaUmhW6pB8v2ttcnx3o5TPGGgBuMC2j02S4xWHpl7mlbWlRyfhJOl_uI8JpcdAb8gj5fW9fx2lT6t5yDyKmGJTi-6whpA6LE_yvklztDgTgnXhuAQ3MxTxPu3SfQkot2l-xro9qgKuC8Yxu3_-gyMKcZLNbORlcv7KrLHQrMRbL88CoWt5ujuSy-34Mp746JGxSczIU7hHrS5V1Dw8UElp6HfVMb4M5crj',
  },
  {
    id: 'award-3',
    title: 'Prof. P. K. Jena Memorial Lecture Series & Oration Award',
    category: 'Endowed Memorial Oration',
    annualSchedule: 'May Annually',
    badge: 'Endowed Memorial Medal',
    description:
      'The most revered academic address in Eastern India’s materials community. Instituted in memory of Padma Shri Prof. Prafulla Kumar Jena, legendary extractive metallurgist and former Director General of CSIR Regional Research Laboratory (IMMT). The oration explores sustainable smelting, circular hydrometallurgy, and mineral autonomy.',
    highlights: [
      'Commemorative Jena Memorial Medal & Scroll',
      'Keynote by Padma Awardee / National Metallurgists',
      'Monograph Published and Distributed Nationally',
    ],
    prizePool: 'Commemorative Medallion & Scroll',
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBeTyMWHozqO1tDTDj1jNRJeLrd5WDhqkSw5VOkNNltDNINe0m4_Hhuj82pbRUTizptwbj_bpZXmayya3eRzkcqGik5XIIigkrsME8Z8D9kJLLaauLboZBEuyk43NBUViPoJGUrlAic2u7WZPKSb4VtgOIj96ZST51vDYy5ylGvqwdMtRiGER6gSrqw5IB9dFssHnT-_5oEK8SzRsqj_N5InCW9Xy6gv3OvPVopMxjTaeGm4bC-0vE_',
  },
  {
    id: 'award-4',
    title: 'Odisha Metallurgical Conclave & Collegiate Tournaments',
    category: 'Youth & Academic Outreach',
    annualSchedule: 'July Annually',
    badge: 'Collegiate Cash Laurels',
    description:
      'The flagship multi-day collegiate symposium uniting student chapters from IIT Bhubaneswar, NIT Rourkela, VSSUT Burla, and PMEC Berhampur. Features fierce intellectual contests, undergraduate research showcases, and talent recruitment lounges with leading core-sector employers.',
    highlights: [
      'Prof. Brahm Prakash Memorial Quiz (BPMQ) Qualifiers',
      'Art of Metallography Exposition & Competition',
      'Sustainable Prototype & Waste Valorization Demonstrations',
      '₹1.5 Lakh Cash Prize Pool & Trophies',
    ],
    prizePool: '₹1.5 Lakh Cash Purse',
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDU5oX62ix7nJL4aoKm1nhvdAIdWQv6xnDXoSw3s1A1pKIuMwoxrOD_dEoZ38rCkqJ0tJ1qS8ntSrpEULfqT5p9hoj1C4_NzJHM4U7WDnn1pgyFfyuGpNUdP53Hc7unXrAm47qYQudd0V3qfxhV5g4Gxinbwq_FEoiCwz-LwLtHcR2rGGOWI082TF2HMGpn7b9j8dXNLAEEbnkVI37H4WaMdfHcylxDaLwFvvzCCjsyZ9Q4kNEZ3aEr',
  },
  {
    id: 'award-5',
    title: 'Annual General Body Meeting (AGM) & Council Ratification',
    category: 'Constitutional Governance',
    annualSchedule: 'Biennial & Annual',
    badge: 'Constitutional Mandate',
    description:
      'The sovereign deliberative organ of the IIM Bhubaneswar Chapter. The AGM gathers registered voting life members and institutional delegates to scrutinize audited accounts, review the Honorary Secretary’s report, elect the biennial executive council, and ratify programmatic mandates.',
    highlights: [
      'Audited Balance Sheet Ratification',
      "Secretary's Annual Performance Review",
      'Biennial Executive Committee Elections',
      'Student Chapter Charter Extensions',
    ],
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5B20NBXTZ_xnvycjhtokgyQzdFrUk5LdaaA5bHmt-gqxD-03My7dNA1vWRRHnmalAy9P8ciBlbmxlA3Jh_t4ZLPlmP0V1RPiYQP1OpNwXk98f8elEBXRUcb2-yuXiKAs-T0oNl_SrfOlYIaOabFflmA7VL05veLI3lgCoMhZ9NkF0YhM7woqt6ZYf_MZkrKeH5RA-PAHw62qEwHPeH_i0EXZBEt4GjsqaA1m7MD2t63Ztbmoq2I3C',
  },
];

const CATEGORIES = [
  { id: 'ALL', label: 'All Awards & Honors' },
  { id: 'Annual Tradition', label: 'Foundation Day' },
  { id: 'Honors & Recognition', label: 'Honors & NMD' },
  { id: 'Endowed Memorial Oration', label: 'Memorial Orations' },
  { id: 'Youth & Academic Outreach', label: 'Collegiate Awards' },
  { id: 'Constitutional Governance', label: 'Governance & AGM' },
];

export default function AwardsList() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredAwards = STATIC_AWARDS.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="w-full bg-surface min-h-screen">
      {/* Top Accent Gradient Bar */}
      <div className="w-full h-1.5 bg-gradient-to-r from-primary via-amber-500 to-tertiary"></div>

      {/* Hero Eyebrow & Title */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-8 pb-6">
        <nav className="flex items-center gap-2 font-label-md text-label-md text-secondary mb-4">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Home</span>
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="text-primary font-semibold">Awards &amp; Honors</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-surface-variant/40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-primary font-label-sm text-label-sm uppercase tracking-widest mb-3">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>ANNUAL INSTITUTIONAL BENCHMARKS &amp; HONORS</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-4">
              Chapter Awards, Honors &amp; Traditions
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              The IIM Bhubaneswar Chapter organizes seminal annual traditions advancing metallurgical research,
              recognizing professional excellence, nurturing student talent, and bestowing prestigious regional
              honors across Eastern India.
            </p>
          </div>

          {/* Quick Counter Mosaic */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container-low p-4 rounded-2xl border border-slate-200/80 shadow-xs shrink-0">
            <div className="flex flex-col border-r border-surface-variant/50 pr-4 last:border-0">
              <span className="font-headline-sm text-headline-sm text-primary font-bold">05</span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Apex Laurels</span>
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
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl font-label-md text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === c.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface border border-slate-200/60'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <a
            href="#nomination-workflow"
            className="hidden md:inline-flex items-center gap-1.5 text-primary hover:text-primary-container font-label-md text-label-md whitespace-nowrap pl-4 font-semibold"
          >
            <span>Nomination Protocol</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* Static Awards List */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-12 flex flex-col gap-16 lg:gap-24">
        {filteredAwards.map((award, index) => {
          const isEven = index % 2 === 0;

          return (
            <article
              key={award.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300"
            >
              {/* Content */}
              <div className={`lg:col-span-7 flex flex-col items-start ${isEven ? 'order-2 lg:order-1' : 'order-2'}`}>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-xs font-bold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{award.annualSchedule}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                    {award.badge}
                  </span>
                  {award.prizePool && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                      {award.prizePool}
                    </span>
                  )}
                </div>

                <h2 className="font-headline-md text-2xl sm:text-3xl font-bold text-on-surface mb-3 tracking-tight">
                  {award.title}
                </h2>

                <p className="font-body-md text-sm sm:text-base text-on-surface-variant mb-6 leading-relaxed">
                  {award.description}
                </p>

                {/* Highlights Grid */}
                {award.highlights && award.highlights.length > 0 && (
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {award.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-xs sm:text-sm border border-slate-200/40"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-medium text-slate-800">{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/events"
                    className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-xs sm:text-sm font-semibold shadow-sm transition flex items-center gap-2"
                  >
                    <span>View Calendar &amp; Dates</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="#nomination-workflow"
                    className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs sm:text-sm font-semibold transition flex items-center gap-2 border border-slate-200"
                  >
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Nomination Guidelines</span>
                  </a>
                </div>
              </div>

              {/* Banner Image */}
              <div className={`lg:col-span-5 ${isEven ? 'order-1 lg:order-2' : 'order-1'}`}>
                <div className="relative rounded-2xl overflow-hidden bg-surface-container shadow-md h-72 sm:h-80 lg:h-96 w-full group">
                  <img
                    src={award.bannerImage}
                    alt={award.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/30 to-transparent flex flex-col justify-end p-6">
                    <div className="text-surface font-label-sm text-xs font-bold uppercase tracking-widest text-amber-300">
                      {award.annualSchedule}
                    </div>
                    <div className="text-surface font-title-md text-base sm:text-lg font-bold truncate text-white">
                      {award.title}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Nomination Workflow Section */}
      <section id="nomination-workflow" className="w-full bg-surface-container py-16 px-6 lg:px-12 my-8 border-y border-surface-variant/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
                Standardized Protocol
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-bold text-on-surface mt-1">
                Honors Nomination &amp; Adjudication Process
              </h2>
            </div>
            <p className="font-body-md text-sm text-secondary max-w-md mt-2 md:mt-0 leading-relaxed">
              The Chapter maintains rigorous, peer-reviewed standards for every citation and medallion conferred
              under IIM auspices.
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
                className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base mb-4">
                    {st.step}
                  </div>
                  <h3 className="font-title-md text-base font-bold text-on-surface mb-2">{st.title}</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mb-4">
                    {st.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 font-label-sm text-xs text-primary font-bold">
                  {st.window}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Alliances & Endowments Banner */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-16">
        <div className="bg-inverse-surface text-inverse-on-surface rounded-3xl p-8 lg:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="font-label-sm text-xs uppercase tracking-widest text-amber-300 block mb-2 font-bold">
              Institutional Alliances &amp; Endowments
            </span>
            <h2 className="font-headline-md text-2xl sm:text-3xl font-bold text-white mb-3">
              Endow or Sponsor an Award with IIM Bhubaneswar
            </h2>
            <p className="font-body-md text-sm text-slate-300 leading-relaxed mb-6">
              Leading industrial groups—including Tata Steel, NALCO, Jindal Stainless, and Rungta Mines—partner with
              the Chapter to sponsor student medals, endow annual lecture series, and foster technical excellence.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-primary text-on-primary font-label-md text-xs sm:text-sm font-semibold hover:bg-primary-container transition-all shadow-sm flex items-center gap-2"
              >
                <span>Inquire for Award Endowments</span>
                <Send className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-2 shrink-0 text-xs text-slate-300 max-w-sm">
            <span className="font-bold text-white text-sm">Honors Secretariat Contact:</span>
            <span>Dr. Tarun K. Biswal, Hony. Jt. Secretary</span>
            <span>CSIR – IMMT, Acharya Vihar, Bhubaneswar - 751013</span>
            <span className="text-amber-300 font-mono">secretary@iimbhubaneswar.in</span>
          </div>
        </div>
      </section>
    </div>
  );
}

