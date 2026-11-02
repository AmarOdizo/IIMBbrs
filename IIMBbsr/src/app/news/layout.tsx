import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Official News, Gazettes & Circulars',
  description: 'Official circulars, call for papers, AGM election notices, awards nomination announcements, and executive reports from the Secretariat.',
  alternates: {
    canonical: '/news',
  },
  openGraph: {
    title: 'Official News, Gazettes & Circulars | IIM Bhubaneswar Chapter',
    description: 'Official circulars, call for papers, AGM election notices, awards nomination announcements, and executive reports from the Secretariat.',
    url: `${SITE_URL}/news`,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Official News, Gazettes & Circulars',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Official News, Gazettes & Circulars | IIM Bhubaneswar Chapter',
    description: 'Official circulars, call for papers, AGM election notices, awards nomination announcements, and executive reports from the Secretariat.',
    images: [siteMetadata.ogImage],
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'News & Circulars', path: '/news' },
        ])}
      />
      {children}
    </>
  );
}
