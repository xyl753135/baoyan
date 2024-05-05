import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// eg. http://localhost:3001/api/counters/read-counters
export async function POST(request: Request) {

    // Get POST variables
    const { usernameInput } = await request.json();

    try {
        // eg. select * from counters order by CAST(count AS Numeric(10,0)) desc limit 3 offset 1
        const allCounters = await sql`SELECT * 
            FROM Counters 
            ORDER BY CAST(count AS Numeric(10,0)) desc;`;
        
        const userMerits = await sql`SELECT source, yyyymmdd 
            FROM Merits 
            WHERE username = ${usernameInput}
            ORDER BY yyyymmdd desc`
        
        const userCreatedOn = await sql`SELECT created_on 
            FROM Users 
            WHERE username = ${usernameInput}
            LIMIT 1`
        
        let currCount = 0;
        let personalRanking = 0;
        let mantraAppShurangamaGlobalCount = 0;

        for (let index = 0; index < allCounters.rows.length; index++) {
            const eachCounter = allCounters.rows[index];
            if (eachCounter.app == "mantraapp") {
                if (eachCounter.name == "shurangama") {
                    if (eachCounter.username == usernameInput) {
                        personalRanking = index;
                        currCount = Number(eachCounter.count);
                    }
                    if (index == 0) {
                        mantraAppShurangamaGlobalCount = Number(eachCounter.count);
                    }
                }
            }
        }

        let averageCount = 0;
        const createdOn = new Date(userCreatedOn.rows[0].created_on).getTime();
        const now = new Date().getTime();
        const diffMillisecs = now - createdOn;
        const diffDays = Math.floor(diffMillisecs / (1000 * 60 * 60 * 24));
        averageCount = currCount / diffDays;
        
        let days: string[] = [];
        let counts: number[] = [];
        userMerits.rows.forEach(row => {
            const source = row.source.split(" "); // eg '持誦楞嚴神咒 1次' => ['持誦楞嚴神咒', '1次']
            const rawCount = Number(source[1].substring(0, 1)); // eg "1次" => "1" => 1

            // Sum counts on the same day
            if (days.includes(row.yyyymmdd)) {
                counts[days.indexOf(row.yyyymmdd)] = counts[days.indexOf(row.yyyymmdd)] + rawCount
            } else {
                days.push(row.yyyymmdd);
                counts.push(rawCount);
            }
        });

        let maxCount = 0;
        for (let index = 0; index < counts.length; index++) {
            const count = counts[index];

            if (maxCount < count) {
                maxCount = count;
            }
        }
        // const day = days[index];

        let nextRankingDiff = 0;
        if (personalRanking > 0) {
            nextRankingDiff = Number(allCounters.rows[personalRanking - 1].count) - currCount;
        }
        

        
        return NextResponse.json(
            { 
                mantraApp: {
                    shurangama: {
                        averageCount: averageCount,
                        maxCount: maxCount,
                        currCount: currCount,
                        currCountPercentGlobal: Math.trunc(Number(currCount) / mantraAppShurangamaGlobalCount * 100) + "%",

                        personalRanking: personalRanking,
                        nextRankingDiff: nextRankingDiff
                    }
                }
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