import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Join Chapter • Membership Categories & Application',
  description: 'Enroll as a Life Member, Fellow, Student Affiliate, or Corporate Patron in The Indian Institute of Metals (IIM) Bhubaneswar Chapter.',
  alternates: {
    canonical: '/membership',
  },
  openGraph: {
    title: 'Join Chapter • Membership Categories & Application | IIM Bhubaneswar Chapter',
    description: 'Enroll as a Life Member, Fellow, Student Affiliate, or Corporate Patron in The Indian Institute of Metals (IIM) Bhubaneswar Chapter.',
    url: `${SITE_URL}/membership`,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Join Chapter • Membership Categories & Application',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Chapter • Membership Categories & Application | IIM Bhubaneswar Chapter',
    description: 'Enroll as a Life Member, Fellow, Student Affiliate, or Corporate Patron in The Indian Institute of Metals (IIM) Bhubaneswar Chapter.',
    images: [siteMetadata.ogImage],
  },
};

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Join Chapter', path: '/membership' },
        ])}
      />
      {children}
    </>
  );
}
