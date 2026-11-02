'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export interface UploadedImageData {
  url: string;
  fileId: string;
  name: string;
  thumbnailUrl?: string;
  size?: number;
}

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string, fileData?: UploadedImageData) => void;
  folder?: string;
  label?: string;
  className?: string;
  accept?: string;
}

export default function ImageUpload({
  value,
  onChange,
  folder = '/iimbbsr',
  label = 'Upload Image',
  className = '',
  accept = 'image/*',
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to upload image');
      }

      const uploaded: UploadedImageData = result.data;
      setPreview(uploaded.url);
      if (onChange) {
        onChange(uploaded.url, uploaded);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setError(msg);
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    setError(null);
    if (onChange) {
      onChange('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative group w-full h-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
          <Image
            src={preview}
            alt="Uploaded preview"
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-800/90 hover:bg-slate-900 rounded-lg shadow-sm transition"
            >
              Change
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={loading}
              className="p-1.5 text-white bg-rose-600/90 hover:bg-rose-700 rounded-lg shadow-sm transition"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !loading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
            loading
              ? 'border-indigo-300 bg-indigo-50/50 cursor-wait'
              : 'border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/20 bg-slate-50'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              <p className="text-sm font-medium text-indigo-600">ImageKit par upload ho raha hai...</p>
            </>
          ) : (
            <>
              <div className="p-3 bg-white rounded-full shadow-sm text-slate-600 border border-slate-100">
                <UploadCloud className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-sm">
                <span className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Click to upload
                </span>{' '}
                ya drag and drop karein
              </div>
              <p className="text-xs text-slate-500">PNG, JPG, WEBP, GIF (Max 10MB)</p>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-600">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {preview && !loading && (
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-600">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>ImageKit URL ready</span>
        </div>
      )}
    </div>
  );
}

