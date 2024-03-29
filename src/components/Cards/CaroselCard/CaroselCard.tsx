import { Button, Paper, Text, Title } from '@mantine/core';
import Link from 'next/link';
import classes from './Demo.module.css';

export interface SlideData {
  image: string;
  title: string;
  link: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}
export default function CarouselCard({
  image,
  title,
  link,
  description,
}: SlideData) {
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
