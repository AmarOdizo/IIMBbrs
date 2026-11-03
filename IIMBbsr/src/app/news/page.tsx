import React from 'react';
import NewsList from '@/components/NewsList';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Chapter News, Technical Circulars & Gazetted Notices | IIM Bhubaneswar',
  description:
    'Authoritative bulletins on metallurgical research frontiers, council resolutions, call-for-papers, award notifications, and policy memorandums across Odisha.',
};

export default function NewsPage() {
  return (
    <>
      <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-surface min-h-screen">
        <NewsList />
      </main>
      <Footer />
    </>
  );
}
