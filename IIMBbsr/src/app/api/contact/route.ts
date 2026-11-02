import { NextRequest } from 'next/server';
import { contactController } from '@/backend/controllers';

export async function GET(req: NextRequest) {
  return contactController.getInquiries(req);
}

export async function POST(req: NextRequest) {
  return contactController.submitInquiry(req);
}
