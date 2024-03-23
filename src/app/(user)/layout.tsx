'use client';
import DropDownMenu from '@/src/components/heading/DropDownMenu';
import TrustHeader from '@/src/components/heading/TrustHeader';
import { SearchBar } from '@/src/components/search/search';
import { useCurrentUser } from '@/src/hooks/auth/useCurrentUser';
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Burger,
  Button,
  Image,
} from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import Link from 'next/link';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const pinned = useHeadroom({ fixedAt: 120 });
  // const headerPinned = useHeadroom({ fixedAt: 100vh });

  const { user: currentUser } = useCurrentUser();

  return (
    <AppShell
      withBorder={false}
      className="text-textPrimary bg-primary font-display "
      header={{
        height: { xs: 60, sm: 80, md: 133 },
        collapsed: !pinned,
        offset: false,
      }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      footer={{
        height: { xh: 30, sm: 40, md: 60 },
      }}
      px={{ xs: 10, sm: 25, md: 80 }}
      py={{ xs: 65, sm: 85, md: 135 }}
    >
      <AppShellHeader className="shadow-lg bg-secondary md:bg-primary  box-border	">
        {' '}
        <TrustHeader></TrustHeader>
        <div className=" flex justify-around items-center lg:justify-around gap-2 h-16 bg-secondary box-border	">
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
          {/* <Group ml="xl" gap={0} visibleFrom="sm">
            <Button>
              <IconHeart></IconHeart>
            </Button>
          </Group> */}
        </div>
        <DropDownMenu></DropDownMenu>
      </AppShellHeader>
      <AppShell.Navbar py="md" px={4}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
      </AppShell.Navbar>
      <AppShellMain>{children}</AppShellMain>
      {/* <AppShellFooter>Footer</AppShellFooter> */}
    </AppShell>
  );
}
