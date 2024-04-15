'use client'

import { Key, useEffect, useState } from "react";
import { MeritCardRandomWrapper } from "./MeritCardRandomWrapper";
import { GenericButton } from "../GenericButton";

const Style: { [key: string]: React.CSSProperties } = {
    container: {
        // margin: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        border: "black 2px solid",
        paddingLeft: "1em",
        paddingRight: "1em",
    },
    author: {
        color: "black",
        fontSize: "20px",
        textAlign: "center"
    },
    timestamp: {
        color: "black",
        fontSize: "16px",
        textAlign: "center"
    },
    text: {
        color: "black",
        fontSize: "16px",
        textAlign: "center"
    },
    colHeader: {
        fontSize: "30px",
    }, 
    MeritCardRandomWrappers: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "1em",
      },
};

type Props = {
    randomizeCardColors?: boolean,
}

type Merit = {
    pk: string | number | Key | null | undefined,
    author: string,
    yyyymmdd: string,
    source: string | undefined,
    text: string,
};

export function MostRecentMerits({
    randomizeCardColors = true
}: Props) {

    const [queryResults, setQueryResults] = useState<JSX.Element[]>([]);
    useEffect(() => {
        // Get global count data 
        (async () => {
            console.log("MantraApp useEffect calling ", `/api/transfer-of-merit/read-recent`);
            await fetch(`/api/transfer-of-merit/read-recent`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    limit: 10
                }),
            }).then(response => {
                return response.json();
            }).then(json => { 
                console.log("fetch returned results: ", json.results)
                if (json.results.length > 0) {
                    setQueryResults(json.results.map(((each: Merit) =>
                        <MeritCardRandomWrapper
                            key={each.pk}
                            width={"350px"} height={"200px"}
                            author={each.author}
                            timestamp={each.yyyymmdd}
                            meritSource={each.source}
                            text={each.text}
                            privacyOn={true}>
                        </MeritCardRandomWrapper>
                    )));
                }
            });
        })();
    }, []);

    const refresh = async function() {
        console.log("MantraApp useEffect calling ", `/api/transfer-of-merit/read-recent`);
        await fetch(`/api/transfer-of-merit/read-recent`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                limit: 10
            }),
        }).then(response => {
            return response.json();
        }).then(json => { 
            console.log("fetch returned results: ", json.results)
            if (json.results.length > 0) {
                setQueryResults(json.results.map(((each: Merit) =>
                    <MeritCardRandomWrapper
                        key={each.pk}
                        width={"350px"} height={"150px"}
                        author={each.author}
                        timestamp={each.yyyymmdd}
                        meritSource={each.source}
                        text={each.text}
                        privacyOn={true}>
                    </MeritCardRandomWrapper>
                )));
            }
        });
    }

    return (
        <div>
          <section style={{ display: "flex", gap: "1em" }}>
            <h3 style={Style.colHeader}>最新回向</h3>
            <GenericButton label={"更新"} handleClick={() => { refresh(); } } 
                border={"white 2px solid"} 
                borderRadius={"5px"} 
                background={"saddlebrown"} 
                maxWidth={"80px"} 
                maxHeight={"100px"} 
                minWidth={""} 
                minHeight={""} 
                labelFontSize={"18px"}></GenericButton>
          </section>
          <br></br>
          {/* Most-recent Merit cards */}
          <section style={Style.MeritCardRandomWrappers}>
            {
                queryResults
            }
          </section>
        </div>
    );
};













