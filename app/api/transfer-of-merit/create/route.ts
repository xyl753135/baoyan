import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// eg. http://localhost:3001/api/transfer-of-merit/
export async function POST(request: Request) {
    try {
        // Get POST variables
        const { username,
            source,
            yyyymmdd,
            text } = await request.json();

        const query = await sql`SELECT bname, name
        FROM users
        WHERE username = ${username}
        LIMIT 1;`;
        // Check if user exists
        if (!query || query.rows.length == 0) {
            return NextResponse.json(
                {
                    updatedRows: {}
                },
                {
                    status: 401,
                    statusText: "Invalid credentials"
                }
            );
        }

        // Get author (bname > name > username)
        let bname = query.rows[0].bname;
        let name = query.rows[0].name;
        let author = "";
        if (bname == "") {
            if (name == "") {
                author = username;
            } else {
                author = name;
            }
        } else {
            author = bname;
        }

        // Insert new merit
        const insert =
            await sql`INSERT INTO merits (
            username, 
            author, 
            source, 
            yyyymmdd, 
            text)
        VALUES (
            ${username},
            ${author},
            ${source},
            ${yyyymmdd},
            ${text});`;

        return NextResponse.json(
            {
                insertedRows: insert.rowCount
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
                result: {},
                error: String(error)
            },
            {
                status: 500,
                statusText: "The server encountered an unexpected condition preventing it from fulfilling the request."
            }
        );
    }
}

