'use client';
import { SearchBar } from '@/src/components/search/search';
import { useCurrentUser } from '@/src/hooks/auth/useCurrentUser';
import {
  AppShell,
  AppShellMain,
  Burger,
  Button,
  Container,
  Group,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHeart } from '@tabler/icons-react';
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
      className="text-textPrimary"
      header={{ height: 120 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="xl"
    >
      <AppShell.Header>
        <Container
          className="bg-gradient-to-r from-darkPrimary to-blue-600"
          fluid
          visibleFrom="sm"
        >
          Default Container
        </Container>
        <div className=" bg-primary flex justify-around items-center lg:justify-around gap-2 h-full">
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
      </AppShell.Header>
      <AppShell.Navbar py="md" px={4}>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
      </AppShell.Navbar>
      <AppShellMain>
        <div className="sm:mt-8 ">{children}</div>
      </AppShellMain>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  );
}
