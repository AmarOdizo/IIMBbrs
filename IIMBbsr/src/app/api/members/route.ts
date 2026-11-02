import { NextRequest } from 'next/server';
import { memberController } from '@/backend/controllers';

export async function GET(req: NextRequest) {
  return memberController.getMembers(req);
}

export async function POST(req: NextRequest) {
  return memberController.createMember(req);
}
