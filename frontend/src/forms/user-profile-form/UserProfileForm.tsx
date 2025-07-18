import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, { message: 'Name is required' }),
  addressLine1: z.string().min(1, { message: 'Address line 1 is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: User;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
};

export default function UserProfileForm({
  onSave,
  isLoading,
  currentUser,
}: Props) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });
  const { handleSubmit, control, reset } = form;

  useEffect(() => {
    reset(currentUser);
  }, [currentUser, reset]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSave)}
        className='space-y-4 bg-gray-50 rounded-lg md:p-10'
      >
        <div>
          <h2 className='text-2xl font-bold'>User Profile Form</h2>
          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>
        <FormField
          control={control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className='bg-white' />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col md:flex-row gap-4'>
          <FormField
            control={control}
            name='addressLine1'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className='bg-white' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='city'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className='bg-white' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='country'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className='bg-white' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type='submit' className='bg-orange-500'>
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}
