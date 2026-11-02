import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Chapter Gazette & Announcement Detail',
  description: 'Official gazetted circular, technical paper calls, AGM election notice, or secretariat report details from IIM Bhubaneswar Chapter.',
  alternates: {
    canonical: '/news-detail',
  },
  openGraph: {
    title: 'Chapter Gazette & Announcement Detail | IIM Bhubaneswar Chapter',
    description: 'Official gazetted circular, technical paper calls, AGM election notice, or secretariat report details from IIM Bhubaneswar Chapter.',
    url: `${SITE_URL}/news-detail`,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Chapter Gazette & Announcement Detail',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chapter Gazette & Announcement Detail | IIM Bhubaneswar Chapter',
    description: 'Official gazetted circular, technical paper calls, AGM election notice, or secretariat report details from IIM Bhubaneswar Chapter.',
    images: [siteMetadata.ogImage],
  },
};

export default function NewsDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Gazette Detail', path: '/news-detail' },
        ])}
      />
      
      {children}
    </>
  );
}
