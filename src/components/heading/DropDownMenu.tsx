import { Container, Flex, Loader } from '@mantine/core';
import DropDownMenuItem, { IDropDownMenuItemProps } from './DropDownMenuItem';

const DropDownMenu = ({ items }: { items: IDropDownMenuItemProps[] }) => {
  return (
    <Container className="bg-tertiary py-[0.6rem]" fluid visibleFrom="sm">
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
          <>
            {/* {[1, 2, 3, 4, 5].map((item) => {
              return <Skeleton height={20} width={100} />;
            })} */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
              return <Loader key={item} color="blue" type="dots" />;
            })}
          </>
        )}
      </Flex>
    </Container>
  );
};

export default DropDownMenu;
