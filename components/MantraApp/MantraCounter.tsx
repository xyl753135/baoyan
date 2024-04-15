import { redirect } from "next/navigation";
import { GenericButton } from "../GenericButton";

const Style: { [key: string]: React.CSSProperties } = {
    col: {
        display: "flex",
        flexDirection: "column",
    },
    config: {
        // height: "100%",
        paddingTop: "0.5em",
        paddingBottom: "0.5em",
        paddingLeft: "0.5em",
        paddingRight: "0.5em",
        margin: "0.5em",
        width: "320px",
        border: "white 2px solid",
        borderRadius: "5px",
    },
    statisticsItem: {
        fontSize: "20px",
        paddingLeft: "0.5em",
        paddingBottom: "0.5em"
    }
};

type Props = {
    localCount: number,
    memberCount: number,
    globalCount: number,
    username: string,
}

export function MantraCounter({
    localCount = 0,
    memberCount = 0,
    globalCount = 0,
    username: usernameProp,
}: Props) {

    async function submitCounts(localCount: number, memberCount: number, globalCount: number) {
        if (localCount == 0) {
            
        }
        
        // Update global counter
        try {
            await fetch(`/api/counters/update-counter`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        app: "mantraapp",
                        name: "shurangama",
                        count: globalCount + localCount,
                        username: '' // reminder, global count has no username
                    })
                }).then(resp => {
                    if (resp.status != 200) {
                        console.error("status", resp.status, "statusText", resp.statusText);
                    }
                    return resp.json();
                }).then(json => {
                    console.log("fetch returned result: ", json.result.rows);

                });
        } catch (error) {
            console.error("MantraPlayer useEffect threw error:", error);
        }

        // Update member counter
        try {
            await fetch(`/api/counters/update-counter`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        app: "mantraapp",
                        name: "shurangama",
                        count: memberCount + localCount,
                        username: usernameProp 
                    })
                }).then(resp => {
                    if (resp.status != 200) {
                        console.error("status", resp.status, "statusText", resp.statusText);
                    }
                    return resp.json();
                }).then(json => {
                    console.log("fetch returned result: ", json.result.rows);

                });
        } catch (error) {
            console.error("MantraPlayer useEffect threw error:", error);
        }

        // TODO
    }


    return (
        <section style={{ ...Style.col, ...{ alignItems: "center" } }}>
            <fieldset style={{ ...Style.config, ...{ paddingBottom: "0.8em" } }}>
                <legend style={{
                    paddingLeft: "0.5em",
                    paddingRight: "0.5em",
                    fontWeight: "bolder",
                    fontSize: "24px"
                }}>統計</legend>
                <p style={Style.statisticsItem}>本次持咒次數: {localCount}</p>
                {usernameProp != '' ?
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                    <p style={Style.statisticsItem}>個人累計持咒次數: {memberCount}</p>
                    <GenericButton
                    label={"人工輸入"}
                    handleClick={() => {
                        alert("wip");
                    }}
                    border={"white 2px solid"} borderRadius={"5px"} background={"saddlebrown"}
                    maxWidth={"80px"} maxHeight={"39px"}
                    minWidth={""} minHeight={""}
                    labelFontSize={"16px"}></GenericButton>
                </div>
                    :
                    <></>
                }
                
                <p style={Style.statisticsItem}>全球總計持咒次數: {globalCount}</p>
                <GenericButton
                    label={"回報"}
                    handleClick={() => {
                        submitCounts(localCount, memberCount, globalCount);
                    }}
                    border={"white 2px solid"} borderRadius={"5px"} background={"saddlebrown"}
                    // maxWidth={"80px"} maxHeight={"39px"}
                    minWidth={""} minHeight={""}
                    labelFontSize={"24px"}></GenericButton>

            </fieldset>
        </section>
    );
};













