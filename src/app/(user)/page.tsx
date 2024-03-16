import ProductView from '@/src/components/ProductArea/ProductView/ProductView';
import { CustomCrousel } from '@/src/components/crousel/Crousel';
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';

export default function Home() {
  return (
    <section>
      {' '}
      <CustomCrousel></CustomCrousel>
      <ProductView></ProductView>
    </section>
  );
}
