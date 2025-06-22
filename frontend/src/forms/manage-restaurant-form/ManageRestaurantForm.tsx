import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import type { Restaurant } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CuisinesSection from './CuisinesSection';
import DetailsSection from './DetailsSection';
import ImageSection from './ImageSection';
import MenuSection from './MenuSection';

const formSchema = z
  .object({
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
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: 'Image is required' }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: 'Either a image Url or a image File must be provided',
    path: ['imageFile'],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

export default function ManageRestaurantForm({
  restaurant,
  onSave,
  isLoading,
}: Props) {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      city: '',
      country: '',
      deliveryPrice: 0,
      estimatedDeliveryTime: 0,
      cuisines: [],
      menuItems: [{ name: '', price: 0 }],
    },
  });
  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const deliveryPriceFormatted = parseFloat(
      restaurant.deliveryPrice.toFixed(2),
    );
    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseFloat(item.price.toFixed(2)),
    }));
    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    reset(updatedRestaurant);
  }, [reset, restaurant]);

  function onSubmit(formDataJson: RestaurantFormData) {
    const formData = new FormData();

    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('deliveryPrice', formDataJson.deliveryPrice.toString());
    formData.append(
      'estimatedDeliveryTime',
      formDataJson.estimatedDeliveryTime.toString(),
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
    });

    if (formDataJson.imageFile) {
      formData.append('imageFile', formDataJson.imageFile);
    }

    onSave(formData);
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
