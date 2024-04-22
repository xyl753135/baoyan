'use client'

import { ChangeEventHandler } from "react";

type Props = {
    label: string,
    placeholder: string,
    id: string,
    maxLength: number,
    errorMsg: string,
    keepErrorMsgNegativeSpace: boolean,
    readOnly?: boolean,
    width?: number | undefined,
    changeHandler?: ChangeEventHandler<HTMLInputElement> | undefined,
    value?: string | number | undefined,
    type?: "text" | "email" | "tel" | "date"
}

export const InputGroup = ({
    label,
    placeholder,
    id: idProp,
    maxLength,
    errorMsg,
    keepErrorMsgNegativeSpace,
    readOnly: readOnlyProp = false,
    width,
    changeHandler,
    value: valueProp,
    type: typeProp = "text"
}: Props) => {

    return (
        <div style={{
            // marginTop:"0.5em", 
            // marginBottom: "0.5em", 
            display: "flex",
            flexDirection: "column"
        }}>
            <div>
                <label htmlFor={idProp} style={{
                    display: "inline-block",
                    fontSize:"18px",
                    color:"white",
                    fontWeight:"bolder",
                    paddingRight:"0.5em",
                    textAlign: "center"
                }}>
                    {label}
                </label>
                <input type={typeProp}
                    placeholder={placeholder}
                    name={idProp} id={idProp}
                    style={{ 
                        paddingLeft: "0.1em",
                        fontSize: "18px", 
                        fontWeight: "bold",
                        height: "25px",
                        float: "right",
                        width:width}}
                    maxLength={maxLength} 
                    readOnly={readOnlyProp}
                    onChange={changeHandler}
                    value={valueProp} />
            </div>
            <span style={{ textAlign: "right", color: "rgb(255, 180, 68)" }}>
                {errorMsg}
                {
                    keepErrorMsgNegativeSpace ?
                        <br></br>
                        :
                        <></>
                }
            </span>
        </div>
    );

};