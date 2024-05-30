import { Container, Flex, Loader } from '@mantine/core';
import DropDownMenuItem, { IDropDownMenuItemProps } from './DropDownMenuItem';

const DropDownMenu = ({ items }: { items: IDropDownMenuItemProps[] }) => {
  return (
    <Container className="bg-tertiary py-[0.6rem]" fluid visibleFrom="lg">
      <Flex justify={'center'} gap={{ sm: 10, md: 20, lg: 30 }}>
        {items.length >= 1 ? (
          items.map((item) => (
            <div key={item.category}>
              <DropDownMenuItem
                key={item.category}
                category={item.category}
                products={item.products}
              ></DropDownMenuItem>
            </div>
          ))
        ) : (
          <></>
        )}
      </Flex>
    </Container>
  );
};

export default DropDownMenu;
