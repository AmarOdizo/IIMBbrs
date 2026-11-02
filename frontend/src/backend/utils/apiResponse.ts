import { NextResponse } from 'next/server';

export interface ApiResponseOptions<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  count?: number;
  statusCode?: number;
}

export function apiResponse<T = unknown>({
  success,
  message,
  data,
  error,
  count,
  statusCode = 200,
}: ApiResponseOptions<T>) {
  const body: Record<string, unknown> = { success };

  if (message) body.message = message;
  if (count !== undefined) body.count = count;
  if (data !== undefined) body.data = data;
  if (error) body.error = error;

  return NextResponse.json(body, { status: statusCode });
}

export function successResponse<T = unknown>(data?: T, message?: string, statusCode = 200) {
  const count = Array.isArray(data) ? data.length : undefined;
  return apiResponse<T>({
    success: true,
    data,
    message,
    count,
    statusCode,
  });
}

export function errorResponse(error: string, statusCode = 400) {
  return apiResponse({
    success: false,
    error,
    statusCode,
  });
}
