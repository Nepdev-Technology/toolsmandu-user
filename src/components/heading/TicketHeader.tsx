'use client';
import { useLogout } from '@/src/hooks/auth/useLogout';
import { showSuccessNotification } from '@/src/utils/notificationUtils';
import { Button, Container, Flex } from '@mantine/core';
import { IconExclamationCircle, IconLocation } from '@tabler/icons-react';
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
      <Flex justify={'center'} gap={{ sm: 10, md: 20, lg: 30 }}>
        <Link href="/tickets">
          <Button
            variant="transparent"
            className="text-textPrimary"
            leftSection={<IconExclamationCircle />}
          >
            Create
          </Button>
        </Link>
        <Link href="/tickets/track">
          <Button
            variant="transparent"
            className="text-textPrimary"
            leftSection={<IconLocation />}
          >
            Track
          </Button>
        </Link>
      </Flex>
    </Container>
  );
};

export default TicketHeader;
