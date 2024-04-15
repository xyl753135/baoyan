import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// eg. http://localhost:3001/api/transfer-of-merit/query
export async function POST(request: Request) {
    // Get POST variables
    const { username, date, limit } = await request.json();

    const query =
        await sql`SELECT pk, author, yyyymmdd, source, text 
            FROM merits
            WHERE username = ${username}
            AND yyyymmdd = ${date}
            LIMIT ${limit};`;
    console.log("query.rows", query.rows);
    const results = query.rows;

    return NextResponse.json(
        {
            results
        },
        {
            status: 200,
            statusText: "OK"
        }
    );
}

