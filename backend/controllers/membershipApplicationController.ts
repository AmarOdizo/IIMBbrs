import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { MembershipApplication } from '@/backend/models/MembershipApplication';
import { Member } from '@/backend/models/Member';
import { AuditLog } from '@/backend/models/AuditLog';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

export async function submitApplication(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const year = new Date().getFullYear();
    const randomNum = Math.floor(100 + Math.random() * 900);
    const prefix = body.cadreSought?.includes('Life')
      ? 'LM'
      : body.cadreSought?.includes('Transfer')
      ? 'TR'
      : body.cadreSought?.includes('Student')
      ? 'ST'
      : 'AP';
    const docketNo = `${prefix}-${year}-${randomNum}`;

    const application = await MembershipApplication.create({
      ...body,
      docketNo,
    });

    return successResponse(
      application,
      `Your application has been lodged successfully. Reference Docket: ${docketNo}`,
      201
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to submit application';
    return errorResponse(message, 400);
  }
}

export async function getApplications(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated || !auth.user) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const filter: Record<string, unknown> = {};
    if (status && status !== 'All') {
      filter.verificationStatus = status;
    }

    const applications = await MembershipApplication.find(filter).sort({ createdAt: -1 });
    return successResponse(applications);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch applications';
    return errorResponse(message, 500);
  }
}

export async function updateApplicationStatus(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated || !auth.user) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const { verificationStatus, remarks, autoEnroll } = body;

    const application = await MembershipApplication.findById(id);
    if (!application) {
      return errorResponse('Application not found', 404);
    }

    application.verificationStatus = verificationStatus || application.verificationStatus;
    application.remarks = remarks !== undefined ? remarks : application.remarks;
    application.reviewedBy = auth.user.id as any;
    application.reviewedAt = new Date();
    await application.save();

    // If Secretariat approves and auto-enrolls into the permanent Member roster
    if (autoEnroll && verificationStatus === 'Approved') {
      const memberCode = application.docketNo.replace('AP-', 'LM-');
      await Member.create({
        memberCode,
        name: application.fullName,
        category: application.cadreSought.includes('Life')
          ? 'Life Member'
          : application.cadreSought.includes('Student')
          ? 'Student Member'
          : 'Annual Member',
        organization: application.organization,
        designation: application.designation,
        email: application.email,
        phone: application.phone,
        status: 'Active',
      });
    }

    await AuditLog.create({
      adminId: auth.user.id,
      adminName: auth.user.name,
      action: 'UPDATE_APPLICATION_STATUS',
      targetEntity: 'MembershipApplication',
      targetId: id,
      details: `Docket ${application.docketNo} (${application.fullName}) status updated to: ${verificationStatus}`,
    });

    return successResponse(application, 'Application status updated');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update application';
    return errorResponse(message, 400);
  }
}
