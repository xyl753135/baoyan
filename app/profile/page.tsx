'use server'

// Components
import { PersonalDataClientWrapper } from "@/components/PageSpecific/Profile/PersonalDataClientWrapper";

// Utils
import { convertISO8601DateToYYYYMMDD } from "@/utils/TimeParser";
import { isNullUndefinedOrEmpty } from "@/utils/Validator";
import { getSession } from "@/utils/AuthHelper";


const Style: { [key: string]: React.CSSProperties } = {
    container: {
        // marginTop: "1em",
        // marginBottom: "1em",
        display: "flex",
        // @ts-expect-error: This is valid and still works
        flexDirection: "var(--profileColumnsLayout)",
        justifyContent: "space-around"
    },
};

export default async function Page() {

    const session = await getSession();
    const userData = session.user;
    console.log("userData", userData);

    const YYYYMMDD = convertISO8601DateToYYYYMMDD(userData.dob);
    
    return <main style={Style.container}>
        <PersonalDataClientWrapper w={"100%"} h={"1000px"}
            userData={{
                profilePicPath: isNullUndefinedOrEmpty(userData.profile_pic_path) ? "" : userData.profile_pic_path,
                username: isNullUndefinedOrEmpty(userData.username) ? "" : userData.username,
                name: isNullUndefinedOrEmpty(userData.name) ? "" : userData.name,
                bname: isNullUndefinedOrEmpty(userData.bname) ? "" : userData.bname,
                line: isNullUndefinedOrEmpty(userData.line) ? "" : userData.line,
                whatsapp: isNullUndefinedOrEmpty(userData.whatsapp) ? "" : userData.whatsapp,
                wechat: isNullUndefinedOrEmpty(userData.wechat) ? "" : userData.wechat,
                email: isNullUndefinedOrEmpty(userData.email) ? "" : userData.email,
                phone: isNullUndefinedOrEmpty(userData.phone) ? "" : userData.phone,
                gender: isNullUndefinedOrEmpty(userData.gender) ? "" : userData.gender,
                country: isNullUndefinedOrEmpty(userData.country) ? "" : userData.country,
                locale: isNullUndefinedOrEmpty(userData.locale) ? "" : userData.locale,
                dob: YYYYMMDD
            }} >
        </PersonalDataClientWrapper>
    </main>
}

