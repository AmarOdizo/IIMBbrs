import React from 'react';
import Link from 'next/link';
import { siteConfig, navItems } from '@/data/siteData';
import { ShieldCheck, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0e1622] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: About Chapter */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo1.svg" alt="IIM Logo" className="h-10 w-auto brightness-200" />
              <div>
                <h3 className="text-white font-bold text-base leading-tight">IIM Bhubaneswar</h3>
                <span className="text-amber-500 text-xs font-medium">Chapter Portal</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {siteConfig.tagline}. A registered non-profit professional body advancing metallurgical education, research, and sustainable industry development.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{siteConfig.affiliation}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#994106] pl-2">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/admin" className="text-amber-400 hover:text-amber-300">
                Admin Portal
              </Link>
            </div>
          </div>

          {/* Col 3: Student Chapters & Symposia */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#994106] pl-2">
              Programs & Symposia
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/symposium" className="hover:text-amber-400 transition-colors">
                  18th National Symposium (March 2026)
                </Link>
              </li>
              <li>
                <Link href="/student-chapters" className="hover:text-amber-400 transition-colors">
                  IIT Bhubaneswar Student Chapter
                </Link>
              </li>
              <li>
                <Link href="/student-chapters" className="hover:text-amber-400 transition-colors">
                  NIT Rourkela Student Chapter
                </Link>
              </li>
              <li>
                <Link href="/gallery-ahss" className="hover:text-amber-400 transition-colors">
                  AHSS Conference Archive
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-amber-400 transition-colors">
                  Life Membership Enrollment
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Secretariat Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#994106] pl-2">
              Chapter Secretariat
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-[#ff9d66] shrink-0 mt-0.5" />
              <p>{siteConfig.secretariat}</p>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-[#ff9d66] shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                {siteConfig.email}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Phone className="w-4 h-4 text-[#ff9d66] shrink-0" />
              <span>{siteConfig.phone}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 The Indian Institute of Metals (IIM) Bhubaneswar Chapter. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <span>•</span>
            <a href="https://iim-india.net" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline text-amber-500">
              <span>IIM Head Office Kolkata</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
