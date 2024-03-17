'use client';
import { Container, Flex } from '@mantine/core';
import DropDownMenuItem from './DropDownMenuItem';

const DropDownMenu = () => {
  return (
    <Container className="bg-quaternary py-2" fluid visibleFrom="sm">
      <Flex justify={'center'} gap={{ sm: 10, md: 20, lg: 30 }}>
        <DropDownMenuItem></DropDownMenuItem>
        <DropDownMenuItem></DropDownMenuItem>
        <DropDownMenuItem></DropDownMenuItem>
        <DropDownMenuItem></DropDownMenuItem>
        <DropDownMenuItem></DropDownMenuItem>
      </Flex>
    </Container>
  );
};

export default DropDownMenu;
