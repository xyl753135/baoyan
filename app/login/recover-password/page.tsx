'use server'

import RecoverPasswordClientWrapper from "@/components/PageSpecific/Login/Recover-Password/RecoverPasswordClientWrapper";

const Style: { [key: string]: React.CSSProperties } = {
    main: {
        display: "flex",
        flexDirection: "column",
        height: "70vh",
        minHeight: "350px",
        alignItems: "center",
    },
};

export default async function Page() {

    
    
    return (
        <main style={Style.main}>
            <RecoverPasswordClientWrapper></RecoverPasswordClientWrapper>
        </main>
    );
}
