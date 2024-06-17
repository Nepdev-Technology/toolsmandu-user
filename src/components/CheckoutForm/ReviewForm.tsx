'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import {
  showErrorNotification,
  showSuccessNotification,
  showWarningNotification,
} from '@/src/utils/notificationUtils';
import { Button, Fieldset, Rating, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const ReviewForm = ({
  isLoggedIn,
  productId,
}: {
  isLoggedIn: boolean;
  productId: number;
}) => {
  // const params = useParams<{ id: string }>();
  const form = useForm({
    initialValues: {
      rating: 1,
      content: '',
    },
    validate: {
      content: (value) => (value.length < 2 ? 'Rating cannot be empty' : null),
      rating: (value) => (value == 0 ? 'Review of 1 is required' : null),
    },
  });

  const handleFormSubmit = async (data: any) => {
    try {
      const http = new HttpService();
      const payload = { ...data, product: productId };
      console.log(payload);
      const response: any = await http
        .service()
        .push(`${apiRoutes.review.create}`, payload);
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
        <div>
          <p>Your rating</p>
          <Rating {...form.getInputProps('rating')} />
        </div>
        <Textarea
          label="Review"
          placeholder="Your content"
          resize="vertical"
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

export default ReviewForm;
