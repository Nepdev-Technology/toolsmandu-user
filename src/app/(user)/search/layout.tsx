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
  const [opened, { toggle }] = useDisclosure();

  return (
    <section className="mx-24 grid grid-cols-10 gap-2">
      <div className="col-span-0 sm:col-span-2 md:col-span-2 hidden sm:block">
        <SidebarFilter></SidebarFilter>
        <Drawer opened={opened} onClose={toggle} title="Filter">
          <CategoryFilter></CategoryFilter>
        </Drawer>
      </div>

      <section className="col-span-10 sm:col-span-8 md:col-span-8">
        <Button
          variant="transparent"
          onClick={toggle}
          hiddenFrom="sm"
          size="md"
          className="text-textPrimary "
          aria-label="Toggle navigation"
        >
          {!opened ? <IconFilter /> : <IconX />}
        </Button>
        {children}
      </section>
    </section>
  );
}
