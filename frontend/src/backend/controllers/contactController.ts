import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { ContactInquiry } from '@/backend/models/ContactInquiry';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

export async function submitInquiry(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const year = new Date().getFullYear();
    const randomDocket = Math.floor(1000 + Math.random() * 9000);
    const docketId = `IIM-BBS-${year}-${randomDocket}`;

    const inquiry = await ContactInquiry.create({
      ...body,
      docketId,
    });

    return successResponse(
      inquiry,
      `Your communication has been lodged in the Regional Secretariat register. Docket ID: ${docketId}`,
      201
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to submit dispatch inquiry';
    return errorResponse(message, 400);
  }
}

export async function getInquiries(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    const filter: Record<string, unknown> = {};
    if (category && category !== 'All') filter.category = category;
    if (status && status !== 'All') filter.status = status;

    const inquiries = await ContactInquiry.find(filter).sort({ createdAt: -1 });
    return successResponse(inquiries);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch inquiries';
    return errorResponse(message, 500);
  }
}

export async function updateInquiry(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated || !auth.user) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const { status, replyNotes, assignedTo } = body;

    const updated = await ContactInquiry.findByIdAndUpdate(
      id,
      {
        status,
        replyNotes,
        assignedTo: assignedTo || auth.user.id,
      },
      { new: true }
    );

    if (!updated) {
      return errorResponse('Inquiry not found', 404);
    }

    return successResponse(updated, 'Inquiry updated successfully');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update inquiry';
    return errorResponse(message, 400);
  }
}

export async function deleteInquiry(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const deleted = await ContactInquiry.findByIdAndDelete(id);
    if (!deleted) {
      return errorResponse('Inquiry not found', 404);
    }
    return successResponse(null, 'Inquiry deleted');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete inquiry';
    return errorResponse(message, 500);
  }
}
