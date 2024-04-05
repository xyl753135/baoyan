'use server'

import Image from "next/image";
import { getSession } from "@/utils/AuthHelper";
import { Dashboard } from "@/components/Profile/Dashboard";
import { PersonalData } from "@/components/Profile/PersonalData";
import { parseMonth, convertISO8601DateToYYYYMMDD } from "@/utils/TimeParser";
import { isNullUndefinedOrEmpty } from "@/utils/Validator";


const Style: { [key: string]: React.CSSProperties } = {
    container: {
        marginTop: "1em",
        display: "flex",
        flexDirection: "column",
        // flexBasis: "600px",
        flexGrow: "1",
    },

    leftCol: {
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-around",
        // alignItems: "space-between",
        // border: "black 2px dashed",
        width: "350px",
        height: "800px"
    },
    inputGroup: {
        display: "flex"
    }
};

export default async function Page() {
    // const [role, setRole] = useState<string>("student");
    // const [roleError, setRoleError] = useState<string>("");
    // const [saveError, setSaveError] = useState<string>("");

    const session = await getSession();
    const userData = session.user;
    console.log("userData", userData);

    const YYYYMMDD = convertISO8601DateToYYYYMMDD(userData.dob);
    
    return <main style={Style.container}>
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around"
        }}>
            <PersonalData userData={{
                username: userData.username,
                name: userData.name,
                bname: isNullUndefinedOrEmpty(userData.bname)? "" : userData.bname,
                line: userData.line,
                whatsapp: userData.whatsapp,
                email: userData.email,
                phone: userData.phone,
                country: userData.country,
                locale: userData.locale,
                dob: YYYYMMDD
            }}></PersonalData>
            <Dashboard h={800} w={350}
                buttonDatas={[
                    [
                        {
                            imgPath: "/icons/dashboard/mantrawheel.png",
                            btnLabel: "大佛頂首楞嚴神咒",
                            redirectPath: "/applications/mantra-shurangama",
                            filter: "invert(1)"
                        },
                        {
                            imgPath: "/placeholders/wip.png",
                            btnLabel: "施工中。。。",
                            redirectPath: "/",
                            filter: ""
                        },
                    ],
                    [
                        {
                            imgPath: "/placeholders/wip.png",
                            btnLabel: "施工中。",
                            redirectPath: "/",
                            filter: ""
                        },
                        {
                            imgPath: "/placeholders/wip.png",
                            btnLabel: "施工中。",
                            redirectPath: "/",
                            filter: ""
                        },
                        {
                            imgPath: "/placeholders/wip.png",
                            btnLabel: "施工中。",
                            redirectPath: "/",
                            filter: ""
                        },
                    ],
                    [
                        {
                            imgPath: "/placeholders/wip.png",
                            btnLabel: "施工中。。。",
                            redirectPath: "/",
                            filter: ""
                        },
                    ],
                    [
                        {
                            imgPath: "/placeholders/wip.png",
                            btnLabel: "施工中。",
                            redirectPath: "/",
                            filter: ""
                        },
                        {
                            imgPath: "/placeholders/wip.png",
                            btnLabel: "施工中。",
                            redirectPath: "/",
                            filter: ""
                        },
                        {
                            imgPath: "/placeholders/wip.png",
                            btnLabel: "施工中。",
                            redirectPath: "/",
                            filter: ""
                        },
                    ],
                ]}>
            </Dashboard>
        </div>









        {/* <br />
        
        <br></br>
        大綱 Outline
        <Image src={"/placeholders/profLayout.png"} alt={"userF"} width={574} height={499}></Image>


        <div>
            <pre>{JSON.stringify(session, null, 2)}</pre>

            {JSON.stringify(userData.username, null, 2)}
        </div>


        <div style={Style.container}>

            <p>請填寫資料，方便以後找回帳戶，也方便以後寳嚴通知您最新課程，行政公佈，每月簡報，等消息</p>
            <p>（以上訊息調整中。。。)</p>
            <br />




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
        {/* </tr> */}
        {/* </tfoot> */}
        {/* </table> */}
        {/* </div> */}

    </main>
}

