import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import StudentChaptersList from '@/components/StudentChaptersList';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Affiliated Student Chapters | IIM Bhubaneswar',
  description:
    'Collegiate student affiliates under The Indian Institute of Metals, Bhubaneswar Chapter including IIT Bhubaneswar, NIT Rourkela, IISER Berhampur, KIIT, and VSSUT Burla.',
  alternates: {
    canonical: '/student-chapters',
  },
  openGraph: {
    title: 'Affiliated Student Chapters | IIM Bhubaneswar Chapter',
    description:
      'Collegiate student affiliates fostering metallurgy education and research across engineering universities in Odisha.',
    url: 'https://iimbhubaneswar.in/student-chapters',
  },
};

export default function StudentChaptersPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Student Chapters', path: '/student-chapters' },
        ])}
      />

      <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-slate-50/50 min-h-screen">
        {/* Editorial Masthead */}
        <section className="w-full bg-white border-b border-slate-200/80 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-primary">Student Chapters</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold uppercase tracking-wider mb-3">
                  Academic Outreach &amp; Collegiate Divisions
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                  Affiliated Student Chapters
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
                  Chartered collegiate affiliates across premier universities and technical institutes in Odisha, mentoring undergraduate and graduate researchers in materials science and metallurgical engineering.
                </p>
              </div>

              <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 self-start lg:self-end border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>6 Active University Affiliates</span>
              </div>
            </div>
          </div>
        </section>

        {/* Student Chapters Directory */}
        <StudentChaptersList />
      </main>

      <Footer />
    </>
  );
}
