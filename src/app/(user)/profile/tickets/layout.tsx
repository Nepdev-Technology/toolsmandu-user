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
    <section className="  ">
      <TicketHeader></TicketHeader>
      <section className="mt-4">{children}</section>
    </section>
  );
}
