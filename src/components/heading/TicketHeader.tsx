'use client';
import { useLogout } from '@/src/hooks/auth/useLogout';
import { showSuccessNotification } from '@/src/utils/notificationUtils';
import { Button, Container, Flex } from '@mantine/core';
import {
  IconExclamationCircle,
  IconList,
  IconLocation,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TicketHeader = () => {
  const logout = useLogout();
  const router = useRouter();
  const handleLogout = () => {
    logout.logout();
    showSuccessNotification('Logged out successfully');
    router.push('/login');
  };
  return (
    <Container className="bg-primary py-2" fluid>
      <Flex justify={'center'} gap={{ sm: 10, md: 20, lg: 10 }}>
        <Link href="/profile/tickets">
          <Button
            variant="pills"
            className="text-textPrimary bg-tertiary"
            leftSection={<IconExclamationCircle />}
          >
            Create
          </Button>
        </Link>
        <Link href="/profile/tickets/track">
          <Button
            variant="pills"
            className="text-textPrimary bg-tertiary"
            leftSection={<IconLocation />}
          >
            Track
          </Button>
        </Link>
        <Link href="/profile/tickets/all">
          <Button
            variant="pills"
            className="text-textPrimary bg-tertiary"
            leftSection={<IconList />}
          >
            Your tickets
          </Button>
        </Link>
      </Flex>
    </Container>
  );
};

export default TicketHeader;
