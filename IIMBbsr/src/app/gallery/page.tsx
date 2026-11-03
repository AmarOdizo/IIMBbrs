import React from 'react';
import GalleryGrid from '@/components/GalleryGrid';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Visual Repository & Photographic Chronicle | IIM Bhubaneswar',
  description:
    'Documenting four decades of metallurgical symposia, industrial expeditions, academic convocations, student conclaves, and laboratory masterclasses across Odisha.',
};

export default function GalleryPage() {
  return (
    <>
      <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-surface min-h-screen">
        <GalleryGrid />
      </main>
      <Footer />
    </>
  );
}
