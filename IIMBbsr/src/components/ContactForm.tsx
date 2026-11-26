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

  // Handle URL parameters & hash navigation (e.g. from Send Council Note)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const cat = searchParams.get('category');
      if (cat) {
        setFormData((prev) => ({
          ...prev,
          category: cat,
          subjectRef:
            cat === 'secretariat' && !prev.subjectRef
              ? 'Council Memorandum / Executive Note'
              : prev.subjectRef,
        }));
      }

      if (
        window.location.hash === '#contact-form' ||
        window.location.hash === '#contact-form-section' ||
        cat === 'secretariat'
      ) {
        setTimeout(() => {
          const formEl =
            document.getElementById('contact-form') ||
            document.getElementById('contact-form-section');
          if (formEl) {
            formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Highlight / focus
            const firstInput = formEl.querySelector<HTMLInputElement>('#fullName');
            if (firstInput && window.location.hash) {
              firstInput.focus({ preventScroll: true });
            }
          }
        }, 150);
      }
    } catch (e) {
      console.warn('Error handling contact form params:', e);
    }
  }, []);

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
      <form className="space-y-3" onSubmit={handleSubmit}>
        {/* Name & Email Dual Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="fullName">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface text-sm placeholder:text-secondary/50 focus:bg-surface-container-lowest focus:outline-none transition-all border border-slate-200/60 focus:border-primary/50"
                  />
                </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface" htmlFor="email">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface text-sm placeholder:text-secondary/50 focus:bg-surface-container-lowest focus:outline-none transition-all border border-slate-200/60 focus:border-primary/50"
                      />
                    </div>
                </div>

                {/* Phone & Organization Dual Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-on-surface" htmlFor="phone">
                            Phone Number <span className="text-secondary font-normal">(Optional)</span>
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={loading}
                            className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface text-sm placeholder:text-secondary/50 focus:bg-surface-container-lowest focus:outline-none transition-all border border-slate-200/60 focus:border-primary/50"
                          />
                        </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-semibold text-on-surface" htmlFor="organization">
                                Organization / Institution <span className="text-primary">*</span>
                              </label>
                              <input
                                id="organization"
                                type="text"
                                placeholder="Company or Institute name"
                                value={formData.organization}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                                className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface text-sm placeholder:text-secondary/50 focus:bg-surface-container-lowest focus:outline-none transition-all border border-slate-200/60 focus:border-primary/50"
                              />
                            </div>
                        </div>

                            {/* Subject */}
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-semibold text-on-surface" htmlFor="subjectRef">
                                Subject <span className="text-primary">*</span>
                              </label>
                              <input
                                id="subjectRef"
                                type="text"
                                placeholder="Subject of your message"
                                value={formData.subjectRef}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                                className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface text-sm placeholder:text-secondary/50 focus:bg-surface-container-lowest focus:outline-none transition-all border border-slate-200/60 focus:border-primary/50"
                              />
                            </div>

                            {/* Message Body */}
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-on-surface" htmlFor="messageBody">
                                      Message <span className="text-primary">*</span>
                                    </label>
                                      <span className="text-[11px] text-secondary">
                                        {formData.messageBody.length} / 2500
                                      </span>
                                    </div>
                                    <textarea
                                      id="messageBody"
                                      rows={3}
                                      maxLength={2500}
                                      placeholder="Write your message here..."
                                      value={formData.messageBody}
                                      onChange={handleInputChange}
                                      required
                                      disabled={loading}
                                      className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface text-sm placeholder:text-secondary/50 focus:bg-surface-container-lowest focus:outline-none transition-all resize-y border border-slate-200/60 focus:border-primary/50"
                                    />
                                </div>

                                    {/* Attachment info (if file attached) */}
                                    {attachment && (
                                      <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
                                        <span className="flex items-center gap-1.5 truncate">
                                          <Paperclip className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                          <span className="font-semibold truncate">{attachment.name}</span>
                                          <span className="text-emerald-600 shrink-0">({(attachment.size / 1024).toFixed(1)} KB)</span>
                                        </span>
                                        <button
                                          type="button"
                                          onClick={removeAttachment}
                                          className="text-rose-600 hover:text-rose-800 p-0.5 ml-2"
                                          title="Remove attachment"
                                        >
                                          <X className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    )}

                                  {/* Error alert */}
                                  {error && (
                                      <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2.5 text-xs">
                                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                                        <p>{error}</p>
                                      </div>
      )}

                                      {/* Success alert */}
                                      {success && (
                                                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2.5 text-xs">
                                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                  <div className="flex flex-col gap-0.5">
                                                    <span className="font-semibold">Message Sent Successfully!</span>
                                                    <p>
                                                      Docket Reference:{' '}
                                                      <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">
                                                        {success.docketId}
                                                      </span>
                                                    </p>
                                                  </div>
                                                </div>
      )}

                                                  {/* Compact Action Bar: Attach Button on left, Submit Button on right */}
                                                  <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                                                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 hover:border-primary/40 bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors shrink-0 w-full sm:w-auto justify-center">
                                                      <Paperclip className="w-3.5 h-3.5 text-primary" />
                                                      <span>{attachment ? 'Change Attachment' : 'Attach File (Optional)'}</span>
                                                      <input
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        disabled={loading}
                                                        className="hidden"
                                                        accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg,.webp"
                                                      />
                                                    </label>

                                                    <button
                                                      type="submit"
                                                      disabled={loading}
                                                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-container font-semibold text-sm transition-all shadow-sm group disabled:opacity-50"
                                                    >
                                                      {loading ? (
                                                        <>
                                                          <Loader2 className="w-4 h-4 animate-spin" />
                                                          <span>Sending...</span>
                                                        </>
                                                      ) : (
                                                        <>
                                                          <span>Send Message</span>
                                                          <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                                        </>
                                                      )}
                                                    </button>
                                                  </div>
                                                </form>
                                                );
}

