'use client'

import { useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation"

import { validateUsername, validatePassword } from "@/utils/Validator";

const Style: { [key: string]: React.CSSProperties } = {
    main: {
        display: "flex",
        flexDirection: "column",
        height: "70vh",
        minHeight: "350px",
        alignItems: "center",
    },
};

export default function Page() {
    // useState - change UI
    const [loginOrSignUp, setLoginOrSignUp] = useState<"login" | "signUp">("login");
    const [showPw, setShowPw] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<string>("");
    const [pwError, setPwError] = useState<string>("");
    const [authError, setAuthError] = useState<string>("");

    // useState - track value
    const [username, setUsername] = useState<string>("");

    /**
     * Form submit to /app/api/auth/login or /app/api/auth/signup
     * @param formData 
     */
    async function handleSubmit(formData: { get: (arg0: string) => any; }) {
        const usernameInput = formData.get("usernameInput");
        const pwInput = formData.get("pwInput");
        console.log(`${loginOrSignUp} submitted usernameInput: '${usernameInput}', pwInput: '${pwInput}'`);

        // Flag to stop request sending if there are any errors
        let sendReq : boolean = true;

        // Reset errors
        setUsernameError("");
        setPwError("");
        setAuthError("");

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
                    body: JSON.stringify({ usernameInput, pwInput }), // TODO JWT sign it
                });
                if (response.ok) {
                    console.log("/api/auth/login success");
                    redirect("/profile");
                } else {
                    console.error("/api/auth/login failed:", response);
                    if (response.status == 401) { // unauthorized， invalid creds
                        setAuthError("用户名或密码不正确");
                    } else if (response.status == 500) { // Internal Server Error
                        setAuthError("無法處理, 通知工程師");
                    } else {
                        setAuthError("無法處理, 通知工程師");
                    }
                }
            } else {
                // Sign Up
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usernameInput, pwInput }),
                });
                if (response.ok) {
                    console.log("/api/auth/signup success");
                    redirect("/profile");
                } else {
                    console.error("/api/auth/signup failed:", response);
                    if (response.status == 409) { // Username taken
                        setAuthError("此用戶名已被註冊");
                    } else if (response.status == 400) { // Params missing
                        setAuthError("不可少必要參數");
                    } else if (response.status == 500) { // Internal Server Error
                        setAuthError("無法處理, 通知工程師");
                    } else if (response.status == 401) { // Unauthorized
                        setAuthError("無權限, 通知客服");
                    }else {
                        setAuthError("無法處理, 通知工程師");
                    }
                }
            }
        }
    }

    function handleReset() {
        alert("請打寳嚴客服專綫 (07) 522-4676, \r\n或寫信到寳嚴客服電子郵件 yuandaochanmonastery@gmail.com");
    }

    return (
        <main style={Style.main}>
            <section style={{ 
                background: "transparent",
                display: "flex",
                justifyContent: "space-around", 
                flexGrow: "1",
                flexBasis: "90%",
                maxWidth: "800px",
                minWidth: "350px",
                
                // border: "white 2px solid",
                // borderRadius: "5px",
                }}>
                {/* Centerpiece */}
                <div style={{ 
                    display: "flex",
                    marginTop: "1em",
                    marginRight: "2em",
                    justifyContent: "space-around", 
                    alignItems: "center",}}>
                    <Image width={100} height={330} src={"/centerpiece.png"} alt={"寳嚴"} style={{ }}></Image>
                </div>
            {
                loginOrSignUp == "login" ?
                <div style={{ 
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "2em",
                    justifyContent: "space-around", }}>
                    <form action={handleSubmit} 
                        style={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            justifyContent: "center", 
                            alignItems: "space-around" }}>
                        {/* Input username */}
                        <div>
                            <input type="text" placeholder="輸入用戶名"
                                name="usernameInput" id="usernameInput"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                style={{ padding: "0.3em", fontSize: "24px", fontWeight: "bold"}}
                                // If there are characters in username that do not appear in the regex list, then shorten max length to 70.
                                // Chinese takes up more bytes and can cause truncation issues
                                maxLength={/[^a-zA-Z0-9!@#$%^&*)(}{`=_/?.><+~-]+/giu.test(username)? 70 : 250} 
                                size={9} />
                                <p style={{textAlign:"right", color: "rgb(255, 180, 68)"}}>{usernameError}</p>
                        </div>
                        {/* Input password */}
                        <div>
                            <input type={showPw ? "text" : "password"} placeholder="輸入您的密碼" 
                                id="pwInput" name="pwInput" 
                                style={{ padding: "0.3em", marginTop: "5px", fontSize: "24px", fontWeight: "bold"}}
                                maxLength={64}
                                size={9}></input>
                                <p style={{textAlign:"right", color: "rgb(255, 180, 68)"}}>{pwError}</p>
                        </div>
                        {/* Show password */}
                        <div>
                            <input type="checkbox" id="showPw" name="showPw" style={{
                                width: "35px", height: "35px", 
                                marginLeft: "0px", marginRight: "5px", marginTop: "5px", marginBottom: "5px"}}
                                onClick={() => setShowPw(!showPw)}
                            ></input>
                            <label htmlFor="showPw" style={{ 
                                fontSize:"24px", 
                                color: "white"}}>顯示密碼</label>
                        </div>
                        {/* Form submit & Forgot password*/}
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <a style={{ 
                                fontSize:"18px", 
                                paddingTop: "14px",
                                color: "white"}}
                                target="_self"
                                onClick={handleReset}>忘記密碼?</a>
                            <button type="submit" style={{ 
                                width: "80px", 
                                fontSize:"24px", 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "space-around",
                                fontWeight: "bold",
                                background: "saddlebrown",
                                border: "white 1px solid",
                                borderRadius: "5px",
                                padding: "2px",
                                color: "white"
                                }}>
                                {/* <Image width={25} height={25} src={"/icons/icon_confirm_nobg.png"} alt={"Submit"} style={{ filter : "invert(1)" }}></Image> */}
                                登入
                            </button>
                        </div>
                        {/* Auth error */}
                        <div style={{marginTop: "1em", fontSize:"20px", color: "rgb(255, 180, 68)", textAlign: "center"}}>
                            {authError}
                        </div>
                        {/* Go to Sign up */}
                        <div style={{
                            marginTop: "50px", fontSize:"24px", 
                            display: "flex", alignItems:"center",
                            color: "white"}} onClick={() => {
                                setLoginOrSignUp("signUp");
                                setAuthError("");
                            }}>
                                前往註冊
                                <Image style={{filter:"invert(1)"}} src={"/icons/login3.png"} alt={"Login icon"} width={25} height={25}></Image>
                        </div>
                    </form>
                </div>
                : 
                <div style={{ 
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "2em",
                    justifyContent: "space-around", }}>
                    <form action={handleSubmit} style={{ 
                        display: "flex", flexDirection: "column", 
                        justifyContent: "center", 
                        alignItems: "space-around" }}>
                        <h3>請自行建立帳戶名稱,</h3>
                        <h3>建立後就不可變更.</h3>
                        <br></br>
                        {/* Input username */}
                        <div>
                            <input type="text" placeholder="輸入用戶名"
                                name="usernameInput" id="usernameInput"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                style={{ 
                                    padding: "0.3em", 
                                    fontSize: "24px", 
                                    fontWeight: "bold"}}
                                // If there are characters in username that do not appear in the regex list, then shorten max length to 70.
                                // Chinese takes up more bytes and can cause truncation issues
                                maxLength={/[^a-zA-Z0-9!@#$%^&*)(}{`=_/?.><+~-]+/giu.test(username)? 70 : 250}
                                size={9} />
                                <p style={{textAlign:"right", color: "rgb(255, 180, 68)"}}>{usernameError}</p>
                        </div>
                        {/* Input password */}
                        <div>
                            <input type={showPw ? "text" : "password"} placeholder="輸入您的密碼" 
                                id="pwInput" name="pwInput" 
                                style={{ 
                                    padding: "0.3em", 
                                    marginTop: "5px", 
                                    fontSize: "24px", 
                                    fontWeight: "bold"}}
                                maxLength={64}
                                size={9}></input>
                                <p style={{textAlign:"right", color: "rgb(255, 180, 68)"}}>{pwError}</p>
                        </div>
                        {/* Show password */}
                        <div>
                            <input type="checkbox" id="showPw" name="showPw" style={{
                                width: "35px", height: "35px", 
                                marginLeft: "0px", marginRight: "5px", marginTop: "5px", marginBottom: "5px"}}
                                onClick={() => setShowPw(!showPw)}
                            ></input>
                            <label htmlFor="showPw" style={{ 
                                fontSize:"24px",
                                color:"white"}}>顯示密碼</label>
                        </div>
                        {/* Form submit */}
                        <div style={{display: "flex", justifyContent: "right"}}>
                            <button type="submit" style={{ 
                                width: "80px", 
                                fontSize:"24px", 
                                display: "flex", alignItems: "center", justifyContent: "space-around",
                                fontWeight: "bold",
                                background: "saddlebrown",
                                border: "white 1px solid",
                                borderRadius: "5px",
                                padding: "2px",
                                color: "white"
                                }}>
                                註冊
                            </button>
                        </div>
                        {/* Auth error */}
                        <div style={{marginTop: "1em", fontSize:"20px", color: "rgb(255, 180, 68)", textAlign: "center"}}>
                            {authError}
                        </div>
                        {/* Go to login */}
                        <div style={{
                                marginTop: "50px", fontSize:"24px", display: "flex", 
                                alignItems:"center", color: "white"}} 
                            onClick={() => {
                                setLoginOrSignUp("login");
                                setAuthError("");
                            }}>
                                前往登入 
                                <Image style={{filter:"invert(1)"}} src={"/icons/login2.png"} alt={"Login icon"} width={25} height={25}></Image>
                        </div>
                    </form>
                </div>
            }
            </section>
        </main>
    );
}
