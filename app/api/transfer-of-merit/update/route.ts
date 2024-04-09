import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// eg. http://localhost:3001/api/counters/read-counter?app=mantraapp&name=shurangama
export async function POST(request: Request) {
    // Get POST variables
    const { meritId, meritText } = await request.json();

    const update =
        await sql`UPDATE merits
            SET text = ${meritText}
            WHERE pk = ${meritId}`;

    return NextResponse.json(
        {
            updatedRows: update.rowCount
        },
        {
            status: 200,
            statusText: "OK"
        }
    );
}

