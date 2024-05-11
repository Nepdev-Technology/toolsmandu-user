'use client';
import { useLogout } from '@/src/hooks/auth/useLogout';
import { showSuccessNotification } from '@/src/utils/notificationUtils';
import { Button, Container, Flex } from '@mantine/core';
import {
  IconBrandWhatsapp,
  IconList,
  IconLockAccess,
  IconLogout,
  IconTicket,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ProfileHeader = () => {
  const logout = useLogout();
  const router = useRouter();
  const handleLogout = () => {
    logout.logout();
    showSuccessNotification('Logged out successfully');
    router.push('/login');
    router.refresh();
  };
  return (
    <Container className="bg-primary py-2" fluid>
      <Flex justify={'center'} gap={{ sm: 10, md: 20, lg: 30 }} wrap={'wrap'}>
        <Link href="/profile">
          <Button
            variant="transparent"
            className="text-textPrimary"
            leftSection={<IconUser />}
          >
            Profile
          </Button>
        </Link>
        <Link href="/profile/security">
          <Button
            variant="transparent"
            className="text-textPrimary"
            leftSection={<IconLockAccess />}
          >
            Security
          </Button>
        </Link>
        <Link href="/profile/orders">
          <Button
            variant="transparent"
            className="text-textPrimary"
            leftSection={<IconList />}
          >
            Orders
          </Button>
        </Link>
        <Link href="/profile/familySharing">
          <Button
            variant="transparent"
            className="text-textPrimary"
            leftSection={<IconUsersGroup />}
          >
            Family Sharing
          </Button>
        </Link>
        <Link href={'/profile/tickets'}>
          {' '}
          <Button
            variant="transparent"
            className="text-textPrimary"
            leftSection={<IconTicket />}
          >
            Support Center
          </Button>
        </Link>
        <Button
          variant="transparent"
          className="text-textPrimary"
          leftSection={<IconLogout />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Flex>
    </Container>
  );
};

export default ProfileHeader;
