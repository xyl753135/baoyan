'use client'

import { MeritCardRandomWrapper } from "./MeritCardRandomWrapper";

const Style: { [key: string]: React.CSSProperties } = {
    main: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap"
    },
    column: {
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        minWidth: "350px",
        // border: "2px black dashed"
    },
    meritCards: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "1em",
    },
    colHeader: {
        color: "white"
    },
    formfieldLabel: {
        color: "white"
    },
    dateQueryUI: {
        display: "flex",
        flexDirection: "row",
        // flexGrow: "1",
        justifyContent: "space-between",
        // border: "2px black dashed"
    },
    btn: {
        width: "100px",
        flexGrow: "1",
        fontSize: "24px",
        display: "flex", alignItems: "center", justifyContent: "space-around",
        fontWeight: "bold",
        background: "saddlebrown",
        border: "white 1px solid",
        borderRadius: "5px",
        padding: "2px",
        color: "white",
    }
};

type Props = {
    username: string,
    queryResults: JSX.Element[],
    date: string,
    setQueryResults: Function,
    setDisabledEditForm: Function,
    setMeritId: Function,
    setMeritText: Function
    privacyOn: boolean
}

export function MeritSearch({
    username,
    queryResults,
    date,
    setQueryResults,
    setDisabledEditForm,
    setMeritId,
    setMeritText,
    privacyOn
    // setdate
}: Props) {
    async function searchTransfers(formdata: FormData) {
        // Get form data
        const dateForm = String(formdata.get("date"));  // format yyyy-mm-dd
        const limitForm = String(formdata.get("limit"));  // format yyyy-mm-dd
        // console.log(sDate, eDate);

        // Validate form data
        if (dateForm > date) { alert("不可查詢未來") };

        // Query database
        let queryResult:{
            pk: string,
            author: string,
            yyyymmdd: string,
            source: string,
            text: string,
        }[] = [];
        await fetch('/api/transfer-of-merit/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                date: dateForm,
                limit: limitForm
            }), // TODO JWT sign it
        }).then(response => {
            return response.json();
        }).then(data=> { 
            queryResult = data.results;
        });

        // Update UI with results
        setQueryResults(queryResult.map((each =>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5em"
            }}
                key={each.pk}>
                <MeritCardRandomWrapper
                    width={"350px"} height={"200px"}
                    author={each.author}
                    timestamp={each.yyyymmdd}
                    meritSource={each.source}
                    text={each.text}
                    privacyOn={privacyOn}>
                </MeritCardRandomWrapper>
                <button style={{ ...Style.btn, transform: "translate(245px, -130%)" }}
                    onClick={() => {
                        setDisabledEditForm(false);
                        setMeritId(each.pk);
                        setMeritText(each.text);
                    }}>修改</button>
            </div>
        )));
    }
    return (
        <main style={{
            display: "flex",
            justifyContent: "space-around"
        }}>
            <div style={Style.column}>
            <h3 style={Style.colHeader}>本人回向查詢</h3>
            <form action={searchTransfers}>
                <div style={Style.dateQueryUI}>
                <div>
                    {/* username (hidden) */}
                    <div>
                    <input type="text" name="usernameInput" id="usernameInput" defaultValue={username} readOnly hidden/>
                    </div>
                    {/* date */}
                    <div style={{ width: "200px", display: "flex", justifyContent: "space-between" }}>
                    <label htmlFor="date" style={Style.formfieldLabel}>回向日期:</label>
                    <input type="date" 
                        name="date" id="date" defaultValue={date}/>
                    </div>
                    {/* limit */}
                    <div style={{ width: "200px", display: "flex", justifyContent: "space-between" }}>
                    <label htmlFor="limit" style={Style.formfieldLabel}>數量上限:</label>
                    <select id="limit" name="limit" style={{ width: "107px", textAlign: "right" }}>
                        <option value="1">1 個</option>
                        <option value="5">5 個</option>
                        <option value="10">10 個</option>
                        <option value="20">20 個</option>
                    </select>
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <button style={Style.btn}
                    type="submit">查詢</button>
                </div>
                </div>
            </form>
            {
                queryResults
            }
            </div>
        </main>
    );
}
