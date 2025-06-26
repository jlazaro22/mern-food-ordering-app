import { useSearchRestaurants } from '@/api/RestaurantApi';
import { useParams } from 'react-router';

export default function SearchPage() {
  const { city } = useParams();
  const { results } = useSearchRestaurants(city);

  return (
    <>
      <div>User searched for "{city}".</div>
      <div>
        {results?.data.map((restaurant, index) => (
          <span key={index}>
            Found: {restaurant.name}, {restaurant.city}
          </span>
        ))}
      </div>
    </>
  );
}
