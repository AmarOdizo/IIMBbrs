'use client';

import React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="tab-page-transition">{children}</div>;
}

