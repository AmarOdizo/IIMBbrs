import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { SymposiumRegistration } from '@/backend/models/SymposiumRegistration';
import { PaperSubmission } from '@/backend/models/PaperSubmission';
import { AuditLog } from '@/backend/models/AuditLog';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

export async function registerDelegate(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const passCode = `AHSS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const registration = await SymposiumRegistration.create({
      ...body,
      badgeQrCode: passCode,
    });

    return successResponse(
      registration,
      `Delegate registered successfully. Ticket Pass: ${passCode}`,
      201
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to register delegate';
    return errorResponse(message, 400);
  }
}

export async function getRegistrations(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const tier = searchParams.get('tier');
    const paymentStatus = searchParams.get('paymentStatus');

    const filter: Record<string, unknown> = {};
    if (tier && tier !== 'All') filter.tier = tier;
    if (paymentStatus && paymentStatus !== 'All') filter.paymentStatus = paymentStatus;

    const registrations = await SymposiumRegistration.find(filter).sort({ createdAt: -1 });
    return successResponse(registrations);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch registrations';
    return errorResponse(message, 500);
  }
}

export async function submitPaper(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const submission = await PaperSubmission.create(body);
    return successResponse(
      submission,
      'Your research paper / abstract has been submitted for peer review.',
      201
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to submit paper';
    return errorResponse(message, 400);
  }
}

export async function getPapers(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const track = searchParams.get('track');
    const status = searchParams.get('status');

    const filter: Record<string, unknown> = {};
    if (track && track !== 'All') filter.track = track;
    if (status && status !== 'All') filter.reviewStatus = status;

    const papers = await PaperSubmission.find(filter).sort({ createdAt: -1 });
    return successResponse(papers);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch papers';
    return errorResponse(message, 500);
  }
}

export async function updatePaperStatus(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated || !auth.user) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const { reviewStatus, reviewerNotes } = body;

    const paper = await PaperSubmission.findByIdAndUpdate(
      id,
      { reviewStatus, reviewerNotes },
      { new: true }
    );

    if (!paper) {
      return errorResponse('Paper submission not found', 404);
    }

    await AuditLog.create({
      adminId: auth.user.id,
      adminName: auth.user.name,
      action: 'UPDATE_PAPER_STATUS',
      targetEntity: 'PaperSubmission',
      targetId: id,
      details: `Paper "${paper.paperTitle}" status set to: ${reviewStatus}`,
    });

    return successResponse(paper, 'Paper status updated');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update paper status';
    return errorResponse(message, 400);
  }
}
