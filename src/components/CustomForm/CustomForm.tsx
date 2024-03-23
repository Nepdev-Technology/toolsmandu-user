import { useForm } from '@mantine/form';

export enum InputTypes {
  TEXT = 'text', // eslint-disable-line no-unused-vars
  NUMBER = 'number', // eslint-disable-line no-unused-vars
  PASSWORD = 'password', // eslint-disable-line no-unused-vars
  EMAIL = 'email', // eslint-disable-line no-unused-vars
}
interface Fields {
  label: string;
  hintText: string;
  type: InputTypes;
  required: boolean;
}
interface ICustomFormProps {
  fields: Fields[];
  onSubmit: (values: any) => void;
  initialValues?: any;
}

const CustomForm = ({ fields, onSubmit, initialValues }: ICustomFormProps) => {
  const form = useForm({
    initialValues: {},
  });
  return <form></form>;
};

export default CustomForm;
