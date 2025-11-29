import '@/app/ui/global.css';
import Search from '@/app/ui/search';
import Background from '../ui/background/marvel';
import HeroCarousel from '@/app/ui/center/carrusel2'
import FloatingMenu from '../ui/center/menu';
import { Suspense } from 'react';

export default async function HomePage(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  return (
    <Background>
      <div className="flex flex-col">
        <div className="justify-center">
          <Suspense>
            <Search placeholder='Search Marvel Heroes...'></Search>
          </Suspense>
        </div>
        <HeroCarousel/>
      </div>
    </Background>
  );
}