import SquareLoader from '../components/Loading/SquareLoader';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex  justify-center items-center ">
      <SquareLoader></SquareLoader>{' '}
    </div>
  );
}
