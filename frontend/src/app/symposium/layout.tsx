import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteMetadata, getBreadcrumbSchema, getSymposiumEventSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: '18th National Symposium on Advanced High-Strength Steels (AHSS-2026)',
  description: 'Join leading metallurgists, plant managers, and researchers at CSIR-IMMT for the 18th AHSS Symposium. Microalloying innovations, DRI kinetics, and automotive stampability.',
  alternates: {
    canonical: '/symposium',
  },
  openGraph: {
    title: '18th National Symposium on Advanced High-Strength Steels (AHSS-2026) | IIM Bhubaneswar Chapter',
    description: 'Join leading metallurgists, plant managers, and researchers at CSIR-IMMT for the 18th AHSS Symposium. Microalloying innovations, DRI kinetics, and automotive stampability.',
    url: `${SITE_URL}/symposium`,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: '18th National Symposium on Advanced High-Strength Steels (AHSS-2026)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '18th National Symposium on Advanced High-Strength Steels (AHSS-2026) | IIM Bhubaneswar Chapter',
    description: 'Join leading metallurgists, plant managers, and researchers at CSIR-IMMT for the 18th AHSS Symposium. Microalloying innovations, DRI kinetics, and automotive stampability.',
    images: [siteMetadata.ogImage],
  },
};

export default function SymposiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: '18th AHSS Symposium', path: '/symposium' },
        ])}
      />
      <JsonLd data={getSymposiumEventSchema()} />
      {children}
    </>
  );
}
