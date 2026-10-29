import { NextRequest } from 'next/server';
import connectDB from '@/backend/db';
import { Member } from '@/backend/models/Member';
import { AuditLog } from '@/backend/models/AuditLog';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireAuth } from '@/backend/middleware/authMiddleware';

export async function getMembers(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const city = searchParams.get('city');

    const filter: Record<string, unknown> = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (city) {
      filter.city = new RegExp(city, 'i');
    }

    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { memberCode: new RegExp(search, 'i') },
        { organization: new RegExp(search, 'i') },
      ];
    }

    const members = await Member.find(filter).sort({ memberCode: 1 });
    return successResponse(members);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch members';
    return errorResponse(message, 500);
  }
}

export async function getMemberById(id: string) {
  try {
    await connectDB();
    const member = await Member.findById(id);
    if (!member) {
      return errorResponse('Member not found', 404);
    }
    return successResponse(member);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid member ID';
    return errorResponse(message, 500);
  }
}

export async function createMember(req: NextRequest) {
  const auth = await requireAuth(req);
  if (!auth.authenticated || !auth.user) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();

    const existing = await Member.findOne({ memberCode: body.memberCode?.toUpperCase() });
    if (existing) {
      return errorResponse(`Member code ${body.memberCode} already exists`, 409);
    }

    const member = await Member.create(body);

    await AuditLog.create({
      adminId: auth.user.id,
      adminName: auth.user.name,
      action: 'ADD_MEMBER',
      targetEntity: 'Member',
      targetId: member._id.toString(),
      details: `Enrolled new member: ${member.name} (${member.memberCode})`,
    });

    return successResponse(member, 'Member added successfully', 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create member';
    return errorResponse(message, 400);
  }
}

export async function updateMember(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated || !auth.user) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const body = await req.json();

    const updated = await Member.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return errorResponse('Member not found', 404);
    }

    return successResponse(updated, 'Member updated successfully');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update member';
    return errorResponse(message, 400);
  }
}

export async function deleteMember(req: NextRequest, id: string) {
  const auth = await requireAuth(req);
  if (!auth.authenticated || !auth.user) {
    return errorResponse(auth.error || 'Unauthorized', 401);
  }

  try {
    await connectDB();
    const deleted = await Member.findByIdAndDelete(id);

    if (!deleted) {
      return errorResponse('Member not found', 404);
    }

    await AuditLog.create({
      adminId: auth.user.id,
      adminName: auth.user.name,
      action: 'DELETE_MEMBER',
      targetEntity: 'Member',
      targetId: id,
      details: `Removed member ${deleted.name} (${deleted.memberCode}) from roster`,
    });

    return successResponse(null, 'Member deleted successfully');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete member';
    return errorResponse(message, 500);
  }
}
