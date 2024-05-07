'use client'

import { isNullUndefinedOrEmpty, validatePassword } from "@/utils/Validator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
    main: {
        display: "flex",
        flexDirection: "column",
        height: "70vh",
        minHeight: "350px",
        alignItems: "center",
    },
    btn: {
        // width: "80px",
        fontSize: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        fontWeight: "bold",
        background: "saddlebrown",
        border: "white 1px solid",
        borderRadius: "5px",
        padding: "2px",
        color: "white"
    },
    card: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "10px",
        // width: "80px",
        fontSize: "18px",
        fontWeight: "bold",
        background: "saddlebrown",
        border: "white 1px solid",
        borderRadius: "5px",
        padding: "10px",
        color: "white"
    }
};

export default function RecoverPasswordClientWrapper() {
    // useState
    const [step, setStep] = useState<number>(0);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [msg, setMsg] = useState<string>("");

    const router = useRouter();

    async function submitStep2(formData: FormData) {
        // const username = formData.get("usernameInput");
        // const email = formData.get("emailInput");
        // const otp = formData.get("otpInput");
        console.log(`${username} ${email} ${otp}`);

        try {
            await fetch('/api/auth/recover-password/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usernameInput: username,
                    emailInput: email,
                }),
            }).then((response) => {
                console.log(response.status, response.statusText);
                if (response.status == 400) {
                    setMsg("帳號資料正確的話會~5分鐘後收到電子郵件")
                } else if (response.status == 200) {
                    setMsg("帳號資料正確的話會~5分鐘後收到電子郵件")
                } else if (response.status == 500) {
                    setMsg("目前無法繼續協助找回密碼，請稍後再試");
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function submitStep3() {
        console.log(`${username} ${email} ${otp}`);
        await fetch('/api/auth/recover-password/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usernameInput: username,
                emailInput: email,
                otpInput: otp,
            }),
        }).then((response) => {
            console.log(response.status, response.statusText);
            if (response.status == 400) {
                setMsg("* 驗證碼輸入錯誤，無法重新設定密碼");
            } else if (response.status == 200) {
                setMsg("驗證碼輸入正確，請輸入新密碼");
                setStep(step + 1);
            } else if (response.status == 500) {
                setMsg("目前無法繼續協助找回密碼，請稍後再試");
            }
        }).catch(err => {
            console.error(err);
        });
    }

    async function submitStep4(formData: FormData) {
        const pw1 = formData.get("password");
        const pw2 = formData.get("passwordRepeat");
        let sendPOST = false;
        if (pw1 != pw2) {
            setMsg("* 請輸入兩次相同的密碼");
        } else {
            if (isNullUndefinedOrEmpty(pw1)) {
                setMsg("* 密碼不可為空");
            } else {
                const validatePw = validatePassword(String(pw1));
                if (validatePw.isValid) {
                    sendPOST = true;
                } else {
                    setMsg(validatePw.message);
                }
            }
        }
        if (sendPOST) {
            setMsg("重新設定密碼中。。。");
            setTimeout(() => {
                
           
            // TODO make route, template below
            // await fetch('/api/auth/recover-password/update-password', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         newPasword: username,
            //     }),
            // }).then((response) => {
            //     console.log(response.status, response.statusText);
            //     if (response.status == 400) {
            //         setMsg("帳號資料正確的話會~5分鐘後收到電子郵件")
            //     } else if (response.status == 200) {
            //         setMsg("更新密碼成功! 即將自動回去登入頁面");
            //         setTimeout(() => {
            //             alert("redirect!")
            //         }, 3000);
            //     } else if (response.status == 500) {
                    setMsg("目前無法繼續協助找回密碼，請稍後再試");
            //     }
            // }).catch(err => {
            //     console.error(err);
                // });   
            }, 2000);
        }
    }

    return (
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
            <div>
                <div style={{ display: step == 0 ? "flex" : "none", flexDirection: "column", gap: "10px", width: "350px" }}>
                    <h1>忘記密碼</h1>
                    <p>請從以下選擇下一步的忘記密碼流程</p>
                    <button type="button" style={Style.card}
                        onClick={() => {
                            setMsg("");
                            setStep(step + 1);
                        }}>
                        <Image src={"/icons/email.png"} alt={"Email"} 
                            width={60} height={60} style={{ filter: "invert(1)" }}>
                        </Image>
                        發驗證碼到電子信箱
                    </button>
                    {/* <button type="button" style={{ ...Style.btn, background: "gray" }}
                        onClick={() => {
                            setMsg("流程暫時不開放使用。")
                        }}>
                        發驗證碼到手機簡訊
                    </button> */}
                </div>

                <form action={submitStep2}>
                    {/* Input username */}
                    <div style={{ display: step == 1 ? "flex" : "none", flexDirection: "column", gap: "10px", width: "350px" }}>
                        <h1>步驟 {step}（共 3 步）</h1>
                        <p>爲了確認您的身份，請提供有關於您帳號的資料</p>
                        <label htmlFor="usernameInput">輸入用戶名</label>
                        <input type="text"
                            id="usernameInput" name="usernameInput"
                            style={{ padding: "0.3em", fontSize: "24px", fontWeight: "bold", }}
                            size={14}
                            value={username}
                            onChange={e => setUsername(e.target.value)}>
                        </input>
                        <button type="button" style={Style.btn} onClick={() => {
                            setStep(step + 1);
                        }}>下一步</button>
                    </div>


                    {/* Input email, send OTP */}
                    <div style={{ display: step == 2 ? "flex" : "none", flexDirection: "column", gap: "10px", width: "350px" }}>
                        <h1>步驟 {step}（共 3 步）</h1>
                        <p>爲了確認您的身份，請提供有關於您帳號的資料</p>
                        <label htmlFor="emailInput">輸入這個帳號的電子郵件信箱</label>
                        <input type="email"
                            id="emailInput" name="emailInput"
                            style={{ padding: "0.3em", fontSize: "24px", fontWeight: "bold" }}
                            maxLength={64}
                            size={9}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                        </input>
                        <button type="submit" style={Style.btn} onClick={() => {
                            setStep(step + 1)
                        }}>下一步</button>
                    </div>
                </form>

                {/* Verify OTP */}
                <form action={submitStep3}>
                    <div style={{ display: step == 3 ? "flex" : "none", flexDirection: "column", gap: "10px", width: "350px" }}>
                        <h1>步驟 {step}（共 3 步）</h1>
                        <label htmlFor="otpInput">輸入電子郵件裏的驗證碼 <br />One-Time-Password (OTP) 6 位碼</label>
                        {/* <input type="hidden" name="username" id="username" defaultValue={username}/> */}
                        {/* <input type="hidden" name="email" id="email" defaultValue={email}/> */}
                        <input type="text"
                            id="otpInput" name="otpInput"
                            style={{ padding: "0.3em", fontSize: "24px", fontWeight: "bold" }}
                            maxLength={6}
                            size={9}
                            value={otp}
                            onChange={e => setOtp(e.target.value)}>
                        </input>
                        <button type="submit" style={Style.btn}>登入</button>
                    </div>
                </form>

                {/* Enter new password */}
                <form action={submitStep4}>
                    <div style={{
                        display: step == 4 ? "flex" : "none", flexDirection: "column", gap: "10px",
                        width: "350px"
                    }}>
                        <h1>輸入新密碼</h1>
                        <p>儲存前要輸入新密碼兩次，如果兩個密碼不一樣會出現提醒</p>
                        <input type="text"
                            id="password" name="password"
                            style={{ padding: "0.3em", fontSize: "24px", fontWeight: "bold" }}
                            size={9}>
                        </input>
                        
                        <input type="text"
                            id="passwordRepeat" name="passwordRepeat"
                            style={{ padding: "0.3em", fontSize: "24px", fontWeight: "bold" }}
                            size={9}>
                        </input>
                        <button type="submit" style={Style.btn}>儲存</button>
                    </div>
                </form>

                {
                    msg ?
                        <p style={{ marginTop: "20px", textAlign: "center", color: "orange" }}>
                            {msg}
                        </p>
                        :
                        <br></br>
                }
            </div>
        </section>
    )


}