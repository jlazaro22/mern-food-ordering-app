import type { Restaurant } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useGetMyRestaurant() {
  const { getAccessTokenSilently } = useAuth0();

  async function getMyRestaurantRequest(): Promise<Restaurant> {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get restaurant');
    }

    return response.json();
  }

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ['fetchMyRestaurant'],
    queryFn: getMyRestaurantRequest,
  });

  return { restaurant, isLoading };
}

export function useCreateMyRestaurant() {
  const { getAccessTokenSilently } = useAuth0();

  async function createMyRestaurantRequest(
    restaurantFormData: FormData,
  ): Promise<Restaurant> {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error('Failed to create restaurant');
    }

    return response.json();
  }

  const {
    mutate: createRestaurant,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: createMyRestaurantRequest,
  });

  if (isSuccess) {
    toast.success('Restaurant created successfully');
  }

  if (error) {
    toast.error('Failed to create restaurant');
  }

  return { createRestaurant, isPending };
}

export function useUpdateMyRestaurant() {
  const { getAccessTokenSilently } = useAuth0();

  async function updateMyRestaurantRequest(
    restaurantFormData: FormData,
  ): Promise<Restaurant> {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error('Failed to update restaurant');
    }

    return response.json();
  }

  const {
    mutate: updateRestaurant,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: updateMyRestaurantRequest,
  });

  if (isSuccess) {
    toast.success('Restaurant updated successfully');
  }

  if (error) {
    toast.error('Failed to update restaurant');
  }

  return { updateRestaurant, isPending };
}
