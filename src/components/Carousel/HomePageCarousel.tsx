import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import CarouselCard, { SlideData } from '../Cards/CaroselCard/CaroselCard';
import { Metadata } from 'next';

const getCarouselData = async () => {
  const http = new HttpService();
  const response: any = await http.service().get(apiRoutes.crousel.crousel);
  return response?.data?.data;
};
export async function generateMetadata(): Promise<Metadata> {
  const product: SlideData = await getCarouselData();
  if (!product) {
    return {
      title: '404- Not found',
    };
  }
  const { link, image, metaTitle, metaDescription, metaKeywords } = product;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    openGraph: {
      url: link,
      title: metaTitle,
      description: metaDescription,
      images: [image],
    },
  };
}
const HomePageCarousel = async () => {
  const carouselData: SlideData[] = await getCarouselData();

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%', md: '33.33%' }}
      slideGap={{ base: 0, sm: 'md' }}
      align="start"
      slidesToScroll={2}
      controlsOffset="md"
      controlSize={27}
      withIndicators
      loop
    >
      {carouselData &&
        carouselData.map((item) => (
          <CarouselSlide key={item.title}>
            <CarouselCard {...item} />
          </CarouselSlide>
        ))}
    </Carousel>
  );
};

export default HomePageCarousel;
