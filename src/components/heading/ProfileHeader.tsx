'use client';
import { useLogout } from '@/src/hooks/auth/useLogout';
import { showSuccessNotification } from '@/src/utils/notificationUtils';
import { Button, Container, Flex } from '@mantine/core';
import {
  IconList,
  IconLockAccess,
  IconLogout,
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
  };
  return (
    <Container className="bg-primary py-2" fluid visibleFrom="sm">
      <Flex justify={'center'} gap={{ sm: 10, md: 20, lg: 30 }}>
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
