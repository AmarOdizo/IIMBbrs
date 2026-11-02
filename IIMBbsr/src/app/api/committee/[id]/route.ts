import { NextRequest } from 'next/server';
import { committeeController } from '@/backend/controllers';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return committeeController.updateCommitteeMember(req, id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return committeeController.deleteCommitteeMember(req, id);
}
