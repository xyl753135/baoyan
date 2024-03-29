import Image from "next/image";
import { sql } from '@vercel/postgres';
import { useEffect, useRef, useState } from "react";

// Components
import { getRandomInteger } from "@/utils/RandomGenerator";

// Assets
import { parseLRCFile } from "@/utils/LyricsParser";
import { MantraPlayer } from "./MantraPlayer";


import { LRCContent } from "@/types/LRC"
import { MantraCounter } from "./MantraCounter";

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

export function MantraApp() {

    // useState
    const [showManual, setShowManual] = useState<boolean>(false);
    const [showSkip, setShowSkip] = useState<boolean>(true);
    const [showConfig, setShowConfig] = useState<boolean>(false);
    const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
    const [sfxPath, setSfxPath] = useState<string>("/mantraWheel/audio/shurangama.mp3");
    const [lrcPath, setLrcPath] = useState<string>("./mantraWheel/lyrics/shurangama.lrc");
    const [localCount, setLocalCount] = useState<number>(0);
    const [globalCount, setGlobalCount] = useState<number>(0);

    // useRef
    const sfx = useRef<HTMLAudioElement | undefined>();
    const subtitles = useRef<LRCContent>(parseLRCFile(lrcPath));

    const base_url = window.location.origin == "http://localhost:3001" ? "http://localhost:3001" : "https://baoyan.vercel.app"

    useEffect(() => {
        sfx.current = new Audio(sfxPath);
        (async () => {
            const path = String(sfxPath);
            const mantra = path.substring(path.lastIndexOf("/")+1, path.indexOf("."));
            console.log("mantra", mantra);
            const resp = await fetch(`${base_url}/api/counters/read-counter?app=mantraapp&name=${mantra}`, { cache: 'no-store' })
            if (resp.status == 200 && resp.statusText == "OK") {
                const json = await resp.json();
                console.log("fetch returned counters: ", json.counters.rows)
                setGlobalCount(Number(json.counters.rows[0].count));
            } else {
                console.error(resp.status, resp.statusText)
            }
        })();
    }, []);

    async function handleSubmit(formData: { get: (arg0: string) => any; }) {
        // Reset
        setShowSkip(false);
        setShowSubtitles(false);
        // Get form data
        const sfxChoice = formData.get("sfxChoice");            // value of selected option
        const subtitlesChoice = formData.get("showSubtitles");    // null | 'on'
        try {
            setSfxPath(sfxChoice);

            // Show skip buttons for full mantras
            if (sfxChoice == "/mantraWheel/audio/shurangama.mp3") {
                setShowSkip(true);
                // handle subtitles
                if (subtitlesChoice == "on") {
                    setShowSubtitles(true);
                    setLrcPath("./mantraWheel/lyrics/shurangama.lrc");
                }

                const path = String(sfxPath);
                const mantra = path.substring(path.lastIndexOf("/")+1, path.indexOf("."));
                console.log(mantra);
                const resp = await fetch(`${base_url}/api/counters/read-counter?app=mantraapp&name=${mantra}`, { cache: 'no-store' })
                if (resp.status == 200 && resp.statusText == "OK") {
                    const json = await resp.json();
                    console.log("fetch returned counters: ", json.counters.rows)
                    setGlobalCount(Number(json.counters.rows[0].count));
                } else {
                    console.error(resp.status, resp.statusText)
                }
            }           
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div style={Style.container}>
            <h3 style={{ marginTop: "1em", marginBottom: "0.5em", textAlign: "center", fontSize: "30px" }}>陀羅尼持咒</h3>
            {/* Manual, Config sections */}
            <div style={Style.col}>
                {/* Manual section */}
                <section >
                    <div style={{ 
                        display: "flex", justifyContent: "space-between", alignItems: "center", 
                        marginLeft: "13px",
                        marginRight: showManual ? "13px" : "16px" }}>
                        <div style={{ display: "flex"}}>
                            <p style={{ cursor: "pointer", verticalAlign: "middle", fontSize: "20px" }} onClick={() => { setShowConfig(!showConfig); }}>設定</p>
                            <Image width={25} height={25}
                                src={"/icons/gear.png"}
                                alt={"設定"}
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "0.2rem",
                                    filter: "invert(1)"
                                }}
                                onClick={() => { setShowConfig(!showConfig); }}></Image>
                        </div>
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

                {/* Config section */}
                {
                    showConfig ?
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
                                    <input type="checkbox" checked={showSubtitles} onChange={() => setShowSubtitles(!showSubtitles)} id="showSubtitles" name="showSubtitles" style={{ verticalAlign: "middle", width: "24px", height: "24px" }}></input>
                                </div>

                                <button type="submit" style={Style.submit}>
                                    <Image width={25} height={25} src={"/icons/icon_confirm_nobg.png"} alt={"確認 icon"} style={{ marginRight: "0.2rem", filter: "invert(1)" }}></Image>
                                    確認
                                </button>
                            </form>
                        </fieldset>
                    </section>
                    :
                    <></>
                }
                

                {/* App sections */}
                <section style={{ ...Style.col, ...{ alignItems: "center" } }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "0.5em", paddingBottom: "0.5em" }}>
                        {
                            sfx.current != undefined ?
                            <MantraPlayer
                                showSkip={showSkip}
                                showSubtitles={showSubtitles}
                                audio={sfx.current}
                                subtitles={subtitles.current}
                                wheelSize={320}
                                localCount={localCount}
                                setLocalCount={setLocalCount}
                                globalCount={globalCount}
                                setGlobalCount={setGlobalCount}></MantraPlayer>
                            :
                            <></>
                        }
                        
                    </div>
                </section>

                {/* Statistics */}
                <MantraCounter localCount={localCount} globalCount={globalCount}></MantraCounter>
            </div>
        </div>
    );
};













