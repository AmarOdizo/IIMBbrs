import React from 'react';
import PrivacyTermsView from '@/components/PrivacyTermsView';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy & Member Data Protection | IIM Bhubaneswar',
  description:
    'Institutional data protection governance, DPDP Act compliance, peer review confidentiality, and member rights stewardship at IIM Bhubaneswar Chapter.',
};

export default function PrivacyPage() {
  return (
    <>
      <main className="w-full">
        <PrivacyTermsView initialTab="privacy" />
      </main>
      <Footer />
    </>
  );
}
