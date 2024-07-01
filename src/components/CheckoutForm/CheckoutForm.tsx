'use client';
import {
  DynamicVariable,
  ProductVariation,
} from '@/src/types/interfaces/ProductInterface';
import {
  AspectRatio,
  Badge,
  Button,
  Card,
  CardSection,
  Flex,
  rem,
  Text,
} from '@mantine/core';
import { IconInfoCircle, IconShoppingCart } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import CustomForm from '../CustomForm/CustomForm';

interface ICheckoutFormProps {
  image: string;
  slug: string;
  variations: ProductVariation[];
  dynamicVariables: DynamicVariable[];
}

const CheckoutForm = ({
  image,
  slug,
  variations,
  dynamicVariables,
}: ICheckoutFormProps) => {
  const [selectedOption, setSelectedOption] = useState<ProductVariation>();

  useEffect(() => {
    setSelectedOption(variations[0]);
  }, []);

  return (
    <div className="flex flex-col gap-4 justify-between">
      <Card shadow="sm" px={'lg'} py={'sm'} radius="md" className="bg-tertiary">
        <CardSection
          px={10}
          py={10}
          className="flex flex-col gap-3 justify-around"
        >
          <div className="flex gap-4 items-center text-textPrimary">
            <Badge size="md" circle>
              1
            </Badge>
            <Text fw={500}>Select a Plan</Text>
          </div>

          <Flex wrap="wrap" gap={10} className="mt-2">
            {variations.map((variations) => {
              return (
                <div
                  className={`flex justify-between px-2  rounded-lg w-full py-2 hover:cursor-pointer ${
                    selectedOption?.id === variations.id
                      ? 'border-2	border-sky-500'
                      : 'bg-primary'
                  }`}
                  key={variations.id}
                  onClick={() => setSelectedOption(variations)}
                >
                  <div className="flex gap-4 flex-1">
                    <AspectRatio
                      ratio={240 / 347}
                      style={{ flex: `0 0 ${rem(100)}` }}
                      maw={'34px'}
                    >
                      <img
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + image}
                        // height={'24px'}
                        // width={'35px'}
                        alt={''}
                      ></img>
                    </AspectRatio>

                    <Flex direction={'column'} wrap={'nowrap'}>
                      <Text className="text-textPrimary font-display  text-md font-bold ">
                        {variations.name}
                      </Text>
                      <Flex gap={10} align={'center'}>
                        <Text className="text-textSP font-display text-md font-bold ">
                          Rs&nbsp;{variations.sellingPrice}
                        </Text>
                        {variations.maximumRetailPrice !==
                          variations.sellingPrice && (
                          <Text
                            className="text-textMRP font-display  text-sm  "
                            td="line-through"
                          >
                            Rs&nbsp;{variations.maximumRetailPrice}
                          </Text>
                        )}

                        {/* <Text
                          className="text-textMRP font-display  text-sm  "
                          td="line-through"
                        >
                          Rs&nbsp;{variations.maximumRetailPrice}
                        </Text> */}
                      </Flex>
                    </Flex>
                  </div>
                  <div>
                    <Button className="bg-green-500 h-full ">
                      <IconShoppingCart className="text-primary"></IconShoppingCart>
                    </Button>
                  </div>
                </div>
              );
            })}
          </Flex>
        </CardSection>
      </Card>

      {selectedOption && (
        <CustomForm
          slug={slug}
          selectedOption={selectedOption}
          fields={dynamicVariables}
        ></CustomForm>
      )}
    </div>
  );
};

export default CheckoutForm;
