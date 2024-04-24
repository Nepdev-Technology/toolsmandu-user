import { normalizeDate } from '@/src/utils/normalizeDate';
import { AspectRatio, Card, CardSection, Flex, Text } from '@mantine/core';

interface ICardProps {
  id: string | number;
  title: string;
  imageUrl: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  createdAt: string;
}
const BlogCard = ({
  id,
  title,
  imageUrl,
  imageAlt,
  createdAt,
  metaTitle,
  metaDescription,
  metaKeywords,
}: ICardProps) => {
  return (
    <Card
      key={id}
      shadow="sm"
      py={0}
      className="bg-tertiary w-[18rem] md:w-[35rem] "
    >
      <CardSection>
        <AspectRatio ratio={16 / 9} mx="auto">
          <img
            src={process.env.NEXT_PUBLIC_IMAGE_URL + imageUrl}
            alt={imageAlt}
          />
        </AspectRatio>
      </CardSection>
      <CardSection h={100}>
        <div className="ml-10 mt-5">
          <div className="flex justify-start gap-10 ">
            <Text className="text-textPrimary font-display">Admin</Text>
            <Text className="text-textPrimary font-display">
              {normalizeDate(createdAt)}
            </Text>
          </div>

          <Flex justify="center" direction={'column'} wrap={'nowrap'}>
            <Text className="text-textPrimary font-display mt-2 text-xl font-bold ">
              {title}
            </Text>
          </Flex>
        </div>
      </CardSection>
    </Card>
  );
};

export default BlogCard;

//Dimensions: 240 x 347
// GCD: 1
// Aspect: 240 : 347
// Ratio: 0.692
