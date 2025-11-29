import NextAuth from 'next-auth';
import { authConfig } from '../../../../auth.config';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';


declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    username: string;
    profile_pic: string;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      profile_pic: string;
    }
  }

  interface JWT {
    id: string;
    email: string;
    username: string;
    profile_pic: string;
  }
}

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email:string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials, req): Promise<any> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
          if (!parsedCredentials.success) return null;
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          console.log("User found", user);
          if (!user) {
            console.log("User not found");
            return null;
          };
          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log("Password Match: ", passwordMatch)
          if (passwordMatch) return {
            id: user.user_id,
            email: user.email,
            username: user.username,
            profile_pic: user.user_image_url,
          };
        },
    }),
],
callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
        token.username = user.username
        token.profile_pic = user.profile_pic
      };
      return token;
    },
    session({ session, token }) {
      if (session.user) {
      session.user.id = token.id as string
      session.user.username = token.username as string
      session.user.profile_pic = token.profile_pic as string
      };
      return session;
    },
  },
  session: { strategy: "jwt"}
});
