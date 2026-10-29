'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientNav() {
  const pathname = usePathname();

  useEffect(() => {
    console.log('CLIENTNAV EFFECT EXECUTED, pathname =', pathname);

    // 1. Move drawer to document.body initially so backdrop-blur on <header> never clips it
    function prepareDrawer() {
      const drawer = document.getElementById('mobile-menu-drawer');
      if (drawer && drawer.parentElement !== document.body) {
        document.body.appendChild(drawer);
      }
      return drawer;
    }

    const drawer = prepareDrawer();

    function setDrawerState(open: boolean) {
      const activeDrawer = document.getElementById('mobile-menu-drawer') || drawer;
      if (!activeDrawer) return;

      // Ensure drawer is on document.body
      if (activeDrawer.parentElement !== document.body) {
        document.body.appendChild(activeDrawer);
      }

      const toggle = document.getElementById('mobile-menu-toggle');
      const iconOpen = document.getElementById('menu-icon-open');
      const iconClose = document.getElementById('menu-icon-close');

      if (open) {
        activeDrawer.classList.add('drawer-open');
        activeDrawer.setAttribute('aria-hidden', 'false');
        toggle?.setAttribute('aria-expanded', 'true');

        if (iconOpen) iconOpen.classList.add('hidden');
        if (iconClose) iconClose.classList.remove('hidden');

        document.body.style.overflow = 'hidden';
      } else {
        activeDrawer.classList.remove('drawer-open');
        activeDrawer.setAttribute('aria-hidden', 'true');
        toggle?.setAttribute('aria-expanded', 'false');

        if (iconOpen) iconOpen.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');

        document.body.style.overflow = '';
      }
    }

    let lastClickTime = 0;

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const now = Date.now();
      // Debounce fast double-clicks
      if (now - lastClickTime < 250) {
        return;
      }

      // Check if Toggle Button clicked
      const toggle = target.closest('#mobile-menu-toggle');
      if (toggle) {
        e.preventDefault();
        e.stopPropagation();
        lastClickTime = now;

        const currentDrawer = document.getElementById('mobile-menu-drawer') || drawer;
        const isOpen = currentDrawer?.classList.contains('drawer-open');
        setDrawerState(!isOpen);
        return;
      }

      // Check if Close Button clicked
      const closeBtn = target.closest('#mobile-menu-close');
      if (closeBtn) {
        e.preventDefault();
        e.stopPropagation();
        lastClickTime = now;
        setDrawerState(false);
        return;
      }

      // Check if Backdrop clicked
      if (target.id === 'mobile-menu-backdrop') {
        e.preventDefault();
        e.stopPropagation();
        lastClickTime = now;
        setDrawerState(false);
        return;
      }

      // Check if any link inside Drawer clicked
      const drawerLink = target.closest('#mobile-menu-drawer a');
      if (drawerLink) {
        lastClickTime = now;
        setDrawerState(false);
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

    // Active link highlighting
    function highlightActiveLinks() {
      const cleanPath = (pathname.replace(/^\//, '').split('/')[0] || 'home').toLowerCase();

      document.querySelectorAll('nav a[data-path], #mobile-menu-panel a[data-path]').forEach((link) => {
        const href = (link.getAttribute('href') || '').replace(/^\//, '').toLowerCase();
        const dataPath = (link.getAttribute('data-path') || '').toLowerCase();
        const isMatch =
          (cleanPath === 'home' || cleanPath === '')
            ? (href === '' || href === 'home' || dataPath === 'home')
            : (href === cleanPath || dataPath === cleanPath);

        if (isMatch) {
          link.classList.add('bg-primary-container', 'text-on-primary-container', 'font-semibold');
          link.classList.remove('text-on-surface-variant');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('bg-primary-container', 'text-on-primary-container', 'font-semibold');
          link.classList.add('text-on-surface-variant');
          link.removeAttribute('aria-current');
        }
      });
    }

    // Attach click listener
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    highlightActiveLinks();

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname]);

  return null;
}
