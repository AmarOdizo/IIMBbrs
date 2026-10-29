import connectDB from './db';
import {
  Admin,
  Member,
  CommitteeMember,
  NewsCircular,
  GalleryItem,
  StudentChapter,
  AuditLog,
  Event,
  MembershipApplication,
  SymposiumRegistration,
  PaperSubmission,
  ContactInquiry,
} from './models';
import { hashPassword } from './utils/auth';
import {
  committeeMembers,
  membersList,
  newsList,
  galleryItems,
  studentChaptersData,
} from '../frontend/src/data/siteData';

export async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected.');

    // 1. Seed Default Super Admin
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@iimbhubaneswar.in';
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123';
    let admin = await Admin.findOne({ email: adminEmail });

    if (!admin) {
      const hashedPassword = await hashPassword(adminPassword);
      admin = await Admin.create({
        name: 'Dr. Tarun K. Biswal',
        email: adminEmail,
        password: hashedPassword,
        role: 'super_admin',
        designation: 'Hony. Jt. Secretary & Data Steward',
        isActive: true,
      });
      console.log(`✅ Default Super Admin created: ${adminEmail} / ${adminPassword}`);
    } else {
      console.log('ℹ️ Admin account already exists.');
    }

    // 2. Seed Members
    const memberCount = await Member.countDocuments();
    if (memberCount === 0) {
      const membersToInsert = membersList.map((m) => ({
        memberCode: m.id,
        name: m.name,
        category: m.category,
        organization: m.org,
        city: m.city,
        state: 'Odisha',
        status: 'Active',
      }));
      await Member.insertMany(membersToInsert);
      console.log(`✅ Seeded ${membersToInsert.length} Members.`);
    }

    // 3. Seed Committee Members
    const committeeCount = await CommitteeMember.countDocuments();
    if (committeeCount === 0) {
      const committeeToInsert = committeeMembers.map((c, index) => ({
        name: c.name,
        role: c.role,
        category: c.category,
        title: c.title,
        institution: c.institution,
        email: c.email,
        location: c.location,
        bio: c.bio,
        tags: c.tags,
        image: c.image,
        orderIndex: index + 1,
        isActive: true,
      }));
      await CommitteeMember.insertMany(committeeToInsert);
      console.log(`✅ Seeded ${committeeToInsert.length} Committee Members.`);
    }

    // 4. Seed News & Circulars
    const newsCount = await NewsCircular.countDocuments();
    if (newsCount === 0) {
      const newsToInsert = newsList.map((n) => ({
        circularNo: `CIR-48/0${n.id.replace('news-', '')}`,
        title: n.title,
        category: n.category,
        summary: n.summary,
        author: n.author,
        isFeatured: n.featured,
        isPublished: true,
        publishedAt: new Date(n.date),
      }));
      await NewsCircular.insertMany(newsToInsert);
      console.log(`✅ Seeded ${newsToInsert.length} News & Circular items.`);
    }

    // 5. Seed Gallery Items
    const galleryCount = await GalleryItem.countDocuments();
    if (galleryCount === 0) {
      const galleryToInsert = galleryItems.map((g, index) => ({
        title: g.title,
        category: g.category,
        imageUrl: g.imageUrl,
        description: g.desc,
        orderIndex: index + 1,
        isActive: true,
      }));
      await GalleryItem.insertMany(galleryToInsert);
      console.log(`✅ Seeded ${galleryToInsert.length} Gallery items.`);
    }

    // 6. Seed Student Chapters
    const studentChapterCount = await StudentChapter.countDocuments();
    if (studentChapterCount === 0) {
      const chaptersToInsert = studentChaptersData.map((sc) => ({
        institution: sc.institution,
        establishedYear: sc.estd,
        facultyAdvisor: sc.advisor,
        location: sc.location,
        memberCount: sc.members,
        highlights: sc.highlights,
        badgeStatus: sc.badge,
        isActive: true,
      }));
      await StudentChapter.insertMany(chaptersToInsert);
      console.log(`✅ Seeded ${chaptersToInsert.length} Student Chapters.`);
    }

    // 7. Seed Events (The 8 Flagship 2026 Seminars & Lectures)
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      const eventsToInsert = [
        {
          title: '18th National Symposium on AHSS & Decarbonized Ironmaking (AHSS-2026)',
          eventType: 'National Symposium',
          eventDate: new Date('2026-03-28T09:00:00Z'),
          time: '09:00 AM – 05:30 PM IST',
          venue: 'Dr. Nilamani Sen Hall, CSIR-IMMT & Virtual Hybrid',
          description: 'Focusing on physical metallurgy of ultra-clean automotive grades, hydrogen DRI kinetics in Eastern Indian hematite pellets, and circular slag valorization.',
          speakers: [
            { name: 'Dr. Ashok Kumar Mohanty', designation: 'Chief Scientist, CSIR-IMMT', topic: 'Decarbonization Pathways for Eastern Indian Steelmakers' },
            { name: 'Prof. Debashish Bhattacharjee', designation: 'VP, Technology & New Materials, Tata Steel', topic: 'Third-Generation AHSS Commercialization' },
          ],
          bannerImage: '/assets/images/hero_ahss_structure.jpg',
          registrationUrl: '/symposium',
          status: 'Upcoming',
          isFeatured: true,
        },
        {
          title: 'International Workshop on Green Hydrogen in Blast Furnaces & DRI',
          eventType: 'Technical Workshop',
          eventDate: new Date('2026-04-15T09:30:00Z'),
          time: '09:30 AM – 05:00 PM IST',
          venue: 'Mayfair Convention & Hybrid Stream, Bhubaneswar',
          description: 'Evaluating tuyere gas injection dynamics, cold pellet crushing strength, and thermochemical modeling of zero-carbon ironmaking shafts.',
          status: 'Upcoming',
          isFeatured: true,
        },
        {
          title: 'Prof. P. K. Jena Memorial Lecture on Mineral Wealth of Odisha',
          eventType: 'Memorial Lecture',
          eventDate: new Date('2026-05-08T16:30:00Z'),
          time: '04:30 PM – 07:00 PM IST',
          venue: 'Main Auditorium, IIT Bhubaneswar',
          description: 'Annual endowment oration delivering strategic pathways for bauxite, chromite, and manganese valorization in eastern regional clusters.',
          status: 'Upcoming',
          isFeatured: false,
        },
        {
          title: 'Colloquium on Strategic Rare Earth & Titanium Sand Beneficiation',
          eventType: 'Colloquium',
          eventDate: new Date('2026-06-22T10:00:00Z'),
          time: '10:00 AM – 05:30 PM IST',
          venue: 'CSIR-IMMT Bhubaneswar Campus',
          description: 'Industrial round-table focusing on heavy mineral beach sands of Ganjam, monazite cracking, and ilmenite chlorination processes.',
          status: 'Upcoming',
          isFeatured: false,
        },
        {
          title: 'Odisha Metallurgical Conclave & Inter-Collegiate Quiz 2026',
          eventType: 'Technical Workshop',
          eventDate: new Date('2026-07-18T09:00:00Z'),
          time: '2-Day Summit',
          venue: 'KIIT-DU School of Materials Science, Bhubaneswar',
          description: 'Undergraduate paper competitions, metallographic photo-micrograph contests, and state-wide metallurgical quiz with ₹1,00,000 cash prizes.',
          status: 'Upcoming',
          isFeatured: false,
        },
        {
          title: 'National Metallurgist Day (NMD) Regional Honors & Banquet',
          eventType: 'Annual General Meeting',
          eventDate: new Date('2026-08-07T18:00:00Z'),
          time: '06:00 PM – 10:00 PM IST',
          venue: 'Hotel Swosti Premium, Bhubaneswar',
          description: 'Honoring distinguished chapter fellows, presenting Young Metallurgist Excellence plaques, and Chapter Executive installation dinner.',
          status: 'Upcoming',
          isFeatured: true,
        },
        {
          title: 'Seminar on Corrosion Engineering in Marine & Coastal Industrial Assets',
          eventType: 'Technical Workshop',
          eventDate: new Date('2026-09-18T09:30:00Z'),
          time: 'Full Day Technical',
          venue: 'IISER Berhampur & Gopalpur Port',
          description: 'Cathodic protection design, microbial-induced corrosion in offshore piping, and field excursion across port structures at Gopalpur.',
          status: 'Upcoming',
          isFeatured: false,
        },
        {
          title: 'Industrial Workshop on Circular Economy & Red Mud Valorization',
          eventType: 'Technical Workshop',
          eventDate: new Date('2026-10-14T09:00:00Z'),
          time: '09:00 AM – 05:00 PM IST',
          venue: 'NALCO Research & Damanjodi Delegations',
          description: 'Extraction of scandium and titanium values from bauxite residue, geopolymer cement synthesis, and commercial slag utilization benchmarks.',
          status: 'Upcoming',
          isFeatured: false,
        },
      ];
      await Event.insertMany(eventsToInsert);
      console.log(`✅ Seeded ${eventsToInsert.length} Events.`);
    }

    // 8. Seed Membership Scrutiny Queue Applications (as displayed on Admin Dashboard)
    const appCount = await MembershipApplication.countDocuments();
    if (appCount === 0) {
      const appsToInsert = [
        {
          docketNo: 'LM-2026-089',
          fullName: 'Dr. Priyadarshini Sen',
          email: 'p.sen@immt.res.in',
          phone: '+91 94371 88201',
          organization: 'CSIR - IMMT Bhubaneswar',
          designation: 'Senior Scientist (Hydrometallurgy)',
          cadreSought: 'Life Fellow (LM)',
          applicationType: 'New Application',
          verificationStatus: 'Docs Pending',
          remarks: 'Ph.D. degree certificate verified; sponsor seal pending.',
        },
        {
          docketNo: 'TR-2026-042',
          fullName: 'Er. Sourav Mishra',
          email: 'sourav.mishra@tatasteel.com',
          phone: '+91 98610 44321',
          organization: 'Tata Steel Kalinganagar',
          designation: 'Manager (Blast Furnace Operations)',
          cadreSought: 'Life Member',
          applicationType: 'Chapter Transfer',
          existingIimId: 'LM-JSR-1842',
          verificationStatus: 'Ready for Seal',
          remarks: 'Transfer clearance letter received from Jamshedpur Chapter.',
        },
        {
          docketNo: 'ST-2026-118',
          fullName: 'Amitav Mohapatra',
          email: 'amitav.m@iitbbs.ac.in',
          phone: '+91 79780 12345',
          organization: 'IIT Bhubaneswar (SMMME)',
          designation: 'B.Tech Student (Metallurgical & Materials)',
          cadreSought: 'Student Chapter',
          applicationType: 'New Application',
          verificationStatus: 'HOD Endorsed',
          remarks: 'HOD letter submitted. Student membership fee ₹800 cleared.',
        },
        {
          docketNo: 'CP-2026-015',
          fullName: 'Utkal Alumina Int. Ltd',
          email: 'corporate@utkalalumina.com',
          phone: '+91 674 230 4500',
          organization: 'Rayagada Operations',
          designation: 'General Manager (CSR & Institutional Linkages)',
          cadreSought: 'Corporate Patron',
          applicationType: 'New Application',
          verificationStatus: 'Board Resol. Awaited',
          remarks: 'Board resolution document awaited from corporate headquarters.',
        },
      ];
      await MembershipApplication.insertMany(appsToInsert);
      console.log(`✅ Seeded ${appsToInsert.length} Membership Scrutiny Applications.`);
    }

    // 9. Seed Symposium Registrations (Delegates)
    const regCount = await SymposiumRegistration.countDocuments();
    if (regCount === 0) {
      const registrationsToInsert = [
        {
          symposiumTitle: '18th National Symposium (AHSS-2026)',
          delegateName: 'Dr. Suchitra Mohanty',
          email: 'suchitra@immt.res.in',
          phone: '+91 94370 12345',
          institution: 'CSIR - IMMT Bhubaneswar',
          tier: 'IIM Members',
          feeAmount: 3500,
          mode: 'Physical',
          paymentStatus: 'Paid',
          paymentId: 'PAY-AHSS-2026-0101',
          badgeQrCode: 'AHSS-2026-3041',
          isAttendingBanquet: true,
        },
        {
          symposiumTitle: '18th National Symposium (AHSS-2026)',
          delegateName: 'Er. Rajeshwar Panda',
          email: 'rajeshwar.p@easternsteel.com',
          phone: '+91 98612 88765',
          institution: 'Eastern Steel Mills, Jajpur',
          tier: 'Non-Members',
          feeAmount: 5000,
          mode: 'Physical',
          paymentStatus: 'Paid',
          paymentId: 'PAY-AHSS-2026-0102',
          badgeQrCode: 'AHSS-2026-3042',
          isAttendingBanquet: true,
        },
        {
          symposiumTitle: '18th National Symposium (AHSS-2026)',
          delegateName: 'Ananya Roy',
          email: 'ananya.roy@iitbbs.ac.in',
          phone: '+91 82490 65432',
          institution: 'IIT Bhubaneswar',
          tier: 'Student Delegates',
          feeAmount: 1500,
          mode: 'Physical',
          paymentStatus: 'Paid',
          paymentId: 'PAY-AHSS-2026-0103',
          badgeQrCode: 'AHSS-2026-3043',
          isAttendingBanquet: true,
        },
        {
          symposiumTitle: '18th National Symposium (AHSS-2026)',
          delegateName: 'Tata Steel Meramandali Delegation',
          email: 'delegates@tatasteel.com',
          phone: '+91 6762 280000',
          institution: 'Tata Steel Ltd, Dhenkanal',
          tier: 'Corporate / Industry',
          feeAmount: 10000,
          mode: 'Physical',
          paymentStatus: 'Paid',
          paymentId: 'PAY-AHSS-2026-0104',
          badgeQrCode: 'AHSS-2026-3044',
          isAttendingBanquet: true,
        },
      ];
      await SymposiumRegistration.insertMany(registrationsToInsert);
      console.log(`✅ Seeded ${registrationsToInsert.length} Symposium Registrations.`);
    }

    // 10. Seed Paper Submissions (Across the 4 Tracks)
    const paperCount = await PaperSubmission.countDocuments();
    if (paperCount === 0) {
      const papersToInsert = [
        {
          symposiumTitle: '18th National Symposium (AHSS-2026)',
          paperTitle: 'Hydrogen Direct Reduction Kinetics in Eastern Indian Hematite Pellets',
          track: 'Track 1: Green Steel & Hydrogen Metallurgy',
          authors: ['Dr. Alok R. Mohanty', 'Dr. S. K. Singh'],
          correspondingAuthor: {
            name: 'Dr. Alok R. Mohanty',
            email: 'armohanty@immt.res.in',
            phone: '+91 674 237 9401',
            institution: 'CSIR-IMMT Bhubaneswar',
          },
          abstractText: 'Thermodynamic modeling and isothermal reduction tests of high-alumina hematite pellets using pure H2 and syngas in fluidized and packed beds.',
          keywords: ['H2-DRI', 'Direct Reduction', 'Hematite Pellets', 'Kinetics'],
          reviewStatus: 'Under Review',
          reviewerNotes: 'Excellent kinetic modeling data; suggest incorporating sticking test data at 900C.',
        },
        {
          symposiumTitle: '18th National Symposium (AHSS-2026)',
          paperTitle: 'Microstructural Engineering and Formability of DP1180 Automotive Steels',
          track: 'Track 2: Advanced High Strength Steels (AHSS)',
          authors: ['Prof. S. N. Pattnaik', 'Ananya Roy'],
          correspondingAuthor: {
            name: 'Prof. S. N. Pattnaik',
            email: 'secretary@iimbhubaneswar.in',
            phone: '+91 674 237 4112',
            institution: 'IIT Bhubaneswar',
          },
          abstractText: 'Investigation of austenite retention and hole expansion ratios during quenching and partitioning of 3rd generation dual phase steels.',
          keywords: ['DP1180', 'AHSS', 'Formability', 'Austenite Retention'],
          reviewStatus: 'Accepted',
          reviewerNotes: 'Accepted for oral plenary session presentation.',
        },
        {
          symposiumTitle: '18th National Symposium (AHSS-2026)',
          paperTitle: 'Recovery of Strategic Rare Earth Elements from Ganjam Beach Sands',
          track: 'Track 3: Critical & Rare Minerals',
          authors: ['Dr. Saroj K. Singh', 'Dr. L. D. Besra'],
          correspondingAuthor: {
            name: 'Dr. Saroj K. Singh',
            email: 'treasurer@iimbhubaneswar.in',
            phone: '+91 674 237 4112',
            institution: 'CSIR-IMMT',
          },
          abstractText: 'Hydrometallurgical flowsheets for extraction of neodymium and cerium fractions from coastal placer monazite deposits.',
          keywords: ['Rare Earth Elements', 'Neodymium', 'Beach Sands', 'Hydrometallurgy'],
          reviewStatus: 'Under Review',
        },
        {
          symposiumTitle: '18th National Symposium (AHSS-2026)',
          paperTitle: 'Flotation Kinetics and Zero-Liquid Discharge in Low-Grade Iron Ore Beneficiation',
          track: 'Track 4: Sustainable Mineral Processing',
          authors: ['Er. Bimal K. Sahoo', 'Er. R. K. Dash'],
          correspondingAuthor: {
            name: 'Er. Bimal K. Sahoo',
            email: 'bimal.sahoo@tatasteel.com',
            phone: '+91 6762 280000',
            institution: 'Tata Steel Meramandali',
          },
          abstractText: 'Field scale column flotation results on low grade Odisha slimes achieving 64% Fe concentrate with zero wastewater discharge.',
          keywords: ['Slimes Beneficiation', 'Column Flotation', 'Zero Liquid Discharge'],
          reviewStatus: 'Submitted',
        },
      ];
      await PaperSubmission.insertMany(papersToInsert);
      console.log(`✅ Seeded ${papersToInsert.length} Paper Submissions.`);
    }

    // 11. Seed Contact Inquiries
    const inquiryCount = await ContactInquiry.countDocuments();
    if (inquiryCount === 0) {
      const inquiriesToInsert = [
        {
          docketId: 'IIM-BBS-2026-0814',
          category: 'symposia',
          fullName: 'Dr. Priyadarshini Sen',
          email: 'p.sen@tatasteel.com',
          phone: '+91 94371 88201',
          organization: 'Tata Steel Kalinganagar',
          subjectRef: 'AHSS-2026/ABS/409 - Microstructure Evaluation Abstract',
          messageBody: 'Inquiring regarding oral slot confirmation for our presentation on flash smelting and DP1180 evaluation.',
          status: 'In Progress',
          replyNotes: 'Under review by Technical Symposia Convenor.',
        },
        {
          docketId: 'IIM-BBS-2026-0421',
          category: 'membership',
          fullName: 'Er. Rajeshwar Panda',
          email: 'r.panda@easternsteel.com',
          phone: '+91 98612 88765',
          organization: 'Eastern Steel Mills',
          subjectRef: 'Chapter Transfer (Jamshedpur to Bhubaneswar Chapter)',
          messageBody: 'Relocating to Jajpur industrial cluster. Requesting transfer of my Life Membership roll.',
          status: 'Resolved',
          replyNotes: 'Transferred and seal allocated under TR-2026-042.',
        },
        {
          docketId: 'IIM-BBS-2026-0195',
          category: 'student',
          fullName: 'Subham Kumar Jena',
          email: 'subham.jena@vssut.ac.in',
          phone: '+91 97780 43210',
          organization: 'VSSUT Burla',
          subjectRef: 'Collegiate Seed Grant 2026 Application',
          messageBody: 'Submitting team project proposal for foundry technology demonstration grant under student chapter.',
          status: 'New',
        },
      ];
      await ContactInquiry.insertMany(inquiriesToInsert);
      console.log(`✅ Seeded ${inquiriesToInsert.length} Contact Inquiries.`);
    }

    // 12. Seed Initial Audit Log
    const auditCount = await AuditLog.countDocuments();
    if (auditCount <= 1) {
      await AuditLog.create({
        adminName: admin?.name || 'Dr. Tarun K. Biswal',
        action: 'COUNCIL_RECONCILIATION',
        targetEntity: 'All Collections',
        details: 'Full institutional dataset synchronized across all 12 collections with Kolkata HQ rolls',
        ipAddress: '127.0.0.1',
      });
      console.log('✅ Council Reconciliation Audit Log recorded.');
    }

    console.log('🎉 Database seeding completed: All 12 collections fully populated!');
  } catch (err) {
    console.error('❌ Database seeding error:', err);
  }
}

// Auto-run if executed directly via node
if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}
