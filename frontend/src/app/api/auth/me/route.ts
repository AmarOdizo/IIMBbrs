import { NextRequest } from 'next/server';
import { authController } from '@/backend/controllers';

export async function GET(req: NextRequest) {
  return authController.getMe(req);
}
