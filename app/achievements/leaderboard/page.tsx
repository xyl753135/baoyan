'use client'

import Image from "next/image";

import { useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
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

export default function Page() {

    const [activeTab, setActiveTab] = useState(1);


    return (
        <main style={Style.container}>
            <br />
            <h1>排行榜</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas iste quo perferendis voluptas quod, impedit, tenetur accusamus eum facere nam ipsum eos ipsam dicta tempora provident fugit. Dolorum, similique aperiam!</p>
            <br />
            {/* Tabs */}
            <section style={Style.tabs}>
                <div>
                    <button type="button" style={activeTab == 1? Style.tabActive : Style.tab} onClick={() => setActiveTab(1)}>
                        <Image src={"/icons/dashboard/mantrawheel.png"} alt={"Tab 1"} width={45} height={45} style={Style.tabImg}></Image>
                        <span style={Style.tabLabel}>持咒 APP</span>
                    </button>
                </div>
                <div>
                    <button type="button" style={activeTab == 2? Style.tabActive : Style.tab} onClick={() => setActiveTab(2)}>
                        <Image src={"/icons/expand.png"} alt={"Tab 2"} width={45} height={45} style={Style.tabImg}></Image>
                        <span style={Style.tabLabel}>開發中</span>
                    </button>
                </div>
            </section>

            {/* tab body 1 */}
            <section style={{ ...Style.tabBody, display: activeTab == 1 ? "flex" : "none"}}>
                <h2 style={{color: "white"}}>大佛頂首楞嚴神咒 次數排行榜</h2>
                
                {/* First 5 places */}
                <div style={Style.row}>
                    <div style={Style.rowLeft}>
                        <Image src={"/icons/leaderboard/firstPlace.png"} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                        <Image src={"/icons/role_user_m.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                        <p style={{color: "white"}}>omgitskuei</p>
                    </div>
                    <div style={Style.rowRight}>
                        49 次
                    </div>
                </div>
                <div style={Style.row}>
                    <div style={Style.rowLeft}>
                        <Image src={"/icons/leaderboard/secondPlace.png"} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                        <Image src={"/icons/role_user_f.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                        <p style={{color: "white"}}>Rachel</p>
                    </div>
                    <div style={Style.rowRight}>
                        42 次
                    </div>
                </div>
                <div style={Style.row}>
                    <div style={Style.rowLeft}>
                        <Image src={"/icons/leaderboard/thirdPlace.png"} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                        <Image src={"/icons/role_user_m.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                        <p style={{color: "white"}}>Vincent</p>
                    </div>
                    <div style={Style.rowRight}>
                        38 次
                    </div>
                </div>
                <div style={Style.row}>
                    <div style={Style.rowLeft}>
                        <Image src={"/icons/leaderboard/fourthPlace.png"} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                        <Image src={"/icons/role_user_m.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                        <p style={{color: "white"}}>查理王</p>
                    </div>
                    <div style={Style.rowRight}>
                        32 次
                    </div>
                </div>
                <div style={Style.row}>
                    <div style={Style.rowLeft}>
                        <Image src={"/icons/leaderboard/fifthPlace.png"} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                        <Image src={"/icons/role_user_f.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                        <p style={{color: "white"}}>釋星曦</p>
                    </div>
                    <div style={Style.rowRight}>
                        22 次
                    </div>
                </div>

                {/* After 5th place */}
                <div style={Style.row}>
                    <div style={Style.rowLeft}>
                        <Image src={"/icons/leaderboard/medal.png"} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                        <Image src={"/icons/role_user_m.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                        <p style={{color: "white"}}>user1</p>
                    </div>
                    <div style={Style.rowRight}>
                        21 次
                    </div>
                </div>
                <div style={Style.row}>
                    <div style={Style.rowLeft}>
                        <Image src={"/icons/leaderboard/medal.png"} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                        <Image src={"/icons/role_user_m.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                        <p style={{color: "white"}}>user2</p>
                    </div>
                    <div style={Style.rowRight}>
                        19 次
                    </div>
                </div>
                <div style={Style.row}>
                    <div style={Style.rowLeft}>
                        <Image src={"/icons/leaderboard/medal.png"} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                        <Image src={"/icons/role_user_m.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                        <p style={{color: "white"}}>user3</p>
                    </div>
                    <div style={Style.rowRight}>
                        11 次
                    </div>
                </div>
                <div style={Style.row}>
                    <div style={Style.rowLeft}>
                        <Image src={"/icons/leaderboard/medal.png"} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                        <Image src={"/icons/role_user_m.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                        <p style={{color: "white"}}>user4</p>
                    </div>
                    <div style={Style.rowRight}>
                        8 次
                    </div>
                </div>
                <div style={Style.row}>
                    <div style={Style.rowLeft}>
                        <Image src={"/icons/leaderboard/medal.png"} alt={"Tab"} width={35} height={35} style={Style.medal}></Image>
                        <Image src={"/icons/role_user_m.png"} alt={"Tab"} width={35} height={35} style={Style.avatar}></Image>
                        <p style={{color: "white"}}>user5</p>
                    </div>
                    <div style={Style.rowRight}>
                        3 次
                    </div>
                </div>
            </section>



            {/* tab body 2 */}
            <section style={{ ...Style.tabBody, display: activeTab == 2 ? "flex" : "none"}}>
                <h2>開發中</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempore esse, voluptatum beatae nam sed vitae dolores ullam illo labore expedita voluptas aliquam harum id
                    laudantium accusamus qui eius? Temporibus, qui fugiat sunt porro quas esse beatae.
                    Fuga tempore ducimus minima corporis, aliquam consequuntur a inventore atque ratione ipsa exercitationem in!
                </p>
            </section>
        </main>
    );
}
