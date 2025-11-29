//TENGO QUE IR CHEQUEANDO SEGUN VAYA NECESITANDO HACER PEDIDOS A LA BASE DE DATOS
'use server';
import postgres from 'postgres';
import { Characters, User, Movies } from '@/app/lib/definitions';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchUser(id: string) {
  try {
    const data = await sql<User[]>`
    SELECT
    user_id,
    username,
    user_image_url
    FROM users
    WHERE user_id = ${id}`;
    return data;
  } catch(err) {
    console.error('Database Error:', err);
    throw new Error("Failed to fetch all users.");
  }
}


export async function fetchMovies(id: string) {
  try {
    const data = await sql<Movies[]>`
    SELECT
    id,
    title,
    vote_average,
    release_date,
    backdrop_path,
    overview,
    poster_path,
    tagline,
    genres,
    trailer,
    id_main_char
    FROM moviess
    WHERE id_main_char = ${id}`;
    return data;
  } catch(err) {
    console.error('Database Error:', err);
    throw new Error("Failed to fetch all movies.");
  }
}

export async function fetchMoviesFiltered(
  query: string
) {
  try{
    const movies = await sql<Movies[]>`
    SELECT id, title
    FROM moviess
    WHERE moviess.title ILIKE ${`%${query}%`}`;
    return movies;
  } catch(err) {
    console.error('Database Error', err);
    throw new Error("Failed to fetch filtered movies")
  }
}

export async function fetchCharacters() {
  try {
    const data = await sql<Characters[]>`
      SELECT
        id,
        name,
        description,
        image_url,
        title,
        phrase
      FROM characters`;
    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all characters.');
  }
}
