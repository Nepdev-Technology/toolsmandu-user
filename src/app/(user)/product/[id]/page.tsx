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
  Tooltip,
} from '@mantine/core';
import {
  IconCategory,
  IconClock,
  IconLock,
  IconWorld,
} from '@tabler/icons-react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import classes from './Demo.module.css';

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
    if (response.status == 404) {
      redirect('/404');
    }
    const data = response.data;
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      // Redirect to the maintenance page
      redirect('/maintainance');
    }
  }
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product: Product = await getTableData(params.id);
  if (!product) {
    return {
      title: '404- Not found',
    };
  }
  const {
    id,
    name,
    image,
    backgorundImage,
    metaTitle,
    metaDescription,
    metaKeywords,
  } = product;

  return {
    title: name,
    description: metaDescription,
    keywords: metaKeywords,
    openGraph: {
      url: `/${id}`,
      title: metaTitle || name,
      description: metaDescription,
      images: [image, backgorundImage],
    },
  };
}
const page = async ({ params }: { params: { id: string } }) => {
  const productData: Product = await getTableData(params.id);
  if (!productData) {
    redirect('/404');
  }
  return (
    <>
      {productData && (
        <section className="relative bottom-2 text-textPrimary ">
          <div className="absolute z-0 ">
            <Image
              className="md:h-[25vh] xs:h-[10vh] sm:h-[15vh] w-[100vw] rounded-2xl relative "
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL + productData.backgorundImage
              }
              alt="Panda"
            ></Image>

            <div className="absolute inset-0 bg-gradient-to-t  from-primary from-2%" />
          </div>
          <div className="px-3 xs:px-[auto] sm:px-[2rem] md:px-[5rem] lg:px-[10rem]    ">
            <div className="grid xs:grid-cols-1  md:grid-cols-3 sm:grid-rows-[repeat(3,auto)] md:gap-[1rem]  md:pt-[20vh] sm:pt-[10vh] xs:pt-[7vh] gap-y-4 ">
              <div className="xs:col-span-full  sm:col-span-2  ">
                <Grid align={'center'} justify="start">
                  <GridCol span={2.9}>
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
                      {/* <Divider my="lg" /> */}
                      <Group>
                        <Tooltip label="Category">
                          <span className="flex items-center gap-2">
                            <IconCategory className="text-iconSecondary "></IconCategory>
                            {productData?.categories?.map((item) => {
                              return (
                                <Badge
                                  key={item.id}
                                  // size="xl"
                                  variant="gradient"
                                  gradient={{
                                    from: 'blue',
                                    to: 'cyan',
                                    deg: 90,
                                  }}
                                >
                                  {item.name}
                                </Badge>
                              );
                            })}
                          </span>
                        </Tooltip>
                        {/* <Divider orientation="vertical" /> */}
                        <Tooltip label="Type">
                          <span className="flex items-center  gap-2 ">
                            <IconLock className="text-iconTertiary "></IconLock>
                            <Badge
                              variant="gradient"
                              gradient={{
                                from: 'blue',
                                to: 'cyan',
                                deg: 90,
                              }}
                            >
                              {productData.type}
                            </Badge>
                          </span>
                        </Tooltip>
                        {/* <Divider orientation="vertical" /> */}
                        <Tooltip label="Region">
                          <span className="flex items-center gap-2 ">
                            <IconWorld className="text-iconTertiary "></IconWorld>
                            <Badge
                              variant="gradient"
                              gradient={{
                                from: 'blue',
                                to: 'cyan',
                                deg: 90,
                              }}
                            >
                              {productData.region}
                            </Badge>
                          </span>
                        </Tooltip>
                        <Tooltip label="Delivery time">
                          <span className="flex items-center gap-2 ">
                            <IconClock className="text-iconTertiary "></IconClock>

                            <Badge
                              variant="gradient"
                              gradient={{
                                from: 'blue',
                                to: 'cyan',
                                deg: 90,
                              }}
                            >
                              {productData.deliveryTime}
                            </Badge>
                          </span>
                        </Tooltip>
                      </Group>
                    </div>
                  </GridCol>
                </Grid>
              </div>
              <div className="xs:col-span-full sm:col-span-1 sm:row-span-2  h-full ">
                <CheckoutForm
                  image={productData.image}
                  variations={productData.variations}
                  dynamicVariables={productData.dynamicVariables}
                ></CheckoutForm>
              </div>
              <div className="xs:col-span-full sm:row-span-3 sm:col-span-2">
                <div
                  dangerouslySetInnerHTML={{
                    __html: productData.summary,
                  }}
                />
              </div>
            </div>
            {/* <div className="my-4">
              {' '}
                <h1 className="sm:text-2xl xs:text-xl xs:mt-[2rem]  md:text-3xl  font-bold ">
                <h1 className="sm:text-2xl xs:text-xl xs:mt-[2rem]  md:text-3xl  font-bold ">
                  {' '}
              <h1 className="sm:text-2xl xs:text-xl xs:mt-[2rem]  md:text-3xl  font-bold ">
                  {' '}
                {'Frequently Asked Questions'}
              </h1>
              <CustomAccordion faqs={productData.faqs}></CustomAccordion>
            </div> */}
            <div className=" ">
              <article className="text-textPrimary my-4">
                <h1 className="sm:text-2xl xs:text-xl xs:my-[2rem]  md:text-3xl  font-bold ">
                  Queries
                </h1>
                <Tabs
                  defaultValue="faq"
                  variant="unstyled"
                  classNames={classes}
                >
                  <TabsList className="mb-2" grow>
                    <TabsTab value="faq">FAQs</TabsTab>
                    <TabsTab value="rating">Rating & Reviews</TabsTab>
                    <TabsTab value="qAndA">Question & Answers</TabsTab>
                  </TabsList>
                  <TabsPanel value="faq">
                    <div className="mt-8">
                      <CustomAccordion
                        title={productData.name}
                        faqs={productData.faqs}
                      ></CustomAccordion>
                    </div>{' '}
                  </TabsPanel>
                  <TabsPanel value="rating">
                    <div className="mt-8">
                      <Review name={productData.name} id={params.id}></Review>
                    </div>{' '}
                  </TabsPanel>

                  <TabsPanel value="qAndA">
                    <div className="mt-8">
                      <QandA name={productData.name} id={params.id}></QandA>{' '}
                    </div>{' '}
                  </TabsPanel>
                </Tabs>
              </article>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default page;
