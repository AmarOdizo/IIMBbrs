import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { Event } from '@/backend/models/Event';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

export async function getEvents(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const featured = searchParams.get('featured');

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (type && type !== 'All') filter.eventType = type;
    if (featured === 'true') filter.isFeatured = true;

    const events = await Event.find(filter).sort({ eventDate: 1 });
    return successResponse(events);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch events';
    return errorResponse(message, 500);
  }
}

export async function getEventById(id: string) {
  try {
    await connectDB();
    const event = await Event.findById(id);
    if (!event) {
      return errorResponse('Event not found', 404);
    }
    return successResponse(event);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid event ID';
    return errorResponse(message, 500);
  }
}

export async function createEvent(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const event = await Event.create(body);
    return successResponse(event, 'Event published successfully', 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create event';
    return errorResponse(message, 400);
  }
}

export async function updateEvent(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();
    const updated = await Event.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return errorResponse('Event not found', 404);
    }
    return successResponse(updated, 'Event updated successfully');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update event';
    return errorResponse(message, 400);
  }
}

export async function deleteEvent(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) {
      return errorResponse('Event not found', 404);
    }
    return successResponse(null, 'Event removed successfully');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete event';
    return errorResponse(message, 500);
  }
}
