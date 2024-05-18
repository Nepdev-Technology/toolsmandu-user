import { Button, Paper, Text, Title } from '@mantine/core';
import Link from 'next/link';
import classes from './Demo.module.css';
import { COLOR } from '@/src/types/enums/colors.enums';

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
      <div className="flex flex-col items-center justify-center text-black">
        <Title order={3}>{title}</Title>
        <Text size="xs">{description}</Text>
      </div>

      <Link href={link}>
        {' '}
        <Button className="bg-green-500">Order Now</Button>
      </Link>
    </Paper>
  );
}
