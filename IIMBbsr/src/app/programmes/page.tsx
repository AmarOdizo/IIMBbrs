import React from 'react';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import ProgrammesList from '@/components/ProgrammesList';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Flagship Chapter Programmes & Honors',
  description:
    'Annual metallurgical traditions, Foundation Day celebrations, National Metallurgist Day awards, Prof. P.K. Jena Memorial series, and collegiate conclaves organized by IIM Bhubaneswar Chapter.',
  alternates: {
    canonical: '/programmes',
  },
  openGraph: {
    title: 'Flagship Chapter Programmes & Honors | IIM Bhubaneswar Chapter',
    description:
      'Seminal annual traditions advancing metallurgical research, recognizing professional excellence, and nurturing student talent in Eastern India.',
    url: 'https://iimbhubaneswar.in/programmes',
  },
};

export default function ProgrammesPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Flagship Programmes', path: '/programmes' },
        ])}
      />
      <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-surface min-h-screen">
        <ProgrammesList />
      </main>
      <Footer />
    </>
  );
}
