'use server'

// utils
import { getSession } from "@/utils/AuthHelper";

// Components
import { ChangePasswordClientWrapper } from "@/components/Profile/ChangePasswordClientWrapper";
import { redirect } from "next/navigation";
import Image from "next/image";


const Style: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    },
    contents: {
        display: "flex",
        // @ts-expect-error
        flexDirection: "var(--flexDirectionRWD)",
        alignItems: "center"
    },
    img: {
        display: "var(--navbarFullDisplay)"
    }
};

export default async function Page() {

    const session = await getSession();
    if (!session) {
        redirect("/login")
    }
    const userData = session.user;
    console.log("userData", userData);

    return <main style={Style.container}>
        <h1>改變密碼</h1>
        <div style={Style.contents}>
            <Image style={Style.img} src={"/lock.gif"} alt={"Banner"} width={260} height={260}></Image>
            <section>
                <ChangePasswordClientWrapper userData={userData} w={"350px"} h={"260px"}></ChangePasswordClientWrapper>
            </section>
        </div>
    </main>
}

