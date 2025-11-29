import bcrypt from 'bcrypt';
import postgres from 'postgres';
import {users, characters } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE PRIMARY KEY,
      password TEXT NOT NULL,
      user_image_url VARCHAR(100)
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (user_id, username, email, password, user_image_url)
        VALUES (${user.user_id}, ${user.username}, ${user.email}, ${hashedPassword}, ${user.user_image_url})
        ON CONFLICT (id) DO NOTHING;
        ON CONFLICT (email) DO NOTHING;
      `;
    }),
  );
  return insertedUsers;
}

async function seedCharacters() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS characters (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      description VARCHAR(10000) NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      title VARCHAR(200) NOT NULL,
      phrase VARCHAR(200) NOT NULL
    );
  `;

  const insertedCharacters = await Promise.all(
    characters.map(
      (character) => sql`
      INSERT INTO characters (id, name, description, image_url, title, phrase)
      VALUES (${character.id}, ${character.name}, ${character.description}, ${character.image_url}, ${character.title}, ${character.phrase})
      ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCharacters;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedCharacters(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
