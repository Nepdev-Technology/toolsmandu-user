'use client';
import DropDownMenu from '@/src/components/heading/DropDownMenu';
import TrustHeader from '@/src/components/heading/TrustHeader';
import { SearchBar } from '@/src/components/search/search';
import { useCurrentUser } from '@/src/hooks/auth/useCurrentUser';
import {
  AppShell,
  AppShellMain,
  Burger,
  Button,
  Group,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  const { user: currentUser } = useCurrentUser();

  return (
    <AppShell
      withBorder={false}
      className="text-textPrimary bg-primary font-display "
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <header className="  box-border	mb-2">
        {' '}
        <TrustHeader></TrustHeader>
        <div className=" flex justify-around items-center lg:justify-around gap-2 h-16 bg-senary box-border	">
          <Burger
            color="primary.0"
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="md"
            className="text-primary "
            aria-label="Toggle navigation"
          />
          <Link href={'/'}>
            <Image
              radius="md"
              h={30}
              w="auto"
              src={'toolsmandu-light.png'}
              alt="Toolsmandu Logo"
            />
          </Link>
          <SearchBar></SearchBar>
          <Group ml="xl" gap={0} visibleFrom="sm">
            <Button className="bg-quaternary">
              <IconUser></IconUser>
            </Button>
          </Group>
        </div>
        <DropDownMenu></DropDownMenu>
      </header>
      <AppShell.Navbar py="md" px={4}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
      </AppShell.Navbar>
      <AppShellMain> {children}</AppShellMain>
      <footer>Footer</footer>
    </AppShell>
  );
}
