import type { RestaurantSearchResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useSearchRestaurants(city?: string) {
  async function searchRestaurantsRequest(): Promise<RestaurantSearchResponse> {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}`,
    );

    if (!response.ok) {
      throw new Error('Failed to get restaurants');
    }

    return response.json();
  }

  const { data: results, isLoading } = useQuery({
    queryKey: ['searchRestaurants', city],
    queryFn: searchRestaurantsRequest,
    enabled: !!city,
  });

  return { results, isLoading };
}
