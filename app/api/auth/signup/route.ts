import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next'
import { hashPassword } from "@/utils/PasswordHasher";
 
export async function POST(request: Request) {
  try {
    // Get POST variables
    const { usernameInput, pwInput } = await request.json();
    
    // Validate variables
    if (!usernameInput || !pwInput) {
      throw new Error('username and password required');
    }

    // Hash pw
    let hash : string = "";
    await hashPassword(pwInput).then((returnedHash) => {
      console.log("hash", returnedHash);
      hash = String(returnedHash);
    });

    // Create new user
    const result =
      await sql`INSERT INTO users (
          username, 
          pw, 
          role) 
        VALUES (
          ${usernameInput},
          ${hash},
          'student'
        );`;
    console.log("result", result);

    // Return result (credentials found or not-found)
    return NextResponse.json(
      { 
          result
      }, 
      { 
          status: 200,
          statusText: "OK"
      }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (error.message.includes('duplicate key value violates unique constraint')) {
        // Handle duplicate key error
        return NextResponse.json(
          { 
              result: {} ,
              error: "Duplicate username, please choose another one."
          }, 
          { 
              status: 409, // Conflict status code
              statusText: "此用戶名已被佔用, 請選擇其他用戶名" // Username taken
          }
        );
      } else {
        // Handle other errors
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
  }
}