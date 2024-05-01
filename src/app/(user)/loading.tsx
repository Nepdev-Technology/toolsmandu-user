import WrapperSkeleton from '@/src/components/Skeleton/WrapperSkeleton';
import { Divider } from '@mantine/core';

const Loading = () => {
  return (
    <section className="px-3 sm:px-[4rem] md:px-[10rem] ">
      <WrapperSkeleton
        height={300}
        width={'100%'}
        className="mt-2"
        radius={'md'}
      />

      {[1, 2, 3].map((item) => {
        return (
          <div className="w-full mt-3 md:mt-10" key={item}>
            {/* Skeleton for category header */}
            <Divider
              my="md"
              labelPosition="center"
              label={
                <div className=" md:px-[10rem] py-1 rounded-md">
                  <WrapperSkeleton
                    height={40}
                    width={200}
                    radius={'md'}
                    style={{ marginBottom: '1rem' }}
                  />
                </div>
              }
            />

            <div className="flex gap-3 overflow-hidden">
              {/* Product Card Skeletons */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <div key={index}>
                  <WrapperSkeleton height={300} width={200} radius={'md'} />
                  <WrapperSkeleton
                    height={50}
                    width={200}
                    radius="md"
                    className="mt-3"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Loading;

// export default function Loading() {
//   return <div>loading</div>;
// }
