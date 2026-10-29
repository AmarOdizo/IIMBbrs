import { NextRequest } from 'next/server';
import { symposiumController } from '@/backend/controllers';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return symposiumController.updatePaperStatus(req, id);
}
