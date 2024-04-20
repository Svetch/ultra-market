'use client';

import NextError from 'next/error';

export const runtime = 'edge';

export default function NotFound() {
  return (
    <div>
      <NextError
        statusCode={undefined as any}
        title="Not found"
        withDarkMode={true}
      />
    </div>
  );
}
