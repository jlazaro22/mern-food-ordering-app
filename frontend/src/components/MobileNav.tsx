import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='text-orange-500' />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className='space-y-3'>
          <SheetTitle>
            <span>Welcome to MernEats.com!</span>
          </SheetTitle>
          <Separator />
          <SheetDescription className='flex'>
            <Button className='flex-1 font-bold bg-orange-500'>Log In</Button>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
