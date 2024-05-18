import { Flex, Text } from '@mantine/core';
import Image from 'next/image';

interface PaymentCardProps {
  onClick: () => void;
  selectedPaymentOption: boolean;
  src: string;
  alt: string;
  title: string;
  amount: number;
  discount: number | undefined;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  onClick,
  selectedPaymentOption,
  src,
  alt,
  title,
  discount,
  amount,
}) => {
  return (
    <div
      className={`flex justify-between px-2 rounded-lg w-full py-2 hover:cursor-pointer ${
        selectedPaymentOption === true
          ? 'border-2 border-sky-500'
          : 'bg-primary'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between gap-4 flex-1">
        <Flex direction={'row'} wrap={'nowrap'} align={'center'} gap={8}>
          <div>
            <Image src={src} height={24} width={50} alt={alt} />
          </div>
          <Text className="text-textPrimary font-display  text-md font-bold ">
            {title}
          </Text>
        </Flex>

        <div>
          {' '}
          <Text className="text-textSP font-display   text-lg font-bold ">
            Rs&nbsp;{discount ? amount - discount : amount}
          </Text>
          {discount && (
            <Text
              className="text-textMRP font-display  text-sm  "
              td="line-through"
            >
              Rs&nbsp;{amount}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
