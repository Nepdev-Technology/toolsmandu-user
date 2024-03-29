import WrapperSkeleton from '@/src/components/Skeleton/WrapperSkeleton';
export default function Loading() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <div key={item}>
            <WrapperSkeleton height={50} circle mb="xl" />
            <WrapperSkeleton height={8} radius="xl" />
            <WrapperSkeleton height={8} mt={6} radius="xl" />
            <WrapperSkeleton height={8} mt={6} width="70%" radius="xl" />
          </div>
        );
      })}
    </>
  );
}
