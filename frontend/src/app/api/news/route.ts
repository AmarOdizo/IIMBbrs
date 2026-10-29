import { NextRequest } from 'next/server';
import { newsController } from '@/backend/controllers';

export async function GET(req: NextRequest) {
  return newsController.getNewsAndCirculars(req);
}

export async function POST(req: NextRequest) {
  return newsController.createNews(req);
}
