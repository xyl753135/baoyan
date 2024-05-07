'use client'

import { Dispatch, SetStateAction } from "react";

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
        fontSize: "24px"
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
    },
    disabledBtn: {
        width: "100%",
        fontSize: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        fontWeight: "bold",
        background: "grey",
        border: "white 1px solid",
        borderRadius: "5px",
        padding: "2px",
        color: "white"
    }
};

type Props = {
    meritId: string,
    meritText: string,
    setMeritText: Dispatch<SetStateAction<string>>,
    handleSubmit: string | ((formData: FormData) => void) | undefined,
    disabledEditForm: boolean
}

export function SubmitTransferOfMerit({
    meritId,
    meritText,
    setMeritText,
    handleSubmit,
    disabledEditForm
}: Props) {


    return (

        <div style={{
            ...Style.container,
        }}>
            {/* 回向 Transferance of Merit */}
            <section style={Style.col}>
                <fieldset style={Style.config}>
                    <legend style={Style.legend}>
                        回向
                    </legend>
                    {
                        true ? // Expandible to add hide/show
                            <form action={handleSubmit}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "space-around",
                                    gap: "0.5em"
                                }}>
                                {/* Input (hidden) id */}
                                <input type="text"
                                    name="meritId" id="meritId" defaultValue={meritId}
                                    readOnly hidden />
                                {/* Input text */}
                                <textarea
                                    style={Style.inputMerit}
                                    name="meritText" id="meritText"
                                    maxLength={150}
                                    disabled={disabledEditForm ? true : false}
                                    autoFocus={disabledEditForm ? false : true}
                                    value={meritText}
                                    onChange={(event) => setMeritText(event.target.value)}></textarea>
                                <button type="submit"
                                    disabled={disabledEditForm ? true : false}
                                    style={disabledEditForm ? Style.disabledBtn : Style.submitBtn }>
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













