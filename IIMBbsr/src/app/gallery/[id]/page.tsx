import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import connectDB from '@/backend/db';
import { GalleryItem } from '@/backend/models/GalleryItem';
import { ArrowLeft, Calendar, Tag, Download, Share2, Sparkles, ExternalLink } from 'lucide-react';

interface GalleryDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const { id } = await params;

  let item = null;
  let relatedItems: Array<{ _id: string; title: string; imageUrl: string; category: string }> = [];

  try {
    await connectDB();
    const doc = await GalleryItem.findById(id).lean();
    if (doc) {
      item = {
        ...doc,
        _id: (doc._id as { toString(): string }).toString(),
        eventDate: doc.eventDate ? new Date(doc.eventDate).toISOString() : new Date().toISOString(),
      };

      const related = await GalleryItem.find({
        _id: { $ne: doc._id },
        category: doc.category,
        isActive: true,
      })
        .limit(4)
        .lean();

      relatedItems = related.map((r) => ({
        _id: (r._id as { toString(): string }).toString(),
        title: r.title,
        imageUrl: r.imageUrl,
        category: r.category,
      }));
    }
  } catch {
    // ignore
  }

  if (!item) {
    notFound();
  }

  const formattedDate = new Date(item.eventDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-surface min-h-screen">
      {/* Top Breadcrumb Bar */}
      <div className="w-full bg-surface-container-high py-3 px-6 lg:px-12 border-b border-surface-variant/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <nav className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-outline-variant">/</span>
            <Link href="/gallery" className="hover:text-primary transition-colors">
              Gallery
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface font-semibold truncate max-w-xs md:max-w-md">
              {item.title}
            </span>
          </nav>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Gallery</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-10 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              {item.category}
            </span>
            <span className="flex items-center gap-1 text-secondary font-label-sm text-xs">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{formattedDate}</span>
            </span>
          </div>

          <h1 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight">
            {item.title}
          </h1>

          {item.description && (
            <p className="font-body-lg text-base text-on-surface-variant leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Featured Image High Resolution Viewer */}
        <div className="relative w-full aspect-[16/10] min-h-[320px] max-h-[640px] rounded-2xl overflow-hidden shadow-xl bg-slate-950 border border-slate-200">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            unoptimized
            className="object-contain"
            priority
          />
        </div>

        {/* Actions Bar */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={item.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-label-md text-sm font-semibold transition-all shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Full Resolution</span>
            </a>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-label-md text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse All Albums</span>
          </Link>
        </div>

        {/* Related Category Albums */}
        {relatedItems.length > 0 && (
          <div className="flex flex-col gap-4 pt-6 border-t border-slate-200/60">
            <h2 className="font-headline-sm text-xl font-bold text-on-surface">
              More From &ldquo;{item.category}&rdquo;
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedItems.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/gallery/${rel._id}`}
                  className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative aspect-video bg-surface-container overflow-hidden">
                    <Image
                      src={rel.imageUrl}
                      alt={rel.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 flex flex-col">
                    <span className="font-title-md text-xs font-semibold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                      {rel.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

