"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { Characters } from "@/app/lib/definitions";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function HeroCarouselClient({ characters }: { characters: Characters[] }) {
  const visibleCount = 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastCharId = localStorage.getItem("lastMainCharId");
      if (lastCharId) {
        const index = characters.findIndex(c => c.id === lastCharId);
        if (index !== -1) {
          const mainCharPosition = 2; // tu mainChar es visibleChars[2]
          setCurrentIndex((index - mainCharPosition + characters.length) % characters.length);
        }
      }
    }
  }, [characters]);


  const handleNext = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length);
  };

  const handlePrev = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % characters.length);
  };

  // Tomar los 3 visibles
  const visibleChars = Array.from({ length: visibleCount }, (_, i) => {
    return characters[(currentIndex + i) % characters.length];
  });

  // posiciones animadas
  const positions = [
    { x: "-25%", y: "30%", scale: 0.85, zIndex: 0, brightness: 0.4}, // izquierda
    { x: "0%", y: "20%", scale: 1, zIndex: 10, brightness: 0.5},   // centro
    { x: "30%", y: "4%", scale: 1.2, zIndex: 20, brightness: 1 },   // derecha
  ];

  const variants = {
    enter: (dir: number) => ({
      x: dir === 1 ? "10%" : "-10%", opacity: 0,
    }),
    center: {
      x: "0%", opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir === 1 ? "-10%" : "10%", opacity: 0,
    }),
  };
  
  const variantsCharacters = {
    enter: (dir: number) => ({
      x: dir===1 ? "80%" : "30%", y: dir===1 ? "0%" : "30%" ,
      opacity: 0 
    }),
  };

  const mainChar = visibleChars[2];

  return (
    <main className="grid grid-cols lg:grid-cols-2 font-ne">
    <div className="grid justify-center min-h-[350px] w-full px-5 text-white text-center">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
          key={`${mainChar.id}-${direction}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{duration: 0.2, ease: 'easeInOut'}}
          >
            <Image
            src={mainChar.title}
            alt={mainChar.id}
            width={900}
            height={900}
            sizes="(max-width: 640px) 450px,
            (max-width: 768px) 600px, 900px"
            priority
            className="object-contain mx-auto aspect-[0/2]"
            />
            <p className="font-neutral text-sm md:text-xl lg:text-xl">{mainChar.description}</p>
            <div className="flex justify-center lg:my-4 z-50">
                    <Link href={{pathname: `/protected/movies/${mainChar.id}`}} onClick={() => localStorage.setItem('lastMainCharId', mainChar.id)}
                     className="bg-[#550303] py-3 mr-14 px-6 font-bold text-sm
                     text-white rounded-xl self-center hover:bg-[#8d0404] transition-all duration-300
                     ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-black hover:shadow-lg
                     active:scale-95">
                    Movies Series
                    </Link>
                    <Link href="/"
                    className="bg-[rgb(34,34,34)] py-3 px-6 font-bold text-sm
                     text-white rounded-xl self-center hover:bg-[rgb(54,54,54)] transition-all duration-300
                     ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-black hover:shadow-lg
                     active:scale-95">
                    Comics
                    </Link>
            </div>
            <p className=" text-xl lg:text-2xl font-bold">{mainChar.phrase}</p>
          </motion.div>
        </AnimatePresence>
    </div>
    <div className="grid font-ne antialiased w-full h-[600px] lg:h-[700px] lg:-mt-0 md:-mt-56">
      <div className="relative">
        <AnimatePresence custom={direction}>
          {visibleChars.map((c, i) => {
            const pos = positions[i];
            return (
              <motion.div
                key={c.id}
                custom={direction}
                variants={variantsCharacters}
                initial="enter" // entra desde la derecha
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  filter: `brightness(${pos.brightness})`,
                  zIndex: pos.zIndex,
                  opacity: 1,
                }}
                exit={{ x: "170%", opacity: 0 }} // se va hacia la derecha
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute"
              >
                <Image
                  src={c.image_url}
                  alt={c.title}
                  width={600}
                  height={600}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="flex justify-between h-[50px] -mt-[130px] lg:-mt-[70px] z-50 px-4 lg:px-0">
        <button onClick={handlePrev} className="bg-[rgba(0,0,0,0.2)] backdrop-blur-sm shadow-xl/50 w-[50px]
         hover:bg-[rgba(34,33,33,0.2)] text-white rounded-full p-2
         transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105
         hover:shadow-black hover:shadow-lg active:scale-95">
          <ArrowLeftIcon />
        </button>
        <button onClick={handleNext} className="bg-[rgba(0,0,0,0.2)] backdrop-blur-sm shadow-xl/50 w-[50px]
         hover:bg-[rgba(34,33,33,0.2)] text-gray-300 rounded-full p-2
         transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105
         hover:shadow-black hover:shadow-lg active:scale-95">
          <ArrowRightIcon />
        </button>
      </div>
    </div>
</main>
  );
}
