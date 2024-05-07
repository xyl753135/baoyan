import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// eg. http://localhost:3001/api/leaderboard/counters
export async function POST(request: Request) {

    try {
        // eg. select * from counters order by CAST(count AS Numeric(10,0)) desc limit 3 offset 1
        const orderedCounters = await sql`SELECT * 
            FROM Counters 
            WHERE app = 'mantraapp'
            AND name = 'shurangama'
            ORDER BY CAST(count AS Numeric(10,0)) desc;`;
        
        return NextResponse.json(
            { 
                counters: orderedCounters.rows
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