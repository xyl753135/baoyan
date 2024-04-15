import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// eg. http://localhost:3001/api/counters/update-counter?app=mantraapp&name=shurangama&count=2
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const app = searchParams.get('app');
  const name = searchParams.get('name');
  const count = searchParams.get('count');
  const username = searchParams.get('username');
 
  try {
    if (!app || !name || !count) throw new Error('app, name, and count required');
    await sql`UPDATE Counters 
      SET count = ${count}
      WHERE app = ${app} 
      AND name = ${name}
      AND username = ${username};`;
  } catch (error) {
    return NextResponse.json(
      { 
        result: {} 
      }, 
      { 
        status: 500, 
        statusText: String(error) 
      });
  }
 
  const result = await sql`SELECT * 
    FROM Counters
    WHERE app = ${app}
    AND name = ${name}
    AND username = ${username};`;
  return NextResponse.json(
    { 
      result 
    }, 
    { 
      status: 200, 
      statusText: "OK" 
    }
  );
}