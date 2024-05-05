'use client'

import { useEffect, useRef, useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
};

type Props = {
    // memberCount: number,
    // globalCount: number,
    username: string
}

export default function MantraCounterDisplay({
    // memberCount,
    // globalCount,
    username
}: Props) {
    
    const [memberCount, setMemberCount] = useState<number>(0);
    const [globalCount, setGlobalCount] = useState<number>(0);

    useEffect(() => {
        // Get global count data 
        (async () => {
            console.log("MantraApp useEffect calling ", `/api/counters/read-counter?app=mantraapp&name=shurangama&username=''`);
            const resp = await fetch(`/api/counters/read-counter?app=mantraapp&name=shurangama&username=${''}`, { method: 'GET' })
            if (resp.status == 200) {
                const json = await resp.json();
                console.log("fetch returned counters: ", json.counters.rows)
                if (json.counters.rows.length! > 0) {
                    setGlobalCount(Number(json.counters.rows[0].count));
                }
            } else {
                const json = await resp.json();
                console.error("status", resp.status, "statusText", resp.statusText)
                console.log(`/api/counters/read-counter?app=mantraapp&name=shurangama&username=''` + " fetch returned counters: ", json.counters.rows)
            }
        })();

        // Get member count data 
        {
            (async () => {
                console.log("MantraApp useEffect calling ", `/api/counters/read-counter?app=mantraapp&name=shurangama&username=${username}`);
                const resp = await fetch(`/api/counters/read-counter?app=mantraapp&name=shurangama&username=${username}`, { method: 'GET' })
                if (resp.status == 200) {
                    const json = await resp.json();
                    console.log("fetch returned counters: ", json.counters.rows)
                    if (json.counters.rows.length! > 0) {
                        setMemberCount(Number(json.counters.rows[0].count));
                    }
                } else {
                    const json = await resp.json();
                    console.error("status", resp.status, "statusText", resp.statusText)
                    console.log(`/api/counters/read-counter?app=mantraapp&name=shurangama&username=${username}` + " fetch returned counters: ", json.counters.rows)
                }
            })();
        }
    }, []);

  return (
        <>
            {/* Personal count */}
            <div style={{ display: "flex", justifyContent: "space-around", fontSize: "24px", width: "340px" }}>
                <p style={Style.statisticsItem}>個人累計持咒次數:</p>
                <p>{memberCount}</p>
            </div>
            {/* Global count */}
            <div style={{ display: "flex", justifyContent: "space-around", fontSize: "24px", width: "340px" }}>
                <p style={Style.statisticsItem}>全球總計持咒次數:</p>
                <p>{globalCount}</p>
            </div>
        </>
  );
}
