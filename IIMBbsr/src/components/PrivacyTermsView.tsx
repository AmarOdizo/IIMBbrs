'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FileText,
  Lock,
  Scale,
  Printer,
  ChevronRight,
  CheckCircle2,
  Building,
  Mail,
  MapPin,
  AlertCircle,
  ExternalLink,
  Award,
  ArrowRight,
  Clock,
  BookOpen,
  Users,
  Phone,
  FileCheck,
  Percent,
} from 'lucide-react';

interface PrivacyTermsViewProps {
  initialTab?: 'privacy' | 'terms';
}

export default function PrivacyTermsView({ initialTab = 'privacy' }: PrivacyTermsViewProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(() => {
    if (typeof window !== 'undefined') {
      const tabParam = new URLSearchParams(window.location.search).get('tab');
      if (tabParam === 'terms' || tabParam === 'privacy') return tabParam;
    }
    return initialTab;
  });

  const handleTabChange = (tab: 'privacy' | 'terms') => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="w-full bg-surface min-h-screen pt-24 sm:pt-28 pb-20">
      {/* Editorial Masthead & Tab Switcher */}
      <section className="w-full bg-surface-container-low/70 border-b border-surface-variant/20 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-wider text-secondary mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-outline" />
            <span className="text-secondary">Legal &amp; Statutory Governance</span>
            <ChevronRight className="w-3.5 h-3.5 text-outline" />
            <span className="text-primary font-semibold">
              {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </span>
          </nav>

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
              {activeTab === 'privacy'
                ? 'STATUTORY GOVERNANCE & DATA PROTECTION · REF: IIM-BBS-LEGAL-PRIV-01'
                : 'STATUTORY BYLAWS & OPERATIONAL TERMS · REF: IIM-BBS-LEGAL-TOS-02'}
            </span>
          </div>

          {/* Main Title & Action Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mt-2">
            <div className="lg:col-span-8 space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight leading-tight">
                {activeTab === 'privacy'
                  ? 'Privacy Policy & Member Data Protection Governance'
                  : 'Terms & Conditions of Chapter Affiliation & Portal Use'}
              </h1>
              <p className="text-base text-on-surface-variant max-w-3xl leading-relaxed">
                {activeTab === 'privacy'
                  ? 'Outlining the collection, custody, peer review confidentiality, and institutional data stewardship standards maintained by The Indian Institute of Metals, Bhubaneswar Chapter across all digital registries, symposium submissions, and membership records.'
                  : 'The contractual bylaws, conference delegation rules, code of academic integrity, and statutory entitlements binding all members, delegates, authors, and collegiate partners of the IIM Bhubaneswar Chapter.'}
              </p>
            </div>

            {/* Quick Document Actions */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-end">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface-container text-on-surface text-xs sm:text-sm font-medium hover:bg-surface-container-high transition-colors shadow-sm"
                >
                  <Printer className="w-4 h-4 text-primary" />
                  <span>Print Formal Document</span>
                </button>
                <a
                  href="https://iim-india.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface-container text-on-surface text-xs sm:text-sm font-medium hover:bg-surface-container-high transition-colors shadow-sm"
                >
                  <ExternalLink className="w-4 h-4 text-secondary" />
                  <span>Kolkata HQ Portal</span>
                </a>
              </div>
            </div>
          </div>

          {/* Primary View Selector Tabs */}
          <div className="mt-8 pt-6 border-t border-surface-variant/20 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex p-1.5 rounded-xl bg-surface-container-lowest border border-surface-variant/30 shadow-xs">
              <button
                type="button"
                onClick={() => handleTabChange('privacy')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'privacy'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Privacy Policy</span>
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('terms')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'terms'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>Terms &amp; Conditions</span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-secondary">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Ratified Edition: January 2026</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-primary" />
                <span>CSIR-IMMT Bhubaneswar</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* KEY PILLARS / HIGHLIGHTS SECTION */}
      <section className="w-full py-10 bg-surface border-b border-surface-variant/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-primary font-bold">
                {activeTab === 'privacy' ? 'Core Pillars of Custody' : 'Key Statutory Guarantees'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface mt-1">
                {activeTab === 'privacy' ? 'Foundational Tenets of Data Stewardship' : 'Essential Charter Bylaws Summary'}
              </h2>
            </div>
            <span className="text-xs text-secondary">
              {activeTab === 'privacy' ? 'Non-negotiable ethical commitments for all research' : 'Binding on all members, authors, and collegiate units'}
            </span>
          </div>

          {activeTab === 'privacy' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-variant/20 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-on-surface mb-2">Institutional Custody</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Member records are held strictly for academic progression, conclaves, and statutory council governance; never monetized or shared with third-party marketers.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-variant/10 flex items-center gap-1.5 text-primary text-xs uppercase tracking-wider font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Non-Commercial Trust</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-variant/20 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-on-surface mb-2">Peer Review Sanctity</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Technical abstracts, unpublished metallurgy datasets, and patent-sensitive disclosures for AHSS-2026 are safeguarded under double-blind protocols.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-variant/10 flex items-center gap-1.5 text-primary text-xs uppercase tracking-wider font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Double-Blind Sealed</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-variant/20 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-on-surface mb-2">National HQ Sync</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Encrypted synchronization with IIM Kolkata Head Office (<span className="font-mono text-xs">iim-india.net</span>) for membership roll verification and TIIM journal access.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-variant/10 flex items-center gap-1.5 text-primary text-xs uppercase tracking-wider font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Kolkata Central Portal</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-variant/20 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-on-surface mb-2">Member Sovereignty</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Complete democratic autonomy to review, audit, rectify plant or university affiliations, update contact channels, and download full digital dossiers via petition.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-variant/10 flex items-center gap-1.5 text-primary text-xs uppercase tracking-wider font-semibold">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Right to Rectification</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-variant/20 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <Building className="w-5 h-5" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-primary font-bold mb-1 block">Clause 01 &amp; 02</span>
                  <h3 className="text-base font-bold text-on-surface mb-2">Statutory Affiliation</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Membership privileges governed strictly under the Constitution of The Indian Institute of Metals (Est. 1946, Incorporated under Act XXI of 1860).
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-variant/10 flex items-center gap-1.5 text-primary text-xs uppercase tracking-wider font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Act XXI of 1860</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-variant/20 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <Percent className="w-5 h-5" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-primary font-bold mb-1 block">Clause 04 &amp; 05</span>
                  <h3 className="text-base font-bold text-on-surface mb-2">Refund &amp; Transfers</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Transparent refund schedules (up to 80%), free colleague delegate substitutions with 24h notice, and force majeure protections for all events.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-variant/10 flex items-center gap-1.5 text-primary text-xs uppercase tracking-wider font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Substitutions Permitted</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-variant/20 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-primary font-bold mb-1 block">Clause 03 &amp; 06</span>
                  <h3 className="text-base font-bold text-on-surface mb-2">Academic Integrity</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Zero-tolerance standard for scientific plagiarism (&lt;12% similarity threshold). Unbending compliance with COPE editorial ethics for papers and awards.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-variant/10 flex items-center gap-1.5 text-primary text-xs uppercase tracking-wider font-semibold">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>COPE Standard</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-variant/20 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-primary font-bold mb-1 block">Clause 06 &amp; 10</span>
                  <h3 className="text-base font-bold text-on-surface mb-2">Disputes &amp; Rights</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Authors retain foundational research ownership with Springer TIIM license. Disputes resolved through binding arbitration in Bhubaneswar.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-variant/10 flex items-center gap-1.5 text-primary text-xs uppercase tracking-wider font-semibold">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Bhubaneswar Jurisdiction</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TWO-COLUMN EDITORIAL LEGAL WORKSPACE */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sticky Navigation Left Sidebar */}
            <aside className="lg:col-span-4 sticky top-28 space-y-5">
              {/* Table of Contents Card */}
              <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-variant/20 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-variant/10">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-on-surface">Sections Index</span>
                  </div>
                  <span className="text-xs text-secondary font-semibold uppercase tracking-wider">10 Articles</span>
                </div>

                <nav className="flex flex-col space-y-1 text-xs sm:text-sm">
                  {activeTab === 'privacy' ? (
                    <>
                      <a href="#priv-01" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>01. Institutional Preamble &amp; Scope</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#priv-02" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>02. Information We Collect</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#priv-03" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>03. Purpose &amp; Lawful Basis</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#priv-04" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>04. Manuscript &amp; Symposium IP</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#priv-05" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>05. Payment &amp; Fiscal Security</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#priv-06" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>06. Inter-Institutional Exchange</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#priv-07" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>07. Data Retention &amp; Archival</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#priv-08" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>08. Cookies &amp; Digital Analytics</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#priv-09" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>09. Member Rights &amp; Rectification</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#priv-10" className="flex items-center justify-between px-3 py-2 rounded-lg text-primary font-semibold bg-primary/10 hover:bg-primary/20 transition-colors group">
                        <span>10. Grievance Redressal Officer</span>
                        <ChevronRight className="w-3.5 h-3.5 text-primary" />
                      </a>
                    </>
                  ) : (
                    <>
                      <a href="#term-01" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>01. Acceptance of Terms</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#term-02" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>02. Membership Cadres &amp; Voting</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#term-03" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>03. Metallurgical Code of Conduct</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#term-04" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>04. Symposia &amp; Masterclasses</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#term-05" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>05. Cancellation &amp; Refund Schedule</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#term-06" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>06. Paper Submissions &amp; Copyright</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#term-07" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>07. Collegiate Chapters &amp; Grants</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#term-08" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>08. Digital Portal Access &amp; Use</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#term-09" className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors group">
                        <span>09. Limitation of Liability</span>
                        <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                      </a>
                      <a href="#term-10" className="flex items-center justify-between px-3 py-2 rounded-lg text-primary font-semibold bg-primary/10 hover:bg-primary/20 transition-colors group">
                        <span>10. Governing Law &amp; Arbitration</span>
                        <ChevronRight className="w-3.5 h-3.5 text-primary" />
                      </a>
                    </>
                  )}
                </nav>
              </div>

              {/* Nodal Officer Contact Card */}
              <div className="bg-surface-container-high/60 p-5 rounded-xl border border-surface-variant/20 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-on-surface">
                    {activeTab === 'privacy' ? 'Data Protection Officer' : 'Legal Secretariat Desk'}
                  </span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-on-surface-variant">
                  <p className="font-semibold text-on-surface">
                    {activeTab === 'privacy' ? 'Dr. Tarun K. Biswal' : 'Prof. S. N. Pattnaik'}
                  </p>
                  <p className="text-xs text-secondary leading-relaxed">
                    {activeTab === 'privacy'
                      ? 'Honorary Joint Secretary & Nodal Privacy Steward'
                      : 'Honorary Secretary & Convenor'}
                    <br />
                    IIM Bhubaneswar Chapter Executive Council
                  </p>
                  <div className="pt-2 space-y-2 text-xs">
                    <a
                      href={activeTab === 'privacy' ? 'mailto:privacy@iimbhubaneswar.in' : 'mailto:legal@iimbhubaneswar.in'}
                      className="flex items-center gap-2 text-on-surface hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <span>{activeTab === 'privacy' ? 'privacy@iimbhubaneswar.in' : 'legal@iimbhubaneswar.in'}</span>
                    </a>
                    <a
                      href="mailto:secretariat@iimbhubaneswar.in"
                      className="flex items-center gap-2 text-on-surface hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <span>secretariat@iimbhubaneswar.in</span>
                    </a>
                    <div className="flex items-start gap-2 text-on-surface pt-1">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Materials Division Complex, CSIR-IMMT Campus, Acharya Vihar, Bhubaneswar, Odisha — 751013</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-surface-container-lowest rounded-lg text-xs text-secondary leading-relaxed border border-surface-variant/10">
                  <span className="font-semibold text-on-surface">Statutory Response Window:</span> Requests acknowledged within 48 business hours; audited resolution delivered within 15 statutory working days.
                </div>
              </div>

              {/* Secretariat Host Institution Seal */}
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-surface-variant/20 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-secondary font-semibold">Secretariat Host Facility</span>
                  <span className="text-sm font-bold text-on-surface leading-tight">CSIR–IMMT Bhubaneswar</span>
                  <span className="text-xs text-secondary">Council of Scientific &amp; Industrial Research</span>
                </div>
              </div>
            </aside>

            {/* Right Main Legal Stream */}
            <main className="lg:col-span-8 space-y-8 bg-surface-container-lowest p-6 sm:p-10 rounded-2xl border border-surface-variant/20 shadow-xs">
              {activeTab === 'privacy' ? (
                /* ================= PRIVACY POLICY CONTENT ================= */
                <>
                  {/* Sec 01 */}
                  <article id="priv-01" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-primary text-on-primary rounded font-mono font-bold">SECTION 01</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Institutional Preamble &amp; Statutory Scope</h2>
                    </div>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      The Indian Institute of Metals (IIM), established nationally in 1946 and active through the Bhubaneswar Chapter since 1978, operates as India’s premier professional body fostering the disciplines of metallurgy, materials engineering, mineral processing, and extractive technologies. The Bhubaneswar Chapter, housed within the scientific perimeter of CSIR–Institute of Minerals and Materials Technology (CSIR-IMMT), holds institutional integrity, scientific confidentiality, and member trust as cornerstone commitments.
                    </p>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      This statutory Data Protection Governance &amp; Privacy Policy applies across all operations administered by the Chapter Secretariat, including:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 bg-surface-container-low rounded-xl flex items-start gap-3">
                        <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-on-surface">Life Members, Honorary Fellows, Ordinary Annual Members, and registered Student Chapters across Odisha.</span>
                      </div>
                      <div className="p-3.5 bg-surface-container-low rounded-xl flex items-start gap-3">
                        <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-on-surface">Registered national &amp; international delegates attending Chapter symposia, including the flagship AHSS &amp; Minerals Conclaves.</span>
                      </div>
                      <div className="p-3.5 bg-surface-container-low rounded-xl flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-on-surface">Contributing scholars submitting original technical manuscripts, abstracts, and collegiate poster presentations.</span>
                      </div>
                      <div className="p-3.5 bg-surface-container-low rounded-xl flex items-start gap-3">
                        <Building className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-on-surface">Institutional research partners and corporate patrons including Tata Steel, SAIL, Nalco, Vedanta, and academic bodies.</span>
                      </div>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 02 */}
                  <article id="priv-02" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 02</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Information We Collect</h2>
                    </div>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      In pursuit of academic coordination, scientific peer evaluations, and statutory chapter administration, the Chapter collects and curates specific tiers of information:
                    </p>
                    <div className="space-y-3 pt-2">
                      <div className="p-4 bg-surface-container-low rounded-xl">
                        <h4 className="text-sm sm:text-base font-bold text-on-surface flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          A. Membership Registry Records
                        </h4>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                          Full legal name, date of birth (for student categorization), institutional employment affiliation (e.g., CSIR-IMMT, IIT Bhubaneswar, NIT Rourkela, Tata Steel R&amp;D), academic qualifications, national IIM permanent roll number, institutional postal address, official email, and phone contact for emergency symposium circulars.
                        </p>
                      </div>
                      <div className="p-4 bg-surface-container-low rounded-xl">
                        <h4 className="text-sm sm:text-base font-bold text-on-surface flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          B. Technical &amp; Scientific Submissions
                        </h4>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                          Working draft abstracts, high-resolution microstructure micrographs, crystallographic datasets, full manuscripts, co-investigator listings, affiliation endorsements, and non-plagiarism declarations submitted for regional colloquia and peer awards.
                        </p>
                      </div>
                      <div className="p-4 bg-surface-container-low rounded-xl">
                        <h4 className="text-sm sm:text-base font-bold text-on-surface flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          C. Symposia &amp; Continuing Professional Development (CPD) Records
                        </h4>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                          Attendance timestamps at certified workshops, Continuing Professional Development credit hours, national identity verification details required for physical CSIR-IMMT campus gate security clearance, and specific dietary logistics for banquet planning.
                        </p>
                      </div>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 03 */}
                  <article id="priv-03" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 03</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Purpose &amp; Lawful Basis of Processing</h2>
                    </div>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      Data collection is strictly anchored in the institutional mandate defined under the Constitution of The Indian Institute of Metals and compliance with applicable Indian digital data protection standards (DPDP Act, 2023):
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-on-surface-variant list-none pl-0">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Statutory Council Governance:</strong> Generating member rosters for Annual General Body Meetings (AGM), dispatching election notices, verifying voting eligibility for Chapter Executive Council ballots, and printing official Chapter Gazette records.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Disbursement of Research Grants:</strong> Administering and auditing the Chapter Collegiate Seed Grant Pool (authorized ₹2.5 Lakhs annually for student materials innovation).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Credential Verification:</strong> Verifying member status for discounted registration fees at National Metallurgists Day (NMD-ATM) and regional technical symposia.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Academic Archive:</strong> Preserving historical metallurgical contributions and memorial lecture proceedings across Odisha’s mining, steel, and advanced materials sectors.</span>
                      </li>
                    </ul>
                    <div className="p-4 bg-primary/10 rounded-xl flex items-center gap-3 border border-primary/20">
                      <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                      <span className="text-xs sm:text-sm text-on-surface"><strong>Legal Guarantee:</strong> The Chapter will never sell, rent, lease, barter, or transfer personal or professional datasets to commercial marketing syndicates or unrelated third parties.</span>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 04 */}
                  <article id="priv-04" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 04</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Academic Manuscript &amp; Symposium Data Protocols</h2>
                    </div>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      We treat unpublished materials research with scholarly sanctity. When an author or student member submits an abstract or full research communication for any event organized or sponsored by the Bhubaneswar Chapter:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      <div className="p-4 bg-surface-container-low rounded-xl">
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm sm:text-base mb-2">
                          <ShieldCheck className="w-4 h-4" />
                          Double-Blind Review Custody
                        </div>
                        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                          Reviewers receive an anonymized manuscript. Metadata containing patent claims or trade secret methodologies is shielded from external disclosure until public presentation or formal archival release in chapter proceedings.
                        </p>
                      </div>
                      <div className="p-4 bg-surface-container-low rounded-xl">
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm sm:text-base mb-2">
                          <FileText className="w-4 h-4" />
                          Pre-Publication IP Protection
                        </div>
                        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                          Submissions earmarked for potential nomination to <em>Transactions of the Indian Institute of Metals (TIIM)</em> remain protected. Reviewers sign institutional nondisclosure undertakings before examining novel alloys or processing flowsheets.
                        </p>
                      </div>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 05 */}
                  <article id="priv-05" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 05</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Financial Transactions &amp; Payment Security</h2>
                    </div>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      Chapter dues, Life Membership subscriptions, and symposium delegate remittances are conducted via formal banking channels and certified payment service providers:
                    </p>
                    <div className="p-5 bg-surface-container-low rounded-xl space-y-3">
                      <div className="flex items-center gap-2 text-on-surface font-bold text-sm sm:text-base">
                        <Lock className="w-4 h-4 text-primary" />
                        Zero Raw Card or Credential Storage
                      </div>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        The Chapter portal does not store, log, or maintain debit/credit card CVVs, full 16-digit card numbers, or Net Banking credentials. All digital transactions are processed directly via PCI-DSS compliant payment gateways or verified State Bank of India institutional transfer protocols.
                      </p>
                      <div className="font-mono text-xs text-secondary pt-2 border-t border-surface-variant/10">
                        Chapter Audit Account: The Indian Institute of Metals, Bhubaneswar Chapter · Bank: SBI CSIR-IMMT Branch · Audited by Chartered Accountants appointed at AGM.
                      </div>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 06 */}
                  <article id="priv-06" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 06</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Data Sharing with IIM Kolkata &amp; Host Facilities</h2>
                    </div>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      As a constituent regional chapter of the national body, member data flows under calibrated, reciprocal inter-institutional arrangements:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-surface-container-low rounded-xl">
                        <Building className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="font-bold text-sm sm:text-base text-on-surface">IIM Head Office (Metal House, Kolkata)</span>
                          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                            Member rosters are synchronized via secure SFTP or certified API endpoints for national membership verification, journal distribution, and national council elections.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-surface-container-low rounded-xl">
                        <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="font-bold text-sm sm:text-base text-on-surface">CSIR–IMMT Campus Security Administration</span>
                          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                            For seminars and workshops hosted on the CSIR-IMMT Acharya Vihar campus, official delegate names and vehicle registration details are submitted to campus security exclusively for gate entry authorization.
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 07 */}
                  <article id="priv-07" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 07</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Data Retention &amp; Archival Schedules</h2>
                    </div>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      The Chapter retains data in accordance with statutory academic schedules and Institute bye-laws:
                    </p>
                    <div className="overflow-x-auto rounded-xl border border-surface-variant/20 shadow-xs">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-surface-container-highest text-on-surface uppercase tracking-wider font-semibold">
                          <tr>
                            <th className="py-3 px-4">Record Category</th>
                            <th className="py-3 px-4">Mandatory Retention</th>
                            <th className="py-3 px-4">Post-Period Protocol</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-container bg-surface-container-lowest">
                          <tr>
                            <td className="py-3 px-4 font-semibold text-on-surface">Life Fellow &amp; Member Rolls</td>
                            <td className="py-3 px-4 text-on-surface-variant">Permanent Historical Archive</td>
                            <td className="py-3 px-4 text-secondary">Retained in Chapter Golden Jubilee Roll</td>
                          </tr>
                          <tr className="bg-surface-container-low/40">
                            <td className="py-3 px-4 font-semibold text-on-surface">Symposium Financial Ledgers &amp; Invoices</td>
                            <td className="py-3 px-4 text-on-surface-variant">8 Financial Years (Statutory Tax)</td>
                            <td className="py-3 px-4 text-secondary">Purged under Internal Audit Supervision</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-semibold text-on-surface">Rejected Manuscript Submissions</td>
                            <td className="py-3 px-4 text-on-surface-variant">12 Months from Conclave Conclusion</td>
                            <td className="py-3 px-4 text-secondary">Digital Eradication &amp; Scrubbing</td>
                          </tr>
                          <tr className="bg-surface-container-low/40">
                            <td className="py-3 px-4 font-semibold text-on-surface">General Public Inquiries &amp; Form Fills</td>
                            <td className="py-3 px-4 text-on-surface-variant">180 Calendar Days</td>
                            <td className="py-3 px-4 text-secondary">Automatic Scheduled Purge</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 08 */}
                  <article id="priv-08" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 08</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Cookies &amp; Digital Session Analytics</h2>
                    </div>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      The Chapter’s digital portal (<span className="font-mono text-xs">iimbhubaneswar.in</span>) maintains a minimalist digital footprint. We strictly enforce the following rules:
                    </p>
                    <div className="p-4 bg-surface-container-low rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-on-surface font-bold text-sm sm:text-base">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Strictly Essential Technical Cookies Only
                      </div>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        We use session tokens solely for maintaining authenticated member access, session security during symposium paper upload, and anti-CSRF protection. We do NOT deploy invasive behavioral trackers, third-party profiling scripts, or programmatic advertising cookies.
                      </p>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 09 */}
                  <article id="priv-09" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 09</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Member Rights &amp; Data Rectification Requests</h2>
                    </div>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      Every member, delegate, and author is entitled to complete governance over their registered identity records. You possess the following enforceable statutory rights under the DPDP Act 2023:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 bg-surface-container-low rounded-xl">
                        <span className="font-bold text-sm text-on-surface block mb-1">Right of Inspection &amp; Access</span>
                        <p className="text-xs text-on-surface-variant">Request an audited digital copy of all personal records and event attendances held in chapter archives.</p>
                      </div>
                      <div className="p-3.5 bg-surface-container-low rounded-xl">
                        <span className="font-bold text-sm text-on-surface block mb-1">Right of Rectification</span>
                        <p className="text-xs text-on-surface-variant">Promptly update change of industrial employer, academic designation, postal address, or communication email.</p>
                      </div>
                      <div className="p-3.5 bg-surface-container-low rounded-xl">
                        <span className="font-bold text-sm text-on-surface block mb-1">Right to Erasure</span>
                        <p className="text-xs text-on-surface-variant">Request deletion of transient event inquiries and symposium registrations, subject to statutory 8-year tax ledger mandates.</p>
                      </div>
                      <div className="p-3.5 bg-surface-container-low rounded-xl">
                        <span className="font-bold text-sm text-on-surface block mb-1">Right to Portability</span>
                        <p className="text-xs text-on-surface-variant">Transfer membership affiliation seamlessly when relocating to other IIM chapters across India (e.g., Kolkata, Delhi, Jamshedpur).</p>
                      </div>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 10 */}
                  <article id="priv-10" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-primary text-on-primary rounded font-mono font-bold">SECTION 10</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Grievance Redressal Officer &amp; Statutory Timelines</h2>
                    </div>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      In strict compliance with statutory data privacy norms, the Chapter Executive Council has designated a Nodal Grievance Redressal Officer:
                    </p>
                    <div className="p-5 bg-surface-container-low rounded-xl space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-sm sm:text-base font-bold text-on-surface">Dr. Tarun K. Biswal</span>
                          <p className="text-xs text-secondary">Honorary Joint Secretary &amp; Nodal Privacy Steward</p>
                        </div>
                        <span className="text-xs px-2.5 py-1 bg-surface-container font-mono text-primary font-semibold rounded">
                          Statutory Desk
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        Formal petitions regarding member data discrepancies, unauthorized communication, or peer review confidentiality inquiries may be lodged via email to <a href="mailto:privacy@iimbhubaneswar.in" className="text-primary hover:underline font-semibold">privacy@iimbhubaneswar.in</a>.
                      </p>
                      <div className="text-xs text-secondary pt-2 border-t border-surface-variant/10">
                        Formal complaints acknowledged within <strong>48 hours</strong>; audited report delivered within <strong>15 statutory working days</strong>.
                      </div>
                    </div>
                  </article>
                </>
              ) : (
                /* ================= TERMS & CONDITIONS CONTENT ================= */
                <>
                  {/* Sec 01 */}
                  <article id="term-01" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-primary text-on-primary rounded font-mono font-bold">SECTION 01</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Acceptance of Terms &amp; Institutional Charter</h2>
                    </div>
                    <div className="space-y-3 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      <p>
                        1.1. These Statutory Terms &amp; Conditions (hereinafter referred to as the <strong>&quot;Terms&quot;</strong>) govern the administrative rights, institutional protocols, event registrations, membership privileges, and digital usage of the portal <em>iimbhubaneswar.in</em>, owned and administered by The Indian Institute of Metals, Bhubaneswar Chapter (registered regional chapter affiliate under the National Headquarters at Metal House, Salt Lake, Kolkata).
                      </p>
                      <p>
                        1.2. By accessing this portal, paying annual dues, enrolling in technical conferences, or applying for collegiate chapter authorization, any person, professional fellow, student member, or corporate enterprise agrees unconditionally to be bound by these Terms and the parent Constitution of The Indian Institute of Metals (Act XXI of 1860).
                      </p>
                      <div className="p-4 bg-surface-container-low rounded-xl text-on-surface text-xs sm:text-sm border border-surface-variant/10">
                        <strong>Statutory Notice:</strong> Continued participation in any Chapter seminar, plant study tour, or executive election implies irrevocable acceptance of updates ratified during biennial General Body Meetings (GBM).
                      </div>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 02 */}
                  <article id="term-02" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 02</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Membership Cadres, Fees &amp; Regional Voting Entitlements</h2>
                    </div>
                    <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      <p>
                        2.1. The Bhubaneswar Chapter operates under Chapter Regional Code <strong>#04</strong>, exercising geographic academic oversight for materials professionals and metallurgical researchers across Odisha and adjacent industrial clusters.
                      </p>
                      <div className="overflow-x-auto rounded-xl border border-surface-variant/20 shadow-xs">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-surface-container-highest text-on-surface uppercase tracking-wider font-semibold">
                            <tr>
                              <th className="py-3 px-4">Membership Cadre</th>
                              <th className="py-3 px-4">Standard Fee</th>
                              <th className="py-3 px-4">Chapter Voting Rights</th>
                              <th className="py-3 px-4">Springer TIIM Access</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-surface-container bg-surface-container-lowest">
                            <tr>
                              <td className="py-3 px-4 font-semibold text-on-surface">Student Member</td>
                              <td className="py-3 px-4">₹800 / year</td>
                              <td className="py-3 px-4 text-secondary">Non-Voting (Student Body only)</td>
                              <td className="py-3 px-4 text-primary font-semibold">Digital Abstract Edition</td>
                            </tr>
                            <tr className="bg-surface-container-low/40">
                              <td className="py-3 px-4 font-semibold text-on-surface">Annual Member (AMIIM)</td>
                              <td className="py-3 px-4">₹1,800 / year</td>
                              <td className="py-3 px-4 text-on-surface">Full Voting Eligible (1 Year Standing)</td>
                              <td className="py-3 px-4 text-primary font-semibold">Full Digital Volume</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 font-semibold text-on-surface">Life Member (LMIIM)</td>
                              <td className="py-3 px-4">₹12,500 (One-time)</td>
                              <td className="py-3 px-4 text-on-surface font-semibold">Permanent Electorate Status</td>
                              <td className="py-3 px-4 text-primary font-semibold">Print + Digital Archival</td>
                            </tr>
                            <tr className="bg-surface-container-low/40">
                              <td className="py-3 px-4 font-semibold text-on-surface">Corporate Patron</td>
                              <td className="py-3 px-4">₹50,000 / 3 Years</td>
                              <td className="py-3 px-4 text-on-surface">2 Designated Voting Delegates</td>
                              <td className="py-3 px-4 text-primary font-semibold">Institutional Portal License</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs sm:text-sm text-secondary">
                        2.2. Voting in biennial Chapter Executive Council elections is strictly reserved for members in good standing whose annual subscriptions are settled at least 30 statutory days prior to the published date of the Chapter AGM.
                      </p>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 03 */}
                  <article id="term-03" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 03</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Professional Code of Metallurgical Conduct &amp; Ethics</h2>
                    </div>
                    <div className="space-y-3 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      <p>
                        3.1. Members, conference participants, and student apprentices are mandated to preserve the dignity, safety, and honor of the metallurgical engineering profession.
                      </p>
                      <p>
                        3.2. During industrial plant tours, laboratory sessions at CSIR-IMMT, and heavy-rolling pilot facilities, delegates must adhere without reservation to institutional PPE mandates (IS 2925 safety helmets, thermodynamic blast-resistant eye protection, and safety footwear). Any non-compliance results in immediate revocation of site clearance with forfeiture of registration dues.
                      </p>
                      <p>
                        3.3. Zero discrimination on grounds of religion, race, caste, sex, or region is tolerated within Chapter forums, panels, or social assemblies.
                      </p>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 04 */}
                  <article id="term-04" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 04</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Symposia, Seminars &amp; Delegate Registration Terms</h2>
                    </div>
                    <div className="space-y-3 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      <p>
                        4.1. Admittance to flagship conventions (including the Advanced High-Strength Steels Conclave AHSS-2026 and Prof. P. K. Jena Memorial Lecture) requires valid RFID delegate badges issued by the Chapter Secretariat.
                      </p>
                      <p>
                        4.2. Delegations visiting restricted manufacturing zones (e.g., Tata Steel Kalinganagar, NALCO Smelter Angul) require submission of government-issued photo identity cards (Aadhaar/Passport) at least 72 hours prior to transit for state industrial security clearance.
                      </p>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 05 */}
                  <article id="term-05" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-primary text-on-primary rounded font-mono font-bold">SECTION 05</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Cancellation, Delegate Transfer &amp; Refund Schedule</h2>
                    </div>
                    <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      <p>
                        5.1. Registration cancellations must be communicated in writing to <em>finance@iimbhubaneswar.in</em>. Refunds will be settled under the strict timeline calibrated below:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-surface-container-low p-4 rounded-xl flex flex-col justify-between">
                          <div>
                            <span className="text-xs font-bold text-primary block mb-1">&gt; 15 Days Notice</span>
                            <span className="text-xl font-bold text-on-surface">80% Refund</span>
                          </div>
                          <p className="text-xs text-secondary mt-2">
                            Subject to 20% statutory processing &amp; GST filing deduction.
                          </p>
                        </div>
                        <div className="bg-surface-container-low p-4 rounded-xl flex flex-col justify-between">
                          <div>
                            <span className="text-xs font-bold text-secondary block mb-1">7 – 14 Days Notice</span>
                            <span className="text-xl font-bold text-on-surface">50% Refund</span>
                          </div>
                          <p className="text-xs text-secondary mt-2">
                            Delegation kit manufacturing and catering deductions applied.
                          </p>
                        </div>
                        <div className="bg-surface-container-low p-4 rounded-xl flex flex-col justify-between">
                          <div>
                            <span className="text-xs font-bold text-error block mb-1">&lt; 7 Days Notice</span>
                            <span className="text-xl font-bold text-error">0% Refund</span>
                          </div>
                          <p className="text-xs text-secondary mt-2">
                            Substitute nomination free of charge with 24h advance notice.
                          </p>
                        </div>
                      </div>
                      <p>
                        5.2. <strong>Delegate Substitution:</strong> An enrolled delegate may substitute a colleague from the identical corporate body or academic university without financial surcharge, provided written notification reaches the secretariat at least 24 hours prior to the symposium start time.
                      </p>
                      <p>
                        5.3. <strong>Force Majeure:</strong> In the event of coastal cyclones, national pandemic directives, or rail disruptions, events will transition to high-fidelity virtual broadcasts. Registration sums roll forward to the deferred edition.
                      </p>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 06 */}
                  <article id="term-06" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 06</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Technical Paper Submissions, Copyright &amp; Licensing</h2>
                    </div>
                    <div className="space-y-3 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      <p>
                        6.1. By submitting an abstract or full research monograph to Chapter publications or symposium proceedings, the corresponding author warrants that the work is original, scientifically authentic, and not concurrently under review elsewhere.
                      </p>
                      <p>
                        6.2. <strong>Plagiarism Threshold:</strong> Manuscripts undergo automated similarity checks (Turnitin/iThenticate). Any paper displaying greater than 12% non-attributed textual match is summarily discarded.
                      </p>
                      <p>
                        6.3. <strong>Copyright Grant:</strong> Authors retain intellectual sovereignty over their underlying models and patentable discoveries, granting The Indian Institute of Metals a non-exclusive license for publication and curation through Springer Nature for the <em>Transactions of the Indian Institute of Metals (TIIM)</em>.
                      </p>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 07 */}
                  <article id="term-07" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 07</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Student Chapter Governance &amp; Seed Grant Stipulations</h2>
                    </div>
                    <div className="space-y-3 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      <p>
                        7.1. Collegiate branches established at institutions (including IIT Bhubaneswar, IISER Berhampur, KIIT Deemed University, and IGIT Sarang) must maintain a minimum roll of 25 active student members and a designated faculty advisor holding current LMIIM standing.
                      </p>
                      <p>
                        7.2. <strong>Financial Grants:</strong> Collegiate branches awarded the annual ₹2,50,000 Chapter Innovation Seed Grant must submit audited Utilization Certificates (UC) certified by a registered Chartered Accountant within 90 days of fund disbursement.
                      </p>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 08 */}
                  <article id="term-08" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 08</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Digital Portal Access &amp; Acceptable Use</h2>
                    </div>
                    <div className="space-y-3 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      <p>
                        8.1. The Members Directory, event portal, and technical archives are strictly for scholarly collaboration and certified institute networking.
                      </p>
                      <p>
                        8.2. Automated data scraping, bot mining, bulk emailing, or harvesting member contact dossiers for commercial marketing is strictly illegal and subject to prosecution under Sections 43 &amp; 66 of the Information Technology Act, 2000 (India).
                      </p>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 09 */}
                  <article id="term-09" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-surface-container-highest text-on-surface rounded font-mono font-bold">SECTION 09</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Limitation of Liability &amp; Disclaimers</h2>
                    </div>
                    <div className="space-y-3 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      <p>
                        9.1. <strong>Premises Liability:</strong> While participating in assemblies hosted at CSIR-IMMT Sen Auditorium or third-party facilities, delegates assume personal responsibility for personal assets. The Chapter accepts no liability for accidental loss absent gross administrative negligence.
                      </p>
                      <p>
                        9.2. <strong>Scientific Recommendations:</strong> Technical opinions and failure analysis papers published by chapter contributors represent independent academic consensus and do not constitute statutory engineering warranties.
                      </p>
                    </div>
                  </article>

                  <div className="w-full h-px bg-surface-variant/20" />

                  {/* Sec 10 */}
                  <article id="term-10" className="scroll-mt-32 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-primary text-on-primary rounded font-mono font-bold">SECTION 10</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Governing Law, Arbitration &amp; Territorial Jurisdiction</h2>
                    </div>
                    <div className="space-y-3 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      <p>
                        10.1. These Terms shall be construed and governed in accordance with the substantive laws of the Republic of India.
                      </p>
                      <p>
                        10.2. <strong>Dispute Resolution:</strong> Any dispute arising out of membership standing or conference dues shall first be presented for amicable conciliation before the Chapter Chairman and the IIM National President.
                      </p>
                      <p>
                        10.3. <strong>Arbitration:</strong> In the event conciliation fails within 45 days, the dispute shall be resolved through binding arbitration governed by the Indian Arbitration and Conciliation Act, 1996, in Bhubaneswar.
                      </p>
                      <p>
                        10.4. The civil courts of competent jurisdiction located exclusively at <strong>Bhubaneswar, Odisha</strong> shall possess exclusive jurisdiction to adjudicate any claims.
                      </p>
                    </div>
                  </article>

                  {/* Formal Council Seal & Signatures */}
                  <div className="mt-8 pt-8 border-t border-surface-variant/20 bg-surface-container-low/40 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-primary font-bold">Formal Council Seal</span>
                        <h4 className="text-base font-bold text-on-surface">Certified Ratification &amp; Statutory Seal</h4>
                        <p className="text-xs text-secondary">Passed by Executive Resolution #BBS-2026-EX-04 on 14 January 2026</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 bg-surface-container-lowest rounded-xl border border-surface-variant/20">
                        <span className="text-[10px] uppercase tracking-wider text-secondary font-bold block mb-1">Chairman Verification</span>
                        <p className="text-sm font-bold text-on-surface">Dr. Ashok Kumar Mohanty</p>
                        <p className="text-xs text-secondary">Chairman, The Indian Institute of Metals, Bhubaneswar Chapter</p>
                        <p className="text-[11px] text-primary font-mono font-medium mt-2">Digital Signature: 0x8F9A...B301 (Authenticated)</p>
                      </div>
                      <div className="p-4 bg-surface-container-lowest rounded-xl border border-surface-variant/20">
                        <span className="text-[10px] uppercase tracking-wider text-secondary font-bold block mb-1">Honorary Secretary Endorsement</span>
                        <p className="text-sm font-bold text-on-surface">Prof. S. N. Pattnaik</p>
                        <p className="text-xs text-secondary">Honorary Secretary, CSIR-IMMT Campus Secretariat</p>
                        <p className="text-[11px] text-primary font-mono font-medium mt-2">Digital Signature: 0x4C7E...99A8 (Authenticated)</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}

