'use client'

import { ChangeEvent, ChangeEventHandler } from "react";

type Props = {
    label: string,
    defaultValue: string,
    id: string,
    errorMsg: string,
    width?: number | undefined,
    options: Array<{ 
        value: string,
        label: string
    }>
}



export const SelectGroup = ({
    label,
    defaultValue: defaultValueProp,
    id: idProp,
    errorMsg,
    width: widthProp,
    options: optionsProp
}: Props) => {
    const options = optionsProp.map((eachOption) => 
        <option key={eachOption.value} value={eachOption.value}>{eachOption.label}</option>
    )

    return (
        <div style={{marginTop:"0.5em", 
            marginBottom: "0.5em", 
            display: "block"}}>
            <label 
                htmlFor={idProp} 
                style={{
                    display: "inline-block",
                    fontSize:"18px",
                    color:"white",
                    fontWeight:"bolder",
                    paddingRight:"0.5em",
                    textAlign: "center"
                }}>
                {label}
            </label>
            <select 
                style={{ 
                    paddingLeft: "0.1em",
                    fontSize: "18px", 
                    fontWeight: "bold",
                    height: "25px",
                    float: "right",
                    width:widthProp}}
                name={idProp} 
                id={idProp} 
                defaultValue={defaultValueProp}>
            {options}
            </select>
            <p style={{textAlign:"right", color: "rgb(255, 180, 68)"}}>{errorMsg}</p>
        </div>
    );

};