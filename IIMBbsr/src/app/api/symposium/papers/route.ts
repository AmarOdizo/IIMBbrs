import { NextRequest } from 'next/server';
import { symposiumController } from '@/backend/controllers';

export async function GET(req: NextRequest) {
  return symposiumController.getPapers(req);
}

export async function POST(req: NextRequest) {
  return symposiumController.submitPaper(req);
}
