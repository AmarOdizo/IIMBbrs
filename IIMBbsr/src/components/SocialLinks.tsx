import React from 'react';

export interface SocialLinkItem {
  id: 'facebook' | 'twitter' | 'instagram' | 'youtube' | 'linkedin';
  name: string;
  href: string;
  displayUrl: string;
  ariaLabel: string;
  hoverColor: string;
  badgeColor: string;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    href: 'https://www.facebook.com/TheIndianInstituteofMetals',
    displayUrl: 'facebook.com/TheIndianInstituteofMetals',
    ariaLabel: 'Official IIM Facebook Page',
    hoverColor: 'hover:text-[#1877F2]',
    badgeColor: 'bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/30',
  },
  {
    id: 'twitter',
    name: 'Twitter (X)',
    href: 'https://twitter.com/IIM_HeadOffice',
    displayUrl: 'twitter.com/IIM_HeadOffice',
    ariaLabel: 'Official IIM Twitter / X Handle',
    hoverColor: 'hover:text-white',
    badgeColor: 'bg-white/10 text-white border-white/20',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    href: 'https://www.instagram.com/indianinstituteofmetals',
    displayUrl: 'instagram.com/indianinstituteofmetals',
    ariaLabel: 'Official IIM Instagram Profile',
    hoverColor: 'hover:text-[#E4405F]',
    badgeColor: 'bg-[#E4405F]/10 text-[#E4405F] border-[#E4405F]/30',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    href: 'https://www.youtube.com/@theindianinstituteofmetals4921',
    displayUrl: 'youtube.com/@theindianinstituteofmetals4921',
    ariaLabel: 'Official IIM YouTube Channel',
    hoverColor: 'hover:text-[#FF0000]',
    badgeColor: 'bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000]/30',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/the-indian-institute-of-metals/',
    displayUrl: 'linkedin.com/company/the-indian-institute-of-metals',
    ariaLabel: 'Official IIM LinkedIn Organization',
    hoverColor: 'hover:text-[#0A66C2]',
    badgeColor: 'bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/30',
  },
];

export function SocialIcon({ id, className = 'w-4 h-4' }: { id: SocialLinkItem['id']; className?: string }) {
  switch (id) {
    case 'facebook':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.64-1.64c0-.91-.73-1.64-1.64-1.64s-1.64.73-1.64 1.64c0 .91.73 1.64 1.64 1.64m1.39 9.74v-8.37H5.07v8.37h2.78z" />
        </svg>
      );
  }
}

export default function SocialLinksBar({
  variant = 'compact',
  className = '',
}: {
  variant?: 'compact' | 'expanded';
  className?: string;
}) {
  if (variant === 'expanded') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ${className}`}>
        {SOCIAL_LINKS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.ariaLabel}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container border border-slate-200/60 hover:border-primary/40 transition-all group"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${item.badgeColor}`}>
              <SocialIcon id={item.id} className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-title-md text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                {item.name}
              </span>
              <span className="font-mono text-[11px] text-secondary truncate">
                {item.displayUrl}
              </span>
            </div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {SOCIAL_LINKS.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.ariaLabel}
          title={item.name}
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-white/10 hover:bg-white/20 text-slate-300 ${item.hoverColor}`}
        >
          <SocialIcon id={item.id} className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}
