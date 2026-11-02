import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal & Control Center',
  description: 'Authorized administrative portal for The Indian Institute of Metals • Bhubaneswar Chapter.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
