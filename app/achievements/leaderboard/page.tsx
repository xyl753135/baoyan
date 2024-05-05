'use server'

import { sql } from "@vercel/postgres";
import Image from "next/image";


const Style: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px"
    },
    tabs: {
        display: "flex",
        justifyContent: "left"
    },
    tab: {
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        borderTop: "white 1px solid",
        borderLeft: "white 1px solid",
        borderRight: "white 1px solid",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // gap: "10px",

        width: "140px",

        paddingLeft: "5px",
        paddingRight: "5px",
        paddingTop: "5px",
        paddingBottom: "5px",

        background: "#393e46",
    },
    tabActive: {
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        borderTop: "white 1px solid",
        borderLeft: "white 1px solid",
        borderRight: "white 1px solid",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // gap: "10px",

        width: "140px",

        paddingLeft: "5px",
        paddingRight: "5px",
        paddingTop: "5px",
        paddingBottom: "5px",

        background: "saddlebrown",
    },
    tabLabel: {
        color: "white",
        fontWeight: "bolder",
        fontSize: "18px"
    },
    tabImg: {
        filter: "invert(1) hue-rotate(90deg)",
    },
    tabBody: {
        background: "#222831",
        border: "white 1px solid",

        padding: "10px",

        minWidth: "350px",
        maxWidth: "700px",

        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    row: {
        display: "flex",
        justifyContent: "space-between"
    },
    rowLeft: {
        display: "flex",
        gap: "20px",
    },
    rowRight: {
        color: "white"
    },
    medal: {

    },
    avatar: {
        borderRadius: "50%",
        border: "2px black solid",
        filter: "invert(1)"
    }
};

export default async function Page() {

    // const [activeTab, setActiveTab] = useState(1);

    const orderedCounters = await sql`SELECT * 
            FROM Counters 
            WHERE app = 'mantraapp'
            AND name = 'shurangama'
            ORDER BY CAST(count AS Numeric(10,0)) desc;`;
    const counters = orderedCounters.rows.slice(1);
    console.log(counters);

    let top5 = counters.slice(0, 5);
    let after5 = counters.slice(5);

    return (
        <main style={Style.container}>
            <h1>全球排行榜</h1>
            <p></p>
            
            <section>
                {/* Tabs */}
                <section style={Style.tabs}>
                    <div>
                        <button type="button" style={
                            //    activeTab == 1 ? 
                            Style.tabActive
                            // : Style.tab
                        }
                        // onClick={() => setActiveTab(1)}
                        >
                            <Image src={"/icons/dashboard/mantrawheel.png"} alt={"Tab 1"} width={45} height={45} style={Style.tabImg}></Image>
                            <span style={Style.tabLabel}>持咒 APP</span>
                        </button>
                    </div>
                    {/* <div>
                        <button type="button" style={activeTab == 2? Style.tabActive : Style.tab} onClick={() => setActiveTab(2)}>
                            <Image src={"/icons/expand.png"} alt={"Tab 2"} width={45} height={45} style={Style.tabImg}></Image>
                            <span style={Style.tabLabel}>開發中</span>
                        </button>
                    </div> */}
                </section>

                {/* tab body 1 */}
                <section style={{
                    ...Style.tabBody,
                    // display: activeTab == 1 ? "flex" : "none"
                    display:"flex"
                }}>
                    <h2 style={{ color: "white" }}>大佛頂首楞嚴神咒 次數排行榜</h2>

                    {/* First 5 places */}
                    {
                        top5[0] != undefined? 
                            <div style={Style.row}>
                                <div style={Style.rowLeft}>
                                    <Image src={`/icons/leaderboard/1.png`} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                                    <Image src={"/icons/role_user_m.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                                    <p style={{ color: "white" }}>{top5[0].username}</p>
                                </div>
                                <div style={Style.rowRight}>
                                    {top5[0].count} 次
                                </div>
                            </div>
                            :
                            <></>
                    }
                    {
                        top5[1] != undefined? 
                            <div style={Style.row}>
                                <div style={Style.rowLeft}>
                                    <Image src={`/icons/leaderboard/2.png`} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                                    <Image src={"/icons/role_user_m.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                                    <p style={{ color: "white" }}>{top5[1].username}</p>
                                </div>
                                <div style={Style.rowRight}>
                                    {top5[1].count} 次
                                </div>
                            </div>
                            :
                            <></>
                    }
                    {
                        top5[2] != undefined? 
                            <div style={Style.row}>
                                <div style={Style.rowLeft}>
                                    <Image src={`/icons/leaderboard/3.png`} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                                    <Image src={"/icons/role_user_m.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                                    <p style={{ color: "white" }}>{top5[2].username}</p>
                                </div>
                                <div style={Style.rowRight}>
                                    {top5[2].count} 次
                                </div>
                            </div>
                            :
                            <></>
                    }
                    {
                        top5[3] != undefined? 
                            <div style={Style.row}>
                                <div style={Style.rowLeft}>
                                    <Image src={`/icons/leaderboard/4.png`} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                                    <Image src={"/icons/role_user_m.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                                    <p style={{ color: "white" }}>{top5[3].username}</p>
                                </div>
                                <div style={Style.rowRight}>
                                    {top5[3].count} 次
                                </div>
                            </div>
                            :
                            <></>
                    }
                    {
                        top5[4] != undefined? 
                            <div style={Style.row}>
                                <div style={Style.rowLeft}>
                                    <Image src={`/icons/leaderboard/5.png`} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                                    <Image src={"/icons/role_user_m.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                                    <p style={{ color: "white" }}>{top5[4].username}</p>
                                </div>
                                <div style={Style.rowRight}>
                                    {top5[4].count} 次
                                </div>
                            </div>
                            :
                            <></>
                    }

                    {/* Placements after 5 */}
                    {
                        after5.map(each => {
                            return (
                                <div style={Style.row}>
                                    <div style={Style.rowLeft}>
                                        <Image src={"/icons/leaderboard/medal.png"} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                                        <Image src={"/icons/role_user_m.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                                        <p style={{ color: "white" }}>{each.username}</p>
                                    </div>
                                    <div style={Style.rowRight}>
                                    {each.count} 次
                                    </div>
                                </div>
                            );
                        })
                    }
                </section>
            </section>
            



            {/* tab body 2 */}
            {/* <section style={{ ...Style.tabBody, display: activeTab == 2 ? "flex" : "none"}}>
                <h2>開發中</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempore esse, voluptatum beatae nam sed vitae dolores ullam illo labore expedita voluptas aliquam harum id
                    laudantium accusamus qui eius? Temporibus, qui fugiat sunt porro quas esse beatae.
                    Fuga tempore ducimus minima corporis, aliquam consequuntur a inventore atque ratione ipsa exercitationem in!
                </p>
            </section> */}
        </main>
    );
}
