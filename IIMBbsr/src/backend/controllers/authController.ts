import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { Admin } from '@/backend/models/Admin';
import { AuditLog } from '@/backend/models/AuditLog';
import { hashPassword, comparePassword, generateToken } from '@/backend/utils/auth';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

export async function login(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return errorResponse('Email and password are required', 400);
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return errorResponse('Invalid email or password', 401);
    }

    if (!admin.isActive) {
      return errorResponse('Account is deactivated. Contact the Chapter Secretary.', 403);
    }

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return errorResponse('Invalid email or password', 401);
    }

    const token = generateToken({
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
      name: admin.name,
    });

    // Record login in audit trail
    await AuditLog.create({
      adminId: admin._id,
      adminName: admin.name,
      action: 'ADMIN_LOGIN',
      details: `Admin ${admin.name} logged into secretariat console`,
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return successResponse(
      {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          designation: admin.designation,
          avatar: admin.avatar,
        },
      },
      'Login successful'
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error during login';
    return errorResponse(message, 500);
  }
}

export async function register(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, password, role, designation } = body;

    if (!name || !email || !password) {
      return errorResponse('Name, email, and password are required', 400);
    }

    const existing = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return errorResponse('An admin with this email already exists', 409);
    }

    const hashedPassword = await hashPassword(password);
    const newAdmin = await Admin.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || 'admin',
      designation: designation || 'Secretariat Officer',
    });

    const token = generateToken({
      id: newAdmin._id.toString(),
      email: newAdmin.email,
      role: newAdmin.role,
      name: newAdmin.name,
    });

    return successResponse(
      {
        token,
        admin: {
          id: newAdmin._id,
          name: newAdmin.name,
          email: newAdmin.email,
          role: newAdmin.role,
          designation: newAdmin.designation,
        },
      },
      'Admin account created successfully',
      201
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error creating admin';
    return errorResponse(message, 500);
  }
}

export async function getMe(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated || !auth.user) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const admin = await Admin.findById(auth.user.id).select('-password');
    if (!admin) {
      return errorResponse('Admin not found', 404);
    }
    return successResponse(admin);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to retrieve profile';
    return errorResponse(message, 500);
  }
}
