import CheckoutForm from '@/src/components/CheckoutForm/CheckoutForm';
import CustomAccordion from '@/src/components/CustomAccordion/CustomAccordion';
import QandA from '@/src/components/QandA/QandA';
import Review from '@/src/components/Review.tsx/page';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Product } from '@/src/types/interfaces/ProductInterface';
import {
  AspectRatio,
  Badge,
  Divider,
  Grid,
  GridCol,
  Group,
  Image,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from '@mantine/core';
import { IconCategory, IconLock } from '@tabler/icons-react';
import { redirect } from 'next/navigation';

const getTableData = async (id: string) => {
  const http = new HttpService();
  try {
    const response: any = await http
      .service()
      .get(`${apiRoutes.products.base}/${id}`, {
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
const page = async ({ params }: { params: { id: string } }) => {
  const productData: Product = await getTableData(params.id);
  return (
    <>
      {productData && (
        <section className="relative bottom-1 text-textPrimary">
          <div className="absolute z-0 ">
            <Image
              className="md:h-[25vh] xs:h-[10vh]  sm:h-[15vh] w-[100vw] bg-blend-darken brightness-50 blur-sm drop-shadow-2xl backdrop-brightness-25          "
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL + productData.backgorundImage
              }
              radius="sm"
            ></Image>
          </div>
          <div className="   xs:px-5 sm:px-10 md:px-20  ">
            <div className="grid xs:grid-cols-1  md:grid-cols-2 md:grid-rows-4 md:gap-[1rem]  md:pt-[20vh] sm:pt-[10vh] xs:pt-[7vh] gap-y-4 ">
              <div className="xs:col-span-full  sm:col-span-1 ">
                <Grid align={'center'} justify="start">
                  <GridCol span={4}>
                    <AspectRatio
                      ratio={240 / 347}
                      maw={{ md: 250, sm: 200, xs: 180 }}
                    >
                      <img
                        src={
                          process.env.NEXT_PUBLIC_IMAGE_URL + productData.image
                        }
                        alt="Panda"
                      />
                    </AspectRatio>
                  </GridCol>
                  <GridCol span={8}>
                    <div>
                      <h1 className="sm:text-2xl xs:text-xl xs:mt-[2rem]  md:text-3xl  font-bold ">
                        {' '}
                        {productData.name}
                      </h1>
                      <Divider my="lg" />
                      <Group>
                        <span className="flex items-center gap-2">
                          <IconCategory className="text-iconSecondary "></IconCategory>
                          {productData?.categories?.map((item) => {
                            return (
                              <Badge
                                key={item.id}
                                // size="xl"
                                variant="gradient"
                                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                              >
                                {item.name}
                              </Badge>
                            );
                          })}
                        </span>
                        <Divider orientation="vertical" />
                        <span className="flex items-center ">
                          <IconLock className="text-iconTertiary"></IconLock>
                          <span className="text-textPrimary">Key</span>
                        </span>
                      </Group>
                    </div>
                  </GridCol>
                </Grid>
              </div>
              <div className="xs:col-span-full sm:col-span-1 md:row-span-2  h-full xs:mt-2 sm:mt-10 md:mt-16">
                <CheckoutForm
                  variations={productData.variations}
                  dynamicVariables={productData.dynamicVariables}
                ></CheckoutForm>
              </div>
              <div className="xs:col-span-full sm:row-span-1 sm:col-span-1">
                <div
                  dangerouslySetInnerHTML={{
                    __html: productData.summary,
                  }}
                />
                <CustomAccordion faqs={productData.faqs}></CustomAccordion>
              </div>
              <div className="xs:col-span-full sm:row-span-2 ">
                <article className="text-textPrimary">
                  <Tabs defaultValue="rating">
                    <TabsList className="mb-2" grow>
                      <TabsTab value="rating" className="hover:bg-secondary">
                        Rating and Reviews
                      </TabsTab>
                      <TabsTab value="qAndA" className="hover:bg-secondary">
                        Q&A
                      </TabsTab>
                    </TabsList>
                    <TabsPanel value="rating">
                      <Review name={productData.name}></Review>
                    </TabsPanel>

                    <TabsPanel value="qAndA">
                      <QandA name={productData.name}></QandA>{' '}
                    </TabsPanel>
                  </Tabs>
                </article>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default page;
