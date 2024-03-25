import {
  DynamicVariable,
  ProductVariation,
} from '@/src/types/interfaces/ProductInterface';
import {
  EsewaPaymentProcessor,
  Order,
  Store,
} from '@/src/utils/Payment/Payment';
import {
  Badge,
  Button,
  Card,
  CardSection,
  Divider,
  SimpleGrid,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';

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
  const handleFormSubmit = async (values: any) => {
    const store = new Store(new EsewaPaymentProcessor());
    const order: Order = { orderId: 'dflkaj', price: 100, productId: 8 };
    store.purchaseItem(order);
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
            {/* <Button type="submit">Khalti</Button> */}
            <Button type="submit">Esewa</Button>
          </SimpleGrid>
        </CardSection>
      </Card>
    </form>
  );
};

export default CustomForm;
