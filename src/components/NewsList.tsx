'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  FileText,
  Calendar,
  ExternalLink,
  Download,
  X,
  Loader2,
  Tag,
  ArrowRight,
  User,
} from 'lucide-react';

export interface NewsItemData {
  _id: string;
  circularNo?: string;
  title: string;
  category: string;
  summary: string;
  content?: string;
  author?: string;
  attachmentPdfUrl?: string;
  publishedAt?: string;
  createdAt?: string;
  isPublished?: boolean;
}

const NEWS_CATEGORIES = [
  'All Dispatches',
  'Circular',
  'Symposium',
  'Achievement',
  'Lecture',
  'Membership',
  'Statutory Resolution',
  'Electoral Notice',
];

export default function NewsList() {
  const [news, setNews] = useState<NewsItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Dispatches');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<NewsItemData | null>(null);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        let url = '/api/news';
        const params = new URLSearchParams();
        if (selectedCategory !== 'All Dispatches') {
          params.append('category', selectedCategory);
        }
        if (searchQuery.trim()) {
          params.append('search', searchQuery.trim());
        }
        const qs = params.toString();
        if (qs) url += `?${qs}`;

        const res = await fetch(url);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setNews(json.data);
        }
      } catch (err) {
        console.error('Failed to load news:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Category Pills & Live Search Filter */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circulars by docket reference, headline, or keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-nowrap">
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Live Dispatches Section Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <h3 className="text-lg font-bold text-slate-900">Recent Circulars &amp; Dispatches</h3>
        </div>
        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
          {news.length} {news.length === 1 ? 'Dispatch' : 'Dispatches'} Live
        </span>
      </div>

      {/* News Cards Stream */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm">Fetching gazette notifications from MongoDB...</p>
        </div>
      ) : news.length === 0 ? (
        <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center">
          <FileText className="w-10 h-10 text-primary/40 mb-3" />
          <h4 className="text-base font-bold text-slate-800">No Dispatches Found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            {searchQuery
              ? `No circulars matched "${searchQuery}". Try different keywords.`
              : `No dispatches listed under "${selectedCategory}".`}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {news.map((item) => {
            const pubDate = item.publishedAt || item.createdAt;
            const dateStr = pubDate
              ? new Date(pubDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Live';

            return (
              <article
                key={item._id}
                onClick={() => setActiveArticle(item)}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-slate-200/80 flex flex-col justify-between gap-4 group cursor-pointer"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-primary/10 text-primary font-mono text-xs font-bold uppercase">
                        {item.circularNo || 'CIR-GEN'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {dateStr}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.author || 'Secretariat Bureau'}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {item.attachmentPdfUrl && (
                      <span className="inline-flex items-center gap-1 text-slate-600 hover:text-primary">
                        <Download className="w-3.5 h-3.5" />
                        <span>Attachment</span>
                      </span>
                    )}
                    <span className="text-primary font-semibold inline-flex items-center gap-1 group-hover:underline">
                      <span>Read Gazette</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Gazette Detail Reader Modal */}
      {activeArticle && (
        <div
          onClick={() => setActiveArticle(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl flex flex-col gap-5 border border-slate-200 relative"
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-primary/10 text-primary font-mono text-xs font-bold uppercase">
                {activeArticle.circularNo || 'CIR-GEN'}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                {activeArticle.category}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 leading-tight">
              {activeArticle.title}
            </h3>

            <div className="flex items-center gap-4 text-xs text-slate-500 border-y border-slate-100 py-2.5">
              <span>
                <strong>Published:</strong>{' '}
                {activeArticle.publishedAt
                  ? new Date(activeArticle.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Active'}
              </span>
              <span>•</span>
              <span>
                <strong>Authority:</strong> {activeArticle.author || 'Secretariat Bureau'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/50 text-xs sm:text-sm text-amber-900 leading-relaxed italic">
              &ldquo;{activeArticle.summary}&rdquo;
            </div>

            {activeArticle.content && (
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {activeArticle.content}
              </div>
            )}

            {activeArticle.attachmentPdfUrl && (
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Official Docket Document</span>
                <a
                  href={activeArticle.attachmentPdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-semibold transition shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / View Attachment</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

