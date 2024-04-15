'use server'

// Components
import { PersonalData } from "@/components/Profile/PersonalData";

// Utils
import { convertISO8601DateToYYYYMMDD } from "@/utils/TimeParser";
import { isNullUndefinedOrEmpty } from "@/utils/Validator";
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

    const YYYYMMDD = convertISO8601DateToYYYYMMDD(userData.dob);
    
    return <main style={Style.container}>
        <PersonalData w={"100%"} h={"800px"}
            userData={{
                profilePicPath: isNullUndefinedOrEmpty(userData.profile_pic_path) ? "" : userData.profile_pic_path,
                username: isNullUndefinedOrEmpty(userData.username) ? "" : userData.username,
                name: isNullUndefinedOrEmpty(userData.name) ? "" : userData.name,
                bname: isNullUndefinedOrEmpty(userData.bname) ? "" : userData.bname,
                line: isNullUndefinedOrEmpty(userData.line) ? "" : userData.line,
                whatsapp: isNullUndefinedOrEmpty(userData.whatsapp) ? "" : userData.whatsapp,
                email: isNullUndefinedOrEmpty(userData.email) ? "" : userData.email,
                phone: isNullUndefinedOrEmpty(userData.phone) ? "" : userData.phone,
                country: isNullUndefinedOrEmpty(userData.country) ? "" : userData.country,
                locale: isNullUndefinedOrEmpty(userData.locale) ? "" : userData.locale,
                dob: YYYYMMDD
            }} >
        </PersonalData>
    </main>
}

