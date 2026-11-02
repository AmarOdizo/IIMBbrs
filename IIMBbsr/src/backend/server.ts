import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';

// Models
import { Member } from './models/Member';
import { CommitteeMember } from './models/CommitteeMember';
import { Event } from './models/Event';
import { NewsCircular } from './models/NewsCircular';
import { GalleryItem } from './models/GalleryItem';
import { StudentChapter } from './models/StudentChapter';
import { MembershipApplication } from './models/MembershipApplication';
import { SymposiumRegistration } from './models/SymposiumRegistration';
import { PaperSubmission } from './models/PaperSubmission';
import { ContactInquiry } from './models/ContactInquiry';
import { Admin } from './models/Admin';
import { AuditLog } from './models/AuditLog';

// Utils
import { hashPassword, comparePassword, generateToken, verifyToken } from './utils/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Healthcheck
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'IIM Bhubaneswar Backend API',
    timestamp: new Date().toISOString()
  });
});

// ==================== AUTH ROUTES ====================
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const valid = await comparePassword(password, admin.password);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = generateToken({ id: admin._id.toString(), email: admin.email, role: admin.role, name: admin.name });
    return res.json({ success: true, token, user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== MEMBERS ROUTES ====================
app.get('/api/members', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { category, search, city } = req.query;
    const filter: any = {};
    if (category && category !== 'All') filter.category = category;
    if (city) filter.city = new RegExp(String(city), 'i');
    if (search) {
      filter.$or = [
        { name: new RegExp(String(search), 'i') },
        { memberCode: new RegExp(String(search), 'i') },
        { organization: new RegExp(String(search), 'i') }
      ];
    }
    const members = await Member.find(filter).sort({ memberCode: 1 });
    res.json({ success: true, count: members.length, data: members });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== COMMITTEE ROUTES ====================
app.get('/api/committee', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const members = await CommitteeMember.find({ isActive: true }).sort({ displayOrder: 1 });
    res.json({ success: true, count: members.length, data: members });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== EVENTS ROUTES ====================
app.get('/api/events', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { type, isUpcoming } = req.query;
    const filter: any = {};
    if (type && type !== 'All') filter.type = type;
    if (isUpcoming !== undefined) filter.isUpcoming = isUpcoming === 'true';
    const events = await Event.find(filter).sort({ date: 1 });
    res.json({ success: true, count: events.length, data: events });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== NEWS & CIRCULARS ====================
app.get('/api/news', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { category, isPinned } = req.query;
    const filter: any = {};
    if (category && category !== 'All') filter.category = category;
    if (isPinned !== undefined) filter.isPinned = isPinned === 'true';
    const news = await NewsCircular.find(filter).sort({ isPinned: -1, date: -1 });
    res.json({ success: true, count: news.length, data: news });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== GALLERY ROUTES ====================
app.get('/api/gallery', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { category } = req.query;
    const filter: any = {};
    if (category && category !== 'All') filter.category = category;
    const items = await GalleryItem.find(filter).sort({ date: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== STUDENT CHAPTERS ====================
app.get('/api/student-chapters', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const chapters = await StudentChapter.find().sort({ establishedYear: 1 });
    res.json({ success: true, count: chapters.length, data: chapters });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== CONTACT / INQUIRY ====================
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { name, email, phone, organization, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    }
    const docketId = 'DOC-' + Date.now().toString(36).toUpperCase();
    const inquiry = await ContactInquiry.create({
      docketId,
      category: 'secretariat',
      fullName: name,
      email,
      phone: phone || '',
      organization: organization || 'Individual',
      subjectRef: subject || 'General Inquiry',
      messageBody: message,
      status: 'New'
    });
    res.status(201).json({ success: true, message: 'Inquiry submitted successfully', docketId, data: inquiry });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== MEMBERSHIP APPLICATION ====================
app.post('/api/membership-applications', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const appData = req.body;
    const application = await MembershipApplication.create(appData);
    res.status(201).json({ success: true, message: 'Application submitted successfully', data: application });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== SYMPOSIUM REGISTRATION ====================
app.post('/api/symposium/registrations', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const reg = await SymposiumRegistration.create(req.body);
    res.status(201).json({ success: true, message: 'Registration submitted successfully', data: reg });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== START SERVER ====================
async function startServer() {
  try {
    await connectDB();
    console.log(' MongoDB connected successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 IIM Bhubaneswar Backend Server running on http://localhost:${PORT}`);
    });
  } catch (err: any) {
    console.error('❌ Failed to connect to DB or start server:', err.message);
  }
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
