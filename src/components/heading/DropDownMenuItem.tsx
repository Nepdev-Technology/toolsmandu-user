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
      <MenuTarget>
        <Text className="flex justify-center items-center">
          {category} <IconChevronDown></IconChevronDown>
        </Text>
      </MenuTarget>

      <MenuDropdown>
        {products.map((product) => (
          <Link href={product.url} key={product.name}>
            <Menu.Item>{product.name}</Menu.Item>
          </Link>
        ))}
      </MenuDropdown>
    </Menu>
  );
};

export default DropDownMenuItem;
