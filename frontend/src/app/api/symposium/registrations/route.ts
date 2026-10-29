import { NextRequest } from 'next/server';
import { symposiumController } from '@/backend/controllers';

export async function GET(req: NextRequest) {
  return symposiumController.getRegistrations(req);
}

export async function POST(req: NextRequest) {
  return symposiumController.registerDelegate(req);
}
