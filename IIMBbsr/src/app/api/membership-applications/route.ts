import { NextRequest } from 'next/server';
import { membershipApplicationController } from '@/backend/controllers';

export async function GET(req: NextRequest) {
  return membershipApplicationController.getApplications(req);
}

export async function POST(req: NextRequest) {
  return membershipApplicationController.submitApplication(req);
}
