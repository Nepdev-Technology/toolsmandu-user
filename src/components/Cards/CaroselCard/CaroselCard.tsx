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
      <div className="pl-10">
        <Title order={3} className={classes.title}>
          {title}
        </Title>
        <Text className={classes.category} size="xs">
          {description}
        </Text>
      </div>

      <Link href={link} className="pl-10">
        {' '}
        <Button variant="white" color="dark">
          Order Now
        </Button>
      </Link>
    </Paper>
  );
}
