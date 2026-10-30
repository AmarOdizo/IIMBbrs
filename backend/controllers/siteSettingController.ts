import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { SiteSetting } from '@/backend/models/SiteSetting';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

export async function getSiteSettings() {
  try {
    await connectDB();
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create({});
    }
    return successResponse(settings);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch site settings';
    return errorResponse(message, 500);
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
    let settings = await SiteSetting.findOne();
    if (settings) {
      settings = await SiteSetting.findByIdAndUpdate(settings._id, body, { new: true, runValidators: true });
    } else {
      settings = await SiteSetting.create(body);
    }
    return successResponse(settings, 'Site settings updated successfully');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update site settings';
    return errorResponse(message, 400);
  }
}
