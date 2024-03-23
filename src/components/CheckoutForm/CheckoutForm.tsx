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
  SimpleGrid,
  Text,
} from '@mantine/core';
import { useState } from 'react';

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
          <Flex wrap="wrap" gap={2} className="mt-2">
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
        <Card shadow="sm" px={10} py={10} radius="md" withBorder>
          <CardSection px={10} py={10}>
            <div className="flex gap-2 items-center">
              <Badge size="md" circle>
                2
              </Badge>
              <Text fw={500}>Fill details</Text>
            </div>
            <Divider></Divider>
          </CardSection>
        </Card>
      ) : null}
      <Card shadow="sm" radius="md" withBorder>
        <CardSection px={10} py={10}>
          <div className="flex gap-2 items-center">
            <Badge size="md" circle>
              3
            </Badge>
            <Text fw={500}>Review pictures</Text>
          </div>
          <Divider></Divider>
          <SimpleGrid cols={3} className="mt-2">
            <Button>Khalti</Button>
            <Button>Esewa</Button>
            <Button>Ime pay</Button>
          </SimpleGrid>
        </CardSection>
      </Card>
    </div>
  );
};

export default CheckoutForm;
