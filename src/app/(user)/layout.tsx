'use client';
import { SearchBar } from '@/src/components/search/search';
import { useCurrentUser } from '@/src/hooks/auth/useCurrentUser';
import {
  AppShell,
  AppShellMain,
  Burger,
  Container,
  Group,
  Image,
  UnstyledButton,
  em,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React from 'react';
import classes from './MobileNavbar.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const { user: currentUser } = useCurrentUser();

  return (
    <AppShell
      className="text-textPrimary"
      header={{ height: !isMobile ? 120 : 60 }}
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
        <Group className="bg-primary  ">
          <div className="flex justify-start items-center lg:justify-around gap-2 ">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Image radius="md" h={30} w="auto" src={'toolsmandu-light.png'} />

            <SearchBar></SearchBar>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton className={classes.control}>
                Support
              </UnstyledButton>
            </Group>
          </div>
        </Group>
        <Container className="bg-darkPrimary" fluid visibleFrom="sm">
          Categories
        </Container>
      </AppShell.Header>
      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control}>Home</UnstyledButton>
        <UnstyledButton className={classes.control}>Blog</UnstyledButton>
        <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
        <UnstyledButton className={classes.control}>Support</UnstyledButton>
      </AppShell.Navbar>
      <AppShellMain>{children}</AppShellMain>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  );
}
