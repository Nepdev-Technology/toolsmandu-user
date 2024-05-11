import WrapperSkeleton from '@/src/components/Skeleton/WrapperSkeleton';
import { Box } from '@mantine/core';

const Loading = () => {
  return (
    <section className="relative bottom-1 text-textPrimary">
      <Box className="flex gap-4 flex-wrap mt-2 xs:px-[10px] mx-auto sm:px-[2rem] xs:justify-between md:justify-start">
        {/* Product Card Skeletons */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
          <div key={index}>
            <WrapperSkeleton height={300} width={165} radius={'md'} />
            <WrapperSkeleton
              height={50}
              width={165}
              radius="md"
              className="mt-3"
            />
          </div>
        ))}
      </Box>
    </section>
  );
};

export default Loading;
