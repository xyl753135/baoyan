import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// eg. http://localhost:3001/api/counters/read-counter?app=mantraapp&name=shurangama
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const app = searchParams.get('app');
    const name = searchParams.get('name');
    const username = searchParams.get('username');

    try {
        if (!app || !name) throw new Error('app, name required');
    } catch (error) {
        return NextResponse.json(
            {
                counters: { rows: [] }
            }, 
            {
                status: 500, 
                statusText: String(error)
            }
        );
    }

    let counters = await sql`SELECT * 
        FROM Counters
        WHERE app = ${app}
        AND name = ${name}
        AND username = ${username};`;

    if (counters.rowCount == 0) {
        await sql`INSERT INTO Counters (
            app, 
            name, 
            count,
            username
        ) 
        VALUES (
            ${app}, ${name}, ${0}, ${username}
        );`;
    }

    counters = await sql`SELECT * 
        FROM Counters
        WHERE app = ${app}
        AND name = ${name}
        AND username = ${username};`;

    return NextResponse.json(
        { 
            counters 
        }, 
        { 
            status: 200,
            statusText: "OK"
        }
    );
}