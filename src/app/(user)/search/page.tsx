import ProductCardForSearch from '@/src/components/Cards/ProductCardForSearch';
import CustomPagination from '@/src/components/mantine/pagination/Pagination';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Product } from '@/src/types/interfaces/ProductInterface';
import { Box, Title } from '@mantine/core';
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
    console.log(response);
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
const page = async ({
  searchParams,
}: {
  searchParams: {
    query: string;
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
      <div>
        <div className="bg-primary px-2 py-1 rounded-md flex justify-center xs:mb-3 sm:my-5 lg:my-8">
          <Title order={1} className="  text-textPrimary">
            Search result for {searchParams.query}
          </Title>
        </div>
      </div>
      {productData && productData.length >= 1 ? (
        <section>
          <Box className="flex gap-4 flex-wrap mt-2 xs:px-[10px] sm:px-[2rem] justify-center">
            {[...productData].map((product) => {
              return (
                <div key={product.id}>
                  <Link href={`item/${product.slug}`} className="py-0">
                    <ProductCardForSearch
                      id={product.id}
                      name={product.name}
                      imageUrl={product.image}
                      offerTitle={product.offerTitle}
                      imageAlt={product.name}
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
          {productData.length >= 15 && (
            <div className="mt-4 ml-10">
              <CustomPagination totalPages={productData.length} />
            </div>
          )}
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
