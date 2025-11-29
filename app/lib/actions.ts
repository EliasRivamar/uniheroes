'use server'
import postgres from 'postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { signIn } from '@/app/pages/api/auth/[...]nextauth'
import { AuthError } from 'next-auth'
import bcrypt from 'bcrypt'
import { signOut } from '@/app/pages/api/auth/[...]nextauth'
import { Characters } from '@/app/lib/definitions'
import { NextResponse } from 'next/server'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''

  if (!query.trim()) return NextResponse.json([])

  try {
    const movies = await sql`
    SELECT * FROM moviess
    WHERE LOWER(title) LIKE ${'%' + query.toLowerCase() + '%'}
    LIMIT 10;
  `
    return NextResponse.json(movies)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error fetching movies' },
      { status: 500 }
    )
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}

const FormSchema = z.object({
  id: z.string(),
  username: z.string({
    invalid_type_error: 'Please complete this field.',
  }),
  email: z.string({
    invalid_type_error: 'Please complete this field.',
  }),
  password: z.string({
    invalid_type_error: 'Please complete this field.',
  }),
  user_image_url: z.string(),
})

const CreateUser = FormSchema.omit({ id: true, user_image_url: true })
const UpdateUser = FormSchema.omit({ id: true, password: true, email: true })

export type State = {
  errors?: {
    username?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string | null
}

export async function createUser(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateUser.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create an Account.',
    }
  }

  // Prepare data for insertion into the database
  const { username, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)
  const image = '/users/user-default.png'
  //tengo que ver si hay que hacer encriptar la password aqui
  // Insert data into the database
  try {
    await sql`
      INSERT INTO users (username, email, password, user_image_url)
      VALUES (${username}, ${email}, ${hashedPassword}, ${image})
    `
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create an Account.',
    }
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/register')
  redirect('/login')
}

interface UpdateUserProps {
  id: string
  username?: string
  user_image_url?: string
}

export async function updateUser({
  id,
  username,
  user_image_url,
}: UpdateUserProps) {
  try {
    if (!id) {
      console.log('No hay id')
      console.log(`ID: ${id}, username: ${username}, image: ${user_image_url}`)
      return { message: 'User ID is required' }
    }

    // armamos dinámicamente qué campos actualizar
    if (username) {
      await sql`
        UPDATE users
        SET username = ${username}
        WHERE user_id = ${id};
      `
    }

    if (user_image_url) {
      await sql`
        UPDATE users
        SET user_image_url = ${user_image_url}
        WHERE user_id = ${id};
      `
    }
  } catch (error) {
    console.error('❌ Error en updateUser:', error)
    return { message: 'Database Error: Failed to update user.' }
  }

  revalidatePath('/protected/profile') // refresca la página de perfil
  return { message: 'User updated successfully.' }
}
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}
