import { NextRequest } from 'next/server';
import { studentChapterController } from '@/backend/controllers';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return studentChapterController.updateStudentChapter(req, id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return studentChapterController.deleteStudentChapter(req, id);
}
