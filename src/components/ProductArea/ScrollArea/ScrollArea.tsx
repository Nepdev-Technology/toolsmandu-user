'use client';
import { Box, ScrollArea } from '@mantine/core';
import { useState } from 'react';
import ProductCard from '../../Cards/ProductCard';
import ProductCategoryHeader from '../../heading/ProductCategoryHeader';

interface Product {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
  isActive: boolean;
  name: string;
  subName: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  image: string;
  featured: boolean;
  featuredInNavbar: boolean;
  backgorundImage: string; // Note: There's a typo in the key name "backgorundImage", should be "backgroundImage"
  maximumRetailPrice: number;
  sellingPrice: number;
}

interface FeaturedCategory {
  id: number;
  metaTitle: string;
  metaKeywords: string;
  featured: boolean;
  featuredInNavBar: boolean;
  metaDescription: string;
  name: string;
  description: string | null;
  products: Product[];
}

const ProductScrollArea = () => {
  const [featuredCategory, setFeaturedCategory] = useState<
    FeaturedCategory[] | undefined
  >(undefined);

  return (
    <div className=" md:ml-10">
      {featuredCategory &&
        featuredCategory.map((category) => {
          return (
            <>
              {' '}
              <ProductCategoryHeader
                title={category.name}
              ></ProductCategoryHeader>
              <ScrollArea scrollbars="x" type="never" key={category.id}>
                <Box className="flex gap-3 overflow-hidden ">
                  {category.products.map((product, index) => {
                    return (
                      <ProductCard
                        key={index}
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
                    );
                  })}
                </Box>
              </ScrollArea>
            </>
          );
        })}
    </div>
  );
};

export default ProductScrollArea;
