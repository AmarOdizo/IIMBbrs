import { NextRequest } from 'next/server';
import { authController } from '@/backend/controllers';

export async function POST(req: NextRequest) {
  return authController.login(req);
}
