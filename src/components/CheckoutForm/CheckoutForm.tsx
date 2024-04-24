'use client';
import {
  DynamicVariable,
  ProductVariation,
} from '@/src/types/interfaces/ProductInterface';
import { Badge, Button, Card, CardSection, Flex, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import CustomForm from '../CustomForm/CustomForm';

interface ICheckoutFormProps {
  variations: ProductVariation[];
  dynamicVariables: DynamicVariable[];
}

const CheckoutForm = ({ variations, dynamicVariables }: ICheckoutFormProps) => {
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
            <Text fw={500}>Select Item</Text>
          </div>
          <Flex wrap="wrap" gap={10} className="mt-2">
            {variations.map((variations) => {
              return (
                <Button
                  key={variations.id}
                  onClick={() => setSelectedOption(variations)}
                  variant="outline"
                  rightSection={
                    selectedOption?.id == variations.id ? (
                      <IconCheck></IconCheck>
                    ) : null
                  }
                  color={
                    selectedOption?.id == variations.id ? 'yellow' : 'white'
                  }
                  size="md"
                >
                  {variations.name}
                </Button>
              );
            })}
          </Flex>
        </CardSection>
      </Card>
      {selectedOption && (
        <CustomForm
          selectedOption={selectedOption}
          fields={dynamicVariables}
        ></CustomForm>
      )}
    </div>
  );
};

export default CheckoutForm;
