import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { SiteSetting } from '@/backend/models/SiteSetting';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

const defaultSiteSettings = {
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
  chairmanPhotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXJLb17-gAgiAbTuy8BbvJYrloluT-VtCz2Srii32Kl6kmr8754QzKuV0JdNNvve6Sus3DvgQTAObVcV-Ci4BdAGzoG4Vju6YPVhKfe4Z3goGnvDkqAjXlPdfXVbgbkv2CKKd0tufy0Y44iwCX5KRiHSLI4uQt0wa73raNAua88vSdfUQ6-P98KizsHgZ0BNrtLIr_603BX0P5RGtWdpgCPInzBhwJPJMBKuSCRl5mxx9zJm200HmF',
};

export async function getSiteSettings() {
  try {
    await connectDB();
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(defaultSiteSettings);
    }
    return successResponse(settings);
  } catch (err: unknown) {
    console.error('Failed to fetch site settings from DB, using fallback defaults:', err);
    return successResponse(defaultSiteSettings);
  }
}

export async function updateSiteSettings(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();

    // Remove immutable and system fields so MongoDB doesn't throw immutable path error on _id
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, createdAt, updatedAt, ...updateData } = body;

    let settings = await SiteSetting.findOne();
    if (settings) {
      settings = await SiteSetting.findByIdAndUpdate(
        settings._id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
    } else {
      settings = await SiteSetting.create(updateData);
    }
    return successResponse(settings, 'Site settings updated successfully');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update site settings';
    return errorResponse(message, 400);
  }
}
