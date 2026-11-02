import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms of Service & Institutional Bylaws',
  description: 'Official terms of service, intellectual property guidelines, code of conduct, and charter bylaws governing digital usage.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service & Institutional Bylaws | IIM Bhubaneswar Chapter',
    description: 'Official terms of service, intellectual property guidelines, code of conduct, and charter bylaws governing digital usage.',
    url: `${SITE_URL}/terms`,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Terms of Service & Institutional Bylaws',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service & Institutional Bylaws | IIM Bhubaneswar Chapter',
    description: 'Official terms of service, intellectual property guidelines, code of conduct, and charter bylaws governing digital usage.',
    images: [siteMetadata.ogImage],
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Terms of Service', path: '/terms' },
        ])}
      />
      
      {children}
    </>
  );
}
