import ProductView from '@/src/components/ProductArea/ProductView/ProductView';
import { CustomCrousel } from '@/src/components/crousel/Crousel';
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';

export default function Home() {
  return (
    <section className="px-3 md:px-6 lg:px-10 ">
      {' '}
      <CustomCrousel></CustomCrousel>
      <ProductView></ProductView>
    </section>
  );
}
