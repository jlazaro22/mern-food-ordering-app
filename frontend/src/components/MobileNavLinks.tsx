import { Link } from 'react-router';
import { Button } from './ui/button';
import { useAuth0 } from '@auth0/auth0-react';

export default function MobileNavLinks() {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to='/user-profile'
        className='flex items-center bg-white font-bold hover:text-orange-500'
      >
        User Profile
      </Link>
      <Button
        className='flex items-center px-3 font-bold hover:bg-gray-500'
        onClick={() => logout()}
      >
        Log Out
      </Button>
    </>
  );
}
