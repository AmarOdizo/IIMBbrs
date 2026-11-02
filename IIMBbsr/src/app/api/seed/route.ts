import { NextResponse } from 'next/server';
import { seedDatabase } from '@/backend/seed';

export async function GET() {
  try {
    await seedDatabase();
    return NextResponse.json({
      success: true,
      message: 'Database initialized and seeded with institutional records and default admin.',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Seeding failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
