import { NextRequest } from 'next/server';
import { memberController } from '@/backend/controllers';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  return memberController.importMembers(req);
}

