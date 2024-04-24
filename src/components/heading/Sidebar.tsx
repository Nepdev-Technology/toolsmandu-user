'use client';
import { IDropDownMenuItemProps } from './DropDownMenuItem';
import SidebarItem from './SidebarItem';

const Sidebar = ({ items }: { items: IDropDownMenuItemProps[] }) => {
  return (
    <div className="flex flex-col items-start ml-2">
      {items.map((item) => (
        <SidebarItem
          key={item.category}
          category={item.category}
          products={item.products}
        ></SidebarItem>
      ))}
    </div>
  );
};

export default Sidebar;
