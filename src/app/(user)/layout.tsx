'use client';
import DropDownMenu from '@/src/components/heading/DropDownMenu';
import { IDropDownMenuItemProps } from '@/src/components/heading/DropDownMenuItem';
import Sidebar from '@/src/components/heading/Sidebar';
import TrustHeader from '@/src/components/heading/TrustHeader';
import Footer from '@/src/components/layouts/footer';
import { SearchBar } from '@/src/components/search/search';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import {
  FeaturedCategory,
  Product,
} from '@/src/types/interfaces/ProductInterface';
import {
  AppShell,
  AppShellMain,
  Burger,
  Button,
  Divider,
  Group,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHelp, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import NextNProgress from 'nextjs-progressbar';
import React, { useCallback, useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const [data, setData] = React.useState<IDropDownMenuItemProps[]>([]);
  const getCategories = useCallback(async () => {
    const http = new HttpService();
    try {
      const response: any = await http
        .service()
        .get(apiRoutes.products.featured);

      const dropdownMenuItems: IDropDownMenuItemProps[] = response.data.map(
        (category: FeaturedCategory) => ({
          category: category.name,
          products: category.products.map((product: Product) => ({
            url: `/${product.id}`,
            name: product.name,
          })),
        })
      );
      setData(dropdownMenuItems);
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message.includes('fetch failed')
      ) {
        // Redirect to the maintenance page
        redirect('/maintenance');
      }
    }
  }, []);
  useEffect(() => {
    getCategories();
  }, []);
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
          <Group ml="xl" gap={4} visibleFrom="sm">
            <Link href={'/profile'}>
              <Button className="bg-quaternary">
                {' '}
                <IconUser></IconUser>
              </Button>
            </Link>
            <Link href={'/tickets'}>
              <Button className="bg-quaternary">
                {' '}
                <IconHelp></IconHelp>
              </Button>
            </Link>
          </Group>
        </div>
        <DropDownMenu items={data}></DropDownMenu>
      </header>
      <AppShell.Navbar
        py="md"
        px={4}
        className="text-textPrimary bg-primary font-display"
      >
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="md"
          color="white"
        />
        <Sidebar items={data}></Sidebar>
      </AppShell.Navbar>
      <AppShellMain>
        <NextNProgress height={4} />
        {children}
      </AppShellMain>
      <div className="sm:mt-[1rem] md:mt-[4rem]">
        <Divider></Divider>
        <Footer></Footer>
      </div>
    </AppShell>
  );
}
