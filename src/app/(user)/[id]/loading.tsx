import WrapperSkeleton from '@/src/components/Skeleton/WrapperSkeleton';
import { Divider, Grid, GridCol, Group } from '@mantine/core';

const Loading = () => {
  return (
    <section className="relative bottom-1 bg-primary">
      <div className=" pr-3 md:pr-6 lg:pr-10  xs:pl-5 sm:pl-10 md:pl-24  ">
        <div className="grid md:grid-cols-3 md:grid-rows-3 gap-1 grid-auto-rows-auto md:pt-[20vh] sm:pt-[10vh] xs:pt-[7vh] ">
          <div className=" col-span-2">
            <Grid align={'center'} justify="space-around">
              <GridCol span={4}>
                <WrapperSkeleton width={130} height={230} />
              </GridCol>
              <GridCol span={7}>
                <div>
                  <h1 className="sm:text-2xl xs:text-xl  md:text-3xl  font-bold ">
                    {' '}
                    <WrapperSkeleton
                      width={200}
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
                      <WrapperSkeleton height={25} circle mb="xl" />
                    </span>
                  </Group>
                </div>
              </GridCol>
            </Grid>
          </div>
          <div className=" row-span-2  flex flex-col gap-2">
            <WrapperSkeleton height={80} />
            <WrapperSkeleton height={80} />
            <WrapperSkeleton height={80} />
          </div>
          <div className="col-span-2 ">
            <WrapperSkeleton height={200} radius="xl" className="mb-2" />
            {[1, 2, 3].map((item) => {
              return (
                <div className=" flex flex-col gap-2" key={item}>
                  <WrapperSkeleton height={20} />
                  <WrapperSkeleton height={50} />
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
