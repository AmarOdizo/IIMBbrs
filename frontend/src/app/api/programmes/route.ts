import { NextRequest } from 'next/server';
import { programmeController } from '@/backend/controllers';

export async function GET() {
  return programmeController.getProgrammes();
}

export async function POST(req: NextRequest) {
  return programmeController.createProgramme(req);
}
