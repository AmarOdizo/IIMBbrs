import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Collegiate Student Chapters | IIT BBS, NIT RKL, KIIT',
  description: 'Affiliated student chapters mentored by IIM Bhubaneswar Chapter across IIT Bhubaneswar, NIT Rourkela, IISER Berhampur, and KIIT Deemed University.',
  alternates: {
    canonical: '/student-chapters',
  },
  openGraph: {
    title: 'Collegiate Student Chapters | IIT BBS, NIT RKL, KIIT | IIM Bhubaneswar Chapter',
    description: 'Affiliated student chapters mentored by IIM Bhubaneswar Chapter across IIT Bhubaneswar, NIT Rourkela, IISER Berhampur, and KIIT Deemed University.',
    url: `${SITE_URL}/student-chapters`,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Collegiate Student Chapters | IIT BBS, NIT RKL, KIIT',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collegiate Student Chapters | IIT BBS, NIT RKL, KIIT | IIM Bhubaneswar Chapter',
    description: 'Affiliated student chapters mentored by IIM Bhubaneswar Chapter across IIT Bhubaneswar, NIT Rourkela, IISER Berhampur, and KIIT Deemed University.',
    images: [siteMetadata.ogImage],
  },
};

export default function StudentChaptersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Student Chapters', path: '/student-chapters' },
        ])}
      />
      {children}
    </>
  );
}
