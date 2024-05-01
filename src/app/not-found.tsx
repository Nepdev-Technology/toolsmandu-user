import { Button } from '@mantine/core';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <div className="bg-primary px-2 text-center text-textPrimary">
        <div className="h-screen flex flex-col justify-center items-center">
          <h1 className="text-8xl font-extrabold ">404</h1>
          <p className="text-4xl font-medium ">Not Found</p>
          <p className="text-xl  mt-4">
            The page you are looking for doesn&apos;t exists.
          </p>
          <Link href="/">
            {' '}
            <Button className="mt-5">Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
