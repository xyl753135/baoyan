import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// eg. http://localhost:3001/api/counters/read-counters
export async function GET(request: Request) {
    try {
        const result = await sql`SELECT * 
            FROM Counters;`;
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
}