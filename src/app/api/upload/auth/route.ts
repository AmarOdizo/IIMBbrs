import { NextResponse } from 'next/server';
import { getImageKitAuth } from '@/backend/utils/imagekit';

export async function GET() {
  try {
    const authParams = getImageKitAuth();
    return NextResponse.json({
      success: true,
      data: authParams,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to generate ImageKit authentication parameters';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

