'use client'

import { useState } from "react";

import { InputGroup } from "../Form/InputGroup";

import { validatePassword } from "../../utils/Validator";
import { useRouter } from "next/navigation";

const Style: { [key: string]: React.CSSProperties } = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        // border: "2px white solid",
        borderRadius: "5px",
        padding: "5px"
    },
    btnSubmit: {
        background: "rgb(120, 190, 70)",
        border: "black 2px solid",
        borderRadius: "5px",
        color: "black",
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingTop: "2px",
        paddingBottom: "2px",
        fontSize: "18px"
    },
    btnReset: {
        background: "rgb(255, 176, 49)",
        border: "black 2px solid",
        borderRadius: "5px",
        color: "black",
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingTop: "2px",
        paddingBottom: "2px",
        fontSize: "18px"
    },
    btnDisable: {
        background: "grey",
        border: "white 2px solid",
        borderRadius: "5px",
        color: "white",
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingTop: "2px",
        paddingBottom: "2px",
        fontSize: "18px"
    },
    instructions: {
        color: "white",
        fontSize: "18px"
    },
    msg: {
        color: "orange",
        fontSize: "18px"
    }
}


export const ChangePasswordClientWrapper = ({
    userData,
    w,
    h
}: Props) => {
    const router = useRouter();

    // useState
    // const [username, setUsername] = useState(userData.username);
    const [pw, setPw] = useState("");
    const [pwDisable, setPwDisable] = useState(false);
    const [btnDisable, setBtnDisable] = useState(false);
    const [step, setStep] = useState(1);
    const [msg, setMsg] = useState("");
    
    async function verify(formData: FormData) {
        const pw = String(formData.get("pwInput"));
        const checkedResult = validatePassword(pw);
        if (!checkedResult.isValid) {
            setMsg(checkedResult.message); 
        } else {
            if (!btnDisable) {
                const resp = await fetch('/api/profile/verify-user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: String(formData.get("usernameHidden")),
                        password: pw,
                    }),
                }).then((response) => {
                    console.log(response.status);
                    console.log(response.statusText);
                    return response.json();
                }).then((json) => {
                    console.log(json);
                    setStep(json.verified ? 2 : 1);
                    setMsg(json.verified ? "" : "密碼錯誤");
                    setPw(json.verified ? "" : pw);
                });
            }
        }
    }

    async function save(formData: FormData) {
        const pw = String(formData.get("pwInput"));
        const checkedResult = validatePassword(pw);
        if (!checkedResult.isValid) {
            setMsg(checkedResult.message); 
        } else {
            if (!btnDisable) {
                const response = await fetch('/api/profile/change-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: String(formData.get("usernameHidden")),
                        password: pw,
                    }),
                }).then((response) => {
                    console.log(response.status, response.statusText);
                    return response.json();
                }).then((json) => {
                    if (json.error) {
                        setMsg(json.error);
                    } else {
                        setMsg("密碼更新成功! \r\n三秒鈡後自動回去使用者個人資料。。。");
                        setBtnDisable(true);
                        setTimeout(() => {
                            router.push("/profile");
                        }, 3000);
                    }
                    console.log(json);
                });
            }
        }
    }

    return (
        <section style={{
            // background: "grey",
            border: "white 1px solid",
            maxWidth: "350px",
            width: w,
            height: h,
            paddingLeft: "5px",
            paddingRight: "5px",
            paddingTop: "5px",
            paddingBottom: "5px",
            display: "flex",
            alignItems: "center"
        }}>
            <h2 style={{
                color: "white",
                minWidth: "75px",
                display: "flex", justifyContent: "center", alignItems: "center"
            }}>
                步驟 {step}
            </h2>
            {
                step == 1 ?
                    <form action={verify}
                        style={Style.form}>
                        <p style={Style.instructions}>
                            爲了保障您資料的安全，<br></br>
                            更新密碼前請先確認身份。<br></br>
                            輸入目前使用的密碼。
                        </p>
                        {/* username (hidden) */}
                        <input type="text"
                            name="usernameHidden" id="usernameHidden"
                            value={userData.username} readOnly hidden />

                        {/* password */}
                        <InputGroup
                            placeholder={""}
                            id={"pwInput"}
                            value={pw}
                            changeHandler={(event) => { setPw(event.target.value) }}
                            errorMsg={msg}
                            maxLength={255}
                            width={155}
                            readOnly={pwDisable ? true : false} label={"目前密碼"}>
                        </InputGroup>

                        {/* msg */}
                        {
                            // msg != "" ?
                                // <div style={Style.msg}>
                                //     {msg}
                                // </div>
                                // :
                                // <div>
                                //     <br></br>
                                // </div>
                        }

                        {/* bottom buttons */}
                        <div style={{
                            display: "flex",
                            flexGrow: "1",
                            justifyContent: "space-between"
                        }}>
                            <button type="submit" style={btnDisable? Style.btnDisable : Style.btnSubmit}>確認</button>
                            <button type="reset" style={btnDisable? Style.btnDisable : Style.btnReset} onClick={() => {
                                if (!btnDisable) {
                                    setPw("");
                                    setMsg("");
                                }
                            }}>清空</button>
                        </div>
                    </form>
                    :
                    <></>
            }
            {
                step == 2 ?
                    <form action={save}
                        style={Style.form}>
                        <p style={Style.instructions}>
                            請輸入新密碼。
                        </p>
                        {/* username (hidden) */}
                        <input type="text"
                            name="usernameHidden" id="usernameHidden"
                            value={userData.username} readOnly hidden />

                        {/* password */}
                        <InputGroup
                            placeholder={""}
                            id={"pwInput"}
                            value={pw}
                            changeHandler={(event) => { setPw(event.target.value) }}
                            errorMsg={msg}
                            maxLength={255}
                            width={155}
                            readOnly={pwDisable ? true : false} label={"新密碼"}>
                        </InputGroup>

                        {/* msg */}
                        {
                            // msg != "" ?
                            //     <div style={Style.msg}>
                            //         {msg}
                            //     </div>
                            //     :
                            //     <div>
                            //         <br></br>
                            //     </div>
                        }

                        {/* bottom buttons */}
                        <div style={{
                            display: "flex",
                            flexGrow: "1",
                            justifyContent: "space-between"
                        }}>
                            <button type="submit" style={btnDisable? Style.btnDisable : Style.btnSubmit}>確認</button>
                            <button type="reset" style={btnDisable? Style.btnDisable : Style.btnReset} onClick={() => {
                                if (!btnDisable) {
                                    setPw("");
                                    setMsg("");
                                }
                            }}>清空</button>
                            {/* <button type="button" onClick={() => {
                                setStep(1);
                                setMsg("");
                            }}>重來</button> */}
                        </div>
                    </form>
                    :
                    <></>
            }


        </section>

    )
}


type Props = {
    userData: {
        username: string,
        name: string,
        bname: string,
        line: string,
        whatsapp: string,
        wechat: string,
        email: string,
        phone: string,
        country: string,
        locale: string,
        dob: string,
        gender: string,
        profilePicPath: string
    },
    w: string,
    h: string
}
