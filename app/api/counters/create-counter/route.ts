import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// eg. http://localhost:3001/api/counters/create-counter?app=exampleapp&name=examplename&count=0
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const app = searchParams.get('app');
  const name = searchParams.get('name');
  const count = searchParams.get('count');
  const username = searchParams.get('username');

  try {
    if (!app || !name || !count) throw new Error('app, name, and count required');
    const result =
      await sql`INSERT INTO Counters (
        app, 
        name, 
        count,
        username
      ) 
      VALUES (
          ${app}, ${name}, ${count}, ${username}
      );`;
    // result looks like:
    // {"result":{"command":"INSERT","fields":[],"rowAsArray":false,"rowCount":1,"rows":[],"viaNeonFetch":true}}
    return NextResponse.json({ result }, { status: 200, statusText: "OK" });
  } catch (error) {
    // Convert Error object to string to get 'app, name, and count required'
    return NextResponse.json({ result: {} }, { status: 500, statusText: String(error) });
  }
}