import ProductCardForSearch from '@/src/components/Cards/ProductCardForSearch';
import CustomPagination from '@/src/components/mantine/pagination/Pagination';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import {
  FeaturedCategory,
  Product,
} from '@/src/types/interfaces/ProductInterface';
import { Box, Divider, Title } from '@mantine/core';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const getTableData = async (
  query: string,
  category: string,
  page: string,
  limit: string
) => {
  const http = new HttpService();

  try {
    const payload = {
      name: query,
      category,
    };
    const response: any = await http
      .service()
      .push(
        `${apiRoutes.products.search}?page=${page}&limit=${limit ? limit : 10}`,
        payload
      );

    const transformedData = response?.data?.map((product: Product) => {
      let lowestMRP = Infinity;
      let lowestSP = Infinity;
      product?.variations.map((variation) => {
        if (variation.sellingPrice < lowestSP) {
          lowestSP = variation.sellingPrice;
          lowestMRP = variation.maximumRetailPrice;
        }
      });
      product.sellingPrice = lowestSP;
      product.maximumRetailPrice = lowestMRP;
      return product;
    });

    return transformedData;
  } catch (error) {
    console.log(error);
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      // Redirect to the maintenance page
      redirect('/maintainance');
    }
  }
};
export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    query: string;
    category: string;
    page: string;
    limit: string;
  };
}): Promise<Metadata> {
  const productData: Product[] = await getTableData(
    searchParams.query,
    searchParams.category,
    searchParams.page,
    searchParams.limit
  );
  if (!productData) {
    return {
      title: '404- Not found',
    };
  }
  const data = productData?.[0]?.categories?.filter(
    (item) => item.name === searchParams.category
  );
  if (!data) {
    return {
      title: '404- Not found',
    };
  }

  const { id, name, metaTitle, metaDescription, metaKeywords } = data[0];

  return {
    title: name,
    description: metaDescription,
    keywords: metaKeywords,
    openGraph: {
      url: `/${id}`,
      title: metaTitle || name,
      description: metaDescription,
    },
  };
}
const page = async ({
  searchParams,
}: {
  searchParams: {
    query: string;
    categoryId: string;
    category: string;
    page: string;
    limit: string;
  };
}) => {
  const productData: Product[] = await getTableData(
    searchParams.query,
    searchParams.category,
    searchParams.page,
    searchParams.limit
  );
  return (
    <>
      {productData && productData.length >= 1 ? (
        <section className="relative bottom-1 text-textPrimary  ">
          <div>
            <div className="bg-primary px-2 py-1 rounded-md flex justify-center xs:mb-3 sm:my-5 lg:my-8">
              <Title order={1} className="  text-textPrimary">
                {searchParams.category}
              </Title>
            </div>
          </div>
          <Box className="flex   gap-4 flex-wrap mt-2 xs:px-[10px] sm:px-[2rem] justify-center">
            {productData.map((product) => {
              return (
                <div key={product.id}>
                  <Link href={`product/${product.id}`} className="py-0">
                    <ProductCardForSearch
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
          <div className="mt-4 ml-10">
            <CustomPagination totalPages={productData.length} />
          </div>
        </section>
      ) : (
        <section className="relative bottom-1 text-textPrimary">
          <Box className="flex gap-4 flex-wrap mt-2 mx-10">
            No Products Found
          </Box>
        </section>
      )}
    </>
  );
};

export default page;
