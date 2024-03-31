import ProductCardForSearch from '@/src/components/Cards/ProductCardForSearch';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Product } from '@/src/types/interfaces/ProductInterface';
import { Box } from '@mantine/core';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const getTableData = async (query: string) => {
  const http = new HttpService();
  try {
    const response: any = await http
      .service()
      .get(`${apiRoutes.products.search}/${query}`, {
        next: {
          cache: 'no-store',
        },
      });
    const data = response.data;
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      // Redirect to the maintenance page
      redirect('/maintainance');
    }
  }
};
const page = async ({ searchParams }: { searchParams: { query: string } }) => {
  const productData: Product[] = await getTableData(searchParams.query);
  return (
    <>
      {productData && productData.length >= 1 ? (
        <section className="relative bottom-1 text-textPrimary">
          <Box className="flex gap-4 flex-wrap mt-2 justify-center">
            {[
              ...productData,
              ...productData,
              ...productData,
              ...productData,
              ...productData,
              ...productData,
              ...productData,
              ...productData,
            ].map((product) => {
              return (
                <div key={product.id}>
                  <Link href={`${product.id}`} className="py-0">
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
