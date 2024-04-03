import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { comparePasswordToHash } from "@/utils/PasswordHasher";
import { encrypt } from '@/utils/AuthHelper';
import { cookies } from "next/headers";
 
export async function POST(request: Request) {
  try {
    // Get POST variables
    const { usernameInput, pwInput } = await request.json();
    
    // Validate variables
    if (!usernameInput || !pwInput) {
      throw new Error('username and password required');
    }

    // Select table users, column *
    const query =
      await sql`SELECT * 
        FROM users
        WHERE username = ${usernameInput}
        LIMIT 1;`;
    console.log("query.rows", query.rows);
    let foundMatch = false;
    // Username found
    if (query.rows.length > 0) {
      console.log("select'd pw", query.rows[0].pw);
      // Compare hash to pw
      await comparePasswordToHash(pwInput, query.rows[0].pw).then((isSame) => {
        foundMatch = Boolean(isSame);
      });
    } else {
      // Username not found
    }
    console.log("isSame", foundMatch);
    
    let updateResult = {};
    if (foundMatch) {
      // Update last_login timestamp
      updateResult =
        await sql`UPDATE users
          SET last_login = (to_timestamp(${Date.now()} / 1000.0))
          WHERE username = ${usernameInput}`;
      console.log("updateResult", updateResult);

      // Create the session
      const expires = new Date(Date.now() + 10 * 1000);
      const session = await encrypt({ user: query.rows[0], expires });
      // Save the session in a cookie
      cookies().set("session", session, { expires, httpOnly: true });
    }
    
    // Return result (credentials found or not-found)
    return NextResponse.json(
      { 
        updateResult
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