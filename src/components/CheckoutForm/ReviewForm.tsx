'use client';
import { checkLoggedIn } from '@/src/utils/checkLoggedIn';
import { Button, Fieldset, Rating, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { usePathname } from 'next/navigation';

const ReviewForm = () => {
  const isLoggedIn = checkLoggedIn();
  const pathName = usePathname();
  const form = useForm({
    initialValues: {
      rating: 1,
      review: '',
    },
    validate: {
      review: (value) => (value.length < 2 ? 'Rating cannot be empty' : null),
      rating: (value) => (value == 0 ? 'Review of 1 is required' : null),
    },
  });

  const handleFormSubmit = (e: any) => {
    console.log(e);
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
          placeholder="Your review"
          resize="vertical"
          {...form.getInputProps('review')}
        ></Textarea>

        <Button type="submit" disabled={isLoggedIn}>
          Submit
        </Button>
      </form>
    </Fieldset>
  );
};

export default ReviewForm;
