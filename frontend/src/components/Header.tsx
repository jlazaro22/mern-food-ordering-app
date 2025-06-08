import { Link } from 'react-router';
import MainNav from './MainNav';
import MobileNav from './MobileNav';

export default function Header() {
  return (
    <div className='border-b-2 border-b-orange-500 py-6'>
      <div className='container mx-auto flex items-center justify-between'>
        <Link
          to='/'
          className='text-3xl font-bold tracking-tight text-orange-500'
        >
          MernEats.com
        </Link>
        <div className='md:hidden'>
          <MobileNav />
        </div>
        <div className='hidden md:block'>
          <MainNav />
        </div>
      </div>
    </div>
  );
}
