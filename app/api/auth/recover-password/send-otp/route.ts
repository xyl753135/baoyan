import { getRandomChar, getRandomInt } from '@/utils/RandomGenerator';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  try {
    // Get POST variables
    const { 
      usernameInput,
      emailInput
    } = await request.json();

    // Check if username and email are a match
    const selectSQL = await sql`SELECT *
      FROM users
      WHERE username = ${usernameInput}
      AND email = ${emailInput}
      LIMIT 1`;
    console.log("selectSQL", selectSQL.rows);
    if (selectSQL.rowCount == 0) {
      return NextResponse.json(
        {
        },
        { 
          status: 400,
          statusText: "Bad Request"
        }
      );
    };

    // Generate otp code
    let code = "";
    for (let i = 0; i < 6; i++) {
      const alphaOrNumeric = getRandomInt(1, 2);
      code = code + (alphaOrNumeric == 1 ? getRandomChar() : getRandomInt(0, 9));
    }
    console.log("code", code);

    // Generate yyyymmdd
    const today = new Date();
    const mm = String(today.getUTCMonth()+1).padStart(2, '0');
    const dd = String(today.getUTCDate()).padStart(2, '0');
    const yyyymmdd = `${today.getUTCFullYear()}-${mm}-${dd}`;

    // INSERT table
    const insertSQL =
      await sql`INSERT INTO otp (username, email, yyyymmdd, code)
        VALUES (
          ${usernameInput},
          ${emailInput},
          ${yyyymmdd},
          ${code}
        )`;
    console.log(`Search found ${insertSQL.rows} rows`);

    // Send email


    // Return result (credentials found or not-found)
    return NextResponse.json(
      { 
      }, 
      { 
        status: 200,
        statusText: "OK"
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