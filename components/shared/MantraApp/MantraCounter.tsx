import { useRouter } from "next/navigation";
import { GenericButton } from "../GenericButton";
import Image from "next/image";
import { useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
    col: {
        display: "flex",
        flexDirection: "column",
    },
    counterFieldset: {
        // height: "100%",
        paddingTop: "0.5em",
        paddingBottom: "0.5em",
        paddingLeft: "0.5em",
        paddingRight: "0.5em",
        margin: "0.5em",
        width: "320px",
        border: "white 2px solid",
        borderRadius: "5px",
    },
    statisticsItem: {
        fontSize: "20px",
        paddingLeft: "0.5em",
        paddingBottom: "0.5em",
        display: "flex",
        alignItems: "center",
        color: "white"
    }
};

type Props = {
    localCount: number,
    setLocalCount: Function,
    memberCount: number,
    globalCount: number,
    username: string,
}

export function MantraCounter({
    localCount = 0,
    setLocalCount,
    memberCount = 0,
    globalCount = 0,
    username: usernameProp,
}: Props) {
    const router = useRouter();

    const [editable, setEditable] = useState<boolean>(false)

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
            if (usernameProp != '') {
                try {
                    await fetch(`/api/counters/increment-counter`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                app: "mantraapp",
                                name: "shurangama",
                                count: localCount,
                                username: usernameProp 
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


    return (
        <section style={{ ...Style.col, ...{ alignItems: "center" } }}>
            <fieldset style={{ ...Style.counterFieldset }}>
                <legend style={{
                    paddingLeft: "0.5em",
                    paddingRight: "0.5em",
                    fontWeight: "bolder",
                    fontSize: "24px",
                    color: "white"
                }}>統計</legend>
                <p style={Style.statisticsItem}>本次持咒次數:
                    <input type="number"
                        name="editLocalCount" id="editLocalCount"
                        defaultValue={localCount}
                        style={{
                            display: editable && usernameProp != '' ? "inline-block" : "none",
                            width: "55px",
                            height: "28px",
                            fontSize: "21px",
                            paddingLeft: "6px",
                        }}
                        min={0}
                        max={99}
                        maxLength={2}
                    />
                    <span style={{
                        display: editable && usernameProp != ''? "none" : "inline-block",
                        paddingLeft: "8px"
                    }}>{localCount}</span>
                    
                
                    {/* <Image src={ editable? "/icons/save.png" : "/icons/dashboard/pencil.png" } alt={"Edit button"} width={30} height={30}
                        style={{
                            filter: "invert(1)",
                            // border: "black 1px solid",
                            // borderRadius: "50%",
                            // padding: "5px",
                            display: usernameProp != '' ? "inline-block" : "none",
                            marginLeft: editable? "10px" : "47px"
                        }}
                        onClick={
                            () => {
                                if (editable) {
                                    const input  = document.getElementById("editLocalCount");
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
                        }></Image> */}
                    {
                        usernameProp != '' ?
                        <GenericButton
                            label={ !editable ? "手動輸入次數" : "暫存"}
                            handleClick={() => {
                                    if (editable) {
                                        const input  = document.getElementById("editLocalCount");
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
                            }
                            border={"white 1px solid"} borderRadius={"5px"} background={"saddlebrown"}
                            maxWidth={"300px"} maxHeight={"38px"}
                            minWidth={""} minHeight={""}
                            labelFontSize={"16px"}>
                        </GenericButton>
                            :
                            <></>
                    }
                </p>
                {
                    usernameProp != '' ?
                    <div style={{ display: "flex", justifyContent: "space-between"}}>
                        <p style={Style.statisticsItem}>個人累計持咒次數: {memberCount}</p>
                    </div>
                    :
                    <></>
                }
                
                <p style={Style.statisticsItem}>全球總計持咒次數: {globalCount}</p>
                <GenericButton
                    label={"送出"}
                    handleClick={() => {
                        if (localCount > 0) {
                            submitIncrements(localCount);
                        } else {
                            alert("本次次數為 0, 沒有資料可更新");
                        }
                    }}
                    border={"white 1px solid"} borderRadius={"5px"} background={localCount > 0 ? "saddlebrown" : "grey"}
                    // maxWidth={"80px"} maxHeight={"39px"}
                    minWidth={"300px"} minHeight={"38px"}
                    labelFontSize={"24px"}>    
                </GenericButton>

            </fieldset>
        </section>
    );
};













