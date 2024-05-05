'use server'

import { getSession } from "@/utils/AuthHelper";

import { AchievementsUserClientWrapper } from "@/components/Achievements/User/AchievementsUserClientWrapper";

const Style: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column"
    }
};

export default async function Page() {
    const session = await getSession();
    const userData = session.user;
   
    return (
        <main style={Style.container}>
            <AchievementsUserClientWrapper username={ userData.username }></AchievementsUserClientWrapper>
        </main>
    );
}
