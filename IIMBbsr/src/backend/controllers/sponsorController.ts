import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { Sponsor } from '@/backend/models/Sponsor';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

export async function getSponsors() {
  try {
    await connectDB();
    const sponsors = await Sponsor.find({ isActive: true }).sort({ orderIndex: 1, createdAt: 1 });
    return successResponse(sponsors);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch sponsors';
    return errorResponse(message, 500);
  }
}

export async function createSponsor(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const sponsor = await Sponsor.create(body);
    return successResponse(sponsor, 'Sponsor added successfully', 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create sponsor';
    return errorResponse(message, 400);
  }
}

export async function updateSponsor(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const sponsor = await Sponsor.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!sponsor) return errorResponse('Sponsor not found', 404);
    return successResponse(sponsor, 'Sponsor updated successfully');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update sponsor';
    return errorResponse(message, 400);
  }
}

export async function deleteSponsor(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const sponsor = await Sponsor.findByIdAndDelete(id);
    if (!sponsor) return errorResponse('Sponsor not found', 404);
    return successResponse({ deleted: true }, 'Sponsor deleted successfully');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete sponsor';
    return errorResponse(message, 500);
  }
}

