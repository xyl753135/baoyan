'use server'

import { CountersClientWrapper } from "@/components/Application/Counters/CountersClientWrapper";
import { getSession } from "@/utils/AuthHelper";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

const Style: { [key: string]: React.CSSProperties } = {
    main: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap"
    },
    column: {
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        minWidth: "350px",
        // border: "2px black dashed"
    },
    label: {
        color: "white"
    },
    btn: {
        width: "100px",
        flexGrow: "1",
        fontSize: "24px",
        display: "flex", alignItems: "center", justifyContent: "space-around",
        fontWeight: "bold",
        background: "saddlebrown",
        border: "white 1px solid",
        borderRadius: "5px",
        padding: "2px",
        color: "white",
    }
};

type Counter = {
    app: string,
    name: string,
    count: number
};

export default async function Page() {

    // User data
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }
    let userData = session.user;
    let counters: Counter[] = [];

    // Get shurangama count
    let countersShurangama = await sql`SELECT * 
        FROM Counters
        WHERE app = 'mantraapp'
        AND name = 'shurangama'
        AND username = ${userData.username}
        LIMIT 1;`;

    counters.push({
        app: countersShurangama.rows[0].app,
        name: countersShurangama.rows[0].name,
        count: countersShurangama.rows[0].count
    })

    let countShurangama = 0;
    for (let i = 0; i < counters.length; i++) {
        const element = counters[i];
        if (element.app == "mantraapp" && element.name == "shurangama") {
            countShurangama = element.count;
        }
    }

    
    
    return (
        <main>
            <CountersClientWrapper userData={userData} countShurangama={countShurangama}>
            </CountersClientWrapper>
            
        </main>
    );
}
