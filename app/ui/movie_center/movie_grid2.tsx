"use client";
import { Movies } from "@/app/lib/definitions";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function GridMovies({ movies }: { movies: Movies[] }) {
  const [selectedMovie, setSelectedMovie] = useState<Movies | null>(null);
  const [currentMovie, setCurrentMovie] = useState<Movies | null>(null);
  const [currentDirection, setCurrentDirection] = useState(0); // 1 para siguiente, -1 para anterior
  
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

      useEffect(() => {
  if (selectedMovie) {
    // 🔒 Bloquear scroll cuando la card está abierta
    document.body.style.overflow = "hidden";
  } else {
    // 🔓 Restaurar scroll cuando se cierra
    document.body.style.overflow = "auto";
  }

  // Limpieza por seguridad
  return () => {
    document.body.style.overflow = "auto";
  };
}, [selectedMovie]);

  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  

  return (
    <main className="grid font-ne">
      {currentMovie && (
        <div className="relative grid h-[210px] w-auto lg:h-[450px] lg:w-[1307px] overflow-hidden z-0">
            {/* <div className="absolute h-[300px] w-[500px] lg:h-[900px] lg:w-[1400px] bg-red-800 left-9 z-0"/> */}
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${currentMovie.trailer}?autoplay=1&mute=1&start=20&controls=0&modestbranding=1&playlist=${currentMovie.trailer}&showinfo=0&disablekb=1`}
                    allow="autoplay; encrypted-media"
                    className="absolute pointer-events-none hidden lg:block lg:-top-60 lg:left-9 lg:h-[900px] lg:w-[1400px] z-0"
                >
                </iframe>
                {/* PHONE CARROUSEL */}
                <motion.div className="lg:hidden relative w-full h-[210px] overflow-hidden">
                  <AnimatePresence initial={false} custom={currentDirection}>
                    {currentMovie && (
                      <motion.div
                        key={currentMovie.id}
                        className="absolute w-full h-full"
                        custom={currentDirection}
                        variants={{
                          enter: (direction: number) => ({
                            x: direction > 0 ? "100%" : "-100%",
                            opacity: 0,
                          }),
                          center: { x: 0, opacity: 1 },
                          exit: (direction: number) => ({
                            x: direction > 0 ? "-100%" : "100%",
                            opacity: 0,
                          }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "tween", duration: 0.5 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(_, info) => {
                          const index = movies.findIndex((m) => m.id === currentMovie.id);
                          if (info.offset.x < -100) {
                            setCurrentDirection(1);
                            setCurrentMovie(movies[(index + 1) % movies.length]);
                          } else if (info.offset.x > 100) {
                            setCurrentDirection(-1);
                            setCurrentMovie(
                              movies[(index - 1 + movies.length) % movies.length]
                            );
                          }
                        }}
                        onClick={() => setSelectedMovie(currentMovie)}
                      >
                        {/* Imagen de fondo */}
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${currentMovie.backdrop_path}`}
                          alt={currentMovie.title}
                          fill
                          className="object-cover rounded-[20px] p-3"
                        />

                        {/* Gradiente y contenedor de texto */}
                        <div className="absolute inset-0 flex flex-col justify-end rounded-[20px] p-4 bg-gradient-to-t from-black/80 via-black/50 to-black/0">
                          <h1 className="text-white text-xl font-bold text-center leading-snug">
                            {currentMovie.title}
                          </h1>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
            <div className="lg:pl-9 lg:flex w-[100%] lg:w-[50%] lg:h-[450px] relative z-20 lg:bg-gradient-to-r from-black/100 via-black/70 to-black/2 hidden">
            <Image
              src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
              alt={currentMovie.title}
              width={170}
              height={100}
              className="hidden lg:block object-cover rounded-xl z-20 ml-9 -mt-14 self-center"
              >
              </Image>
            <div className="flex flex-col-reverse lg:flex-col lg:text-start lg:pl-5 lg:mt-16 lg:gap-2 w-full lg:w-[50%] text-center text-white">
              <h1 className="font-bold hidden lg:block lg:text-2xl">{currentMovie.title}</h1>
              <h2 className = "font-normal hidden lg:block text-sm">{currentMovie.release_date}</h2>
              <h2 className = "font-normal hidden lg:block text-sm">{currentMovie.overview}</h2>
            </div>
            </div>
        </div>
        )}
      <h1 className="text-white pl-4 lg:text-3xl font-bold">Movies</h1>

      {/* Grid de cards */}
      <ul className="grid grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-x-4 lg:gap-y-7 m-3 lg:mx-8">
        {movies.map((m) => (
          <motion.li
  key={m.id}
  layoutId={`card-${m.id}`}
  className="relative group cursor-pointer"
  onClick={() => setSelectedMovie(m)}
>
  <motion.div
    layoutId={`img-${m.id}`}
    whileHover={{ scale: 1.05 }}
    className="rounded-xl overflow-hidden shadow-xl shadow-gray-500/50"
    style={{ transformOrigin: "center center" }}
  >
    <Image
      src={`https://image.tmdb.org/t/p/w500${m.backdrop_path}`}
      alt={m.title}
      width={350}
      height={350}
      className="hidden lg:block object-cover mx-auto"
    />
    <Image
      src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
      alt={m.title}
      width={350}
      height={350}
      className="lg:hidden block object-cover mx-auto"
    />
  </motion.div>
              <div className="hidden lg:block absolute bottom-5 lg:-bottom-[29px] lg:left-1/2 lg:-translate-x-1/2 w-full bg-black/40 text-white lg:text-sm p-2 text-center opacity-0 group-hover:opacity-100 transition rounded-b-xl z-[-1]">
                {m.title}
              </div>
          </motion.li>
        ))}
      </ul>

      {/* Overlay + Card expandida */}
      <AnimatePresence>
        {selectedMovie && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMovie(null)} // 👈 cerrar al clickear fondo
            />

            {/* Card expandida */}
            <motion.div
            layoutId={`card-${selectedMovie.id}`}
            className="fixed inset-0 m-auto lg:w-[800px] lg:h-[600px] w-[90%] h-[70%] rounded-2xl bg-black/70 z-50 overflow-hidden cursor-pointer"
            onClick={() => setSelectedMovie(null)}
            style={{ transformOrigin: "center center" }}
            transition={{
              layout: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
            }}
            >
            <motion.img
              layoutId={`img-${selectedMovie.id}`}
              src={`https://image.tmdb.org/t/p/w780${selectedMovie.backdrop_path}`}
              alt={selectedMovie.title}
              className="w-full h-[40%] lg:h-[330px] object-cover"
              transition={{
              layout: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
            }}
            />
            {/* Contenido */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="px-6 py-3 text-white space-y-3"
            >
              <h1 className="text-2xl font-bold">{selectedMovie.title}</h1>
              <p className="text-sm opacity-80">{selectedMovie.release_date}</p>
              <p className="text-sm leading-relaxed">{selectedMovie.overview}</p>
            </motion.div>
          </motion.div>

                    </>
                  )}
                </AnimatePresence>
              </main>
  );
}