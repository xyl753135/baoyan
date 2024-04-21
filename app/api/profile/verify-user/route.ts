import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { comparePasswordToHash } from "@/utils/PasswordHasher";

export async function POST(request: Request) {
  try {
    // Get POST variables
    const { username, password } = await request.json();

    // Validate variables
    if (!username || !password) {
      throw new Error('username and password required');
    }

    // Select table users, column *
    const query = await sql`SELECT * FROM users WHERE username = ${username} LIMIT 1;`;

    let code = 0;
    let pwMatchHash = false;
    if (query.rows.length > 0) {
      await comparePasswordToHash(password, query.rows[0].pw).then((isSame) => {
        pwMatchHash = Boolean(isSame);
        code = 200;
      });
    } else {
      code = 401;
    }
    // Return result (credentials found or not-found)
    return NextResponse.json(
      {
        verified: pwMatchHash
      },
      {
        status: code,
        statusText: code == 401 ? "Verification failed" : "OK"
      }
    );

  } catch (error) {
    // console.error(error);
    // Return result (server error)
    return NextResponse.json(
      {
        verified: false,
        error: String(error)
      },
      {
        status: 500,
        statusText: "The server encountered an unexpected condition preventing it from fulfilling the request."
      }
    );
  }
}