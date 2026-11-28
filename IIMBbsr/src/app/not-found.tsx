import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { Home, Users, Calendar, Mail, ArrowRight, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <main className="w-full pt-28 sm:pt-32 pb-20 bg-slate-50/50 min-h-[80vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 font-mono font-bold text-2xl flex items-center justify-center mx-auto mb-6 shadow-2xs">
            404
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Page Not Found
          </h1>

          <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
            The page or document you are looking for does not exist, has been relocated, or is temporarily unavailable.
          </p>

          {/* Quick Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 text-left">
            <Link
              href="/"
              className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition flex items-center gap-3 text-xs font-semibold text-slate-800"
            >
              <Home className="w-4 h-4 text-primary shrink-0" />
              <span>Chapter Home</span>
            </Link>

            <Link
              href="/committee"
              className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition flex items-center gap-3 text-xs font-semibold text-slate-800"
            >
              <Users className="w-4 h-4 text-primary shrink-0" />
              <span>Executive Committee</span>
            </Link>

            <Link
              href="/events"
              className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition flex items-center gap-3 text-xs font-semibold text-slate-800"
            >
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span>Events &amp; Symposia</span>
            </Link>

            <Link
              href="/contact"
              className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition flex items-center gap-3 text-xs font-semibold text-slate-800"
            >
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>Contact Secretariat</span>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-primary-container transition shadow-xs"
            >
              <span>Return to Homepage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
