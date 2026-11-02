import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Technical Calendar & Upcoming Symposia 2026',
  description: 'Annual calendar of national symposia, green hydrogen blast furnace workshops, memorial lectures, and intercollegiate materials hackathons.',
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    title: 'Technical Calendar & Upcoming Symposia 2026 | IIM Bhubaneswar Chapter',
    description: 'Annual calendar of national symposia, green hydrogen blast furnace workshops, memorial lectures, and intercollegiate materials hackathons.',
    url: `${SITE_URL}/events`,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Technical Calendar & Upcoming Symposia 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Calendar & Upcoming Symposia 2026 | IIM Bhubaneswar Chapter',
    description: 'Annual calendar of national symposia, green hydrogen blast furnace workshops, memorial lectures, and intercollegiate materials hackathons.',
    images: [siteMetadata.ogImage],
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Events Calendar', path: '/events' },
        ])}
      />
      {children}
    </>
  );
}
