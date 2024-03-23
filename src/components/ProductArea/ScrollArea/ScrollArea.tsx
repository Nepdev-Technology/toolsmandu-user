'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { FeaturedCategory } from '@/src/types/interfaces/ProductInterface';
import { Box, ScrollArea } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from '../../Cards/ProductCard';
import ProductCategoryHeader from '../../heading/ProductCategoryHeader';
import Loading from './loading';

const ProductScrollArea = () => {
  const [featuredCategory, setFeaturedCategory] = useState<
    FeaturedCategory[] | undefined
  >(undefined);
  const getData = async () => {
    const http = new HttpService();
    const response: any = await http.service().get(apiRoutes.products.featured);
    const transformedData = response?.data?.map(
      (category: FeaturedCategory) => {
        category.products.map((products) => {
          let lowestMRP = Infinity;
          let lowestSP = Infinity;
          products?.variations.map((variation) => {
            if (variation.sellingPrice < lowestSP) {
              lowestSP = variation.sellingPrice;
              lowestMRP = variation.maximumRetailPrice;
            }
          });
          products.sellingPrice = lowestSP;
          products.maximumRetailPrice = lowestMRP;
          return products;
        });
        return category;
      }
    );
    setFeaturedCategory(transformedData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" md:ml-10">
      {featuredCategory ? (
        featuredCategory.map((category) => {
          return (
            <div key={category.id}>
              <ProductCategoryHeader id={category.id} title={category.name} />
              <ScrollArea scrollbars="x" type="never" key={category.id}>
                <Box className="flex gap-3 overflow-hidden ">
                  {category.products.map((product) => {
                    return (
                      <div key={product.id}>
                        <Link href={`${product.id}`}>
                          <ProductCard
                            id={product.id}
                            name={product.name}
                            imageUrl={product.image}
                            imageAlt="PUBG"
                            maximumRetailPrice={product.maximumRetailPrice}
                            sellingPrice={product.sellingPrice}
                            label={product.name}
                            metaTitle={product.metaTitle}
                            metaDescription={product.metaDescription}
                            metaKeywords={product.metaKeywords}
                          />
                        </Link>
                      </div>
                    );
                  })}
                </Box>
              </ScrollArea>
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProductScrollArea;
