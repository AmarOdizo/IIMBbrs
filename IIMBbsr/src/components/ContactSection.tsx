'use client';

import React, { useState } from 'react';
import {
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
} from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const FAQS = [
  {
    question: 'How do I dispatch physical specimen samples or bound monographs?',
    answer:
      'All physical specimens intended for metallographic review or exhibition must be marked with sender details and dispatched via registered Speed Post to: "Attention: Hony. Secretary (Dr. Ajit Panigrahi), IIM Bhubaneswar Chapter, Old HEM Building, CSIR - Institute of Minerals & Materials Technology, Bhubaneswar — 751013, Odisha, INDIA." Please pre-notify us via email (iimbhubaneswarchapter@gmail.com) with the postal tracking number.',
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
      'Industrial partners can establish an endowed fellowship or provide travel sponsorship for student delegations attending National Metallurgists’ Day (NMD-ATM) by submitting an inquiry to iimbhubaneswarchapter@gmail.com. Corporate sponsorships are recognized in chapter circulars and conference proceedings.',
  },
];

export default function ContactSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Interactive Correspondence Form & Secretariat Office Matrix */}
      <section id="contact-form-section" className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-8 scroll-mt-24 sm:scroll-mt-32">
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
                    Secretariat Office
                  </h3>
                </div>
                <Building2 className="w-7 h-7 text-primary" />
              </div>

              <div className="font-body-md text-on-surface space-y-4">
                {/* Officer & Role */}
                <div className="p-4 bg-surface-container-low rounded-lg border-l-4 border-primary">
                  <span className="font-label-sm text-[11px] text-primary uppercase tracking-wider block mb-1 font-bold">
                    OFFICE / HONY. SECRETARY
                  </span>
                  <h4 className="font-title-md text-base font-bold text-on-surface">
                    Dr. Ajit Panigrahi
                  </h4>
                  <p className="text-body-sm text-xs text-secondary mt-0.5 font-medium leading-relaxed">
                    Hony. Secretary, The Indian Institute of Metals, Bhubaneswar Chapter
                  </p>
                </div>

                {/* Mailing & Physical Address */}
                <div className="p-4 bg-surface-container-low rounded-lg">
                  <span className="font-label-sm text-xs text-secondary uppercase tracking-wider block mb-1 font-semibold">
                    Physical &amp; Postal Address
                  </span>
                  <p className="font-title-md font-bold text-on-surface mb-0.5 text-sm">
                    Old HEM Building
                  </p>
                  <p className="text-body-sm text-xs text-secondary leading-relaxed">
                    CSIR - Institute of Minerals &amp; Materials Technology (IMMT)
                    <br />
                    Bhubaneswar — 751013, Odisha, INDIA
                  </p>
                </div>

                {/* Direct Contact Channels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <a
                    href="tel:+9106742379202"
                    className="p-3 bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors group flex flex-col"
                  >
                    <span className="font-label-sm text-[11px] text-secondary uppercase tracking-wide flex items-center gap-1.5 mb-1 font-semibold">
                      <Phone className="w-3.5 h-3.5 text-primary" />
                      Phone
                    </span>
                    <span className="font-body-sm text-xs font-bold text-on-surface font-mono group-hover:text-primary transition-colors">
                      +91 - 0674-2379202
                    </span>
                  </a>

                  <a
                    href="mailto:iimbhubaneswarchapter@gmail.com"
                    className="p-3 bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors group flex flex-col"
                  >
                    <span className="font-label-sm text-[11px] text-secondary uppercase tracking-wide flex items-center gap-1.5 mb-1 font-semibold">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      Email
                    </span>
                    <span className="font-body-sm text-xs font-bold text-primary truncate hover:underline" title="iimbhubaneswarchapter@gmail.com">
                      iimbhubaneswarchapter@gmail.com
                    </span>
                  </a>
                </div>

                {/* Office Working Hours */}
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
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div id="contact-form" className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/60 scroll-mt-24 sm:scroll-mt-32">
            <div className="mb-6 pb-4 border-b border-slate-100">
              <h3 className="font-headline-sm text-xl font-bold text-on-surface">
                Send a Message
              </h3>
              <p className="font-body-sm text-xs text-secondary mt-1">
                Fill in the details below to reach out to the Bhubaneswar Chapter secretariat.
              </p>
            </div>

            {/* Embedded Interactive Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Location & Transit Access */}
      <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-8">
        <div className="flex flex-col gap-1 mb-5">
          <h2 className="font-headline-md text-2xl font-bold text-on-surface">
            Location &amp; How to Reach
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-secondary">
            CSIR - Institute of Minerals and Materials Technology (IMMT), Acharya Vihar, Bhubaneswar — 751013, Odisha
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Interactive Map Canvas (8 cols) */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col border border-slate-200/60">
            {/* Live Interactive Google Map Embed */}
            <div className="relative w-full h-64 sm:h-72 bg-surface-container">
              <iframe
                title="CSIR-IMMT Bhubaneswar Campus Location"
                src="https://maps.google.com/maps?q=CSIR+-+Institute+of+Minerals+and+Materials+Technology,+Acharya+Vihar,+Bhubaneswar,+Odisha+751013&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-3 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <span className="text-secondary truncate">
                Old HEM Building, CSIR-IMMT Campus
              </span>
              <a
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-primary-container font-semibold transition-colors shadow-xs shrink-0"
                href="https://www.google.com/maps/dir/?api=1&destination=CSIR+-+Institute+of+Minerals+and+Materials+Technology,+Acharya+Vihar,+Bhubaneswar,+Odisha+751013"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Transit Hub Coordinates Card (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-2.5">
            {/* Airport */}
            <a
              href="https://www.google.com/maps/dir/?api=1&origin=Biju+Patnaik+International+Airport,+Bhubaneswar&destination=CSIR+-+Institute+of+Minerals+and+Materials+Technology,+Bhubaneswar"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-3 border border-slate-200/60 group flex-1"
              title="Directions from Airport"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Plane className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                    Biju Patnaik Airport
                  </span>
                  <span className="text-xs text-secondary">
                    15–20 mins via Airport Road
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container font-bold text-primary shrink-0">
                6.2 km
              </span>
            </a>

            {/* Railway Station */}
            <a
              href="https://www.google.com/maps/dir/?api=1&origin=Bhubaneswar+Railway+Station&destination=CSIR+-+Institute+of+Minerals+and+Materials+Technology,+Bhubaneswar"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-3 border border-slate-200/60 group flex-1"
              title="Directions from Railway Station"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Train className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                    Bhubaneswar Railway Station
                  </span>
                  <span className="text-xs text-secondary">
                    12–15 mins via Master Canteen
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container font-bold text-primary shrink-0">
                4.8 km
              </span>
            </a>

            {/* National Highway */}
            <a
              href="https://www.google.com/maps/dir/?api=1&origin=Jaydev+Vihar,+Bhubaneswar&destination=CSIR+-+Institute+of+Minerals+and+Materials+Technology,+Bhubaneswar"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-3 border border-slate-200/60 group flex-1"
              title="Directions from NH-16"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Car className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                    National Highway 16
                  </span>
                  <span className="text-xs text-secondary">
                    NH-16 Corridor · Jaydev Vihar
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container font-bold text-primary shrink-0">
                1.5 km
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Frequently Answered Inquiries (FAQs) */}
      <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-10 mb-8">
        <div className="bg-surface-container-lowest rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/60">
          <div className="flex flex-col gap-2 mb-6">
            <h3 className="font-headline-sm text-xl font-bold text-on-surface">
              Frequently Asked Questions
            </h3>
            <p className="font-body-md text-sm text-secondary">
              Common inquiries regarding physical specimens, membership endorsements, paper awards, and sponsorships.
            </p>
          </div>

          <div className="space-y-3">
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
      </section>
    </div>
  );
}

