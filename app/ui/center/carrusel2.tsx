'use server';

import { fetchCharacters } from "@/app/lib/data";
import HeroCarouselClient from "./carruselClient";
import clsx from 'clsx';


export default async function HeroCarousel(){
  const char = await fetchCharacters();
  return (
    <HeroCarouselClient characters={char} />
  );
}
