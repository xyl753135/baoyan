import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { comparePasswordToHash } from "@/utils/PasswordHasher";
 
export async function POST(request: Request) {
  try {
    // Get POST variables
    const { usernameInput, pwInput } = await request.json();
    
    // Validate variables
    if (!usernameInput || !pwInput) {
      throw new Error('username and password required');
    }

    // Select table users, column *
    const result =
      await sql`SELECT * 
        FROM users
        WHERE username = ${usernameInput}
        LIMIT 1;`;
    console.log("result.rows", result.rows);
    let success = false;
    // Username found
    if (result.rows.length > 0) {
      console.log("select'd pw", result.rows[0].pw);
      // Compare hash to pw
      await comparePasswordToHash(pwInput, result.rows[0].pw).then((isSame) => {
        success = Boolean(isSame);
      });
    } else {
      // Username not found
    }
    
    // Return result (credentials found or not-found)
    console.log("isSame", success);
    return NextResponse.json(
      { 
          result
      }, 
      { 
          status: success == false ? 401 : 200,
          statusText: success == false ? "Invalid credentials" : "OK"
      }
    );

  } catch (error) {
    console.error(error);
    // Return result (server error)
    return NextResponse.json(
      { 
          result: {} ,
          error: String(error)
      }, 
      { 
          status: 500,
          statusText: "The server encountered an unexpected condition preventing it from fulfilling the request."
      }
    );
  }
}