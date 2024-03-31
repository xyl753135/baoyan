'use client'

import Image from "next/image";
import { useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
    container: {
        // margin: "1em",
        display: "flex",
        flexDirection: "column",
        flexBasis: "600px",
        flexGrow: "1",
        justifyContent: "space-around",
        alignItems: "center",
        // border: "black 2px solid",
    },
};

/**
     * Form submit to /app/api/auth/login or /app/api/auth/signup
     * @param formData 
     */
async function handleSubmit(formData: { get: (arg0: string) => any; }) {
    alert("施工中");
}

export default function Page() {
    const [role, setRole] = useState<string>("student");
    const [roleError, setRoleError] = useState<string>("");

    const [saveError, setSaveError] = useState<string>("");

    return <main style={Style.container}>
        <h1>個人資料</h1>
        <br />
        <Image src={"/placeholders/wip.png"} alt={"Work in Progress"} width={300} height={300}></Image>
        <h1>以下部分為施工中，請諒解</h1>
        <br></br>
        <br></br>
        <br></br>
        大綱 Outline
        <Image src={"/placeholders/profLayout.png"} alt={"userF"} width={574} height={499}></Image>
        <br />
        <br />
        <br />

        <div style={Style.container}>
            
            <p>請填寫資料，方便以後找回帳戶，也方便以後寳嚴通知您最新課程，行政公佈，每月簡報，等消息</p>
            <p>（以上訊息調整中。。。)</p>
            <br />


            <form action={handleSubmit} style={{
                display: "flex", flexDirection: "column",
                justifyContent: "center",
                alignItems: "space-around"
            }}>

                <label htmlFor="email">電子郵件地址</label>
                <input type="text" name="email" id="email" />
                <br />

                <label htmlFor="email">手機號碼</label>
                <input type="text" name="cellNum" id="cellNum" />
                <br />

                <label htmlFor="email">帳戶創世日期</label>
                <input type="date" name="crDate" id="crDate" />
                <br />

                <label htmlFor="email">最近登入日期</label>
                <input type="date" name="lsLogin" id="lsLogin" />

                <br />

                <label htmlFor="email">個人頭像</label>
                <input type="file" name="profPic" id="profPic" />

                預設可選的頭像 (如果不上傳)
                <Image src={"/icons/role_admin.png"} alt={"admin"} width={100} height={100}></Image> ^ 管理員才看得到/可選這個
                <Image src={"/icons/role_user_m.png"} alt={"userM"} width={100} height={100}></Image>
                <Image src={"/icons/role_user_f.png"} alt={"userF"} width={100} height={100}></Image>

                <br />

                <label htmlFor="email">客制化背景</label>
                <input type="file" name="profPic" id="profPic" />




                <br></br>
                {/* Form submit */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button type="submit" style={{
                        width: "80px",
                        fontSize: "24px",
                        display: "flex", alignItems: "center", justifyContent: "space-around",
                        fontWeight: "bold",
                        background: "saddlebrown",
                        border: "white 1px solid",
                        borderRadius: "5px",
                        padding: "2px"
                    }}>
                        儲存
                    </button>
                </div>
                {/* Save error */}
                <div style={{ marginTop: "1em", fontSize: "20px", color: "rgb(255, 180, 68)", textAlign: "center" }}>
                    {saveError}
                </div>
            </form>
            
            <br />

            (記錄只儲存最近10個記錄)
            <table>
                <caption>
                    登入記錄
                </caption>
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Browser</th>
                        <th scope="col">Device</th>
                        <th scope="col">Location</th>
                        <th scope="col">IP</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1990/01/13</td>
                        <td>Safari</td>
                        <td>iPhone 12</td>
                        <td>Pluto</td>
                        <td>0.0.0.0</td>
                    </tr>
                    <tr>
                        <td>2024/12/14</td>
                        <td>Firefox</td>
                        <td>Android</td>
                        <td>Taiwan</td>
                        <td>255.255.255.255</td>
                    </tr>
                    <tr>
                        <td>2024/12/15</td>
                        <td>Firefox</td>
                        <td>Android</td>
                        <td>Taiwan</td>
                        <td>255.255.255.255</td>
                    </tr>
                    <tr>
                        <td>2024/12/16</td>
                        <td>Firefox</td>
                        <td>Android</td>
                        <td>Taiwan</td>
                        <td>255.255.255.255</td>
                    </tr>
                    <tr>
                        <td>2025/12/14</td>
                        <td>Chrome</td>
                        <td>iPhone 21X</td>
                        <td>United States</td>
                        <td>128.1.1.1</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>如果登入記錄有異常，建議儘快更新密碼</td>
                        {/* <td></td>
                        <td></td>
                        <td></td>
                        <td></td> */}
                    </tr>
                </tfoot>
            </table>
        </div>

    </main>
}