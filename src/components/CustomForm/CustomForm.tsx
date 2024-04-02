import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import {
  DynamicVariable,
  ProductVariation,
} from '@/src/types/interfaces/ProductInterface';
import { checkLoggedIn } from '@/src/utils/checkLoggedIn';
import {
  showErrorNotification,
  showSuccessNotification,
} from '@/src/utils/notificationUtils';
import {
  EsewaPaymentProcessor,
  Order,
  PAYMENT_GATEWAYS,
  Store,
} from '@/src/utils/Payment/Payment';

import {
  Badge,
  Button,
  Card,
  CardSection,
  Group,
  Image,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface ICustomFormProps {
  fields: DynamicVariable[];
  initialValues?: any;
  selectedOption: ProductVariation;
}

interface DiscountInfo {
  code: string;
  calculatedDiscountAmount: number;
  type: string;
  discount: number;
  totalAmount: number;
}

const CustomForm = ({
  fields,
  initialValues,
  selectedOption,
}: ICustomFormProps) => {
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<PAYMENT_GATEWAYS>(PAYMENT_GATEWAYS.ESEWA);

  const [coupon, setCoupon] = useState<string>('');
  const [validCoupon, setValidCoupon] = useState<DiscountInfo>();

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
      couponCode: validCoupon?.code,
      paymentMethod: PAYMENT_GATEWAYS.ESEWA,
      variables: result,
    };
    try {
      const response: any = await http
        .service()
        .push(`${apiRoutes.orders.base}`, orderPayload);

      if (response.success) {
        const { orderId, totalAmount } = response.data;

        const order: Order = {
          orderId: orderId,
          price: totalAmount,
          productId: selectedOption.product,
        };
        if (selectedPaymentOption == PAYMENT_GATEWAYS.ESEWA) {
          const store = new Store(new EsewaPaymentProcessor());
          store.purchaseItem(order);
        }
      }
    } catch (error) {
      showErrorNotification('Something went wrong');
    }
  };
  const checkCoupon = async () => {
    const http = new HttpService();

    const response: any = await http
      .service()
      .push(`${apiRoutes.coupon.discount}`, {
        code: coupon,
        productVariationId: selectedOption.product,
      });
    if (response.success) {
      setValidCoupon(response.data);
      showSuccessNotification('Coupon applied');
    } else {
      showErrorNotification('Invalid Coupon');
    }
  };
  return (
    <form
      onSubmit={form.onSubmit(handleFormSubmit)}
      className="flex flex-col gap-4"
    >
      <Card shadow="sm" px={10} py={10} radius="md" className="bg-tertiary">
        <CardSection
          px={20}
          py={20}
          className="text-textPrimary flex gap-4 flex-col "
        >
          <div className="flex gap-4 items-center">
            <Badge size="md" circle>
              2
            </Badge>
            <Text fw={500}>Fill up details</Text>
          </div>
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
          <div>
            <TextInput
              label="Coupon code"
              placeholder="USER500"
              description={
                validCoupon && `Rs ${validCoupon.discount} discount applied`
              }
              onChange={(e) => setCoupon(e.target.value)}
              rightSection={
                <div>
                  <Button onClick={checkCoupon}>Apply</Button>
                </div>
              }
            ></TextInput>
          </div>
        </CardSection>
      </Card>
      <Card shadow="sm" radius="md" className="bg-tertiary">
        <CardSection
          px={10}
          py={10}
          className="text-textPrimary flex flex-col gap-4"
        >
          <div className="flex gap-4 items-center">
            <Badge size="md" circle>
              3
            </Badge>
            <Text fw={500}>Select a payment provider</Text>
          </div>
          {isLoggedIn ? (
            <div className="flex xs:flex-col  gap-4 ">
              <Button
                onClick={() => setSelectedPaymentOption(PAYMENT_GATEWAYS.ESEWA)}
                size="md"
                variant="outline"
                rightSection={
                  selectedPaymentOption == PAYMENT_GATEWAYS.ESEWA ? (
                    <IconCheck></IconCheck>
                  ) : null
                }
                color={
                  selectedPaymentOption == PAYMENT_GATEWAYS.ESEWA
                    ? 'yellow'
                    : 'white'
                }
                justify="space-around"
              >
                <Group>
                  <Image
                    radius="md"
                    h={20}
                    w="auto"
                    src={'esewa_logo.png'}
                    alt="Esewa Logo"
                  />
                  <div>
                    {' '}
                    <Text className="text-textPrimary font-display   text-sm font-bold ">
                      Rs
                      {validCoupon?.discount
                        ? selectedOption.sellingPrice - validCoupon.discount
                        : selectedOption.sellingPrice}
                    </Text>
                    <Text
                      className="text-textPrimary font-display  text-xs  "
                      td="line-through"
                    >
                      {selectedOption.maximumRetailPrice}
                    </Text>
                  </div>
                </Group>
              </Button>
              <Button
                onClick={() =>
                  setSelectedPaymentOption(PAYMENT_GATEWAYS.KHALTI)
                }
                size="md"
                variant="outline"
                rightSection={
                  selectedPaymentOption == PAYMENT_GATEWAYS.KHALTI ? (
                    <IconCheck></IconCheck>
                  ) : null
                }
                color={
                  selectedPaymentOption == PAYMENT_GATEWAYS.KHALTI
                    ? 'yellow'
                    : 'gray'
                }
                justify="space-around"
              >
                <Group>
                  <Image
                    radius="md"
                    h={20}
                    w="auto"
                    src={'khalti-seeklogo.svg'}
                    alt="Khalti Logo"
                  />
                  <div>
                    {' '}
                    <Text className="text-textPrimary font-display   text-sm font-bold ">
                      Rs
                      {validCoupon?.discount
                        ? selectedOption.sellingPrice - validCoupon.discount
                        : selectedOption.sellingPrice}
                    </Text>
                    <Text
                      className="text-textPrimary font-display  text-xs  "
                      td="line-through"
                    >
                      {selectedOption.maximumRetailPrice}
                    </Text>
                  </div>
                </Group>
              </Button>
              <Button type="submit">Pay</Button>
            </div>
          ) : (
            <div>
              <Link href={`/login?next=${pathName}`}>
                <Button type="button">Login to Proceed</Button>
              </Link>
            </div>
          )}
        </CardSection>
      </Card>
    </form>
  );
};

export default CustomForm;
