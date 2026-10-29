import { NextRequest } from 'next/server';
import { committeeController } from '@/backend/controllers';

export async function GET(req: NextRequest) {
  return committeeController.getCommitteeMembers(req);
}

export async function POST(req: NextRequest) {
  return committeeController.createCommitteeMember(req);
}
