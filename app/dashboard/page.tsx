'use server'

// Components
import { Dashboard } from "@/components/Profile/Dashboard";

// Utils
import { getSession } from "@/utils/AuthHelper";


const Style: { [key: string]: React.CSSProperties } = {
    container: {
        marginTop: "1em",
        marginBottom: "1em",
        display: "flex",
        // @ts-expect-error: This is valid and still works
        flexDirection: "var(--profileColumnsLayout)",
        // flexBasis: "600px",
        // flexGrow: "1",
        justifyContent: "space-around"
    },
    inputGroup: {
        display: "flex"
    }
};

export default async function Page() {

    const session = await getSession();
    const userData = session.user;
    console.log("userData", userData);
    
    return <main style={Style.container}>
        <Dashboard w={"100%"} h={"800px"}
            buttonDatas={[
                [
                    {
                        imgPath: "/icons/dashboard/mantrawheel.png",
                        btnLabel: "大佛頂首楞嚴神咒",
                        redirectPath: "/applications/mantra-shurangama",
                        filter: "invert(1)",
                        bgColor: "#8b4513"
                    },
                    {
                        imgPath: "/icons/dashboard/transferofmerit.png",
                        btnLabel: "個人回向查詢修改",
                        redirectPath: "/applications/transfer-of-merit",
                        filter: "invert(1)",
                        bgColor: "#d14e4e"
                    }, 
                ],
                [
                    {
                        imgPath: "/icons/dashboard/pencil.png",
                        btnLabel: "個人基本資料",
                        redirectPath: "/profile",
                        filter: "invert(1)",
                        bgColor: "rgb(50, 140, 110)"
                    },
                ],
                [
                    {
                        imgPath: "/icons/dashboard/trophy.png",
                        btnLabel: "Achievements",
                        redirectPath: "/achievements/user",
                        filter: "invert(1)",
                        bgColor: "#005792"
                    },
                    {
                        imgPath: "/icons/dashboard/leaderboard.png",
                        btnLabel: "排行榜 Leaderboard",
                        redirectPath: "/achievements/leaderboard",
                        filter: "invert(1)",
                        bgColor: "#e8751a"
                    },
                ],
            ]}>
        </Dashboard>
    </main>
}

