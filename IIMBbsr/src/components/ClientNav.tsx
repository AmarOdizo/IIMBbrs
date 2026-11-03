'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
