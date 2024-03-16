import { AspectRatio, Card, Text } from '@mantine/core';

const ProductCard = () => {
  return (
    <Card
      shadow="sm"
      radius="md"
      pb={{ sm: 2, md: 4, lg: 4 }}
      className="bg-darkPrimary w-[11rem] md:w-48 transition-transform duration-500 transform-gpu hover:-translate-y-1.5"
    >
      <Card.Section>
        <AspectRatio ratio={240 / 347} mx="auto">
          <img
            src="https://www.mtcgame.com/api/img-loader?url=https%3A%2F%2Fcdn5.mtcgame.com%2FImages%2FCategory%2Fffc8329d-c998-4b52-b241-5efd92c1c3f6.jpg&w=240&q=75"
            alt="Panda"
          />
        </AspectRatio>
      </Card.Section>

      <Text className="text-textPrimary font-display mt-2 text-sm font-bold ">
        Free Fire Diamonds (Top-up)
      </Text>
    </Card>
  );
};

export default ProductCard;

//Dimensions: 240 x 347
// GCD: 1
// Aspect: 240 : 347
// Ratio: 0.692
