import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { ExternalLink, Landmark, ArrowRight, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export const metadata = {
  title: 'Join IIM Bhubaneswar Chapter • Membership Information',
  description:
    'Membership applications for The Indian Institute of Metals are administered centrally via the national headquarters in Kolkata (iim-india.net). Select Bhubaneswar Chapter (Code 04) during enrollment.',
};

export default function MembershipPage() {
  return (
    <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-surface min-h-screen">
      {/* Top Banner */}
      <div className="w-full bg-surface-container-high py-3 px-6 lg:px-12 border-b border-surface-variant/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <nav className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface font-semibold">Membership Information</span>
          </nav>
          <Link
            href="/members"
            className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
          >
            <span>Browse Member Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 flex flex-col gap-10">
        {/* Main Advisory Box */}
        <div className="bg-surface-container-lowest p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-primary">
                Official Chapter Directive
              </span>
              <h1 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mt-0.5">
                How to Join the IIM Bhubaneswar Chapter
              </h1>
            </div>
          </div>

          <div className="p-4 bg-amber-50 border-l-4 border-amber-600 rounded-r-xl text-amber-950 text-sm leading-relaxed">
            <strong>Important Centralization Notice:</strong> In accordance with the constitution of{' '}
            <strong>The Indian Institute of Metals (IIM)</strong>, all individual and institutional membership applications are processed centrally by the National Head Office at Metal House, Kolkata. No direct application fees or forms are accepted locally on this website.
          </div>

          <div className="space-y-4 text-on-surface-variant text-base leading-relaxed">
            <p>
              When applying for membership, you must specify your regional affiliation so that your professional roll, voting franchise, and local notifications are routed to the Odisha regional council.
            </p>
          </div>

          {/* 3 Step Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 bg-surface-container-low rounded-xl border border-slate-200/60 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 bg-white rounded">
                  STEP 01
                </span>
                <h3 className="font-title-md text-sm font-bold text-on-surface mt-3">
                  Visit Central Portal
                </h3>
                <p className="font-body-sm text-xs text-secondary mt-1">
                  Navigate to the official national website at <strong>iim-india.net</strong> to access the digital application form.
                </p>
              </div>
            </div>

            <div className="p-5 bg-surface-container-low rounded-xl border border-slate-200/60 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 bg-white rounded">
                  STEP 02
                </span>
                <h3 className="font-title-md text-sm font-bold text-on-surface mt-3">
                  Select Chapter Code 04
                </h3>
                <p className="font-body-sm text-xs text-secondary mt-1">
                  In Section 4 (&ldquo;Chapter Affiliation&rdquo;) of the national form, choose{' '}
                  <strong className="text-primary">Bhubaneswar Chapter (Code 04)</strong>.
                </p>
              </div>
            </div>

            <div className="p-5 bg-surface-container-low rounded-xl border border-slate-200/60 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 bg-white rounded">
                  STEP 03
                </span>
                <h3 className="font-title-md text-sm font-bold text-on-surface mt-3">
                  Local Induction
                </h3>
                <p className="font-body-sm text-xs text-secondary mt-1">
                  Upon central approval, Kolkata forwards your dossier to our regional secretariat at CSIR-IMMT for official roster listing.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
            <a
              href="https://iim-india.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-label-md text-sm font-semibold bg-primary text-on-primary hover:bg-primary-container transition-all shadow-sm"
            >
              <span>Apply on iim-india.net</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <Link
              href="/members"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-label-md text-sm font-semibold bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors border border-slate-200"
            >
              <span>View Current Chapter Members</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
