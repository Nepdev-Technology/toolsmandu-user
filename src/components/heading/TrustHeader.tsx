import { Container, Divider, Group } from '@mantine/core';
import { IconBrandWhatsapp, IconLock, IconMailFast } from '@tabler/icons-react';

const TrustHeader = () => {
  return (
    <Container
      className="bg-gradient-to-r from-primary to-secondary py-3"
      fluid
      visibleFrom="sm"
      px={{ xs: 20, sm: 50, md: 120 }}
    >
      <Group>
        <span className="flex justify-center gap-1 items-center text-sm">
          {' '}
          <IconLock size={15}></IconLock>
          100% SAFE & SECURED
        </span>
        <Divider orientation="vertical" />
        <span className="flex justify-center gap-1 items-center text-sm">
          {' '}
          <IconBrandWhatsapp size={15}></IconBrandWhatsapp>
          24/7 LIVE SUPPORT
        </span>
        <Divider orientation="vertical" />
        <span className="flex justify-center gap-1 items-center text-sm">
          <IconMailFast size={20}></IconMailFast>
          INSTANT DELIVERY
        </span>
      </Group>
    </Container>
  );
};

export default TrustHeader;
