import React from 'react';
import EventsList from '@/components/EventsList';
import Footer from '@/components/Footer';

export default function EventsPage() {
  return (
    <>
      <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-surface min-h-screen">
        <EventsList />
      </main>
      <Footer />
    </>
  );
}
