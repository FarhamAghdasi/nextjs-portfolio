'use client';

import React, { Suspense } from 'react';
import Bloginfo from '@/components/pages/blog-page';

export default function BloginfoClient() {
  return (
    <Suspense fallback={<div>Loading blog posts...</div>}>
      <Bloginfo />
    </Suspense>
  );
}
