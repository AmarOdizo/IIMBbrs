import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Verified Members & Institutional Fellows Directory',
  description: 'Searchable directory of verified Life Members, Fellows, Student Scholars, and Corporate Partners of The Indian Institute of Metals (IIM) Bhubaneswar Chapter.',
  alternates: {
    canonical: '/members',
  },
  openGraph: {
    title: 'Verified Members & Institutional Fellows Directory | IIM Bhubaneswar Chapter',
    description: 'Searchable directory of verified Life Members, Fellows, Student Scholars, and Corporate Partners of The Indian Institute of Metals (IIM) Bhubaneswar Chapter.',
    url: `${SITE_URL}/members`,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Verified Members & Institutional Fellows Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verified Members & Institutional Fellows Directory | IIM Bhubaneswar Chapter',
    description: 'Searchable directory of verified Life Members, Fellows, Student Scholars, and Corporate Partners of The Indian Institute of Metals (IIM) Bhubaneswar Chapter.',
    images: [siteMetadata.ogImage],
  },
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Members Directory', path: '/members' },
        ])}
      />
      {children}
    </>
  );
}
