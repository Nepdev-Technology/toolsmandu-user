'use client';
import {
  DynamicVariable,
  ProductVariation,
} from '@/src/types/interfaces/ProductInterface';
import {
  Badge,
  Button,
  Card,
  CardSection,
  Divider,
  Flex,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import CustomForm from '../CustomForm/CustomForm';

interface ICheckoutFormProps {
  variations: ProductVariation[];
  dynamicVariables: DynamicVariable[];
}

const CheckoutForm = ({ variations, dynamicVariables }: ICheckoutFormProps) => {
  const [selectedOption, setSelectedOption] = useState<ProductVariation>();
  return (
    <div className="flex flex-col gap-2">
      <Card shadow="sm" px={'lg'} py={'sm'} radius="md" withBorder>
        <CardSection px={10} py={10}>
          <div className="flex gap-2 items-center">
            <Badge size="md" circle>
              1
            </Badge>
            <Text fw={500}>Select Item</Text>
          </div>
          <Divider></Divider>
          <Flex wrap="wrap" gap={10} className="mt-2">
            {variations.map((variations) => {
              return (
                <Button
                  key={variations.id}
                  onClick={() => setSelectedOption(variations)}
                  variant="outline"
                  color={
                    selectedOption?.id == variations.id ? 'yellow' : 'gray'
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
      {selectedOption ? (
        <CustomForm
          selectedOption={selectedOption}
          fields={dynamicVariables}
        ></CustomForm>
      ) : null}
    </div>
  );
};

export default CheckoutForm;
