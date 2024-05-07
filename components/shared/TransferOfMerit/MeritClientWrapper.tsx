'use client'

import { useState } from "react";
import { MeritSearch } from "./MeritSearch";
import { SubmitTransferOfMerit } from "./SubmitTransferOfMerit";
import { isNullUndefinedOrEmpty } from "@/utils/Validator";

const Style: { [key: string]: React.CSSProperties } = {
    main: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap"
    },
};

type Props = {
    username: string,
    todayYYYYMMDD: string,
    privacyOn: boolean
}

export function MeritClientWrapper({
    username,
    todayYYYYMMDD,
    privacyOn
}: Props) {


    // useState
    const [hideEditForm, setHideEditForm] = useState<boolean>(true);
    const [queryResults, setQueryResults] = useState<JSX.Element[]>([]);
    const [meritId, setMeritId] = useState<string>("");
    const [meritText, setMeritText] = useState<string>("");

    async function handleSubmitEdit(formData: FormData) {

        // Get form data
        const meritId = formData.get("meritId");
        const meritText = formData.get("meritText");
        console.log(meritId, meritText)

        // Check if bad data
        if (!isNullUndefinedOrEmpty(meritText)) {
            try {
                // Save to DB
                let updatedRows = 0;
                await fetch('/api/transfer-of-merit/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        meritId: meritId,
                        meritText: meritText
                    })
                }).then(response => {
                    return response.json();
                }).then(data => { 
                    updatedRows = data.updatedRows;
                });
                console.log("updatedRows", updatedRows);
            } catch (error) {
                console.error(error);
            }
            // Reset SubmitTransferOfMerit
            setMeritId("");
            setMeritText("");
            setHideEditForm(true);
            setQueryResults([])
        }
    }

    return (
        <main style={Style.main}>
            {
                hideEditForm ?
                    <></>
                    :
                    <SubmitTransferOfMerit
                        meritId={meritId}
                        meritText={meritText}
                        setMeritText={setMeritText}
                        handleSubmit={handleSubmitEdit}
                        disabledEditForm={hideEditForm}>
                    </SubmitTransferOfMerit>
            }
            
            <MeritSearch
                username={username}
                queryResults={queryResults}
                date={todayYYYYMMDD}
                setQueryResults={setQueryResults}
                setDisabledEditForm={setHideEditForm}
                setMeritId={setMeritId}
                setMeritText={setMeritText}
                privacyOn={privacyOn}>
            </MeritSearch>
            
        </main>
    );
}
