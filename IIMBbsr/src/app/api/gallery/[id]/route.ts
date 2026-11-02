import { NextRequest } from 'next/server';
import { galleryController } from '@/backend/controllers';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return galleryController.updateGalleryItem(req, id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return galleryController.deleteGalleryItem(req, id);
}
