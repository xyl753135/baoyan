import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// eg. http://localhost:3001/api/counters/increment-counter
export async function POST(request: Request) {
  const { app, name, count, username } = await request.json();

  // Validate params
  try {
    if (!app || !name || count == undefined || count == null) {
      throw new Error(`api/counters/increment-counter: app, name, and count required - received ${app}, ${name}, ${count}`);
    }
  } catch (error) {
    return NextResponse.json(
      {
        result: {}
      },
      {
        status: 500,
        statusText: String(error)
      }
    );
  }

  // Update count
  const result = await sql`SELECT * 
    FROM Counters
    WHERE app = ${app}
    AND name = ${name}
    AND username = ${username}
    LIMIT 1;`;
  const originalCount = result.rows[0].count;
  console.log("originalCount", originalCount);
  console.log("count", count);
  try {
    await sql`UPDATE Counters 
      SET count = ${Number(originalCount) + Number(count)}
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
      }
    );
  }

  result.rows[0].count = originalCount + count;
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