'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Paperclip, X } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    category: 'symposia',
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    subjectRef: '',
    messageBody: '',
  });

  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ docketId: string; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Attachment file size cannot exceed 10MB.');
        return;
      }
      setAttachment(file);
      setError(null);
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let attachmentUrl = '';

      // 1. Upload attachment to ImageKit if provided
      if (attachment) {
        const uploadData = new FormData();
        uploadData.append('file', attachment);
        uploadData.append('folder', '/iimbbsr/contact-inquiries');

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok || !uploadJson.success) {
          throw new Error(uploadJson.error || 'Failed to upload attachment file');
        }
        attachmentUrl = uploadJson.data.url;
      }

      // 2. Submit Inquiry to MongoDB via /api/contact
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: formData.category,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          organization: formData.organization.trim(),
          subjectRef: formData.subjectRef.trim(),
          messageBody: formData.messageBody.trim(),
          attachmentUrl: attachmentUrl || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to transmit communication.');
      }

      // 3. Set success info & reset form fields
      setSuccess({
        docketId: result.data?.docketId || 'IIM-BBS-2026',
        message: result.message || 'Your communication has been lodged in the Regional Secretariat register.',
      });

      setFormData({
        category: 'symposia',
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        subjectRef: '',
        messageBody: '',
      });
      setAttachment(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to transmit inquiry.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Category Selector */}
      <div className="flex flex-col gap-1.5">
        <label
          className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between"
          htmlFor="category"
        >
          <span>
            Inquiry Category <span className="text-primary">*</span>
          </span>
          <span className="font-label-sm text-label-sm text-secondary">Route to portfolio desk</span>
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={handleInputChange}
          required
          disabled={loading}
          className="w-full px-3.5 py-2.5 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none transition-all border border-transparent focus:border-primary/30"
        >
          <option value="symposia">Technical Symposia &amp; Paper Submissions (AHSS 2026)</option>
          <option value="membership">Membership Registration, Fellowships &amp; Chapter Transfer</option>
          <option value="industry">Industry Sponsorship, Plant MoUs &amp; Conclave Exhibits</option>
          <option value="student">Student Chapters, Grants &amp; Metallurgical Competitions</option>
          <option value="secretariat">General Secretariat, Council Notices &amp; Institutional Governance</option>
        </select>
      </div>

      {/* Name & Email Dual Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="fullName">
            Full Name with Title <span className="text-primary">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="e.g. Dr. Priyadarshini Sen, FIM"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            disabled={loading}
            className="w-full px-3.5 py-2.5 rounded bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-secondary/50 focus:bg-surface-container-lowest focus:outline-none transition-all border border-transparent focus:border-primary/30"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="email">
            Professional / Institute Email <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="p.sen@tatasteel.com / @iitbbs.ac.in"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={loading}
            className="w-full px-3.5 py-2.5 rounded bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-secondary/50 focus:bg-surface-container-lowest focus:outline-none transition-all border border-transparent focus:border-primary/30"
          />
        </div>
      </div>

      {/* Phone & Organization Dual Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="phone">
            Contact Telephone <span className="text-secondary font-normal">(Optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={loading}
            className="w-full px-3.5 py-2.5 rounded bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-secondary/50 focus:bg-surface-container-lowest focus:outline-none transition-all border border-transparent focus:border-primary/30"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="organization">
            Affiliated Organisation / Institute <span className="text-primary">*</span>
          </label>
          <input
            id="organization"
            type="text"
            placeholder="e.g. CSIR-IMMT, Tata Steel, IIT BBS"
            value={formData.organization}
            onChange={handleInputChange}
            required
            disabled={loading}
            className="w-full px-3.5 py-2.5 rounded bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-secondary/50 focus:bg-surface-container-lowest focus:outline-none transition-all border border-transparent focus:border-primary/30"
          />
        </div>
      </div>

      {/* Subject Reference */}
      <div className="flex flex-col gap-1.5">
        <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="subjectRef">
          Subject / Institutional Reference <span className="text-primary">*</span>
        </label>
        <input
          id="subjectRef"
          type="text"
          placeholder="e.g. AHSS-2026/ABS/409 - Microstructure Evaluation Abstract"
          value={formData.subjectRef}
          onChange={handleInputChange}
          required
          disabled={loading}
          className="w-full px-3.5 py-2.5 rounded bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-secondary/50 focus:bg-surface-container-lowest focus:outline-none transition-all border border-transparent focus:border-primary/30"
        />
      </div>

      {/* Message Body */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="messageBody">
            Official Communication Body <span className="text-primary">*</span>
          </label>
          <span className="font-label-sm text-label-sm text-secondary">
            {formData.messageBody.length} / 2500 characters
          </span>
        </div>
        <textarea
          id="messageBody"
          rows={5}
          maxLength={2500}
          placeholder="Please outline the purpose of your communication, relevant academic context, or commercial sponsorship inquiry..."
          value={formData.messageBody}
          onChange={handleInputChange}
          required
          disabled={loading}
          className="w-full px-3.5 py-2.5 rounded bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-secondary/50 focus:bg-surface-container-lowest focus:outline-none transition-all resize-y border border-transparent focus:border-primary/30"
        />
      </div>

      {/* Technical Attachment Upload Widget (ImageKit Supported) */}
      <div className="p-4 rounded-lg bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-3 border border-slate-200/50">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-sm">
            <Paperclip className="w-5 h-5" />
          </div>
          <div className="truncate">
            <span className="font-title-md text-title-md text-on-surface text-sm block">
              Attach Document / Abstract
            </span>
            <span className="font-body-sm text-body-sm text-secondary block truncate">
              {attachment ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  {attachment.name} ({(attachment.size / 1024).toFixed(1)} KB)
                  <button
                    type="button"
                    onClick={removeAttachment}
                    className="p-0.5 rounded hover:bg-slate-200 text-rose-500"
                    title="Remove attachment"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ) : (
                'PDF, DOCX, ZIP, JPG, PNG (Max 10MB)'
              )}
            </span>
          </div>
        </div>

        <label className="cursor-pointer px-3.5 py-1.5 rounded bg-surface-container-lowest text-primary hover:bg-surface-container font-label-md text-label-md font-semibold transition-colors shrink-0 shadow-sm">
          <span>{attachment ? 'Replace File' : 'Browse Files'}</span>
          <input
            type="file"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
            accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg,.webp"
          />
        </label>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Success alert */}
      {success && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-sm">Official Dispatch Transmitted Successfully!</span>
            <p className="text-sm">
              Your inquiry has been stored in the database. Docket Reference ID:{' '}
              <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                {success.docketId}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Anti-spam & Submit Area */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-secondary text-xs">
          <span className="material-symbols-outlined text-[18px] text-tertiary">verified_user</span>
          <span>Protected by Chapter Secretariat Security &amp; Database Protocols</span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold transition-all shadow-md group disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Lodging Dispatch...</span>
            </>
          ) : (
            <>
              <span>Transmit Communication</span>
              <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

