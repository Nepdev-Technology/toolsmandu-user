import { AspectRatio, Card, Flex, Text } from '@mantine/core';

interface ICardProps {
  name: string;
  imageUrl: string;
  imageAlt: string;
  maximumRetailPrice: number;
  sellingPrice: number;
  label: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}
const ProductCard = ({
  name,
  imageUrl,
  imageAlt,
  maximumRetailPrice,
  sellingPrice,
  label,
  metaTitle,
  metaDescription,
  metaKeywords,
}: ICardProps) => {
  return (
    <Card
      shadow="sm"
      radius="lg"
      pb={{ sm: 2, md: 4, lg: 4 }}
      className="bg-tertiary w-[11rem] md:w-48 transition-transform duration-500 transform-gpu hover:-translate-y-1.5"
    >
      <Card.Section>
        <AspectRatio ratio={240 / 347} mx="auto">
          <img src={imageUrl} alt={imageAlt} />
          <div className="absolute top-0 right-0">
            <div className="w-32 h-6 absolute top-4 -left-8">
              <div className="h-full w-full bg-red-500 text-white text-center   transform rotate-[-45deg]">
                {label}
              </div>
            </div>
          </div>
        </AspectRatio>
      </Card.Section>
      <Card.Section h={80}>
        <Flex
          justify="center"
          direction={'column'}
          align={'center'}
          wrap={'nowrap'}
        >
          <Text className="text-textPrimary font-display mt-2 text-sm font-bold ">
            {name}
          </Text>
          <Flex gap={10} align={'center'}>
            <Text className="text-textSP font-display   text-lg font-bold ">
              Rs{sellingPrice}
            </Text>
            <Text
              className="text-textMRP font-display  text-xs  "
              td="line-through"
            >
              {maximumRetailPrice}
            </Text>
          </Flex>
        </Flex>
      </Card.Section>
    </Card>
  );
};

export default ProductCard;

//Dimensions: 240 x 347
// GCD: 1
// Aspect: 240 : 347
// Ratio: 0.692
