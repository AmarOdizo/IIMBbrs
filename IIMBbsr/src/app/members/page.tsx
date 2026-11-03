'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/components/Footer';
import MembersDirectory from '@/components/MembersDirectory';
import JoinChapterSection from '@/components/JoinChapterSection';
import { Users, UserPlus, Sparkles, ArrowRight } from 'lucide-react';

function MembersPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'directory' | 'join'>(
    tabParam === 'join' ? 'join' : 'directory'
  );

  useEffect(() => {
    if (tabParam === 'join') {
      setActiveTab('join');
    } else if (tabParam === 'directory') {
      setActiveTab('directory');
    }
  }, [tabParam]);

  const handleTabChange = (tab: 'directory' | 'join') => {
    setActiveTab(tab);
    router.replace(`/members?tab=${tab}`, { scroll: false });
  };

  return (
    <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-surface min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        {/* Breadcrumb & Section Header */}
        <div className="mb-8 border-b border-surface-variant/40 pb-8">
          <nav className="flex items-center gap-2 font-label-md text-label-md text-secondary mb-4">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Home</span>
            </Link>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="text-primary font-semibold">
              {activeTab === 'join' ? 'Join Chapter & Membership' : 'Members Directory'}
            </span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Chapter Fraternal Portal</span>
              </div>
              <h1 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
                {activeTab === 'join'
                  ? 'Join IIM Bhubaneswar & Membership Tiers'
                  : 'Members & Institutional Fellows Directory'}
              </h1>
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
                {activeTab === 'join'
                  ? 'Explore our 5 membership cadre tiers, review the 4-step induction roadmap, or submit your regional chapter transfer and enrolment application.'
                  : 'Explore verified Life Members, Fellows, Student Scholars, and Corporate Partners of The Indian Institute of Metals • Bhubaneswar Chapter.'}
              </p>
            </div>

            {/* Interactive Tab Switcher Controls */}
            <div className="flex items-center p-1.5 rounded-2xl bg-surface-container-low border border-slate-200/80 shadow-xs self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => handleTabChange('directory')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-label-md text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'directory'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Members Directory</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('join')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-label-md text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'join'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Join Chapter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'directory' ? (
          <div className="flex flex-col gap-8">
            {/* Quick CTA banner at top of directory */}
            <div className="bg-gradient-to-r from-primary/10 via-primary-container/20 to-transparent p-5 sm:p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <span className="font-title-md text-sm font-bold text-on-surface">
                  Are you a metallurgist, researcher, or engineering student in Odisha?
                </span>
                <span className="font-body-sm text-xs text-secondary">
                  Join The Indian Institute of Metals to gain voting rights, Springer TIIM journal access, and research seed grants.
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleTabChange('join')}
                className="shrink-0 px-5 py-2.5 bg-primary text-on-primary font-label-md text-xs font-semibold rounded-xl hover:bg-primary-container transition shadow-sm inline-flex items-center gap-2"
              >
                <span>Join Chapter / Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Live Dynamic Members Directory Component */}
            <MembersDirectory />
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Join Chapter Section */}
            <JoinChapterSection />
          </div>
        )}
      </div>
    </main>
  );
}

export default function MembersPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen pt-32 text-center text-secondary text-sm">
            Loading members directory &amp; chapter portal...
          </div>
        }
      >
        <MembersPageContent />
      </Suspense>
      <Footer />
    </>
  );
}
