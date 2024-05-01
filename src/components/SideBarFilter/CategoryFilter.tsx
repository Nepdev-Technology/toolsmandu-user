import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import {
  FeaturedCategory,
  Product,
} from '@/src/types/interfaces/ProductInterface';
import React, { useEffect } from 'react';
import SidebarCheckbox from '../Checkbox/SidebarCheckbox';
import { IDropDownMenuItemProps } from '../heading/DropDownMenuItem';

const CategoryFilter = () => {
  const [data, setData] = React.useState<IDropDownMenuItemProps[]>([]);

  const getProducts = async () => {
    const http = new HttpService();
    try {
      const response: any = await http
        .service()
        .get(apiRoutes.products.featured, {
          next: {
            cache: 'no-store',
          },
        });

      const dropdownMenuItems: IDropDownMenuItemProps[] = response.data.map(
        (category: FeaturedCategory) => ({
          category: category.name,
          products: category.products.map((product: Product) => ({
            url: `product/${product.id}`,
            name: product.name,
          })),
        })
      );

      setData(dropdownMenuItems);
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message.includes('fetch failed')
      ) {
        // Redirect to the maintenance page
        // redirect('/maintainance');
      }
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="flex gap-2 flex-col">
      {data.map((item) => {
        return (
          <SidebarCheckbox
            key={item.category}
            label={item.category}
            id={item.category}
          ></SidebarCheckbox>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
