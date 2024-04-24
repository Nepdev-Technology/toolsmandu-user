'use client';
import { Container, Flex } from '@mantine/core';
import DropDownMenuItem, { IDropDownMenuItemProps } from './DropDownMenuItem';

const DropDownMenu = ({ items }: { items: IDropDownMenuItemProps[] }) => {
  return (
    <Container className="bg-tertiary py-2" fluid visibleFrom="sm">
      <Flex justify={'center'} gap={{ sm: 10, md: 20, lg: 30 }}>
        {items.map((item) => (
          <DropDownMenuItem
            key={item.category}
            category={item.category}
            products={item.products}
          ></DropDownMenuItem>
        ))}
      </Flex>
    </Container>
  );
};

export default DropDownMenu;
