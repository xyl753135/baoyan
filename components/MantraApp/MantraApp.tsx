import Image from "next/image";
import { sql } from '@vercel/postgres';
import { useEffect, useRef, useState } from "react";

// Components
import { getRandomInteger } from "@/utils/RandomGenerator";

// Assets
import { parseLRCFile } from "@/utils/LyricsParser";
import { MantraPlayer } from "./MantraPlayer";


import { LRCContent } from "@/types/LRC"

const Style: { [key: string]: React.CSSProperties } = {
    container: {
        // margin: "1em",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // border: "black 2px solid",
        width: "350px",
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

export function MantraApp() {

    // useState
    const [showManual, setShowManual] = useState<boolean>(false);
    const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [showSkip, setShowSkip] = useState<boolean>(false);
    const [showSubtitles, setShowSubtitles] = useState<boolean>(false);
    const [sfxPath, setSfxPath] = useState<string>("/mantraWheel/audio/shurangama.mp3");
    const [lrcPath, setLrcPath] = useState<string>("./mantraWheel/lyrics/shurangama.lrc");
    const [localCount, setLocalCount] = useState<number>(0);
    const [globalCount, setGlobalCount] = useState<number>(0);

    // useRef
    const sfx = useRef<HTMLAudioElement>();
    const subtitles = useRef<LRCContent>({
        metadata: {
            artist: "",
            album: "",
            title: "",
            length: ""
        },
        lyrics: [{ time: 0, text: "" }]
    });

    useEffect(() => {
        sfx.current = new Audio(sfxPath);
    }, [sfxPath]);

    useEffect(() => {
        subtitles.current = parseLRCFile(lrcPath);
    }, [lrcPath]);

    async function handleSubmit(formData: { get: (arg0: string) => any; }) {
        // Reset
        setShowPlayer(false);
        setShowSkip(false);
        setShowSubtitles(false);
        // Get form data
        const sfxChoice = formData.get("sfxChoice");            // value of selected option
        const subtitlesChoice = formData.get("showSubtitles");    // null | 'on'
        // Show loading...
        setShowPlaceholder(false);
        setShowLoading(true);
        // After random delay between 0.5 to 2 seconds, show app
        try {
            setShowLoading(false);
                setShowPlayer(true);
                setSfxPath(sfxChoice);

                // Show skip buttons for full mantras
                if (sfxChoice == "/mantraWheel/audio/shurangama.mp3") {
                    setShowSkip(true);
                    // handle subtitles
                    if (subtitlesChoice == "on") {
                        setLrcPath("./mantraWheel/lyrics/shurangama.lrc");
                    }
                    const path = String(sfxChoice);
                    const mantra = path.substring(path.lastIndexOf("/")+1, path.indexOf("."));
                    console.log(mantra);
                    const resp = await fetch(`${window.location.origin}/api/counters/read-counter?app=mantraapp&name=${mantra}`, { cache: 'no-store' })
                    
                    if (resp.status == 200 && resp.statusText == "OK") {
                        const json = await resp.json();
                        console.log("fetch returned counters: ", json.counters.rows)
                        setGlobalCount(json.counters.rows[0].count);
                    } else {
                        console.error(resp.status, resp.statusText)
                    }
                }
        } catch (error) {
            setShowPlaceholder(true);
            alert(error);
        }
    }

    return (
        <div style={Style.container}>
            <h3 style={{ marginTop: "1em", marginBottom: "0.5em", textAlign: "center", fontSize: "30px" }}>陀羅尼持咒 APP</h3>
            {/* Manual, Config sections */}
            <div style={Style.col}>
                {/* Manual section */}
                <section >
                    <div style={{ display: "flex", justifyContent: "right", alignItems: "center", marginRight: showManual ? "13px" : "16px" }}>
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
                        {/* </div> */}

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

                {/* Config section */}
                {
                    showPlayer ?
                        <></>
                        :
                        <section style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <fieldset style={Style.config}>
                                <legend style={{
                                    paddingLeft: "0.5em",
                                    paddingRight: "0.5em",
                                    fontWeight: "bolder",
                                    fontSize: "24px"
                                }}>
                                    持咒設定
                                </legend>
                                <form action={handleSubmit} style={{ ...Style.col, ...{ justifyContent: "center" } }}>
                                    <div style={{ marginBottom: "0.7em" }}>
                                        <label htmlFor="sfxChoice" style={{ fontSize: "20px" }}>選擇神咒:</label>
                                        <select id="sfxChoice" name="sfxChoice" style={{ fontSize: "20px", verticalAlign: "middle" }}>
                                            <option defaultChecked value="/mantraWheel/audio/shurangama.mp3">楞嚴神咒(完整版)</option>
                                            {/* <option value="/mantraWheel/audio/shurangama_p1.mp3">楞嚴神咒(第一會)</option>
                                    <option value="/mantraWheel/audio/shurangama_p2.mp3">楞嚴神咒(第二會)</option>
                                    <option value="/mantraWheel/audio/shurangama_p3.mp3">楞嚴神咒(第三會)</option>
                                    <option value="/mantraWheel/audio/shurangama_p4.mp3">楞嚴神咒(第四會)</option>
                                    <option value="/mantraWheel/audio/shurangama_p5.mp3">楞嚴神咒(第五會)</option> */}
                                            {/* <option value="shurangamaShort">楞嚴神咒(簡介版)</option> */}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="showSubtitles" style={{ fontSize: "20px" }}>顯示陪伴字幕:</label>
                                        <input type="checkbox" id="showSubtitles" name="showSubtitles" style={{ verticalAlign: "middle", width: "24px", height: "24px" }}></input>
                                    </div>

                                    <button type="submit" style={Style.submit}>
                                        <Image width={25} height={25} src={"/icons/icon_confirm_nobg.png"} alt={"確認 icon"} style={{ marginRight: "0.2rem", filter: "invert(1)" }}></Image>
                                        確認
                                    </button>
                                </form>
                            </fieldset>
                        </section>
                }
            </div>
            {/* Placeholder, Loading, App sections */}
            <div style={{ ...Style.col, ...{ alignItems: "center" } }}>
                {
                    showPlaceholder ?
                        // <Image width={320} height={241}
                        //     src={"/placeholders/app_placeholder.png"}
                        //     alt={"未設定的持咒 APP"}
                        //     style={{ display: "inline" }}></Image>
                        <></>
                        :
                        <></>
                }
                {
                    showLoading ?
                        // <Image width={320} height={241}
                        //     src={"/placeholders/gif_loading.gif"}
                        //     alt={"准備中，請稍後。。。"}
                        //     style={{ display: "inline" }}></Image>
                        <></>
                        :
                        <></>
                }
                {
                    showPlayer ?
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "0.5em", paddingBottom: "0.5em" }}>
                            <MantraPlayer
                                showSkip={showSkip}
                                showSubtitles={showSubtitles}
                                sfx={sfx.current != undefined ? sfx.current : new Audio()}
                                subtitles={subtitles.current}
                                wheelSize={320}
                                localCount={localCount}
                                setLocalCount={setLocalCount}></MantraPlayer>
                        </div>
                        :
                        <></>
                }
            </div>
            {/* Statistics */}
            {
                showPlayer ?
                <div style={{ ...Style.col, ...{ alignItems: "center" } }}>
                    <fieldset style={{ ...Style.config, ...{ paddingBottom: "0.8em" } }}>
                        <legend style={{
                            paddingLeft: "0.5em",
                            paddingRight: "0.5em",
                            fontWeight: "bolder",
                            fontSize: "24px"
                        }}>統計</legend>
                        <p style={Style.statisticsItem}>本次: {localCount}</p>
                        <p style={Style.statisticsItem}>累計: 0</p>
                        <p style={Style.statisticsItem}>全球總計: {globalCount}</p>
                    </fieldset>
                </div>
                :
                <></>
            }
            
        </div>
    );
};













