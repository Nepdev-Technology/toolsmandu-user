import { NavLink } from '@mantine/core';

export interface ProductCategoryHeaderProps {
  url: string;
  name: string;
}
export interface IDropDownMenuItemProps {
  category: string;
  slug: string;
  products: ProductCategoryHeaderProps[];
}
const SidebarItem = ({ category, products, slug }: IDropDownMenuItemProps) => {
  return (
    <NavLink
      label={category.toUpperCase()}
      childrenOffset={28}
      href={`/item-category/${slug}`}
      className="hover:bg-primary font-bold"
    ></NavLink>
  );
};

export default SidebarItem;
