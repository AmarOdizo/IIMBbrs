import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { CommitteeMember } from '@/backend/models/CommitteeMember';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

export async function getCommitteeMembers(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const filter: Record<string, unknown> = { isActive: true };
    if (category && category !== 'All') {
      filter.category = category;
    }

    const officers = await CommitteeMember.find(filter).sort({ orderIndex: 1, createdAt: 1 });
    return successResponse(officers);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch committee members';
    return errorResponse(message, 500);
  }
}

export async function createCommitteeMember(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const member = await CommitteeMember.create(body);
    return successResponse(member, 'Committee member added successfully', 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create committee member';
    return errorResponse(message, 400);
  }
}

export async function updateCommitteeMember(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const updated = await CommitteeMember.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return errorResponse('Committee member not found', 404);
    }
    return successResponse(updated, 'Committee member updated');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update committee member';
    return errorResponse(message, 400);
  }
}

export async function deleteCommitteeMember(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const deleted = await CommitteeMember.findByIdAndDelete(id);
    if (!deleted) {
      return errorResponse('Committee member not found', 404);
    }
    return successResponse(null, 'Committee member removed');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete committee member';
    return errorResponse(message, 500);
  }
}
