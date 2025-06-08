import Header from '@/components/Header';
import Hero from '@/components/Hero';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Hero />

      <div className='container mx-auto flex-1 py-10'>{children}</div>

      {/* <Footer /> */}
    </div>
  );
}
