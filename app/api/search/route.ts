import postgres from 'postgres';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query')?.toLowerCase() || '';

  if (!query) return NextResponse.json([]);

  try {
    // búsqueda flexible ignorando mayúsculas/minúsculas
    const characters = await sql`
      SELECT id, name
      FROM characters
      WHERE LOWER(name) LIKE ${'%' + query + '%'}
      LIMIT 10;
    `;

    return NextResponse.json(characters);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching characters' }, { status: 500 });
  }
}
