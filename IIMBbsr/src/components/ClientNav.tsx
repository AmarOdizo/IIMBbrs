'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Global helper implementations for Client-side interactive buttons
if (typeof window !== 'undefined') {
  (window as any).downloadSympIcs = function() {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//IIM Bhubaneswar//AHSS 2026//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:ahss-2026-' + Date.now() + '@iimbhubaneswar.in',
      'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      'DTSTART;TZID=Asia/Kolkata:20260328T090000',
      'DTEND;TZID=Asia/Kolkata:20260329T180000',
      'SUMMARY:18th National Symposium on Advanced High-Strength Steels (AHSS-2026)',
      'DESCRIPTION:Indian Institute of Metals Bhubaneswar Chapter 18th National Symposium at CSIR-IMMT.',
      'LOCATION:Dr. Nilamani Sen Auditorium, CSIR-IMMT, Bhubaneswar, Odisha',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'AHSS_2026_IIM_Bhubaneswar.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  (window as any).switchSympV3Image = function(idx: number) {
    const img = document.getElementById('symp-v3-bg-img') as HTMLImageElement | null;
    const b0 = document.getElementById('symp-v3-img-btn-0');
    const b1 = document.getElementById('symp-v3-img-btn-1');
    if (!img) return;
    img.style.opacity = '0.3';
    setTimeout(() => {
      if (idx === 0) {
        img.src = '/assets/images/hero_ahss_structure.jpg';
        if (b0) b0.className = 'px-2.5 py-1 rounded-lg bg-primary text-white font-semibold transition-all flex items-center gap-1 text-xs shadow-sm hover:scale-105';
        if (b1) b1.className = 'px-2.5 py-1 rounded-lg bg-white/10 text-white/80 hover:text-white hover:bg-white/20 font-medium transition-all flex items-center gap-1 text-xs hover:scale-105';
      } else {
        img.src = '/assets/images/hero_green_steel.jpg';
        if (b1) b1.className = 'px-2.5 py-1 rounded-lg bg-primary text-white font-semibold transition-all flex items-center gap-1 text-xs shadow-sm hover:scale-105';
        if (b0) b0.className = 'px-2.5 py-1 rounded-lg bg-white/10 text-white/80 hover:text-white hover:bg-white/20 font-medium transition-all flex items-center gap-1 text-xs hover:scale-105';
      }
      img.style.opacity = '1';
    }, 150);
  };

  (window as any).switchDayTab = function(dayNumber: number) {
    const day1Panel = document.getElementById('day1Panel');
    const day2Panel = document.getElementById('day2Panel');
    const day1Btn = document.getElementById('tabDay1Btn');
    const day2Btn = document.getElementById('tabDay2Btn');
    if (!day1Panel || !day2Panel || !day1Btn || !day2Btn) return;
    if (dayNumber === 1) {
      day1Panel.classList.remove('hidden');
      day1Panel.classList.add('flex');
      day2Panel.classList.add('hidden');
      day2Panel.classList.remove('flex');
      day1Btn.className = 'px-4 py-2 rounded font-label-md text-label-md font-semibold bg-primary text-on-primary transition-all shadow-sm';
      day2Btn.className = 'px-4 py-2 rounded font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface transition-all';
    } else {
      day1Panel.classList.add('hidden');
      day1Panel.classList.remove('flex');
      day2Panel.classList.remove('hidden');
      day2Panel.classList.add('flex');
      day2Btn.className = 'px-4 py-2 rounded font-label-md text-label-md font-semibold bg-primary text-on-primary transition-all shadow-sm';
      day1Btn.className = 'px-4 py-2 rounded font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface transition-all';
    }
  };

  (window as any).switchTerm = function(termYear: string, el?: HTMLElement | null) {
    const tabs = document.querySelectorAll('.term-tab');
    tabs.forEach(tab => {
      tab.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
      tab.classList.add('text-on-surface-variant', 'hover:text-on-surface', 'hover:bg-surface-container-high');
    });
    if (el) {
      el.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      el.classList.remove('text-on-surface-variant', 'hover:text-on-surface', 'hover:bg-surface-container-high');
    }
    const label = document.getElementById('activeTermLabel');
    if (label) {
      label.textContent = termYear;
    }
  };
}

export default function ClientNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Mobile Drawer State Controller
  const setDrawerState = (open: boolean) => {
    const drawers = document.querySelectorAll('#mobile-menu-drawer');
    const toggles = document.querySelectorAll('#mobile-menu-toggle');
    const iconOpens = document.querySelectorAll('#menu-icon-open');
    const iconCloses = document.querySelectorAll('#menu-icon-close');

    if (drawers.length === 0) return;

    if (open) {
      drawers.forEach((drawer) => {
        drawer.classList.add('drawer-open');
        drawer.setAttribute('aria-hidden', 'false');
      });
      toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', 'true'));
      iconOpens.forEach((icon) => icon.classList.add('hidden'));
      iconCloses.forEach((icon) => icon.classList.remove('hidden'));
      document.body.style.overflow = 'hidden';
    } else {
      drawers.forEach((drawer) => {
        drawer.classList.remove('drawer-open');
        drawer.setAttribute('aria-hidden', 'true');
      });
      toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', 'false'));
      iconOpens.forEach((icon) => icon.classList.remove('hidden'));
      iconCloses.forEach((icon) => icon.classList.add('hidden'));
      document.body.style.overflow = '';
    }
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setDrawerState(false);
  }, [pathname]);

  // Global Click and Event Interceptor
  useEffect(() => {
function handleDocumentClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
// 1. Mobile Hamburger Toggle Button, Close Button, and Backdrop
      // Handled natively by Navbar component state for instant mobile touch response
      if (
        target.closest('#mobile-menu-toggle') ||
        target.closest('#mobile-menu-close') ||
        target.id === 'mobile-menu-backdrop'
      ) {
        return;
      }

            // Intercept Calendar Download button
      const calBtn = target.closest(
        'button[onclick*="downloadSympIcs"], [data-action="download-symp-ics"], [title*="Calendar (.ics)"]'
      );
      if (calBtn) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof (window as any).downloadSympIcs === 'function') {
          (window as any).downloadSympIcs();
        }
        return;
      }

      // Intercept Committee switchTerm buttons
      const termBtn = target.closest('[onclick*="switchTerm"], .term-tab') as HTMLElement | null;
      if (termBtn) {
        const onclickAttr = termBtn.getAttribute('onclick') || '';
        const match = onclickAttr.match(/switchTerm\('([^']+)'/);
        const term = match ? match[1] : termBtn.textContent?.trim();
        if (term && typeof (window as any).switchTerm === 'function') {
          e.preventDefault();
          e.stopPropagation();
          (window as any).switchTerm(term, termBtn);
          return;
        }
      }

      // Intercept Symposium Specimen switcher buttons
      const specBtn = target.closest('[onclick*="switchSympV3Image"], #symp-v3-img-btn-0, #symp-v3-img-btn-1') as HTMLElement | null;
      if (specBtn) {
        const idx = specBtn.id === 'symp-v3-img-btn-1' || (specBtn.getAttribute('onclick') || '').includes('(1)') ? 1 : 0;
        if (typeof (window as any).switchSympV3Image === 'function') {
          e.preventDefault();
          e.stopPropagation();
          (window as any).switchSympV3Image(idx);
          return;
        }
      }

      // Intercept Symposium Day Tab switcher
      const dayBtn = target.closest('[onclick*="switchDayTab"], #tabDay1Btn, #tabDay2Btn') as HTMLElement | null;
      if (dayBtn) {
        const day = dayBtn.id === 'tabDay2Btn' || (dayBtn.getAttribute('onclick') || '').includes('(2)') ? 2 : 1;
        if (typeof (window as any).switchDayTab === 'function') {
          e.preventDefault();
          e.stopPropagation();
          (window as any).switchDayTab(day);
          return;
        }
      }

      // 4. Intercept Hyperlinks for Client-Side SPA Navigation (NO Page Reload)
      const link = target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Allow default behavior for modifier clicks (Ctrl+Click, Cmd+Click, Shift+Click, middle click)
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
        return;
      }

      // Allow default behavior for external links, mailto, tel, downloads, or target="_blank"
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        link.hasAttribute('download') ||
        link.target === '_blank'
      ) {
        return;
      }

      // Allow standard jump/smooth-scroll for in-page anchors (e.g. href="#chairmans-address")
      if (href.startsWith('#')) {
        setDrawerState(false);
        return;
      }

      // Resolve URL against current origin
      const currentOrigin = window.location.origin;
      const targetUrl = new URL(href, currentOrigin);

      // Verify origin matches
      if (targetUrl.origin !== currentOrigin) {
        return;
      }

      // If it's a hash jump on the same pathname (e.g. /#chairmans-address)
      if (targetUrl.pathname === window.location.pathname && targetUrl.hash) {
        setDrawerState(false);
        return;
      }

      // PREVENT FULL BROWSER RELOAD
      e.preventDefault();
      e.stopPropagation();

      // Ensure mobile drawer is closed
      setDrawerState(false);

      const destination = targetUrl.pathname + targetUrl.search + targetUrl.hash;

      // If user clicked the link of the page they are already on, jump to top
      if (targetUrl.pathname === window.location.pathname && !targetUrl.search && !targetUrl.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // Perform instant, clean Client-side SPA navigation via Next.js router (no animations)
      router.push(destination);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // Prefetch routes on hover for instant 0ms transition
    function handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !link.hasAttribute('download') &&
        link.target !== '_blank'
      ) {
        try {
          router.prefetch(href);
        } catch {
          // ignore prefetch errors
        }
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setDrawerState(false);
      }
    }

    function handleResize() {
      if (window.innerWidth >= 1024) {
        setDrawerState(false);
      }
    }

    document.addEventListener('click', handleDocumentClick, true);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [router]);

  return null;
}
