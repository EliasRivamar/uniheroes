"use server";
import GridMovies from "@/app/ui/movie_center/movie_grid2";
import { fetchMovies } from "@/app/lib/data";
import { Suspense } from "react";


export default async function MoviesPage({params}:{
    params: Promise<{ id: string}>
}) {
    const {id} = await params;
    const movies = await fetchMovies(id);
    return (
        <main className="grid justify-center">
            <Suspense>
                 <GridMovies movies={movies}></GridMovies>
            </Suspense>
        </main>
    )
}