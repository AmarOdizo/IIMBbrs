'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems, siteConfig } from '@/data/siteData';
import { Menu, X, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // 1. Lock background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // 2. Automatically close drawer when pathname/route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // 3. Close drawer on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [mobileOpen]);

  // 4. Automatically close drawer if resized to desktop width (>= 1280px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Fixed Header with z-50 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
        {/* Top Institutional Affiliate Banner */}
        <div className="bg-[#0e1622] text-slate-300 text-[11px] font-semibold tracking-wider uppercase border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="truncate">{siteConfig.fullName}</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-slate-400 text-[10px]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                {siteConfig.affiliation}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {siteConfig.email}
              </span>
            </div>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 py-1 group">
            <img
              src="/logo1.svg"
              alt="IIM Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold text-slate-900 leading-tight">IIM Bhubaneswar</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Chapter Portal</span>
            </div>
          </Link>

          {/* Desktop Links (Visible on >= xl screens) */}
          <nav className="hidden xl:flex items-center gap-1 text-[13px] font-medium text-slate-700">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#994106] text-white font-semibold shadow-sm'
                      : 'hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/membership"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-[#994106] text-white hover:bg-[#7b3303] transition-colors shadow-sm"
            >
              <span>Join Chapter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Hamburger Button (Visible on mobile & tablet: < xl screens) */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#994106]/40 transition-colors touch-manipulation cursor-pointer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileOpen ? <X className="w-6 h-6 text-[#994106]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Rendered with z-[100] to sit strictly above the z-50 fixed header) */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-[100] xl:hidden flex justify-end"
        >
          {/* Backdrop overlay covering the full screen including the fixed header */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Slide Drawer Panel */}
          <div
            className="relative z-10 w-[85%] max-w-xs h-full bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 transform transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header with Title and Close Button */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <img src="/logo1.svg" alt="IIM Logo" className="h-8 w-auto object-contain" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-slate-900 leading-tight">IIM Bhubaneswar</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Chapter Portal</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#994106]/40 touch-manipulation cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links inside Drawer */}
            <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#994106] text-white font-semibold shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'opacity-90' : 'opacity-40'}`} />
                  </Link>
                );
              })}
            </div>

            {/* Drawer Action Area (Join Chapter CTA) */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2">
              <Link
                href="/membership"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-center bg-[#994106] text-white hover:bg-[#7b3303] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Join Chapter (2026)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                CSIR-IMMT, Bhubaneswar • IIM HQ Kolkata
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
