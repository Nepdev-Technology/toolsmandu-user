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
    <section className="xs:px-[auto] sm:px-[2rem] md:px-[5rem] lg:px-[10rem]  ">
      <section className=" ">{children}</section>
    </section>
  );
}
