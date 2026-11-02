import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Secretariat & Executive Council Desk',
  description: 'Get in touch with the IIM Bhubaneswar Chapter Secretariat at CSIR-IMMT, Bhubaneswar. Official address, council emails, and telephone lines.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Secretariat & Executive Council Desk | IIM Bhubaneswar Chapter',
    description: 'Get in touch with the IIM Bhubaneswar Chapter Secretariat at CSIR-IMMT, Bhubaneswar. Official address, council emails, and telephone lines.',
    url: `${SITE_URL}/contact`,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Contact Secretariat & Executive Council Desk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Secretariat & Executive Council Desk | IIM Bhubaneswar Chapter',
    description: 'Get in touch with the IIM Bhubaneswar Chapter Secretariat at CSIR-IMMT, Bhubaneswar. Official address, council emails, and telephone lines.',
    images: [siteMetadata.ogImage],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact Us', path: '/contact' },
        ])}
      />
      {children}
    </>
  );
}
