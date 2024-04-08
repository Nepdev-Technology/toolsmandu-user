'use client';
import { checkLoggedIn } from '@/src/utils/checkLoggedIn';
import { Button, Fieldset, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';

const QuestionAndAnswerForm = () => {
  const isLoggedIn = checkLoggedIn();
  const form = useForm({
    initialValues: {
      question: '',
    },
    validate: {
      question: (value) =>
        value.length < 2 ? 'Question cannot be empty' : null,
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
        <Textarea
          label="Question"
          placeholder="Ask your question"
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

export default QuestionAndAnswerForm;
