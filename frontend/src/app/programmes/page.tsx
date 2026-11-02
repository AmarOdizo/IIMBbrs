import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProgrammesList from '@/components/ProgrammesList';

export default function ProgrammesPage() {
  return (
    <>
      <Navbar />
      <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-surface min-h-screen">
        <ProgrammesList />
      </main>
      <Footer />
    </>
  );
}
