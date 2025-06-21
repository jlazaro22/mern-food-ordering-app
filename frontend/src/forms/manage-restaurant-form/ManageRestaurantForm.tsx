import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CuisinesSection from './CuisinesSection';
import DetailsSection from './DetailsSection';
import ImageSection from './ImageSection';
import MenuSection from './MenuSection';

const formSchema = z.object({
  name: z.string({
    required_error: 'Restaurant name is required',
  }),
  city: z.string({
    required_error: 'City is required',
  }),
  country: z.string({
    required_error: 'Country is required',
  }),
  deliveryPrice: z.coerce.number({
    required_error: 'Delivery price is required',
    invalid_type_error: 'Delivery price must be a valid number',
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: 'Estimated delivery time is required',
    invalid_type_error: 'Estimated delivery time must be a valid number',
  }),
  cuisines: z.array(z.string()).nonempty({
    message: 'Please select at least one item',
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, 'Menu item name is required'),
      price: z.coerce.number().min(1, 'Menu item price is required'),
    }),
  ),
  imageFile: z.instanceof(File, { message: 'Image is required' }),
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: RestaurantFormData) => void;
  isLoading: boolean;
};

export default function ManageRestaurantForm({ onSave, isLoading }: Props) {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: '', price: 0 }],
    },
  });
  const { handleSubmit, control, reset } = form;

  function onSubmit(formDataJson: RestaurantFormData) {
    // Todo: convert formDataJson to a new FormData object
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-8 bg-gray-50 p-10 rounded-lg'
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
      </form>
    </Form>
  );
}
