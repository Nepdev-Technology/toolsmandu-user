'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Carousel } from '@mantine/carousel';
import { Button, Paper, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import classes from './Demo.module.css';
interface SlideData {
  image: string;
  title: string;
  link: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

function Card({ image, title, link, description }: SlideData) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL + image})`,
      }}
      className={classes.card}
    >
      <div>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Text className={classes.category} size="xs">
        {description}
      </Text>
      <Link href={link}>
        {' '}
        <Button variant="white" color="dark">
          Order Now
        </Button>
      </Link>
    </Paper>
  );
}

export function CustomCrousel() {
  const [crouselData, setCrouselData] = useState<SlideData[]>();

  const getData = async () => {
    const http = new HttpService();
    const response: any = await http.service().get(apiRoutes.crousel.crousel);
    setCrouselData(response?.data?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const slides =
    crouselData &&
    crouselData.map((item) => (
      <Carousel.Slide key={item.title}>
        <Card {...item} />
      </Carousel.Slide>
    ));

  return (
    <>
      {crouselData && (
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
          {slides}
        </Carousel>
      )}
    </>
  );
}
