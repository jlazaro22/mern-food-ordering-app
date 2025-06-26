import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Input } from './ui/input';

const formSchema = z.object({
  searchQuery: z
    .string({
      required_error: 'Restaurant name is required',
    })
    .min(1, { message: 'Restaurant name is required' }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeholder: string;
  onReset: () => void;
};

export default function SearchBar({ onSubmit, placeholder, onReset }: Props) {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isDirty, errors },
    reset,
  } = form;

  function handleReset() {
    reset({
      searchQuery: '',
    });

    if (onReset) {
      onReset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 mx-5${
          errors.searchQuery ? ' border-red-500' : ''
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className='ml-1 text-orange-500 hidden md:block'
        />
        <FormField
          control={control}
          name='searchQuery'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  className='border-none shadow-none text-xl focus-visible:ring-0'
                />
              </FormControl>
            </FormItem>
          )}
        />
        {isDirty && (
          <Button
            onClick={handleReset}
            type='button'
            variant='outline'
            className='rounded-full'
          >
            Clear
          </Button>
        )}
        <Button type='submit' className='rounded-full bg-orange-500'>
          Search
        </Button>
      </form>
    </Form>
  );
}
