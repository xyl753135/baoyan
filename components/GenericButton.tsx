'use client'

import { useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
  button: {
    margin: "0.2em",
    paddingLeft: "1em",
    paddingRight: "1em",
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
    transition: "all 200ms ease-out"
  },
  lightBtn: {
    backgroundColor: "transparent",
    border: "1px solid white",
  },
  darkBtn: {
    backgroundColor: "#214468",
    border: "1px solid white",
  },
  lightLabel: {
    color: "white",
  },
  darkLabel: {
    color: "white",
  },
  fontNormal: {
    fontSize: "1rem",
  },
};

type Props = {
  label: string,
  handleClick: Function,
  hoverStyle?: "none" | "dark" | "light"
}

export const GenericButton = ({
    label,
    handleClick,
    hoverStyle = "none",
}: Props) => {
    const [hovered, setHovered] = useState<Boolean>(false);
    

  return (
    <button 
      style={{
        ...Style.button, 
        ...(hovered ? 
          Style.lightBtn : 
          Style.darkBtn),
      }}
      onClick={() => handleClick()}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}>
      <label style={{
        ...Style.label, 
        ...hovered ? Style.lightLabel : Style.darkLabel,
        ...Style.fontNormal,
        }}>{label}</label>
    </button>);
};