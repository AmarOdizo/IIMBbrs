import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { NewsCircular } from '@/backend/models/NewsCircular';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

export async function getNewsAndCirculars(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    const filter: Record<string, unknown> = { isPublished: true };

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { circularNo: new RegExp(search, 'i') },
        { summary: new RegExp(search, 'i') },
      ];
    }

    const news = await NewsCircular.find(filter).sort({ publishedAt: -1 });
    return successResponse(news);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch news and circulars';
    return errorResponse(message, 500);
  }
}

export async function getNewsById(id: string) {
  try {
    await connectDB();
    const item = await NewsCircular.findByIdAndUpdate(
      id,
      { $inc: { readCount: 1 } },
      { new: true }
    );

    if (!item) {
      return errorResponse('Circular or article not found', 404);
    }

    return successResponse(item);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid circular ID';
    return errorResponse(message, 500);
  }
}

export async function createNews(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();

    const circular = await NewsCircular.create({
      ...body,
      author: body.author || auth.user?.name || 'Secretariat Bureau',
    });

    return successResponse(circular, 'Gazette circular / technical bulletin published', 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create circular';
    return errorResponse(message, 400);
  }
}

export async function updateNews(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const updated = await NewsCircular.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return errorResponse('News circular not found', 404);
    }
    return successResponse(updated, 'Circular updated successfully');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update circular';
    return errorResponse(message, 400);
  }
}

export async function deleteNews(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const deleted = await NewsCircular.findByIdAndDelete(id);
    if (!deleted) {
      return errorResponse('Circular not found', 404);
    }
    return successResponse(null, 'Circular deleted');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete circular';
    return errorResponse(message, 500);
  }
}
