
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
        alignSelf: "center"
    },
    statisticsItem: {
        fontSize: "20px",
        paddingLeft: "0.5em",
        paddingBottom: "0.5em"
    }
};

type Props = {
    localCount: number,
    showMemberCount: boolean,
    memberCount: number,
    globalCount: number,
}

export function MantraCounter({
    localCount = 0,
    showMemberCount = false,
    memberCount = 0,
    globalCount = 0,
}: Props) {
    return (
        <section style={{ ...Style.col, ...{ alignItems: "center" } }}>
            <fieldset style={{ ...Style.config, ...{ paddingBottom: "0.8em" } }}>
                <legend style={{
                    paddingLeft: "0.5em",
                    paddingRight: "0.5em",
                    fontWeight: "bolder",
                    fontSize: "24px"
                }}>統計</legend>
                <p style={Style.statisticsItem}>本日持咒次數: {localCount}</p>
                {showMemberCount ?
                    <p style={Style.statisticsItem}>個人累計持咒次數: {memberCount}</p>
                    :
                    <></>
                }
                <p style={Style.statisticsItem}>全球總計持咒次數: {globalCount}</p>
            </fieldset>
        </section>
    );
};













