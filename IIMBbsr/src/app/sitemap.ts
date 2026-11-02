import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iimbhubaneswar.in';
  const lastModified = new Date();

  // All 16 public, indexable canonical routes
  const publicRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  }> = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/committee', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/members', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/events', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/programmes', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/symposium', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/student-chapters', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/gallery-ahss', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/news', priority: 0.8, changeFrequency: 'daily' },
    { path: '/news-detail', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/membership', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

