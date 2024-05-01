'use client'; // Error components must be Client Components

import { Button } from '@mantine/core';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <div className="bg-primary px-2 text-center text-textPrimary">
        <div className="h-screen flex flex-col justify-center items-center">
          <h1 className="text-8xl font-extrabold ">500</h1>
          <p className="text-4xl font-medium ">Internal Server Error</p>
          <p className="text-xl  mt-4">
            We apologize for the inconvenience. Please try again later.
          </p>
          <Link href="/">
            {' '}
            <Button
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
              className="mt-5"
            >
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
