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
  Users,
  Award,
  GraduationCap,
  FileCheck,
  Ticket,
  BarChart3,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Check,
  FileText,
  Settings,
  Sparkles,
  Handshake,
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

interface CommitteeItem {
  _id: string;
  name: string;
  role: string;
  category: string;
  title: string;
  institution: string;
  email: string;
  location?: string;
  bio?: string;
  image?: string;
  orderIndex?: number;
  isActive?: boolean;
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

interface ProgrammeItem {
  _id: string;
  title: string;
  category: string;
  annualSchedule: string;
  description: string;
  highlights: string[];
  bannerImage?: string;
  brochurePdfUrl?: string;
  orderIndex: number;
  isActive: boolean;
}

interface SiteSettingItem {
  _id?: string;
  chapterName: string;
  tagline: string;
  secretariatAddress: string;
  primaryEmail: string;
  membershipEmail: string;
  symposiumEmail: string;
  primaryPhone: string;
  secondaryPhone?: string;
  officeHours: string;
  activeMembersCount: string;
  partnerInstitutionsCount: string;
  studentChaptersCount: string;
  symposiaCount: string;
  chairmanName: string;
  chairmanTitle: string;
  chairmanQuote: string;
  chairmanPhotoUrl?: string;
}

interface SponsorItem {
  _id: string;
  name: string;
  tier: string;
  logoUrl: string;
  websiteUrl?: string;
  description?: string;
  orderIndex: number;
  isActive: boolean;
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

interface StudentChapterItem {
  _id: string;
  institution: string;
  establishedYear: number;
  facultyAdvisor: string;
  location: string;
  memberCount: number;
  highlights?: string;
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
  const [token, setToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Tab
  type TabType =
    | 'overview'
    | 'members'
    | 'committee'
    | 'applications'
    | 'programmes'
    | 'events'
    | 'symposium'
    | 'sponsors'
    | 'news'
    | 'gallery'
    | 'student-chapters'
    | 'inquiries'
    | 'settings';

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [loadingData, setLoadingData] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Data Lists
  const [stats, setStats] = useState<StatsData | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [membersList, setMembersList] = useState<MemberItem[]>([]);
  const [committeeList, setCommitteeList] = useState<CommitteeItem[]>([]);
  const [applicationsList, setApplicationsList] = useState<ApplicationItem[]>([]);
  const [programmesList, setProgrammesList] = useState<ProgrammeItem[]>([]);
  const [eventsList, setEventsList] = useState<EventItem[]>([]);
  const [registrationsList, setRegistrationsList] = useState<RegistrationItem[]>([]);
  const [papersList, setPapersList] = useState<PaperItem[]>([]);
  const [sympSubTab, setSympSubTab] = useState<'delegates' | 'papers'>('delegates');
  const [sponsorsList, setSponsorsList] = useState<SponsorItem[]>([]);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [chaptersList, setChaptersList] = useState<StudentChapterItem[]>([]);
  const [inquiriesList, setInquiriesList] = useState<ContactInquiryItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettingItem>({
    chapterName: 'The Indian Institute of Metals • Bhubaneswar Chapter',
    tagline: 'Advancing Metallurgy, Mineral Processing & Advanced Materials in Odisha',
    secretariatAddress: 'CSIR – Institute of Minerals and Materials Technology (CSIR-IMMT), Acharya Vihar, Bhubaneswar - 751013, Odisha, India',
    primaryEmail: 'secretary@iimbhubaneswar.in',
    membershipEmail: 'membership@iimbhubaneswar.in',
    symposiumEmail: 'symposium2026@iimbhubaneswar.in',
    primaryPhone: '+91 674 237 9401',
    secondaryPhone: '+91 674 237 4112',
    officeHours: 'Mon - Fri: 9:30 AM - 5:30 PM IST',
    activeMembersCount: '750+',
    partnerInstitutionsCount: '30+',
    studentChaptersCount: '4',
    symposiaCount: '18',
    chairmanName: 'Dr. Ashok Kumar Mohanty, FIE, FIIM',
    chairmanTitle: 'Chairman, IIM Bhubaneswar Chapter • Chief Scientist (Retd.), CSIR-IMMT',
    chairmanQuote: 'Odisha produces over half of India’s iron ore and bauxite. As we transition towards green hydrogen direct-reduction and circular slag utilisation, the IIM Bhubaneswar Chapter serves as the intellectual crucible transforming resource abundance into sustainable technological sovereignty.',
    chairmanPhotoUrl: '',
  });

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showMemberModal, setShowMemberModal] = useState(false);
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

  const [showCommitteeModal, setShowCommitteeModal] = useState(false);
  const [editingCommitteeId, setEditingCommitteeId] = useState<string | null>(null);
  const [committeeForm, setCommitteeForm] = useState({
    name: '',
    role: '',
    category: 'Apex',
    title: '',
    institution: '',
    email: '',
    location: '',
    bio: '',
    image: '',
    orderIndex: 1,
  });

  const [showProgrammeModal, setShowProgrammeModal] = useState(false);
  const [editingProgrammeId, setEditingProgrammeId] = useState<string | null>(null);
  const [programmeForm, setProgrammeForm] = useState({
    title: '',
    category: 'Annual Tradition',
    annualSchedule: 'Annually',
    description: '',
    highlights: '',
    bannerImage: '',
    brochurePdfUrl: '',
    orderIndex: 1,
  });

  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [editingSponsorId, setEditingSponsorId] = useState<string | null>(null);
  const [sponsorForm, setSponsorForm] = useState({
    name: '',
    tier: 'Platinum Sponsor',
    logoUrl: '',
    websiteUrl: '',
    description: '',
    orderIndex: 1,
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

  const [showChapterModal, setShowChapterModal] = useState(false);
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [chapterForm, setChapterForm] = useState({
    institution: '',
    establishedYear: 2026,
    facultyAdvisor: '',
    location: 'Bhubaneswar',
    memberCount: 50,
    highlights: '',
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
        } else if (activeTab === 'committee') {
          const res = await fetch('/api/committee');
          const json = await res.json();
          if (json.success) setCommitteeList(json.data || []);
        } else if (activeTab === 'applications') {
          const res = await fetch('/api/membership-applications', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const json = await res.json();
          if (json.success) setApplicationsList(json.data || []);
        } else if (activeTab === 'programmes') {
          const res = await fetch('/api/programmes');
          const json = await res.json();
          if (json.success) setProgrammesList(json.data || []);
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
        } else if (activeTab === 'sponsors') {
          const res = await fetch('/api/sponsors');
          const json = await res.json();
          if (json.success) setSponsorsList(json.data || []);
        } else if (activeTab === 'news') {
          const res = await fetch('/api/news');
          const json = await res.json();
          if (json.success) setNewsList(json.data || []);
        } else if (activeTab === 'gallery') {
          const res = await fetch('/api/gallery');
          const json = await res.json();
          if (json.success) setGalleryList(json.data || []);
        } else if (activeTab === 'student-chapters') {
          const res = await fetch('/api/student-chapters');
          const json = await res.json();
          if (json.success) setChaptersList(json.data || []);
        } else if (activeTab === 'inquiries') {
          const res = await fetch('/api/contact', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const json = await res.json();
          if (json.success) setInquiriesList(json.data || []);
        } else if (activeTab === 'settings') {
          const res = await fetch('/api/settings');
          const json = await res.json();
          if (json.success && json.data) setSiteSettings(json.data);
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

  const handleFillDemoCreds = () => {
    setLoginEmail('admin@iimbhubaneswar.in');
    setLoginPassword('Admin@123');
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

  // --- CRUD: COMMITTEE ---
  const handleOpenCommitteeModal = (item?: CommitteeItem) => {
    if (item) {
      setEditingCommitteeId(item._id);
      setCommitteeForm({
        name: item.name,
        role: item.role,
        category: item.category,
        title: item.title,
        institution: item.institution,
        email: item.email,
        location: item.location || '',
        bio: item.bio || '',
        image: item.image || '',
        orderIndex: item.orderIndex || 1,
      });
    } else {
      setEditingCommitteeId(null);
      setCommitteeForm({
        name: '',
        role: 'Executive Member',
        category: 'Executive Member',
        title: '',
        institution: 'CSIR-IMMT / IIT Bhubaneswar',
        email: '',
        location: 'Bhubaneswar',
        bio: '',
        image: '',
        orderIndex: committeeList.length + 1,
      });
    }
    setShowCommitteeModal(true);
  };

  const handleSaveCommittee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingCommitteeId ? `/api/committee/${editingCommitteeId}` : '/api/committee';
      const method = editingCommitteeId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(committeeForm),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to save committee member.');

      showNotification('success', editingCommitteeId ? 'Committee officer updated.' : 'New Officer added!');
      setShowCommitteeModal(false);
      const updated = await fetch('/api/committee').then((r) => r.json());
      if (updated.success) setCommitteeList(updated.data || []);
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Error saving officer.');
    }
  };

  const handleDeleteCommittee = async (id: string, name: string) => {
    if (!confirm(`Delete officer "${name}" from Executive Committee?`)) return;
    try {
      const res = await fetch(`/api/committee/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Delete failed');
      showNotification('success', 'Officer removed from committee.');
      setCommitteeList((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Delete failed');
    }
  };

  // --- CRUD: PROGRAMMES ---
  const handleOpenProgrammeModal = (item?: ProgrammeItem) => {
    if (item) {
      setEditingProgrammeId(item._id);
      setProgrammeForm({
        title: item.title,
        category: item.category,
        annualSchedule: item.annualSchedule,
        description: item.description,
        highlights: Array.isArray(item.highlights) ? item.highlights.join(', ') : '',
        bannerImage: item.bannerImage || '',
        brochurePdfUrl: item.brochurePdfUrl || '',
        orderIndex: item.orderIndex || 1,
      });
    } else {
      setEditingProgrammeId(null);
      setProgrammeForm({
        title: '',
        category: 'Annual Tradition',
        annualSchedule: 'Annually',
        description: '',
        highlights: '',
        bannerImage: '',
        brochurePdfUrl: '',
        orderIndex: programmesList.length + 1,
      });
    }
    setShowProgrammeModal(true);
  };

  const handleSaveProgramme = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProgrammeId ? `/api/programmes/${editingProgrammeId}` : '/api/programmes';
      const method = editingProgrammeId ? 'PUT' : 'POST';

      const payload = {
        ...programmeForm,
        highlights: programmeForm.highlights
          .split(',')
          .map((h) => h.trim())
          .filter(Boolean),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to save programme.');

      showNotification('success', editingProgrammeId ? 'Programme updated!' : 'Programme added!');
      setShowProgrammeModal(false);
      const updated = await fetch('/api/programmes').then((r) => r.json());
      if (updated.success) setProgrammesList(updated.data || []);
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Error saving programme.');
    }
  };

  const handleDeleteProgramme = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete programme "${title}"?`)) return;
    try {
      const res = await fetch(`/api/programmes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Delete failed');
      showNotification('success', 'Programme removed.');
      setProgrammesList((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Delete failed');
    }
  };

  // --- CRUD: SPONSORS ---
  const handleOpenSponsorModal = (item?: SponsorItem) => {
    if (item) {
      setEditingSponsorId(item._id);
      setSponsorForm({
        name: item.name,
        tier: item.tier,
        logoUrl: item.logoUrl,
        websiteUrl: item.websiteUrl || '',
        description: item.description || '',
        orderIndex: item.orderIndex || 1,
      });
    } else {
      setEditingSponsorId(null);
      setSponsorForm({
        name: '',
        tier: 'Platinum Sponsor',
        logoUrl: '',
        websiteUrl: '',
        description: '',
        orderIndex: sponsorsList.length + 1,
      });
    }
    setShowSponsorModal(true);
  };

  const handleSaveSponsor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingSponsorId ? `/api/sponsors/${editingSponsorId}` : '/api/sponsors';
      const method = editingSponsorId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(sponsorForm),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to save sponsor.');

      showNotification('success', editingSponsorId ? 'Sponsor updated!' : 'Sponsor added!');
      setShowSponsorModal(false);
      const updated = await fetch('/api/sponsors').then((r) => r.json());
      if (updated.success) setSponsorsList(updated.data || []);
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Error saving sponsor.');
    }
  };

  const handleDeleteSponsor = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete sponsor "${name}"?`)) return;
    try {
      const res = await fetch(`/api/sponsors/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Delete failed');
      showNotification('success', 'Sponsor removed.');
      setSponsorsList((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Delete failed');
    }
  };

  // --- CRUD: SETTINGS SAVE ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(siteSettings),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to update settings');
      showNotification('success', 'Site settings updated successfully!');
      if (json.data) setSiteSettings(json.data);
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Failed to save settings.');
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

  // --- CRUD: STUDENT CHAPTERS ---
  const handleOpenChapterModal = (item?: StudentChapterItem) => {
    if (item) {
      setEditingChapterId(item._id);
      setChapterForm({
        institution: item.institution,
        establishedYear: item.establishedYear,
        facultyAdvisor: item.facultyAdvisor,
        location: item.location,
        memberCount: item.memberCount,
        highlights: item.highlights || '',
      });
    } else {
      setEditingChapterId(null);
      setChapterForm({
        institution: '',
        establishedYear: 2026,
        facultyAdvisor: '',
        location: 'Bhubaneswar',
        memberCount: 50,
        highlights: '',
      });
    }
    setShowChapterModal(true);
  };

  const handleSaveChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingChapterId ? `/api/student-chapters/${editingChapterId}` : '/api/student-chapters';
      const method = editingChapterId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(chapterForm),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to save student chapter.');
      showNotification('success', editingChapterId ? 'Chapter details updated.' : 'Student Chapter added!');
      setShowChapterModal(false);
      const updated = await fetch('/api/student-chapters').then((r) => r.json());
      if (updated.success) setChaptersList(updated.data || []);
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Error saving chapter.');
    }
  };

  const handleDeleteChapter = async (id: string, name: string) => {
    if (!confirm(`Delete student chapter "${name}"?`)) return;
    try {
      const res = await fetch(`/api/student-chapters/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Delete failed');
      showNotification('success', 'Student Chapter removed.');
      setChaptersList((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Delete failed');
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

  // --- AUTH CHECK LOADING ---
  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-3" />
        <p className="text-sm font-medium text-slate-400">Verifying security token...</p>
      </div>
    );
  }

  // --- LOGIN SCREEN ---
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="p-3 bg-amber-500/10 text-amber-400 rounded-xl mb-1">
              <Lock className="w-7 h-7" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight">Secretariat Admin Terminal</h1>
            <p className="text-xs text-slate-400">
              Complete Management Console for 15 Collections: Members, Committee, Programmes, Settings &amp; Symposia
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

  // --- AUTHENTICATED CONSOLE ---
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
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold tracking-wider uppercase">
                  15 Collections Live
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

        {/* 13 Console Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'members', label: 'Members', icon: Users },
            { id: 'committee', label: 'Committee', icon: Award },
            { id: 'applications', label: 'Applications', icon: FileCheck },
            { id: 'programmes', label: 'Programmes', icon: Sparkles },
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'symposium', label: 'Symposium 2026', icon: Ticket },
            { id: 'sponsors', label: 'Sponsors', icon: Handshake },
            { id: 'news', label: 'News & Circulars', icon: Newspaper },
            { id: 'gallery', label: 'Gallery', icon: ImageIcon },
            { id: 'student-chapters', label: 'Student Chapters', icon: GraduationCap },
            { id: 'inquiries', label: 'Inquiries', icon: Mail },
            { id: 'settings', label: 'Site Settings', icon: Settings },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as TabType)}
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
                  <button
                    onClick={() => handleOpenMemberModal()}
                    className="px-4 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Enroll Member</span>
                  </button>
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

            {/* ================= TAB 3: COMMITTEE ================= */}
            {activeTab === 'committee' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Executive Committee Officers</h3>
                    <p className="text-xs text-slate-500">Apex council, office bearers and honorary advisors</p>
                  </div>
                  <button
                    onClick={() => handleOpenCommitteeModal()}
                    className="px-4 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Officer</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Photo</th>
                          <th className="px-4 py-3 font-semibold">Officer Name</th>
                          <th className="px-4 py-3 font-semibold">Chapter Role</th>
                          <th className="px-4 py-3 font-semibold">Category</th>
                          <th className="px-4 py-3 font-semibold">Organization / College</th>
                          <th className="px-4 py-3 font-semibold">Email</th>
                          <th className="px-4 py-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {committeeList.map((c) => (
                          <tr key={c._id} className="hover:bg-slate-50 transition">
                            <td className="px-4 py-3">
                              <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                                {c.image ? (
                                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">
                                    {c.name.charAt(0)}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-bold text-slate-900">{c.name}</td>
                            <td className="px-4 py-3 font-semibold text-primary">{c.role}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-semibold">
                                {c.category}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-700">{c.institution}</td>
                            <td className="px-4 py-3 text-slate-500">{c.email}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="inline-flex items-center gap-2">
                                <button
                                  onClick={() => handleOpenCommitteeModal(c)}
                                  className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg transition"
                                  title="Edit Officer"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCommittee(c._id, c.name)}
                                  className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                  title="Delete Officer"
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

            {/* ================= TAB 5: PROGRAMMES ================= */}
            {activeTab === 'programmes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Flagship Chapter Programmes</h3>
                    <p className="text-xs text-slate-500">Foundation Day, NMD Awards, AGM, Memorial Lectures, Conclave</p>
                  </div>
                  <button
                    onClick={() => handleOpenProgrammeModal()}
                    className="px-4 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Programme</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {programmesList.map((p) => (
                    <div
                      key={p._id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase">
                            {p.category}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">{p.annualSchedule}</span>
                        </div>
                        <h4 className="font-bold text-base text-slate-900 leading-snug">{p.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-3">{p.description}</p>
                        {p.highlights && p.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {p.highlights.map((h, i) => (
                              <span key={i} className="px-2 py-0.5 bg-slate-100 rounded text-[10px] text-slate-600">
                                ✓ {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenProgrammeModal(p)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-primary hover:bg-slate-100 transition flex items-center gap-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProgramme(p._id, p.title)}
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

            {/* ================= TAB 6: EVENTS ================= */}
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

            {/* ================= TAB 8: SPONSORS ================= */}
            {activeTab === 'sponsors' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Industry Sponsors &amp; Institutional Alliances</h3>
                    <p className="text-xs text-slate-500">Corporate partners for symposia and annual endowment support</p>
                  </div>
                  <button
                    onClick={() => handleOpenSponsorModal()}
                    className="px-4 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Sponsor</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {sponsorsList.map((s) => (
                    <div
                      key={s._id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 font-bold text-[10px] rounded-full">
                            {s.tier}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900">{s.name}</h4>
                        {s.description && <p className="text-xs text-slate-500 line-clamp-2">{s.description}</p>}
                        {s.websiteUrl && (
                          <a
                            href={s.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
                          >
                            <span>Visit Website</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenSponsorModal(s)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-primary hover:bg-slate-100 transition flex items-center gap-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteSponsor(s._id, s.name)}
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

            {/* ================= TAB 9: NEWS ================= */}
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

            {/* ================= TAB 11: STUDENT CHAPTERS ================= */}
            {activeTab === 'student-chapters' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Affiliated Student Chapters</h3>
                    <p className="text-xs text-slate-500">University and engineering college metallurgy study groups</p>
                  </div>
                  <button
                    onClick={() => handleOpenChapterModal()}
                    className="px-4 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Student Chapter</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {chaptersList.map((ch) => (
                    <div
                      key={ch._id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-slate-400">Estd. {ch.establishedYear}</span>
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-full text-[10px]">
                            {ch.memberCount}+ Members
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900">{ch.institution}</h4>
                        <div className="text-xs text-slate-500">
                          <div>Advisor: <span className="font-semibold text-slate-700">{ch.facultyAdvisor}</span></div>
                          <div>Location: <span className="text-slate-700">{ch.location}</span></div>
                        </div>
                        {ch.highlights && (
                          <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg line-clamp-2">
                            {ch.highlights}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenChapterModal(ch)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-primary hover:bg-slate-100 transition flex items-center gap-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteChapter(ch._id, ch.institution)}
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

            {/* ================= TAB 12: INQUIRIES ================= */}
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

            {/* ================= TAB 13: SITE SETTINGS ================= */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-4xl">
                <div className="border-b pb-4 mb-6">
                  <h3 className="font-bold text-slate-900 text-base">Global Chapter Settings</h3>
                  <p className="text-xs text-slate-500">
                    Update secretariat postal address, phone numbers, official email IDs, and home page metrics
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-3">1. Identity &amp; Secretariat Address</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Chapter Name</label>
                        <input
                          type="text"
                          required
                          value={siteSettings.chapterName}
                          onChange={(e) => setSiteSettings({ ...siteSettings, chapterName: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Tagline</label>
                        <input
                          type="text"
                          value={siteSettings.tagline}
                          onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Secretariat Postal Address</label>
                        <textarea
                          rows={2}
                          required
                          value={siteSettings.secretariatAddress}
                          onChange={(e) => setSiteSettings({ ...siteSettings, secretariatAddress: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-5">
                    <h4 className="font-bold text-slate-900 text-sm mb-3">2. Official Communication Channels</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Primary Office Phone</label>
                        <input
                          type="text"
                          required
                          value={siteSettings.primaryPhone}
                          onChange={(e) => setSiteSettings({ ...siteSettings, primaryPhone: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Secondary / Mobile Phone</label>
                        <input
                          type="text"
                          value={siteSettings.secondaryPhone || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, secondaryPhone: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">General Secretary Email</label>
                        <input
                          type="email"
                          required
                          value={siteSettings.primaryEmail}
                          onChange={(e) => setSiteSettings({ ...siteSettings, primaryEmail: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Membership Email</label>
                        <input
                          type="email"
                          required
                          value={siteSettings.membershipEmail}
                          onChange={(e) => setSiteSettings({ ...siteSettings, membershipEmail: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-5">
                    <h4 className="font-bold text-slate-900 text-sm mb-3">3. Homepage Stats Counters</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Active Members</label>
                        <input
                          type="text"
                          value={siteSettings.activeMembersCount}
                          onChange={(e) => setSiteSettings({ ...siteSettings, activeMembersCount: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Partner Institutions</label>
                        <input
                          type="text"
                          value={siteSettings.partnerInstitutionsCount}
                          onChange={(e) => setSiteSettings({ ...siteSettings, partnerInstitutionsCount: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Student Chapters</label>
                        <input
                          type="text"
                          value={siteSettings.studentChaptersCount}
                          onChange={(e) => setSiteSettings({ ...siteSettings, studentChaptersCount: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">National Symposia</label>
                        <input
                          type="text"
                          value={siteSettings.symposiaCount}
                          onChange={(e) => setSiteSettings({ ...siteSettings, symposiaCount: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-5">
                    <h4 className="font-bold text-slate-900 text-sm mb-3">4. Chairman's Homepage Message</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Chairman Name</label>
                          <input
                            type="text"
                            required
                            value={siteSettings.chairmanName}
                            onChange={(e) => setSiteSettings({ ...siteSettings, chairmanName: e.target.value })}
                            className="w-full px-3 py-2 border rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Chairman Title</label>
                          <input
                            type="text"
                            required
                            value={siteSettings.chairmanTitle}
                            onChange={(e) => setSiteSettings({ ...siteSettings, chairmanTitle: e.target.value })}
                            className="w-full px-3 py-2 border rounded-xl"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Chairman Quote / Message</label>
                        <textarea
                          rows={3}
                          required
                          value={siteSettings.chairmanQuote}
                          onChange={(e) => setSiteSettings({ ...siteSettings, chairmanQuote: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-container shadow-sm transition"
                    >
                      Save Site Settings
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </main>

      {/* ================= MODAL: MEMBER ================= */}
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

      {/* ================= MODAL: COMMITTEE ================= */}
      {showCommitteeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingCommitteeId ? 'Edit Committee Officer' : 'Add Executive Officer'}
              </h3>
              <button onClick={() => setShowCommitteeModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveCommittee} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={committeeForm.name}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Chapter Role</label>
                  <input
                    type="text"
                    required
                    value={committeeForm.role}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, role: e.target.value })}
                    placeholder="e.g. Chairman / Hony. Secretary"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={committeeForm.category}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="Apex">Apex</option>
                    <option value="Office Bearer">Office Bearer</option>
                    <option value="Executive Member">Executive Member</option>
                    <option value="Advisory">Advisory</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Order Index</label>
                  <input
                    type="number"
                    value={committeeForm.orderIndex}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, orderIndex: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={committeeForm.title}
                  onChange={(e) => setCommitteeForm({ ...committeeForm, title: e.target.value })}
                  placeholder="e.g. Chief Scientist & Head of Pyrometallurgy"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Institution / Organization</label>
                <input
                  type="text"
                  required
                  value={committeeForm.institution}
                  onChange={(e) => setCommitteeForm({ ...committeeForm, institution: e.target.value })}
                  placeholder="e.g. CSIR-IMMT, Bhubaneswar"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    value={committeeForm.email}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Chamber / Location</label>
                  <input
                    type="text"
                    value={committeeForm.location}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, location: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Profile Photo</label>
                <ImageUpload
                  value={committeeForm.image}
                  onChange={(url) => setCommitteeForm({ ...committeeForm, image: url })}
                  label="Upload Officer Photo"
                  folder="/committee"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Biography</label>
                <textarea
                  rows={2}
                  value={committeeForm.bio}
                  onChange={(e) => setCommitteeForm({ ...committeeForm, bio: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCommitteeModal(false)}
                  className="px-4 py-2 border rounded-xl font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-container"
                >
                  Save Officer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: PROGRAMME ================= */}
      {showProgrammeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingProgrammeId ? 'Edit Programme' : 'Add Flagship Programme'}
              </h3>
              <button onClick={() => setShowProgrammeModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveProgramme} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Programme Title</label>
                <input
                  type="text"
                  required
                  value={programmeForm.title}
                  onChange={(e) => setProgrammeForm({ ...programmeForm, title: e.target.value })}
                  placeholder="e.g. Annual Foundation Day & Fellowship Conferment"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={programmeForm.category}
                    onChange={(e) => setProgrammeForm({ ...programmeForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="Annual Tradition">Annual Tradition</option>
                    <option value="Honors & Recognition">Honors & Recognition</option>
                    <option value="Constitutional Governance">Constitutional Governance</option>
                    <option value="Endowed Memorial Oration">Endowed Memorial Oration</option>
                    <option value="Youth & Academic Outreach">Youth & Academic Outreach</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Annual Schedule</label>
                  <input
                    type="text"
                    required
                    value={programmeForm.annualSchedule}
                    onChange={(e) => setProgrammeForm({ ...programmeForm, annualSchedule: e.target.value })}
                    placeholder="e.g. 24 February Annually"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={programmeForm.description}
                  onChange={(e) => setProgrammeForm({ ...programmeForm, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Key Highlights / Pillars (Comma separated)
                </label>
                <input
                  type="text"
                  value={programmeForm.highlights}
                  onChange={(e) => setProgrammeForm({ ...programmeForm, highlights: e.target.value })}
                  placeholder="Life Citations, Milestone Track Release, Keynote Lecture"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Banner Image URL</label>
                <input
                  type="text"
                  value={programmeForm.bannerImage}
                  onChange={(e) => setProgrammeForm({ ...programmeForm, bannerImage: e.target.value })}
                  placeholder="https://... or /assets/images/..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brochure / Guidelines PDF URL</label>
                <input
                  type="text"
                  value={programmeForm.brochurePdfUrl}
                  onChange={(e) => setProgrammeForm({ ...programmeForm, brochurePdfUrl: e.target.value })}
                  placeholder="/uploads/circulars/guidelines.pdf"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProgrammeModal(false)}
                  className="px-4 py-2 border rounded-xl font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-container"
                >
                  Save Programme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: SPONSOR ================= */}
      {showSponsorModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingSponsorId ? 'Edit Sponsor Details' : 'Add Corporate Sponsor'}
              </h3>
              <button onClick={() => setShowSponsorModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveSponsor} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Sponsor Company Name</label>
                <input
                  type="text"
                  required
                  value={sponsorForm.name}
                  onChange={(e) => setSponsorForm({ ...sponsorForm, name: e.target.value })}
                  placeholder="e.g. Tata Steel Kalinganagar"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sponsorship Tier</label>
                  <select
                    value={sponsorForm.tier}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, tier: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="Title Sponsor">Title Sponsor</option>
                    <option value="Platinum Sponsor">Platinum Sponsor</option>
                    <option value="Gold Sponsor">Gold Sponsor</option>
                    <option value="Silver Sponsor">Silver Sponsor</option>
                    <option value="Knowledge Partner">Knowledge Partner</option>
                    <option value="Institutional Partner">Institutional Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Order Index</label>
                  <input
                    type="number"
                    value={sponsorForm.orderIndex}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, orderIndex: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Logo Image (ImageUpload or URL)</label>
                <input
                  type="text"
                  required
                  value={sponsorForm.logoUrl}
                  onChange={(e) => setSponsorForm({ ...sponsorForm, logoUrl: e.target.value })}
                  placeholder="/assets/images/logo1.svg or URL"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Website URL</label>
                <input
                  type="url"
                  value={sponsorForm.websiteUrl}
                  onChange={(e) => setSponsorForm({ ...sponsorForm, websiteUrl: e.target.value })}
                  placeholder="https://www.tatasteel.com"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description / Contribution</label>
                <textarea
                  rows={2}
                  value={sponsorForm.description}
                  onChange={(e) => setSponsorForm({ ...sponsorForm, description: e.target.value })}
                  placeholder="Pioneering industrial partner in Eastern Indian steelmaking..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSponsorModal(false)}
                  className="px-4 py-2 border rounded-xl font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-container"
                >
                  Save Sponsor
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
                    onChange={(e) => setEventForm({ ...eventForm, status: e.target.value as any })}
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

      {/* ================= MODAL: STUDENT CHAPTER ================= */}
      {showChapterModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingChapterId ? 'Edit Student Chapter' : 'Add Affiliated Student Chapter'}
              </h3>
              <button onClick={() => setShowChapterModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveChapter} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">University / Institute</label>
                <input
                  type="text"
                  required
                  value={chapterForm.institution}
                  onChange={(e) => setChapterForm({ ...chapterForm, institution: e.target.value })}
                  placeholder="e.g. School of Minerals (SMMME), IIT Bhubaneswar"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Established Year</label>
                  <input
                    type="number"
                    required
                    value={chapterForm.establishedYear}
                    onChange={(e) => setChapterForm({ ...chapterForm, establishedYear: parseInt(e.target.value) || 2026 })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Member Count</label>
                  <input
                    type="number"
                    required
                    value={chapterForm.memberCount}
                    onChange={(e) => setChapterForm({ ...chapterForm, memberCount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Faculty Advisor</label>
                  <input
                    type="text"
                    required
                    value={chapterForm.facultyAdvisor}
                    onChange={(e) => setChapterForm({ ...chapterForm, facultyAdvisor: e.target.value })}
                    placeholder="e.g. Dr. S. K. Dash"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={chapterForm.location}
                    onChange={(e) => setChapterForm({ ...chapterForm, location: e.target.value })}
                    placeholder="e.g. Argul Campus, Jatni"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Activities &amp; Highlights</label>
                <textarea
                  rows={2}
                  value={chapterForm.highlights}
                  onChange={(e) => setChapterForm({ ...chapterForm, highlights: e.target.value })}
                  placeholder="Annual Metallurgy Quiz, Metallography Poster Contests..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowChapterModal(false)}
                  className="px-4 py-2 border rounded-xl font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-container"
                >
                  Save Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
