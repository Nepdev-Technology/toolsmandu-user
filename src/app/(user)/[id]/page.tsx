import CheckoutForm from '@/src/components/CheckoutForm/CheckoutForm';
import CustomAccordion from '@/src/components/CustomAccordion/CustomAccordion';
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
} from '@mantine/core';
import { IconCategory, IconLock } from '@tabler/icons-react';

const getTableData = async (id: string) => {
  const http = new HttpService();
  const response: any = await http
    .service()
    .get(`${apiRoutes.products.base}/${id}`, {
      next: {
        cache: 'no-store',
      },
    });
  const data = response.data;
  return data;
};
const page = async ({ params }: { params: { id: string } }) => {
  const productData: Product = await getTableData(params.id);
  return (
    <section className="relative bottom-1 text-textSecondary">
      <div className="absolute z-0 ">
        <Image
          className="md:h-[25vh] xs:h-[10vh]  sm:h-[15vh] w-[100vw] bg-blend-darken brightness-50 blur-md drop-shadow-2xl backdrop-brightness-25          "
          src={process.env.NEXT_PUBLIC_IMAGE_URL + productData.backgorundImage}
          radius="sm"
        ></Image>
      </div>
      <div className=" pr-3 md:pr-6 lg:pr-10  xs:pl-5 sm:pl-10 md:pl-24  ">
        <div className="grid md:grid-cols-3 md:grid-rows-3 gap-1 grid-auto-rows-auto md:pt-[20vh] sm:pt-[10vh] xs:pt-[7vh] ">
          <div className=" col-span-2">
            <Grid align={'center'} justify="start">
              <GridCol span={4}>
                <AspectRatio
                  ratio={240 / 347}
                  maw={{ md: 250, sm: 200, xs: 180 }}
                >
                  <img
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + productData.image}
                    alt="Panda"
                  />
                </AspectRatio>
              </GridCol>
              <GridCol span={8}>
                <div>
                  <h1 className="sm:text-2xl xs:text-xl  md:text-3xl  font-bold text-textSecondary">
                    {' '}
                    {productData.name}
                  </h1>
                  <Divider my="lg" />
                  <Group>
                    <span className="flex items-center gap-2">
                      <IconCategory className="text-iconSecondary "></IconCategory>
                      {productData.categories.map((item) => {
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
                      <span className="text-textSecondary">Key</span>
                    </span>
                  </Group>
                </div>
              </GridCol>
            </Grid>
          </div>
          <div className=" row-span-2  ">
            <CheckoutForm
              variations={productData.variations}
              dynamicVariables={productData.dynamicVariables}
            ></CheckoutForm>
          </div>
          <div className="col-span-2 ">
            <article className="text-textSecondary">
              {productData.summary}
            </article>
            <CustomAccordion faqs={productData.faqs}></CustomAccordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
