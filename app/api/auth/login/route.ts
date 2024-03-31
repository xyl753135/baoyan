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
    let foundMatch = false;
    // Username found
    if (result.rows.length > 0) {
      console.log("select'd pw", result.rows[0].pw);
      // Compare hash to pw
      await comparePasswordToHash(pwInput, result.rows[0].pw).then((isSame) => {
        foundMatch = Boolean(isSame);
      });
    } else {
      // Username not found
    }
    console.log("isSame", foundMatch);

    // Update last_login timestamp
    if (foundMatch) {
      const result =
        await sql`UPDATE users
          SET last_login = (to_timestamp(${Date.now()} / 1000.0))
          WHERE username = ${usernameInput}`;
    }

    
    // Return result (credentials found or not-found)
    return NextResponse.json(
      { 
          result
      }, 
      { 
          status: foundMatch == false ? 401 : 200,
          statusText: foundMatch == false ? "Invalid credentials" : "OK"
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