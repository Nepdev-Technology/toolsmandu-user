import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import {
  DynamicVariable,
  ProductVariation,
} from '@/src/types/interfaces/ProductInterface';
import { checkLoggedIn } from '@/src/utils/checkLoggedIn';
import { PAYMENT_GATEWAYS } from '@/src/utils/Payment/Payment';

import {
  Badge,
  Button,
  Card,
  CardSection,
  Divider,
  Flex,
  SimpleGrid,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCashBanknote } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ICustomFormProps {
  fields: DynamicVariable[];
  initialValues?: any;
  selectedOption: ProductVariation;
}

const CustomForm = ({
  fields,
  initialValues,
  selectedOption,
}: ICustomFormProps) => {
  const result: any = {};
  for (const item of fields) {
    result[item.id] = '';
  }
  const form = useForm({
    initialValues: { ...result },
  });
  const isLoggedIn = checkLoggedIn();
  const pathName = usePathname();
  const handleFormSubmit = async (values: any) => {
    const http = new HttpService();
    const result = Object.keys(values).map((key) => {
      return {
        variableId: +key,
        variable: 'dummy-data',
        userInput: values[key],
      };
    });
    const orderPayload = {
      productId: selectedOption.product,
      productVariationId: selectedOption.id,
      couponCode: '',
      paymentMethod: PAYMENT_GATEWAYS.ESEWA,
      variables: result,
    };
    const response: any = await http
      .service()
      .push(`${apiRoutes.orders.base}`, orderPayload);
    // const data = response.data;

    // const store = new Store(new EsewaPaymentProcessor());
    // const order: Order = { orderId: 'dflkaj', price: 100, productId: 8 };
    // store.purchaseItem(order);
  };
  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Card shadow="sm" px={10} py={10} radius="md" withBorder>
        <CardSection px={20} py={20}>
          <div className="flex gap-2 items-center">
            <Badge size="md" circle>
              2
            </Badge>
            <Text fw={500}>Fill up details</Text>
          </div>
          <Divider></Divider>
          {fields.map((field) => {
            return (
              <div key={field.id}>
                {
                  <TextInput
                    placeholder={field.hintText}
                    label={field.label}
                    required={field.required}
                    withAsterisk={field.required}
                    type={field.type}
                    {...form.getInputProps(`${field.id}`)}
                  />
                }
              </div>
            );
          })}
        </CardSection>
      </Card>
      <Card shadow="sm" radius="md" withBorder>
        <CardSection px={10} py={10}>
          <div className="flex gap-2 items-center">
            <Badge size="md" circle>
              3
            </Badge>
            <Text fw={500}>Select a payment provider</Text>
          </div>
          <Divider></Divider>
          <SimpleGrid cols={3} className="mt-2">
            {isLoggedIn ? (
              <div>
                {/* <Button type="submit">Khalti</Button> */}
                <Button type="submit" size="md">
                  <IconCashBanknote></IconCashBanknote>
                  Esewa
                  <Flex
                    className="mx-2"
                    gap={1}
                    align={'center'}
                    direction={'column'}
                  >
                    <Text className="text-textSP font-display   text-sm font-bold ">
                      Rs{selectedOption.sellingPrice}
                    </Text>
                    <Text
                      className="text-textMRP font-display  text-xs  "
                      td="line-through"
                    >
                      {selectedOption.maximumRetailPrice}
                    </Text>
                  </Flex>
                </Button>
              </div>
            ) : (
              <div>
                <Link href={`/login?next=${pathName}`}>
                  <Button type="button">Login to Proceed</Button>
                </Link>
              </div>
            )}
          </SimpleGrid>
        </CardSection>
      </Card>
    </form>
  );
};

export default CustomForm;
