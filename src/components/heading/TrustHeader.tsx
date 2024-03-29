import { Container, Divider, Group } from '@mantine/core';
import { IconClock24, IconClockBolt, IconWorldStar } from '@tabler/icons-react';

const TrustHeader = () => {
  return (
    <Container
      className="bg-gradient-to-r from-primary to-secondary py-1"
      fluid
      visibleFrom="sm"
      px={{ xs: 20, sm: 50, md: 200 }}
    >
      <Group>
        <span className="flex justify-center items-center text-sm">
          {' '}
          <IconWorldStar size={12}></IconWorldStar>
          100% SAFETY GUARANTEE
        </span>
        <Divider orientation="vertical" />
        <span className="flex justify-center items-center text-sm">
          {' '}
          <IconClock24 size={12}></IconClock24>
          24/7 LIVE SUPPORT
        </span>
        <Divider orientation="vertical" />
        <span className="flex justify-center items-center text-sm">
          {' '}
          <IconClockBolt size={15}></IconClockBolt>
          INSTANT DELIVERY
        </span>
      </Group>
    </Container>
  );
};

export default TrustHeader;
