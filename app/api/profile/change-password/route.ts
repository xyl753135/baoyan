import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { hashPassword } from "@/utils/PasswordHasher";


export async function POST(request: Request) {
  try {
    // Get POST variables
    const { username, password } = await request.json();

    // Validate variables
    if (!username || !password) {
      throw new Error('username and password required');
    }

    // Hash pw
    let hash : string = "";
    await hashPassword(password).then((returnedHash) => {
      hash = String(returnedHash);
    });

    // Update DB
    await sql`UPDATE users
        SET pw = ${hash}
        WHERE username = ${username}`;

    return NextResponse.json(
      {
        status: 200,
        statusText: "OK"
      }
    );

  } catch (error) {
    return NextResponse.json(
      {
        error: String(error)
      },
      {
        status: 500,
        statusText: "The server encountered an unexpected condition preventing it from fulfilling the request."
      }
    );
  }
}