import { NextRequest } from 'next/server';
import { galleryController } from '@/backend/controllers';

export async function GET(req: NextRequest) {
  return galleryController.getGalleryItems(req);
}

export async function POST(req: NextRequest) {
  return galleryController.createGalleryItem(req);
}
