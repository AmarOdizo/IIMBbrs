'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // Hide Navbar completely on /admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/', path: 'home', icon: 'home' },
    { name: 'About', href: '/about', path: 'about', icon: 'info' },
    { name: 'Committee', href: '/committee', path: 'committee', icon: 'groups' },
    { name: 'Members', href: '/members', path: 'members', icon: 'badge' },
    { name: 'Events', href: '/events', path: 'events', icon: 'event' },
    { name: 'Awards', href: '/awards', path: 'awards', icon: 'workspace_premium' },
    { name: 'Student Chapters', href: '/student-chapters', path: 'student-chapters', icon: 'school' },
    { name: 'Gallery', href: '/gallery', path: 'gallery', icon: 'photo_library' },
    { name: 'News', href: '/news', path: 'news', icon: 'newspaper' },
    { name: 'Contact', href: '/contact', path: 'contact', icon: 'mail' },
  ];

  const currentPath = (pathname.replace(/^\//, '').split('/')[0] || 'home').toLowerCase();

  return (
    <header id="global-navbar" className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-surface-variant/20">
      {/* Top Chapter Affiliate Bar */}
      <div className="bg-on-background text-surface-variant font-label-sm text-[10px] sm:text-label-sm tracking-wider uppercase border-b border-surface-variant/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-2">
          <span className="truncate">THE INDIAN INSTITUTE OF METALS • BHUBANESWAR CHAPTER</span>
          <span className="text-surface-variant/80 hidden md:inline shrink-0">
            AFFILIATED TO IIM HEAD OFFICE, KOLKATA (IIM-INDIA.NET)
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-16 sm:h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 lg:gap-4">
        <Link href="/" className="flex items-center shrink-0 py-1" title="IIM Bhubaneswar Chapter">
          <img
            alt="The Indian Institute of Metals - Bhubaneswar Chapter"
            className="h-9 sm:h-11 md:h-12 w-auto object-contain"
            src="/assets/images/logo1.svg"
          />
        </Link>

        {/* Desktop Navigation Menu (Visible on lg: >= 1024px) */}
        <nav className="hidden lg:flex items-center gap-1 font-label-md text-label-md">
          {navLinks.map((item) => {
            const isActive =
              (currentPath === 'home' || currentPath === '')
                ? item.path === 'home'
                : currentPath === item.path;

            return (
              <Link
                key={item.href}
                href={item.href}
                data-path={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={`px-2.5 py-1.5 shrink-0 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-container text-white font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop & Tablet Action CTA + Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/privacy-terms"
            data-path="privacy-terms"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg font-label-md text-xs sm:text-label-md font-semibold shrink-0 shadow-sm transition-all bg-primary text-on-primary hover:bg-primary-container"
          >
            <span className="material-symbols-outlined text-[17px]">verified_user</span>
            <span>Privacy &amp; Terms</span>
          </Link>

          {/* Hamburger Button (Mobile & Tablet: < 1024px) */}
          <button
            id="mobile-menu-toggle"
            type="button"
            className="lg:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Toggle navigation menu"
            aria-expanded="false"
          >
            <span className="material-symbols-outlined text-2xl block" id="menu-icon-open">
              menu
            </span>
            <span className="material-symbols-outlined text-2xl hidden" id="menu-icon-close">
              close
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer & Backdrop */}
      <div
        id="mobile-menu-drawer"
        className="fixed inset-0 z-50 transition-opacity duration-300 pointer-events-none opacity-0 invisible"
        aria-hidden="true"
      >
        {/* Backdrop */}
        <div id="mobile-menu-backdrop" className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

        {/* Slide-out Drawer Panel */}
        <div
          id="mobile-menu-panel"
          className="absolute top-0 right-0 bottom-0 w-[85%] max-w-[340px] bg-surface shadow-2xl flex flex-col justify-between transform translate-x-full transition-transform duration-300 ease-out border-l border-surface-variant/20 z-10"
        >
          {/* Drawer Header */}
          <div className="p-4 border-b border-surface-variant/20 flex items-center justify-between bg-surface-container-low">
            <div className="flex items-center gap-2.5">
              <img src="/assets/images/logo1.svg" alt="IIM Logo" className="h-8 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-title-md text-xs font-bold text-on-surface leading-tight">IIM Bhubaneswar</span>
                <span className="font-label-sm text-[10px] text-secondary uppercase tracking-wider">Chapter Portal</span>
              </div>
            </div>
            <button
              id="mobile-menu-close"
              type="button"
              className="p-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
            {navLinks.map((item) => {
              const isActive =
                (currentPath === 'home' || currentPath === '')
                  ? item.path === 'home'
                  : currentPath === item.path;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-path={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`drawer-nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg font-label-md text-sm transition-colors ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl text-primary">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Drawer Footer Action Area */}
          <div className="p-4 border-t border-surface-variant/20 bg-surface-container-lowest space-y-3">
            <Link
              href="/privacy-terms"
              className="w-full py-2.5 px-4 rounded-xl font-label-md text-sm font-semibold text-center bg-primary text-on-primary hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-base">verified_user</span>
              <span>Privacy &amp; Terms</span>
            </Link>
            <div className="text-[11px] text-secondary text-center leading-relaxed">
              <span>CSIR-IMMT, Bhubaneswar • IIM HQ Kolkata</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
