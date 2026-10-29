import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { GalleryItem } from '@/backend/models/GalleryItem';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

export async function getGalleryItems(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const filter: Record<string, unknown> = { isActive: true };
    if (category && category !== 'All') {
      filter.category = category;
    }

    const items = await GalleryItem.find(filter).sort({ orderIndex: 1, createdAt: -1 });
    return successResponse(items);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch gallery items';
    return errorResponse(message, 500);
  }
}

export async function createGalleryItem(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const item = await GalleryItem.create(body);
    return successResponse(item, 'Gallery item added', 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to add gallery item';
    return errorResponse(message, 400);
  }
}

export async function updateGalleryItem(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const updated = await GalleryItem.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return errorResponse('Gallery item not found', 404);
    }
    return successResponse(updated, 'Gallery item updated');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update gallery item';
    return errorResponse(message, 400);
  }
}

export async function deleteGalleryItem(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const deleted = await GalleryItem.findByIdAndDelete(id);
    if (!deleted) {
      return errorResponse('Gallery item not found', 404);
    }
    return successResponse(null, 'Gallery item deleted');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete gallery item';
    return errorResponse(message, 500);
  }
}
