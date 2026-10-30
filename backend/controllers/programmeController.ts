import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { Programme } from '@/backend/models/Programme';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

export async function getProgrammes() {
  try {
    await connectDB();
    const programmes = await Programme.find({ isActive: true }).sort({ orderIndex: 1, createdAt: 1 });
    return successResponse(programmes);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch programmes';
    return errorResponse(message, 500);
  }
}

export async function createProgramme(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const programme = await Programme.create(body);
    return successResponse(programme, 'Programme created successfully', 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create programme';
    return errorResponse(message, 400);
  }
}

export async function updateProgramme(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const programme = await Programme.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!programme) return errorResponse('Programme not found', 404);
    return successResponse(programme, 'Programme updated successfully');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update programme';
    return errorResponse(message, 400);
  }
}

export async function deleteProgramme(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const programme = await Programme.findByIdAndDelete(id);
    if (!programme) return errorResponse('Programme not found', 404);
    return successResponse({ deleted: true }, 'Programme deleted successfully');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete programme';
    return errorResponse(message, 500);
  }
}
