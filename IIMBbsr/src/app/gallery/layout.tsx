import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Chapter Photo Gallery & Technical Archives',
  description: 'Visual documentation of foundation day felicitations, industrial plant immersion visits, award ceremonies, and distinguished memorial lectures.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Chapter Photo Gallery & Technical Archives | IIM Bhubaneswar Chapter',
    description: 'Visual documentation of foundation day felicitations, industrial plant immersion visits, award ceremonies, and distinguished memorial lectures.',
    url: `${SITE_URL}/gallery`,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Chapter Photo Gallery & Technical Archives',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chapter Photo Gallery & Technical Archives | IIM Bhubaneswar Chapter',
    description: 'Visual documentation of foundation day felicitations, industrial plant immersion visits, award ceremonies, and distinguished memorial lectures.',
    images: [siteMetadata.ogImage],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Media Gallery', path: '/gallery' },
        ])}
      />
      {children}
    </>
  );
}
