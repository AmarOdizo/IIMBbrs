'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Landmark,
  BookOpen,
  UserCheck,
  Building2,
  Mail,
  Phone,
  Clock,
  MapPin,
  Navigation,
  Plane,
  Train,
  Car,
  ShieldCheck,
  ChevronDown,
  ExternalLink,
  Award,
  Handshake,
  CheckCircle2,
} from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const FUNCTIONAL_DESKS = [
  {
    role: 'Office of the Secretary',
    title: 'General Governance & Council',
    desc: 'Official executive correspondence, council minutes, statutory notifications, and central institute affiliations.',
    email: 'secretary@iimbhubaneswar.in',
    phone: '+91 674 237 4112',
    badge: 'Primary Dispatch',
    icon: Landmark,
  },
  {
    role: 'Academic Convenorship',
    title: 'Symposia & Paper Submissions',
    desc: 'Technical manuscripts, monograph peer-reviews, speaker registration, and AHSS National Conclave proceedings.',
    email: 'symposium2026@iimbhubaneswar.in',
    status: 'Submissions Open',
    badge: 'Symposium Desk',
    icon: BookOpen,
  },
  {
    role: 'Member Registrars',
    title: 'Membership & Chapter Transfers',
    desc: 'Life Membership applications, institutional endorsements, chapter migration, and student grant disbursements.',
    email: 'membership@iimbhubaneswar.in',
    status: 'Kolkata Portal Sync',
    badge: 'Registrar Email',
    icon: UserCheck,
  },
  {
    role: 'Industry Relations',
    title: 'Corporate Alliances & Press',
    desc: 'Public-private metallurgy MoUs, plant visit delegations, corporate exhibit booths, and media advisories.',
    email: 'liaison@iimbhubaneswar.in',
    status: 'CSR & R&D Alliances',
    badge: 'Liaison Contact',
    icon: Handshake,
  },
];

const EXECUTIVE_CONTACTS = [
  {
    initials: 'AM',
    role: 'Chairman',
    roleBadgeClass: 'bg-primary-fixed text-on-primary-fixed',
    name: 'Dr. Ashok Kumar Mohanty',
    designation: 'Chief Scientist & Head of Pyrometallurgy',
    institution: 'CSIR - IMMT Bhubaneswar',
    email: 'chairman@iimbhubaneswar.in',
    phone: '+91 674 237 4101',
  },
  {
    initials: 'SP',
    role: 'Hon. Secretary',
    roleBadgeClass: 'bg-secondary-container text-on-secondary-fixed',
    name: 'Prof. S. N. Pattnaik',
    designation: 'Professor of Materials Engineering',
    institution: 'Indian Institute of Technology (IIT) Bhubaneswar',
    email: 'secretary@iimbhubaneswar.in',
    phone: '+91 674 237 4112',
  },
  {
    initials: 'BD',
    role: 'Vice Chairman',
    roleBadgeClass: 'bg-surface-container text-on-surface',
    name: 'Er. Bikram K. Dash',
    designation: 'VP Technical Operations',
    institution: 'Utkal Alloys Ltd / Kalinganagar Complex',
    email: 'vicechair.ind@iimbhubaneswar.in',
    extra: 'Industry Liaison Desk',
  },
  {
    initials: 'TB',
    role: 'Joint Secretary',
    roleBadgeClass: 'bg-surface-container text-on-surface',
    name: 'Dr. Tarun K. Biswal',
    designation: 'Senior Principal Scientist',
    institution: 'CSIR - IMMT Bhubaneswar',
    email: 'jt.sec@iimbhubaneswar.in',
    phone: '+91 674 237 4133',
  },
];

const FAQS = [
  {
    question: 'How do I dispatch physical specimen samples or bound monographs?',
    answer:
      'All physical specimens intended for metallographic review or exhibition must be marked with sender details and dispatched via registered Speed Post to: "Attention: Honorary Secretary, IIM Bhubaneswar Chapter, Room 112, Materials Division Complex, CSIR-IMMT, Bhubaneswar — 751013." Please pre-notify us via email with the parcel tracking docket.',
  },
  {
    question: 'What is the standard turnaround time for membership endorsements?',
    answer:
      'Membership applications for Life Member (LM) or Associate Member (AMIIM) grade verified at chapter level are vetted during the Executive Council meeting held in the last week of every month, following which digital dossiers are synchronized directly with IIM Head Office in Kolkata within 5 working days.',
  },
  {
    question: 'Are technical papers eligible for IIM Bhubaneswar Best Paper Awards?',
    answer:
      'Yes. All accepted peer-reviewed monographs presented at the annual Advanced High-Strength Steels (AHSS) Conclave and Regional Metallurgist Memorial Symposium are automatically entered into the adjudication pool for the Prof. P. K. Jena Memorial Gold Medal and the Young Metallurgist Excellence Citation.',
  },
  {
    question: 'How can industrial entities sponsor regional students & internships?',
    answer:
      'Industrial partners can establish an endowed fellowship or provide travel sponsorship for student delegations attending National Metallurgists’ Day (NMD-ATM) by submitting an MoU proposal to liaison@iimbhubaneswar.in. Corporate sponsorships are recognized in chapter circulars and conference proceedings.',
  },
];

export default function ContactSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Top Editorial Header & Breadcrumbs Banner */}
      <section className="relative bg-surface-container-lowest px-6 lg:px-12 py-10 overflow-hidden shadow-sm border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-md text-label-md text-secondary">
            <Link className="hover:text-primary transition-colors flex items-center gap-1" href="/">
              <span className="material-symbols-outlined text-[15px]">home</span>
              <span>Home</span>
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface font-semibold">Contact &amp; Regional Secretariat</span>
          </nav>

          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2.5 mt-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm tracking-wider uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              REGIONAL SECRETARIAT &amp; CORRESPONDENCE · EST. 1978
            </span>
            <span className="hidden sm:inline-block font-label-sm text-label-sm text-secondary tracking-widest uppercase">
              CHAPTER REF: IIM-BBS-SEC-2025/26
            </span>
          </div>

          {/* Main Headline & Subtitle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-2">
            <div className="lg:col-span-8">
              <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface tracking-tight leading-tight">
                Connect with the Secretariat. <br className="hidden sm:block" />
                <span className="text-primary italic font-serif">Advance Metallurgy Together.</span>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="font-body-md text-body-md text-secondary leading-relaxed pb-1">
                Whether you represent an integrated steel complex, a researcher dispatching an AHSS symposium monograph, or a scholar applying for membership, our secretariat desk responds with academic precision.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Background Motif */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-end pr-8">
          <svg className="text-on-surface" fill="none" height="340" viewBox="0 0 200 200" width="340">
            <circle cx="100" cy="100" r="90" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1.5" />
            <polygon fill="none" points="100,20 180,150 20,150" stroke="currentColor" strokeWidth="1" />
            <line stroke="currentColor" strokeWidth="1" x1="100" x2="100" y1="20" y2="180" />
            <line stroke="currentColor" strokeWidth="1" x1="20" x2="180" y1="100" y2="100" />
          </svg>
        </div>
      </section>

      {/* 2. Four Specialized Functional Desks */}
      <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-primary" />
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold">
              Dedicated Channels
            </span>
          </div>
          <h2 className="font-headline-md text-2xl sm:text-3xl font-bold text-on-surface">
            Functional Portfolios &amp; Direct Desks
          </h2>
          <p className="font-body-md text-body-md text-secondary max-w-2xl">
            Direct inquiries to the responsible nodal officer for expedited institutional processing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FUNCTIONAL_DESKS.map((desk, idx) => {
            const Icon = desk.icon;
            return (
              <div
                key={idx}
                className="bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group border border-slate-200/60"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-1">
                    {desk.role}
                  </span>
                  <h3 className="font-title-md text-lg font-bold text-on-surface mb-2">
                    {desk.title}
                  </h3>
                  <p className="font-body-sm text-sm text-secondary leading-relaxed mb-4">
                    {desk.desc}
                  </p>
                </div>
                <div className="pt-3 bg-surface-container-low rounded-lg p-3">
                  <div className="font-label-sm text-[11px] text-secondary uppercase tracking-wider mb-0.5">
                    {desk.badge}
                  </div>
                  <a
                    className="font-body-sm text-xs font-semibold text-primary hover:underline break-all block"
                    href={`mailto:${desk.email}`}
                  >
                    {desk.email}
                  </a>
                  {desk.phone && (
                    <div className="font-label-sm text-xs text-on-surface-variant mt-1.5 flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-secondary" />
                      <span>{desk.phone}</span>
                    </div>
                  )}
                  {desk.status && (
                    <div className="font-label-sm text-xs text-on-surface-variant mt-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{desk.status}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Interactive Correspondence Form & Secretariat Office Matrix */}
      <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Secretariat Protocol & Office Coordinates (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-slate-200/60">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div>
                  <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase font-semibold">
                    Official Headquarters
                  </span>
                  <h3 className="font-title-lg text-xl font-bold text-on-surface mt-1">
                    Regional Secretariat Office
                  </h3>
                </div>
                <Building2 className="w-7 h-7 text-primary" />
              </div>

              <div className="font-body-md text-on-surface space-y-4">
                <div className="p-4 bg-surface-container-low rounded-lg">
                  <span className="font-label-sm text-xs text-secondary uppercase tracking-wider block mb-1 font-semibold">
                    Mailing &amp; Physical Address
                  </span>
                  <p className="font-title-md font-bold text-on-surface mb-1">
                    Room 112, Materials Division Complex
                  </p>
                  <p className="text-body-sm text-xs text-secondary leading-relaxed">
                    CSIR - Institute of Minerals and Materials Technology (IMMT)
                    <br />
                    Acharya Vihar, Infocity Educational Corridor
                    <br />
                    Bhubaneswar, Odisha — 751013, India
                  </p>
                </div>

                <div className="p-4 bg-surface-container-low rounded-lg space-y-2 text-xs">
                  <span className="font-label-sm text-xs text-secondary uppercase tracking-wider block font-semibold">
                    Office Working Hours
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface font-medium">Monday through Friday</span>
                    <span className="font-semibold text-primary">09:30 AM – 05:30 PM IST</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary">2nd &amp; 4th Saturdays</span>
                    <span className="text-secondary italic">Closed for Maintenance</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary">Sundays &amp; Holidays</span>
                    <span className="text-rose-600 font-semibold">Closed</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-3 bg-surface-container rounded-lg">
                    <span className="font-label-sm text-[11px] text-secondary uppercase tracking-wide block">
                      Direct Tel
                    </span>
                    <span className="font-body-sm text-xs font-bold text-on-surface font-mono">
                      +91 674 237 4112
                    </span>
                  </div>
                  <div className="p-3 bg-surface-container rounded-lg">
                    <span className="font-label-sm text-[11px] text-secondary uppercase tracking-wide block">
                      EPABX Ext.
                    </span>
                    <span className="font-body-sm text-xs font-bold text-on-surface font-mono">
                      Extn: 432 / 448
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Protocol Box */}
            <div className="bg-surface-container-high rounded-xl p-6 shadow-sm border border-slate-200/50">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-title-md text-sm font-bold text-on-surface">
                    Official Dispatch Protocols
                  </h4>
                  <p className="font-body-sm text-xs text-secondary leading-relaxed">
                    Technical abstracts and inquiries submitted via this portal are timestamped and assigned an institutional tracking reference within 24 business hours.
                  </p>
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200/40 text-xs">
                    <span className="font-label-sm text-primary uppercase font-bold">Institutional Seal</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="font-label-sm text-secondary">IIM-HQ Kolkata Sync Enabled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CSIR Campus Mini Photo Showcase */}
            <div className="relative rounded-xl overflow-hidden shadow-sm group border border-slate-200/60">
              <div className="relative h-48 w-full">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu7hD8na2-2lD67hQrjaYB0IrzdETkzlf_j0XOdQRO0Z7Y3YRCcdaIFGbGowhmBy_CLxJzL1EOOJfYwGPOdlv1k8qKajfMoJyiZR3RLinmNfqqJUmlzUJnDQ2LvdttOfQTmCnfg1cYrvWutsTdR5GBODDbZff9VR23we4Wgz4DdquHx-ZwKBhdL9UWEG1H8rQH82iidWRgX9oodYFS_RAitDWeqCbDHv-h6GzGjgdXhLoEeI8PX7J3"
                  alt="CSIR Institute of Minerals and Materials Technology IMMT campus in Bhubaneswar"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end text-white">
                <span className="font-label-sm text-[11px] text-amber-300 tracking-wider uppercase font-semibold">
                  Nodal Research Premises
                </span>
                <span className="font-title-md text-sm font-bold">
                  Materials Division Complex &amp; Secretariat Wing
                </span>
                <span className="font-body-sm text-xs text-slate-300">Acharya Vihar, Bhubaneswar</span>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/60">
            <div className="mb-6 pb-4 border-b border-slate-100">
              <span className="font-label-sm text-xs text-primary tracking-widest uppercase font-semibold">
                Direct Transmission Portal
              </span>
              <h3 className="font-headline-sm text-xl font-bold text-on-surface mt-1">
                Official Inquiry &amp; Dispatch Form
              </h3>
              <p className="font-body-sm text-xs text-secondary mt-1">
                Complete the formal dispatch metadata. All communications are forwarded instantly to the designated Council portfolio.
              </p>
            </div>

            {/* Embedded Interactive Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* 4. Physical Location, Cartography & Transit Coordinates */}
      <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-10">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-primary" />
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold">
              Secretariat Navigation
            </span>
          </div>
          <h2 className="font-headline-md text-2xl sm:text-3xl font-bold text-on-surface">
            Campus Location &amp; Transit Hub Access
          </h2>
          <p className="font-body-md text-body-md text-secondary max-w-2xl">
            Housed within CSIR-IMMT’s premier 100-acre scientific sanctuary at Acharya Vihar, with immediate artery access to National Highway 16 and major air and rail links.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Map Canvas (8 cols) */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col border border-slate-200/60">
            <div
              className="relative w-full h-80 sm:h-96 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAC3W-QgcJ78NKTnnCdhV0Fe_fgjG6SxWBZdeaR01CvRuNmPeq7TwSXF73sfeHMqa__NYAAtzbZSjymLoAjTbHZj8Nv-mAtw6iJlnOhkdtP3NGWoNeomMKrSselk9W4svHkmVMSCelvpjihCaB_ycikE9-o3_0DjU7m_OXIkOSIme27nqxg0ZMVYBzpgFPlGDDQEHWvqTLpmTrk0jE3DiDQqKbNKpzPgOYcjDsdY8b9s3ytXWdS2un3')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded bg-primary text-white font-label-sm text-xs font-semibold flex items-center gap-1 shadow-sm">
                    <MapPin className="w-3.5 h-3.5" /> Secretariat Desk: Room 112
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/75 text-white font-label-sm text-xs">
                    Dr. Nilamani Sen Auditorium (Opposite Wing)
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/75 text-white font-label-sm text-xs">
                    Advanced Pyrometallurgy Complex
                  </span>
                </div>
                <div>
                  <p className="font-title-lg text-lg font-bold">CSIR - IMMT Bhubaneswar Campus</p>
                  <p className="font-body-sm text-xs text-slate-300 font-mono">
                    Lat: 20.2982° N, Long: 85.8317° E · Elevation: 45 m
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-secondary">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>Visitor Entry via Gate No. 1 (Acharya Vihar Square), Security Check Required with Photo ID.</span>
              </div>
              <a
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container-lowest text-on-surface hover:text-primary font-semibold transition-colors shadow-xs shrink-0 border border-slate-200"
                href="https://maps.google.com/?q=CSIR+IMMT+Bhubaneswar"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Navigation className="w-3.5 h-3.5 text-primary" />
                <span>Open in Maps / Get Directions</span>
              </a>
            </div>
          </div>

          {/* Transit Hub Coordinates Card (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3">
            {/* Airport */}
            <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-start gap-3.5 border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                <Plane className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-title-md text-sm font-bold text-on-surface">Biju Patnaik Airport</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container font-bold text-primary">
                    6.2 km
                  </span>
                </div>
                <span className="font-body-sm text-xs text-secondary mt-0.5">
                  IATA: BBI · 15–20 mins via Airport Road
                </span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-1">
                  Pre-paid taxis and app cabs readily available.
                </span>
              </div>
            </div>

            {/* Railway Station */}
            <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-start gap-3.5 border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                <Train className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-title-md text-sm font-bold text-on-surface">
                    Bhubaneswar Railway Station
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container font-bold text-primary">
                    4.8 km
                  </span>
                </div>
                <span className="font-body-sm text-xs text-secondary mt-0.5">
                  Station Code: BBS · 12–15 mins via Master Canteen
                </span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-1">
                  Expressway auto-rickshaws &amp; Mo Bus routes stop at Acharya Vihar.
                </span>
              </div>
            </div>

            {/* National Highway */}
            <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-start gap-3.5 border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-title-md text-sm font-bold text-on-surface">National Highway 16</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container font-bold text-primary">
                    1.5 km
                  </span>
                </div>
                <span className="font-body-sm text-xs text-secondary mt-0.5">
                  NH-16 Corridor · Jaydev Vihar Flyover
                </span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-1">
                  Arterial link connecting Cuttack, Kalinganagar, &amp; Berhampur.
                </span>
              </div>
            </div>

            {/* Campus Protocol Card */}
            <div className="bg-surface-container-high rounded-xl p-4 shadow-sm border border-slate-200/50">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="font-title-md text-xs font-bold text-on-surface">Security &amp; Parking Protocol</span>
              </div>
              <p className="font-body-sm text-xs text-secondary leading-snug">
                Delegates arriving by car may park at Designated Sector B parking adjacent to the Sen Auditorium. Prior clearance is recommended for exhibition vehicles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Direct Executive Desk Contacts */}
      <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-10">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-primary" />
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold">
              Office Bearers
            </span>
          </div>
          <h2 className="font-headline-md text-2xl sm:text-3xl font-bold text-on-surface">
            Direct Executive Desk Contacts
          </h2>
          <p className="font-body-md text-body-md text-secondary max-w-2xl">
            Principal chapter leadership reachable for high-level technical partnerships, council matters, and institutional representation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXECUTIVE_CONTACTS.map((exec, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/60"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-base shadow-inner">
                    {exec.initials}
                  </div>
                  <div>
                    <span
                      className={`font-label-sm text-[10px] px-2 py-0.5 rounded font-bold tracking-wider uppercase ${exec.roleBadgeClass}`}
                    >
                      {exec.role}
                    </span>
                    <h4 className="font-title-md text-sm font-bold text-on-surface mt-1">{exec.name}</h4>
                  </div>
                </div>
                <p className="font-body-sm text-xs text-secondary mb-1">{exec.designation}</p>
                <span className="font-label-sm text-[11px] text-on-surface-variant block mb-4">
                  {exec.institution}
                </span>
              </div>
              <div className="pt-3 bg-surface-container-low rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-2 font-body-sm text-xs">
                  <Mail className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <a className="text-primary hover:underline font-medium break-all" href={`mailto:${exec.email}`}>
                    {exec.email}
                  </a>
                </div>
                {exec.phone && (
                  <div className="flex items-center gap-2 font-body-sm text-xs">
                    <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span className="text-secondary font-mono">{exec.phone}</span>
                  </div>
                )}
                {exec.extra && (
                  <div className="flex items-center gap-2 font-body-sm text-xs">
                    <Handshake className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span className="text-secondary">{exec.extra}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Notice Helpline & Correspondence FAQ Accordion */}
      <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-10 mb-8">
        <div className="bg-surface-container-lowest rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Notice Brief */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-label-sm text-xs text-primary uppercase font-bold tracking-wider">
                    Secretariat Protocols
                  </span>
                </div>
                <h3 className="font-headline-sm text-xl font-bold text-on-surface">
                  Physical Memoranda &amp; Gazetted Notices
                </h3>
                <p className="font-body-md text-sm text-secondary mt-2 leading-relaxed">
                  For legal instruments, patent notifications, or official courier consignments, review these statutory chapter handling guidelines.
                </p>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-surface-container-low space-y-2 border border-slate-200/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-label-sm text-xs text-on-surface font-semibold uppercase tracking-wider">
                    National Institutional Linkage
                  </span>
                </div>
                <p className="font-body-sm text-xs text-secondary leading-relaxed">
                  Affiliated to The Indian Institute of Metals, National Head Office, &apos;Metal House&apos;, Plot 13/8, Block-GN, Sector-V, Salt Lake, Kolkata — 700091 (
                  <a
                    className="text-primary hover:underline font-semibold"
                    href="https://iim-india.net"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    iim-india.net
                  </a>
                  ).
                </p>
              </div>
            </div>

            {/* Right Column: Interactive FAQ Accordion */}
            <div className="lg:col-span-7 space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-lg bg-surface-container-low p-4 transition-all border border-slate-200/40"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-start justify-between text-left gap-3 focus:outline-none"
                    >
                      <span className="font-title-md text-sm font-semibold text-on-surface">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-primary shrink-0 mt-0.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/40 text-xs text-secondary leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

