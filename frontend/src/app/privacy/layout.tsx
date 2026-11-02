import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Governance',
  description: 'Official privacy policy, personal data protection, and statutory membership confidentiality standards for IIM Bhubaneswar Chapter.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy & Data Governance | IIM Bhubaneswar Chapter',
    description: 'Official privacy policy, personal data protection, and statutory membership confidentiality standards for IIM Bhubaneswar Chapter.',
    url: `${SITE_URL}/privacy`,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Privacy Policy & Data Governance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy & Data Governance | IIM Bhubaneswar Chapter',
    description: 'Official privacy policy, personal data protection, and statutory membership confidentiality standards for IIM Bhubaneswar Chapter.',
    images: [siteMetadata.ogImage],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ])}
      />
      
      {children}
    </>
  );
}
