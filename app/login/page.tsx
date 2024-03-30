'use client'

import Image from "next/image";
import { useState } from "react";

import useWindowSize from "@/utils/WindowResize"

const Style: { [key: string]: React.CSSProperties } = {
    main: {
        display: "flex",
        flexDirection: "column",
    },
};

export default function Home() {

    const [loginOrSignUp, setLoginOrSignUp] = useState<"login" | "signUp">("login");

    const [showPw, setShowPw] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>("");
    const [pwError, setPwError] = useState<string>("");

    // 
    const size = useWindowSize();

    function handleSubmit(formData: { get: (arg0: string) => any; }) {
        const emailInput = formData.get("emailInput");
        const pwInput = formData.get("pwInput");
        // Reset errors
        setEmailError("");
        setPwError("");

        if (emailInput.length == 0) {
            // alert("Email can't be empty")
            setEmailError("* 這為必填欄位");
        }
        if (pwInput.length == 0) {
            // alert("Password can't be empty")
            setPwError("* 這為必填欄位");
        }
        alert(`You submitted emailInput: '${emailInput}', pwInput: '${pwInput}'`);
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
                            <input type="email" placeholder="輸入電子郵件"
                                name="emailInput" id="emailInput"
                                style={{ padding: "0.3em", fontSize: "24px", fontWeight: "bold"}}
                                maxLength={254}
                                size={9} />
                                <p style={{textAlign:"right", color: "rgb(255, 180, 68)"}}>{emailError}</p>
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
                            <a style={{ fontSize:"24px"}}>忘記密碼?</a>
                            <button type="submit" style={{ width: "61px", fontSize:"24px"}}>
                                登入
                            </button>
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
                            <input type="email" placeholder="輸入電子郵件"
                                name="emailInput" id="emailInput"
                                style={{ padding: "0.3em", fontSize: "24px", fontWeight: "bold"}}
                                maxLength={254}
                                size={9} />
                                <p style={{textAlign:"right", color: "rgb(255, 180, 68)"}}>{emailError}</p>
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
