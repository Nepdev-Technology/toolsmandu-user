'use client';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <section className="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
      {children}
    </section>
  );
}
