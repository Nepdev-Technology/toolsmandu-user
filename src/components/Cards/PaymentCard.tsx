import { Flex, Text } from '@mantine/core';

interface PaymentCardProps {
  onClick: () => void;
  selectedPaymentOption: boolean;
  src: string;
  alt: string;
  title: string;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  onClick,
  selectedPaymentOption,
  src,
  alt,
  title,
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
      <div className="flex gap-4 flex-1">
        <Flex direction={'row'} wrap={'nowrap'} align={'center'} gap={8}>
          <div>
            <img src={src} height={'24px'} width={'50px'} alt={alt} />
          </div>
          <Text className="text-textPrimary font-display  text-md font-bold ">
            {title}
          </Text>
        </Flex>
      </div>
    </div>
  );
};

export default PaymentCard;
