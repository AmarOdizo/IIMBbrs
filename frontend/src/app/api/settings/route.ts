import { NextRequest } from 'next/server';
import { siteSettingController } from '@/backend/controllers';

export async function GET() {
  return siteSettingController.getSiteSettings();
}

export async function PUT(req: NextRequest) {
  return siteSettingController.updateSiteSettings(req);
}
