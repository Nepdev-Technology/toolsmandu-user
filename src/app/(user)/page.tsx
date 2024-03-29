import ProductCard from '@/src/components/Cards/ProductCard';
import HomePageCarousel from '@/src/components/Carousel/HomePageCarousel';
import ProductCategoryHeader from '@/src/components/heading/ProductCategoryHeader';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { FeaturedCategory } from '@/src/types/interfaces/ProductInterface';
import '@mantine/carousel/styles.css';
import { Box, ScrollArea } from '@mantine/core';
import '@mantine/core/styles.css';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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
    return transformedData;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      // Redirect to the maintenance page
      redirect('/maintainance');
    }
  }
};

export default async function Home() {
  const featuredCategory: FeaturedCategory[] = await getProducts();

  return (
    <section className="px-3 sm:px-[4rem] md:px-[10rem] ">
      <HomePageCarousel></HomePageCarousel>
      <div className=" md:ml-10">
        {featuredCategory &&
          featuredCategory.map((category) => {
            return (
              <div key={category.id}>
                <ProductCategoryHeader id={category.id} title={category.name} />
                <ScrollArea scrollbars="x" type="never" key={category.id}>
                  <Box className="flex gap-3 overflow-hidden py-0 ">
                    {category.products.map((product) => {
                      return (
                        <div key={product.id}>
                          <Link href={`${product.id}`}>
                            <ProductCard
                              id={product.id}
                              name={product.name}
                              imageUrl={product.image}
                              offerTitle={product.offerTitle}
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
          })}
      </div>
    </section>
  );
}
