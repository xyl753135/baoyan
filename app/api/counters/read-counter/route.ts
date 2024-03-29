import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// eg. http://localhost:3001/api/counters/read-counter?app=mantraapp&name=shurangama
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const app = searchParams.get('app');
    const name = searchParams.get('name');

    try {
        if (!app || !name) throw new Error('app, name required');
    } catch (error) {
        return NextResponse.json(
            {
                result: {}
            }, 
            {
                status: 500, 
                statusText: String(error)
            }
        );
    }

    const counters = await sql`SELECT * 
        FROM Counters
        WHERE app = ${app}
        AND name = ${name};`;
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