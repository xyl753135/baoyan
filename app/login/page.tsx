'use client'

import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";

import { validateUsername, validatePassword } from "@/utils/Validator";

const Style: { [key: string]: React.CSSProperties } = {
    main: {
        display: "flex",
        flexDirection: "column",
    },
};

export default function Home() {

    // useState - change UI
    const [loginOrSignUp, setLoginOrSignUp] = useState<"login" | "signUp">("login");
    const [showPw, setShowPw] = useState<boolean>(false);
    // const [emailError, setEmailError] = useState<string>("");
    const [usernameError, setUsernameError] = useState<string>("");
    const [pwError, setPwError] = useState<string>("");
    const [authError, setAuthError] = useState<string>("");

    /**
     * Form submit to /app/api/auth/login or /app/api/auth/signup
     * @param formData 
     */
    async function handleSubmit(formData: { get: (arg0: string) => any; }) {
        // const emailInput = formData.get("emailInput");
        const usernameInput = formData.get("usernameInput");
        const pwInput = formData.get("pwInput");
        console.log(`${loginOrSignUp} submitted usernameInput: '${usernameInput}', pwInput: '${pwInput}'`);

        // Flag to stop request sending if there are any errors
        let sendReq : boolean = true;

        // Reset errors
        // setEmailError("");
        setUsernameError("");
        setPwError("");

        // Validate inputs
        const valUserObj = validateUsername(usernameInput);
        const valPwObj = validatePassword(pwInput);
        if (valUserObj.isValid == false || valPwObj.isValid == false) {
            sendReq = false;
            setUsernameError(valUserObj.message);
            setPwError(valPwObj.message);
        }

        // No errors tripped the flag to false, so send request
        if (sendReq) {
            if (loginOrSignUp == "login") {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usernameInput, pwInput }),
                });
                if (response.ok) {
                    console.log("/api/auth/login success");
                    redirect('/profile');
                } else {
                    console.error("/api/auth/login failed:", response);
                    if (response.status == 401) {
                        setAuthError(response.statusText);
                    } else if (response.status == 500) {
                        setAuthError(response.statusText);
                    } else {
                        setAuthError(response.statusText);
                    }
                }
            } else {
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usernameInput, pwInput }),
                });
                if (response.ok) {
                    console.log("/api/auth/signup success");
                    redirect('/profile');
                } else {
                    console.error("/api/auth/signup failed:", response);
                }
            }
        }
    }

    function handleReset() {
        alert("請通知寳嚴客服");
    }

    return (
        <main style={Style.main}>
            <section style={{ 
                background: "transparent",
                display: "flex",
                justifyContent: "space-around", 
                flexGrow: "1",
                // border: "blue 2px solid"
                }}>
                <div style={{ 
                    marginTop: "15px",
                    justifyContent: "space-around", }}>
                    <Image width={100} height={330} src={"/centerpiece.png"} alt={"寳嚴"} style={{ }}></Image>
                </div>
            {
                loginOrSignUp == "login" ?
                <div style={{ 
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around", }}>
                    <form action={handleSubmit} style={{ 
                        display: "flex", flexDirection: "column", 
                        justifyContent: "center", 
                        alignItems: "space-around" }}>

                        <div>
                            {/* <input type="email" placeholder="輸入電子郵件"
                                name="emailInput" id="emailInput"
                                style={{ padding: "0.3em", fontSize: "24px", fontWeight: "bold"}}
                                maxLength={254}
                                size={9} />
                                <p style={{textAlign:"right", color: "rgb(255, 180, 68)"}}>{emailError}</p> */}
                            <input type="text" placeholder="輸入使用者名稱"
                                name="usernameInput" id="usernameInput"
                                style={{ padding: "0.3em", fontSize: "24px", fontWeight: "bold"}}
                                maxLength={254}
                                size={9} />
                                <p style={{textAlign:"right", color: "rgb(255, 180, 68)"}}>{usernameError}</p>
                        </div>

                        <div>
                            <input type={showPw ? "text" : "password"} placeholder="輸入您的密碼" 
                                id="pwInput" name="pwInput" 
                                style={{ padding: "0.3em", marginTop: "5px", fontSize: "24px", fontWeight: "bold"}}
                                maxLength={64}
                                size={9}></input>
                                <p style={{textAlign:"right", color: "rgb(255, 180, 68)"}}>{pwError}</p>
                        </div>

                        <div>
                            <input type="checkbox" id="showPw" name="showPw" style={{
                                width: "35px", height: "35px", 
                                marginLeft: "0px", marginRight: "5px", marginTop: "5px", marginBottom: "5px"}}
                                onClick={() => setShowPw(!showPw)}
                            ></input>
                            <label htmlFor="showPw" style={{ fontSize:"24px"}}>顯示密碼</label>
                        </div>

                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <a style={{ fontSize:"18px", paddingTop: "14px"}}
                                target="_self"
                                onClick={handleReset}>忘記密碼?</a>
                            <button type="submit" style={{ 
                                width: "85px", 
                                fontSize:"24px", 
                                display: "flex", alignItems: "center", justifyContent: "space-around",
                                fontWeight: "bold",
                                background: "saddlebrown",
                                border: "white 1px solid",
                                borderRadius: "5px",
                                padding: "2px"
                                }}>
                                {/* <Image width={25} height={25} src={"/icons/icon_confirm_nobg.png"} alt={"Submit"} style={{ filter : "invert(1)" }}></Image> */}
                                登入
                            </button>
                        </div>
                        <div style={{marginTop: "1em", fontSize:"20px", color: "rgb(255, 180, 68)", textAlign: "center"}}>
                            {authError}
                        </div>
                        <div style={{marginTop: "50px", fontSize:"24px"}}>
                            <span onClick={() => setLoginOrSignUp("signUp")}>前往注冊 -&gt;</span>
                        </div>
                    </form>
                </div>
                : 
                <div style={{ 
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around", }}>
                    <form action={handleSubmit} style={{ 
                        display: "flex", flexDirection: "column", 
                        justifyContent: "center", 
                        alignItems: "space-around" }}>

                        <div>
                            {/* <input type="email" placeholder="輸入電子郵件"
                                name="emailInput" id="emailInput"
                                style={{ padding: "0.3em", fontSize: "24px", fontWeight: "bold"}}
                                maxLength={254}
                                size={9} />
                                <p style={{textAlign:"right", color: "rgb(255, 180, 68)"}}>{emailError}</p> */}
                            <input type="text" placeholder="輸入使用者名稱"
                                name="usernameInput" id="usernameInput"
                                style={{ padding: "0.3em", fontSize: "24px", fontWeight: "bold"}}
                                maxLength={254}
                                size={9} />
                                <p style={{textAlign:"right", color: "rgb(255, 180, 68)"}}>{usernameError}</p>
                        </div>

                        <div>
                            <input type={showPw ? "text" : "password"} placeholder="輸入您的密碼" 
                                id="pwInput" name="pwInput" 
                                style={{ padding: "0.3em", marginTop: "5px", fontSize: "24px", fontWeight: "bold"}}
                                maxLength={64}
                                size={9}></input>
                                <p style={{textAlign:"right", color: "rgb(255, 180, 68)"}}>{pwError}</p>
                        </div>

                        <div>
                            <input type="checkbox" id="showPw" name="showPw" style={{
                                width: "35px", height: "35px", 
                                marginLeft: "0px", marginRight: "5px", marginTop: "5px", marginBottom: "5px"}}
                                onClick={() => setShowPw(!showPw)}
                            ></input>
                            <label htmlFor="showPw" style={{ fontSize:"24px"}}>顯示密碼</label>
                        </div>

                        <div style={{display: "flex", justifyContent: "right"}}>
                            <button type="submit" style={{ width: "61px", fontSize:"24px"}}>
                                注冊
                            </button>
                        </div>

                        <div style={{marginTop: "50px", fontSize:"24px"}}>
                            <span onClick={() => setLoginOrSignUp("login")}>前往登入 -&gt;</span>
                        </div>
                    </form>
                </div>
            }

                
            </section>
        </main>
    );
}
