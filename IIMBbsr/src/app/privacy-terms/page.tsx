import React from 'react';
import PrivacyTermsView from '@/components/PrivacyTermsView';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy & Terms of Affiliation | IIM Bhubaneswar',
  description:
    'Statutory data protection governance, DPDP Act compliance, peer review confidentiality, and institutional bylaws of The Indian Institute of Metals, Bhubaneswar Chapter.',
};

export default function PrivacyTermsPage() {
  return (
    <>
      <main className="w-full">
        <PrivacyTermsView initialTab="privacy" />
      </main>
      <Footer />
    </>
  );
}

