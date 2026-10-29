import { NextRequest, NextResponse } from 'next/server';
import { uploadToImageKit, deleteFromImageKit } from '@/backend/utils/imagekit';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || '/iimbbsr';
    const customName = formData.get('fileName') as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided in form-data' },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize filename or use custom name
    const fileName = customName || `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    const uploadResponse = await uploadToImageKit({
      file: buffer,
      fileName,
      folder,
    });

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully to ImageKit',
      data: {
        fileId: uploadResponse.fileId,
        name: uploadResponse.name,
        url: uploadResponse.url,
        thumbnailUrl: uploadResponse.thumbnailUrl,
        size: uploadResponse.size,
        fileType: uploadResponse.fileType,
        height: uploadResponse.height,
        width: uploadResponse.width,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let fileId = searchParams.get('fileId');

    if (!fileId) {
      try {
        const body = await req.json();
        fileId = body?.fileId;
      } catch {
        // ignore if not json body
      }
    }

    if (!fileId) {
      return NextResponse.json(
        { success: false, error: 'fileId is required to delete file' },
        { status: 400 }
      );
    }

    await deleteFromImageKit(fileId);

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully from ImageKit',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Delete failed';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

