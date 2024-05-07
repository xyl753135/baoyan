'use client'

import { useEffect, useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
    statsGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space=between",
    },
};

type Props = {
    username: string
}

export const AchievementsUserClientWrapper = ({
    username
}: Props) => {
    // useState
    const [averageCount, setAverageCount] = useState<string>("0");
    const [maxCount, setMaxCount] = useState<string>("0");
    const [currCount, setCurrCount] = useState<string>("0");
    const [currCountPercentGlobal, setCurrCountPercentGlobal] = useState<string>("0");
    const [personalRanking, setPersonalRanking] = useState<string>("0");
    const [nextRankingDiff, setNextRankingDiff] = useState<number>(0);
    
    async function handleRefresh() {
        console.log("call db")
        await fetch('/api/achievements/read-user-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usernameInput: username
            }),
        }).then(resp => {
            console.log(resp);
            return resp.json();
        }).then(json => {
            console.log(json);
            setAverageCount(json.mantraApp.shurangama.averageCount);
            setMaxCount(json.mantraApp.shurangama.maxCount);
            setCurrCount(json.mantraApp.shurangama.currCount);
            setCurrCountPercentGlobal(json.mantraApp.shurangama.currCountPercentGlobal);
            setPersonalRanking(json.mantraApp.shurangama.personalRanking);
            setNextRankingDiff(json.mantraApp.shurangama.nextRankingDiff);
        });
    }
    useEffect(() => {
        handleRefresh();
    }, []);

    return (
        <section 
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "680px",
                // paddingLeft: "0.5em",
                // paddingRight: "0.5em",
                // border: "#233142 2px solid",
                // background: "#455d7a"
            }}>
            
            <section style={{
                height: "600px",
                display: "flex", flexDirection: "column", gap: "20px"
                //justifyContent: "space-around"
            }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <h1>個人成就</h1>
                    {/* <button type="button" onClick={handleRefresh}
                        style={{
                            background: "yellowgreen", border: "1px solid black", color: "black", borderRadius: "5px", padding: "10px 20px"
                        }}>
                        更新
                    </button> */}
                </div>
                {/* MantraApp > Shurangama > Statistics */}
                <section style={{
                    backgroundColor: "saddlebrown",
                    border: "white 1px solid", borderRadius: "20px",
                    padding: "20px",
                    gap: "10px", display: "flex", flexDirection: "column"
                }}>
                    <h2>大佛頂首楞嚴神咒 - 個人表現</h2>
                    <div style={Style.statsGroup}>
                        <label htmlFor="">平均每日持咒次數：</label>
                        <span>{Math.trunc(Number(averageCount)) +"次"}</span>
                    </div>
                    {/* <div style={Style.statsGroup}>
                        <label htmlFor="">同天最高持咒次數：</label>
                        <span>{maxCount}</span>
                    </div> */}
                    <div style={Style.statsGroup}>
                        <label htmlFor="">個人累計持咒次數：</label>
                        <span>{currCount}</span>
                    </div>
                    <div style={Style.statsGroup}>
                        <label htmlFor="">佔全球總計的貢獻：</label>
                        <span>{currCountPercentGlobal}</span>
                    </div>
                    <div style={Style.statsGroup}>
                        <label htmlFor="">本人目前排行榜：</label>
                        <span>第{personalRanking}名</span>
                    </div>
                    <div style={Style.statsGroup}>
                        <label htmlFor="">下一位排行榜持咒次數：</label>
                        <span>{ String(Number(currCount) + Number(nextRankingDiff)) }次，比本人持咒次數差{String(nextRankingDiff+1)}次</span>
                    </div>
                </section>
            </section>

            

        </section>
    )
}