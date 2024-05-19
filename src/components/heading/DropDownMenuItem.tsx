import { Menu, MenuDropdown, MenuTarget, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
export interface ProductCategoryHeaderProps {
  url: string;
  name: string;
}
export interface IDropDownMenuItemProps {
  category: string;
  products: ProductCategoryHeaderProps[];
}
const DropDownMenuItem = ({ category, products }: IDropDownMenuItemProps) => {
  return (
    <Menu shadow="md" width={200} trigger="hover">
      <Link href={`/category?category=${category}`}>
        <MenuTarget>
          <Text className="flex justify-center items-center font-bold">
            {category.toUpperCase()}
          </Text>
        </MenuTarget>
      </Link>
    </Menu>
  );
};

export default DropDownMenuItem;
