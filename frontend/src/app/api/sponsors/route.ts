import { NextRequest } from 'next/server';
import { sponsorController } from '@/backend/controllers';

export async function GET() {
  return sponsorController.getSponsors();
}

export async function POST(req: NextRequest) {
  return sponsorController.createSponsor(req);
}

