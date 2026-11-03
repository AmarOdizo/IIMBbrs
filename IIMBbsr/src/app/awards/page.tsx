import React from 'react';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import AwardsList from '@/components/AwardsList';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Chapter Awards, Honors & Fellowships | IIM Bhubaneswar',
  description:
    'Annual metallurgical traditions, Foundation Day celebrations, National Metallurgist Day (NMD) awards, Prof. P.K. Jena Memorial medals, and collegiate conclaves organized by IIM Bhubaneswar Chapter.',
  alternates: {
    canonical: '/awards',
  },
  openGraph: {
    title: 'Chapter Awards, Honors & Fellowships | IIM Bhubaneswar Chapter',
    description:
      'Seminal annual traditions and honors recognizing metallurgical excellence, research breakthrough citations, and collegiate talent in Eastern India.',
    url: 'https://iimbhubaneswar.in/awards',
  },
};

export default function AwardsPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Awards & Honors', path: '/awards' },
        ])}
      />
      <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-surface min-h-screen">
        <AwardsList />
      </main>
      <Footer />
    </>
  );
}

