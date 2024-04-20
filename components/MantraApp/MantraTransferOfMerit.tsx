
import { isNullUndefinedOrEmpty } from "@/utils/Validator";
import { redirect } from "next/navigation";

const Style: { [key: string]: React.CSSProperties } = {
    container: {
        // margin: "1em",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        // border: "black 2px solid",
        // width: "350px",
        // height: "706px"
    },
    col: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    legend: {
        paddingLeft: "0.5em",
        paddingRight: "0.5em",
        fontWeight: "bolder",
        fontSize: "24px",
        color: "white"
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
    inputMerit: {
        padding: "0.2em",
        fontSize: "18px", 
        fontWeight: "bold",
        height: "150px",
        width: "100%",
        resize: "none",
    },
    submitBtn: {
        width: "100%",
        fontSize: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        fontWeight: "bold",
        background: "saddlebrown",
        border: "white 1px solid",
        borderRadius: "5px",
        padding: "2px",
        color: "white"
    }
};

type Props = {
    username: string,
    source: string,
    yyyymmdd: string,
}

export function MantraTransferOfMerit({
    username,
    source,
    yyyymmdd,
}: Props) {

    async function handleSubmit(formData: FormData) {
        
        // Get form data
        const text = formData.get("meritText");
        
        // Check if bad data
        if(!isNullUndefinedOrEmpty(text)) {
            try {
                // Save to DB
                let createdRows = 0;
                await fetch('/api/transfer-of-merit/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: username,
                        source: source,
                        yyyymmdd: yyyymmdd,
                        text: text,
                    })
                }).then(response => {
                    return response.json();
                }).then(data => { 
                    createdRows = data.updatedRows;
                });
                console.log("createdRows", createdRows);
            } catch (error) {
                console.error(error);
            }
            // Redirect
            redirect("/dashboard");
        }   
    }

    return (
        <div style={Style.container}>
            {/* 回向 Transferance of Merit */}
            <section style={Style.col}>
                <fieldset style={Style.config}>
                    <legend style={Style.legend}>
                        回向
                    </legend>
                    {
                        true? // Expandible to add hide/show
                            <form action={handleSubmit} 
                                style={{
                                    display: "flex", 
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "space-around",
                                    gap: "0.5em"}}>
                                {/* Input merit username */}
                                <input type="text"
                                    name="meritUsername" id="meritUsername" 
                                    defaultValue={username}
                                    readOnly hidden />
                                {/* Input merit text */}
                                <textarea 
                                    style={Style.inputMerit}
                                    name="meritText" id="meritText" 
                                    maxLength={150}></textarea>
                                <button type="submit" 
                                    style={Style.submitBtn}>
                                    送出
                                </button>
                            </form>
                        :
                        <></>
                    }
                    
                </fieldset>
            </section>
        </div>
    );
};













