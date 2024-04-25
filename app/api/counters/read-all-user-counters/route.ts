import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// eg. http://localhost:3001/api/counters/read-all-user-counters
export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    let allCounters = [];

    try {
        if (!username) throw new Error('app, name required');
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

    let countersShurangama = await sql`SELECT * 
        FROM Counters
        WHERE app = "mantraapp"
        AND name = "shurangama"
        AND username = ${username};`;
    if (countersShurangama.rowCount == 0) {
        await sql`INSERT INTO Counters (
            app, 
            name, 
            count,
            username
        ) 
        VALUES (
            "mantraapp", "shurangama", ${0}, ${username}
        );`;
    }
    countersShurangama = await sql`SELECT * 
        FROM Counters
        WHERE app = "mantraapp"
        AND name = "shurangama"
        AND username = ${username};`;
    
    // add counter to array
    allCounters.push(countersShurangama);
    
    return NextResponse.json(
        { 
            counters: allCounters
        }, 
        { 
            status: 200,
            statusText: "OK"
        }
    );
}

// client component code to call this api
// let counters: Counter[] = [];
// await fetch('/api/counters/read-all-user-counters/', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//         username: userData.username,
//     }),
// }).then((response) => {
//     console.log(response.status, response.statusText);
//     return response.json();
// }).then((json) => {
//     console.log(json);
//     let keyInt = 0;
//     json.counters.forEach((eachCounter: Counter) => {
//         counters.push({
//             key: keyInt,
//             app: eachCounter.app,
//             name: eachCounter.name,
//             count: eachCounter.count,
//         });
//         keyInt++;
//     });
// });