'use client';
import { SearchBar } from '@/src/components/search/search';
import { useCurrentUser } from '@/src/hooks/auth/useCurrentUser';
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Burger,
  Button,
  Container,
  Group,
  Image,
} from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { IconHeart } from '@tabler/icons-react';
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
        height: { xs: 60, sm: 80, md: 120 },
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
      py={{ xs: 65, sm: 85, md: 125 }}
    >
      <AppShellHeader className="shadow-lg bg-secondary md:bg-primary ">
        {' '}
        <Container
          className="bg-gradient-to-r from-darkPrimary to-blue-600"
          fluid
          visibleFrom="sm"
        >
          Default Container
        </Container>
        <div className=" flex justify-around items-center lg:justify-around gap-2 h-16">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="md"
            color="white"
          />
          <Image radius="md" h={30} w="auto" src={'toolsmandu-light.png'} />{' '}
          <SearchBar></SearchBar>
          <Group ml="xl" gap={0} visibleFrom="sm">
            <Button>
              <IconHeart></IconHeart>
            </Button>
          </Group>
        </div>
        <Container className="bg-darkPrimary" fluid visibleFrom="sm">
          Categories
        </Container>
      </AppShellHeader>
      <AppShell.Navbar py="md" px={4}>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
      </AppShell.Navbar>
      <AppShellMain>{children} </AppShellMain>
      {/* <AppShellFooter>Footer</AppShellFooter> */}
    </AppShell>
  );
}
