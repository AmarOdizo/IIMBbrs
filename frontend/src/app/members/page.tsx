'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MembersDirectory from '@/components/MembersDirectory';
import Link from 'next/link';

export default function MembersPage() {
  return (
    <>
      <Navbar />
      <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-surface min-h-screen pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
          {/* Breadcrumb & Header */}
          <div className="mb-8 border-b border-surface-variant/40 pb-8">
            <nav className="flex items-center gap-2 font-label-md text-label-md text-secondary mb-4">
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span>Home</span>
              </Link>
              <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
              <span className="text-primary font-semibold">Members Directory</span>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-widest mb-3">
                  Chapter Directory
                </span>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Members &amp; Institutional Fellows
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
                  Explore verified Life Members, Fellows, Student Scholars, and Corporate Partners of The Indian Institute of Metals • Bhubaneswar Chapter.
                </p>
              </div>
              <Link
                href="/membership"
                className="shrink-0 px-5 py-2.5 bg-primary text-on-primary font-label-md text-label-md font-semibold rounded-lg hover:bg-primary-container transition shadow-sm inline-flex items-center gap-2 self-start sm:self-auto"
              >
                <span>Apply for Membership</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Live Dynamic Members Directory Component */}
          <MembersDirectory />
        </div>
      </main>
      <Footer />
    </>
  );
}
