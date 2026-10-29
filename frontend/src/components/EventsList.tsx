'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Calendar, MapPin, Clock, Tag, ExternalLink, X, Loader2, Sparkles } from 'lucide-react';

export interface EventItemData {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  time?: string;
  venue: string;
  description: string;
  bannerImage?: string;
  registrationUrl?: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled' | string;
  isFeatured?: boolean;
}

const EVENT_TYPES = [
  'All Types',
  'National Symposium',
  'Memorial Lecture',
  'Technical Workshop',
  'Industrial Visit',
  'Colloquium',
  'Annual General Meeting',
];

export default function EventsList() {
  const [events, setEvents] = useState<EventItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Upcoming' | 'Completed'>('All');
  const [selectedType, setSelectedType] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventItemData | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        let url = '/api/events';
        const params = new URLSearchParams();
        if (statusFilter !== 'All') params.append('status', statusFilter);
        if (selectedType !== 'All Types') params.append('type', selectedType);
        const qs = params.toString();
        if (qs) url += `?${qs}`;

        const res = await fetch(url);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setEvents(json.data);
        }
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [statusFilter, selectedType]);

  const filteredEvents = events.filter((ev) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      ev.title.toLowerCase().includes(q) ||
      ev.venue.toLowerCase().includes(q) ||
      ev.description.toLowerCase().includes(q) ||
      ev.eventType.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full flex flex-col gap-8 max-w-7xl mx-auto px-6 lg:px-12 py-8">
      {/* Filter and Search Bar */}
      <div className="w-full bg-surface-container-low p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container overflow-x-auto">
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                statusFilter === 'All'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              All Events ({events.length})
            </button>
            <button
              onClick={() => setStatusFilter('Upcoming')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                statusFilter === 'Upcoming'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              Upcoming Sessions
            </button>
            <button
              onClick={() => setStatusFilter('Completed')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                statusFilter === 'Completed'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              Past Symposia
            </button>
          </div>

          <span className="text-xs text-secondary font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Synchronized with Chapter Database</span>
          </span>
        </div>

        {/* Search & Type dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events by title, keyword, speaker, or venue..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-on-surface text-sm placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-xs"
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

          <div className="md:col-span-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-white text-on-surface text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-xs"
            >
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm">Fetching scheduled symposia and events from MongoDB...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="py-16 text-center bg-surface-container-low/40 rounded-2xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center">
          <Calendar className="w-10 h-10 text-primary/40 mb-3" />
          <h4 className="text-base font-bold text-slate-800">No Events Found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            {searchQuery
              ? `No events match "${searchQuery}". Try different keywords.`
              : 'No scheduled events match the selected filters.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map((ev) => {
            const dateObj = new Date(ev.eventDate);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const year = dateObj.getFullYear();

            return (
              <div
                key={ev._id}
                onClick={() => setSelectedEvent(ev)}
                className="flex flex-col justify-between rounded-2xl bg-white p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 group cursor-pointer"
              >
                <div className="flex flex-col gap-3">
                  {/* Date & Category Tag */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-1 font-mono text-primary font-bold">
                      <span className="text-2xl leading-none">{day}</span>
                      <span className="text-xs uppercase">
                        {month} {year}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] font-semibold uppercase tracking-wider">
                      {ev.eventType}
                    </span>
                  </div>

                  {/* Banner if exists */}
                  {ev.bannerImage && (
                    <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-100">
                      <Image
                        src={ev.bannerImage}
                        alt={ev.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>
                  )}

                  <h4 className="font-headline-sm text-base font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {ev.title}
                  </h4>

                  <p className="font-body-sm text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {ev.description}
                  </p>

                  <div className="flex flex-col gap-1.5 pt-2 text-xs text-slate-500 border-t border-slate-100">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{ev.venue}</span>
                    </div>
                    {ev.time && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{ev.time}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-3">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider ${
                      ev.status === 'Upcoming'
                        ? 'bg-emerald-50 text-emerald-700'
                        : ev.status === 'Ongoing'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {ev.status}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold group-hover:underline">
                    <span>View Details</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Event Details Lightbox Modal */}
      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl flex flex-col gap-5 border border-slate-200 relative"
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedEvent.bannerImage && (
              <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src={selectedEvent.bannerImage}
                  alt={selectedEvent.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                  {selectedEvent.eventType}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    selectedEvent.status === 'Upcoming'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {selectedEvent.status}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                {selectedEvent.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>
                  <strong>Date:</strong> {new Date(selectedEvent.eventDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              {selectedEvent.time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>
                    <strong>Time:</strong> {selectedEvent.time}
                  </span>
                </div>
              )}
              <div className="flex items-start gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Venue:</strong> {selectedEvent.venue}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">Overview &amp; Theme</h4>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {selectedEvent.description}
              </p>
            </div>

            {selectedEvent.registrationUrl && (
              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <a
                  href={selectedEvent.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-semibold transition shadow"
                >
                  <span>Register / Access Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

