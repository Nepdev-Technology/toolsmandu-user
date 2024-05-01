import WrapperSkeleton from '@/src/components/Skeleton/WrapperSkeleton';
import {
  Card,
  CardSection,
  Divider,
  Grid,
  GridCol,
  Group,
} from '@mantine/core';

const Loading = () => {
  return (
    <section className="relative bottom-1 bg-primary">
      <div className=" pr-3 md:pr-6 lg:pr-10  xs:pl-5 sm:pl-10 md:pl-24  ">
        <div className="grid xs:grid-cols-1  md:grid-cols-3 sm:grid-rows-[repeat(3,auto)] md:gap-[1rem]  md:pt-[20vh] sm:pt-[10vh] xs:pt-[7vh] gap-y-4 ">
          <div className="xs:col-span-full  sm:col-span-2">
            <Grid align={'center'} justify="start">
              <GridCol span={2}>
                <WrapperSkeleton width={130} height={200} />
              </GridCol>
              <GridCol span={4} className="xs:ml-20 sm:ml-5">
                <div>
                  <h1 className="sm:text-2xl xs:text-xl  md:text-3xl  font-bold ">
                    {' '}
                    <WrapperSkeleton
                      width={150}
                      height={50}
                      className="xs:ml-2 sm:ml-4"
                    />
                  </h1>
                  <Divider my="lg" />
                  <Group>
                    <span className="flex items-center gap-2">
                      <WrapperSkeleton height={25} circle mb="xl" />
                      <WrapperSkeleton height={25} circle mb="xl" />
                      <WrapperSkeleton height={25} circle mb="xl" />
                      <WrapperSkeleton height={25} circle mb="xl" />
                    </span>
                  </Group>
                </div>
              </GridCol>
            </Grid>
          </div>
          <div className="flex flex-col gap-2 xs:col-span-full sm:col-span-1 sm:row-span-2  h-full">
            <Card
              shadow="sm"
              px={'lg'}
              py={'sm'}
              radius="md"
              className="bg-tertiary"
            >
              <CardSection
                px={10}
                py={10}
                className="flex flex-col gap-3 justify-around"
              >
                {' '}
                <div className="flex flex-col gap-2">
                  <WrapperSkeleton height={50} />
                  <WrapperSkeleton height={50} />
                </div>
              </CardSection>
            </Card>
            <Card
              shadow="sm"
              px={'lg'}
              py={'sm'}
              radius="md"
              className="bg-tertiary"
            >
              <CardSection
                px={10}
                py={10}
                className="flex flex-col gap-3 justify-around"
              >
                {' '}
                <div className="flex flex-col gap-2">
                  <WrapperSkeleton height={50} />
                  <WrapperSkeleton height={50} />
                </div>
              </CardSection>
            </Card>
            <Card
              shadow="sm"
              px={'lg'}
              py={'sm'}
              radius="md"
              className="bg-tertiary"
            >
              <CardSection
                px={10}
                py={10}
                className="flex flex-col gap-3 justify-around"
              >
                {' '}
                <div className="flex flex-col gap-2">
                  <WrapperSkeleton height={50} />
                  <WrapperSkeleton height={50} />
                </div>
              </CardSection>
            </Card>
          </div>
          <div className="xs:col-span-full sm:row-span-3 sm:col-span-2 flex flex-col gap-2">
            <>
              {[1, 2].map((item) => {
                return (
                  <>
                    <WrapperSkeleton height={20} width={100} />

                    {[1, 2, 3, 4, 5, 6].map((item) => {
                      return (
                        <div className=" " key={item}>
                          <WrapperSkeleton height={10} />
                        </div>
                      );
                    })}
                  </>
                );
              })}
            </>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <WrapperSkeleton height={40} width={150} />

          <div className="flex justify-around">
            {[1, 2, 3].map((item) => {
              return (
                <div key={item}>
                  {' '}
                  <WrapperSkeleton height={20} width={100} />
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-4">
            {[1, 2].map((item) => {
              return (
                <div className=" " key={item}>
                  <WrapperSkeleton height={40} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
