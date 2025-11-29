"use client";
import { Movies } from "@/app/lib/definitions";
import Image from "next/image";
import '@/app/ui/global.css';
import { useEffect, useState } from "react";

export default function GridMovies({movies}: {movies: Movies[]}){
    const [currentMovie, setCurrentMovie] = useState<Movies | null>(null);

    useEffect(() => {
        if(!currentMovie) {
            const randomIndex = Math.floor(Math.random() * movies.length);
            setCurrentMovie(movies[randomIndex])
        }
        const timer = setTimeout(() => {
            const randomIndex =Math.floor(Math.random() * movies.length);
            setCurrentMovie(movies[randomIndex])
        }, 45000);
        return() => clearTimeout(timer)
    }, [currentMovie, movies]);

const randomIndex = Math.floor(Math.random() * movies.length);
const randomMovie = movies[randomIndex];

    return(
        <main className="grid font-ne">
            {currentMovie && (
            <div className="relative grid lg:h-[450px] lg:w-[1307px] overflow-hidden z-0">
                <div className="absolute lg:h-[900px] lg:w-[1400px] bg-red-800 left-9 z-0"/>
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${currentMovie.trailer}?autoplay=1&mute=1&start=20&controls=0&modestbranding=1&playlist=${currentMovie.trailer}&showinfo=0&disablekb=1`}
                        allow="autoplay; encrypted-media"
                        className="absolute pointer-events-none lg:-top-60 lg:left-9 lg:h-[900px] lg:w-[1400px] z-0"
                    >
                    </iframe>
                    
                <div className="pl-9 grid grid-cols-2 w-[50%] relative z-20 bg-gradient-to-r from-black/100 via-black/70 to-black/2">
                <Image
                src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                alt={currentMovie.title}
                width={150}
                height={150}
                sizes="(max-width: 1500px) 900px,
                (max-width: 900px) 600px, 900px"
                className="hidden lg:block object-cover ml-8 mt-14 rounded-xl shadow-xl z-20"
                ></Image>
                <h1 className="absolute text-white font-bold text-3xl lg:mt-20 left-60">{currentMovie.title}</h1>
                <h2 className = "absolute text-white font-bold text-sm lg:mt-14 left-60">{currentMovie.release_date}</h2>
                <h2 className = "absolute text-white font-normal text-sm lg:mt-32 left-60">{currentMovie.overview}</h2>
                </div>
            </div>
            )}
            <div>
                <a className="text-white pl-8 lg:text-3xl font-bold">Movies</a>
                <ul className="grid grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-x-4 lg:gap-y-7 m-3 lg:mx-8">
                    {movies.map((m) => (
                        <li key={m.title} className="relative group z-0 hover:z-10">
                            <button className="w-full transition-transform duration-300 transform hover:scale-110">
                                <Image
                                src={`https://image.tmdb.org/t/p/w500${m.backdrop_path}`}
                alt={m.title}
                width={350}
                height={350}
                sizes="(max-width: 1500px) 900px,
                (max-width: 900px) 600px, 900px"
                priority
                className="hidden lg:block object-cover mx-auto rounded-xl shadow-xl shadow-gray-500/50"
                />
                <Image
                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                alt={m.title}
                width={350}
                height={350}
                sizes="(max-width: 1500px) 900px,
                (max-width: 900px) 600px, 900px"
                priority
                className="lg:hidden block object-cover mx-auto rounded-xl shadow-xl shadow-gray-500/50"
                />
                <div className="hidden lg:block absolute bottom-0 lg:-bottom-[26px] lg:left-1/2 lg:-translate-x-1/2 w-full bg-black/40 text-white lg:text-sm p-2 text-center opacity-0 group-hover:opacity-100 transition rounded-b-xl z-[-1]">
                {m.title}
                </div>
                
                </button>
                </li>
            ))}
            </ul>

            </div>
        </main>
    )
}