// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
import { z } from 'zod'


export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type User = {
  user_id: string;
  username: string;
  email: string;
  password: string;
  user_image_url: string;
};

export type UserField = {
  user_id: string;
  username: string;
  email: string;
  user_image_url: string;
};

export type Characters = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  title: string;
  phrase: string;
};
export type Movies = {
  id: string;
  title: string;
  vote_average: string;
  release_date: string;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  tagline: string;
  genres: string;
  trailer: string;
  id_main_char: string;
}
export type CharactersField = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  title: string;
  phrase: string;
}