'use server'

import Image from "next/image";
import { redirect } from "next/navigation";

// Components
import { Modal } from "@/components/shared/Modals/Modal";

// Utils
import { getSession } from "@/utils/AuthHelper";
import { LogoutButton } from "@/components/PageSpecific/Dashboard/LogoutButton";
import { ModalWrapper } from "@/components/PageSpecific/Dashboard/ModalWrapper";

const Style: { [key: string]: React.CSSProperties } = {
    container: {
        marginTop: "1em",
        marginBottom: "1em",
        display: "flex",
        // @ts-expect-error
        flexDirection: "var(--profileColumnsLayout)",
        justifyContent: "space-around"
    },
    inputGroup: {
        display: "flex"
    },
    dashboard: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
        maxWidth: "700px",
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    btnRow: {
        display: "flex",
        justifyContent: "space-around",
        gap: "20px",


    },
    btn: {
        width: "140px",
        // paddingRight: "0.5em",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: "1",
        gap: "5px",

        border: "white 1px solid",
        borderRadius: "5px",

        cursor: "pointer",
    },
    label: {
        color: "white",
        fontSize: "18px"
    }
};

export default async function Page() {

    const session = await getSession();
    const userData = session.user;
    // console.log("userData", userData);

    const buttonDatas = [
        [
            {
                imgPath: "/icons/dashboard/mantrawheel.png",
                btnLabel: "大佛頂首楞嚴神咒",
                redirectPath: "/applications/mantra-shurangama",
                filter: "invert(1)",
                bgColor: "#8b4513"
            },
        ],
        [
            {
                imgPath: "/icons/dashboard/transferofmerit.png",
                btnLabel: "個人回向查詢修改",
                redirectPath: "/applications/transfer-of-merit",
                filter: "invert(1)",
                bgColor: "#d14e4e"
            },
            {
                imgPath: "/icons/dashboard/counter.png",
                btnLabel: "個人總計查詢修改",
                redirectPath: "/applications/counters",
                filter: "invert(1)",
                bgColor: "rgb(50, 140, 110)"
            },
        ],
        [
            {
                imgPath: "/icons/dashboard/pencil.png",
                btnLabel: "個人基本資料",
                redirectPath: "/profile",
                filter: "invert(1)",
                bgColor: "purple"
            },
        ],
        [
            {
                imgPath: "/icons/dashboard/trophy.png",
                btnLabel: "成就",
                redirectPath: "/achievements/user",
                filter: "invert(1)",
                bgColor: "#005792"
            },
            {
                imgPath: "/icons/dashboard/leaderboard.png",
                btnLabel: "排行榜",
                redirectPath: "/achievements/leaderboard",
                filter: "invert(1)",
                bgColor: "#e8751a"
            },
        ],
    ];

    const items = buttonDatas.map((eachRow, rowIndex) => (
        <div style={Style.btnRow} key={`row-${rowIndex}`}>
            {
                eachRow.map((item, itemIndex) => (
                    <a href={item.redirectPath}
                        target="_self"
                        style={{
                            ...Style.btn,
                            background: item.bgColor,
                        }}
                        key={`item-${itemIndex}`}>
                        <Image width={45} height={45}
                            alt={`${item.btnLabel}${itemIndex + 1}`}
                            src={item.imgPath}
                            style={{
                                ...Style.img,
                                filter: item.filter
                            }}></Image>
                        <p style={Style.label}>{item.btnLabel}</p>
                    </a>
                ))
            }
        </div>
    ));

    return <main style={Style.container}>

        <section style={{ height: "800px", width: "100%", ...Style.dashboard }}>
            {
                userData.email == "" || userData.email == undefined || userData.email == null ?
                    <ModalWrapper></ModalWrapper>
                    :
                    <></>
            }

            {items}
            
            <div style={Style.btnRow}>
                <LogoutButton></LogoutButton>
            </div>
        </section>
    </main>
}

