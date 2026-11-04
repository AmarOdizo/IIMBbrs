'use client';

import * as XLSX from 'xlsx';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  LogOut,
  ArrowLeft,
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
  Users,
  FileCheck,
  FileSpreadsheet,
  Ticket,
  BarChart3,
  Search,
  Building2,
  ShieldCheck,
  Sparkles,
  KeyRound,
} from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

// --- DATA INTERFACES ---
interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  designation?: string;
}

interface StatsData {
  totalMembers: number;
  cadreComposition: {
    lifeMembers: number;
    studentMembers: number;
    corporateMembers: number;
  };
  pendingApplications: number;
  totalDelegates: number;
  papersInReview: number;
  totalCirculars: number;
}

interface AuditLogItem {
  _id: string;
  adminName: string;
  action: string;
  targetEntity: string;
  details: string;
  ipAddress?: string;
  createdAt: string;
}

interface MemberItem {
  _id: string;
  memberCode: string;
  name: string;
  category: string;
  organization: string;
  city: string;
  state?: string;
  status: 'Active' | 'Inactive';
}


interface ApplicationItem {
  _id: string;
  docketNo: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  cadreSought: string;
  verificationStatus: string;
  remarks?: string;
  createdAt: string;
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

interface RegistrationItem {
  _id: string;
  symposiumTitle: string;
  delegateName: string;
  email: string;
  phone?: string;
  institution: string;
  tier: string;
  feeAmount: number;
  mode: string;
  paymentStatus: string;
  badgeQrCode?: string;
  createdAt: string;
}

interface PaperItem {
  _id: string;
  paperTitle: string;
  track: string;
  authors: string[];
  correspondingAuthor: {
    name: string;
    email: string;
    institution?: string;
  };
  reviewStatus: string;
}

interface NewsItem {
  _id: string;
  circularNo?: string;
  title: string;
  category: string;
  summary: string;
  content?: string;
  attachmentPdfUrl?: string;
  publishedAt?: string;
  isPublished?: boolean;
}

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
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
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [token, setTokenState] = useState<string | null>(null);
  const [adminUser, setAdminUserState] = useState<AdminUser | null>(null);
  useEffect(() => {
    const syncAuth = () => {
      try {
        const storedToken = localStorage.getItem('iimbbsr_admin_token');
        const storedUser = localStorage.getItem('iimbbsr_admin_user');
        setTokenState(storedToken || null);
        if (storedUser) {
          try {
            setAdminUserState(JSON.parse(storedUser));
          } catch {
            setAdminUserState(null);
          }
        } else {
          setAdminUserState(null);
        }
      } catch {
        setTokenState(null);
        setAdminUserState(null);
      }
    };

    const timer = setTimeout(() => {
      syncAuth();
    }, 0);

    window.addEventListener('storage', syncAuth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', syncAuth);
    };
  }, []);

  const setToken = (t: string | null) => {
    setTokenState(t);
    try {
      if (t) localStorage.setItem('iimbbsr_admin_token', t);
      else localStorage.removeItem('iimbbsr_admin_token');
    } catch {}
  };

  const setAdminUser = (u: AdminUser | null) => {
    setAdminUserState(u);
    try {
      if (u) localStorage.setItem('iimbbsr_admin_user', JSON.stringify(u));
      else localStorage.removeItem('iimbbsr_admin_user');
    } catch {}
  };

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Tab
  type TabType =
    | 'overview'
    | 'members'
    | 'applications'
    | 'events'
    | 'symposium'
    | 'news'
    | 'gallery'
    | 'inquiries';

  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const handleSwitchTab = (tabId: TabType) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      const tabsEl = document.getElementById('admin-tabs-bar');
      if (tabsEl) {
        const rect = tabsEl.getBoundingClientRect();
        const headerH = window.innerWidth >= 640 ? 80 : 64;
        if (rect.top <= headerH + 10) {
          window.scrollTo({
            top: window.scrollY + rect.top - headerH - 8,
            behavior: 'smooth',
          });
        }
      }
    }
  };
  const [loadingData, setLoadingData] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Data Lists
  const [stats, setStats] = useState<StatsData | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [membersList, setMembersList] = useState<MemberItem[]>([]);
  const [applicationsList, setApplicationsList] = useState<ApplicationItem[]>([]);
  const [eventsList, setEventsList] = useState<EventItem[]>([]);
  const [registrationsList, setRegistrationsList] = useState<RegistrationItem[]>([]);
  const [papersList, setPapersList] = useState<PaperItem[]>([]);
  const [sympSubTab, setSympSubTab] = useState<'delegates' | 'papers'>('delegates');
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [inquiriesList, setInquiriesList] = useState<ContactInquiryItem[]>([]);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importPreview, setImportPreview] = useState<any[]>([]);
  const [importLoading, setImportLoading] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSpreadsheetFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setImportStatus(null);
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rawJson: any[] = XLSX.utils.sheet_to_json(worksheet);

      const parsedRows: any[] = [];
      rawJson.forEach((row) => {
        const memberCode = (
          row.memberCode ||
          row.membershipId ||
          row['Member Code'] ||
          row['Membership ID'] ||
          row['Roll No'] ||
          row['RollNo'] ||
          ''
        ).toString().trim();

        const name = (
          row.name ||
          row['Full Name'] ||
          row['Name'] ||
          row['Member Name'] ||
          ''
        ).toString().trim();

        if (memberCode && name) {
          parsedRows.push({
            memberCode: memberCode.toUpperCase(),
            name,
            category: (row.category || row['Category'] || 'Life Member').toString().trim(),
            organization: (row.organization || row['Organization'] || row['Institution'] || 'General').toString().trim(),
            designation: (row.designation || row['Designation'] || '').toString().trim(),
            email: (row.email || row['Email'] || '').toString().trim(),
            phone: (row.phone || row['Phone'] || row['Mobile'] || '').toString().trim(),
            city: (row.city || row['City'] || 'Bhubaneswar').toString().trim(),
            state: (row.state || row['State'] || 'Odisha').toString().trim(),
          });
        }
      });

      if (parsedRows.length === 0) {
        setImportStatus('Error: No valid member rows found. Ensure sheet has headers like "Membership ID" and "Full Name".');
      }
      setImportPreview(parsedRows);
    } catch (err: any) {
      setImportStatus('Failed to read Excel/CSV file: ' + err.message);
    }
  };

  const downloadSampleExcel = () => {
    const sampleData = [
      {
        'Membership ID': 'LM-901',
        'Full Name': 'Dr. Rajesh Mohapatra',
        'Category': 'Life Member',
        'Organization': 'CSIR-IMMT Bhubaneswar',
        'Designation': 'Senior Principal Scientist',
        'Email': 'rajesh@immt.res.in',
        'Phone': '9876543210',
        'City': 'Bhubaneswar',
        'State': 'Odisha',
      },
      {
        'Membership ID': 'AM-204',
        'Full Name': 'Er. Sunita Jena',
        'Category': 'Annual Member',
        'Organization': 'Tata Steel Kalinganagar',
        'Designation': 'Plant Metallurgist',
        'Email': 'sunita@tatasteel.com',
        'Phone': '9876543211',
        'City': 'Jajpur',
        'State': 'Odisha',
      },
      {
        'Membership ID': 'SM-105',
        'Full Name': 'Ananya Das',
        'Category': 'Student Member',
        'Organization': 'IIT Bhubaneswar',
        'Designation': 'Research Scholar',
        'Email': 'ananya@iitbbs.ac.in',
        'Phone': '9876543212',
        'City': 'Bhubaneswar',
        'State': 'Odisha',
      },
    ];
    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Members');
    XLSX.writeFile(wb, 'IIM_Bhubaneswar_Members_Roster_Template.xlsx');
  };

  const handleExecuteImport = async () => {
    if (importPreview.length === 0) return;
    setImportLoading(true);
    setImportStatus(null);
    try {
      const res = await fetch('/api/members/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ members: importPreview }),
      });
      const json = await res.json();
      if (json.success) {
        setImportStatus(`Success: ${json.data.inserted} added, ${json.data.updated} updated.`);
        const mRes = await fetch('/api/members?limit=200');
        const mJson = await mRes.json();
        if (mJson.success) setMembersList(mJson.data || []);
        setTimeout(() => {
          setShowImportModal(false);
          setImportPreview([]);
          setImportStatus(null);
        }, 1500);
      } else {
        setImportStatus(`Error: ${json.error}`);
      }
    } catch (err: any) {
      setImportStatus(`Error: ${err.message}`);
    } finally {
      setImportLoading(false);
    }
  };
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memberForm, setMemberForm] = useState({
    memberCode: '',
    name: '',
    category: 'Life Member',
    organization: '',
    city: 'Bhubaneswar',
    state: 'Odisha',
    status: 'Active' as 'Active' | 'Inactive',
  });

  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    eventType: 'National Symposium',
    eventDate: new Date().toISOString().split('T')[0],
    time: '09:30 AM - 05:30 PM IST',
    venue: 'CSIR-IMMT Auditorium, Bhubaneswar',
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

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Symposium',
    imageUrl: '',
    description: '',
  });

  // Fetch data on activeTab or token changes
  useEffect(() => {
    if (!token) return;

    async function loadData() {
      setLoadingData(true);
      setSearchQuery('');
      try {
        if (activeTab === 'overview') {
          const [statsRes, auditRes] = await Promise.all([
            fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } }),
            fetch('/api/admin/audit-logs', { headers: { Authorization: `Bearer ${token}` } }),
          ]);
          const statsJson = await statsRes.json();
          const auditJson = await auditRes.json();
          if (statsJson.success) setStats(statsJson.data?.stats || null);
          if (auditJson.success) setAuditLogs(auditJson.data || []);
        } else if (activeTab === 'members') {
          const res = await fetch('/api/members?limit=200');
          const json = await res.json();
          if (json.success) setMembersList(json.data || []);

        } else if (activeTab === 'applications') {
          const res = await fetch('/api/membership-applications', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const json = await res.json();
          if (json.success) setApplicationsList(json.data || []);
        } else if (activeTab === 'events') {
          const res = await fetch('/api/events');
          const json = await res.json();
          if (json.success) setEventsList(json.data || []);
        } else if (activeTab === 'symposium') {
          const [regRes, paperRes] = await Promise.all([
            fetch('/api/symposium/registrations', { headers: { Authorization: `Bearer ${token}` } }),
            fetch('/api/symposium/papers', { headers: { Authorization: `Bearer ${token}` } }),
          ]);
          const regJson = await regRes.json();
          const paperJson = await paperRes.json();
          if (regJson.success) setRegistrationsList(regJson.data || []);
          if (paperJson.success) setPapersList(paperJson.data || []);
        } else if (activeTab === 'news') {
          const res = await fetch('/api/news');
          const json = await res.json();
          if (json.success) setNewsList(json.data || []);
        } else if (activeTab === 'gallery') {
          const res = await fetch('/api/gallery');
          const json = await res.json();
          if (json.success) setGalleryList(json.data || []);
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
  const handleLogin = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    setLoginError(null);
    setLoginLoading(true);

    const emailEl = typeof document !== 'undefined' ? (document.getElementById('loginEmail') as HTMLInputElement | null) : null;
    const passEl = typeof document !== 'undefined' ? (document.getElementById('loginPassword') as HTMLInputElement | null) : null;
    const effectiveEmail = (loginEmail || emailEl?.value || '').trim();
    const effectivePassword = loginPassword || passEl?.value || '';

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: effectiveEmail, password: effectivePassword }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Invalid email or password.');

      const receivedToken = json.data.token;
      const userObj = json.data.admin;

      localStorage.setItem('iimbbsr_admin_token', receivedToken);
      localStorage.setItem('iimbbsr_admin_user', JSON.stringify(userObj));
      setToken(receivedToken);
      setAdminUser(userObj);
      showNotification('success', `Welcome back, ${userObj.name}!`);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed.');
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

  const handleFillDemoCreds = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setLoginEmail('admin@iimbhubaneswar.in');
    setLoginPassword('Admin@123');
    setLoginError(null);

    if (typeof document !== 'undefined') {
      const emailInput = document.getElementById('loginEmail') as HTMLInputElement | null;
      const passInput = document.getElementById('loginPassword') as HTMLInputElement | null;
      
      const setVal = (el: HTMLInputElement | null, val: string) => {
        if (!el) return;
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (nativeSetter) {
          nativeSetter.call(el, val);
        } else {
          el.value = val;
        }
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      };

      setVal(emailInput, 'admin@iimbhubaneswar.in');
      setVal(passInput, 'Admin@123');
    }
  };

  // --- CRUD: MEMBERS ---
  const handleOpenMemberModal = (item?: MemberItem) => {
    if (item) {
      setEditingMemberId(item._id);
      setMemberForm({
        memberCode: item.memberCode,
        name: item.name,
        category: item.category,
        organization: item.organization,
        city: item.city,
        state: item.state || 'Odisha',
        status: item.status,
      });
    } else {
      setEditingMemberId(null);
      setMemberForm({
        memberCode: `LM-${Math.floor(10000 + Math.random() * 90000)}`,
        name: '',
        category: 'Life Member',
        organization: '',
        city: 'Bhubaneswar',
        state: 'Odisha',
        status: 'Active',
      });
    }
    setShowMemberModal(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingMemberId ? `/api/members/${editingMemberId}` : '/api/members';
      const method = editingMemberId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(memberForm),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to save member.');

      showNotification('success', editingMemberId ? 'Member details updated.' : 'New Member enrolled!');
      setShowMemberModal(false);
      const updated = await fetch('/api/members?limit=200').then((r) => r.json());
      if (updated.success) setMembersList(updated.data || []);
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Error saving member.');
    }
  };

  const handleDeleteMember = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete member "${name}"?`)) return;
    try {
      const res = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Delete failed');
      showNotification('success', 'Member record removed.');
      setMembersList((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Delete failed');
    }
  };

  // --- CRUD: APPLICATIONS STATUS ---
  const handleUpdateAppStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/membership-applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ verificationStatus: newStatus }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to update status');
      showNotification('success', `Application status updated to "${newStatus}".`);
      setApplicationsList((prev) =>
        prev.map((app) => (app._id === id ? { ...app, verificationStatus: newStatus } : app))
      );
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Status update failed.');
    }
  };

  // --- CRUD: EVENTS ---
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
        venue: 'CSIR-IMMT Auditorium, Bhubaneswar',
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
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(eventForm),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to save event.');
      showNotification('success', editingEventId ? 'Event updated!' : 'New Event published!');
      setShowEventModal(false);
      const updated = await fetch('/api/events').then((r) => r.json());
      if (updated.success) setEventsList(updated.data || []);
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Failed to save event.');
    }
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to cancel and delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to delete event.');
      showNotification('success', 'Event removed.');
      setEventsList((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Delete failed.');
    }
  };

  // --- CRUD: NEWS & CIRCULARS ---
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
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(newsForm),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to save circular.');
      showNotification('success', editingNewsId ? 'Circular updated.' : 'Circular published!');
      setShowNewsModal(false);
      const updated = await fetch('/api/news').then((r) => r.json());
      if (updated.success) setNewsList(updated.data || []);
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Failed to save.');
    }
  };

  const handleDeleteNews = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to retract "${title}"?`)) return;
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to delete circular.');
      showNotification('success', 'Circular retracted.');
      setNewsList((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Delete failed.');
    }
  };

  // --- CRUD: GALLERY ---
  const handleOpenGalleryModal = (item?: GalleryItem) => {
    if (item) {
      setEditingGalleryId(item._id);
      setGalleryForm({
        title: item.title,
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description || '',
      });
    } else {
      setEditingGalleryId(null);
      setGalleryForm({
        title: '',
        category: 'Symposium',
        imageUrl: '',
        description: '',
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
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(galleryForm),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to save photograph.');
      showNotification('success', editingGalleryId ? 'Photo updated successfully!' : 'Photo added to Gallery!');
      setShowGalleryModal(false);
      const updated = await fetch('/api/gallery').then((r) => r.json());
      if (updated.success) setGalleryList(updated.data || []);
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Failed to save.');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photograph?')) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to delete photo.');
      showNotification('success', 'Photograph deleted.');
      setGalleryList((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Delete failed.');
    }
  };

  // --- CRUD: INQUIRIES ---
  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to update status');
      showNotification('success', `Inquiry marked as ${newStatus}.`);
      setInquiriesList((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq))
      );
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Update failed');
    }
  };

  // --- LOGIN SCREEN ---
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a101d] via-[#0f172a] to-[#0a101d] text-white flex flex-col justify-between">
        {/* Top Chapter Affiliate Bar */}
        <div className="bg-black/50 backdrop-blur-md border-b border-white/10 text-slate-300 font-label-sm text-[10px] sm:text-xs tracking-wider uppercase">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2">
            <span className="truncate font-semibold text-slate-200">THE INDIAN INSTITUTE OF METALS • BHUBANESWAR CHAPTER</span>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-slate-400 hidden md:inline">AFFILIATED TO IIM HQ, KOLKATA</span>
              <Link
                href="/"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
                title="Return to Public Website"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Public Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Center Login Box */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 my-auto">
          <div className="w-full max-w-md bg-white/[0.04] border border-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
            {/* Subtle brand glow accent */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Official Logo & Brand Header */}
            <div className="flex flex-col items-center text-center gap-3 relative z-10">
              <div className="bg-white p-3 rounded-2xl shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300">
                <Image
                  src="/assets/images/logo1.svg"
                  alt="The Indian Institute of Metals Logo"
                  width={180}
                  height={54}
                  className="h-12 sm:h-14 w-auto object-contain"
                  style={{ width: 'auto', height: 'auto' }}
                  priority
                />
              </div>

              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  The Indian Institute of Metals
                </h1>
                <p className="text-xs sm:text-sm font-medium text-amber-400">
                  Bhubaneswar Chapter Secretariat
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] uppercase tracking-wider text-slate-300 font-semibold border border-white/10 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Executive Admin Terminal</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 relative z-10">
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
                id="login-submit-btn"
                type="submit"
                onClick={handleLogin}
                disabled={loginLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-sm shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer touch-manipulation select-none"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating Session...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Sign In to Executive Console</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Autofill */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5 relative z-10">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-medium text-slate-300">Demo Login Credentials:</span>
                <button
                  type="button"
                  id="autofill-admin-btn"
                  data-autofill="admin"
                  onClick={handleFillDemoCreds}
                  className="px-3 py-1.5 min-h-[38px] rounded-lg bg-amber-500/20 hover:bg-amber-500/30 active:bg-amber-500/40 text-amber-300 hover:text-amber-200 border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 transition touch-manipulation cursor-pointer select-none"
                  title="Auto-fill demo credentials"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Auto-fill</span>
                </button>
              </div>

              {/* Tap-to-fill credential card */}
              <button
                type="button"
                data-autofill="admin"
                onClick={handleFillDemoCreds}
                className="w-full p-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] active:bg-white/[0.14] border border-white/10 active:border-amber-400/50 text-left transition font-mono text-xs text-slate-200 flex flex-col gap-1.5 group cursor-pointer touch-manipulation shadow-sm select-none"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans border-b border-white/10 pb-1">
                  <span className="flex items-center gap-1">
                    <KeyRound className="w-3 h-3 text-amber-400" />
                    <span>Executive Access (Tap to fill)</span>
                  </span>
                  <span className="text-amber-400 font-semibold group-hover:underline">Tap here</span>
                </div>
                <div className="flex flex-col gap-0.5 text-[11px] sm:text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="font-semibold text-white">admin@iimbhubaneswar.in</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Password:</span>
                    <span className="font-semibold text-white">Admin@123</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Link back to public site */}
            <div className="text-center pt-2 border-t border-white/5 relative z-10">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <span>← Return to Public Website (iimbhubaneswar.in)</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Institutional Seal Footer */}
        <div className="py-3 px-4 text-center text-[11px] text-slate-400 border-t border-white/5 bg-black/40">
          <span>CSIR – Institute of Minerals and Materials Technology (CSIR-IMMT), Acharya Vihar, Bhubaneswar - 751013, Odisha, India</span>
        </div>
      </div>
    );
  }

  // --- AUTHENTICATED CONSOLE ---
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Affiliate Micro-bar */}
      <div className="bg-slate-950 border-b border-slate-800 text-slate-300 text-[10px] sm:text-xs tracking-wider uppercase font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="font-semibold text-slate-200 truncate">THE INDIAN INSTITUTE OF METALS • BHUBANESWAR CHAPTER</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">CSIR-IMMT CAMPUS, ACHARYA VIHAR</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-slate-400 text-[10px] shrink-0">
            <span>AFFILIATED TO IIM HEAD OFFICE, KOLKATA (IIM-INDIA.NET)</span>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand Logo & Titles */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              title="Open Public Site"
              target="_blank"
              className="bg-white p-1.5 sm:p-2 rounded-xl shadow-sm border border-slate-200/20 hover:scale-105 transition-transform shrink-0 flex items-center justify-center"
            >
              <Image
                src="/assets/images/logo1.svg"
                alt="IIM Bhubaneswar Chapter Official Logo"
                width={140}
                height={48}
                className="h-9 sm:h-11 w-auto object-contain"
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            </Link>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm sm:text-base tracking-tight text-white leading-tight">
                  The Indian Institute of Metals
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-semibold tracking-wider uppercase hidden sm:inline">
                  Admin Console
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-tight">
                Bhubaneswar Chapter Secretariat • Council Operations
              </p>
            </div>
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition"
              title="Preview public chapter portal"
            >
              <span>View Public Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="hidden sm:flex flex-col text-right px-2.5 py-1 bg-white/5 rounded-xl border border-white/5">
              <span className="text-xs font-semibold text-white leading-tight">{adminUser?.name || 'Administrator'}</span>
              <span className="text-[10px] text-amber-400 leading-tight">{adminUser?.designation || adminUser?.role || 'Super Admin'}</span>
            </div>

            <button
              id="admin-logout-btn"
              onClick={handleLogout}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:from-rose-800 active:to-rose-900 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer touch-manipulation select-none"
              title="Sign Out / Logout of Admin Console"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Sign Out</span>
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

        {/* ================= PRIMARY CHAPTER SECRETARIAT BANNER (EXECUTIVE APEX CONSOLE) ================= */}
        <section aria-label="Official Chapter Banner" className="relative rounded-3xl bg-gradient-to-r from-[#08111e] via-[#0e1c33] to-[#08111e] border border-amber-500/30 shadow-[0_12px_40px_rgba(2,6,23,0.35)] overflow-hidden">
          {/* Top hairline gold metallic accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"></div>
          {/* Subtle ambient light blooms */}
          <div className="absolute -top-16 -left-16 w-52 h-52 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Official Emblem & High-Authority Titles */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="bg-white p-3 sm:p-3.5 rounded-2xl shadow-xl border-2 border-amber-400/30 ring-1 ring-black/10 shrink-0 flex items-center justify-center hover:scale-[1.02] transition-transform">
                <Image
                  src="/assets/images/logo1.svg"
                  alt="The Indian Institute of Metals Crest"
                  width={160}
                  height={56}
                  className="h-11 sm:h-14 w-auto object-contain"
                  style={{ width: 'auto', height: 'auto' }}
                  priority
                />
              </div>

              <div className="flex flex-col gap-1.5">
                {/* Government / Secretariat Meta Bar */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Official Secretariat Console</span>
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-[11px] font-semibold flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Council Active Session 2026</span>
                  </span>
                </div>

                {/* Primary Institutional Title */}
                <h1 className="text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight text-white leading-tight">
                  The Indian Institute of Metals • Bhubaneswar Chapter
                </h1>

                {/* Subtitle / Charter Description */}
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Secretariat terminal for Member Records, Applications, Symposia (AHSS 2026), Events, Circulars &amp; Inquiries.
                </p>
              </div>
            </div>

            {/* Right: Dignified Secretariat Badges */}
            <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2 shrink-0">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex items-center gap-2 text-xs text-slate-200 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-medium">CSIR-IMMT Campus, BBS</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex items-center gap-2 text-xs text-slate-300 shadow-sm">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Affiliated to IIM HQ, Kolkata</span>
              </div>
            </div>
          </div>
        </section>

        {/* Console Navigation Tabs (Sticky bar docked under header when scrolling past banner) */}
        <div
          id="admin-tabs-bar"
          className="sticky top-16 sm:top-20 z-30 -my-2 py-2 bg-slate-50/95 backdrop-blur-md transition-all shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
        >
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'members', label: 'Members', icon: Users },
            { id: 'applications', label: 'Applications', icon: FileCheck },
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'symposium', label: 'Symposium 2026', icon: Ticket },
            { id: 'news', label: 'News & Circulars', icon: Newspaper },
            { id: 'gallery', label: 'Gallery', icon: ImageIcon },
            { id: 'inquiries', label: 'Inquiries', icon: Mail },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSwitchTab(t.id as TabType)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 flex items-center gap-2 ${
                  active
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{t.label}</span>
              </button>
            );
          })}
          <button
            onClick={handleLogout}
            className="ml-auto px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 flex items-center gap-1.5 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 hover:border-rose-600 shadow-sm cursor-pointer select-none"
            title="Sign Out of Admin Console"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loadingData ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm font-medium">Loading {activeTab} data...</p>
          </div>
        ) : (
          <>
            {/* ================= TAB 1: OVERVIEW ================= */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">Total Members</span>
                    <span className="text-2xl font-bold text-slate-900 mt-1">{stats?.totalMembers || 0}</span>
                    <span className="text-[11px] text-emerald-600 font-medium mt-0.5">Active Directory</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">Life Members</span>
                    <span className="text-2xl font-bold text-primary mt-1">{stats?.cadreComposition?.lifeMembers || 0}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">Permanent Fellows</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">Pending Apps</span>
                    <span className="text-2xl font-bold text-amber-600 mt-1">{stats?.pendingApplications || 0}</span>
                    <span className="text-[11px] text-amber-500 mt-0.5">Scrutiny Queue</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">Symposium Delegates</span>
                    <span className="text-2xl font-bold text-indigo-600 mt-1">{stats?.totalDelegates || 0}</span>
                    <span className="text-[11px] text-indigo-500 mt-0.5">AHSS-2026 Paid</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">Papers in Review</span>
                    <span className="text-2xl font-bold text-purple-600 mt-1">{stats?.papersInReview || 0}</span>
                    <span className="text-[11px] text-purple-500 mt-0.5">Abstract Submissions</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">Gazette Circulars</span>
                    <span className="text-2xl font-bold text-slate-900 mt-1">{stats?.totalCirculars || 0}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">Published Notices</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Security Audit Trail</h3>
                      <p className="text-xs text-slate-500">Live activity logs of changes across 15 collections</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                      {auditLogs.length} Records
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Timestamp</th>
                          <th className="px-4 py-3 font-semibold">Admin</th>
                          <th className="px-4 py-3 font-semibold">Action</th>
                          <th className="px-4 py-3 font-semibold">Target Entity</th>
                          <th className="px-4 py-3 font-semibold">Details</th>
                          <th className="px-4 py-3 font-semibold">IP Address</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {auditLogs.map((log) => (
                          <tr key={log._id} className="hover:bg-slate-50 transition">
                            <td className="px-4 py-3 whitespace-nowrap text-slate-400">
                              {new Date(log.createdAt).toLocaleString()}
                            </td>
                            <td className="px-4 py-3 font-semibold text-slate-800">{log.adminName}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-mono text-[10px] rounded">
                                {log.action}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-medium text-slate-700">{log.targetEntity}</td>
                            <td className="px-4 py-3 text-slate-600">{log.details}</td>
                            <td className="px-4 py-3 font-mono text-slate-400">{log.ipAddress || '127.0.0.1'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 2: MEMBERS ================= */}
            {activeTab === 'members' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="relative w-full max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search member by name, roll no, or organization..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowImportModal(true)}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 shadow-sm"
                      title="Upload Excel or CSV roster"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Import Excel / CSV</span>
                    </button>
                    <button
                      onClick={() => handleOpenMemberModal()}
                      className="px-4 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Enroll Member</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Roll No</th>
                          <th className="px-4 py-3 font-semibold">Full Name</th>
                          <th className="px-4 py-3 font-semibold">Category</th>
                          <th className="px-4 py-3 font-semibold">Organization</th>
                          <th className="px-4 py-3 font-semibold">City</th>
                          <th className="px-4 py-3 font-semibold">Status</th>
                          <th className="px-4 py-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {membersList
                          .filter(
                            (m) =>
                              m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              m.memberCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              m.organization.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((m) => (
                            <tr key={m._id} className="hover:bg-slate-50 transition">
                              <td className="px-4 py-3 font-mono font-semibold text-slate-800">{m.memberCode}</td>
                              <td className="px-4 py-3 font-bold text-slate-900">{m.name}</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded-full text-[10px]">
                                  {m.category}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-slate-700">{m.organization}</td>
                              <td className="px-4 py-3 text-slate-500">{m.city}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`px-2 py-0.5 font-semibold text-[10px] rounded-full ${
                                    m.status === 'Active'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-slate-100 text-slate-500'
                                  }`}
                                >
                                  {m.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="inline-flex items-center gap-2">
                                  <button
                                    onClick={() => handleOpenMemberModal(m)}
                                    className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg transition"
                                    title="Edit Member"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMember(m._id, m.name)}
                                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                    title="Delete Member"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 4: MEMBERSHIP APPLICATIONS ================= */}
            {activeTab === 'applications' && (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Membership Scrutiny Queue</h3>
                    <p className="text-xs text-slate-500">
                      Applications submitted via /membership application portal awaiting Executive review
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 font-semibold text-xs rounded-xl border border-amber-200">
                    {applicationsList.length} Pending
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Docket No</th>
                          <th className="px-4 py-3 font-semibold">Applicant Name</th>
                          <th className="px-4 py-3 font-semibold">Contact</th>
                          <th className="px-4 py-3 font-semibold">Organization &amp; Post</th>
                          <th className="px-4 py-3 font-semibold">Cadre Sought</th>
                          <th className="px-4 py-3 font-semibold">Status</th>
                          <th className="px-4 py-3 font-semibold text-right">Update Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {applicationsList.map((app) => (
                          <tr key={app._id} className="hover:bg-slate-50 transition">
                            <td className="px-4 py-3 font-mono font-bold text-slate-800">{app.docketNo}</td>
                            <td className="px-4 py-3 font-bold text-slate-900">{app.fullName}</td>
                            <td className="px-4 py-3 text-slate-500">
                              <div>{app.email}</div>
                              <div className="text-[10px] text-slate-400">{app.phone}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-medium text-slate-800">{app.organization}</div>
                              <div className="text-[10px] text-slate-400">{app.designation}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded text-[10px]">
                                {app.cadreSought}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  app.verificationStatus === 'Approved'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : app.verificationStatus === 'Ready for Seal'
                                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}
                              >
                                {app.verificationStatus}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <select
                                value={app.verificationStatus}
                                onChange={(e) => handleUpdateAppStatus(app._id, e.target.value)}
                                className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                              >
                                <option value="Docs Pending">Docs Pending</option>
                                <option value="HOD Endorsed">HOD Endorsed</option>
                                <option value="Ready for Seal">Ready for Seal</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB: EVENTS ================= */}
            {activeTab === 'events' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Flagship Events &amp; Symposia</h3>
                    <p className="text-xs text-slate-500">Upcoming conferences, workshops, and lectures</p>
                  </div>
                  <button
                    onClick={() => handleOpenEventModal()}
                    className="px-4 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Event</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {eventsList.map((e) => (
                    <div
                      key={e._id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                            {e.eventType}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              e.status === 'Upcoming'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {e.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 leading-snug">{e.title}</h4>
                        <div className="text-xs text-slate-500 space-y-1">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{new Date(e.eventDate).toLocaleDateString()} • {e.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span className="truncate">{e.venue}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">{e.description}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEventModal(e)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-primary hover:bg-slate-100 transition flex items-center gap-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(e._id, e.title)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB 7: SYMPOSIUM ================= */}
            {activeTab === 'symposium' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSympSubTab('delegates')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        sympSubTab === 'delegates'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Registered Delegates ({registrationsList.length})
                    </button>
                    <button
                      onClick={() => setSympSubTab('papers')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        sympSubTab === 'papers'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Technical Papers ({papersList.length})
                    </button>
                  </div>
                </div>

                {sympSubTab === 'delegates' ? (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="px-4 py-3 font-semibold">Badge ID</th>
                            <th className="px-4 py-3 font-semibold">Delegate Name</th>
                            <th className="px-4 py-3 font-semibold">Institution</th>
                            <th className="px-4 py-3 font-semibold">Fee Tier</th>
                            <th className="px-4 py-3 font-semibold">Amount</th>
                            <th className="px-4 py-3 font-semibold">Payment Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {registrationsList.map((r) => (
                            <tr key={r._id} className="hover:bg-slate-50 transition">
                              <td className="px-4 py-3 font-mono font-bold text-slate-800">{r.badgeQrCode || 'PENDING'}</td>
                              <td className="px-4 py-3 font-bold text-slate-900">{r.delegateName}</td>
                              <td className="px-4 py-3 text-slate-700">{r.institution}</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-medium">
                                  {r.tier}
                                </span>
                              </td>
                              <td className="px-4 py-3 font-bold text-slate-900">₹{r.feeAmount}</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  {r.paymentStatus}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="px-4 py-3 font-semibold">Paper Title</th>
                            <th className="px-4 py-3 font-semibold">Track</th>
                            <th className="px-4 py-3 font-semibold">Corresponding Author</th>
                            <th className="px-4 py-3 font-semibold">Institution</th>
                            <th className="px-4 py-3 font-semibold">Review Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {papersList.map((p) => (
                            <tr key={p._id} className="hover:bg-slate-50 transition">
                              <td className="px-4 py-3 font-bold text-slate-900 max-w-xs">{p.paperTitle}</td>
                              <td className="px-4 py-3 text-slate-600">{p.track}</td>
                              <td className="px-4 py-3 font-medium text-slate-800">
                                {p.correspondingAuthor?.name}
                                <div className="text-[10px] text-slate-400">{p.correspondingAuthor?.email}</div>
                              </td>
                              <td className="px-4 py-3 text-slate-600">{p.correspondingAuthor?.institution || 'N/A'}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    p.reviewStatus === 'Accepted'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                                  }`}
                                >
                                  {p.reviewStatus}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= TAB: NEWS ================= */}
            {activeTab === 'news' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Official Gazette &amp; Circulars</h3>
                    <p className="text-xs text-slate-500">Notices, calls for papers, and awards notifications</p>
                  </div>
                  <button
                    onClick={() => handleOpenNewsModal()}
                    className="px-4 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Circular</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Circular No</th>
                          <th className="px-4 py-3 font-semibold">Title</th>
                          <th className="px-4 py-3 font-semibold">Category</th>
                          <th className="px-4 py-3 font-semibold">Summary</th>
                          <th className="px-4 py-3 font-semibold">Status</th>
                          <th className="px-4 py-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {newsList.map((n) => (
                          <tr key={n._id} className="hover:bg-slate-50 transition">
                            <td className="px-4 py-3 font-mono font-bold text-slate-800">{n.circularNo || 'N/A'}</td>
                            <td className="px-4 py-3 font-bold text-slate-900 max-w-xs">{n.title}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded-full text-[10px]">
                                {n.category}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-500 line-clamp-2 max-w-sm">{n.summary}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  n.isPublished !== false
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-slate-100 text-slate-500'
                                }`}
                              >
                                {n.isPublished !== false ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="inline-flex items-center gap-2">
                                <button
                                  onClick={() => handleOpenNewsModal(n)}
                                  className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg transition"
                                  title="Edit Circular"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteNews(n._id, n.title)}
                                  className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                  title="Delete Circular"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 10: GALLERY ================= */}
            {activeTab === 'gallery' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Archival Photo Gallery</h3>
                    <p className="text-xs text-slate-500">Photos of conferences, ceremonies and field excursions</p>
                  </div>
                  <button
                    onClick={() => handleOpenGalleryModal()}
                    className="px-4 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload Photograph</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryList.map((g) => (
                    <div
                      key={g._id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
                    >
                      <div className="h-44 relative bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur">
                          {g.category}
                        </span>
                      </div>
                      <div className="p-3 flex flex-col justify-between flex-1 gap-2">
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{g.title}</h4>
                        {g.description && <p className="text-[11px] text-slate-500 line-clamp-2">{g.description}</p>}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => handleOpenGalleryModal(g)}
                            className="text-xs font-semibold text-primary hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteGallery(g._id)}
                            className="text-xs font-semibold text-rose-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB: INQUIRIES ================= */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Official Inquiries &amp; Dispatches</h3>
                    <p className="text-xs text-slate-500">Messages sent via website /contact portal</p>
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 font-semibold text-xs rounded-xl">
                    {inquiriesList.length} Messages
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Docket ID</th>
                          <th className="px-4 py-3 font-semibold">Sender</th>
                          <th className="px-4 py-3 font-semibold">Subject</th>
                          <th className="px-4 py-3 font-semibold">Message</th>
                          <th className="px-4 py-3 font-semibold">Status</th>
                          <th className="px-4 py-3 font-semibold text-right">Update Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {inquiriesList.map((inq) => (
                          <tr key={inq._id} className="hover:bg-slate-50 transition">
                            <td className="px-4 py-3 font-mono font-bold text-slate-800">{inq.docketId}</td>
                            <td className="px-4 py-3">
                              <div className="font-bold text-slate-900">{inq.fullName}</div>
                              <div className="text-[10px] text-slate-400">{inq.email} • {inq.phone}</div>
                            </td>
                            <td className="px-4 py-3 font-semibold text-slate-800">{inq.subjectRef}</td>
                            <td className="px-4 py-3 text-slate-600 line-clamp-2 max-w-xs">{inq.messageBody}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  inq.status === 'Resolved'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}
                              >
                                {inq.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <select
                                value={inq.status}
                                onChange={(e) => handleUpdateInquiryStatus(inq._id, e.target.value)}
                                className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                              >
                                <option value="New">New</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Institutional Admin Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="bg-slate-100 p-1 rounded-md border border-slate-200">
              <Image
                src="/assets/images/logo1.svg"
                alt="IIM Logo"
                width={28}
                height={28}
                className="h-5 w-auto object-contain"
              />
            </div>
            <span>
              © 2025–2026 <strong>The Indian Institute of Metals (IIM) — Bhubaneswar Chapter</strong>. Regional Secretariat: CSIR-IMMT, Bhubaneswar.
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Affiliated to IIM Head Office, Kolkata</span>
            <span>•</span>
            <Link href="/" target="_blank" className="text-primary hover:underline font-semibold flex items-center gap-1">
              <span>View Public Portal</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <span>•</span>
            <button
              onClick={handleLogout}
              className="text-rose-600 hover:text-rose-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              title="Sign Out Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </footer>

      {/* ================= MODAL: MEMBER ================= */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Import Members Roster (Excel / CSV)
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportPreview([]);
                  setImportStatus(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Upload the official Chapter membership Excel or CSV roster (containing member code, full name, category, organization, designation, email, phone).
            </p>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-600 font-medium">Need the format template?</span>
              <button
                type="button"
                onClick={downloadSampleExcel}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <span>Download Sample Excel Template (.xlsx)</span>
              </button>
            </div>

            <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 bg-slate-50/50">
              <input
                type="file"
                id="memberRosterFile"
                accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/csv"
                onChange={handleSpreadsheetFileChange}
                className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-container cursor-pointer"
              />
              <span className="text-[11px] text-slate-400">Supported formats: .XLSX (Microsoft Excel), .XLS, or .CSV</span>
            </div>

            {importPreview.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Preview: {importPreview.length} records ready to import
                  </span>
                </div>
                <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-[11px] text-slate-600">
                    <thead className="bg-slate-100 text-slate-700 sticky top-0">
                      <tr>
                        <th className="p-2 font-semibold">Roll No</th>
                        <th className="p-2 font-semibold">Name</th>
                        <th className="p-2 font-semibold">Category</th>
                        <th className="p-2 font-semibold">Organization</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {importPreview.slice(0, 10).map((r, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-2 font-mono font-medium">{r.memberCode || r.membershipId || r['Membership ID']}</td>
                          <td className="p-2 font-medium">{r.name || r['Name']}</td>
                          <td className="p-2">{r.category || r['Category'] || 'Life Member'}</td>
                          <td className="p-2">{r.organization || r['Organization']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {importPreview.length > 10 && (
                    <div className="p-2 text-center text-[10px] text-slate-400 bg-slate-50">
                      + {importPreview.length - 10} more records in file
                    </div>
                  )}
                </div>
              </div>
            )}

            {importStatus && (
              <div
                className={`p-3 rounded-xl text-xs font-medium ${
                  importStatus.startsWith('Success')
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {importStatus}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowImportModal(false);
                  setImportPreview([]);
                  setImportStatus(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={importPreview.length === 0 || importLoading}
                onClick={handleExecuteImport}
                className="px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                {importLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Importing...</span>
                  </>
                ) : (
                  <span>Confirm &amp; Import {importPreview.length} Members</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {showMemberModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingMemberId ? 'Edit Member Record' : 'Enroll New Member'}
              </h3>
              <button onClick={() => setShowMemberModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveMember} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Roll / Member Code</label>
                  <input
                    type="text"
                    required
                    value={memberForm.memberCode}
                    onChange={(e) => setMemberForm({ ...memberForm, memberCode: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={memberForm.category}
                    onChange={(e) => setMemberForm({ ...memberForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="Life Member">Life Member</option>
                    <option value="Fellow">Fellow</option>
                    <option value="Student Member">Student Member</option>
                    <option value="Annual Member">Annual Member</option>
                    <option value="Corporate Member">Corporate Member</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={memberForm.name}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  placeholder="e.g. Dr. Alok Kumar Mohanty"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Organization / College</label>
                <input
                  type="text"
                  required
                  value={memberForm.organization}
                  onChange={(e) => setMemberForm({ ...memberForm, organization: e.target.value })}
                  placeholder="e.g. Tata Steel / CSIR-IMMT"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={memberForm.city}
                    onChange={(e) => setMemberForm({ ...memberForm, city: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={memberForm.state}
                    onChange={(e) => setMemberForm({ ...memberForm, state: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={memberForm.status}
                    onChange={(e) => setMemberForm({ ...memberForm, status: e.target.value as 'Active' | 'Inactive' })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="px-4 py-2 border rounded-xl font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-container"
                >
                  {editingMemberId ? 'Update Member' : 'Enroll Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EVENT ================= */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingEventId ? 'Edit Event Details' : 'Publish New Technical Event'}
              </h3>
              <button onClick={() => setShowEventModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="e.g. 18th National Symposium on AHSS"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Event Type</label>
                  <select
                    value={eventForm.eventType}
                    onChange={(e) => setEventForm({ ...eventForm, eventType: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="National Symposium">National Symposium</option>
                    <option value="Technical Workshop">Technical Workshop</option>
                    <option value="Memorial Lecture">Memorial Lecture</option>
                    <option value="Annual General Meeting">Annual General Meeting</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={eventForm.status}
                    onChange={(e) => setEventForm({ ...eventForm, status: e.target.value as EventItem['status'] })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
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
                  <label className="block font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={eventForm.eventDate}
                    onChange={(e) => setEventForm({ ...eventForm, eventDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Timing</label>
                  <input
                    type="text"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Venue</label>
                <input
                  type="text"
                  required
                  value={eventForm.venue}
                  onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Banner Image</label>
                <ImageUpload
                  value={eventForm.bannerImage}
                  onChange={(url) => setEventForm({ ...eventForm, bannerImage: url })}
                  label="Upload Event Banner"
                  folder="/events"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 border rounded-xl font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-container"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: NEWS ================= */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingNewsId ? 'Edit Gazette Circular' : 'Publish Circular / Notice'}
              </h3>
              <button onClick={() => setShowNewsModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveNews} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Circular No</label>
                  <input
                    type="text"
                    required
                    value={newsForm.circularNo}
                    onChange={(e) => setNewsForm({ ...newsForm, circularNo: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="Circular">Circular</option>
                    <option value="Awards Notice">Awards Notice</option>
                    <option value="Secretariat Report">Secretariat Report</option>
                    <option value="Press Release">Press Release</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Circular Title</label>
                <input
                  type="text"
                  required
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="e.g. Call for Papers: AHSS National Symposium 2026"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Summary (Short Paragraph)</label>
                <textarea
                  rows={2}
                  required
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Attachment PDF URL (Optional)</label>
                <input
                  type="text"
                  value={newsForm.attachmentPdfUrl}
                  onChange={(e) => setNewsForm({ ...newsForm, attachmentPdfUrl: e.target.value })}
                  placeholder="/uploads/circulars/cir-2026-05.pdf"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewsModal(false)}
                  className="px-4 py-2 border rounded-xl font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-container"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: GALLERY ================= */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingGalleryId ? 'Edit Photograph' : 'Upload Archival Photo'}
              </h3>
              <button onClick={() => setShowGalleryModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveGallery} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Photo Title / Caption</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="e.g. 47th Foundation Day Awards Banquet"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  <option value="Symposium">Symposium</option>
                  <option value="Foundation Day">Foundation Day</option>
                  <option value="Lectures">Lectures</option>
                  <option value="Field Visits">Field Visits</option>
                  <option value="Ceremonies">Ceremonies</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Photograph (ImageUpload)</label>
                <ImageUpload
                  value={galleryForm.imageUrl}
                  onChange={(url) => setGalleryForm({ ...galleryForm, imageUrl: url })}
                  label="Select Photo"
                  folder="/gallery"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  value={galleryForm.description}
                  onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="px-4 py-2 border rounded-xl font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-container"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
