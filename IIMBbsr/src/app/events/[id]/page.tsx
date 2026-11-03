import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import connectDB from '@/backend/db';
import { Event } from '@/backend/models/Event';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Download,
  Share2,
  User,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;

  let eventData = null;

  try {
    await connectDB();
    const doc = await Event.findById(id).lean();
    if (doc) {
      eventData = {
        ...doc,
        _id: (doc._id as { toString(): string }).toString(),
        eventDate: doc.eventDate ? new Date(doc.eventDate).toISOString() : new Date().toISOString(),
      };
    }
  } catch {
    // If not a valid ObjectId or DB fails
  }

  if (!eventData) {
    notFound();
  }

  const formattedDate = new Date(eventData.eventDate).toLocaleDateString('en-GB', {
    weekday: 'long',
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
            <Link href="/events" className="hover:text-primary transition-colors">
              Events
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface font-semibold truncate max-w-xs md:max-w-md">
              {eventData.title}
            </span>
          </nav>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Events</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-10 flex flex-col gap-8">
        {/* Event Header Banner */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              {eventData.eventType || 'Technical Symposium'}
            </span>
            <span
              className={`px-3 py-1 rounded font-label-sm text-label-sm font-semibold uppercase tracking-wider ${
                eventData.status === 'Upcoming'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-surface-container-high text-on-surface'
              }`}
            >
              {eventData.status || 'Upcoming'}
            </span>
            {eventData.isFeatured && (
              <span className="px-3 py-1 rounded bg-amber-100 text-amber-800 font-label-sm text-label-sm font-semibold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Featured Program
              </span>
            )}
          </div>

          <h1 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight">
            {eventData.title}
          </h1>

          {/* Date, Time, Venue Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-surface-container-low rounded-xl border border-surface-variant/30 text-on-surface">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-label-sm text-xs text-secondary uppercase font-semibold">Date</span>
                <span className="font-title-md text-sm font-bold mt-0.5">{formattedDate}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-label-sm text-xs text-secondary uppercase font-semibold">Time</span>
                <span className="font-title-md text-sm font-bold mt-0.5">
                  {eventData.time || '10:00 AM – 05:00 PM IST'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-label-sm text-xs text-secondary uppercase font-semibold">Venue</span>
                <span className="font-title-md text-sm font-bold mt-0.5">{eventData.venue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Image */}
        {eventData.bannerImage && (
          <div className="relative w-full aspect-[21/9] min-h-[260px] max-h-[460px] rounded-2xl overflow-hidden shadow-md bg-surface-container">
            <Image
              src={eventData.bannerImage}
              alt={eventData.title}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Description */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col gap-4">
          <h2 className="font-headline-sm text-xl font-bold text-on-surface border-b pb-3 border-slate-100">
            About This Event
          </h2>
          <div className="font-body-lg text-base text-on-surface-variant leading-relaxed whitespace-pre-line">
            {eventData.description}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {eventData.brochurePdfUrl ? (
                <a
                  href={eventData.brochurePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-label-md text-sm font-semibold transition-all shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Notice / Brochure</span>
                </a>
              ) : null}
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-label-md text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Calendar</span>
            </Link>
          </div>
        </div>

        {/* Speakers Section */}
        {eventData.speakers && eventData.speakers.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-headline-sm text-xl font-bold text-on-surface">
              Featured Speakers &amp; Lecturers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {eventData.speakers.map((sp: { name: string; designation?: string; topic?: string; image?: string }, index: number) => (
                <div
                  key={index}
                  className="bg-surface-container-lowest p-5 rounded-xl border border-slate-200/60 shadow-sm flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0 text-primary overflow-hidden relative">
                    {sp.image ? (
                      <Image src={sp.image} alt={sp.name} fill unoptimized className="object-cover" />
                    ) : (
                      <User className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-md text-sm font-bold text-on-surface">{sp.name}</span>
                    <span className="font-body-sm text-xs text-secondary mt-0.5">{sp.designation}</span>
                    {sp.topic && (
                      <span className="font-label-sm text-[11px] text-primary mt-1 italic">
                        Topic: {sp.topic}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

