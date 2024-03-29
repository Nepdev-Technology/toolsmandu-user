import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import CarouselCard, { SlideData } from '../Cards/CaroselCard/CaroselCard';

const getCarouselData = async () => {
  const http = new HttpService();
  const response: any = await http.service().get(apiRoutes.crousel.crousel);
  return response?.data?.data;
};
const HomePageCarousel = async () => {
  const carouselData: SlideData[] = await getCarouselData();

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '100%', md: '100%' }}
      slideGap={{ base: 0, sm: 'md' }}
      align="start"
      slidesToScroll={1}
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
