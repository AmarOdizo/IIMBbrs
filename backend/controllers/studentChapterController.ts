import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { StudentChapter } from '@/backend/models/StudentChapter';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

export async function getStudentChapters() {
  try {
    await connectDB();
    const chapters = await StudentChapter.find({ isActive: true }).sort({ establishedYear: 1 });
    return successResponse(chapters);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch student chapters';
    return errorResponse(message, 500);
  }
}

export async function createStudentChapter(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const chapter = await StudentChapter.create(body);
    return successResponse(chapter, 'Student chapter created successfully', 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create student chapter';
    return errorResponse(message, 400);
  }
}

export async function updateStudentChapter(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const updated = await StudentChapter.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return errorResponse('Student chapter not found', 404);
    }
    return successResponse(updated, 'Student chapter updated');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update student chapter';
    return errorResponse(message, 400);
  }
}

export async function deleteStudentChapter(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const deleted = await StudentChapter.findByIdAndDelete(id);
    if (!deleted) {
      return errorResponse('Student chapter not found', 404);
    }
    return successResponse(null, 'Student chapter deleted');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete student chapter';
    return errorResponse(message, 500);
  }
}
