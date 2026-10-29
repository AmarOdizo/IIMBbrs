'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  Image as ImageIcon,
  Newspaper,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

// Data Interfaces
interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  designation?: string;
}

interface GalleryItem {
  _id: string;
  title: string;
  category: 'Symposium' | 'Lectures' | 'Ceremonies' | 'Field Visits' | 'Campus' | string;
  imageUrl: string;
  description?: string;
  eventDate?: string;
  orderIndex?: number;
  isActive?: boolean;
}

interface EventItem {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  time?: string;
  venue: string;
  description: string;
  bannerImage?: string;
  registrationUrl?: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  isFeatured?: boolean;
}

interface NewsItem {
  _id: string;
  circularNo?: string;
  title: string;
  category: string;
  summary: string;
  content?: string;
  author?: string;
  attachmentPdfUrl?: string;
  publishedAt?: string;
  isPublished?: boolean;
}

interface ContactInquiryItem {
  _id: string;
  docketId: string;
  category: string;
  fullName: string;
  email: string;
  phone?: string;
  organization: string;
  subjectRef: string;
  messageBody: string;
  attachmentUrl?: string;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Dashboard Tab
  const [activeTab, setActiveTab] = useState<'gallery' | 'events' | 'news' | 'inquiries'>('gallery');

  // Data lists
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [eventsList, setEventsList] = useState<EventItem[]>([]);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [inquiriesList, setInquiriesList] = useState<ContactInquiryItem[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Action status notification
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modals state
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Symposium',
    imageUrl: '',
    description: '',
    eventDate: new Date().toISOString().split('T')[0],
  });

  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    eventType: 'National Symposium',
    eventDate: new Date().toISOString().split('T')[0],
    time: '09:30 AM - 05:30 PM IST',
    venue: 'CSIR-IMMT Sen Auditorium, Bhubaneswar',
    description: '',
    bannerImage: '',
    status: 'Upcoming' as 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled',
  });

  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState({
    circularNo: 'CIR-2026/05',
    title: '',
    category: 'Circular',
    summary: '',
    content: '',
    attachmentPdfUrl: '',
    isPublished: true,
  });

  // Check login on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('iimbbsr_admin_token');
    const savedUser = localStorage.getItem('iimbbsr_admin_user');
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setAdminUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('iimbbsr_admin_token');
        localStorage.removeItem('iimbbsr_admin_user');
      }
    }
    setAuthChecking(false);
  }, []);

  // Fetch data when active tab changes or token changes
  useEffect(() => {
    if (!token) return;

    async function loadData() {
      setLoadingData(true);
      try {
        if (activeTab === 'gallery') {
          const res = await fetch('/api/gallery');
          const json = await res.json();
          if (json.success) setGalleryList(json.data || []);
        } else if (activeTab === 'events') {
          const res = await fetch('/api/events');
          const json = await res.json();
          if (json.success) setEventsList(json.data || []);
        } else if (activeTab === 'news') {
          const res = await fetch('/api/news');
          const json = await res.json();
          if (json.success) setNewsList(json.data || []);
        } else if (activeTab === 'inquiries') {
          const res = await fetch('/api/contact', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const json = await res.json();
          if (json.success) setInquiriesList(json.data || []);
        }
      } catch (err) {
        console.error('Failed to load tab data:', err);
      } finally {
        setLoadingData(false);
      }
    }

    loadData();
  }, [token, activeTab]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Invalid email or password.');
      }

      const receivedToken = json.data.token;
      const userObj = json.data.admin;

      localStorage.setItem('iimbbsr_admin_token', receivedToken);
      localStorage.setItem('iimbbsr_admin_user', JSON.stringify(userObj));
      setToken(receivedToken);
      setAdminUser(userObj);
      showNotification('success', `Welcome back, ${userObj.name}!`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed.';
      setLoginError(msg);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('iimbbsr_admin_token');
    localStorage.removeItem('iimbbsr_admin_user');
    setToken(null);
    setAdminUser(null);
    showNotification('success', 'Logged out successfully.');
  };

  const handleFillDemoCreds = () => {
    setLoginEmail('admin@iimbhubaneswar.in');
    setLoginPassword('Admin@123');
  };

  // ----------------- GALLERY CRUD -----------------
  const handleOpenGalleryModal = (item?: GalleryItem) => {
    if (item) {
      setEditingGalleryId(item._id);
      setGalleryForm({
        title: item.title,
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description || '',
        eventDate: item.eventDate ? new Date(item.eventDate).toISOString().split('T')[0] : '',
      });
    } else {
      setEditingGalleryId(null);
      setGalleryForm({
        title: '',
        category: 'Symposium',
        imageUrl: '',
        description: '',
        eventDate: new Date().toISOString().split('T')[0],
      });
    }
    setShowGalleryModal(true);
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.imageUrl) {
      showNotification('error', 'Please upload or provide an image URL.');
      return;
    }

    try {
      const url = editingGalleryId ? `/api/gallery/${editingGalleryId}` : '/api/gallery';
      const method = editingGalleryId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(galleryForm),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to save photograph.');

      showNotification('success', editingGalleryId ? 'Photo updated successfully!' : 'Photo added to Gallery!');
      setShowGalleryModal(false);

      const updated = await fetch('/api/gallery').then((r) => r.json());
      if (updated.success) setGalleryList(updated.data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save photo.';
      showNotification('error', msg);
    }
  };

  const handleDeleteGallery = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to delete photo.');

      setGalleryList((prev) => prev.filter((i) => i._id !== id));
      showNotification('success', 'Photograph deleted from gallery.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to delete.';
      showNotification('error', msg);
    }
  };

  // ----------------- EVENTS CRUD -----------------
  const handleOpenEventModal = (item?: EventItem) => {
    if (item) {
      setEditingEventId(item._id);
      setEventForm({
        title: item.title,
        eventType: item.eventType,
        eventDate: item.eventDate ? new Date(item.eventDate).toISOString().split('T')[0] : '',
        time: item.time || '09:30 AM - 05:30 PM IST',
        venue: item.venue,
        description: item.description,
        bannerImage: item.bannerImage || '',
        status: item.status,
      });
    } else {
      setEditingEventId(null);
      setEventForm({
        title: '',
        eventType: 'National Symposium',
        eventDate: new Date().toISOString().split('T')[0],
        time: '09:30 AM - 05:30 PM IST',
        venue: 'CSIR-IMMT Sen Auditorium, Bhubaneswar',
        description: '',
        bannerImage: '',
        status: 'Upcoming',
      });
    }
    setShowEventModal(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingEventId ? `/api/events/${editingEventId}` : '/api/events';
      const method = editingEventId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventForm),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to save event.');

      showNotification('success', editingEventId ? 'Event updated!' : 'New event created!');
      setShowEventModal(false);

      const updated = await fetch('/api/events').then((r) => r.json());
      if (updated.success) setEventsList(updated.data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save event.';
      showNotification('error', msg);
    }
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    if (!confirm(`Delete event "${title}"?`)) return;

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to delete event.');

      setEventsList((prev) => prev.filter((i) => i._id !== id));
      showNotification('success', 'Event deleted.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to delete event.';
      showNotification('error', msg);
    }
  };

  // ----------------- NEWS CRUD -----------------
  const handleOpenNewsModal = (item?: NewsItem) => {
    if (item) {
      setEditingNewsId(item._id);
      setNewsForm({
        circularNo: item.circularNo || '',
        title: item.title,
        category: item.category,
        summary: item.summary,
        content: item.content || '',
        attachmentPdfUrl: item.attachmentPdfUrl || '',
        isPublished: item.isPublished !== false,
      });
    } else {
      setEditingNewsId(null);
      setNewsForm({
        circularNo: `CIR-2026/0${newsList.length + 1}`,
        title: '',
        category: 'Circular',
        summary: '',
        content: '',
        attachmentPdfUrl: '',
        isPublished: true,
      });
    }
    setShowNewsModal(true);
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingNewsId ? `/api/news/${editingNewsId}` : '/api/news';
      const method = editingNewsId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newsForm),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to save circular.');

      showNotification('success', editingNewsId ? 'Gazette circular updated!' : 'Gazette circular published!');
      setShowNewsModal(false);

      const updated = await fetch('/api/news').then((r) => r.json());
      if (updated.success) setNewsList(updated.data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save circular.';
      showNotification('error', msg);
    }
  };

  const handleDeleteNews = async (id: string, title: string) => {
    if (!confirm(`Delete circular "${title}"?`)) return;

    try {
      const res = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to delete circular.');

      setNewsList((prev) => prev.filter((i) => i._id !== id));
      showNotification('success', 'Gazette circular deleted.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to delete circular.';
      showNotification('error', msg);
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  // ----------------- LOGIN VIEW -----------------
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 flex flex-col justify-center items-center px-4 py-12">
        <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col gap-6 text-white">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 mb-2">
              <Image src="/assets/images/logo1.svg" alt="IIM Logo" width={48} height={48} className="object-contain" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400">
              The Indian Institute of Metals • Bhubaneswar Chapter
            </span>
            <h1 className="text-2xl font-bold tracking-tight">Secretariat Admin Terminal</h1>
            <p className="text-xs text-slate-400">
              Secure console for managing Photos, Events, Gazette Circulars &amp; Dispatch Inquiries
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="loginEmail">
                Admin Email Address
              </label>
              <input
                id="loginEmail"
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@iimbhubaneswar.in"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="loginPassword">
                Security Password
              </label>
              <input
                id="loginPassword"
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-sm shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Seeded Super Admin Credentials:</span>
              <button
                type="button"
                onClick={handleFillDemoCreds}
                className="text-amber-400 hover:underline font-semibold"
              >
                Auto-fill
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 font-mono text-[11px] text-slate-300 flex flex-col gap-1">
              <span>Email: admin@iimbhubaneswar.in</span>
              <span>Pass : Admin@123</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------- AUTHENTICATED CONSOLE -----------------
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/assets/images/logo1.svg" alt="IIM Logo" width={34} height={34} className="object-contain" />
            <div>
              <div className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
                <span>IIM Bhubaneswar Chapter</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-semibold tracking-wider uppercase">
                  Live Database
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Secretariat Management Console</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-white">{adminUser?.name || 'Administrator'}</span>
              <span className="text-[10px] text-slate-400">{adminUser?.designation || adminUser?.role}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-white/10 hover:bg-rose-600/80 text-white text-xs font-semibold transition flex items-center gap-1.5"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Feedback Alert Banner */}
        {feedback && (
          <div
            className={`p-4 rounded-xl flex items-center gap-2.5 text-sm shadow-sm transition-all ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Console Nav Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Photographs &amp; Gallery</span>
            <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px]">
              {galleryList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === 'events'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Technical Events</span>
            <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px]">
              {eventsList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === 'news'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Gazette &amp; Circulars</span>
            <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px]">
              {newsList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Dispatches</span>
            <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px]">
              {inquiriesList.length}
            </span>
          </button>
        </div>

        {/* ----------------- TAB 1: GALLERY ----------------- */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Photographic Archives</h2>
                <p className="text-xs text-slate-500">
                  Upload, organize and render high-resolution photos via ImageKit CDN directly into the public Gallery.
                </p>
              </div>
              <button
                onClick={() => handleOpenGalleryModal()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-semibold shadow transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photograph</span>
              </button>
            </div>

            {loadingData ? (
              <div className="py-20 flex justify-center text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : galleryList.length === 0 ? (
              <div className="py-12 text-center text-slate-500">No gallery items yet. Add one!</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {galleryList.map((item) => (
                  <div
                    key={item._id}
                    className="group border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex flex-col shadow-xs"
                  >
                    <div className="relative h-44 w-full bg-slate-200">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-semibold tracking-wider uppercase">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                      <div>
                        <h4 className="font-semibold text-sm text-slate-900 line-clamp-1">{item.title}</h4>
                        {item.description && (
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.description}</p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">
                          {item.eventDate ? new Date(item.eventDate).toLocaleDateString() : 'Active'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenGalleryModal(item)}
                            className="p-1.5 rounded-lg bg-slate-200/70 hover:bg-slate-300 text-slate-700 transition"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteGallery(item._id, item.title)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB 2: EVENTS ----------------- */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Technical Symposia &amp; Events</h2>
                <p className="text-xs text-slate-500">
                  Manage official symposia, endowment lectures, student conclaves and field treks.
                </p>
              </div>
              <button
                onClick={() => handleOpenEventModal()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-semibold shadow transition"
              >
                <Plus className="w-4 h-4" />
                <span>Create Event</span>
              </button>
            </div>

            {loadingData ? (
              <div className="py-20 flex justify-center text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : eventsList.length === 0 ? (
              <div className="py-12 text-center text-slate-500">No events scheduled. Create one!</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Event &amp; Venue</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Date &amp; Schedule</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {eventsList.map((ev) => (
                      <tr key={ev._id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-medium">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">{ev.title}</span>
                            <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-slate-400" /> {ev.venue}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                            {ev.eventType}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col text-xs">
                            <span className="font-semibold text-slate-800">
                              {new Date(ev.eventDate).toLocaleDateString()}
                            </span>
                            <span className="text-slate-400">{ev.time || 'All Day'}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              ev.status === 'Upcoming'
                                ? 'bg-emerald-50 text-emerald-700'
                                : ev.status === 'Ongoing'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {ev.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1">
                          <button
                            onClick={() => handleOpenEventModal(ev)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(ev._id, ev.title)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB 3: NEWS & CIRCULARS ----------------- */}
        {activeTab === 'news' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Gazette Notifications &amp; Circulars</h2>
                <p className="text-xs text-slate-500">
                  Publish statutory bulletins, symposium notices, and academic achievements.
                </p>
              </div>
              <button
                onClick={() => handleOpenNewsModal()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-semibold shadow transition"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Circular</span>
              </button>
            </div>

            {loadingData ? (
              <div className="py-20 flex justify-center text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : newsList.length === 0 ? (
              <div className="py-12 text-center text-slate-500">No circulars published yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newsList.map((item) => (
                  <div
                    key={item._id}
                    className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 flex flex-col justify-between gap-3 shadow-xs"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-primary">
                          {item.circularNo || 'CIR-GEN'}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[11px] font-semibold">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.summary}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Live'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenNewsModal(item)}
                          className="p-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteNews(item._id, item.title)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB 4: CONTACT INQUIRIES ----------------- */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Contact &amp; Dispatch Inquiries</h2>
              <p className="text-xs text-slate-500">
                Official communications submitted through the live Contact Form.
              </p>
            </div>

            {loadingData ? (
              <div className="py-20 flex justify-center text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : inquiriesList.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                No contact inquiries logged yet. Test it from the Contact page!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Docket &amp; Date</th>
                      <th className="py-3 px-4">Applicant &amp; Org</th>
                      <th className="py-3 px-4">Subject &amp; Message</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Attachment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {inquiriesList.map((inq) => (
                      <tr key={inq._id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-xs text-primary block">{inq.docketId}</span>
                          <span className="text-[11px] text-slate-400">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">{inq.fullName}</span>
                            <span className="text-xs text-slate-500">{inq.email}</span>
                            <span className="text-[11px] text-slate-400">{inq.organization}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <div className="flex flex-col">
                            <span className="font-semibold text-xs text-slate-800">{inq.subjectRef}</span>
                            <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{inq.messageBody}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium uppercase">
                            {inq.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {inq.attachmentUrl ? (
                            <a
                              href={inq.attachmentUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                            >
                              <span>View File</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-slate-400 text-xs">None</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ----------------- MODAL: GALLERY ----------------- */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="font-bold text-lg text-slate-900">
                {editingGalleryId ? 'Edit Photograph' : 'Add New Photograph'}
              </h3>
              <button
                onClick={() => setShowGalleryModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Image via ImageKit <span className="text-rose-500">*</span>
                </label>
                <ImageUpload
                  value={galleryForm.imageUrl}
                  folder="/iimbbsr/gallery"
                  onChange={(url) => setGalleryForm((prev) => ({ ...prev, imageUrl: url }))}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Photograph Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Plenary Keynote Session at CSIR-IMMT"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="Symposium">Symposium</option>
                    <option value="Lectures">Lectures</option>
                    <option value="Ceremonies">Ceremonies</option>
                    <option value="Field Visits">Field Visits</option>
                    <option value="Campus">Campus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={galleryForm.eventDate}
                    onChange={(e) => setGalleryForm((prev) => ({ ...prev, eventDate: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Brief archival context..."
                  value={galleryForm.description}
                  onChange={(e) => setGalleryForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-white font-semibold text-xs shadow"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- MODAL: EVENT ----------------- */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="font-bold text-lg text-slate-900">
                {editingEventId ? 'Edit Event' : 'Create Technical Event'}
              </h3>
              <button
                onClick={() => setShowEventModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 18th National Symposium on AHSS"
                  value={eventForm.title}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Event Type</label>
                  <select
                    value={eventForm.eventType}
                    onChange={(e) => setEventForm((prev) => ({ ...prev, eventType: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="National Symposium">National Symposium</option>
                    <option value="Memorial Lecture">Memorial Lecture</option>
                    <option value="Technical Workshop">Technical Workshop</option>
                    <option value="Industrial Visit">Industrial Visit</option>
                    <option value="Colloquium">Colloquium</option>
                    <option value="Annual General Meeting">Annual General Meeting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={eventForm.status}
                    onChange={(e) => setEventForm((prev) => ({ ...prev, status: e.target.value as any }))}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Event Date</label>
                  <input
                    type="date"
                    required
                    value={eventForm.eventDate}
                    onChange={(e) => setEventForm((prev) => ({ ...prev, eventDate: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={eventForm.time}
                    onChange={(e) => setEventForm((prev) => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Venue / Location</label>
                <input
                  type="text"
                  required
                  value={eventForm.venue}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, venue: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Outline thematic sessions, keynotes, or workshop focus..."
                  value={eventForm.description}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Event Banner (ImageKit)</label>
                <ImageUpload
                  value={eventForm.bannerImage}
                  folder="/iimbbsr/events"
                  onChange={(url) => setEventForm((prev) => ({ ...prev, bannerImage: url }))}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-white font-semibold text-xs shadow"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- MODAL: NEWS ----------------- */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="font-bold text-lg text-slate-900">
                {editingNewsId ? 'Edit Gazette Circular' : 'Publish Gazette Circular'}
              </h3>
              <button
                onClick={() => setShowNewsModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-3.5 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Circular Docket Ref</label>
                  <input
                    type="text"
                    required
                    value={newsForm.circularNo}
                    onChange={(e) => setNewsForm((prev) => ({ ...prev, circularNo: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="Circular">Circular</option>
                    <option value="Symposium">Symposium</option>
                    <option value="Achievement">Achievement</option>
                    <option value="Lecture">Lecture</option>
                    <option value="Membership">Membership</option>
                    <option value="Statutory Resolution">Statutory Resolution</option>
                    <option value="Electoral Notice">Electoral Notice</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title / Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Call for Papers - AHSS 2026 Volume 2"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Summary / Preamble</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Official administrative synopsis..."
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm((prev) => ({ ...prev, summary: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Gazette Text (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Detailed notification text..."
                  value={newsForm.content}
                  onChange={(e) => setNewsForm((prev) => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Attachment / Cover Image (ImageKit)
                </label>
                <ImageUpload
                  value={newsForm.attachmentPdfUrl}
                  folder="/iimbbsr/news"
                  onChange={(url) => setNewsForm((prev) => ({ ...prev, attachmentPdfUrl: url }))}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewsModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-white font-semibold text-xs shadow"
                >
                  Publish Gazette
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
