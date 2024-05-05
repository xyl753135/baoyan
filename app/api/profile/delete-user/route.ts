import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    // Get POST variables
    const { 
      usernameInput
    } = await request.json();

    // Validate variables
    // TODO
    console.log("usernameInput",usernameInput);

    const selectUsersSQL =
      await sql`SELECT * 
        FROM users
        WHERE username = ${usernameInput}
        LIMIT 1`;
    console.log(`Search found`, selectUsersSQL.rows);

    const insertUsersSQL =
      await sql`INSERT INTO DeletedUsers (
        username,
        name,
        bname,
        line,
        whatsapp,
        wechat,
        email,
        phone,
        role
      ) VALUES (
        ${usernameInput},
        ${selectUsersSQL.rows[0].name},
        ${selectUsersSQL.rows[0].bname},
        ${selectUsersSQL.rows[0].line},
        ${selectUsersSQL.rows[0].whatsapp},
        ${selectUsersSQL.rows[0].wechat},
        ${selectUsersSQL.rows[0].email},
        ${selectUsersSQL.rows[0].phone},
        ${selectUsersSQL.rows[0].role}
      );`;
    console.log(`Insert added ${insertUsersSQL.rows} rows`);
    
    const deleteUsersSQL =
      await sql`DELETE FROM users
        WHERE username = ${usernameInput}`;
    console.log(`Delete removed`, deleteUsersSQL.rows);

    cookies().set("session", "", { expires: new Date(0) });

    const deleteCountersSQL = 
      await sql`DELETE FROM counters
        WHERE username = ${usernameInput}`;
    console.log(`Delete removed`, deleteCountersSQL.rows);

    const deleteMeritsSQL = 
      await sql`DELETE FROM merits
        WHERE username = ${usernameInput}`;
    console.log(`Delete removed`, deleteMeritsSQL.rows);

    return NextResponse.json(
      { 
        rows: insertUsersSQL.rows
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
          status: 400,
          statusText: "The server encountered an unexpected condition preventing it from fulfilling the request."
      }
    );
  }
}