'use client';
import { oauthSignIn } from '@/src/utils/GoogleSignup';
import { Button } from '@mantine/core';
import { IconBrandGoogle } from '@tabler/icons-react';
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

          <Button onClick={oauthSignIn} className=" w-full mt-2 ">
            <IconBrandGoogle></IconBrandGoogle>
          </Button>
        </div>
      </div>
    </section>
  );
}
