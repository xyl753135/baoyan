'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Components
import { MantraPlayer } from "./MantraPlayer";
import { MantraCounter } from "./MantraCounter";

// Utils
import { parseLRCFile } from "@/utils/LyricsParser";

import { LRCContent } from "@/types/LRC"
import { MantraTransferOfMerit } from "./MantraTransferOfMerit";

const Style: { [key: string]: React.CSSProperties } = {
    container: {
        // margin: "1em",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        // border: "black 2px solid",
        width: "350px",
        // height: "706px"
    },
    col: {
        display: "flex",
        flexDirection: "column",
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    config: {
        // height: "100%",
        paddingTop: "0.5em",
        paddingBottom: "0.5em",
        paddingLeft: "0.5em",
        paddingRight: "0.5em",
        margin: "0.5em",
        width: "320px",
        border: "white 2px solid",
        borderRadius: "5px",
        alignSelf: "center"
    },
    submit: {
        marginLeft: "0.2em",
        marginRight: "0.2em",
        marginTop: "1em",
        paddingLeft: "1em",
        paddingRight: "1em",
        paddingTop: "0.3rem",
        paddingBottom: "0.3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: "1",
        // minWidth: "100px",
        flexShrink: "1",

        fontSize: "20px",

        cursor: "pointer",
        borderRadius: "5px",
        background: "transparent",
        border: "white solid 1px",
        // boxShadow: "none",
        transition: "all 200ms ease-out"
    },
    statisticsItem: {
        fontSize: "20px",
        paddingLeft: "0.5em"
    }
};

type Props = {
    showTransfer?: boolean,
    showMemberCount?: boolean,
    memberCount?: number,
    username: string
}

export function MantraApp({
    showTransfer = false,
    showMemberCount: showMemberCountProp = false,
    memberCount: memberCountProp = 0,
    username
}: Props) {

    // const values
    const todayDate = new Date(Date.now());
    const yyyy = todayDate.getFullYear();
    const mm = String(todayDate.getMonth() + 1).padStart(2, "0");
    const dd = String(todayDate.getDate()).padStart(2, "0");
    const date = `${yyyy}-${mm}-${dd}`;
    
    // useState
    const [showManual, setShowManual] = useState<boolean>(false);
    const [localCount, setLocalCount] = useState<number>(0);
    const [memberCount, setMemberCount] = useState<number>(memberCountProp);
    const [globalCount, setGlobalCount] = useState<number>(0);

    // useRef
    let sfx = useRef<HTMLAudioElement | undefined>(undefined);
    let subtitles = useRef<LRCContent>({
        metadata: {
            artist: "",
            album: "",
            title: "",
            length: ""
        },
        lyrics: [{ time: 0, text: "" }]
    });

    useEffect(() => {
        sfx.current = new Audio("/mantraWheel/audio/shurangama.mp3");
        console.log("sfx", sfx);
    }, [sfx.current]);

    useEffect(() => {
        subtitles.current = parseLRCFile("/mantraWheel/lyrics/shurangama.lrc");
        console.log("subtitles", subtitles);
    }, [subtitles.current]);

    
    useEffect(() => {
        // Get global count data 
        (async () => {
            console.log("MantraApp useEffect calling ", `/api/counters/read-counter?app=mantraapp&name=shurangama&username=''`);
            const resp = await fetch(`/api/counters/read-counter?app=mantraapp&name=shurangama&username=${''}`, { method: 'GET' })
            if (resp.status == 200) {
                const json = await resp.json();
                console.log("fetch returned counters: ", json.counters.rows)
                if (json.counters.rows.length !> 0) {
                    setGlobalCount(Number(json.counters.rows[0].count));
                }
            } else {
                const json = await resp.json();
                console.error("status", resp.status, "statusText", resp.statusText)
                console.log(`/api/counters/read-counter?app=mantraapp&name=shurangama&username=''` + " fetch returned counters: ", json.counters.rows)
            }
        })();
        
        // Get member count data 
        if (username == "") {
            // This is guest version, on homepage, skip member count query
        } else {
            (async () => {
                console.log("MantraApp useEffect calling ", `/api/counters/read-counter?app=mantraapp&name=shurangama&username=${username}`);
                const resp = await fetch(`/api/counters/read-counter?app=mantraapp&name=shurangama&username=${username}`, { method: 'GET' })
                if (resp.status == 200) {
                    const json = await resp.json();
                    console.log("fetch returned counters: ", json.counters.rows)
                    if (json.counters.rows.length !> 0) {
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
        <div style={Style.container}>
            <h3 style={{ 
                marginBottom: "0.5em", 
                textAlign: "center", 
                fontSize: "30px" }}>
                大佛頂首楞嚴神咒
            </h3>
            {/* Manual, Config, App, Transfer, Statistics sections */}
            <div style={Style.col}>
                {/* Manual section */}
                <section >
                    <div style={{ 
                        display: "flex", justifyContent: "space-between", alignItems: "center", 
                        marginLeft: "13px",
                        marginRight: showManual ? "13px" : "16px" }}>
                        <div style={{ display: "flex"}}>
                            <p style={{ cursor: "pointer", verticalAlign: "middle", fontSize: "20px" }} onClick={() => { setShowManual(!showManual); }}>使用手冊</p>
                            <Image width={showManual ? 25 : 22} height={25}
                                src={showManual ? "/icons/icon_manual_open.png" : "/icons/icon_manual.png"}
                                alt={"使用手冊"}
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "0.2rem",
                                    // marginRight: "0.2rem",
                                    filter: "invert(1)"
                                }}
                                onClick={() => { setShowManual(!showManual); }}></Image>
                        </div>
                    </div>
                    
                    {
                        showManual ?
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <br></br>
                            <h4 style={{ marginBottom: "0.2em", fontSize: "24px" }}>操作指示</h4>
                            <ul>
                                <li style={{ fontSize: "20px" }}>點擊轉經輪或是點擊以下 “完整版” 按鈕來開始[▶]播放神咒</li>
                                <li style={{ fontSize: "20px" }}>點擊以下其他咖啡色按鈕來跳到神咒的其他會</li>
                                <li style={{ fontSize: "20px" }}>播放神咒時, 可以隨時再次點擊轉經輪來暫停[◼]播放</li>
                                <li style={{ fontSize: "20px" }}>每一次播放完神咒, APP會在統計區的 “本次持咒次數” 顯示欄位加一</li>
                                <li style={{ fontSize: "20px" }}>使用完 APP 記得點擊 “回報” 按鈕來把 “本次持咒次數” 加到 “全球總計持咒次數”</li>
                                <li style={{ fontSize: "20px" }}>點擊右上角的使用者按鈕來註冊、登入會員</li>
                                <li style={{ fontSize: "20px" }}>登入後, 使用者可使用 APP (會員版), 會員版有多以下功能：</li>
                                <ul style={{ marginLeft: "30px" }}>
                                    <li style={{ fontSize: "20px" }}>統計個人累計持咒次數</li>
                                    <li style={{ fontSize: "20px" }}>送出個人回向</li>
                                </ul>
                                <li style={{ fontSize: "20px" }}>登入後，點擊 “回報” 按鈕也會把 “本次持咒次數” 加到 “個人累計持咒次數”</li>
                                <li style={{ fontSize: "20px" }}>登入後, 使用者可操作查詢過去的個人回向</li>
                                <li style={{ fontSize: "20px" }}>登入後, 使用者可跟寳嚴留資料協助公共宣傳</li>
                            </ul>
                            <br></br>
                        </div>
                        :
                        <></>
                    }
                </section>
                {/* App sections */}
                <section style={{ ...Style.col, ...{ alignItems: "center" } }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "0.5em", paddingBottom: "0.5em" }}>
                        {
                            sfx.current != undefined?
                            <MantraPlayer
                                showSkip={true}
                                showSubtitles={true}
                                audio={sfx.current}
                                subtitles={subtitles.current}
                                wheelSize={320}
                                localCount={localCount}
                                setLocalCount={setLocalCount}
                                memberCount={memberCount}
                                setMemberCount={setMemberCount}
                                globalCount={globalCount}
                                setGlobalCount={setGlobalCount}>
                            </MantraPlayer>
                            :
                            <></>
                        }
                        
                    </div>
                </section>
                {/* 回向 Transfer of Merit */}
                {
                    showTransfer ? 
                    <MantraTransferOfMerit 
                        username={username} 
                        source={`持誦楞嚴神咒 ${localCount}次`} 
                        yyyymmdd={date}></MantraTransferOfMerit>
                    :
                    <></>
                }
                {/* Statistics */}
                <MantraCounter localCount={localCount} username={username? username : ''} memberCount={memberCount} globalCount={globalCount}></MantraCounter>
            </div>
        </div>
    );
};











