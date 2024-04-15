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
                            <ol>
                                <li style={{ fontSize: "20px" }}>設定 APP:</li>
                                <ol>
                                    <li style={{ fontSize: "20px" }}>從下拉式選單裏面，選擇神咒</li>
                                    <li style={{ fontSize: "20px" }}>選擇是否顯示字幕</li>
                                    <li style={{ fontSize: "20px" }}>點擊 [確認] 按鈕</li>
                                </ol>
                                <li style={{ fontSize: "20px" }}>開始[▶], 點擊轉經輪</li>
                                <li style={{ fontSize: "20px" }}>暫停[◼], 再次點擊轉經輪</li>
                            </ol>
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
                <MantraCounter localCount={localCount} showMemberCount={showMemberCountProp} memberCount={memberCount} globalCount={globalCount}></MantraCounter>
            </div>
        </div>
    );
};











