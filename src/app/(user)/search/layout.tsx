'use client';
import CategoryFilter from '@/src/components/SideBarFilter/CategoryFilter';
import SidebarFilter from '@/src/components/SideBarFilter/SidebarFilter';
import { Button, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconX } from '@tabler/icons-react';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" sm:px-[2rem] md:px-[5rem] lg:px-[10rem] ">
      <section className=" ">{children}</section>
    </section>
  );
}
