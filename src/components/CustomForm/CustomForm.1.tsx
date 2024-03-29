import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { checkLoggedIn } from '@/src/utils/checkLoggedIn';
import { showErrorNotification } from '@/src/utils/notificationUtils';
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
  Image,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ICustomFormProps } from './CustomForm';

export const CustomForm = ({
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
    try {
      const response: any = await http
        .service()
        .push(`${apiRoutes.orders.base}`, orderPayload);

      if (response.success) {
        const { orderId, totalAmount } = response.data;

        const store = new Store(new EsewaPaymentProcessor());
        const order: Order = {
          orderId: orderId,
          price: totalAmount,
          productId: selectedOption.product,
        };
        store.purchaseItem(order);
      }
    } catch (error) {
      showErrorNotification('Something went wrong');
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
            <div>
              <Button
                type="submit"
                size="md"
                fullWidth
                className="flex justify-between"
              >
                <div>
                  <Group justify="space-between">
                    <Image
                      radius="md"
                      h={20}
                      w="auto"
                      src={'esewa_logo.png'}
                      alt="Toolsmandu Logo"
                    />
                    <div>
                      {' '}
                      <Text className="text-textSP font-display   text-sm font-bold ">
                        Rs{selectedOption.sellingPrice}
                      </Text>
                      <Text
                        className="text-textMRP font-display  text-xs  "
                        td="line-through"
                      >
                        {selectedOption.maximumRetailPrice}
                      </Text>
                    </div>
                  </Group>
                </div>
              </Button>
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
