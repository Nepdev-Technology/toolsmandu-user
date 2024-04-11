'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import {
  showErrorNotification,
  showSuccessNotification,
  showWarningNotification,
} from '@/src/utils/notificationUtils';
import { Button, Fieldset, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const QuestionAndAnswerForm = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const params = useParams<{ id: string }>();

  const form = useForm({
    initialValues: {
      content: '',
    },
    validate: {
      content: (value) =>
        value.length < 2 ? 'Question cannot be empty' : null,
    },
  });

  const handleFormSubmit = async (data: any) => {
    try {
      const http = new HttpService();
      const payload = { ...data, product: +params.id };
      const response: any = await http
        .service()
        .push(`${apiRoutes.qAndA.create}`, payload);
      if (response.success) {
        showSuccessNotification(response.message);
        form.reset();
      } else {
        showWarningNotification(response.message);
      }
    } catch (error) {
      showErrorNotification('Something went wrong');
    }
  };
  return (
    <Fieldset variant="unstyled">
      <form
        className="flex flex-col gap-2"
        onSubmit={form.onSubmit(handleFormSubmit)}
      >
        <Textarea
          label="Question"
          placeholder="Ask your question"
          resize="vertical"
          withAsterisk
          required
          {...form.getInputProps('content')}
        ></Textarea>

        {isLoggedIn ? (
          <Button type="submit">Submit</Button>
        ) : (
          <Link href={'/login'}>
            <Button>Login to continue</Button>
          </Link>
        )}
      </form>
    </Fieldset>
  );
};

export default QuestionAndAnswerForm;
