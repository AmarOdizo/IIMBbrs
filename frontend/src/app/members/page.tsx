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
      <main className="min-h-screen bg-slate-50 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Header */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-primary font-semibold">Members Directory</span>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2">
                  Chapter Directory
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                  Members & Institutional Fellows
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
                  Explore verified Life Members, Fellows, Student Scholars, and Corporate Partners of The Indian Institute of Metals • Bhubaneswar Chapter.
                </p>
              </div>
              <Link
                href="/membership"
                className="shrink-0 px-4 py-2.5 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary/90 transition shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>Apply for Membership</span>
                <span>→</span>
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
