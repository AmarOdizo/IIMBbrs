'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Award,
  BadgeCheck,
  Building,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  HelpCircle,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ArrowLeftRight,
  ShieldCheck,
  Sparkles,
  Users,
  UserCheck,
} from 'lucide-react';
import MembershipApplicationForm from '@/components/MembershipApplicationForm';

const CADRE_TIERS = [
  {
    tier: 'Student Member',
    badge: 'Undergraduate / PG',
    subBadge: 'Subsidized',
    price: '₹800',
    period: '/ tenure',
    desc: 'Enrolled B.Tech, M.Tech & Ph.D. scholars in metallurgy, materials, chemistry, and mechanical engineering.',
    isFeatured: false,
    benefits: [
      'Access to regional Student Chapter lectures (IIT, KIIT, Berhampur)',
      'Eligible for ₹2.5L Research Seed Grants',
      'Annual NMD travel subsidies & quiz competitions',
      'Industrial steel plant & smelter exposure visits',
    ],
    ctaText: 'Enroll Student Tier',
    ctaLink: 'https://iim-india.net',
  },
  {
    tier: 'Annual Member',
    badge: 'Early Professional',
    subBadge: 'Renewable',
    price: '₹1,800',
    period: '/ yr + ₹500 reg',
    desc: 'Junior plant metallurgists, testing laboratory officers, and technical engineers in mineral processing.',
    isFeatured: false,
    benefits: [
      'Regional circulars, seminar papers, and technical bulletins',
      'Subsidized fee for Chapter CPD certification programmes',
      'Invitations to Annual Dinner & industry mixer meets',
      'Option to convert to Life Member with credit',
    ],
    ctaText: 'Apply Annual Tier',
    ctaLink: 'https://iim-india.net',
  },
  {
    tier: 'Life Member',
    badge: 'Senior Practicing',
    subBadge: 'Full Voting',
    ribbon: 'Most Esteemed Grade',
    price: '₹12,500',
    period: 'One-time',
    desc: 'Practicing engineers, senior research scientists, and academicians with minimum 5 years verified domain tenure.',
    isFeatured: true,
    benefits: [
      'Full voting rights in biennial chapter elections',
      'Permanent digital archive access + Springer TIIM alerts',
      'Discounted delegate registration at all National Symposia',
      'Physical minted lapel pin, diploma scroll, and ID charter',
      'Nomination rights for prestigious Chapter Metallurgist Awards',
    ],
    ctaText: 'Apply for Life Membership',
    ctaLink: 'https://iim-india.net',
  },
  {
    tier: 'Corporate / Patron',
    badge: 'Industrial Leaders',
    subBadge: 'Institutional',
    price: '₹50,000',
    period: '/ 3 yrs',
    desc: 'Primary steel mills, smelters, equipment suppliers, beneficiation facilities (Tata Steel, NALCO, Utkal, JSL).',
    isFeatured: false,
    benefits: [
      '5 complimentary delegate passes per annual chapter symposium',
      'Corporate logo display on website & technical souvenirs',
      'Direct student talent recruitment access via campus hackathons',
      'Priority co-hosting rights for national specialized colloquia',
    ],
    ctaText: 'Initiate Corporate Dossier',
    ctaLink: '#application-form',
  },
  {
    tier: 'Benefactor Patron',
    badge: 'Philanthropic Trust',
    subBadge: 'Endowment',
    price: '₹1,00,000+',
    period: 'Endowment',
    desc: 'Visionary industrial titans, distinguished alumni foundations, and endowed memorial lecture patrons.',
    isFeatured: false,
    benefits: [
      'Permanent Roll of Honor listing at CSIR-IMMT Secretariat',
      'Sponsorship rights for Memorial Oration (Prof. P.K. Jena Lecture)',
      'Endowment naming rights for Young Metallurgist Gold Medal',
      'Lifetime VIP seating at all council colloquia & plenaries',
    ],
    ctaText: 'Contact Secretariat Desk',
    ctaLink: '#application-form',
  },
];

const STEPS = [
  {
    phase: 'PHASE 01',
    title: 'National Application',
    desc: 'Complete the digital application form on the national portal at iim-india.net or obtain physical Form A from our regional desk. Provide academic diplomas and verified work experience.',
    badge: 'Online Portal Submission',
  },
  {
    phase: 'PHASE 02',
    title: 'Chapter Selection',
    desc: 'Under Section 4 ("Chapter Affiliation") of the national form, explicitly select Bhubaneswar Chapter (Code 04). This guarantees your fee allocation is credited to the local executive committee.',
    badge: 'Explicit Code Mapping: 04',
  },
  {
    phase: 'PHASE 03',
    title: 'Secretariat Scrutiny',
    desc: 'The regional Executive Committee convenes monthly at CSIR-IMMT to review applications, endorse professional referees, and forward formal recommendations to Kolkata Headquarters.',
    badge: 'Local Executive Approval',
  },
  {
    phase: 'PHASE 04',
    title: 'Induction & Roll Allotment',
    desc: 'Receive your formal National Membership ID (e.g. LM-8921), physical lapel pin, digital credential badge, and automatic enrollment in the Bhubaneswar technical newsletter directory.',
    badge: 'Credentials Dispatched',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Being a Life Member at IIM Bhubaneswar bridged the crucial gap between our laboratory-scale hydrometallurgical extraction work at CSIR-IMMT and primary slag processors across Odisha. The annual symposium remains our premiere forum for peer validation.',
    name: 'Dr. Suchitra Mohanty',
    role: 'Senior Principal Scientist, CSIR-IMMT',
    tag: 'Life Member since 2012',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSpxJS4hhLHw2SEk36lq12IKUoY4zkz4DX1o9boK4GOOIcJmzB820_nmQfMYI84ZG976Xy5Btt8PUMUy1QpeWHcBC427WysK9MWDnRCFU8XnKRKgWr-Kp2t9-MWeCdzi7LmurSFOCiow7BiYSI6FKi079-7g2vD5RLtmTxh6ypW_cfpJtfgZMe0o2qWPhZfKOePTx-oqoi5AF8qbIchcDKHQhUpW9_TDsmpB1zNJArNxdR49G4BBxF',
  },
  {
    quote:
      'When rolling out Advanced High-Strength Steel (AHSS) hot-strip protocols, the technical feedback from fellow chapter members at Jajpur and Angul proved indispensable. The chapter is genuinely an active metallurgical fraternity, not just a name on a card.',
    name: 'Er. Rajeshwar Panda',
    role: 'Chief Metallurgist, Eastern Steel Mills',
    tag: 'Annual Member (10-Yr Transferee)',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuANW96Mo1HH08CzHXQnryrXK0-rz8T7Cd7kJP7zQ5HrbrkgxkX_-g_5GagJ2BSOD462J-CJTqbjxLSyKPTEv4Xk2kUyXywyhT4e-mgwKuzDgWJMeZ8If-YoLVWwGZFFK7i7cjXwEy3p7ysuHDjS1yKW_Gd7FgJl4nfEJeU5E_MED3JFar0AdqRtuHchCdZSwGEtVuDijiAn-oVm3ZGEYCkb4BMtakNHI8nW05hAvVnvUqY7d59g2iSs',
  },
  {
    quote:
      'The Chapter\'s student travel grant allowed me to present our computational alloy simulation paper at the National Metallurgists\' Day convention in Hyderabad. Meeting senior mentors completely transformed my doctoral research pathway.',
    name: 'Ananya Roy',
    role: 'Ph.D. Fellow, School of Minerals, IIT Bhubaneswar',
    tag: 'Student Member since 2023',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUGWi1_Dz7wTUNf3frSdaxlKVV96E4f5E0ArS7q6O-34W0zw4GMken-RcsLxD754Ywo5H4Jsh6Hp_jnoyLUbBUbJfmDsof4Npwhq7bW2sKUgXy4PiEYPYWdOWd5mDiQ6DyBDe9O11af6vmYTxEEEFGQZ_SrF-EvWDu_dCz1qZ62mLfv2ZDqD2YRJsoKU6tBpy0BFb8xMByZe8XXPDTeNkhOqJdYKc0VuCf0v1DRJJqeMi2Qrq3QV1E',
  },
];

const FAQS = [
  {
    question: 'Are membership subscription fees eligible for income tax deduction under Section 80G?',
    answer:
      'Yes. The Indian Institute of Metals is a registered non-profit educational and scientific institution under Section 12A and 80G of the Indian Income Tax Act. All Life Member endowment contributions, Corporate patron packages, and philanthropic memorial funds qualify for tax exemption receipts issued directly by the Kolkata Head Office.',
  },
  {
    question: 'How does an existing IIM Life Member transfer their affiliation from another city to Bhubaneswar?',
    answer:
      'Transferring your chapter affiliation is straightforward and incurs no fee. Simply send an email to secretary@iimbhubaneswar.in or use our regional application form below, stating your Full Name, National Membership ID (e.g. LM-XXXX), and current corporate posting in Odisha. The Secretariat notifies Kolkata to update your chapter mapping in the central gazette.',
  },
  {
    question: 'What documents are required to claim the subsidized Student Member tenure rate?',
    answer:
      'Applicants must furnish a copy of their valid institutional identity card and a letter of endorsement from their Head of Department (HOD) or the Student Chapter Faculty Advisor (at IIT Bhubaneswar, NIT Rourkela, VSSUT, or affiliated engineering colleges). The ₹800 subscription covers the student\'s entire degree duration up to graduation.',
  },
  {
    question: 'Does membership include full print or digital access to the Transactions of the Indian Institute of Metals (TIIM)?',
    answer:
      'All Life Members and Patron Institutional Members receive complimentary online electronic access to all issues of the Transactions of the Indian Institute of Metals published in partnership with Springer Nature, including back-archives. Physical print copies can be subscribed at a deeply discounted member rate via the national portal.',
  },
];

export default function JoinChapterSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToForm = () => {
    const el = document.getElementById('application-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full gap-12">
      {/* 1. Top Masthead & Hero Section */}
      <section className="relative w-full bg-surface-container-lowest p-6 sm:p-10 lg:p-12 rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#516071_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-5xl flex flex-col gap-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
              Membership Tiers &amp; Regional Affiliation · Est. 1978 · Chapter Code 04
            </span>
          </div>

          <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface leading-tight tracking-tight">
            Shape the Future of Metallurgy in Eastern India.{' '}
            <span className="italic text-primary font-normal font-serif">Join IIM Bhubaneswar.</span>
          </h2>

          <p className="font-body-lg text-sm sm:text-base text-secondary max-w-3xl leading-relaxed">
            Connect with over 750+ metallurgical scientists, steel plant executives, mineral processing pioneers, and student scholars across Odisha&apos;s premier mineral and industrial heartland. Forge high-impact research alliances and accelerate your technical trajectory.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://iim-india.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-label-md text-sm font-semibold bg-primary text-on-primary hover:bg-primary-container transition-all shadow-sm group"
            >
              <span>Apply via National Portal (IIM Kolkata)</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-label-md text-sm font-semibold bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors border border-slate-200"
            >
              <Mail className="w-4 h-4 text-primary" />
              <span>Submit Chapter Application Here</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-sm font-bold text-on-surface">5 Cadre Tiers</span>
              <span className="font-body-sm text-xs text-secondary">Student to Corporate Patron</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-sm font-bold text-on-surface">Seamless Transfer</span>
              <span className="font-body-sm text-xs text-secondary">Relocating to Odisha assisted</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-sm font-bold text-on-surface">Springer TIIM Access</span>
              <span className="font-body-sm text-xs text-secondary">Flagship peer-reviewed index</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-sm font-bold text-on-surface">Subsidized CPD</span>
              <span className="font-body-sm text-xs text-secondary">NMD &amp; IMMT workshops</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Affiliation Architecture Explainer & Relocation Callout */}
      <section className="w-full">
        <div className="bg-surface-container-low rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col lg:flex-row gap-8 items-start justify-between border border-slate-200/50">
          <div className="max-w-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-primary" />
              <span className="font-label-md text-xs font-bold uppercase tracking-wider text-primary">
                Statutory Governance &amp; Chapter Mapping
              </span>
            </div>
            <h3 className="font-headline-sm text-xl sm:text-2xl font-bold text-on-surface">
              How Regional Membership Works with IIM Kolkata Head Office
            </h3>
            <p className="font-body-md text-sm text-secondary leading-relaxed">
              The Indian Institute of Metals (IIM) is a premier statutory national technical body headquartered at{' '}
              <strong className="text-on-surface">&quot;Metal House&quot;, Salt Lake City, Kolkata</strong>. All permanent membership rolls and charter diplomas are formally ratified through the National Council. By selecting{' '}
              <strong className="text-primary font-semibold">&quot;Bhubaneswar Chapter (Code 04)&quot;</strong> as your parent regional chapter, your annual subscription, council voting rights, regional seminar grants, and gazette notices are routed directly to our regional secretariat based at CSIR-IMMT.
            </p>
          </div>

          {/* Relocation Callout Card */}
          <div className="lg:w-96 w-full bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col justify-between gap-4 border border-slate-200/60">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0 text-on-tertiary-fixed font-bold">
                <ArrowLeftRight className="w-4 h-4 text-emerald-800" />
              </div>
              <div>
                <span className="font-title-md text-sm font-bold text-on-surface block leading-tight">
                  Relocating to Odisha?
                </span>
                <p className="font-body-sm text-xs text-secondary mt-1">
                  Already an active IIM Life or Annual Member moving to Jajpur, Angul, Rourkela, or Bhubaneswar? Transfer without reapplying or paying extra dues.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={scrollToForm}
              className="w-full text-center py-2.5 px-4 rounded-lg bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary font-label-md text-xs font-semibold transition-colors border border-slate-200"
            >
              Request Chapter Transfer
            </button>
          </div>
        </div>
      </section>

      {/* 3. Five-Tier Membership Comparison Matrix */}
      <section className="w-full flex flex-col gap-6" id="tiers-matrix">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-label-md text-xs uppercase tracking-wider text-primary font-bold">
              Classifications &amp; Entitlements
            </span>
            <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mt-1">
              Choose Your Cadre of Affiliation
            </h3>
            <p className="font-body-md text-sm text-secondary mt-1 max-w-2xl">
              From undergraduate student metallurgists to primary mineral conglomerates, select the grade calibrated to your professional station.
            </p>
          </div>
          <div className="flex items-center gap-2 text-secondary text-xs">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary" />
            <span>All tariffs subject to standard GST as applicable nationally</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {CADRE_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={`bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative border ${
                tier.isFeatured ? 'ring-2 ring-primary border-primary shadow-lg' : 'border-slate-200/70'
              }`}
            >
              {tier.ribbon && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-label-sm text-[10px] tracking-widest uppercase px-3 py-0.5 rounded-full shadow-sm font-semibold">
                  {tier.ribbon}
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pt-1">
                  <span className="font-label-sm text-xs font-semibold tracking-wider uppercase text-secondary">
                    {tier.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-surface-container text-on-surface">
                    {tier.subBadge}
                  </span>
                </div>

                <div>
                  <h4 className="font-headline-sm text-lg font-bold text-on-surface">{tier.tier}</h4>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-headline-md text-2xl font-bold text-primary">{tier.price}</span>
                    <span className="font-body-sm text-xs text-secondary">{tier.period}</span>
                  </div>
                  <p className="font-body-sm text-xs text-secondary mt-2 leading-relaxed">{tier.desc}</p>
                </div>

                <div className="h-px w-full bg-slate-100" />

                <ul className="flex flex-col gap-2.5 text-xs text-on-surface">
                  {tier.benefits.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                {tier.ctaLink.startsWith('http') ? (
                  <a
                    href={tier.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full block text-center py-2.5 px-3 rounded-lg font-label-md text-xs font-semibold transition-all ${
                      tier.isFeatured
                        ? 'bg-primary text-on-primary hover:bg-primary-container shadow-sm'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {tier.ctaText}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className={`w-full block text-center py-2.5 px-3 rounded-lg font-label-md text-xs font-semibold transition-all ${
                      tier.isFeatured
                        ? 'bg-primary text-on-primary hover:bg-primary-container shadow-sm'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {tier.ctaText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 4-Step Affiliation & Enrollment Procedure */}
      <section className="w-full flex flex-col gap-6">
        <div className="max-w-3xl">
          <span className="font-label-md text-xs uppercase tracking-wider text-primary font-bold">
            Workflow &amp; Verification
          </span>
          <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mt-1">
            4-Step Enrollment Procedure
          </h3>
          <p className="font-body-md text-sm text-secondary mt-1">
            Applications are ratified following statutory peer scrutiny to ensure professional and scholastic integrity. Follow this standardized roadmap to formalize your induction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-slate-200/60"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-sm text-xs font-bold text-primary px-2.5 py-1 bg-surface-container rounded-md">
                    {step.phase}
                  </span>
                  <span className="font-mono text-xs text-slate-400">0{idx + 1}</span>
                </div>
                <h4 className="font-title-lg text-base font-bold text-on-surface mb-2">{step.title}</h4>
                <p className="font-body-sm text-xs text-secondary leading-relaxed">{step.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-primary font-label-sm text-xs font-semibold">
                <span>{step.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Voices of the Chapter (Testimonials) */}
      <section className="w-full flex flex-col gap-6">
        <div>
          <span className="font-label-md text-xs uppercase tracking-wider text-primary font-bold">
            Voices of the Chapter
          </span>
          <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mt-1">
            Reflections from Our Regional Cadre
          </h3>
          <p className="font-body-md text-sm text-secondary mt-1 max-w-2xl">
            Hear from principal investigators, steel manufacturing specialists, and student fellows who anchor their professional development in IIM Bhubaneswar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-6 sm:p-8 rounded-xl shadow-sm flex flex-col justify-between gap-6 border border-slate-200/60"
            >
              <p className="font-body-md text-sm text-on-surface leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image src={t.avatar} alt={t.name} fill unoptimized className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-sm font-bold text-on-surface leading-tight">{t.name}</span>
                  <span className="font-body-sm text-xs text-secondary">{t.role}</span>
                  <span className="font-label-sm text-[11px] text-primary uppercase tracking-wider font-semibold">
                    {t.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Interactive Membership Application & Secretariat Desk (Embedded Form) */}
      <section className="w-full" id="application-form">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Embedded Form (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col gap-6">
            <div className="pb-4 border-b border-slate-100">
              <span className="font-label-md text-xs uppercase tracking-wider text-primary font-bold">
                Direct Regional Registry
              </span>
              <h3 className="font-headline-sm text-xl sm:text-2xl font-bold text-on-surface mt-1">
                Submit Membership &amp; Chapter Transfer Application
              </h3>
              <p className="font-body-sm text-xs text-secondary mt-1">
                Have questions regarding tier qualifications, corporate bulk memberships, or transferring your existing IIM registry to Bhubaneswar? Our honorary joint secretary reviews inquiries within 48 business hours.
              </p>
            </div>

            {/* Live Interactive React Form */}
            <MembershipApplicationForm />
          </div>

          {/* Right Column: Secretariat Desk & Contact Coordinates (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col gap-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-semibold">
                    Regional Secretariat
                  </span>
                  <h4 className="font-title-lg text-lg font-bold text-on-surface">Honorary Secretariat Desk</h4>
                </div>
              </div>

              <p className="font-body-sm text-xs text-secondary leading-relaxed">
                The regional secretariat for the Bhubaneswar Chapter is hosted at the Institute of Minerals and Materials Technology (CSIR-IMMT), serving as the physical conduit between regional industrial metallurgists and the Kolkata National Council.
              </p>

              <div className="flex flex-col gap-4 text-xs">
                <div className="flex items-start gap-3">
                  <UserCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-on-surface block text-sm">Dr. Tarun K. Biswal</strong>
                    <span className="text-secondary">Honorary Joint Secretary &amp; Membership Convener</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-on-surface block text-sm">Physical Headquarters</strong>
                    <span className="text-secondary">
                      CSIR - Institute of Minerals and Materials Technology (IMMT), Acharya Vihar, Bhubaneswar, Odisha 751013
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-on-surface block text-sm">Official Secretariat Correspondence</strong>
                    <a className="text-primary hover:underline font-mono" href="mailto:membership@iimbhubaneswar.in">
                      membership@iimbhubaneswar.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-on-surface block text-sm">Secretariat Liaison Phone</strong>
                    <span className="text-secondary font-mono">+91 (0674) 237-1240 / 237-1400 (Ext. 402)</span>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="p-4 bg-surface-container-low rounded-xl flex items-center justify-between text-xs border border-slate-200/50">
                <div className="flex flex-col">
                  <span className="font-label-sm uppercase tracking-wider text-secondary font-semibold">
                    Chapter In-Person Desk
                  </span>
                  <span className="font-bold text-on-surface mt-0.5">Wednesdays &amp; Fridays: 15:30 – 17:30</span>
                </div>
                <Clock className="w-5 h-5 text-primary shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions (Accordion) */}
      <section className="w-full">
        <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-slate-200/60 flex flex-col gap-6">
          <div>
            <span className="font-label-md text-xs uppercase tracking-wider text-primary font-bold">
              Inquiries &amp; Policies
            </span>
            <h3 className="font-headline-lg text-2xl font-bold text-on-surface mt-1">Frequently Asked Questions</h3>
            <p className="font-body-md text-xs text-secondary mt-1">
              Essential statutory regulations governing subscriptions, deductions, and transfer protocols across the Indian Institute of Metals.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-surface-container-low p-4 transition-all border border-slate-200/50"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left flex items-start justify-between gap-4 font-title-md text-sm font-semibold text-on-surface hover:text-primary transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-primary shrink-0 mt-0.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-slate-200/40 text-xs text-secondary leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

