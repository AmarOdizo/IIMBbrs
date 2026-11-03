import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import connectDB from '@/backend/db';
import { NewsCircular } from '@/backend/models/NewsCircular';
import {
  ArrowLeft,
  Calendar,
  FileText,
  Download,
  Share2,
  CheckCircle,
  Building,
  User,
  Sparkles,
} from 'lucide-react';

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;

  let article = null;
  let relatedNews: Array<{ _id: string; title: string; category: string; publishedAt: string }> = [];

  try {
    await connectDB();
    const doc = await NewsCircular.findById(id).lean();
    if (doc) {
      article = {
        ...doc,
        _id: (doc._id as { toString(): string }).toString(),
        publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString() : new Date().toISOString(),
      };

      const related = await NewsCircular.find({
        _id: { $ne: doc._id },
        isPublished: true,
      })
        .sort({ publishedAt: -1 })
        .limit(3)
        .lean();

      relatedNews = related.map((r) => ({
        _id: (r._id as { toString(): string }).toString(),
        title: r.title,
        category: r.category,
        publishedAt: r.publishedAt ? new Date(r.publishedAt).toISOString() : new Date().toISOString(),
      }));
    }
  } catch {
    // ignore
  }

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="w-full pt-24 sm:pt-28 lg:pt-28 bg-surface min-h-screen">
      {/* Top Utility Bar */}
      <div className="w-full bg-surface-container-high py-3 px-6 lg:px-12 border-b border-surface-variant/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <nav className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-outline-variant">/</span>
            <Link href="/news" className="hover:text-primary transition-colors">
              News &amp; Circulars
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface font-semibold truncate max-w-xs md:max-w-md">
              {article.title}
            </span>
          </nav>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Circulars</span>
          </Link>
        </div>
      </div>

      {/* Article Content Container */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-10 flex flex-col gap-8">
        {/* Meta Bar */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-primary text-on-primary font-label-sm text-label-sm uppercase px-3 py-1 rounded font-semibold tracking-wider">
              {article.category}
            </span>
            {article.circularNo && (
              <span className="bg-surface-container-high text-on-surface font-label-sm text-label-sm px-3 py-1 rounded font-mono tracking-widest uppercase">
                REF: {article.circularNo}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm font-semibold uppercase tracking-wider bg-primary-fixed/40 px-2.5 py-1 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Gazetted Notice
            </span>
          </div>

          <h1 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 py-3 px-4 bg-surface-container-low rounded-xl text-xs text-secondary border border-slate-200/50">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Gazetted: {formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary" />
              <span>Authority: {article.author || 'Secretariat Desk'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building className="w-4 h-4 text-primary" />
              <span>CSIR-IMMT Bhubaneswar</span>
            </div>
          </div>
        </div>

        {/* Executive Abstract Box */}
        {article.summary && (
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border-l-4 border-primary border border-slate-200/60">
            <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold block mb-2">
              Executive Synopsis
            </span>
            <p className="font-body-lg text-base text-on-surface font-medium leading-relaxed italic">
              &ldquo;{article.summary}&rdquo;
            </p>
          </div>
        )}

        {/* Body Content */}
        {article.content && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/60 flex flex-col gap-4 font-body-lg text-base text-on-surface-variant leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        )}

        {/* Official Annexure / Download Box */}
        {article.attachmentPdfUrl && (
          <div className="bg-surface-container-high rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-title-md text-base font-bold text-on-surface">
                  Official Gazette &amp; Technical Annexure
                </h3>
                <p className="font-body-sm text-xs text-secondary">
                  Complete technical specification dossier authorized by Executive Council
                </p>
              </div>
            </div>

            <a
              href={article.attachmentPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-container text-on-primary font-label-md text-sm rounded-xl font-semibold transition-all shadow-sm shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Docket</span>
            </a>
          </div>
        )}

        {/* Council Endorsement Footer */}
        <div className="bg-surface-container-low p-6 rounded-xl border border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-secondary">
          <div className="flex flex-col">
            <span className="font-bold text-on-surface text-sm">Secretariat Seal Applied</span>
            <span>Recorded in Chapter Archives · The Indian Institute of Metals, Bhubaneswar</span>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Dispatches</span>
          </Link>
        </div>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="flex flex-col gap-4 pt-6 border-t border-slate-200">
            <h3 className="font-headline-sm text-lg font-bold text-on-surface">
              Recent Related Circulars
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedNews.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/news/${rel._id}`}
                  className="bg-surface-container-lowest p-4 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-2 group"
                >
                  <span className="font-label-sm text-[11px] text-primary font-semibold uppercase">
                    {rel.category}
                  </span>
                  <h4 className="font-title-md text-xs font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <span className="font-body-sm text-[11px] text-secondary">
                    {new Date(rel.publishedAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
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

