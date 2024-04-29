'use client';
import TicketHeader from '@/src/components/heading/TicketHeader';
import { Divider } from '@mantine/core';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="xs:px-[auto] sm:px-[2rem] md:px-[5rem] lg:px-[10rem]  ">
      <TicketHeader></TicketHeader>
      <Divider size="xs"></Divider>
      <section className="mt-4">{children}</section>
    </section>
  );
}
