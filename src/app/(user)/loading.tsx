import { Divider, Skeleton } from '@mantine/core';

const Loading = () => {
  return (
    <>
      <Skeleton height={300} width={'100%'} className="mt-2" radius={'md'} />

      {[1, 2, 3].map((item) => {
        return (
          <div className="w-full mt-3 md:mt-10" key={item}>
            {/* Skeleton for category header */}
            <Divider
              my="md"
              labelPosition="center"
              label={
                <div className=" px-[10rem] py-1 rounded-md">
                  <Skeleton
                    height={40}
                    width={200}
                    radius={'md'}
                    style={{ marginBottom: '1rem' }}
                  />
                </div>
              }
            />

            {/* Skeleton for product cards */}
            <div className="flex gap-3 overflow-hidden">
              {/* Product Card Skeletons */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <div key={index}>
                  <Skeleton height={300} width={200} radius={'md'} />
                  <Skeleton
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
    </>
  );
};

export default Loading;

// export default function Loading() {
//   return <div>loading</div>;
// }
