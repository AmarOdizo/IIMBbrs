import { NextRequest } from 'next/server';
import { adminController } from '@/backend/controllers';

export async function GET(req: NextRequest) {
  return adminController.getDashboardStats(req);
}
