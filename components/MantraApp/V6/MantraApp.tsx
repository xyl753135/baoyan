'use client'

// Lib
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Components
import { MantraPlayer } from "../MantraPlayer";
import { GenericButton } from "@/components/GenericButton";

// Utils
import { parseLRCFile } from "@/utils/LyricsParser";
import { isNullUndefinedOrEmpty } from "@/utils/Validator";

// Types
import { LRCContent } from "@/types/LRC"


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
        // marginLeft: "0.2em",
        // marginRight: "0.2em",
        // marginTop: "1em",
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
        color: "white",

        cursor: "pointer",
        borderRadius: "5px",
        background: "transparent",
        border: "white solid 1px",
    },
    counterFieldset: {
        padding: "0.5em",

        margin: "0.5em",

        display: "flex",
        flexDirection: "column",
        gap: "10px",

        width: "320px",
        border: "white 2px solid", 
        borderRadius: "5px",
    },
    manaulEditBtn: {
        padding: "0.3rem ",
        maxWidth: "160px",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        fontSize: "20px",
        color: "white",
        background: "saddlebrown",

        cursor: "pointer",
        borderRadius: "5px",
        border: "white solid 1px",
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
    const router = useRouter();

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
    const [editable, setEditable] = useState<boolean>(false);
    const [sfx, setSFX] = useState<HTMLAudioElement | undefined>();
    const [msg, setMsg] = useState<string>("");


    // useRef
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
        setSFX(new Audio("/mantraWheel/audio/shurangama.mp3"));
        console.log("sfx", sfx?.src);
    }, []);

    useEffect(() => {
        subtitles.current = parseLRCFile("/mantraWheel/lyrics/shurangama.lrc");
        console.log("subtitles", subtitles);
    }, []);


    async function submitIncrements(localCount: number) {
        if (localCount > 0) {
            // Update global counter
            try {
                await fetch(`/api/counters/increment-counter`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            app: "mantraapp",
                            name: "shurangama",
                            count: localCount,
                            username: '' // reminder, global count has no username
                        })
                    }).then(resp => {
                        if (resp.status != 200) {
                            throw new Error(`Error code: ${resp.status}, Error message: ${resp.statusText}`);
                        }
                        return resp.json();
                    }).then(json => {
                        // console.log("fetch incrementing global count returns JSON: ", json.result.rows);
                    });
            } catch (error) {
                console.error("MantraPlayer useEffect threw error:", error);
            }
            // Update member counter
            if (username != '') {
                try {
                    await fetch(`/api/counters/increment-counter`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                app: "mantraapp",
                                name: "shurangama",
                                count: localCount,
                                username: username
                            })
                        }).then(resp => {
                            if (resp.status != 200) {
                                throw new Error(`Error code: ${resp.status}, Error message: ${resp.statusText}`);
                            }
                            return resp.json();
                        }).then(json => {
                            // console.log("fetch incrementing global count returns JSON: ", json.result.rows);
                            router.push("/dashboard");
                        });
                } catch (error) {
                    console.error("MantraPlayer useEffect threw error:", error);
                }
            } else {
                router.push("/");
            }
        } else {
            // localcount is 0 or less than 0
            alert("本次次數為 0, 沒有資料可更新");
        }
    }



    async function submit(formData: FormData) {

        let sendPOST = true;



        // Get form data
        // 回向内容
        const meritText = formData.get("meritText");
        const editLocalCount = formData.get("editLocalCount");


        // if (isNullUndefinedOrEmpty(meritText)) {
        //     setMsg("回向字不可空");
        //     sendPOST = false;
        // }

        if (localCount == 0) {
            setMsg("本次次數為 0, 沒有資料可更新");
            sendPOST = false;
        }
        if (localCount < 0) {
            setMsg("本次次數小於 0, 沒有資料可更新");
            sendPOST = false;
        }

        if (sendPOST) {
            try {
                // Increment user count
                await fetch(`/api/counters/increment-counter`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        app: "mantraapp",
                        name: "shurangama",
                        count: editLocalCount,
                        username: username
                    })
                }).then(resp => {
                    if (resp.status != 200) {
                        throw new Error(`Error code: ${resp.status}, Error message: ${resp.statusText}`);
                    }
                    return resp.json();
                }).then(json => {
                    console.log(json);
                });
                // Increment global count
                await fetch(`/api/counters/increment-counter`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        app: "mantraapp",
                        name: "shurangama",
                        count: editLocalCount,
                        username: '' // reminder, global count has no username
                    })
                }).then(resp => {
                    if (resp.status != 200) {
                        throw new Error(`Error code: ${resp.status}, Error message: ${resp.statusText}`);
                    }
                    return resp.json();
                }).then(json => {
                    console.log(json);
                });
            } catch (error) {
                console.error(error);
            }

            try {
                if (!isNullUndefinedOrEmpty(meritText)) {
                    // Add Merit
                    await fetch('/api/transfer-of-merit/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: username,
                            source: `持誦楞嚴神咒 ${editLocalCount}次`,
                            yyyymmdd: date,
                            text: meritText,
                        })
                    }).then(response => {
                        return response.json();
                    }).then(json => {
                        console.log(json);
                    });
                }
            } catch (error) {
                console.error(error);
            }


            // Redirect
            setMsg("持咒次數統計成功! 五秒鈡後自動回去個人資料。");
            setTimeout(() => {
                router.push("/dashboard");
            }, 5000);
            
        }
    }

    function validateManualEdit() {
        if (editable) {
            const input = document.getElementById("editLocalCount");
            if (input) {
                if (input instanceof HTMLInputElement) {
                    const value = Number(input.value)

                    if (value >= 0 && value < 100) {
                        setLocalCount(value);
                        setEditable(false);
                    } else {
                        input.value = String(localCount)
                        input.focus();
                    }
                }
            }
        } else {
            setEditable(true);
        }
    }


    return (
        <div style={Style.container}>
            <h3 style={{
                marginBottom: "0.5em",
                textAlign: "center",
                fontSize: "30px",
                color: "white"
            }}>
                大佛頂首楞嚴神咒
            </h3>
            {/* Manual, Config, App, Transfer, Statistics sections */}
            <div style={Style.col}>
                {/* Manual section */}
                <section >
                    <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        marginLeft: "13px",
                        marginRight: showManual ? "13px" : "16px"
                    }}>
                        <div style={{ display: "flex" }}>
                            <p style={{
                                cursor: "pointer", verticalAlign: "middle",
                                fontSize: "20px",
                                color: "white"
                            }} onClick={() => { setShowManual(!showManual); }}>使用手冊</p>
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
                                <h4 style={{
                                    marginBottom: "0.2em",
                                    fontSize: "24px",
                                    color: "white"
                                }}>操作指示</h4>
                                <ul>
                                    <li style={{ fontSize: "20px" }}>點擊轉經輪或是點擊以下 “完整版” 按鈕來開始[▶]播放神咒</li>
                                    <li style={{ fontSize: "20px" }}>點擊以下其他咖啡色按鈕來跳到神咒的其他會</li>
                                    <li style={{ fontSize: "20px" }}>播放神咒時, 可以隨時再次點擊轉經輪來暫停[◼]播放</li>
                                    <li style={{ fontSize: "20px" }}>每一次播放完神咒, APP會在統計區的 “本次持咒次數” 顯示欄位自動累計加一</li>
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
                            sfx != undefined ?
                                <MantraPlayer
                                    showSkip={true}
                                    showSubtitles={true}
                                    audio={sfx}
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
                {/* Statistics (Write) & 回向 Transfer of Merit form */}
                <section style={{}}>
                    <form action={submit}>



                        <fieldset style={Style.counterFieldset}>
                            <legend style={{ paddingLeft: "0.5em", paddingRight: "0.5em", fontWeight: "bolder", fontSize: "24px", color: "white" }}>
                                更新個人次數
                            </legend>
                            <p style={{ fontSize: "17px", color: "white"}}>
                                持咒完後，請記得填以下表格，點 [送出] 按鈕，系統會累計您最新的個人持咒次數。注意，“本次持咒次數” 不可為 0 或小於 0 次。<br />
                                回向内容可填可不填，如果您決定填回向，系統會自動標注回向者名，日期，回向來源 “持誦楞嚴神咒 #次” (# 為 “本次持咒次數” 的次數)。
                            </p>
                            <br></br>
                            {/* Local count */}
                            
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        // gap: "10px",
                                    }}>
                                        <label htmlFor="meritText" style={{ color: "white", fontSize: "20px", fontWeight: "bolder" }}>
                                            統計
                                        </label>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",}}>
                                            <label htmlFor="editLocalCount" style={{ color: "white", fontSize: "20px", display: "flex", alignItems: "center" }}>
                                                本次持咒次數:
                                                <input type="number"
                                                    name="editLocalCount" id="editLocalCount"
                                                    defaultValue={localCount}
                                                    style={{
                                                        display: editable ? "inline-block" : "none",
                                                        width: "70px",
                                                        height: "28px",
                                                        fontSize: "21px",
                                                        // paddingLeft: "5px",
                                                        color: "black"
                                                    }} />
                                                {
                                                editable ? "" : localCount}
                                            </label>
                                            <button type="button" style={Style.manaulEditBtn} onClick={() => { validateManualEdit(); }}>
                                                {!editable ? "手動輸入次數" : "暫存"}
                                            </button>
                                        </div>
                                        
                                    </div>
                                
                            {/* Merit */}
                           
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px"
                                    }}>
                                        <label htmlFor="meritText" style={{ color: "white", fontSize: "20px", fontWeight: "bolder" }}>
                                            回向
                                        </label>
                                        <textarea
                                            name="meritText" id="meritText"
                                            style={Style.inputMerit} maxLength={150}>
                                        </textarea>
                                    </div>
                             
                            
                            {/* Submit msg */}
                            <p style={{ display: "flex", justifyContent: "center", color: "rgb(60, 60, 30)", fontSize: "18px", fontWeight: "bolder", }}>
                                {msg}
                            </p>
                            {/* Submit button */}
                            <button type="submit" style={{ ...Style.submit, background: localCount != 0 ? "saddlebrown" : "darkgray" }}>
                                送出
                            </button>

                        </fieldset>

                    </form>
                </section>
            </div>
        </div>
    );
};











