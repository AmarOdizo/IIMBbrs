import { NextRequest } from 'next/server';
import { studentChapterController } from '@/backend/controllers';

export async function GET() {
  return studentChapterController.getStudentChapters();
}

export async function POST(req: NextRequest) {
  return studentChapterController.createStudentChapter(req);
}
