'use server'

// Components
import { Dashboard } from "@/components/Profile/Dashboard";
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
    // const [role, setRole] = useState<string>("student");
    // const [roleError, setRoleError] = useState<string>("");
    // const [saveError, setSaveError] = useState<string>("");

    const session = await getSession();
    const userData = session.user;
    // console.log("userData", userData);

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
        <Dashboard w={"100%"} h={"800px"}
            buttonDatas={[
                [
                    {
                        imgPath: "/icons/dashboard/mantrawheel.png",
                        btnLabel: "大佛頂首楞嚴神咒",
                        redirectPath: "/applications/mantra-shurangama",
                        filter: "invert(1)",
                        bgColor: "#8b4513"
                    },
                    {
                        imgPath: "/icons/dashboard/transferofmerit.png",
                        btnLabel: "個人回向",
                        redirectPath: "/applications/transfer-of-merit",
                        filter: "invert(1)",
                        bgColor: "#d14e4e"
                    },
                ],
                [
                    // {
                    //     imgPath: "/placeholders/wip.png",
                    //     btnLabel: "施工中。",
                    //     redirectPath: "/",
                    //     filter: ""
                    // },
                    // {
                    //     imgPath: "/placeholders/wip.png",
                    //     btnLabel: "施工中。",
                    //     redirectPath: "/",
                    //     filter: ""
                    // },
                    // {
                    //     imgPath: "/placeholders/wip.png",
                    //     btnLabel: "施工中。",
                    //     redirectPath: "/",
                    //     filter: ""
                    // },
                ],
                [
                    // {
                    //     imgPath: "/placeholders/wip.png",
                    //     btnLabel: "施工中。。。",
                    //     redirectPath: "/",
                    //     filter: ""
                    // },
                ],
            ]}>
        </Dashboard>
    </main>
}

