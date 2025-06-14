import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  showHero?: boolean;
};

export default function Layout({ children, showHero = false }: LayoutProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      {showHero && <Hero />}
      <div className='container mx-auto flex-1 py-10'>{children}</div>
      <Footer />
    </div>
  );
}
