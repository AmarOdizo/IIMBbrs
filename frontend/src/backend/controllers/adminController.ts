import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { Member } from '@/backend/models/Member';
import { MembershipApplication } from '@/backend/models/MembershipApplication';
import { SymposiumRegistration } from '@/backend/models/SymposiumRegistration';
import { PaperSubmission } from '@/backend/models/PaperSubmission';
import { NewsCircular } from '@/backend/models/NewsCircular';
import { AuditLog } from '@/backend/models/AuditLog';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

export async function getDashboardStats(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();

    const [
      totalMembers,
      lifeMembers,
      studentMembers,
      corporateMembers,
      pendingApplications,
      totalDelegates,
      papersInReview,
      totalCirculars,
      recentApplications,
      recentAuditLogs,
    ] = await Promise.all([
      Member.countDocuments({ status: 'Active' }),
      Member.countDocuments({ category: 'Life Member', status: 'Active' }),
      Member.countDocuments({ category: 'Student Member', status: 'Active' }),
      Member.countDocuments({ category: 'Corporate Member', status: 'Active' }),
      MembershipApplication.countDocuments({ verificationStatus: { $ne: 'Approved' } }),
      SymposiumRegistration.countDocuments(),
      PaperSubmission.countDocuments({ reviewStatus: { $in: ['Submitted', 'Under Review'] } }),
      NewsCircular.countDocuments({ isPublished: true }),
      MembershipApplication.find().sort({ createdAt: -1 }).limit(5),
      AuditLog.find().sort({ createdAt: -1 }).limit(10),
    ]);

    return successResponse({
      stats: {
        totalMembers,
        cadreComposition: {
          lifeMembers,
          studentMembers,
          corporateMembers,
          otherMembers: totalMembers - (lifeMembers + studentMembers + corporateMembers),
        },
        pendingScrutiny: pendingApplications,
        ahssDelegates: totalDelegates,
        papersInReview,
        totalCirculars,
      },
      recentApplications,
      recentAuditLogs,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to retrieve dashboard statistics';
    return errorResponse(message, 500);
  }
}

export async function getAuditLogs(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(100);
    return successResponse(logs);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch audit logs';
    return errorResponse(message, 500);
  }
}
