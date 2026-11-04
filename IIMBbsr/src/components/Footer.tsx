'use client';

import React from 'react';
import Link from 'next/link';
import SocialLinksBar from '@/components/SocialLinks';

export default function Footer() {
  return (
    <footer className="w-full bg-inverse-surface text-inverse-on-surface pt-space-2xl pb-space-lg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img
                alt="The Indian Institute of Metals"
                className="h-10 w-auto object-contain bg-white rounded-lg p-1 shadow-sm"
                src="/assets/images/logo1.svg"
              />
            </div>
            <p className="font-body-sm text-body-sm text-surface-variant/80 leading-relaxed">
              The Indian Institute of Metals — Bhubaneswar Chapter, advancing metallurgy, materials engineering, and
              mineral processing across Odisha's industrial core.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-label-md text-label-md text-tertiary-fixed uppercase tracking-wider mb-2">
              Quick Links
            </span>
            <Link
              className="font-body-sm text-body-sm text-surface-variant/80 hover:text-surface-bright transition-colors"
              data-path="home"
              href="/"
            >
              Home
            </Link>
            <Link
              className="font-body-sm text-body-sm text-surface-variant/80 hover:text-surface-bright transition-colors"
              data-path="about"
              href="/about"
            >
              About
            </Link>
            <Link
              className="font-body-sm text-body-sm text-surface-variant/80 hover:text-surface-bright transition-colors"
              data-path="committee"
              href="/committee"
            >
              Committee
            </Link>
            <Link
              className="font-body-sm text-body-sm text-surface-variant/80 hover:text-surface-bright transition-colors"
              data-path="members"
              href="/members"
            >
              Members Directory
            </Link>
            <Link
              className="font-body-sm text-body-sm text-surface-variant/80 hover:text-surface-bright transition-colors"
              data-path="awards"
              href="/awards"
            >
              Awards &amp; Honors
            </Link>
            <Link
              className="font-body-sm text-body-sm text-surface-variant/80 hover:text-surface-bright transition-colors"
              data-path="student-chapters"
              href="/student-chapters"
            >
              Student Chapters
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-label-md text-label-md text-tertiary-fixed uppercase tracking-wider mb-2">
              Professional &amp; Events
            </span>
            <Link
              className="font-body-sm text-body-sm text-surface-variant/80 hover:text-surface-bright transition-colors"
              data-path="events"
              href="/events"
            >
              Upcoming Seminars
            </Link>
            <Link
              className="font-body-sm text-body-sm text-surface-variant/80 hover:text-surface-bright transition-colors"
              data-path="events"
              href="/events"
            >
              Memorial Lectures
            </Link>
            <Link
              className="font-body-sm text-body-sm text-surface-variant/80 hover:text-surface-bright transition-colors"
              data-path="gallery"
              href="/gallery"
            >
              Photo Gallery
            </Link>
            <Link
              className="font-body-sm text-body-sm text-surface-variant/80 hover:text-surface-bright transition-colors"
              data-path="news"
              href="/news"
            >
              Latest News &amp; Circulars
            </Link>
            <a
              className="font-body-sm text-body-sm text-surface-variant/80 hover:text-surface-bright transition-colors"
              data-path="join-chapter"
              href="https://iim-india.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Chapter (iim-india.net)
            </a>
            <Link
              className="font-body-sm text-body-sm text-surface-variant/80 hover:text-surface-bright transition-colors"
              data-path="contact"
              href="/contact"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-label-md text-label-md text-tertiary-fixed uppercase tracking-wider mb-2">
              Institutional Affiliation
            </span>
            <p className="font-body-sm text-body-sm text-surface-variant/80 leading-relaxed">
              Affiliated with The Indian Institute of Metals, 'Metal House', Kolkata.
            </p>
            <p className="font-body-sm text-body-sm text-surface-variant/80 leading-relaxed">
              Regional Secretariat: CSIR-IMMT, Bhubaneswar, Odisha - 751013.
            </p>
            <span className="font-label-sm text-label-sm text-primary-fixed">iimbhubaneswar.in</span>
          </div>
        </div>
        <div className="pt-space-md flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-surface-variant/60">
          <p className="text-center md:text-left">
            © 2025–2026 The Indian Institute of Metals — Bhubaneswar Chapter. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-xs">
            <Link href="/privacy" className="hover:text-surface-bright transition-colors">
              Privacy Policy
            </Link>
            <span className="text-surface-variant/40">•</span>
            <Link href="/terms" className="hover:text-surface-bright transition-colors">
              Terms of Use
            </Link>
            
            <div className="hidden sm:block h-3.5 w-[1px] bg-white/20 mx-1"></div>
            <SocialLinksBar className="scale-90" />
          </div>
        </div>
      </div>
    </footer>
  );
}
