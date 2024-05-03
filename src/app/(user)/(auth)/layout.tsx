'use client';
import { Button, Image } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="w-screen mt-10 flex items-center justify-center text-textPrimary xs:px-4 sm:px-10 lg:px-15">
        <div className="h-fit flex flex-col gap-2">
          {children}

          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login/google`}>
            <Button className=" w-full mt-2 ">
              {/* <IconBrandGoogle></IconBrandGoogle>
               */}
              <Image
                src={'google.png'}
                radius="md"
                h={20}
                w="auto"
                alt={'Esewa logo'}
              />
              <span className="ml-4"> Continue With Google</span>{' '}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
