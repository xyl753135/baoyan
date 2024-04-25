'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

const Style: { [key: string]: React.CSSProperties } = {
    formRow: {
        display: "flex",
        // @ts-expect-error
        flexDirection: "var(--flexDirectionRWD)",
        justifyContent: "center",
        gap: "10px",
        alignItems: "center"
    },
    label: {
        color: "white",
        height: "38px",
        fontSize: "30px"
    },
    input: {
        height: "38px",
        fontSize: "30px",
        width: "150px"
    },
    btn: {
        maxWidth: "100px",
        minWidth: "100px",
        flexGrow: "1",
        fontSize: "24px",
        display: "flex", alignItems: "center", justifyContent: "space-around",
        fontWeight: "bold",
        background: "saddlebrown",
        border: "white 1px solid",
        borderRadius: "5px",
        padding: "2px",
        color: "white",
    }
};

type Props = {
    userData: any,
    countShurangama: number
}

type Counter = {
    app: string,
    name: string,
    count: number
};

export const CountersClientWrapper = ({
    userData,
    countShurangama
}: Props) => {

    let originalCountShurangama = countShurangama;

    const [msg, setMsg] = useState("");

    async function submit(formData: FormData) {

        let countShurangama = Number(formData.get("mantraapp-shurangama"));


        try {
            await fetch('/api/counters/update-counter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    count: countShurangama,
                    app: "mantraapp",
                    name: "shurangama",
                    username: String(formData.get("username")),
                }),
            }).then((response) => {
                console.log(response.status);
                console.log(response.statusText);
                return response.json();
            }).then((json) => {
                console.log(json.result);
                setMsg("更新成功");
            });

            await fetch('/api/counters/increment-counter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    count: countShurangama - originalCountShurangama,
                    app: "mantraapp",
                    name: "shurangama",
                    username: "",
                }),
            }).then((response) => {
                console.log(response.status);
                console.log(response.statusText);
                return response.json();
            }).then((json) => {
                console.log(json.result);
                setMsg("更新成功");
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section>
            <form action={submit}>
                <input type="hidden" defaultValue={userData.username}
                    id="username" name="username" />
                <section style={Style.formRow}>
                    <label style={Style.label} htmlFor={`mantraapp-shurangama`}>楞嚴咒持咒次數: </label>
                    <input style={Style.input} type="number"
                        defaultValue={originalCountShurangama}
                        id={`mantraapp-shurangama`}
                        name={`mantraapp-shurangama`}
                        min={0}/>
                    <button style={Style.btn} type="submit">
                        <Image style={{filter: "invert(1)"}} src={"/icons/dashboard/pencil.png"} alt={"更新"} width={25} height={25}></Image>
                        更新
                    </button>
                </section>
                
            </form>

            <span style={{display: "flex", justifyContent: "center", marginTop: "10px", fontSize: "30px", color: "orange"}}>{msg}</span>
        </section>

    );

};
