import { NextRequest } from 'next/server';
import { membershipApplicationController } from '@/backend/controllers';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return membershipApplicationController.updateApplicationStatus(req, id);
}
