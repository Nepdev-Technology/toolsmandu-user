'use client';
import HeaderNotification, {
  IHeaderNotification,
} from '@/src/components/Cards/Notificaton';
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
  Indicator,
  Menu,
  MenuDropdown,
  MenuTarget,
  VisuallyHidden,
} from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { IconBell, IconUser } from '@tabler/icons-react';
import Image from 'next/image';
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
  const [notifications, setNotifications] = React.useState<
    IHeaderNotification[]
  >([]);

  const getCategories = useCallback(async () => {
    const http = new HttpService();
    try {
      const response: any = await http.service().get(apiRoutes.products.navbar);

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

  const getNotification = useCallback(async () => {
    const http = new HttpService();
    try {
      const response: any = await http
        .service()
        .get(apiRoutes.notification.base);

      const notification: IHeaderNotification[] = response.data.result.map(
        (notification: IHeaderNotification) => ({
          title: notification.title,
          message: notification.message,
          createdAt: notification.createdAt,
          link: notification.link,
        })
      );

      setNotifications(notification);
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
    getNotification();
  }, []);
  return (
    <AppShell
      withBorder={false}
      className="text-textPrimary bg-primary font-display "
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <header className="  box-border	mb-2">
        {' '}
        <TrustHeader></TrustHeader>
        <div className=" flex justify-around items-center lg:justify-around gap-2 h-20 bg-senary box-border	">
          <Burger
            color="primary.0"
            opened={opened}
            onClick={toggle}
            hiddenFrom="md"
            size="md"
            className="text-primary "
            aria-label="Toggle navigation"
          />
          <VisuallyHidden>Toggle</VisuallyHidden>
          <Link href={'/'}>
            <Image
              height={30}
              width={186}
              src={'/toolsmandu-light.png'}
              alt="Toolsmandu Logo"
            />
          </Link>
          <SearchBar></SearchBar>
          <div className="flex gap-2 relative right-2">
            <Link href={'/profile'}>
              <Button className="bg-quaternary" size="md" px={10}>
                {' '}
                <IconUser></IconUser>
                <VisuallyHidden>Profile</VisuallyHidden>
              </Button>
            </Link>
            <Menu
              withArrow
              classNames={{
                arrow: 'bg-quaternary border-none ',
              }}
            >
              <MenuTarget>
                <Button className="bg-quaternary" size="md" px={10}>
                  {' '}
                  <span className="w-[75%]">
                    {' '}
                    <Indicator
                      color="red"
                      processing
                      label={notifications.length}
                      position="top-end"
                      disabled={notifications.length < 1}
                    >
                      <span>
                        {' '}
                        <IconBell></IconBell>
                      </span>{' '}
                    </Indicator>
                    <VisuallyHidden>Notification</VisuallyHidden>
                  </span>
                </Button>
              </MenuTarget>
              <MenuDropdown
                style={{
                  backgroundColor: '#1e3a8a',
                  border: 'none',
                  color: 'white',
                  padding: '0.5rem 0.5rem ',
                }}
              >
                <div>Notifications</div>
                <Divider></Divider>
                <HeaderNotification
                  notifications={notifications}
                ></HeaderNotification>
              </MenuDropdown>
            </Menu>
          </div>
        </div>
        <DropDownMenu items={data}></DropDownMenu>
      </header>
      <AppShell.Navbar
        py="md"
        px={4}
        className="text-textPrimary bg-primary font-display"
        zIndex={999}
      >
        <div>
          {' '}
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="md"
            size="md"
            color="white"
          />
        </div>
        <div className="flex justify-center">
          <Link href={'/'}>
            <Image
              height={30}
              width={186}
              src={'/toolsmandu-light.png'}
              alt="Toolsmandu Logo"
            />
          </Link>
        </div>
        <Sidebar items={data}></Sidebar>
      </AppShell.Navbar>
      <AppShellMain>
        <NextNProgress height={4} />
        {children}
        <div className="hs-dropdown fixed bottom-10 right-10 z-50">
          <a
            target="_blank"
            href="https://api.whatsapp.com/send/?phone=9779864484274&text&type=phone_number&app_absent=0"
          >
            <Image
              src={'/whatsapp.svg'}
              alt="Toolsmandu Logo"
              width={50}
              height={50}
            ></Image>
          </a>
        </div>
      </AppShellMain>
      <div className="xs:mt-4  md:mt-[4rem]">
        <Divider></Divider>
        <Footer></Footer>
      </div>
    </AppShell>
  );
}
