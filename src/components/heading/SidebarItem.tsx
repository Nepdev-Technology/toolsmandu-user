import { NavLink } from '@mantine/core';

export interface ProductCategoryHeaderProps {
  url: string;
  name: string;
}
export interface IDropDownMenuItemProps {
  category: string;
  products: ProductCategoryHeaderProps[];
}
const SidebarItem = ({ category, products }: IDropDownMenuItemProps) => {
  return (
    <NavLink
      label={category}
      childrenOffset={28}
      href="#required-for-focus"
      className="hover:bg-primary"
    >
      {products.map((product) => (
        <NavLink
          key={product.name}
          label={product.name}
          href={product.url}
          className="hover:bg-primary"
        />
      ))}
    </NavLink>
  );
};

export default SidebarItem;
