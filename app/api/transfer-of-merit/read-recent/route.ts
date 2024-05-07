import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// eg. http://localhost:3001/api/transfer-of-merit/read-recent
export async function POST(request: Request) {
    // Get POST variables
    const { limit } = await request.json();

    const query =
        await sql`SELECT pk, author, yyyymmdd, source, text 
            FROM merits
            ORDER BY yyyymmdd desc
            LIMIT ${limit};`;
    // console.log("query.rows", query.rows);
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

