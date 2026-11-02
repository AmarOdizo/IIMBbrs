import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Executive Committee & Chapter Leadership',
  description: 'Elected executive council, council members, past chairmen roster, and institutional advisors of The Indian Institute of Metals • Bhubaneswar Chapter.',
  alternates: {
    canonical: '/committee',
  },
  openGraph: {
    title: 'Executive Committee & Chapter Leadership | IIM Bhubaneswar Chapter',
    description: 'Elected executive council, council members, past chairmen roster, and institutional advisors of The Indian Institute of Metals • Bhubaneswar Chapter.',
    url: `${SITE_URL}/committee`,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Executive Committee & Chapter Leadership',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Executive Committee & Chapter Leadership | IIM Bhubaneswar Chapter',
    description: 'Elected executive council, council members, past chairmen roster, and institutional advisors of The Indian Institute of Metals • Bhubaneswar Chapter.',
    images: [siteMetadata.ogImage],
  },
};

export default function CommitteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Executive Committee', path: '/committee' },
        ])}
      />
      {children}
    </>
  );
}
