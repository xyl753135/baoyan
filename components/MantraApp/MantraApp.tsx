import Image, { StaticImageData } from "next/image";

import { MutableRefObject, useEffect, useRef, useState } from "react";

// Components
import { getRandomInteger } from "@/utils/RandomGenerator";

// Assets
import { GenericButton } from "../GenericButton";
import { parseLRCFile } from "@/utils/LyricsParser";
import { MantraPlayer } from "./MantraPlayer";

import { Lyric, Metadata, LRCContent } from "@/types/LRC"

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

        cursor: "pointer",
        borderRadius: "5px",
        background: "transparent",
        border: "white solid 1px",
        // boxShadow: "none",
        transition: "all 200ms ease-out"
    }
};

type Props = {
    //   allowPause: boolean,
}



export const MantraApp = ({
    //   allowPause = false,
}: Props) => {

    // useState
    const [showManual, setShowManual] = useState<boolean>(false);
    const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [showSkip, setShowSkip] = useState<boolean>(false);
    const [showSubtitles, setShowSubtitles] = useState<boolean>(false);
    const [sfxPath, setSfxPath] = useState<string>("/mantraWheel/audio/shurangama.mp3");
    const [lrcPath, setLrcPath] = useState<string>("./mantraWheel/lyrics/shurangama.lrc");

    // useRef
    const sfx = useRef<HTMLAudioElement>();
    const subtitles = useRef<LRCContent>({ 
        metadata: { 
            artist: "", 
            album: "", 
            title: "", 
            length: "" 
        }, 
        lyrics: [{ time: 0, text: ""}] 
    });
    
    useEffect(() => {
        sfx.current = new Audio(sfxPath);
    }, [sfxPath]);

    useEffect(() => {
        subtitles.current = parseLRCFile(lrcPath);
    }, [lrcPath]);

    function handleSubmit(formData: { get: (arg0: string) => any; }) {
        // Reset
        setShowPlayer(false);
        setShowSkip(false);
        setShowSubtitles(false);
        // Get form data
        const sfxChoice = formData.get("sfxChoice");            // value of selected option
        const subtitlesChoice = formData.get("showSubtitles");    // null | 'on'
        // alert(`You submitted sfx: '${sfxChoice}', showSubtitles: '${showSubtitles}' ${typeof showSubtitles}`);
        // Show loading...
        setShowPlaceholder(false);
        setShowLoading(true);
        // After random delay between 0.5 to 3 seconds, show app
        try {
            setTimeout(() => {
                setShowLoading(false);
                setShowPlayer(true);
                setSfxPath(sfxChoice);
                
                // Show skip buttons for full mantras
                if(sfxChoice == "/mantraWheel/audio/shurangama.mp3") {
                    setShowSkip(true);
                }

                // handle subtitles
                if (subtitlesChoice == "on") {
                    setShowSubtitles(true);
                    if (sfxChoice == "/mantraWheel/audio/shurangama.mp3") {
                        setLrcPath("./mantraWheel/lyrics/shurangama.lrc"); 
                    } else if (sfxChoice == "/mantraWheel/audio/shurangama_p1.mp3") {
                        setLrcPath("./mantraWheel/lyrics/shurangama_p1.lrc"); 
                    } else if (sfxChoice == "/mantraWheel/audio/shurangama_p2.mp3") {
                        setLrcPath("./mantraWheel/lyrics/shurangama_p2.lrc"); 
                    } else if (sfxChoice == "/mantraWheel/audio/shurangama_p3.mp3") {
                        setLrcPath("./mantraWheel/lyrics/shurangama_p3.lrc"); 
                    }  else if (sfxChoice == "/mantraWheel/audio/shurangama_p4.mp3") {
                        setLrcPath("./mantraWheel/lyrics/shurangama_p4.lrc"); 
                    }  else if (sfxChoice == "/mantraWheel/audio/shurangama_p5.mp3") {
                        setLrcPath("./mantraWheel/lyrics/shurangama_p5.lrc"); 
                    } 
                }
            }, getRandomInteger(500, 3000)); // setTimeout uses delay in miliseconds
        } catch (error) {
            setShowPlaceholder(true);
            alert(error);
        }
    }

    const toggleManual = () => {
        setShowManual(!showManual);
    }


    return (
        <div style={Style.container}>
            <h3 style={{ marginTop: "1em", marginBottom: "0.5em", textAlign: "center" }}>陀羅尼持咒 APP</h3>
            <div style={Style.col}>
                <section >
                    <div style={{ display: "flex", justifyContent: "right", alignItems: "center", marginRight: showManual ? "13px" : "16px" }}>
                        <p style={{ cursor: "pointer", verticalAlign: "middle" }} onClick={toggleManual}>使用手冊</p>
                        <Image width={showManual ? 25 : 22} height={25}
                            src={showManual ? "/icons/icon_manual_open.png" : "/icons/icon_manual.png"}
                            alt={"使用手冊"}
                            style={{
                                cursor: "pointer",
                                marginLeft: "0.2rem",
                                // marginRight: "0.2rem",
                                filter: "invert(1)"
                            }}
                            onClick={toggleManual}></Image>
                        {/* </div> */}

                    </div>
                    <div style={{ display: showManual ? "flex" : "none", flexDirection: "column", alignItems: "center" }}>
                        <h4 style={{ textDecoration: "underline", marginBottom: "0.2em" }}>操作指示</h4>
                        <ol>
                            <li>設定 APP:</li>
                            <ol>
                                <li>從下拉式選單裏面，選擇神咒</li>
                                <li>選擇是否顯示字幕</li>
                                <li>點擊 [確認] 按鈕</li>
                            </ol>
                            <li>開始[▶], 點擊轉經輪</li>
                            <li>暫停[◼], 再次點擊轉經輪</li>
                        </ol>
                    </div>

                </section>
                <section style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <fieldset style={Style.config}>
                        <legend style={{ 
                            paddingLeft: "0.5em", 
                            paddingRight: "0.5em",
                            textDecoration: "underline",
                            fontWeight: "bolder",
                        }}>
                            持咒設定:
                        </legend>
                        <form action={handleSubmit} style={{ ...Style.col, ...{ justifyContent: "center" } }}>
                            <div style={{ minWidth: "260px" }}>
                                <label htmlFor="sfxChoice">選擇神咒:</label>
                                <select id="sfxChoice" name="sfxChoice">
                                    <option defaultChecked value="/mantraWheel/audio/shurangama.mp3">楞嚴神咒(完整版)</option>
                                    <option value="/mantraWheel/audio/shurangama_p1.mp3">楞嚴神咒(第一會)</option>
                                    <option value="/mantraWheel/audio/shurangama_p2.mp3">楞嚴神咒(第二會)</option>
                                    <option value="/mantraWheel/audio/shurangama_p3.mp3">楞嚴神咒(第三會)</option>
                                    <option value="/mantraWheel/audio/shurangama_p4.mp3">楞嚴神咒(第四會)</option>
                                    <option value="/mantraWheel/audio/shurangama_p5.mp3">楞嚴神咒(第五會)</option>
                                    {/* <option value="shurangamaShort">楞嚴神咒(簡介版)</option> */}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="showSubtitles">顯示陪伴字幕:</label>
                                <input type="checkbox" id="showSubtitles" name="showSubtitles"></input>
                            </div>

                            <button type="submit" style={Style.submit}>
                                <Image width={25} height={25} src={"/icons/icon_confirm_nobg.png"} alt={"確認 icon"} style={{ marginRight: "0.2rem", filter: "invert(1)" }}></Image>
                                確認
                            </button>
                        </form>
                    </fieldset>
                </section>
            </div>
            <div style={{ ...Style.col, ...{ alignItems: "center" } }}>
                <Image width={320} height={241}
                    src={"/placeholders/app_placeholder.png"}
                    alt={"未設定的持咒 APP"}
                    style={{ display: showPlaceholder ? "inline" : "none" }}></Image>
                <Image width={320} height={241}
                    src={"/placeholders/gif_loading.gif"}
                    alt={"准備中，請稍後。。。"}
                    style={{ display: showLoading ? "inline" : "none" }}></Image>
                
                <div style={{ display: showPlayer ? "inline" : "none" , flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        {/* <MantraPlayer showSkip={showSkip} showSubtitles={showSubtitles} 
                        sfx={
                            // sfx.current? sfx.current : new Audio(sfxPath)
                            sfx.current
                        } subtitles={subtitles.current}></MantraPlayer> */}
                        <Image width={220} height={220}
                            src={"/mantraWheel/images/mantra_bg.png"}
                            alt={"准備中，請稍後。。。"}></Image>
                    </div>
                    <div style={{ display: showSubtitles ? "block" : "none", textAlign: "center" }}>
                        {subtitles.current?.metadata.title}
                        {/* hidddddaasdasddddddddddddddddddss<br></br> */}
                        {/* <div> */}
                        {/* 爾時世尊  從肉髻中  涌百寶光  光中涌出 */}
                        {/* </div> */}
                    </div>
                </div>
                
                
            </div>
            <div style={{ ...Style.col, ...{ alignItems: "center" } }}>
                <fieldset style={{...Style.config, ...{paddingBottom: "0.8em"}}}>
                    <legend style={{ 
                            paddingLeft: "0.5em", 
                            paddingRight: "0.5em",
                            textDecoration: "underline",
                            fontWeight: "bolder",
                        }}>統計:</legend>
                    <p>本次: 0</p>
                    <p>累計: 0</p>
                    <p>全球總計: 0</p>
                </fieldset>
            </div>
        </div>
    );
};













