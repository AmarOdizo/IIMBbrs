'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Paperclip, X } from 'lucide-react';

export default function MembershipApplicationForm() {
  const [formData, setFormData] = useState({
    titlePrefix: 'Dr.',
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    designation: '',
    cadreSought: 'Life Member (LM)',
    applicationType: 'New Application',
    existingIimId: '',
    qualification: '',
  });

  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ docketNo: string; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Document file size cannot exceed 10MB.');
        return;
      }
      setDocumentFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let documentsUrl = '';

      // 1. Upload CV / Endorsement to ImageKit if provided
      if (documentFile) {
        const uploadData = new FormData();
        uploadData.append('file', documentFile);
        uploadData.append('folder', '/iimbbsr/membership-applications');

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok || !uploadJson.success) {
          throw new Error(uploadJson.error || 'Failed to upload supporting credentials document');
        }
        documentsUrl = uploadJson.data.url;
      }

      // 2. Submit Application to MongoDB
      const fullApplicantName = `${formData.titlePrefix} ${formData.fullName.trim()}`.trim();

      const response = await fetch('/api/membership-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullApplicantName,
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          organization: formData.organization.trim(),
          designation: formData.designation.trim() || undefined,
          cadreSought: formData.cadreSought,
          applicationType: formData.applicationType,
          existingIimId: formData.existingIimId.trim() || undefined,
          qualification: formData.qualification.trim() || undefined,
          documentsUrl: documentsUrl || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit membership application.');
      }

      setSuccess({
        docketNo: result.data?.docketNo || 'LM-2026',
        message: result.message || 'Application lodged successfully for Secretariat scrutiny.',
      });

      // Reset form
      setFormData({
        titlePrefix: 'Dr.',
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        designation: '',
        cadreSought: 'Life Member (LM)',
        applicationType: 'New Application',
        existingIimId: '',
        qualification: '',
      });
      setDocumentFile(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Submission failed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {/* Row: Title & Name */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="sm:col-span-1 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">Title</label>
          <select
            name="titlePrefix"
            value={formData.titlePrefix}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="Dr.">Dr.</option>
            <option value="Prof.">Prof.</option>
            <option value="Er.">Er.</option>
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
          </select>
        </div>
        <div className="sm:col-span-3 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Full Name of Candidate <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            required
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="e.g. Sourav Mishra"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {/* Row: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Professional Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            required
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="s.mishra@tatasteel.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Contact Number <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            required
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+91 98765 43210"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {/* Row: Organization & Designation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Institution / Corporation <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            required
            name="organization"
            value={formData.organization}
            onChange={handleInputChange}
            placeholder="e.g. CSIR-IMMT, IIT BBS, Tata Steel"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">Designation / Role</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            placeholder="e.g. Principal Scientist, PG Scholar"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {/* Row: Cadre & Application Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Cadre Sought <span className="text-primary">*</span>
          </label>
          <select
            name="cadreSought"
            value={formData.cadreSought}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="Life Member (LM)">Life Member (LM) — Professional</option>
            <option value="Life Fellow (LF)">Life Fellow (LF) — Senior/Eminent</option>
            <option value="Annual Member (M)">Annual Member (M)</option>
            <option value="Student Member (SM)">Student Member (SM) — Collegiate</option>
            <option value="Corporate Patron">Corporate Patron / Industrial Unit</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">Application Mode</label>
          <select
            name="applicationType"
            value={formData.applicationType}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="New Application">Fresh Enrollment (2026 Roll)</option>
            <option value="Chapter Transfer">Chapter Transfer (HQ / Other Chapter)</option>
            <option value="Grade Upgrade">Grade Upgrade (Student to LM / Fellow)</option>
          </select>
        </div>
      </div>

      {formData.applicationType !== 'New Application' && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">Existing IIM Membership Number</label>
          <input
            type="text"
            name="existingIimId"
            value={formData.existingIimId}
            onChange={handleInputChange}
            placeholder="e.g. IIM-KOL-LM-18492"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      )}

      {/* Highest Qualification */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-700">Highest Academic Qualification</label>
        <input
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleInputChange}
          placeholder="e.g. Ph.D. in Materials Engineering / B.Tech Metallurgy"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Supporting Document via ImageKit */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-primary shrink-0 shadow-xs">
            <Paperclip className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-800 block">
              Attach Credentials / Endorsement
            </span>
            <span className="text-[11px] text-slate-500 block">
              {documentFile ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  {documentFile.name} ({(documentFile.size / 1024).toFixed(1)} KB)
                  <button
                    type="button"
                    onClick={() => setDocumentFile(null)}
                    className="p-0.5 text-rose-500 hover:bg-slate-200 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ) : (
                'PDF, DOCX or image (Max 10MB)'
              )}
            </span>
          </div>
        </div>

        <label className="cursor-pointer px-3.5 py-1.5 rounded-lg bg-white text-primary hover:bg-slate-100 font-semibold text-xs transition border border-slate-200 shadow-xs shrink-0">
          <span>{documentFile ? 'Replace File' : 'Browse File'}</span>
          <input
            type="file"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          />
        </label>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Success alert */}
      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-sm">Application Lodged with Secretariat!</span>
            <p>
              Your reference docket number is{' '}
              <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                {success.docketNo}
              </span>
              . Concurrence will be reviewed by the Executive Committee.
            </p>
          </div>
        </div>
      )}

      {/* Submit button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[11px] text-slate-400">
          * Application submitted directly to Regional Council Scrutiny Register (Clause IV).
        </span>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-white font-semibold text-xs shadow-md transition disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Lodging Dossier...</span>
            </>
          ) : (
            <>
              <span>Lodge Application Dossier</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

