import { useAuth0 } from '@auth0/auth0-react';
import { CircleUserRound } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Separator } from './ui/separator';

export default function UsernameMenu() {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-2 px-3 font-bold hover:text-orange-500'>
        <CircleUserRound className='text-orange-500' />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='space-y-2'>
        <DropdownMenuItem>
          <Link
            to='/manage-restaurant'
            className='font-bold hover:text-orange-500'
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to='/user-profile' className='font-bold hover:text-orange-500'>
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            className='flex flex-1 font-bold bg-orange-500'
            onClick={() => logout()}
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
