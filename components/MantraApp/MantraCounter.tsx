
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
        paddingLeft: "0.5em"
    }
};

type Props = {
  localCount: number,
  globalCount: number,
}

export function MantraCounter({
  localCount,
  globalCount,
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
              <p style={Style.statisticsItem}>本次: {localCount}</p>
              <p style={Style.statisticsItem}>累計: 0</p>
              <p style={Style.statisticsItem}>全球總計: {globalCount}</p>
          </fieldset>
      </section>
    );
};













