import { NextRequest } from 'next/server';
import { verifyToken, TokenPayload } from '@/backend/utils/auth';
import connectDB from '@/backend/db';
import { Admin } from '@/backend/models/Admin';

export interface AuthenticatedRequest extends NextRequest {
  adminUser?: TokenPayload;
}

export async function requireAuth(req: NextRequest): Promise<{ authenticated: boolean; user?: TokenPayload; error?: string }> {
  try {
    const authHeader = req.headers.get('authorization');
    let token = '';

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {
      const cookie = req.cookies?.get('admin_token');
      if (cookie) {
        token = cookie.value;
      }
    }

    if (!token) {
      return { authenticated: false, error: 'Unauthorized: No token provided' };
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return { authenticated: false, error: 'Unauthorized: Invalid or expired token' };
    }

    await connectDB();
    const admin = await Admin.findById(decoded.id);
    if (!admin || !admin.isActive) {
      return { authenticated: false, error: 'Unauthorized: Account not found or inactive' };
    }

    return { authenticated: true, user: decoded };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Authentication verification failed';
    return { authenticated: false, error: message };
  }
}
