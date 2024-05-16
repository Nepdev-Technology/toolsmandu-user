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
      href={`/category?category=${category}`}
      className="hover:bg-primary"
    ></NavLink>
  );
};

export default SidebarItem;
