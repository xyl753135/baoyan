import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// eg. http://localhost:3001/api/counters/update-counter
export async function POST(request: Request) {
  const { app, name, count, username } = await request.json();
 
  try {
    if (!app || !name || count == undefined || count == null || count < 0) {
      throw new Error(`api/counters/update-counter: app, name, and count required - received ${app}, ${name}, ${count}`);
    }
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