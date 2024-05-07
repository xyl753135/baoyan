import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  try {
    // Get POST variables
    const { 
        usernameInput,
        emailInput,
        otpInput
    } = await request.json();

    // Select otp
    const selectSQL =
      await sql`SELECT yyyymmdd 
        FROM otp 
        WHERE username = ${usernameInput}
        AND email = ${emailInput}
        AND code = ${otpInput}
        LIMIT 1`;
    console.log(`Search found ${selectSQL.rows} rows`);

    // If no opt, fail
    if (selectSQL.rowCount == 0) {
      return NextResponse.json(
        { 
        }, 
        { 
          status: 400,
          statusText: "Bad Request"
        }
      );
    }

    // If opt expired (older than 1 day), fail
    const expiryDate = selectSQL.rows[0].yyyymmdd;
    const today = new Date();
    const mm = String(today.getUTCMonth()+1).padStart(2, '0');
    const dd = String(today.getUTCDate()).padStart(2, '0');
    const todayDate = `${today.getUTCFullYear()}-${mm}-${dd}`;
    if (todayDate != expiryDate) {
      // Delete expired otp
      const deleteSQL = await sql`DELETE FROM otp 
        WHERE username = ${usernameInput}
        AND email = ${emailInput}
        AND code = ${otpInput}
        AND yyyymmdd = ${expiryDate}`;
      console.log(`Delete removed ${deleteSQL.rowCount} rows`);
      return NextResponse.json(
        { 
        }, 
        { 
          status: 400,
          statusText: "Bad Request"
        }
      );
    }

    // Return success
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