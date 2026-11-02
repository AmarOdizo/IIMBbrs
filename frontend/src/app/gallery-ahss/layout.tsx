import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AHSS Symposium Visual Archive & Gallery',
  description: 'Visual monograph and archival photography documenting the 18th National Symposium on Advanced High-Strength Steels held at CSIR-IMMT.',
  alternates: {
    canonical: '/gallery-ahss',
  },
  openGraph: {
    title: 'AHSS Symposium Visual Archive & Gallery | IIM Bhubaneswar Chapter',
    description: 'Visual monograph and archival photography documenting the 18th National Symposium on Advanced High-Strength Steels held at CSIR-IMMT.',
    url: `${SITE_URL}/gallery-ahss`,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'AHSS Symposium Visual Archive & Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AHSS Symposium Visual Archive & Gallery | IIM Bhubaneswar Chapter',
    description: 'Visual monograph and archival photography documenting the 18th National Symposium on Advanced High-Strength Steels held at CSIR-IMMT.',
    images: [siteMetadata.ogImage],
  },
};

export default function GalleryAhssLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'AHSS Gallery', path: '/gallery-ahss' },
        ])}
      />
      
      {children}
    </>
  );
}
