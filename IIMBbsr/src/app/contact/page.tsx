import React from 'react';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Contact & Regional Secretariat | IIM Bhubaneswar',
  description:
    'Connect with the Indian Institute of Metals, Bhubaneswar Chapter Regional Secretariat at CSIR-IMMT. Submit technical inquiries, membership applications, and academic correspondence.',
};

export default function ContactPage() {
  return (
    <>
      <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-surface min-h-screen">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
