'use client';
import { Box, ScrollArea } from '@mantine/core';
import ProductCard from '../../Cards/ProductCard';
import ProductCategoryHeader from '../../heading/ProductCategoryHeader';

const ProductScrollArea = () => {
  const data = [
    {
      title: 'Giftcards title',
      products: [
        {
          name: 'iTunes',
          imageUrl:
            'https://cdn5.mtcgame.com/Images/SC-GiftCard/17a4251d-11cb-44f7-89de-ffe154893964.jpg',
          imageAlt: 'iTunes',
          maximumRetailPrice: 100,
          sellingPrice: 90,
          label: 'SALE',
        },
        {
          name: 'Netflix',
          imageUrl:
            'https://cdn5.mtcgame.com/Images/SC-GiftCard/4841fc45-0c2c-44b1-9a09-057c8d1db48f.jpg',
          imageAlt: 'Netflix',
          maximumRetailPrice: 50,
          sellingPrice: 45,
          label: 'BRAND',
        },
        {
          name: 'Google',
          imageUrl:
            'https://cdn5.mtcgame.com/Images/SC-GiftCard/ce9ee34e-928d-4df4-9646-1bef05cd858d.jpg',
          imageAlt: 'Google',
          maximumRetailPrice: 200,
          sellingPrice: 190,
          label: 'OFFER',
        },
        {
          name: 'Steam',
          imageUrl:
            'https://cdn5.mtcgame.com/Images/SC-GiftCard/ef372c6f-398c-49e7-8c1a-e2146b8b04a1.jpg',
          imageAlt: 'Steam',
          maximumRetailPrice: 300,
          sellingPrice: 280,
          label: 'SALE',
        },
        {
          name: 'Xbox',
          imageUrl:
            'https://cdn5.mtcgame.com/Images/SC-GiftCard/d7e5f4a9-b11b-4fb7-b17d-a6959c4412b8.jpg',
          imageAlt: 'Xbox',
          maximumRetailPrice: 150,
          sellingPrice: 135,
          label: 'NEW',
        },
        {
          name: 'Nintendo',
          imageUrl:
            'https://cdn5.mtcgame.com/Images/SC-GiftCard/1fc84b97-b481-4b2f-a1d9-1692bb81d798.jpg',
          imageAlt: 'Nintendo',
          maximumRetailPrice: 250,
          sellingPrice: 240,
          label: 'NEW',
        },
        {
          name: 'Spotify',
          imageUrl:
            'https://cdn5.mtcgame.com/Images/SC-GiftCard/07a650eb-6cde-4726-a093-82409252d6d9.jpg',
          imageAlt: 'Spotify',
          maximumRetailPrice: 80,
          sellingPrice: 70,
          label: 'SALE',
        },
      ],
    },
    {
      title: 'Category title',
      products: [
        {
          name: 'PUBG Mobile global index',
          imageUrl:
            'https://cdn5.mtcgame.com/Images/Category/890ab951-4fe2-475d-aaab-cbc01eac010b.jpg',
          imageAlt: 'PUBG Mobile',
          maximumRetailPrice: 200,
          sellingPrice: 190,
          label: 'SALE',
        },
        {
          name: 'Bigo Tv Live ( Global Code )',
          imageUrl:
            'https://cdn5.mtcgame.com/Images/Category/ecd4a24c-b96b-444b-bb60-8d4ff838d779.jpg',
          imageAlt: 'Bigo Tv Live ( Global Code )',
          maximumRetailPrice: 200,
          sellingPrice: 190,
          label: 'SALE',
        },
        {
          name: 'Free Fire',
          imageUrl:
            'https://cdn5.mtcgame.com/Images/Category/dfbdd215-1c45-4d7f-a9dc-32a9da275224.jpg',
          imageAlt: 'Free Fire',
          maximumRetailPrice: 200,
          sellingPrice: 190,
          label: 'NEW',
        },
        {
          name: 'Yalla Ludo Gift Cards',
          imageUrl:
            'https://cdn5.mtcgame.com/Images/Category/9be11c12-5220-4ace-a520-ffec97ce571b.jpg',
          imageAlt: 'Yalla Ludo Gift Cards',
          maximumRetailPrice: 200,
          sellingPrice: 190,
          label: 'NEW',
        },
        {
          name: 'Mobile Legends',
          imageUrl:
            'https://cdn5.mtcgame.com/Images/Category/010cd4ef-9f28-4627-abb2-b95a6d2b8ab0.jpg',
          imageAlt: 'Mobile Legends: Bang Bang',
          maximumRetailPrice: 200,
          sellingPrice: 190,
          label: 'NEW',
        },
        {
          name: 'Jawaker',
          imageUrl:
            'https://cdn5.mtcgame.com/Images/Category/06fcd117-e72c-408c-b849-f09286fc5571.jpg',
          imageAlt: 'Jawaker',
          maximumRetailPrice: 200,
          sellingPrice: 190,
          label: 'NEW',
        },
        {
          name: 'Honor of Kings',
          imageUrl:
            'https://cdn5.mtcgame.com/Images/Category/58b81c55-144c-4f17-8a72-ab233926f283.jpg',
          imageAlt: 'Honor of Kings',
          maximumRetailPrice: 200,
          sellingPrice: 190,
          label: 'SALE',
        },
      ],
    },
  ];

  return (
    <div className=" md:ml-10">
      {data.map((category) => {
        return (
          <>
            {' '}
            <ProductCategoryHeader
              title={category.title}
            ></ProductCategoryHeader>
            <ScrollArea scrollbars="x" type="never">
              <Box className="flex gap-3 overflow-hidden ">
                {category.products.map((item) => {
                  return (
                    <ProductCard
                      name={item.name}
                      imageUrl={item.imageUrl}
                      imageAlt={item.imageAlt}
                      maximumRetailPrice={item.maximumRetailPrice}
                      sellingPrice={item.sellingPrice}
                      label={item.label}
                      metaTitle="PUBG Mobile global index"
                      metaDescription="PUBG Mobile global index"
                      metaKeywords="PUBG Mobile global index"
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
