import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProgrammesList from '@/components/ProgrammesList';

export default function ProgrammesPage() {
  return (
    <>
      <Navbar />
      <main className="w-full pt-16 sm:pt-20 bg-slate-50 min-h-screen">
        <ProgrammesList />
      </main>
      <Footer />
    </>
  );
}
