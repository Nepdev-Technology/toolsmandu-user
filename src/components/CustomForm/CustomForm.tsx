import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import {
  DynamicVariable,
  ProductVariation,
} from '@/src/types/interfaces/ProductInterface';
import { checkLoggedIn } from '@/src/utils/checkLoggedIn';
import {
  showErrorNotification,
  showNotificationOnRes,
  showSuccessNotification,
} from '@/src/utils/notificationUtils';
import {
  EsewaPaymentProcessor,
  KhaltiPaymentProcessor,
  Order,
  PAYMENT_GATEWAYS,
  Store,
} from '@/src/utils/Payment/Payment';

import {
  Badge,
  Button,
  Card,
  CardSection,
  Checkbox,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PaymentCard from '../Cards/PaymentCard';

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
  const router = useRouter();

  const result: any = {};
  for (const item of fields) {
    result[item.id] = '';
  }
  const form = useForm({
    initialValues: { ...result },
  });
  const isLoggedIn = checkLoggedIn();
  const pathName = usePathname();
  useEffect(() => {
    setValidCoupon(undefined);
  }, [selectedOption]);
  const handleFormSubmit = async (values: any) => {
    const http = new HttpService();
    const result = Object.keys(values).map((key) => {
      const variableName = fields.filter((item) => item.id === +key)[0]?.label;
      return {
        variableId: +key,
        variable: variableName,
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
      showNotificationOnRes(response);

      if (response.success) {
        const { orderId, totalAmount, user } = response.data;

        const order: Order = {
          orderId: orderId,
          price: totalAmount,
          productId: selectedOption.product,
          customerName: `${user?.firstName} ${user?.lastName}`,
          customerEmail: user?.email,
          customerPhone: '',
        };
        if (selectedPaymentOption == PAYMENT_GATEWAYS.ESEWA) {
          const store = new Store(new EsewaPaymentProcessor());
          store.purchaseItem(order);
        } else if (selectedPaymentOption === PAYMENT_GATEWAYS.KHALTI) {
          try {
            const store = new Store(new KhaltiPaymentProcessor());
            store.purchaseItem(order);
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.log(error);
      showErrorNotification('Something went wrong');
    }
  };
  const checkCoupon = async () => {
    const http = new HttpService();

    const response: any = await http
      .service()
      .push(`${apiRoutes.coupon.discount}`, {
        code: coupon,
        productVariationId: selectedOption.id,
      });
    if (response.success) {
      setValidCoupon(response.data);
      showSuccessNotification('Coupon applied');
    } else {
      showErrorNotification(response.message);
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
            <Text fw={500}>Provide Details</Text>
          </div>
          {fields.map((field) => {
            return (
              <div key={field.id}>
                {field.type === 'checkbox' ? (
                  <Checkbox
                    label={field.label}
                    required={field.required}
                    placeholder={field.hintText}
                    {...form.getInputProps(`${field.id}`)}
                  />
                ) : (
                  <TextInput
                    placeholder={field.hintText}
                    label={field.label}
                    required={field.required}
                    withAsterisk={field.required}
                    type={field.type}
                    {...form.getInputProps(`${field.id}`)}
                  />
                )}
              </div>
            );
          })}
          <div>
            <TextInput
              className="mr-4"
              label="Coupon code"
              placeholder="Enter Coupon Code"
              description={
                validCoupon &&
                `Rs ${validCoupon.calculatedDiscountAmount} discount applied`
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
            <Text fw={500}>Select a Payment Method</Text>
          </div>

          <div className="flex xs:flex-col  gap-4 ">
            <PaymentCard
              discount={validCoupon?.calculatedDiscountAmount}
              title="Esewa"
              src={'/esewa_logo.png'}
              alt="Esewa logo"
              amount={selectedOption.sellingPrice}
              selectedPaymentOption={
                selectedPaymentOption === PAYMENT_GATEWAYS.ESEWA
              }
              onClick={() => setSelectedPaymentOption(PAYMENT_GATEWAYS.ESEWA)}
            />

            <PaymentCard
              discount={validCoupon?.calculatedDiscountAmount}
              title="Khalti"
              src={'/khalti.png'}
              alt="Khalti logo"
              amount={selectedOption.sellingPrice}
              selectedPaymentOption={
                selectedPaymentOption === PAYMENT_GATEWAYS.KHALTI
              }
              onClick={() => setSelectedPaymentOption(PAYMENT_GATEWAYS.KHALTI)}
            />
            <Button
              type={isLoggedIn ? 'submit' : 'button'}
              onClick={() => {
                if (!isLoggedIn) {
                  router.push(`/login?next=${pathName}`);
                }
              }}
              className="bg-green-500"
            >
              Pay
            </Button>
          </div>
          {/* <div>
            <Link href={`/login?next=${pathName}`}>
              <Button type="button">Login/Register to Proceed</Button>
            </Link>
          </div> */}
        </CardSection>
      </Card>
    </form>
  );
};

export default CustomForm;
