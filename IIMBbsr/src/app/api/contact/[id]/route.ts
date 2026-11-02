import { NextRequest } from 'next/server';
import { contactController } from '@/backend/controllers';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return contactController.updateInquiry(req, id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return contactController.deleteInquiry(req, id);
}
