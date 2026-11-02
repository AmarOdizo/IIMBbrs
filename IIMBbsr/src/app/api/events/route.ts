import { NextRequest } from 'next/server';
import { eventController } from '@/backend/controllers';

export async function GET(req: NextRequest) {
  return eventController.getEvents(req);
}

export async function POST(req: NextRequest) {
  return eventController.createEvent(req);
}
