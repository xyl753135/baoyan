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
    let errString = String(error);

    if (errString.includes('duplicate key value violates unique constraint')) {
      // Handle duplicate key error
      return NextResponse.json(
        { 
            result: {} ,
            error: "Duplicate username, please choose another one."
        }, 
        { 
            status: 409,
            statusText: "Username taken"
        }
      );
    } else if(errString.includes('username and password required')) {
      // Handle other errors
      return NextResponse.json(
        { 
            result: {} ,
            error: errString
        }, 
        { 
            status: 400,
            statusText: "Bad request, params missing"
        }
      );
    } else {
      // Handle other errors
      return NextResponse.json(
        { 
            result: {} ,
            error: errString
        }, 
        { 
            status: 500,
            statusText: "The server encountered an unexpected condition preventing it from fulfilling the request."
        }
      );
    }
  }
}