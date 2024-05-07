'use client'

import { useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
  button: {
    margin: "0.2em",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: "1",
    // minWidth: "100px",
    flexShrink: "1",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "all 200ms ease-out"
  },
  label: {
    fontSize: "15px",
    color: "rgb(240, 240, 255)",
    fontFamily: "georgia",
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 200ms ease-out"
  },
};

type Props = {
  label: string,
  handleClick: Function,
  border: string,
  borderRadius: string,
  background: string,
  maxWidth?: string,
  maxHeight?: string,
  minWidth: string,
  minHeight: string,
  labelFontSize: string,

}

export const GenericButton = ({
    label,
    handleClick,
    border,
    borderRadius,
    background,
    maxWidth,
    maxHeight = "350px",
    minWidth = "350px",
    minHeight,
    labelFontSize,
}: Props) => {
    // const [hovered, setHovered] = useState<Boolean>(false);
    

  return (
    <button 
      style={{
        ...Style.button, 
        border: border,
        borderRadius:borderRadius,
        background:background,
        minWidth:minWidth,
        minHeight:minHeight,
        maxWidth:maxWidth,
        maxHeight:maxHeight
      }}
      onClick={() => handleClick()}
      // onMouseOver={() => setHovered(true)}
      // onMouseOut={() => setHovered(false)}
      >
      <label style={{
        ...Style.label, 
        // ...hovered ? {
        //   // fontWeight: "900"
        // } : {
        //   // fontWeight: "normal"
        // },
        fontSize: labelFontSize
        }}>{label}</label>
    </button>);
};