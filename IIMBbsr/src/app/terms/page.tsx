import React from 'react';
import PrivacyTermsView from '@/components/PrivacyTermsView';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms & Conditions of Chapter Affiliation | IIM Bhubaneswar',
  description:
    'Contractual bylaws, symposium registration rules, delegate refund schedules, code of conduct, and copyright licensing at IIM Bhubaneswar Chapter.',
};

export default function TermsPage() {
  return (
    <>
      <main className="w-full">
        <PrivacyTermsView initialTab="terms" />
      </main>
      <Footer />
    </>
  );
}
