import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import CommitteeList from '@/components/CommitteeList';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema } from '@/lib/seo';
import { Building2, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Executive Committee (2026–27) | IIM Bhubaneswar Chapter',
  description:
    'Executive Committee and Office Bearers of The Indian Institute of Metals (IIM) Bhubaneswar Chapter for the 2026–27 biennial term, headquartered at CSIR-IMMT Bhubaneswar.',
  alternates: {
    canonical: '/committee',
  },
  openGraph: {
    title: 'Executive Committee (2026–27) | IIM Bhubaneswar Chapter',
    description:
      'Executive Committee and Council leadership of The Indian Institute of Metals (IIM) Bhubaneswar Chapter.',
    url: 'https://iimbhubaneswar.in/committee',
  },
};

export default function CommitteePage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Executive Committee', path: '/committee' },
        ])}
      />

      <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-slate-50/50 min-h-screen">
        {/* Editorial Masthead / Header Block */}
        <section className="w-full bg-white border-b border-slate-200/80 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-primary">Committee</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold uppercase tracking-wider mb-3">
                  Council Governance • 2026–27
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                  Executive Committee &amp; Office Bearers
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
                  Council leadership and executive members of The Indian Institute of Metals (IIM) Bhubaneswar Chapter, elected to steer chapter initiatives, academic partnerships, and industrial outreach.
                </p>
              </div>

              {/* Council Badge Strip */}
              <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 self-start lg:self-end border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Current Biennial Term: 2026–27</span>
              </div>
            </div>
          </div>
        </section>

        {/* Committee List (Cards Grid & Filters) */}
        <section className="w-full py-8">
          <CommitteeList />
        </section>

        {/* Secretariat Official Contact Block */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>Chapter Secretariat Desk</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Official Correspondence &amp; Secretariat
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  For formal communications, institutional endorsements, or membership verifications, please reach out to the Chapter Secretariat.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Old HEM Building, CSIR-IMMT, Bhubaneswar - 751013, Odisha</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <a href="mailto:iimbhubaneswarchapter@gmail.com" className="hover:text-primary transition-colors">
                      iimbhubaneswarchapter@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span>+91 - 8847834015 (Mon–Fri, 10 AM – 5 PM)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-500">Affiliation:</span>
                    <a
                      href="https://iim-india.net"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      IIM Head Office, Kolkata (iim-india.net)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-col gap-3 shrink-0">
                <Link
                  href="/membership"
                  className="px-4 py-2.5 bg-primary text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-primary-container transition shadow-xs text-center flex items-center justify-center gap-1.5"
                >
                  <span>Join Chapter</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2.5 bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl hover:bg-slate-200 transition text-center"
                >
                  <span>Contact Secretariat</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
