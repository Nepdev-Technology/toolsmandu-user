import ProductCardForSearch from '@/src/components/Cards/ProductCardForSearch';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Product } from '@/src/types/interfaces/ProductInterface';
import { Box } from '@mantine/core';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const getTableData = async (query: string, category: string) => {
  const http = new HttpService();

  try {
    const payload = {
      name: query,
      category,
    };
    const response: any = await http
      .service()
      .push(`${apiRoutes.products.search}`, payload);

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

    console.log(transformedData);
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
  searchParams: { query: string; category: string };
}) => {
  const productData: Product[] = await getTableData(
    searchParams.query,
    searchParams.category
  );
  return (
    <>
      {productData && productData.length >= 1 ? (
        <section className="relative bottom-1 text-textPrimary  ">
          <Box className="flex gap-4 flex-wrap mt-2 xs:px-[10px] sm:px-[2rem] justify-start">
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
