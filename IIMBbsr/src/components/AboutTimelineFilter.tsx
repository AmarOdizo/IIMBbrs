'use client';

import { useEffect } from 'react';

export default function AboutTimelineFilter() {
  useEffect(() => {
    const filterButtons = document.querySelectorAll('#timeline-filters .timeline-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    const handleFilterClick = (e: Event) => {
      const btn = (e.currentTarget || e.target) as HTMLElement | null;
      if (!btn) return;
      const targetFilter = btn.getAttribute('data-filter');

      filterButtons.forEach((b) => {
        b.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
        b.classList.add('text-on-surface-variant');
      });
      btn.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
      btn.classList.remove('text-on-surface-variant');

      timelineItems.forEach((item) => {
        const el = item as HTMLElement;
        if (targetFilter === 'all' || el.classList.contains(targetFilter || '')) {
          el.style.display = 'grid';
        } else {
          el.style.display = 'none';
        }
      });
    };

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', handleFilterClick);
    });

    return () => {
      filterButtons.forEach((btn) => {
        btn.removeEventListener('click', handleFilterClick);
      });
    };
  }, []);

  return null;
}

