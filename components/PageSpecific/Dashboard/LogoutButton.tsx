'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

const Style: { [key: string]: React.CSSProperties } = {
    btn: {
        // width: "140px",
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

type Props = {};

export const LogoutButton = ({ }: Props) => {
    const router = useRouter();

    async function logout() {
        await fetch('/api/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        }).then((resp) => {
            router.push("/login");
        });
    }

    return (
        <button onClick={logout}
            style={{
                ...Style.btn,
                background: "#3b3b3b",
                // flexBasis: "120px"
            }}
            type="button">
            <Image width={45} height={45}
                alt={`登出`}
                src={"/icons/dashboard/logout.png"}
                style={{
                    ...Style.img,
                    filter: "invert(1)"
                }}></Image>
            <p style={Style.label}>登出</p>
        </button >
    );
};