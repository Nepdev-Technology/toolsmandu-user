import { Skeleton } from '@mantine/core';
export default function Loading() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <div key={item}>
            <Skeleton height={50} circle mb="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
          </div>
        );
      })}
    </>
  );
}
