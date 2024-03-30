'use client'

import { useState } from "react";

const Style: { [key: string]: React.CSSProperties } = {
  navButton: {
    paddingLeft: "0.3rem",
    paddingRight: "0.3rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: "0",
    minWidth: "120px",
    flexShrink: "1",
    cursor: "pointer",
    // borderRadius: "1rem",
    transition: "all 200ms ease"
  },
  label: {
    color: "rgb(240, 240, 255)",
    fontFamily: "georgia",
    fontWeight: "bold",
    textDecoration: "none",
    transition: "all 200ms ease"
  },
  hoverButtonLight: {
    backgroundColor: "#4EB1BA",
    // border: "1px solid white",
    transition: "all 200ms ease"
  },
  hoverButtonDark: {
    backgroundColor: "#214468",
    // border: "1px solid white",
    transition: "all 200ms ease"
  },
  hoverLabelLight: {
    color: "black",
    fontSize: "1.5rem",
    fontWeight: "900",
    transition: "all 200ms east"
  },
  hoverLabelDark: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "900",
    transition: "all 200ms east"
  },
  fontNormal: {
    fontSize: "1rem",
  },
  fontLarge: {
    fontSize: "1.2rem",
  },
  fontHuge: {
    fontSize: "1.4rem",
  },
};

type Props = {
  label: string,
  link: string,
  hoverStyle?: "none" | "dark" | "light"
}

export const NavbarButton = ({
    label,
    link,
    hoverStyle = "none",
}: Props) => {
    const [hovered, setHovered] = useState<Boolean>(false);
    

  return (
    <a href={link}
      style={{
        ...Style.navButton, 
        ...(hovered && hoverStyle != "none" ? (hoverStyle == "light" ? Style.hoverButtonLight : Style.hoverButtonDark) : undefined),
      }}
      target="_self"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}>
      <h2 style={{
        ...Style.label, 
        ...(hovered && hoverStyle != "none" ? (hoverStyle == "light" ? Style.hoverLabelLight : Style.hoverLabelDark) : undefined),
        ...(hovered && hoverStyle != "none" ? (hoverStyle == "light" ? Style.fontHuge : Style.fontLarge) : Style.fontNormal),
        }}>{label}</h2>
    </a>);
};