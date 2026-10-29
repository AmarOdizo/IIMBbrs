'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MembersDirectory from '@/components/MembersDirectory';

const htmlContent = ` + JSON.stringify(htmlContent.replace(/"/g, '\"').replace(/\\"/g, '\"')) + `;

export default function MembersPage() {
  const [mounted, setMounted] = useState(false);
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setSlot(document.getElementById('members-slot'));
  }, []);

  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: htmlContent }} />
      {mounted && slot && createPortal(<MembersDirectory />, slot)}
    </>
  );
}
