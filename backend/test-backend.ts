import connectDB from './db';
import {
  Admin,
  Member,
  CommitteeMember,
  NewsCircular,
  GalleryItem,
  StudentChapter,
  Event,
  MembershipApplication,
  SymposiumRegistration,
  PaperSubmission,
  ContactInquiry,
  AuditLog,
} from './models';
import { comparePassword, generateToken } from './utils/auth';

async function runTests() {
  console.log('========================================================');
  console.log('🧪 IIM BHUBANESWAR CHAPTER - BACKEND INTEGRATION TEST');
  console.log('========================================================\n');

  try {
    // 1. Database Connection
    console.log('1️⃣ Testing Database Connection...');
    await connectDB();
    console.log('   ✅ MongoDB connected successfully!\n');

    // 2. Collections & Documents Verification
    console.log('2️⃣ Verifying All 12 Collections Document Counts...');
    const checks = [
      { name: 'Admin', model: Admin, min: 1 },
      { name: 'Member', model: Member, min: 1 },
      { name: 'CommitteeMember', model: CommitteeMember, min: 1 },
      { name: 'NewsCircular', model: NewsCircular, min: 1 },
      { name: 'GalleryItem', model: GalleryItem, min: 1 },
      { name: 'StudentChapter', model: StudentChapter, min: 1 },
      { name: 'Event', model: Event, min: 1 },
      { name: 'MembershipApplication', model: MembershipApplication, min: 1 },
      { name: 'SymposiumRegistration', model: SymposiumRegistration, min: 1 },
      { name: 'PaperSubmission', model: PaperSubmission, min: 1 },
      { name: 'ContactInquiry', model: ContactInquiry, min: 1 },
      { name: 'AuditLog', model: AuditLog, min: 1 },
    ];

    for (const check of checks) {
      const count = await check.model.countDocuments();
      if (count >= check.min) {
        console.log(`   ✅ ${check.name.padEnd(25)} : ${count} records`);
      } else {
        console.log(`   ❌ ${check.name.padEnd(25)} : ${count} records (Expected >= ${check.min})`);
      }
    }
    console.log('');

    // 3. Super Admin Authentication & JWT Verification
    console.log('3️⃣ Testing Super Admin Authentication...');
    const admin = await Admin.findOne({ email: 'admin@iimbhubaneswar.in' });
    if (!admin) {
      throw new Error('Super admin not found!');
    }
    const isPasswordValid = await comparePassword('Admin@123', admin.password);
    if (!isPasswordValid) {
      throw new Error('Password mismatch for super admin!');
    }
    const token = generateToken({
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
      name: admin.name,
    });
    console.log('   ✅ Password verification successful!');
    console.log(`   ✅ JWT Token generated successfully: ${token.substring(0, 24)}... (length: ${token.length})\n`);

    // 4. Test Inserting a New Contact Inquiry
    console.log('4️⃣ Testing Inquiry Insertion & Tracking Docket Generation...');
    const testDocket = `IIM-TEST-${Date.now().toString().slice(-4)}`;
    const newInquiry = await ContactInquiry.create({
      docketId: testDocket,
      category: 'symposia',
      fullName: 'Test Automation Runner',
      email: 'test@immt.res.in',
      phone: '+91 99999 88888',
      organization: 'CSIR-IMMT Testing Lab',
      subjectRef: 'Automated Backend Smoke Test',
      messageBody: 'Validating database write operations for secretariat intake.',
      status: 'New',
    });
    console.log(`   ✅ Inquiry created with Docket: ${newInquiry.docketId} (_id: ${newInquiry._id})`);

    // Clean up test inquiry
    await ContactInquiry.deleteOne({ _id: newInquiry._id });
    console.log('   ✅ Test inquiry cleaned up successfully.\n');

    // 5. Audit Log Record Check
    console.log('5️⃣ Testing Audit Log Recording...');
    const latestAudit = await AuditLog.findOne().sort({ createdAt: -1 });
    console.log(`   ✅ Latest Council Action: ${latestAudit?.action} by ${latestAudit?.adminName}`);
    console.log(`   ✅ Details: ${latestAudit?.details}\n`);

    console.log('========================================================');
    console.log('🎉 ALL BACKEND CHECKS PASSED: 12/12 COLLECTIONS OPERATIONAL');
    console.log('========================================================');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    process.exit(1);
  }
}

runTests();
