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
  Group,
  Indicator,
  Menu,
  MenuDropdown,
  MenuTarget,
  VisuallyHidden,
} from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { IconBell, IconHelp, IconUser } from '@tabler/icons-react';
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
  const pinned = useHeadroom({ fixedAt: 120 });
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
        breakpoint: 'sm',
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
            hiddenFrom="sm"
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
          <Group ml="xl" gap={4} visibleFrom="sm">
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
        {!pinned && (
          <div className="hs-dropdown fixed bottom-10 right-10 z-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              fill="currentColor"
              className="bi bi-whatsapp text-green-500  "
              viewBox="0 0 16 16"
            >
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
          </div>
        )}
      </AppShellMain>
      <div className="xs:mt-4  md:mt-[4rem]">
        <Divider></Divider>
        <Footer></Footer>
      </div>
    </AppShell>
  );
}
