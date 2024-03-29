import { AspectRatio, Card, CardSection, Flex, Text } from '@mantine/core';

interface ICardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  imageAlt: string;
  maximumRetailPrice: number;
  sellingPrice: number;
  offerTitle: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}
const ProductCard = ({
  id,
  name,
  imageUrl,
  imageAlt,
  maximumRetailPrice,
  sellingPrice,
  label,
  metaTitle,
  metaDescription,
  metaKeywords,
  offerTitle,
}: ICardProps) => {
  return (
    <Card
      key={id}
      shadow="sm"
      radius="lg"
      pb={{ sm: 2, md: 4, lg: 4 }}
      py={0}
      className="bg-tertiary w-[11rem] md:w-48 transition-transform duration-500 transform-gpu hover:-translate-y-1.5"
    >
      <CardSection>
        <AspectRatio ratio={240 / 347} mx="auto">
          <img
            src={process.env.NEXT_PUBLIC_IMAGE_URL + imageUrl}
            alt={imageAlt}
          />
          {offerTitle && (
            <div className="absolute top-0 right-0">
              <div className="w-32 h-6 absolute top-4 -left-8">
                <div className="h-full w-full bg-red-500 text-white text-center   transform rotate-[-45deg]">
                  {offerTitle}
                </div>
              </div>
            </div>
          )}
        </AspectRatio>
      </CardSection>
      <CardSection h={80}>
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
              Rs&nbsp;{sellingPrice}
            </Text>
            <Text
              className="text-textMRP font-display  text-sm  "
              td="line-through"
            >
              Rs&nbsp;{maximumRetailPrice}
            </Text>
          </Flex>
        </Flex>
      </CardSection>
    </Card>
  );
};

export default ProductCard;

//Dimensions: 240 x 347
// GCD: 1
// Aspect: 240 : 347
// Ratio: 0.692
